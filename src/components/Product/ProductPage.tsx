import {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {Product} from "./Products.tsx";
import apiClient from "../../services/api-client.ts";

import CartContext from "../../context/CartProvider.tsx";
import {Image, Loader} from "lucide-react";

const ProductPage = () => {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const productId = search.get("search");
    const {addToCart} = useContext(CartContext);

    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [totalProductPrice, setTotalProductPrice] = useState<number>(product?.price ?? 0);
    const [addToCartBtnClicked, setAddToCartBtnClicked] = useState(false);
    const [addToCartBtnText, setAddToCartBtnText] = useState("Add to Cart");

    useEffect(() => {
        setLoading(true);
        if (productId) {
            apiClient
                .get<Product>(`/product/${productId}`)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [productId]);

    const handleMinusClick = () => {
        if (count > 1 && product) {
            setCount(count - 1);
            setTotalProductPrice(totalProductPrice - (product.price || 0));
        }
    };

    const handleAddClick = () => {
        if (product) {
            setCount(count + 1);
            setTotalProductPrice(totalProductPrice + (product.price || 0));
        }
    };

    const handleAddToCart = (
        e: React.MouseEvent<HTMLButtonElement>,
        product: Product | undefined,
    ) => {
        if (!addToCartBtnClicked && product) {
            e.stopPropagation();
            addToCart({
                id: product.id,
                imageUrl: product.imageUrl,
                name: product.name,
                price: product.price,
                quantity: count,
            });
            setAddToCartBtnClicked(true);
            setAddToCartBtnText("Go to Cart");
        } else {
            navigate("/cart");
        }
    };

    return (
        <div className="container flex flex-col md:flex-row justify-between gap-8 py-12">
            <div className="flex-grow md:max-w-[600px] max-w-full">
                {loading && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                        <Loader className="animate-spin text-blue-500 mr-2"/>
                        <span>Loading...</span>
                    </div>
                )}
                {product && (
                    <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md border rounded-md p-6">
                        {product.imageUrl ? (
                            <div className="shadow-md border rounded-md mb-4">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-[280px] h-auto  mx-auto"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full h-60 mb-4 bg-gray-200 rounded-md">
                                <Image className="text-gray-400 text-4xl"/>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
                                {product && product.name}
                            </h1>
                            <p className="text-gray-600 font-medium mb-4">
                                Strength: {product && product.strengthMg} mg
                            </p>
                        </div>
                    </div>
                )}
                {!loading && !product && (
                    <div className="text-center text-gray-600 py-8">
                        Product not found.
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4 w-full md:w-60 h-max p-4 border">
                <div className="flex justify-between">
                    <div className="flex">
                        <button
                            className="w-7 h-7 border rounded"
                            onClick={handleMinusClick}
                        >
                            -
                        </button>
                        <span className="count w-7 h-7 text-center leading-[28px]">
                            {count}
                        </span>
                        <button
                            className="w-7 h-7 border rounded"
                            onClick={handleAddClick}
                        >
                            +
                        </button>
                    </div>
                    <div className="text-xl font-semibold">
                        {(totalProductPrice / 100).toFixed(2)} AZN
                    </div>
                </div>
                <div className="pt-4 border-t">
                    <button
                        className="bg-[#61a60e] font-medium text-white text-sm tracking-wide w-full py-2 rounded-md"
                        onClick={(e) => handleAddToCart(e, product)}
                    >
                        {addToCartBtnText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
