import { useEffect, useRef, useState, useContext, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../services/api-client.ts";
import AuthContext, {
  TokenPayload,
  TokenResponse,
} from "../context/AuthProvider.tsx";
import { jwtDecode } from "jwt-decode";
import { Loader } from "lucide-react";
import axios from "axios";
import {Button} from "@/components/ui/Button.tsx";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
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
      const response = await apiClient.post<TokenResponse>(
        "/auth/login/store",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );

      const decodedToken = jwtDecode<TokenPayload>(response.data.token);

      setAuth({
        tokenResponse: response.data,
        id: decodedToken.jti,
        email: decodedToken.email,
        firstname: decodedToken.sub,
      });

      setEmail("");
      setPassword("");
      localStorage.setItem("persist", "true");

      navigate(from, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setError("Invalid email or password");
          } else {
            setError("No server response");
          }
        } else {
          setError("Login failed");
        }
      } else {
        setError("An unexpected error occurred");
      }
      errorRef.current?.focus();
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full py-8 sm:w-[400px]">
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-45">
          <Loader className="h-4 w-4 animate-spin text-white" />
        </div>
      )}

      <div className="bg-white md:mt-0 xl:p-0">
        <div className="grid gap-4 p-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {t("login.title")}
          </h1>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {error && <div className="text-center text-red-500">{error}</div>}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                {t("signup.email")}
              </label>
              <input
                type="email"
                name="email"
                spellCheck="false"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                value={email}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                {t("signup.password")}
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm mb-2"
                required
              />
              <Link to="/forgot-password">
                <p className="text-sm text-gray-500 font-medium text-primary-600 hover:underline">
                  {t("login.forgot-password")}
                </p>
              </Link>
            </div>
            <Button type="submit">{t("login.title")}</Button>
          </form>
          <Link to="/signup">
            <Button className="bg-white border text-black hover:opacity-60">{t("login.signup")}</Button>
            <p className="text-sm text-gray-500 font-medium text-primary-600 hover:underline"></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
