import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import LanguageSelector from "./LanguageSelector.tsx";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthProvider.tsx";
import CartContext from "../context/CartProvider.tsx";
import { ShoppingCart, UserRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button.tsx";
import {SearchBar} from "@/components/SearchBar.tsx";

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [t] = useTranslation("global");
  const location = useLocation();
  const navBarRef = useRef<HTMLDivElement>(null);
  const [isNavBarScrolled, setIsNavBarScrolled] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setShowSearch(
      location.pathname !== "/" || queryParams.get("search") !== null,
    );
  }, [location]);

  useEffect(() => {
    if (navBarRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(navBarRef.current, {
        duration: 1,
        ease: "none",
        scrollTrigger: {
          start: "20px 65px",
          end: "100% -100%",
          // markers: true,
          toggleActions: "play reverse play reverse",
          onToggle: ({ isActive }) => {
            setIsNavBarScrolled(isActive);
          },
        },
      });
    }
  }, [location]);

  return (
    <nav
      ref={navBarRef}
      className={`bg-white hidden items-center justify-between ease-in-out z-10 px-10 py-2 transition-all space-x-4 md:flex md:fixed md:top-0 md:right-0 md:left-0 ${isNavBarScrolled && "shadow-md border-b"}`}
    >
      <NavLink to="/" className="flex flex-shrink-0 items-center gap-1">
        <img src={Logo} alt="logo" className="h-12 w-12 pointer-events-none" />
        <h1 className="font-medium text-2xl">E-Pharm</h1>
      </NavLink>
      <div className="flex items-center space-x-4">
        {showSearch && <SearchBar />}
        <LanguageSelector />
        <Button size="icon" variant="ghost" className="px-2" asChild>
          <NavLink to="/cart" className="relative">
            {cart.length > 0 && (
              <p className="absolute -top-2 right-0 rounded-full bg-red-500 px-1 text-xs text-white Z-1">
                {cart.length}
              </p>
            )}
            <ShoppingCart className="h-5 w-5" />
          </NavLink>
        </Button>
        {user ? (
          <Button asChild>
            <NavLink
              to={"/profile"}
              className="flex flex-shrink-0 items-center transition hover:opacity-70"
            >
              <UserRound className="mr-2 h-5 w-5" />
              <p>
                {t("nav.account")}
              </p>
            </NavLink>
          </Button>
        ) : (
          <Button asChild>
            <NavLink
              to={"/email-lookup"}
              className="flex flex-shrink-0 items-center transition hover:opacity-70"
            >
              <p>{t("nav.login")}</p>
            </NavLink>
          </Button>
        )}
      </div>
    </nav>
  );
};
