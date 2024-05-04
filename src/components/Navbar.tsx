import {useContext, useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import Logo from "../assets/logo.svg";
import LanguageSelector from "./LanguageSelector.tsx";
import {useTranslation} from "react-i18next";
import AuthContext from "../context/AuthProvider.tsx";
import CartContext from "../context/CartProvider.tsx";
import {ShoppingCart, UserRound} from "lucide-react";
import {SearchProducts} from "./SearchProducts.tsx";

export const Navbar = () => {
    const {auth} = useContext(AuthContext);
    const {cart} = useContext(CartContext);
    const [showSearch, setShowSearch] = useState(false);
    const [t] = useTranslation("global");
    const location = useLocation();


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setShowSearch(queryParams.get("search") !== null);
    }, [location.search]);


    return (
        <nav className="container md:fixed md:top-0 md:right-0 md:left-0 hidden items-center justify-between bg-white py-2 space-x-2 md:flex">
            <NavLink to={"/"} className="flex flex-shrink-0 items-center space-x-1">
                <img src={Logo} alt="logo" className="h-12"/>
                <h1 className="text-2xl font-medium sm:text-2xl">E-Pharm</h1>
            </NavLink>
            {showSearch && (
                <SearchProducts/>
            )}
            <div className="flex items-center space-x-4">
                <LanguageSelector/>
                <NavLink to={"/cart"} className="relative flex items-center transition hover:opacity-70">
                    {cart.length > 0 && (
                        <p className="absolute -top-2 left-2 mr-2 rounded-full bg-red-500 px-1 text-xs text-white Z-1">{cart.length}</p>
                    )}
                    <ShoppingCart className="mr-2 h-5 w-5"/>
                </NavLink>
                {auth ? (
                    <>
                        <NavLink to={"/profile"} className="flex flex-shrink-0 items-center transition hover:opacity-70">
                            <UserRound className="mr-2 h-5 w-5"/>
                            <p>{t("nav.hi")} {auth.firstname}</p>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={"/login"}
                                 className="flex flex-shrink-0 items-center transition hover:opacity-70">
                            <UserRound className="mr-2 h-5 w-5"/>
                            <span>{t("nav.login")}</span>
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};
