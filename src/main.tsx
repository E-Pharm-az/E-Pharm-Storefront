import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18next from "i18next";
import global_en from "./translation/en/global.json";
import global_az from "./translation/az/global.json";
import global_ru from "./translation/ru/global.json";
import {I18nextProvider} from "react-i18next";
import {AuthProvider} from "./context/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./context/CartProvider.tsx";

i18next.init({
    interpolation: {escapeValue: false},
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


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <AuthProvider>
                    <CartProvider>
                        <App/>
                    </CartProvider>
                </AuthProvider>
            </I18nextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)