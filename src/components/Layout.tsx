import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.tsx";
import { MobileNavbar } from "./MobileNavbar.tsx";
import Footer from "./marketing/Footer.tsx";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="px-4 mx-auto max-w-[1400px]">
      <div className="md:mb-[64px]">
        <Navbar />
      </div>
      <MobileNavbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
