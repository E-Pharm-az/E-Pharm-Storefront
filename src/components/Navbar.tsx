import {useContext} from "react";
import {NavLink} from "react-router-dom";
import Logo from "../assets/logo.svg";
import LanguageSelector from "./LanguageSelector.tsx";
import {useTranslation} from "react-i18next";
import AuthContext from "../context/AuthProvider.tsx";
import CartContext from "../context/CartProvider.tsx";
import {ShoppingCart, UserRound} from "lucide-react";

export const Navbar = () => {
    const {auth} = useContext(AuthContext);
    const {cart} = useContext(CartContext);
    const [t] = useTranslation("global");

    return (
        <nav className="container justify-between gap-4 bg-white py-4 items-center space-x-2 md:flex hidden">
            <NavLink to={"/"} className="flex space-x-1 items-center flex-shrink-0">
                <img src={Logo} alt="logo" className="h-12"/>
                <h1 className="text-2xl sm:text-2xl font-medium">E-Pharm</h1>
            </NavLink>
            <div className="flex space-x-4 items-center">
                <LanguageSelector/>
                <NavLink to={"/cart"} className="relative hover:opacity-70 transition flex items-center">
                    <p className="absolute text-white text-xs -top-2 left-2 Z-1 px-1 bg-red-500 rounded-full mr-2">{cart.length}</p>
                    <ShoppingCart className="w-5 h-5 mr-2"/>
                </NavLink>
                {auth ? (
                    <>
                        <NavLink to={"/profile"} className="hover:opacity-70 transition flex items-center flex-shrink-0">
                            <UserRound className="w-5 h-5 mr-2"/>
                            <p>{t("nav.hi")} {auth.firstname}</p>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={"/login"}
                                 className="hover:opacity-70 transition flex items-center flex-shrink-0">
                            <UserRound className="w-5 h-5 mr-2"/>
                            <span>{t("nav.login")}</span>
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};
