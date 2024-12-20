import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { axiosPrivate } from "@/services/api-client.ts";
import { useNavigate } from "react-router-dom";

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
  address: string;
  city: string;
  district: string;
  zip: number;
  CreatedAt: Date;
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
  const navigate = useNavigate();

  const isAuthenticated = (): boolean => !!user;

  const login = async (email: string, password: string) => {
    const response = await axiosPrivate.post<User>("/auth/customer/login", {
      email: email,
      password: password,
    });

    setUser(response.data);
  };

  const logout = async () => {
    navigate("/");
    await axiosPrivate.post("/auth/store/logout");
    setUser(null);
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
