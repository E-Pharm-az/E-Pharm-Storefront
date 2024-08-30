import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18next from "i18next";
import global_en from "./translation/en/global.json";
import global_az from "./translation/az/global.json";
import global_ru from "./translation/ru/global.json";
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartProvider.tsx";
import { AuthFormProvider } from "@/context/AuthFormProvider.tsx";
import { ErrorProvider } from "@/context/ErrorProvider.tsx";
import { LoaderProvider } from "@/context/LoaderProvider.tsx";
import { CheckoutProvider } from "@/context/CheckoutProvider.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

i18next.init({
  interpolation: { escapeValue: false },
  lng: "ru",
  resources: {
    en: {
      global: global_en,
    },
    az: {
      global: global_az,
    },
    ru: {
      global: global_ru,
    },
  },
});

const initialOptions = {
  clientId: PAYPAL_CLIENT_ID,
  components: "card-fields",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <LoaderProvider>
        <ErrorProvider>
          <AuthProvider>
            <AuthFormProvider>
              <CartProvider>
                <PayPalScriptProvider options={initialOptions}>
                  <CheckoutProvider>
                    <App />
                  </CheckoutProvider>
                </PayPalScriptProvider>
              </CartProvider>
            </AuthFormProvider>
          </AuthProvider>
        </ErrorProvider>
      </LoaderProvider>
    </I18nextProvider>
  </BrowserRouter>
);
