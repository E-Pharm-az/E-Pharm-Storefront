import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import LanguageSelector from "./LanguageSelector.tsx";
import CartContext from "../context/CartProvider.tsx";
import { Home, ShoppingCart, UserRound, Search } from "lucide-react";
import AuthContext from "../context/AuthProvider.tsx";

export const MobileNavbar = () => {
  const { cart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);

  return (
    <nav className="flex w-full flex-col gap-4 bg-white p-4 mobile-nav md:hidden">
      <div className="flex w-full justify-between">
        <NavLink to={"/"} className="flex flex-shrink-0 items-center space-x-1">
          <img src={Logo} alt="logo" className="h-12" />
          <h1 className="text-2xl font-medium sm:text-2xl">E-Pharm</h1>
        </NavLink>
        <div className="flex items-center gap-2">
          <LanguageSelector />
        </div>
      </div>
      <div className="fixed right-0 bottom-0 left-0 z-40 w-full mobile-bottom">
        <div className="flex h-20 w-full items-center justify-between gap-4 rounded-t-xl border border-gray-300 bg-white px-8">
          <NavLink to={"/"} className="flex h-full items-center justify-center">
            <Home className="text-brand" size={28} />
          </NavLink>
          <NavLink
            to={"/?setSearch=true"}
            className="flex h-full items-center justify-center"
          >
            <Search className="text-brand" size={28} />
          </NavLink>
          <NavLink
            to={"/cart"}
            className="relative flex items-center justify-center"
          >
            {cart.length > 0 && (
              <p className="absolute -top-4 -left-4 mr-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white Z-1">
                {cart.length}
              </p>
            )}
            <ShoppingCart className="text-brand" size={28} />
          </NavLink>

          <NavLink
            to={auth ? "/profile" : "/email-lookup"}
            className="flex h-full items-center justify-center"
          >
            <UserRound className="text-brand" size={28} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
