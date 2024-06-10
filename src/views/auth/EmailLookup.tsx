import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button.tsx";
import { useContext } from "react";
import FormContext from "@/context/AuthFormProvider.tsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "@/services/api-client.ts";
import ErrorContext from "@/context/ErrorProvider.tsx";
import axios from "axios";

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
  } = useForm<EmailFormData>({
    defaultValues: {
      email: formData.email,
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    updateFormData({ email: data.email });

    try {
      const response = await apiClient.get(
        `/auth/lookup/store/${data.email}`,
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          try {
            await apiClient.post("user/register", { Email: data.email });
            navigate("/verify-email");
          } catch (error) {
            setError(t("email-lookup.unexpectedError"));
          }
        }
      } else {
        setError(t("email-lookup.unexpectedError"));
      }
    }
  };

  return (
    <div className="mx-auto w-fit py-8 sm:py-0 sm:max-w-[400px]">
      <div className="grid gap-6 p-6 sm:p-0">
        <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
          {t("email-lookup.title")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-1">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
              placeholder={t("email-lookup.placeholder")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {t("email-lookup.tos")}
          </p>
          <Button type="submit">{t("email-lookup.cta")}</Button>
        </form>
      </div>
    </div>
  );
};

export default EmailLookup;
