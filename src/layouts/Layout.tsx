import {Outlet} from "react-router-dom";
import {Navbar} from "../components/Navbar.tsx";
import {MobileNavbar} from "../components/MobileNavbar.tsx";
import Footer from "../components/Footer.tsx";

const Layout = () => {
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