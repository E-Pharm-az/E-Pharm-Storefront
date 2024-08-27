import {
  PayPalScriptProvider,
  PayPalCardFieldsProvider,
  PayPalNameField,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
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
import ErrorContext from "@/context/ErrorProvider";

interface OrderResponse {
  id: string;
}

const Payment = () => {
  const [t] = useTranslation("global");
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { setError } = useContext(ErrorContext);
  const { formData, updateFormData } = useContext(CheckoutContext);
  const [useDefault, setUseDefault] = useState(true);
  const [billingAddress, setBillingAddress] = useState<Address>(
    formData.address!
  );
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>();

  const createOrder = async (): Promise<string> => {
    const response = await axiosPrivate.post<OrderResponse>("/orders", {
      userId: user?.id,
      shippingAddress: formData.address,
      currency: "USD",
      products: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });

    return response.data.id;
  };

  const onApprove = async (data: CardFieldsOnApproveData) => {
    const response = await axiosPrivate.post(`/orders/${data.orderID}/capture`);
    return response.data;
  };

  function onError(error: Record<string, unknown>) {
    console.log(error);
  }

  const onSubmit = async (data: Address) => {
    setBillingAddress(data);
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between ${
          formData.step !== PAYMENT_STEP ? "text-muted-foreground" : "mb-6"
        }`}
      >
        <h3 className="text-2xl font-medium ">{t("checkout.payment")}</h3>
        {formData.step !== PAYMENT_STEP && (
          <Button
            variant="link"
            onClick={() => updateFormData({ step: PAYMENT_STEP })}
          >
            Edit
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
            <div className="p-6 border border-accent-foreground rounded-md">
              <p className="font-semibold">Add Card</p>
              <div className="my-8 grid gap-2 w-full">
                <PayPalNameField className="w-full" />
                <div className="grid gap-2 md:flex w-full">
                  <PayPalNumberField className="w-full" />
                  <PayPalExpiryField className="w-full md:w-[200px]" />
                  <PayPalCVVField className="w-full md:w-[200px]" />
                </div>
              </div>
            </div>
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
                  Billing address same as shipping?
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
              <SubmitPayment billingAddress={billingAddress} />
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
}

const SubmitPayment = ({ billingAddress }: SubmitPaymentProps) => {
  const [t] = useTranslation("global");
  const { cardFieldsForm, fields } = usePayPalCardFields();
  const { updateFormData } = useContext(CheckoutContext);

  const handleClick = async () => {
    if (!cardFieldsForm) {
      throw new Error(
        "Unable to find any child components in the <PayPalCardFieldsProvider />"
      );
    }

    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }

    updateFormData({
      billingAddress: billingAddress,
      step: CONFIRMATION_STEP,
      cardFieldsForm: cardFieldsForm,
    });
  };

  return (
    <Button onClick={handleClick} type="submit" className="w-min ml-auto p-6">
      {t("checkout.save-and-continue")}
    </Button>
  );
};
