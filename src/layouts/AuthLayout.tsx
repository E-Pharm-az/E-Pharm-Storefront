import {Link, Outlet} from "react-router-dom";
import {ChevronLeft} from "lucide-react";

const AuthLayout = () => {
    return (
        <main>
            <div className="fixed top-2 left-2">
                <Link to="/" className="flex items-center rounded-full px-4 py-2 transition space-x-4 hover:bg-neutral-200">
                    <ChevronLeft className="h-6 w-6"/>
                    Home
                </Link>
            </div>
            <div className="flex h-screen items-center justify-center">
                <Outlet/>
            </div>
        </main>
    );
};

export default AuthLayout;