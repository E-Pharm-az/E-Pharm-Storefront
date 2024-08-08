import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {Product} from "@/types/product.ts";

interface Props {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<Props> = React.memo(({ product, onClick }) => {
  const { t } = useTranslation("global");

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      </CardHeader>
      <CardContent>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-48 w-full object-contain pointer-events-none"
          />
        ) : (
          <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t">
            <span className="text-gray-400 text-4xl">No Image</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="grid gap-2">
        <p className="text-md text-center font-semibold text-black">
          {(product.price / 100).toFixed(2)} AZN
        </p>
        <Button
          onClick={() => onClick(product.id)}
          variant="default"
          size="sm"
          className="rounded-full h-11"
        >
          {t("products.select")}
        </Button>
      </CardFooter>
    </Card>
  );
});

export default ProductCard;
