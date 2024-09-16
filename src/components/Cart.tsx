import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Minus, Pill, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartContext, { CartItem } from "../context/CartProvider";
import AuthContext from "@/context/AuthProvider";
import { formatPrice } from "@/utils/priceUtils";

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCountChange = (item: CartItem, count: string) =>
    updateCart(item, parseInt(count));

  const handleGoToCart = () => navigate("/checkout");

  const CartProduct = ({ item }: { item: CartItem }) => (
    <div className="flex gap-4 border-b pb-4 mb-4">
      <div className="h-24 w-24 flex-shrink-0 border flex justify-center items-center">
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
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-sm">{item.name}</p>
          <p className="text-sm">{formatPrice(item.price)} AZN</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <select
            value={item.quantity}
            onChange={(e) => handleCountChange(item, e.target.value)}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm"
          >
            {[...Array(20).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-600 flex items-center"
          >
            <Trash className="h-4 w-4 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const Summary = () => (
    <div className="bg-gray-50 p-4 rounded-md mt-4 md:mt-0">
      <p className="text-xl font-medium mb-4">{t("cart.summary")}</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <p>{t("cart.subtotal")}</p>
          {totalPrice > 0 ? (
            <p>{formatPrice(totalPrice)} AZN</p>
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </div>
        <div className="flex justify-between">
          <p>{t("cart.shipping-handling")}</p>
          <p>{t("cart.free")}</p>
        </div>
        <div className="flex justify-between">
          <p>{t("cart.estimated-tax")}</p>
          <Minus className="h-4 w-4" />
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <p>{t("cart.total")}</p>
          {totalPrice > 0 ? (
            <p>{formatPrice(totalPrice)} AZN</p>
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </div>
      </div>
      <Button
        onClick={handleGoToCart}
        className="w-full h-12 mt-4 text-sm"
        disabled={cart.length === 0}
      >
        {t("cart.checkout")}
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-[1080px] mx-auto">
      {!isAuthenticated() && (
        <div className="border border-muted-foreground p-3 mb-4 text-sm">
          <p className="font-semibold">{t("cart.join-us-title")}</p>
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

      <div className="md:flex md:gap-8">
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-medium mb-4">{t("cart.bag")}</h3>
          {cart.length === 0 ? (
            <p className="text-center py-8">{t("cart.empty-bag")}</p>
          ) : (
            cart.map((item) => <CartProduct key={item.id} item={item} />)
          )}
        </div>

        <div className="md:w-1/3">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
