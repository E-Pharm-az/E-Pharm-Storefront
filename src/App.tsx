import {Routes, Route} from "react-router-dom";
import Home from "./views/Home.tsx";
import Products from "./views/Products.tsx";
import NotFound from "./views/NotFound.tsx";
import ProductPage from "./views/ProductPage.tsx";
import Signup from "./views/Signup.tsx";
import Login from "./views/Login.tsx";
import Layout from "./layouts/Layout.tsx";
import Profile from "./views/Profile.tsx";
import RequireAuth from "./components/Auth/RequireAuth.tsx";
import PersistLogin from "./components/Auth/PersistLogin.tsx";
import Cart from "./views/Cart.tsx";
import ConfirmEmail from "./views/ConfirmEmail.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import {SpeedInsights} from "@vercel/speed-insights/react";
import {Analytics} from "@vercel/analytics/react"
import ScrollToTop from "./utils/scrollToTop.ts"

function App() {
    return (
        <>
            <ScrollToTop />
            <SpeedInsights/>
            <Analytics/>
            <Routes>
                <Route element={<PersistLogin/>}>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path={"/products"} element={<Products/>}/>
                        <Route path={"/product-page"} element={<ProductPage/>}/>
                        <Route path="/cart" element={<Cart/>}/>

                        <Route element={<RequireAuth/>}>
                            <Route path="/profile" element={<Profile/>}/>
                        </Route>

                        <Route path="*" element={<NotFound/>}/>
                    </Route>

                    <Route element={<AuthLayout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/confirm-email" element={<ConfirmEmail/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
