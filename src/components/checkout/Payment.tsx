import {
  PayPalHostedField,
  PayPalHostedFieldsProvider,
  PayPalScriptProvider,
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
import CartContext from "@/context/CartProvider.tsx";
import AuthContext from "@/context/AuthProvider.tsx";
import { useTranslation } from "react-i18next";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import {Address} from "@/types/address.ts";
import { HostedFieldsSubmitResponse } from "@paypal/paypal-js/types/components/hosted-fields";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";

interface OrderResponse {
  id: string;
}

interface Props {
  paymentStep: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  address: Address;
}

const Payment = ({ paymentStep, step, setStep, address }: Props) => {
  const [t] = useTranslation("global");
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { cardFields } = usePayPalHostedFields();
  const { setError } = useContext(ErrorContext);
  const [clientToken, setClientToken] = useState("");
  const [useDefaultBillingAddress, setUseDefaultBillingAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState<Address>(address);
  const axiosPrivate = useAxiosPrivate();

  const initialOptions = {
    clientId: "AV8OvxBHzdo9HsH7QpN4Ytcw5gKcN2ZegyUqnzTKC357ujOosTp3J1975mbeUtJzXRZmYv8QJe_K8FCr",
    dataClientToken: clientToken,
    components: "hosted-fields",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>();

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
        shippingAddress: address,
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

  const onApprove = async (data: HostedFieldsSubmitResponse) => {
    const response = await axiosPrivate.post(`/orders/${data.orderId}/capture`);
    return response.data;
  };

  function onError(error: Record<string, unknown>) {
    console.log(error);
  }

  const onSubmit = async (data: Address) => {
    setBillingAddress(data);
    if (typeof cardFields?.submit !== "function") return;
    cardFields
      .submit({
        cardholderName: `${user?.firstName} ${user?.lastName}`,
        address
      })
      .then(async (data) => await onApprove(data))
      .catch(() => setError("Transaction could not be processed."));
  };

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
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 h-min">
              <div className="flex gap-2 w-full items-center">
                <Checkbox
                  checked={useDefaultBillingAddress}
                  onCheckedChange={() =>
                    setUseDefaultBillingAddress(!useDefaultBillingAddress)
                  }
                />
                <p className="font-semibold">
                  Billing address same as shipping?
                </p>
              </div>
              {useDefaultBillingAddress ? (
                <div className="w-full mb-3 px-2 py-4 text-sm text-gray-900 bg-transparent rounded-lg border border-neutral-300 text-muted-foreground">
                  <p>{`${address.address}, ${address.city}, ${address.district}, ${address.zip}`}</p>
                </div>
              ) : (
                <div className="w-full grid gap-3">
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
            </form>
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
