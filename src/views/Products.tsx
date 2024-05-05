import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import apiClient from "../services/api-client.ts";
import CartContext from "../context/CartProvider.tsx";
import {Image, Loader, ShoppingCart} from "lucide-react";

export interface Product {
    id: number;
    pharmaCompanyId: number;
    name: string;
    description: string;
    imageUrl: string;
    strengthMg: number;
    regulatoryInformationId: number;
    manufacturingDate: Date;
    expiryDate: Date;
    stock: number;
    price: number;
}

const Products = () => {
    const {addToCart} = useContext(CartContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useNavigate();
    const search = new URLSearchParams(location.search);
    const searchQuery = search.get("search");

    useEffect(() => {
        setLoading(true);
        if (searchQuery) {
            apiClient
                .get<Product[]>(`/product/search/${searchQuery}/1`)
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [searchQuery]);

    const HandleSelectProduct = (id: number) => {
        history(`/product-page?product-id=${id}`);
    };

    const handleAddToCart = (
        e: React.MouseEvent<HTMLButtonElement>,
        product: Product
    ) => {
        e.stopPropagation();
        addToCart({
            id: product.id,
            imageUrl: product.imageUrl,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    };

    return (
        <div className="container relative grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading && (
                <div
                    className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
                    <Loader className="mr-2 animate-spin text-blue-500"/>
                    <span>Loading...</span>
                </div>
            )}
            {products.length === 0 && !loading ? (
                <div className="py-8 text-center text-gray-600">
                    No products found.
                </div>
            ) : (
                products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => HandleSelectProduct(product.id)}
                        className="flex flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md transition hover:cursor-pointer hover:shadow-lg md:h-[420px]"
                    >
                        <div className="mb-4 flex flex-col">
                            {product.imageUrl ? (
                                <div
                                    className="mx-auto mb-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-md border border-gray-300">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="mx-auto h-auto"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="mx-auto mb-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-md border border-gray-300">
                                    <Image className="text-4xl text-gray-400"/>
                                </div>
                            )}
                            <h1 className="text-xl font-semibold">
                                {product.name}
                            </h1>
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                {product.description}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-lg font-semibold text-gray-600">
                                {(product.price / 100).toFixed(2)} AZN
                            </p>
                            <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="w-full bg-[#61a60e] flex justify-center items-canter gap-2 font-medium rounded text-sm px-5 py-2.5 text-center text-white"
                            >
                                <ShoppingCart className="h-5 w-5"/>
                                <span>Add to cart</span>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Products;
