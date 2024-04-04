import {useContext} from "react";
import {NavLink} from "react-router-dom";
import Logo from "../assets/e-pharm.png";
import LanguageSelector from "./LanguageSelector.tsx";
import {BsCart, BsPerson, BsPersonPlus} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import AuthContext from "../context/AuthProvider.tsx";
import {SearchProducts} from "./SearchProducts.tsx";
import CartContext from "../context/CartProvider.tsx";

export const Navbar = () => {
    const {auth} = useContext(AuthContext);
    const {cart} = useContext(CartContext);
    const [t] = useTranslation("global");

    return (
        <nav className="container gap-4 bg-white p-4 items-center space-x-2 md:flex hidden">
            <NavLink to={"/"} className="flex space-x-2 items-center flex-shrink-0">
                <img src={Logo} alt="logo" className="h-12"/>
                <h1 className="text-2xl sm:text-3xl font-bold">E-Pharm</h1>
            </NavLink>
            <div className="w-full flex ml-auto gap-4 items-center">
                <SearchProducts/>
                <LanguageSelector/>
                <NavLink to={"/cart"} className="relative hover:opacity-70 transition flex items-center">
                    <p className="absolute text-white text-xs -top-2 left-2 Z-1 px-1 bg-red-500 rounded-full mr-2">{cart.length}</p>
                    <BsCart className="w-5 h-5 mr-2"/>
                    <span className="hidden lg:block">{t("nav.cart")}</span>
                </NavLink>
                {auth ? (
                    <>
                        <NavLink to={"/profile"} className="hover:opacity-70 transition flex items-center flex-shrink-0">
                            <BsPerson className="w-5 h-5 mr-2"/>
                            <p>{t("nav.hi")} {auth.firstname}</p>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={"/login"} className="hover:opacity-70 transition flex items-center flex-shrink-0">
                            <BsPerson className="w-5 h-5 mr-2"/>
                            <span>{t("nav.login")}</span>
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};
