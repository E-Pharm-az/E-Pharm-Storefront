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
  clientId:
    "AV8OvxBHzdo9HsH7QpN4Ytcw5gKcN2ZegyUqnzTKC357ujOosTp3J1975mbeUtJzXRZmYv8QJe_K8FCr",
  components: "card-fields",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PayPalScriptProvider options={initialOptions}>
      <ErrorProvider>
        <LoaderProvider>
          <I18nextProvider i18n={i18next}>
            <AuthProvider>
              <AuthFormProvider>
                <CartProvider>
                  <CheckoutProvider>
                    <App />
                  </CheckoutProvider>
                </CartProvider>
              </AuthFormProvider>
            </AuthProvider>
          </I18nextProvider>
        </LoaderProvider>
      </ErrorProvider>
    </PayPalScriptProvider>
  </BrowserRouter>
);
