import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import CheckoutContext, {
  CONFIRMATION_STEP,
} from "@/context/CheckoutProvider.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const OrderReview = () => {
  const [t] = useTranslation("global");
  const { formData } = useContext(CheckoutContext);
  const { setLoading } = useContext(LoaderContext);
  const axiosPrivate = useAxiosPrivate();

  const handleConfirm = async () => {
    setLoading(true);
    await axiosPrivate.post(`/orders/${formData.orderID}/capture`);
    setLoading(false);
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between ${
          formData.step !== CONFIRMATION_STEP ? "text-muted-foreground" : "mb-6"
        }`}
      >
        <h3 className="text-2xl font-medium ">{t("checkout.order-review")}</h3>
      </div>
      <div
        className={`w-full grid gap-4 h-min ${
          formData.step !== CONFIRMATION_STEP && "hidden"
        }`}
      >
        <p>Confirm order</p>
        <Button onClick={handleConfirm} className="w-min ml-auto p-6 mt-6">
          Confirm
        </Button>
      </div>
    </div>
  );
};
export default OrderReview;
