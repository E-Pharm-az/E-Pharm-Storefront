import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "./Products.tsx";
import apiClient from "../services/api-client.ts";
import CartContext from "../context/CartProvider.tsx";
import { Image, Loader } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const productId = search.get("product-id");
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const { loading, setLoading } = useContext(LoaderContext);
  const [count, setCount] = useState(1);
  const [t] = useTranslation("global");

  useEffect(() => {
    setLoading(true);
    if (productId) {
      apiClient
        .get<Product>(`/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
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
    product && (
      <div className="max-w-[1200px] flex gap-6 justify-between w-full mx-auto px-4">
        <div className="border rounded-md bg-white w-3/5">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="flex h-[420px] w-full items-center justify-center rounded-md bg-gray-200">
              <Image className="text-4xl text-gray-400" />
            </div>
          )}
        </div>
        <div className="w-2/5 space-y-4">
          <p className="text-2xl">
            ₼{((product?.price ?? 0) / 100).toFixed(2)}
          </p>
          <h2 className="text-5xl">{product.name}</h2>
          <p>{product.description}</p>
          <p>Strength: {product.strengthMg} mg</p>
          <div className="flex gap-2 items-center">
            <div className="flex border rounded items-center gap-2">
              <Button onClick={handleMinusClick} size="icon" variant="ghost" className="rounded-md">
                -
              </Button>
              <span className="h-7 w-7 text-center count leading-[28px]">
                {count}
              </span>
              <Button onClick={handleAddClick} size="icon" variant="ghost" className="rounded-md">
                +
              </Button>
            </div>
            <Button className="w-full rounded-md">Add to cart</Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
