import {
  PayPalCardFieldsProvider,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import CartContext from "@/context/CartProvider.tsx";
import AuthContext from "@/context/AuthProvider.tsx";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import { Address } from "@/types/address.ts";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { CardFieldsOnApproveData } from "@paypal/paypal-js/types/components/card-fields";
import CheckoutContext, {
  CONFIRMATION_STEP,
  PAYMENT_STEP,
} from "@/context/CheckoutProvider.tsx";
import LoaderContext from "@/context/LoaderProvider";
import ErrorContext from "@/context/ErrorProvider";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface OrderResponse {
  id: string;
}

const Payment = () => {
  const [t] = useTranslation("global");
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { formData, updateFormData } = useContext(CheckoutContext);
  const { setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const [useDefault, setUseDefault] = useState(true);
  const [billingAddress, setBillingAddress] = useState<Address>(
    formData.address!
  );
  const [showError, setShowError] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>();

  const createOrder = async (): Promise<string> => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post<OrderResponse>("/orders", {
        userId: user?.id,
        address: formData.address?.address,
        district: formData.address?.district,
        city: formData.address?.city,
        zip: formData.address?.zip,
        currency: "USD",
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      return response.data.id;
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      }
      navigate("/cart");
      return "";
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data: CardFieldsOnApproveData) => {
    updateFormData({ orderID: data.orderID });
  };

  function onError(error: Record<string, unknown>) {
    try {
      const errorMessage = error.message as string;
      const jsonStartIndex = errorMessage.indexOf("{");
      const jsonString = errorMessage.slice(jsonStartIndex);
      const errorObject = JSON.parse(jsonString);

      const description = errorObject.details[0].description;
      if (description === "Invalid card number") {
        setError(t("errors.invalid-card-number"));
      }
    } catch (parseError) {
      console.log("Failed to parse error message:", error.message);
    }
  }

  const onSubmit = async (data: Address) => {
    setBillingAddress(data);
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between ${
          formData.step === PAYMENT_STEP ? "mb-6" : "text-muted-foreground"
        }`}
      >
        <h3 className="text-2xl font-medium ">{t("checkout.payment")}</h3>
        {formData.step > PAYMENT_STEP && (
          <Button
            variant="link"
            onClick={() => updateFormData({ step: PAYMENT_STEP })}
          >
            {t("common.edit")}
          </Button>
        )}
      </div>
      {formData.step === PAYMENT_STEP && (
        <PayPalCardFieldsProvider
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        >
          <div className="grid gap-8 w-full">
            <div className="p-6 border  rounded-md border-accent-foreground">
              <p className="font-semibold">{t("checkout.add-card")}</p>
              <div className="grid gap-2 md:flex w-full my-8">
                <PayPalNumberField
                  className="w-full"
                  placeholder={t("checkout.card-number")}
                />
                <PayPalExpiryField
                  className="w-full md:w-[200px]"
                  placeholder={t("checkout.mm-yy")}
                />
                <PayPalCVVField
                  className="w-full md:w-[200px]"
                  placeholder={t("checkout.cvv")}
                />
              </div>
            </div>
            {showError && (
              <p className="text-red-500">
                {t("checkout.card-fields-required")}
              </p>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 h-min"
            >
              <div className="flex gap-2 w-full items-center">
                <Checkbox
                  checked={useDefault}
                  onCheckedChange={() => setUseDefault(!useDefault)}
                />
                <p className="font-semibold">
                  {t("checkout.use-same-billing-address")}
                </p>
              </div>
              {useDefault ? (
                <div className="w-full mb-3 px-2 py-4 text-sm text-gray-900 bg-transparent rounded-lg border border-neutral-300 text-muted-foreground">
                  <p>{`${formData.address?.address}, ${formData.address?.city}, ${formData.address?.district}, ${formData.address?.zip}`}</p>
                </div>
              ) : (
                <div className="w-full grid gap-3">
                  <div className="w-full h-min">
                    <Input
                      type="text"
                      label={t("address.address")}
                      autoCorrect="off"
                      autoComplete="address-line1"
                      className={`${
                        errors.address && "border-red-500 focus:border-red-500"
                      }`}
                      {...register("address", {
                        required: t("common.required"),
                      })}
                    />
                    <p className="w-full h-3 text-xs text-red-500">
                      {errors.address?.message}
                    </p>
                  </div>
                  <div className="flex gap-2 w-full">
                    <div className="w-full h-min">
                      <Input
                        type="text"
                        label={t("address.city")}
                        autoCorrect="off"
                        className={`${
                          errors.city && "border-red-500 focus:border-red-500"
                        }`}
                        {...register("city", {
                          required: t("common.required"),
                        })}
                      />
                      <p className="w-full h-3 text-xs text-red-500">
                        {errors.city?.message}
                      </p>
                    </div>
                    <div className="w-full h-min">
                      <Input
                        type="text"
                        label={t("address.district")}
                        autoCorrect="off"
                        className={`${
                          errors.district &&
                          "border-red-500 focus:border-red-500"
                        }`}
                        {...register("district", {
                          required: t("common.required"),
                        })}
                      />
                      <p className="w-full h-3 text-xs text-red-500">
                        {errors.district?.message}
                      </p>
                    </div>
                    <div className="w-full h-min">
                      <Input
                        type="text"
                        label={t("address.zip")}
                        autoCorrect="off"
                        className={`${
                          errors.zip && "border-red-500 focus:border-red-500"
                        }`}
                        {...register("zip", {
                          required: t("common.required"),
                        })}
                      />
                      <p className="w-full h-3 text-xs text-red-500">
                        {errors.zip?.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <SubmitPayment
                billingAddress={billingAddress}
                setShowError={setShowError}
              />
            </form>
          </div>
        </PayPalCardFieldsProvider>
      )}
    </div>
  );
};

export default Payment;

interface SubmitPaymentProps {
  billingAddress: Address;
  setShowError: Dispatch<SetStateAction<boolean>>;
}

const SubmitPayment = ({ setShowError }: SubmitPaymentProps) => {
  const [t] = useTranslation("global");
  const { cardFieldsForm } = usePayPalCardFields();
  const { setLoading } = useContext(LoaderContext);
  const { updateFormData } = useContext(CheckoutContext);

  const handleClick = async () => {
    if (!cardFieldsForm) {
      throw new Error(
        "Unable to find any child components in the <PayPalCardFieldsProvider />"
      );
    }

    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setLoading(true);

    await cardFieldsForm.submit().catch((err) => {
      console.log(err);
    });

    setLoading(false);
    updateFormData({ step: CONFIRMATION_STEP });
  };

  return (
    <Button onClick={handleClick} type="submit" className="w-min ml-auto p-6">
      {t("checkout.save-and-continue")}
    </Button>
  );
};
