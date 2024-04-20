import {Outlet} from "react-router-dom";
import {Navbar} from "../components/Navbar.tsx";
import {MobileNavbar} from "../components/MobileNavbar.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect} from "react";

const Layout = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="mx-auto">
            <Navbar/>
            <MobileNavbar/>
            <Outlet/>
            <Footer/>
        </main>
    );
};

export default Layout;