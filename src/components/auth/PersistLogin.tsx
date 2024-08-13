import {useContext, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.ts";
import AuthContext from "../../context/AuthProvider.tsx";
import {Outlet} from "react-router-dom";
import LoaderContext from "@/context/LoaderProvider.tsx";

const PersistLogin = () => {
  const refreshToken = useRefreshToken();
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const isPersisted = localStorage.getItem("persist");
      if (isPersisted) {
        try {
          if (!user && isMounted) {
            await refreshToken();
          }

          localStorage.setItem("persist", "true");
        } catch (error) {
          localStorage.removeItem("persist");
        } finally {
          setLoading(false);
        }
      } else {
          setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [user, refreshToken]);

  return <Outlet />;
};

export default PersistLogin;