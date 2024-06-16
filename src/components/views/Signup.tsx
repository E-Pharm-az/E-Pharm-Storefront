import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button.tsx";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/Input.tsx";
import Logo from "@/assets/logo.png";
import apiClient from "@/services/api-client.ts";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  password: string;
  isTosAccepted: boolean;
}

const Signup = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { formData } = useContext(FormContext);
  const [showPassword, setShowPassword] = useState(false);
  const [accountSetupCompleted, setAccountSetupCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      isTosAccepted: false,
    },
  });

  useEffect(() => {
    // require confirmed email to be on this page
    if (!formData.email && !formData.isAccountConfirmed) {
      navigate("/email-lookup");
    }
  }, []);

  const isTosAccepted = watch("isTosAccepted", false);

  const handleCheckboxChange = (checked: boolean) => {
    setValue("isTosAccepted", checked);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await apiClient.post("/user/initialize-user", {
        email: formData.email,
        code: formData.code,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        password: data.password,
      });
      if (response.status === 200) {
        setAccountSetupCompleted(true);
        await apiClient.post(
          "auth/login/store",
          {
            email: formData.email,
            password: data.password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setError(t("signup.invalidEmailOrPassword"));
          } else {
            setError(t("signup.noServerResponse"));
          }
        } else {
          setError(t("signup.loginFailed"));
        }
      } else {
        setError(t("signup.unexpectedError"));
      }
    }
  };

  return (
    <div className="mx-auto w-full py-8 sm:w-[400px]">
      <div className="p-6 space-y-4 sm:p-8">
        {accountSetupCompleted ? (
          <div className="items-center justify-center text-center grid gap-6">
            <div className="grid gap-2">
              <img
                src={Logo}
                alt="logo"
                className="h-10 pointer-events-none mx-auto"
              />
              <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
                {t("signup.account-created-title")}
              </h1>
              <p>{t("signup.account-created-subtitle")}</p>
            </div>
            <Link to="/" className="block">
              <Button>{t("signup.account-created-cta")}</Button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
              {t("signup.title")}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="flex gap-2">
                <div>
                  <Input
                    type="text"
                    label={t("signup.firstname")}
                    autoComplete="given-name"
                    autoCorrect="off"
                    autoCapitalize="on"
                    {...register("firstName", { required: "Required" })}
                    className={`${errors.firstName && "border-red-500"}`}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.firstName?.message}
                  </p>
                </div>
                <div>
                  <Input
                    type="text"
                    label={t("signup.lastname")}
                    autoCorrect="off"
                    autoComplete="family-name"
                    {...register("lastName", { required: "Required" })}
                    className={`${errors.lastName && "border-red-500"}`}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    label={t("signup.password")}
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
                    className={`${errors.password && "border-red-500"}`}
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
                  <p className="text-xs">{t("signup.first-pswd-req")}</p>
                </div>
                <div
                  className={`ml-2 flex gap-1 ${errors.password?.type === "required" || errors.password?.type === "complex" ? "text-red-500" : "text-muted-foreground"}`}
                >
                  <X className="h-4 w-4" />
                  <p className="text-xs">{t("signup.second-pswd-req")}</p>
                </div>
              </div>
              <Input
                type="text"
                label={t("signup.address")}
                autoComplete="address-line1"
                {...register("address", { required: true })}
              />
              <div className="flex gap-2 items-start">
                <Checkbox
                  {...register("isTosAccepted", { required: true })}
                  checked={isTosAccepted}
                  onCheckedChange={handleCheckboxChange}
                />
                <p
                  className={`text-sm ${errors.isTosAccepted && "text-red-500"}`}
                >
                  {t("signup.tos")}
                </p>
              </div>
              <Button type="submit">{t("signup.continue")}</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
