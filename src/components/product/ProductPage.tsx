import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../../services/api-client";
import CartContext from "../../context/CartProvider";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoaderContext from "@/context/LoaderProvider";
import { Product } from "@/types/product";

const ProductImage: React.FC<{ product: Product | null }> = React.memo(
  ({ product }) => {
    return (
      <div className="border rounded-md bg-white w-full">
        {product?.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto"
          />
        ) : (
          <div className="flex h-[420px] w-full items-center justify-center rounded-md bg-gray-200">
            <Image className="text-4xl text-gray-400" />
          </div>
        )}
      </div>
    );
  },
);

const ProductDetails: React.FC<{
  product: Product;
  onAddToCart: (count: number) => void;
}> = React.memo(({ product, onAddToCart }) => {
  const { t } = useTranslation("global");
  const [count, setCount] = useState(1);

  const handleMinusClick = useCallback(() => {
    if (count > 1) {
      setCount(count - 1);
    }
  }, [count]);

  const handleAddClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onAddToCart(count);
    },
    [count, onAddToCart],
  );

  return (
    <div className="space-y-4">
      <p className="text-2xl">₼{((product.price ?? 0) / 100).toFixed(2)}</p>
      <h2 className="text-5xl">{product.name}</h2>
      <p>{product.description}</p>
      <p>Strength: {product.strengthMg} mg</p>
      <div className="flex gap-2 items-center">
        <div className="flex border rounded items-center gap-2">
          <Button
            onClick={handleMinusClick}
            size="icon"
            variant="ghost"
            className="rounded-md"
          >
            -
          </Button>
          <span className="h-7 w-7 text-center count leading-[28px]">
            {count}
          </span>
          <Button
            onClick={handleAddClick}
            size="icon"
            variant="ghost"
            className="rounded-md"
          >
            +
          </Button>
        </div>
        <Button onClick={handleAddToCart} className="w-full rounded-md">
          {t("product-page.product-add-to-cart-btn")}
        </Button>
      </div>
    </div>
  );
});

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const productId = search.get("product-id");
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const { setLoading } = useContext(LoaderContext);

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
  }, [productId, setLoading]);

  const handleAddToCart = useCallback(
    (count: number) => {
      if (product) {
        const cart = {
          id: product.id,
          imageUrl: product.imageUrl,
          name: product.name,
          price: product.price,
          quantity: count,
        };

        addToCart(cart, count);
        navigate("/cart");
      }
    },
    [addToCart, navigate, product],
  );

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 flex flex-col md:flex-row gap-6 justify-between">
      <ProductImage product={product} />
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
