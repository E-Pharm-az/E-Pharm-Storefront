import useRefreshToken from "./useRefreshToken.ts";
import AuthContext from "../context/AuthProvider.tsx";
import {useContext, useEffect} from "react";
import {axiosPrivate} from "../services/api-client.ts";

const useAxiosPrivate = () => {
    const refreshToken = useRefreshToken();
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            async (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers.Authorization = `Bearer ${auth?.tokenResponse.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error.config;

                if (error.response?.status === 401 && !prevRequest._retry) {
                    prevRequest._retry = true;
                    const newToken = await refreshToken();
                    prevRequest.headers.Authorization = `Bearer ${newToken}`;

                    return axiosPrivate(prevRequest);
            }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }
    }, [auth, refreshToken]);

    return axiosPrivate;
};

export default useAxiosPrivate;
