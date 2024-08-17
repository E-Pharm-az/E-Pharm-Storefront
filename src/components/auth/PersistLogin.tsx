import { useContext, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.ts";
import AuthContext from "../../context/AuthProvider.tsx";
import { Outlet } from "react-router-dom";
import LoaderContext from "@/context/LoaderProvider.tsx";

const PersistLogin = () => {
  const { isAuthenticated, setIsRefreshing } = useContext(AuthContext);
  const { setLoading } = useContext(LoaderContext);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      setLoading(true);
      await refreshToken();
      isMounted && setIsRefreshing(false);
      setLoading(false);
    };

    !isAuthenticated() ? verifyRefreshToken() : setIsRefreshing(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <Outlet />;
};

export default PersistLogin;