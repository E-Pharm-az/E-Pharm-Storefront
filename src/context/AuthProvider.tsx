import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {axiosPrivate} from "@/services/api-client.ts";

export interface TokenResponse {
  token: string;
  refreshToken: string;
  validTo: string;
}

export interface TokenPayload {
  jti: string;
  email: string;
  sub: string;
}

export interface AuthUser {
  tokenResponse: TokenResponse,
  id: string,
  email: string,
  firstname: string,
}

interface AuthContextType {
  auth: AuthUser | null;
  setAuth: Dispatch<SetStateAction<AuthUser | null>>;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
  isAuthenticated: () => false,
  login: () => Promise.resolve(),
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);

  const isAuthenticated = (): boolean => {
    return !!auth;
  };
  
  const login = async (email: string, password: string) => {
    const response = await axiosPrivate.post<TokenResponse>(
        "/auth/customer/login",
        {email: email, password: password},
    );

    const decodedToken = jwtDecode<TokenPayload>(response.data.token);

    setAuth({
      tokenResponse: response.data,
      id: decodedToken.jti,
      email: decodedToken.email,
      firstname: decodedToken.sub,
    });
  }

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;