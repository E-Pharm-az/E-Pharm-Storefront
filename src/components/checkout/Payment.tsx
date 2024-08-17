import {
  PayPalButtons,
  PayPalHostedField,
  PayPalHostedFieldsProvider,
  PayPalScriptProvider,
  usePayPalCardFields,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { axiosPrivate } from "@/services/api-client.ts";
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";
import CartContext from "@/context/CartProvider.tsx";
import AuthContext from "@/context/AuthProvider.tsx";
import { useTranslation } from "react-i18next";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";

interface OrderResponse {
  id: string;
}

interface Props {
  paymentStep: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  deliveryAddress: string;
}

interface BillingAddressFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  zip: string;
}

const Payment = ({ paymentStep, step, setStep, deliveryAddress }: Props) => {
  const [t] = useTranslation("global");
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { setError } = useContext(ErrorContext);
  const [clientToken, setClientToken] = useState("");
  const [useDefaultBillingAddress, setUseDefaultBillingAddress] =
    useState(true);

  const initialOptions = {
    clientId:
      "AV8OvxBHzdo9HsH7QpN4Ytcw5gKcN2ZegyUqnzTKC357ujOosTp3J1975mbeUtJzXRZmYv8QJe_K8FCr",
    dataClientToken: clientToken,
    components: "hosted-fields",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingAddressFormData>();

  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.post<string>("/orders/token");
      setClientToken(response.data);
    })();
  }, []);

  const createOrder = async () => {
    try {
      const response = await axiosPrivate.post<OrderResponse>("/orders", {
        userId: user!.id,
        shippingAddress: deliveryAddress,
        currency: "USD",
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      return response.data.id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const onApprove = async (data: OnApproveData) => {
    const response = await axiosPrivate.post(`/orders/${data.orderID}/capture`);
    return response.data;
  };

  function onError(error: Record<string, unknown>) {
    console.log(error);
  }

  return (
    <div className="w-full">
      <h3
        className={`text-2xl font-medium ${step === paymentStep ? "mb-6" : "text-muted-foreground"}`}
      >
        {t("checkout.payment")}
      </h3>
      {step === paymentStep &&
        (clientToken !== "" ? (
          <div className="w-full grid gap-8">
            <PayPalScriptProvider options={initialOptions}>
              <PayPalHostedFieldsProvider createOrder={createOrder}>
                <div className="p-6 border border-accent-foreground rounded-md">
                  <p className="font-semibold">Add Card</p>
                  <div className="my-8 grid md:flex gap-4 w-full">
                    <PayPalHostedField
                      id="card-number"
                      hostedFieldType="number"
                      options={{
                        selector: "#card-number",
                        placeholder: "Card Number",
                      }}
                      className="w-full h-12 px-2 py-4 text-sm text-gray-900 rounded-lg border border-neutral-300 outline-none appearance-none"
                    />
                    <PayPalHostedField
                      id="expiration-date"
                      hostedFieldType="expirationDate"
                      options={{
                        selector: "#expiration-date",
                        placeholder: "Expiration Date",
                      }}
                      className="w-full md:w-[200px] h-12 px-2 py-4 text-sm text-gray-900 rounded-lg border border-neutral-300 outline-none appearance-none"
                    />
                    <PayPalHostedField
                      id="cvv"
                      hostedFieldType="cvv"
                      options={{
                        selector: "#cvv",
                        placeholder: "CVV",
                      }}
                      className="w-full md:w-[200px] h-12 px-2 py-4 text-sm text-gray-900 rounded-lg border border-neutral-300 outline-none appearance-none"
                    />
                  </div>
                </div>
              </PayPalHostedFieldsProvider>
            </PayPalScriptProvider>
            <div className="grid gap-4 h-min">
              <div className="flex gap-2 w-full items-center">
                <Checkbox
                  checked={useDefaultBillingAddress}
                  onCheckedChange={() =>
                    setUseDefaultBillingAddress(!useDefaultBillingAddress)
                  }
                />
                <p className="font-semibold">Use default address?</p>
              </div>
              {useDefaultBillingAddress ? (
                <div className="w-full mb-3 px-2 py-4 text-sm text-gray-900 bg-transparent rounded-lg border border-neutral-300 text-muted-foreground">
                  <p>{user?.address}</p>
                </div>
              ) : (
                <div className="w-full grid gap-3">
                  <div className="flex gap-2 w-full">
                    <div className="w-full h-min">
                      <Input
                        type="text"
                        label={t("address.firstName")}
                        autoCorrect="off"
                        autoComplete="given-name"
                        className={`${errors.firstName && "border-red-500 focus:border-red-500"}`}
                        {...register("firstName", {
                          required: t("common.required"),
                        })}
                      />
                      <p className="w-full h-3 text-xs text-red-500">
                        {errors.firstName?.message}
                      </p>
                    </div>
                    <div className="w-full h-min">
                      <Input
                        type="text"
                        label={t("address.lastName")}
                        autoCorrect="off"
                        autoComplete="family-name"
                        className={`${errors.lastName && "border-red-500 focus:border-red-500"}`}
                        {...register("lastName", {
                          required: t("common.required"),
                        })}
                      />
                      <p className="w-full h-3 text-xs text-red-500">
                        {errors.lastName?.message}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-min">
                    <Input
                      type="text"
                      label={t("address.address")}
                      autoCorrect="off"
                      autoComplete="address-line1"
                      className={`${errors.address && "border-red-500 focus:border-red-500"}`}
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
                        className={`${errors.city && "border-red-500 focus:border-red-500"}`}
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
                        className={`${errors.district && "border-red-500 focus:border-red-500"}`}
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
                        className={`${errors.zip && "border-red-500 focus:border-red-500"}`}
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
            </div>
            <Button type="submit" className="w-min ml-auto p-6">
              {t("checkout.save-and-continue")}
            </Button>
          </div>
        ) : (
          <div>
            <div className="p-6 border border-accent-foreground rounded-md">
              <Skeleton className="h-6 w-24 mb-8" />
              <div className="my-8 grid md:flex gap-4 w-full">
                <Skeleton className="w-full h-12 rounded-lg" />
                <Skeleton className="w-full md:w-[200px] h-12 rounded-lg" />
                <Skeleton className="w-full md:w-[200px] h-12 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Payment;

const SubmitPayment = ({ onHandleMessage }) => {
  // Here declare the variable containing the hostedField instance
  const { cardFields } = usePayPalHostedFields();
  const cardHolderName = useRef(null);

  const submitHandler = () => {
    if (typeof cardFields?.submit !== "function") return; // validate that \`submit()\` exists before using it
    //if (errorMsg) showErrorMsg(false);
    cardFields
      .submit({
        // The full name as shown in the card and billing addresss
        // These fields are optional for Sandbox but mandatory for production integration
        cardholderName: cardHolderName?.current?.value,
      })
      .then(async (data) => onHandleMessage(await onApproveCallback(data)))
      .catch((orderData) => {
        onHandleMessage(
          `Sorry, your transaction could not be processed...${JSON.stringify(
            orderData,
          )}`,
        );
      });
  };

  return (
    <button onClick={submitHandler} className="btn btn-primary">
      Pay
    </button>
  );
};
