import {useEffect, useRef, useState, useContext, FormEvent} from "react";
import {BsArrowRepeat} from "react-icons/bs";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import apiClient from "../../services/api-client.ts";
import AuthContext, {TokenPayload, TokenResponse} from "../../context/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [t] = useTranslation("global");

    const emailRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setError("");
    }, [email, password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await apiClient.post<TokenResponse>("/auth/login/store", {email, password},
                {
                    withCredentials: true,
                    headers: {'Content-Type': 'application/json'}
                });

            const decodedToken = jwtDecode<TokenPayload>(response.data.token)

            setAuth({
                tokenResponse: response.data,
                id: decodedToken.jti,
                email: decodedToken.email,
                firstname: decodedToken.sub
            });

            setEmail("");
            setPassword("")

            navigate(from, {replace: true});
        } catch (error ) {
            if (error?.response) {
                setError("No server response");
            } else if (error?.response?.status === 400) {
                setError("Invalid email or password");
            } else {
                setError("Login failed")
            }
            errorRef.current?.focus();
        }
        setLoading(false);
    }

    return (
        <div className="py-8 mx-auto w-full md:w-[600px]">
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <BsArrowRepeat className="animate-spin text-blue-500 mr-2"/>
                </div>
            )}

            <div className="bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        {t("login.title")}
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        {error && <div className="text-center text-red-500">{error}</div>}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                {t("signup.email")}
                            </label>
                            <input type="email"
                                   name="email"
                                   ref={emailRef}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="name@example.com"
                                   required
                                   value={email}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">{t("signup.password")}</label>
                            <input type="password"
                                   name="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   required/>
                        </div>
                        <button type="submit"
                                className="w-full text-white bg-[#61a60e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            {t("login.title")}
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            <Link to={"/signup"}
                                  className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">{t("login.signup")}</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;