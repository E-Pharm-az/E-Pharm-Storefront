import { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../../services/api-client.ts";
import AuthContext, {
  TokenPayload,
  TokenResponse,
} from "../../context/AuthProvider.tsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button } from "@/components/ui/button.tsx";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Input } from "@/components/ui/Input.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";
import { useForm } from "react-hook-form";
import SlidePage from "@/components/SlidePage.tsx";

interface PasswordFormData {
  password: string;
}

const Login = () => {
  const [t] = useTranslation("global");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setError } = useContext(ErrorContext);
  const { loading, setLoading } = useContext(LoaderContext);
  const { formData } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<PasswordFormData>();

  useEffect(() => {
    setFocus("password");
  }, []);

  useEffect(() => {
    if (!formData.email) {
      navigate("/email-lookup");
    }
  }, []);

  const onSubmit = async (data: PasswordFormData) => {
    setLoading(true);

    try {
      const response = await apiClient.post<TokenResponse>(
        "/auth/login/store",
        { email: formData.email, password: data.password },
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

      localStorage.setItem("persist", "true");

      navigate(from, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setError(t("errors.invalidEmailOrPassword"));
          } else {
            setError(t("errors.noServerResponse"));
          }
        } else {
          setError(t("errors.loginFailed"));
        }
      } else {
        setError(t("errors.unexpectedError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SlidePage>
      <div className="mx-auto py-8 sm:py-0 w-full grid gap-6 p-6 sm:p-0 sm:w-[400px]">
        <div className="grid gap-2">
          <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
            {t("login.title")}
          </h1>
          <div className="flex flex-wrap gap-x-1">
            <label>{formData.email}</label>
            <Link
              to="/email-lookup"
              className="underline text-muted-foreground"
            >
              {t("login.edit")}
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <input
              className="hidden"
              disabled={true}
              type="email"
              value={formData.email}
            />
            <Input
              label={t("login.password")}
              type="password"
              autoCorrect="off"
              autoComplete="new-password"
              disabled={loading}
              className={
                errors.password && "border-red-500 focus:border-red-500"
              }
              {...register("password", { required: true })}
            />
            <label className="w-full h-3 text-xs text-red-500">
              {errors.password?.type === "required" && t("common.required")}
            </label>
            <Link to="/change-password">
              <p className="text-sm text-gray-500 font-medium text-primary-600 hover:underline">
                {t("login.forgot-password")}
              </p>
            </Link>
          </div>
          <Button type="submit" disabled={loading}>
            {t("common.continue")}
          </Button>
        </form>
      </div>
    </SlidePage>
  );
};

export default Login;
