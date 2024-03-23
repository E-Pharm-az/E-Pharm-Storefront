import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Product} from "./Products.tsx";
import apiClient from "../../services/api-client.ts";
import {BsArrowRepeat, BsImage} from "react-icons/bs";

const ProductPage = () => {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const productId = search.get("search");

    useEffect(() => {
        setLoading(true);
        if (productId) {
            apiClient.get<Product>(`/product/${productId}`)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                })
        }
    }, [productId]);

    return (
        <div className="max-w-[1200px] mx-auto p-12">
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <BsArrowRepeat className="animate-spin text-blue-500 mr-2"/>
                    <span>Loading...</span>
                </div>
            )}
            {product && (
                <div className="bg-white shadow-md rounded-md p-6">
                    <h1 className="text-3xl font-semibold mb-4">{product.productName}</h1>
                    {product.productImageUrl ? (
                        <img src={product.productImageUrl} alt={product.productName}
                             className="w-full h-auto mb-4"/>
                    ) : (
                        <div className="flex items-center justify-center w-full h-60 mb-4 bg-gray-200 rounded-md">
                            <BsImage className="text-gray-400 text-4xl"/>
                        </div>
                    )}

                    <p className="text-gray-600 mb-4">{product.productDescription}</p>
                    <p className="text-gray-600 mb-4">Price: {(product.price / 100).toFixed(2)} AZN</p>
                    <p className="text-gray-600 mb-4">Strength: {product.strengthMg} mg</p>
                </div>
            )}
            {!loading && !product && (
                <div className="text-center text-gray-600 py-8">
                    Product not found.
                </div>
            )}
        </div>
    );
}

export default ProductPage;