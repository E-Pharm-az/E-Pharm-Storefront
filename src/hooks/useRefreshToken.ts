import { useContext } from "react";
import AuthContext, {
  TokenPayload,
  TokenResponse,
  User,
} from "../context/AuthProvider.tsx";
import { axiosPrivate } from "../services/api-client.ts";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
  const { setUser } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await axiosPrivate.get<TokenResponse>(
          "/auth/customer/refresh-token"
      );

      const decodedToken = jwtDecode<TokenPayload>(response.data.token);

      const userResponse = await axiosPrivate.get<User>(
          `user/${decodedToken.jti}`
      );

      setUser(() => {
        return userResponse.data;
      });

      return response.data.token;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return refresh;
};

export default useRefreshToken;