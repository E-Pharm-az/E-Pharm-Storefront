import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "./Products.tsx";
import apiClient from "../services/api-client.ts";
import CartContext from "../context/CartProvider.tsx";
import { Image, Loader } from "lucide-react";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const productId = search.get("product-id");
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [t] = useTranslation("global");

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
    }
  };

  const handleAddClick = () => {
    if (product) {
      setCount(count + 1);
    }
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product | null,
  ) => {
    if (product) {
      e.stopPropagation();

      const cart = {
        id: product.id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        quantity: count,
      };

      addToCart(cart, count);
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="container flex flex-col justify-between gap-8 py-12 md:flex-row">
      <div className="max-w-full flex-grow md:max-w-[600px]">
        {loading && (
          <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
            <Loader className="mr-2 animate-spin text-blue-500" />
            <span>Loading...</span>
          </div>
        )}
        {product && (
          <div className="flex flex-col gap-8 rounded-md border bg-white p-6 md:flex-row">
            {product.imageUrl ? (
              <div className="mb-4 rounded-md border">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto h-auto w-[280px]"
                />
              </div>
            ) : (
              <div className="mb-4 flex h-60 w-full items-center justify-center rounded-md bg-gray-200">
                <Image className="text-4xl text-gray-400" />
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="mb-4 text-2xl font-semibold sm:text-3xl">
                {product && product.name}
              </h1>
              <p className="mb-4 font-medium text-gray-600">
                Strength: {product && product.strengthMg} mg
              </p>
            </div>
          </div>
        )}
        {!loading && !product && (
          <div className="py-8 text-center text-gray-600">
            {t("product-page.product-not-found")}.
          </div>
        )}
      </div>

      <div className="flex h-max w-full flex-col gap-4 rounded-md border p-4 md:w-60">
        <div className="flex justify-between">
          <div className="flex">
            <button
              className="h-7 w-7 rounded border"
              onClick={handleMinusClick}
            >
              -
            </button>
            <span className="h-7 w-7 text-center count leading-[28px]">
              {count}
            </span>
            <button className="h-7 w-7 rounded border" onClick={handleAddClick}>
              +
            </button>
          </div>
          <div className="text-xl font-semibold">
            {(((product?.price ?? 0) * count) / 100).toFixed(2)} AZN
          </div>
        </div>
        <div className="border-t pt-4">
          <button
            className="bg-[#61a60e] font-medium text-white text-sm tracking-wide w-full py-2 rounded-md"
            onClick={(e) => handleAddToCart(e, product)}
          >
            {t("product-page.product-add-to-cart-btn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
