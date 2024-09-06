import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Product } from "@/types/product.ts";
import { Pill } from "lucide-react";
import { formatPrice } from "@/utils/priceUtils";

interface Props {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<Props> = React.memo(({ product, onClick }) => {
  const { t } = useTranslation("global");

  return (
    <Card className="relative">
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
            <Pill className="text-gray-400 w-12 h-12" />
          </div>
        )}
      </CardContent>
      <CardFooter className="grid gap-2">
        <p className="text-md text-center font-semibold text-black">
          {formatPrice(product.price)} AZN
        </p>
        <Button
          disabled={product.stock < 1}
          onClick={() => onClick(product.id)}
          variant="default"
          size="sm"
          className="rounded-full h-11"
        >
          {t("products.select")}
        </Button>
      </CardFooter>
      {product.stock < 1 && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center blur-sm bg-gray-500 opacity-30">
          <p>Out of stock</p>
          <Button size="sm">Notify when in stock</Button>
        </div>
      )}
    </Card>
  );
});

export default ProductCard;
