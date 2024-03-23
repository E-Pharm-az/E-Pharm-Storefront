import {useContext, useEffect, useState} from "react";
import useRefreshToken from "../../hooks/useRefreshToken.ts";
import AuthContext from "../../context/AuthProvider.tsx";
import {Outlet} from "react-router-dom";
import {BsArrowRepeat} from "react-icons/bs";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.log("Error refreshing token", error);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.tokenResponse.token && isMounted ? verifyRefreshToken() : setIsLoading(false);

        return () => {isMounted = false;}
    }, [])

    return (
        <>
            {isLoading ?
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <BsArrowRepeat className="animate-spin text-blue-500 mr-2"/>
                    <span>Loading...</span>
                </div>
                : <Outlet/>}
        </>
    );
};

export default PersistLogin;