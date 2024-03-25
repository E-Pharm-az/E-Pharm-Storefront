import {Outlet} from "react-router-dom";
import {Navbar} from "./Navbar.tsx";
import {MobileNavbar} from "./MobileNavbar.tsx";
import Footer from "./Footer.tsx";

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