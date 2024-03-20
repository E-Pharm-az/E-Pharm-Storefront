import {Routes, Route} from "react-router-dom";
import Home from "./components/Home.tsx";
import Products from "./components/Products.tsx";
import NotFound from "./components/NotFound.tsx";
import ProductPage from "./components/ProductPage.tsx";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import Layout from "./components/Layout.tsx";
import Profile from "./components/Profile.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route element={<PersistLogin/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path={"/products"} element={<Products/>}/>
                    <Route path={"/product-page"} element={<ProductPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>

                    <Route element={<RequireAuth/>}>
                        <Route path="/profile" element={<Profile/>}/>
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
