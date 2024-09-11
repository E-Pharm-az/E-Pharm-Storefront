import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/priceUtils";
import { Pill } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  products: Product[];
  query: string | null;
  onProductSelect?: (product: Product) => void;
  className?: string;
}

export const ProductSearchResults: FC<Props> = ({
  products,
  query,
  onProductSelect,
  className,
}) => {
  const navigate = useNavigate();

  const highlightedProductNames = useMemo(() => {
    if (!query) return products.map((p) => p.name);

    const regex = new RegExp(`(${query})`, "gi");
    return products.map((product) =>
      product.name.replace(regex, "<strong>$1</strong>")
    );
  }, [products, query]);

  const handleProductSelect = (product: Product) => {
    if (product.stock > 0) {
      navigate(`/product-page?product-id=${product.id}`);
      if (onProductSelect) {
        onProductSelect(product);
      }
    }
  };

  return (
    <div className={`bg-white w-full max-h-[300px] overflow-auto ${className}`}>
      <Separator />
      {products.length > 0 ? (
        highlightedProductNames.map((name, index) => (
          <div
            key={products[index].id}
            className={`flex justify-between items-center px-4 py-2 hover:bg-neutral-100  ${
              products[index].stock > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => handleProductSelect(products[index])}
          >
            <div className="flex items-center gap-2">
              {products[index].imageUrl ? (
                <img
                  src={products[index].imageUrl}
                  alt={products[index].name}
                  className="h-10 w-10 rounded-md"
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                  <Pill className="text-gray-400 w-6 h-6" />
                </div>
              )}
              <p dangerouslySetInnerHTML={{ __html: name }} />
            </div>
            {products[index].stock > 0 ? (
              <p>₼ {formatPrice(products[index].price)}</p>
            ) : (
              <Button>Out of stock</Button>
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-4">Not found</div>
      )}
    </div>
  );
};
