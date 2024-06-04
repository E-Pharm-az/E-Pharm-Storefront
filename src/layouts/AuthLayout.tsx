import {Outlet} from "react-router-dom";
import Logo from "@/assets/logo.png";
import LanguageSelector from "@/components/LanguageSelector.tsx";

const AuthLayout = () => {
    return (
      <main>
        <div className="fixed left-0 top-0 right-0 border p-2 justify-between flex px-2 sm:px-10 items-center">
          <div className="flex flex-shrink-0 items-center space-x-1">
              <img src={Logo} alt="logo" className="h-10 pointer-events-none"/>
            <h1 className="text-2xl font-medium sm:text-2xl">E-Pharm</h1>
          </div>
            <LanguageSelector/>
        </div>
        <div className="sm:flex sm:h-screen sm:items-center mt-12 sm:mt-0 sm:justify-center">
          <Outlet />
        </div>
      </main>
    );
};

export default AuthLayout;