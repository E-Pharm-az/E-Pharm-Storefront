import {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import LanguageSelector from "./LanguageSelector.tsx";
import CartContext from "../context/CartProvider.tsx";
import { Home, ShoppingCart, UserRound, Search } from "lucide-react";
import AuthContext from "../context/AuthProvider.tsx";
import {SearchProducts} from "@/components/SearchProducts.tsx";
import {Button} from "@/components/ui/button.tsx";

export const MobileNavbar = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
  
  const handleSearch = () => {
    return (
      <>
        <button onClick={() => setShowSearch(!showSearch)}>
          <Search className="text-brand" size={28} />
        </button>
        {showSearch && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white px-4 py-2 shadow-md border-b h-[200px]">
            <div className="flex justify-between">
              <img
                src={Logo}
                alt="logo"
                className="h-12 w-12 pointer-events-none"
              />
              <div className="w-full mx-2">
                <SearchProducts />
              </div>
              <Button onClick={() => setShowSearch(false)} variant="ghost">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

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
          {handleSearch()}
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
            to={user ? "/profile" : "/email-lookup"}
            className="flex h-full items-center justify-center"
          >
            <UserRound className="text-brand" size={28} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
