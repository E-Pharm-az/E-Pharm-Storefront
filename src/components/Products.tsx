import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../services/api-client.ts";
import CartContext from "../context/CartProvider.tsx";
import { Image, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";

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
  const { loading, setLoading } = useContext(LoaderContext);
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const searchQuery = search.get("search");
  const [t] = useTranslation("global");

  useEffect(() => {
    (async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const response = await apiClient.get<Product[]>("/products/search", {
            params: { query: searchQuery, page: 1 },
          });
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [searchQuery]);

  const HandleSelectProduct = (id: number) => {
    navigate(`/product-page?product-id=${id}`);
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
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

  if (products.length === 0 && !loading) {
    return (
      <div className="grid gap-4 py-12 px-4 text-center w-full">
        <Search className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {t("products.no-products-found")}
        </h2>
      </div>
    );
  }

  return (
    <div className="container w-full relative grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
          <div
            key={product.id}
            onClick={() => HandleSelectProduct(product.id)}
            className="flex flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md transition hover:cursor-pointer hover:shadow-lg md:h-[420px]"
          >
            <div className="mb-4 flex flex-col">
              {product.imageUrl ? (
                <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-md border border-gray-300">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="mx-auto h-auto"
                  />
                </div>
              ) : (
                <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-md border border-gray-300">
                  <Image className="text-4xl text-gray-400" />
                </div>
              )}
              <h1 className="text-xl font-semibold">{product.name}</h1>
              <p className="mb-2 text-sm font-medium text-gray-600">
                {product.description}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg font-semibold text-gray-600">
                {(product.price / 100).toFixed(2)} AZN
              </p>
              <Button className="" onClick={(e) => handleAddToCart(e, product)}>
                <ShoppingCart className="h-5 w-5" />
                <span>{t("products.add-to-cart-btn")}</span>
              </Button>
            </div>
          </div>
        ))
      }
    </div>
  );
};
export default Products;
