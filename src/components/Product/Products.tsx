import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client.ts";
import CartContext from "../../context/CartProvider.tsx";
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
    const { addToCart } = useContext(CartContext);
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
        history(`/product-page?search=${id}`);
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
        <div className="container py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <Loader className="animate-spin text-blue-500 mr-2" />
                    <span>Loading...</span>
                </div>
            )}
            {products.length === 0 && !loading ? (
                <div className="text-center text-gray-600 py-8">
                    No products found.
                </div>
            ) : (
                products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => HandleSelectProduct(product.id)}
                        className="bg-white md:h-[420px] border border-gray-300 shadow-md rounded-md p-4 flex flex-col justify-between hover:cursor-pointer hover:shadow-lg transition"
                    >
                        <div className="flex flex-col mb-4">
                            {product.imageUrl ? (
                                <div
                                    className="flex items-center justify-center mx-auto h-48 w-48 mb-4 rounded-md border border-gray-300 overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-auto mb-4"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="flex items-center justify-center mx-auto h-48 w-48 mb-4 rounded-md border border-gray-300 overflow-hidden">
                                    <Image className="text-gray-400 text-4xl"/>
                                </div>
                            )}
                            <h1 className="text-xl font-semibold">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 font-medium text-sm mb-2">
                                {product.description}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-2 text-lg font-semibold">
                                {(product.price / 100).toFixed(2)} AZN
                            </p>
                            <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="w-full bg-[#61a60e] flex justify-center items-canter gap-2 font-medium rounded text-sm px-5 py-2.5 text-center text-white"
                            >
                                <ShoppingCart className="w-5 h-5" />
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
