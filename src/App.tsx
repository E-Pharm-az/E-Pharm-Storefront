import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "@/components/marketing/Home.tsx";
import Products from "@/components/product/Products.tsx";
import NotFound from "@/components/NotFound.tsx";
import ProductPage from "@/components/product/ProductPage.tsx";
import Signup from "@/components/auth/Signup.tsx";
import Login from "@/components/auth/Login.tsx";
import Layout from "./components/Layout.tsx";
import Profile from "@/components/Account.tsx";
import RequireAuth from "@/components/auth/RequireAuth.tsx";
import PersistLogin from "@/components/auth/PersistLogin.tsx";
import Cart from "@/components/Cart.tsx";
import AuthLayout from "./components/auth/AuthLayout.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./utils/scrollToTop.ts";
import ChangePassword from "@/components/auth/ChangePassword.tsx";
import EmailLookup from "@/components/auth/EmailLookup.tsx";
import VerifyEmail from "@/components/auth/VerifyEmail.tsx";
import { AnimatePresence } from "framer-motion";
import { RemoveTrailingSlash } from "@/components/RemoveTrailingSlash.tsx";
import ComingSoon from "@/components/marketing/CommingSoon.tsx";
import Checkout from "@/components/checkout/Checkout.tsx";
import AboutUs from "@/components/marketing/AboutUs.tsx";

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <SpeedInsights />
      <Analytics />
      <RemoveTrailingSlash />
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-page" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route element={<RequireAuth />}>
                <Route
                  path="/account"
                  element={<Navigate to="/account/orders" replace />}
                />
                <Route path="/account/:tab" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/email-lookup" element={<EmailLookup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
