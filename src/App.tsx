import { Routes, Route } from "react-router-dom";
import Home from "@/components/views/Home.tsx";
import Products from "@/components/views/Products.tsx";
import NotFound from "@/components/views/NotFound.tsx";
import ProductPage from "@/components/views/ProductPage.tsx";
import Signup from "@/components/views/Signup.tsx";
import Login from "@/components/views/Login.tsx";
import Layout from "./layouts/Layout.tsx";
import Profile from "@/components/views/Profile.tsx";
import RequireAuth from "@/components/RequireAuth.tsx";
import PersistLogin from "@/components/PersistLogin.tsx";
import Cart from "@/components/views/Cart.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./utils/scrollToTop.ts";
import ForgotPassword from "@/components/views/ForgotPassword.tsx";
import ChangePassword from "@/components/views/ChangePassword.tsx";
import EmailLookup from "@/components/views/EmailLookup.tsx";
import VerifyEmail from "@/components/views/VerifyEmail.tsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <SpeedInsights />
      <Analytics />
      <Routes>
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
            <Route path="/verify-email" element={<VerifyEmail/>}/>
            <Route path="/signup" element={<Signup/>}/>

            <Route path="/login" element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
