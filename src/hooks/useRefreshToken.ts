import { useContext } from "react";
import AuthContext, {
  TokenPayload,
  TokenResponse,
} from "../context/AuthProvider.tsx";
import {axiosPrivate} from "../services/api-client.ts";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axiosPrivate.get<TokenResponse>("/auth/customer/refresh-token");
    const decodedToken = jwtDecode<TokenPayload>(response.data.token);

    if (response.status === 400) {
      localStorage.removeItem("persist");
      return;
    }

    setAuth(() => {
      return {
        tokenResponse: response.data,
        id: decodedToken.jti,
        email: decodedToken.email,
        firstname: decodedToken.sub,
      };
    });

    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
