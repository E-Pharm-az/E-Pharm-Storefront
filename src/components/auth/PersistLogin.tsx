import {useContext, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.ts";
import AuthContext from "../../context/AuthProvider.tsx";
import {Outlet} from "react-router-dom";
import LoaderContext from "@/context/LoaderProvider.tsx";

const PersistLogin = () => {
  const refreshToken = useRefreshToken();
  const { auth } = useContext(AuthContext);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    let isMounted = true;

    const loadPersistedData = async () => {
      const isPersisted = localStorage.getItem("persist");
      if (isPersisted) {
        try {
          if (!auth?.tokenResponse.token && isMounted) {
            await refreshToken();
          }
        } catch (error) {
            console.error("Error refreshing token", error);
        } finally {
            localStorage.setItem("persist", "true");
          setLoading(false);
        }
      } else {
          setLoading(false);
      }
    };

    loadPersistedData();

    return () => {
      isMounted = false;
    };
  }, [auth?.tokenResponse.token, refreshToken]);

  return <Outlet />;
};

export default PersistLogin;