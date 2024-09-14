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
import { Button } from "@/components/ui/button";
import LoaderContext from "@/context/LoaderProvider";
import { Product } from "@/types/product";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { formatPrice } from "@/utils/priceUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { Minus } from "lucide-react";

const ProductImage: React.FC<{ product: Product | null }> = React.memo(
  ({ product }) => {
    return (
      <div className="border rounded-md bg-white w-full overflow-clip">
        {product?.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto"
          />
        ) : (
          <Skeleton className="h-[250px] md:h-[420px] w-full rounded-md" />
        )}
      </div>
    );
  }
);

const ProductDetails: React.FC<{
  product: Product | null;
  onAddToCart: (count: number) => void;
}> = React.memo(({ product, onAddToCart }) => {
  const { t } = useTranslation("global");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (product) {
        onAddToCart(1);
      }
    },
    [onAddToCart, product]
  );

  return (
    <div className="grid gap-4 md:gap-6 w-full">
      {product ? (
        <>
          <div className="grid gap-2 md:gap-4 w-full">
            <div className="flex flex-col md:flex-row justify-between w-full text-neutral-800">
              <h2 className="text-2xl md:text-4xl font-semibold">
                {product.name}
              </h2>
              <p className="text-xl md:text-2xl font-semibold mt-2 md:mt-3">
                ₼&nbsp;{formatPrice(product.price)}
              </p>
            </div>
            <p className="text-sm md:text-base">{product.description}</p>
          </div>

          <div className="rounded-md border border-muted-foreground flex flex-col md:flex-row gap-2 p-2 text-sm">
            <div className="w-full">
              <p className="text-xs md:text-sm font-muted-foreground">
                {t("product-page.for")}
              </p>
              <Minus className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <Separator
              className="bg-muted-foreground hidden md:block"
              orientation="vertical"
            />
            <div className="w-full">
              <p className="text-xs md:text-sm font-muted-foreground">
                {t("product-page.supports-you")}
              </p>
              <Minus className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <Separator
              className="bg-muted-foreground hidden md:block"
              orientation="vertical"
            />
            <div className="w-full">
              <p className="text-xs md:text-sm font-muted-foreground">
                {t("product-page.take")}
              </p>
              <Minus className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>

          <div className="flex w-full gap-2 md:gap-4">
            <Button
              disabled={true}
              onClick={() => setIsSubscribed(true)}
              variant="outline"
              className={`${
                isSubscribed && "bg-white hover:bg-white border-black"
              } rounded-md p-2 md:p-6 w-full text-xs md:text-sm`}
            >
              {t("product-page.subsribe")}
            </Button>
            <Button
              onClick={() => setIsSubscribed(false)}
              variant="outline"
              className={`${
                !isSubscribed && "bg-white hover:bg-white border-black"
              } rounded-md p-2 md:p-6 w-full text-xs md:text-sm`}
            >
              {t("product-page.one-time-purchase")}
            </Button>
          </div>

          <div className="grid gap-2">
            <p className="font-medium text-sm md:text-base">
              {t("product-page.select-dosage-form")}
            </p>
            <Select defaultValue={product.dosageForms[0].name}>
              <SelectTrigger className="h-10 md:h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.dosageForms.map((dosageForm) => (
                  <SelectItem
                    value={dosageForm.name}
                    key={dosageForm.id}
                    className="h-10 md:h-14"
                  >
                    {dosageForm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {product.stock > 0 ? (
            <Button onClick={handleAddToCart} className="w-full h-14">
              {t("product-page.product-add-to-cart-btn")}
            </Button>
          ) : (
            <Button className="w-full">
              {t("product-page.notify-when-stock")}
            </Button>
          )}
          <Accordion type="single" collapsible>
            {product.storageConditionDescription && (
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {t("product-page.storage-descend")}
                </AccordionTrigger>
                <AccordionContent>
                  {product.storageConditionDescription}
                </AccordionContent>
              </AccordionItem>
            )}
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {t("product-page.active-ingredients")}{" "}
              </AccordionTrigger>
              <AccordionContent>
                {product.activeIngredients.map((ingredient) => (
                  <li className="font-medium" key={ingredient.id}>
                    {ingredient.name}
                    {ingredient.description && ` - ${ingredient.description}`}
                  </li>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                {t("product-page.route-of-administration")}
              </AccordionTrigger>
              <AccordionContent>
                {product.routeOfAdministrations.map((roa) => (
                  <p className="font-medium" key={roa.id}>
                    {roa.name}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
            {product.sideEffects.length > 0 && (
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  {t("product-page.side-effects")}
                </AccordionTrigger>
                <AccordionContent>
                  {product.sideEffects.map((sideEffect) => (
                    <p className="font-medium" key={sideEffect.id}>
                      {sideEffect.name}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
            {product.usageWarnings.length > 0 && (
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  {t("product-page.usage-warnings")}
                </AccordionTrigger>
                <AccordionContent>
                  {product.usageWarnings.map((usageWarning) => (
                    <p className="font-medium" key={usageWarning.id}>
                      {usageWarning.name}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
            {product.allergies.length > 0 && (
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  {t("product-page.allergies")}
                </AccordionTrigger>
                <AccordionContent>
                  {product.allergies.map((allergy) => (
                    <p className="font-medium" key={allergy.id}>
                      {allergy.name}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
            {product.indications.length > 0 && (
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  {t("product-page.indications")}
                </AccordionTrigger>
                <AccordionContent>
                  {product.indications.map((indication) => (
                    <p className="font-medium" key={indication.id}>
                      {indication.name}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </>
      ) : (
        <>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2 items-center">
            <div className="flex border rounded items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </>
      )}
    </div>
  );
});

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const productId = search.get("product-id");
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const { setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    setLoading(true);
    if (productId) {
      apiClient
        .get<Product>(`/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          setError(error.response?.data?.message);
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
      }
    },
    [addToCart, navigate, product]
  );

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-6 justify-between">
      <div className="w-full md:w-2/3">
        <ProductImage product={product} />
      </div>
      <div className="w-full md:w-1/3">
        <ProductDetails product={product} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default ProductPage;
