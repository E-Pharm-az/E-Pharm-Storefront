import {useContext} from "react";
import {NavLink} from "react-router-dom";
import Logo from "../assets/logo.svg";
import LanguageSelector from "./LanguageSelector.tsx";
import CartContext from "../context/CartProvider.tsx";
import {Home, ShoppingCart, UserRound, Search} from "lucide-react";

export const MobileNavbar = () => {
    const {cart} = useContext(CartContext);

    return (
        <nav className="mobile-nav w-full flex flex-col gap-4 bg-white p-4 md:hidden">
            <div className="w-full flex justify-between">
                <NavLink to={"/"} className="flex space-x-1 items-center flex-shrink-0">
                    <img src={Logo} alt="logo" className="h-12"/>
                    <h1 className="text-2xl sm:text-2xl font-medium">E-Pharm</h1>
                </NavLink>
                <div className="flex gap-2 items-center">
                    <LanguageSelector/>
                </div>
            </div>
            <div className="mobile-bottom w-full fixed bottom-0 left-0 right-0 z-40">
                <div className="flex w-full items-center justify-between gap-4 px-8 h-20 bg-white border border-gray-300 rounded-t-xl">
                    <NavLink to={"/"} className="flex h-full items-center justify-center">
                        <Home color="#61a60e" size={28}/>
                    </NavLink>
                    <NavLink to={"/?setSearch=true"} className="flex h-full items-center justify-center">
                        <Search color="#61a60e" size={28}/>
                    </NavLink>
                    <NavLink to={"/cart"} className="relative flex items-center justify-center">
                        {cart.length > 0 && (
                            <p className="absolute text-white text-xs -top-4 -left-4 Z-1 px-2 py-1 bg-red-500 rounded-full mr-2">{cart.length}</p>
                        )}
                        <ShoppingCart color="#61a60e" size={28}/>
                    </NavLink>
                    <NavLink to={"/login"} className="flex h-full items-center justify-center">
                        <UserRound color="#61a60e" size={28}/>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}