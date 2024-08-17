import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider.tsx";

const RequireAuth = () => {
  const { isAuthenticated, isRefreshing } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRefreshing && !isAuthenticated()) {
      navigate("/email-lookup", { replace: true });
    }
  }, [isRefreshing, isAuthenticated, navigate]);

  if (isRefreshing) {
    return <></>;
  }

  return isAuthenticated() ? <Outlet /> : null;
};

export default RequireAuth;
