import { Routes, Route, useLocation } from "react-router-dom";
import Home from "@/components/marketing/Home.tsx";
import Products from "@/components/Products.tsx";
import NotFound from "@/components/NotFound.tsx";
import ProductPage from "@/components/ProductPage.tsx";
import Signup from "@/components/auth/Signup.tsx";
import Login from "@/components/auth/Login.tsx";
import Layout from "./layouts/Layout.tsx";
import Profile from "@/components/Profile.tsx";
import RequireAuth from "@/components/auth/RequireAuth.tsx";
import PersistLogin from "@/components/auth/PersistLogin.tsx";
import Cart from "@/components/Cart.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./utils/scrollToTop.ts";
import ChangePassword from "@/components/auth/ChangePassword.tsx";
import EmailLookup from "@/components/auth/EmailLookup.tsx";
import VerifyEmail from "@/components/auth/VerifyEmail.tsx";
import { AnimatePresence } from "framer-motion";
import { RemoveTrailingSlash } from "@/components/RemoveTrailingSlash.tsx";

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
            <Route path={"/"} element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path={"/products"} element={<Products />} />
              <Route path={"/product-page"} element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />

              <Route element={<RequireAuth />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
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
