import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button.tsx";
import { useContext, useEffect } from "react";
import FormContext from "@/context/AuthFormProvider.tsx";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "@/services/api-client.ts";
import ErrorContext from "@/context/ErrorProvider.tsx";
import axios from "axios";
import { Input } from "@/components/ui/input.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";
import SlidePage from "@/components/SlidePage.tsx";
import AuthContext from "@/context/AuthProvider.tsx";

interface EmailFormData {
  email: string;
}

const EmailLookup = () => {
  const [t] = useTranslation("global");
  const { setError } = useContext(ErrorContext);
  const { loading, setLoading } = useContext(LoaderContext);
  const { formData, updateFormData } = useContext(FormContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<EmailFormData>({
    defaultValues: {
      email: formData.email,
    },
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setFocus("email");
  }, []);

  const onSubmit = async (data: EmailFormData) => {
    updateFormData({ email: data.email });
    setLoading(true);

    try {
      const response = await apiClient.post("/user/register", {
        email: data.email,
      });

      if (response.status === 200) {
        navigate("/verify-email");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          navigate("/login");
        } else {
          setError(t("errors.unexpectedError"));
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
      <div className="mx-auto w-full py-8 sm:py-0 grid gap-6 p-6 sm:p-0 sm:max-w-[400px]">
        <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
          {t("email-lookup.title")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-1">
            <Input
              type="email"
              label={t("email-lookup.placeholder")}
              autoCorrect="off"
              autoComplete="email"
              disabled={loading}
              className={errors.email && "border-red-500 focus:border-red-500"}
              {...register("email", { required: true })}
            />
            <label className="w-full h-3 text-xs text-red-500">
              {errors.email?.type === "required" && t("common.required")}
            </label>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("email-lookup.tos")}
          </p>
          <Button type="submit" disabled={loading}>
            {t("email-lookup.cta")}
          </Button>
        </form>
      </div>
    </SlidePage>
  );
};

export default EmailLookup;
