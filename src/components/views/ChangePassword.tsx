import { Link, useLocation, useNavigate } from "react-router-dom";
import {FormEvent, useEffect, useRef, useState} from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button.tsx";
import apiClient from "@/services/api-client.ts";
import axios from "axios";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const [onSuccess, setOnSuccess] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
    }

    try {
      const response = await apiClient.post("/user/change-password", {
        userId: userId,
        token: token,
        newPassword: password,
      });

      if (response.status === 200) {
        setOnSuccess(true);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full py-8 sm:w-[400px]">
      {onSuccess ? (
        <div className="grid gap-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Password change successfully
          </h1>
          <Link to="/login">
            <Button>Go to login</Button>
          </Link>
        </div>
      ) : (
        <>
          {loading && (
            <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-45">
              <Loader className="h-4 w-4 animate-spin text-white" />
            </div>
          )}

          <div className="bg-white md:mt-0 xl:p-0">
            <div className="grid gap-4 p-6">
              <div className="grid gap-2">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  {t("change-password.title")}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {t("change-password.detail")}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {error && (
                  <div className="text-center text-red-500">{error}</div>
                )}
                <div className="grid gap-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      {t("change-password.password")}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder={t("change-password.password-placeholder")}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm mb-2"
                        required
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      {t("change-password.confirmPassword")}
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirm-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      placeholder={t(
                        "change-password.confirm-password-placeholder",
                      )}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm mb-2"
                      required
                    />
                  </div>
                </div>
                <Button type="submit">{t("change-password.cto")}</Button>
              </form>
              <Link to="/">
                <p className="text-sm text-gray-500 font-medium text-primary-600 hover:underline">
                  {t("change-password.cancel")}
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangePassword;
