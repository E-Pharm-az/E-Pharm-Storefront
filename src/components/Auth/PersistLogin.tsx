import {useContext, useEffect, useState} from "react";
import useRefreshToken from "../../hooks/useRefreshToken.ts";
import AuthContext from "../../context/AuthProvider.tsx";
import {Outlet} from "react-router-dom";
import {Loader} from "lucide-react";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;

        const loadPersistedData = async () => {
            const isPersisted = localStorage.getItem("persist");
            if (isPersisted !== null) {
                try {
                    if (!auth?.tokenResponse.token && isMounted) {
                        await refreshToken();
                    }
                } catch (error) {
                    console.error("Error refreshing token", error);
                } finally {
                    localStorage.setItem("persist", "true");
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        loadPersistedData();

        return () => {
            isMounted = false;
        };
    }, [auth?.tokenResponse.token, refreshToken]);

    return (
        <>
            {isLoading ?
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <Loader className="animate-spin text-blue-500 mr-2"/>
                    <span>Loading...</span>
                </div>
                : <Outlet/>
            }
        </>
    );
};

export default PersistLogin;