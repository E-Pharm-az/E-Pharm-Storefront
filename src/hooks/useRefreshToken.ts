import { useContext } from "react";
import AuthContext, { User } from "../context/AuthProvider.tsx";
import { axiosPrivate } from "../services/api-client.ts";

const useRefreshToken = () => {
  const { setUser } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await axiosPrivate.get<User>(
        "/auth/customer/refresh-token"
      );
      setUser(() => {
        return response.data;
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return refresh;
};

export default useRefreshToken;
