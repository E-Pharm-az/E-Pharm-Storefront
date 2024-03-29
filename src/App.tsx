import {Routes, Route} from "react-router-dom";
import Home from "./components/Home.tsx";
import Products from "./components/Product/Products.tsx";
import NotFound from "./components/NotFound.tsx";
import ProductPage from "./components/Product/ProductPage.tsx";
import Signup from "./components/Auth/Signup.tsx";
import Login from "./components/Auth/Login.tsx";
import Layout from "./components/Layout.tsx";
import Profile from "./components/Profile.tsx";
// import RequireAuth from "./components/Auth/RequireAuth.tsx";
// import PersistLogin from "./components/Auth/PersistLogin.tsx";
import Cart from "./components/Cart.tsx";
import Payment from "./components/Payment.tsx";

function App() {
    return (
        <Routes>
            {/* <Route element={<PersistLogin/>}> */}
                <Route path={"/"} element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path={"/products"} element={<Products/>}/>
                    <Route path={"/product-page"} element={<ProductPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/cart" element={<Cart/>}/>

                    {/* <Route element={<RequireAuth/>}> */}
                        <Route path="/profile" element={<Profile/>}/>
                    {/* </Route> */}

                    <Route path="*" element={<NotFound/>}/>
                </Route>

                {/* <Route element={<RequireAuth/>}> */}
                    <Route path="/payment" element={<Payment/>}/>
                {/* </Route> */}
            {/* </Route> */}
        // </Routes>
    )
}

export default App
