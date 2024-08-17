import CartContext, { CartItem } from "../context/CartProvider.tsx";
import { useContext } from "react";
import { Minus, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthProvider.tsx";

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const [t] = useTranslation("global");

  const handleCountChange = (item: CartItem, count: string) =>
    updateCart(item, parseInt(count));

  return (
    <div className="max-w-[1080px] lg:mx-auto lg:flex grid gap-8 mx-8 px-2">
      <div className="w-full">
        {!isAuthenticated() && (
          <div className="border border-muted p-2 mb-4">
            <p className="font-semibold text-lg">{t("cart.join-us-title")}</p>
            <p className="text-muted-foreground">
              <Link to="/email-lookup" className="text-primary underline">
                {t("cart.sign-in")}
              </Link>{" "}
              {t("cart.or")}{" "}
              <Link to="/email-lookup" className="text-primary underline">
                {t("cart.join")}
              </Link>{" "}
              {t("cart.enjoy-benefits")}
            </p>
          </div>
        )}
        <h3 className="text-2xl font-medium mb-4">{t("cart.bag")}</h3>
        {cart.length === 0 ? (
          <p>{t("cart.empty-bag")}</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-32 w-32 border"
                />
                <div className="w-full flex flex-col justify-between">
                  <div className="w-full flex justify-between">
                    <p className="font-semibold">{item.name}</p>
                    <p>{(item.price / 100).toFixed(2)} AZN</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Trash
                      onClick={() => removeFromCart(item.id)}
                      className="h-5 w-5 cursor-pointer text-gray-600"
                    />
                    <select
                      value={item.quantity}
                      onChange={(e) => handleCountChange(item, e.target.value)}
                      className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      {[...Array(20).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator className="block lg:hidden" />
      <div className="lg:w-[550px] grid gap-6 w-full">
        <p className="text-2xl font-medium">{t("cart.summary")}</p>
        <div className="grid gap-4">
          <div className="flex justify-between w-full">
            <p>{t("cart.subtotal")}</p>
            {totalPrice > 0 ? (
              <p>{(totalPrice / 100).toFixed(2)} AZN</p>
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
          <Separator />
          <div className="flex justify-between w-full">
            <p>{t("cart.total")}</p>
            {totalPrice > 0 ? (
              <p>{(totalPrice / 100).toFixed(2)} AZN</p>
            ) : (
              <Minus />
            )}
          </div>
          <Separator />
        </div>
        <Button
          className="w-full h-14 text-md"
          disabled={cart.length === 0}
          asChild
        >
          <Link to="/checkout">{t("cart.checkout")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
