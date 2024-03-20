import {createContext, useState} from "react";

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
    setAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    isAuthenticated: () => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    auth: null,
    setAuth: () => {},
    isAuthenticated: () => false,
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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