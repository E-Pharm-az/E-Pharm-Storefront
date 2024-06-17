import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, RotateCcw, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button.tsx";
import apiClient from "@/services/api-client.ts";
import axios from "axios";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { useForm } from "react-hook-form";

interface FormData {
  code: string;
  password: string;
}

const TIMEOUT_SECONDS = 15;

const ChangePassword = () => {
  const [t] = useTranslation("global");
  const { setError } = useContext(ErrorContext);
  const { formData } = useContext(FormContext);
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [onSuccess, setOnSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timeoutSeconds, setTimeoutSeconds] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const disabledButton = () => {
    setTimeoutSeconds(TIMEOUT_SECONDS);
  };

  useEffect(() => {
    if (timeoutSeconds <= 0) return;

    const secondsInterval = setInterval(() => {
      setTimeoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(secondsInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(secondsInterval); // Cleanup on component unmount
  }, [timeoutSeconds]);

  const initiatePasswordChange = useCallback(async () => {
    try {
      await apiClient.post("/user/initiate-password-change", {
        email: formData.email,
      });
      console.log("initiatePasswordChange");
      disabledButton();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(t("forgot-password.noServerResponse"));
      } else {
        setError(t("forgot-password.unexpectedError"));
      }
    }
  }, [formData.email, setError, t]);

  useEffect(() => {
    if (!formData.email) {
      navigate("/email-lookup");
    } else {
      initiatePasswordChange();
    }
  }, [formData.email, initiatePasswordChange, navigate]);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await apiClient.post("/user/change-password", {
        email: formData.email,
        code: parseInt(data.code),
        password: data.password,
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
    }
  };

  return (
    <div className="mx-auto py-8 sm:py-0 w-full grid gap-6 p-6 sm:p-0 sm:w-[400px]">
      {onSuccess ? (
        <div className="grid gap-2">
          <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
            Password change successfully
          </h1>
          <Link to="/login">
            <Button>Go to login</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-2">
            <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
              {t("change-password.title")}
            </h1>
            <div className="flex flex-wrap gap-x-1">
              <p>{t("change-password.subtitle")}</p>
              <p>{formData.email}</p>
              <Link
                to="/email-lookup"
                className="underline text-muted-foreground"
              >
                {t("change-password.edit")}
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-1">
              <div className="relative">
                <Input
                  type="text"
                  label={t("change-password.code")}
                  autoCorrect="off"
                  autoComplete="off"
                  {...register("code", {
                    required: t("common.required"),
                    validate: {
                      minLength: (value: string) => value.length === 6,
                    },
                  })}
                  className={`${errors.password && "border-red-500"}`}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 felx flex gap-2 focus:outline-none text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={timeoutSeconds > 0}
                  onClick={initiatePasswordChange}
                >
                  {timeoutSeconds > 0 && <label>{timeoutSeconds}</label>}
                  <RotateCcw />
                </button>
              </div>
              <label className="w-full h-3 text-xs text-red-500">
                {errors.code?.message}
              </label>
            </div>
            <div className="grid gap-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  label={t("change-password.new-password")}
                  autoCorrect="off"
                  autoComplete="new-password"
                  {...register("password", {
                    required: true,
                    validate: {
                      minLength: (value: string) => value.length >= 8,
                      complex: (value: string) =>
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(value),
                    },
                  })}
                  className={`${errors.code && "border-red-500"}`}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <div
                className={`ml-2 flex gap-1 ${errors.password?.type === "required" || errors.password?.type === "minLength" ? "text-red-500" : "text-muted-foreground"}`}
              >
                <X className="h-4 w-4" />
                <label className="text-xs">
                  {t("change-password.first-pswd-req")}
                </label>
              </div>
              <div
                className={`ml-2 flex gap-1 ${errors.password?.type === "required" || errors.password?.type === "complex" ? "text-red-500" : "text-muted-foreground"}`}
              >
                <X className="h-4 w-4" />
                <label className="text-xs">
                  {t("change-password.second-pswd-req")}
                </label>
              </div>
            </div>
            <Button type="submit">{t("change-password.cto")}</Button>
          </form>
          <Link to="/login">
            <p className="text-sm text-gray-500 font-medium text-primary-600 hover:underline">
              {t("change-password.cancel")}
            </p>
          </Link>
        </>
      )}
    </div>
  );
};

export default ChangePassword;
