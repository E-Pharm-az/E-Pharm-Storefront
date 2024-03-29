import {useContext} from "react";
import {NavLink} from "react-router-dom";
import Logo from "../assets/e-pharm.png";
import LanguageSelector from "./LanguageSelector.tsx";
import {BsCart, BsPerson, BsPersonPlus} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import AuthContext from "../context/AuthProvider.tsx";
import {SearchProducts} from "./SearchProducts.tsx";
import CartContext from "../context/CartProvider.tsx";
import { Home, Store, ShoppingCart, UserRound } from "lucide-react";

export const MobileNavbar = () => {
    const {auth} = useContext(AuthContext);
    const {cart} = useContext(CartContext);
    const [t] = useTranslation("global");

    return (
        <nav className="mobile-nav w-full flex flex-col gap-4 bg-white p-4 md:hidden">
            <div className="w-full flex justify-between">
                <NavLink to={"/"} className="flex gap-2 items-center flex-shrink-0">
                    <img src={Logo} alt="logo" className="h-12"/>
                    <h1 className="text-2xl sm:text-3xl font-bold">E-Pharm</h1>
                </NavLink>
                <div className="flex gap-2 items-center">
                    <LanguageSelector/>
                    <NavLink to={"/cart"} className="relative hover:opacity-70 transition flex items-center">
                        <p className="absolute text-white text-xs -top-2 left-2 Z-1 px-1 bg-red-500 rounded-full mr-2">{cart.length}</p>
                        <BsCart className="w-5 h-5 mr-2"/>
                        <span className="hidden lg:block">{t("nav.cart")}</span>
                    </NavLink>
                    {auth ? (
                        <>
                            <NavLink to={"/profile"} className="hover:opacity-70 transition flex items-center">
                                <BsPerson className="w-5 h-5 mr-2"/>
                                <p>{t("nav.hi")} {auth.firstname}</p>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to={"/login"} className="hover:opacity-70 transition items-center sm:flex hidden">
                                <BsPerson className="w-5 h-5 mr-2"/>
                            </NavLink>
                            <NavLink to={"/signup"} className="hover:opacity-70 transition flex items-center hidden">
                                <BsPersonPlus className="w-5 h-5 mr-2"/>
                                <span>{t("nav.signup")}</span>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
            <SearchProducts/>
            <div className="mobile-bottom w-full fixed bottom-0 left-0 ">
                <div className="flex items-center justify-between gap-4 h-20 bg-white border border-gray-300 rounded-t-xl">
                    <NavLink to={"/"} className="flex h-full items-center flex-grow flex justify-center">
                        <Home color="#61a60e" size={28}/>
                    </NavLink>
                    <NavLink to={"/products"} className="flex h-full items-center flex-grow flex justify-center">
                        <Store color="#61a60e" size={28}/>
                    </NavLink>
                    <NavLink to={"/cart"} className="flex h-full items-center flex-grow flex justify-center">
                        <ShoppingCart color="#61a60e" size={28}/>
                    </NavLink>
                    <NavLink to={"/login"} className="flex h-full items-center flex-grow flex justify-center">
                        <UserRound color="#61a60e" size={28}/>
                    </NavLink>
                </div>
                
            </div>
        </nav>
    )
}