import { useContext } from "react";
import { NavLink } from "react-router-dom";
import EpharmLogo from "../assets/e-pharm.png";
import LanguageSelector from "./LanguageSelector.tsx";
import { BsCart, BsPerson, BsPersonPlus } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthProvider.tsx";

export const Navbar = () => {
    const { auth } = useContext(AuthContext);
    const [t] = useTranslation("global");

    return (
        <div className=" flex bg-white p-3 items-center px-12">
            <NavLink to={"/"} className="flex space-x-2 items-center">
                <img src={EpharmLogo} alt="logo" className="h-12" />
                <h1 className="text-2xl font-medium">E-Pharm</h1>
            </NavLink>
            <div className="flex ml-auto space-x-6 items-center">
                <LanguageSelector />
                <NavLink to={"/cart"} className="hover:opacity-70 transition flex items-center">
                    <BsCart className="w-5 h-5 mr-2" />
                    {t("nav.cart")}
                </NavLink>
                {auth ? (
                    <>
                        <NavLink to={"/profile"} className="hover:opacity-70 transition flex items-center">
                            <BsPerson className="w-5 h-5 mr-2" />
                            <p>{t("nav.hi")} {auth.firstname}</p>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={"/login"} className="hover:opacity-70 transition flex items-center">
                            <BsPerson className="w-5 h-5 mr-2" />
                            {t("nav.login")}
                        </NavLink>
                        <NavLink to={"/signup"} className="hover:opacity-70 transition flex items-center">
                            <BsPersonPlus className="w-5 h-5 mr-2" />
                            {t("nav.signup")}
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};
