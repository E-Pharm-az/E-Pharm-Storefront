import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Minus, Pill, ShoppingCart } from "lucide-react";
import CartContext, { CartItem } from "@/context/CartProvider.tsx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator.tsx";
import DeliveryDetails from "@/components/checkout/DeliveryDetails.tsx";
import Payment from "@/components/checkout/Payment.tsx";
import OrderReview from "@/components/checkout/OrderReview.tsx";
import { formatPrice } from "@/utils/priceUtils";

const CartProduct = ({ item }: { item: CartItem }) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-4 w-full">
        <div className="h-16 w-16 flex-shrink-0 border flex justify-center items-center">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Pill className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center">
          <div>
            <p className="font-semibold text-sm">{item.name}</p>
            <p className="text-sm">{formatPrice(item.price)} ₼</p>
          </div>
        </div>
      </div>
      <p className="font-medium text-md">{item.quantity}x</p>
    </div>
  );
};

const Checkout = () => {
  const [t] = useTranslation("global");
  const { cart } = useContext(CartContext);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main>
      <nav className="bg-white p-2 justify-between flex px-2 sm:px-10 items-center">
        <Link to="/">
          <div className="flex flex-shrink-0 items-center gap-1 pointer-events-none">
            <img src={Logo} alt="logo" className="h-10 pointer-events-none" />
            <h1 className="text-2xl font-medium sm:text-2xl">E-Pharm</h1>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button size="icon" variant="ghost" className="px-2" asChild>
            <Link to="/cart" className="relative">
              {cart.length > 0 && (
                <p className="absolute -top-2 right-0 rounded-full bg-red-500 px-1 text-xs text-white Z-1">
                  {cart.length}
                </p>
              )}
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </nav>
      <div className="w-full p-12">
        <h1 className="text-2xl font-medium text-center">
          {t("checkout.checkout")}
        </h1>
      </div>
      <div className="max-w-[1080px] w-full md:mx-auto md:flex grid gap-12 px-2">
        <div className="w-full grid gap-6">
          <DeliveryDetails />
          <Separator />
          <Payment />
          <Separator />
          <OrderReview />
          <Separator />
        </div>

        <div className="md:max-w-[360px] grid gap-6 w-full h-min">
          <div className="flex justify-between w-full">
            <p className="text-2xl font-medium">{t("checkout.in-your-bag")}</p>
            <Button variant="link" className="p-0" asChild>
              <Link to="/cart">{t("common.edit")}</Link>
            </Button>
          </div>
          <div className="grid gap-4 text-sm">
            <div className="flex justify-between w-full">
              <p>{t("cart.subtotal")}</p>
              {totalPrice > 0 ? (
                <p>{formatPrice(totalPrice)} AZN</p>
              ) : (
                <Minus />
              )}
            </div>
            <div className="flex justify-between w-full">
              <p>{t("cart.shipping-handling")}</p>
              <p>{t("cart.free")}</p>
            </div>
            <div className="flex justify-between w-full">
              <p>{t("cart.estimated-tax")}</p>
              <Minus />
            </div>
            {cart.map((item) => (
              <CartProduct key={item.id} item={item} />
            ))}
            <div className="flex justify-between w-full font-semibold">
              <p>{t("cart.total")}</p>
              {totalPrice > 0 ? (
                <p>{formatPrice(totalPrice)} AZN</p>
              ) : (
                <Minus />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Checkout;
