import {Link, Outlet} from "react-router-dom";
import {ChevronLeft} from "lucide-react";

const AuthLayout = () => {
    return (
        <main>
            <div className="fixed top-2 left-2">
                <Link to="/" className="py-2 px-4 hover:bg-neutral-200 transition rounded-full flex space-x-4 items-center">
                    <ChevronLeft className="w-6 h-6"/>
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