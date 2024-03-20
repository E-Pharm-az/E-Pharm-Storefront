import {useContext} from "react";
import AuthContext, {TokenPayload, TokenResponse} from "../context/AuthProvider.tsx";
import apiClient from "../services/api-client.ts";
import {jwtDecode} from "jwt-decode";

const useRefreshToken = () => {
    const {setAuth} = useContext(AuthContext);

    const refresh = async () => {
        const response = await apiClient.get<TokenResponse>("/auth/refresh-token", {withCredentials: true});
        const decodedToken = jwtDecode<TokenPayload>(response.data.token);

        setAuth((prev) => {
            return {
                ...prev,
                tokenResponse: response.data,
                id: decodedToken.jti,
                email: decodedToken.email,
                firstname: decodedToken.sub
            };
        });

        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;
