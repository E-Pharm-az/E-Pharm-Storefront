import {Outlet} from "react-router-dom";
import {Navbar} from "./Navbar.tsx";
import Footer from "./Footer.tsx";

const Layout = () => {
    return (
        <main className="container mx-auto">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </main>
    );
};

export default Layout;