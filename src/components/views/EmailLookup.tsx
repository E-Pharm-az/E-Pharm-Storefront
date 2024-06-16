import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button.tsx";
import { useContext, useEffect } from "react";
import FormContext from "@/context/AuthFormProvider.tsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "@/services/api-client.ts";
import ErrorContext from "@/context/ErrorProvider.tsx";
import axios from "axios";
import { Input } from "@/components/ui/Input.tsx";

interface EmailFormData {
  email: string;
}

const EmailLookup = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { formData, updateFormData } = useContext(FormContext);
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
    setFocus("email");
  }, []);

  const onSubmit = async (data: EmailFormData) => {
    updateFormData({ email: data.email });

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
        }
      } else {
        setError(t("email-lookup.unexpectedError"));
      }
    }
  };

  return (
    <div className="mx-auto w-fit py-8 sm:py-0 grid gap-6 p-6 sm:p-0 sm:max-w-[400px]">
      <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
        {t("email-lookup.title")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-1">
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
            label={t("email-lookup.placeholder")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{t("email-lookup.tos")}</p>
        <Button type="submit">{t("email-lookup.cta")}</Button>
      </form>
    </div>
  );
};

export default EmailLookup;
