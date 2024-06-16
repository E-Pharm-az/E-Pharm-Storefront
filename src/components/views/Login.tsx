import { useEffect, useRef, useState, useContext, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../../services/api-client.ts";
import AuthContext, {
  TokenPayload,
  TokenResponse,
} from "../../context/AuthProvider.tsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button } from "@/components/ui/Button.tsx";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Input } from "@/components/ui/Input.tsx";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [t] = useTranslation("global");

  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setError } = useContext(ErrorContext);
  const { formData } = useContext(FormContext);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!formData.email) {
      navigate("/email-lookup");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await apiClient.post<TokenResponse>(
        "/auth/login/store",
        { email: formData.email, password },
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
    }
  };

  return (
    <div className="mx-auto py-8 sm:py-0 w-full sm:w-[400px]">
      <div className="grid gap-6 p-6 sm:p-0">
        <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
          {t("login.title")}
        </h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            <label className="">{formData.email}</label>
            <Link
              to="/email-lookup"
              className="underline text-muted-foreground"
            >
              {t("login.edit")}
            </Link>
          </div>
          <div>
            <Input
              label={t("login.password")}
              type="password"
              autoCorrect="off"
              autoComplete="new-password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Link to="/change-password">
              <p className="text-sm text-gray-500 font-medium text-primary-600 hover:underline">
                {t("login.forgot-password")}
              </p>
            </Link>
          </div>
          <Button type="submit">{t("login.title")}</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
