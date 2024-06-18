import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
  isAuthenticated: () => false,
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);

  const isAuthenticated = (): boolean => {
    return !!auth;
  };

  const logout = () => {
    setAuth(null);
  };

  return (
      <AuthContext.Provider value={{auth, setAuth, isAuthenticated, logout}}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;