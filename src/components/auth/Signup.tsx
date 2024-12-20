import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import Logo from "@/assets/logo.png";
import apiClient from "@/services/api-client.ts";
import axios from "axios";
import LoaderContext from "@/context/LoaderProvider.tsx";
import AuthContext from "@/context/AuthProvider.tsx";
import SlidePage from "@/components/SlidePage.tsx";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  zip: number;
  password: string;
  isTosAccepted: boolean;
}

const Signup = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const { formData } = useContext(FormContext);
  const { login } = useContext(AuthContext);
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
    setLoading(true);
    try {
      const response = await apiClient.post("/user/initialize", {
        email: formData.email,
        code: formData.code,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        district: data.district,
        zip: data.zip,
        password: data.password,
      });
      if (response.status === 200) {
        setAccountSetupCompleted(true);
        await login(formData.email, data.password);
        localStorage.setItem("persist", "true");
      }
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
      <div className="mx-auto w-fit py-8 sm:py-0 grid gap-6 p-6 sm:p-0 sm:max-w-[400px]">
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
              <div className="flex gap-2 w-full">
                <div className="w-full">
                  <Input
                    type="text"
                    label={t("signup.firstname")}
                    autoComplete="given-name"
                    autoCorrect="off"
                    autoCapitalize="on"
                    disabled={loading}
                    {...register("firstName", { required: "Required" })}
                    className={`${
                      errors.firstName && "border-red-500 focus:border-red-500"
                    }`}
                  />
                  <label className="w-full h-3 text-xs text-red-500">
                    {errors.firstName?.message}
                  </label>
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    label={t("signup.lastname")}
                    autoCorrect="off"
                    autoComplete="family-name"
                    disabled={loading}
                    className={`${
                      errors.lastName && "border-red-500 focus:border-red-500"
                    }`}
                    {...register("lastName", { required: "Required" })}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="relative">
                  <input
                    className="hidden"
                    disabled={true}
                    type="email"
                    value={formData.email}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    label={t("signup.password")}
                    autoCorrect="off"
                    autoComplete="new-password"
                    disabled={loading}
                    {...register("password", {
                      required: true,
                      validate: {
                        minLength: (value: string) => value.length >= 8,
                        complex: (value: string) =>
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(value),
                      },
                    })}
                    className={`${
                      errors.password && "border-red-500 focus:border-red-500"
                    }`}
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
                  className={`ml-2 flex gap-1 ${
                    errors.password?.type === "required" ||
                    errors.password?.type === "minLength"
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <X className="h-4 w-4" />
                  <label className="text-xs">
                    {t("signup.first-pswd-req")}
                  </label>
                </div>
                <div
                  className={`ml-2 flex gap-1 ${
                    errors.password?.type === "required" ||
                    errors.password?.type === "complex"
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <X className="h-4 w-4" />
                  <label className="text-xs">
                    {t("signup.second-pswd-req")}
                  </label>
                </div>
              </div>
              <Input
                type="text"
                label={t("address.address")}
                autoComplete="address-line1"
                disabled={loading}
                className={`${
                  errors.address && "border-red-500 focus:border-red-500"
                }`}
                {...register("address", { required: true })}
              />
              <div className="flex gap-2 w-full">
                <Input
                  type="text"
                  label={t("address.city")}
                  autoComplete="city"
                  disabled={loading}
                  className={`${
                    errors.address && "border-red-500 focus:border-red-500"
                  }`}
                  {...register("city", { required: true })}
                />
                <Input
                  type="text"
                  label={t("address.district")}
                  autoComplete="district"
                  disabled={loading}
                  className={`${
                    errors.address && "border-red-500 focus:border-red-500"
                  }`}
                  {...register("district", { required: true })}
                />
                <Input
                  type="number"
                  label={t("address.zip")}
                  autoComplete="zip"
                  disabled={loading}
                  className={`${
                    errors.address && "border-red-500 focus:border-red-500"
                  }`}
                  {...register("zip", { required: true })}
                />
              </div>
              <div className="flex gap-2 items-start">
                <Checkbox
                  {...register("isTosAccepted", { required: true })}
                  checked={isTosAccepted}
                  onCheckedChange={handleCheckboxChange}
                  disabled={loading}
                />
                <p
                  className={`text-sm ${
                    errors.isTosAccepted && "text-red-500"
                  }`}
                >
                  {t("signup.tos")}
                </p>
              </div>
              <Button type="submit" disabled={loading}>
                {t("signup.continue")}
              </Button>
            </form>
          </>
        )}
      </div>
    </SlidePage>
  );
};

export default Signup;
