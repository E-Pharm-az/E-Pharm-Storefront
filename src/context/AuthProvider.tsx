import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import apiClient, { axiosPrivate } from "@/services/api-client.ts";

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  jti: string;
  email: string;
  sub: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  district?: string;
  zip?: number;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isRefreshing: boolean;
  setIsRefreshing: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: () => false,
  login: () => Promise.resolve(),
  logout: () => {},
  isRefreshing: true,
  setIsRefreshing: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const isAuthenticated = (): boolean => !!user;

  const login = async (email: string, password: string) => {
    const tokenResponse = await axiosPrivate.post<TokenResponse>(
      "/auth/customer/login",
      { email: email, password: password },
    );

    const decodedToken = jwtDecode<TokenPayload>(tokenResponse.data.token);
    const userResponse = await axiosPrivate.get<User>(`user/${decodedToken.jti}`);
    setUser(userResponse.data);
  };

  const logout = async () => {
    setUser(null);
    await apiClient.get("/auth/store/logout", { withCredentials: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        isRefreshing,
        setIsRefreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
