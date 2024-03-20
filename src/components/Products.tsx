import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import apiClient from "../services/api-client.ts";
import {BsArrowRepeat, BsImage} from "react-icons/bs";

export interface Product {
    id: number;
    pharmaCompanyId: number;
    productName: string;
    productDescription: string;
    productImageUrl: string;
    strengthMg: number;
    contraindicationsDescription: string;
    storageConditionDescription: string;
    activeIngredientsId: number;
    specialRequirementsId: number;
    manufacturerId: number;
    regulatoryInformationId: number;
    manufacturingDate: Date;
    expiryDate: Date;
    stock: number;
    price: number;
    batchNumber: string;
    barcode: string;
    packagingWidth: number;
    packagingHeight: number;
    packagingLength: number;
    packagingWeight: number;
}


const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useNavigate();
    const search = new URLSearchParams(location.search);
    const searchQuery = search.get("search");

    useEffect(() => {
        setLoading(true);
        if (searchQuery) {
            apiClient.get<Product[]>(`/product/search/${searchQuery}`)
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                })
        }
    }, [searchQuery]);

    const SelectProduct = (id: number) => {
        history(`/product-page?search=${id}`);
    }

    return (
        <div className="max-w-[1200px] mx-auto px-12 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <BsArrowRepeat className="animate-spin text-blue-500 mr-2"/>
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
                        onClick={() => SelectProduct(product.id)}
                        className="bg-white border border-gray-300 shadow-md rounded-md p-4 flex flex-col hover:cursor-pointer hover:shadow-lg transition"
                    >
                        {product.productImageUrl ? (
                            <img src={product.productImageUrl} alt={product.productName} className="w-full h-auto mb-4"/>
                        ) : (
                            <div className="flex items-center justify-center w-full h-60 mb-4 bg-gray-200 rounded-md">
                                <BsImage className="text-gray-400 text-4xl"/>
                            </div>
                        )}
                        <h1 className="text-xl font-semibold">{product.productName}</h1>
                        <p className="text-gray-600 text-sm mb-2">{product.productDescription}</p>
                        <p className="text-gray-600 mb-2">{(product.price / 100).toFixed(2)} AZN</p>
                    </div>
                ))
            )}
        </div>
    );

}

export default Products;