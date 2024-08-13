import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Minus, ShoppingCart } from "lucide-react";
import CartContext from "@/context/CartProvider.tsx";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator.tsx";
import {
  PayPalScriptProvider,
  usePayPalCardFields,
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { axiosPrivate } from "@/services/api-client.ts";
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";
import AuthContext from "@/context/AuthProvider.tsx";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
}

interface OrderResponse {
  orderId: string;
}

const Checkout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const [step, setStep] = useState(1);
  const [t] = useTranslation("global");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setFormData(data);
  };

  const [isPaying, setIsPaying] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    adminArea1: "",
    adminArea2: "",
    countryCode: "",
    postalCode: "",
  });

  const createOrder = async () => {
    const response = await axiosPrivate.post<OrderResponse>("/orders", {
      email: formData.email,
      fullName: `${formData.firstName} ${formData.lastName}`,
      shippingAddress: formData.address,
      currency: "USD",
      products: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });

    return response.data.orderId;
  };

  const onApprove = async (data: OnApproveData) => {
    const response = await axiosPrivate.post(`/orders/${data.orderID}/capture`);
    return response.data;
  };

  function onError(error) {
    // Do something with the error from the SDK
  }

  function handleBillingAddressChange(field, value) {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

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
      <div className="max-w-[1080px] w-full lg:mx-auto lg:flex grid gap-12 mx-8 px-2">
        <div className="w-full grid gap-6">
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
          <div>
            <h3
              className={`text-2xl font-medium ${step === 1 ? "mb-6" : "text-muted-foreground"}`}
            >
              {t("checkout.delivery-details")}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`w-full grid gap-4 h-min ${step !== 1 && "hidden"}`}
            >
              <div className="flex gap-4 w-full h-min">
                <div className="w-full h-min">
                  <Input
                    type="text"
                    label={t("checkout.firstname")}
                    autoComplete="given-name"
                    autoCorrect="off"
                    autoCapitalize="on"
                    {...register("firstName", {
                      required: t("common.required"),
                    })}
                    className={`${errors.firstName && "border-red-500 focus:border-red-500"}`}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.firstName?.message}
                  </p>
                </div>
                <div className="w-full h-min">
                  <Input
                    type="text"
                    label={t("checkout.lastname")}
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
                  label={t("checkout.address")}
                  autoCorrect="off"
                  autoComplete="address-line1"
                  className={`${errors.lastName && "border-red-500 focus:border-red-500"}`}
                  {...register("address", { required: t("common.required") })}
                />
                <p className="w-full h-3 text-xs text-red-500">
                  {errors.address?.message}
                </p>
              </div>
              <div className="flex gap-4 w-full h-min">
                <div className="w-full h-min">
                  <Input
                    type="email"
                    label={t("checkout.email")}
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    {...register("email", { required: t("common.required") })}
                    className={`${errors.firstName && "border-red-500 focus:border-red-500"}`}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="w-full h-min">
                  <Input
                    type="text"
                    label={t("checkout.phone-number")}
                    autoCorrect="off"
                    autoComplete="mobile tel"
                    className={`${errors.email && "border-red-500 focus:border-red-500"}`}
                    {...register("phoneNumber", {
                      required: t("common.required"),
                    })}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.phoneNumber?.message}
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-min ml-auto p-6 mt-6">
                {t("checkout.save-and-continue")}
              </Button>
            </form>
          </div>

          <Separator />

          <div className="w-full">
            <h3
              className={`text-2xl font-medium ${step === 2 ? "mb-6" : "text-muted-foreground"}`}
            >
              {t("checkout.payment")}
            </h3>
            <div className={`${step !== 2 && "hidden"}`}>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AQYOcvO9w4UvyZSGLV4OUm4C8KlX6aU_kSgRLSb6GRziLMmISjHqfkVk65ZRufkXVQEkDyn-ZwOasD9k",
                  components: "card-fields,buttons",
                }}
              >
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
                <PayPalCardFieldsProvider
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                >
                  <PayPalCardFieldsForm />
                  <input
                    type="text"
                    id="card-billing-address-line-2"
                    name="card-billing-address-line-2"
                    placeholder="Address line 1"
                    onChange={(e) =>
                      handleBillingAddressChange("addressLine1", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    id="card-billing-address-line-2"
                    name="card-billing-address-line-2"
                    placeholder="Address line 2"
                    onChange={(e) =>
                      handleBillingAddressChange("addressLine2", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    id="card-billing-address-admin-area-line-1"
                    name="card-billing-address-admin-area-line-1"
                    placeholder="Admin area line 1"
                    onChange={(e) =>
                      handleBillingAddressChange("adminArea1", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    id="card-billing-address-admin-area-line-2"
                    name="card-billing-address-admin-area-line-2"
                    placeholder="Admin area line 2"
                    onChange={(e) =>
                      handleBillingAddressChange("adminArea2", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    id="card-billing-address-country-code"
                    name="card-billing-address-country-code"
                    placeholder="Country code"
                    onChange={(e) =>
                      handleBillingAddressChange("countryCode", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    id="card-billing-address-postal-code"
                    name="card-billing-address-postal-code"
                    placeholder="Postal/zip code"
                    onChange={(e) =>
                      handleBillingAddressChange("postalCode", e.target.value)
                    }
                  />
                  {/* Custom client component to handle card fields submission */}
                  <SubmitPayment
                    isPaying={isPaying}
                    setIsPaying={setIsPaying}
                    billingAddress={billingAddress}
                  />
                </PayPalCardFieldsProvider>
              </PayPalScriptProvider>
            </div>
          </div>

          <Separator />

          <h3 className="text-2xl font-medium text-muted-foreground">
            {t("checkout.order-review")}
          </h3>

          <Separator />
        </div>

        <div className="lg:max-w-[360px] grid gap-6 w-full h-min">
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
            <div className="flex justify-between w-full font-semibold">
              <p>{t("cart.total")}</p>
              {totalPrice > 0 ? (
                <p>{(totalPrice / 100).toFixed(2)} AZN</p>
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

const SubmitPayment = ({ isPaying, setIsPaying, billingAddress }) => {
  const { cardFieldsForm, fields } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);

    cardFieldsForm.submit({ billingAddress }).catch((err) => {
      setIsPaying(false);
    });
  };

  return (
    <button
      className={isPaying ? "btn" : "btn btn-primary"}
      style={{ float: "right" }}
      onClick={handleClick}
    >
      {isPaying ? <div className="spinner tiny" /> : "Pay"}
    </button>
  );
};
