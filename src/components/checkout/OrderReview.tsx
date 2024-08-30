import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import { useCallback, useContext, useState } from "react";
import CheckoutContext, {
  CONFIRMATION_STEP,
} from "@/context/CheckoutProvider.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ErrorContext from "@/context/ErrorProvider";
import { AxiosError } from "axios";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Check, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartContext from "@/context/CartProvider";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const OrderReview = () => {
  const [t] = useTranslation("global");
  const { formData } = useContext(CheckoutContext);
  const { setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const [isOpen, setIsOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await axiosPrivate.post(`/orders/${formData.orderID}/capture`);
      setIsOpen(true);
      clearCart();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        navigate("/");
      }
    },
    [setIsOpen, navigate]
  );

  return (
    <div>
      <div
        className={`flex items-center justify-between ${
          formData.step === CONFIRMATION_STEP ? "mb-6" : "text-muted-foreground"
        }`}
      >
        <h3 className="text-2xl font-medium ">{t("checkout.order-review")}</h3>
      </div>
      <div
        className={`w-full grid gap-4 h-min ${
          formData.step !== CONFIRMATION_STEP && "hidden"
        }`}
      >
        <p>{t("checkout.order-review-details")} </p>
        <Button onClick={handleConfirm} className="w-min ml-auto p-6 mt-6">
          {t("checkout.confirm-order")}
        </Button>
        <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="text-green-500 h-8 w-8" />
              </div>
              <AlertDialogTitle className="text-2xl font-semibold">
                Payment Successful!
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Alert className="mt-4">
              <ShoppingBag className="h-4 w-4" />
              <AlertTitle>Order Created</AlertTitle>
              <AlertDescription>
                Your order has been successfully placed and is being processed.
              </AlertDescription>
            </Alert>
            <AlertDialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-3">
              <Button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto"
              >
                View Order
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
export default OrderReview;
