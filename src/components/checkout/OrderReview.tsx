import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import CheckoutContext, {
  CONFIRMATION_STEP,
} from "@/context/CheckoutProvider.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";

const OrderReview = () => {
  const [t] = useTranslation("global");
  const { formData } = useContext(CheckoutContext);
  const { setLoading } = useContext(LoaderContext);

  const handleConfirm = async () => {
    if (!formData.cardFieldsForm) {
      throw new Error("Card fields form is not available");
    }

    const formState = await formData.cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }

    setLoading(true);

    formData.cardFieldsForm.submit().catch((err) => {
      console.log(err);
      setLoading(false);
    });
  };
  return (
    <div>
      <div
        className={`flex items-center justify-between ${formData.step !== CONFIRMATION_STEP ? "text-muted-foreground" : "mb-6"}`}
      >
        <h3 className="text-2xl font-medium ">{t("checkout.order-review")}</h3>
      </div>
      <div
        className={`w-full grid gap-4 h-min ${formData.step !== CONFIRMATION_STEP && "hidden"}`}
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
