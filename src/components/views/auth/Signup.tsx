import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader, Eye, EyeOff, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button.tsx";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {Input} from "@/components/ui/Input.tsx";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  password: string;
  isTosAccepted: boolean;
}

const Signup = () => {
  const [t] = useTranslation("global");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setError } = useContext(ErrorContext);
  const { formData } = useContext(FormContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      password: formData.password,
      isTosAccepted: false,
    },
  });

  // useEffect(() => {
  //   // require confirmed email to be on this page
  //   if (!formData.email && !formData.isAccountConfirmed) {
  //     navigate("/email-lookup");
  //   }
  // }, []);

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="mx-auto w-full py-8 sm:w-[400px]">
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
          <Loader className="mr-2 animate-spin text-blue-500" />
        </div>
      )}
      <div className="bg-white md:mt-0 xl:p-0">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
            {t("signup.title")}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2">
              <div>
                <Input
                  type="text"
                  autoComplete="given-name"
                  autoCapitalize="on"
                  {...register("firstName", { required: "Required" })}
                  label={t("signup.firstname")}
                />
                <p className="w-full h-3 text-xs text-red-500">
                  {errors.firstName?.message}
                </p>
              </div>
              <div>
                <Input
                  type="text"
                  autoComplete="family-name"
                  {...register("lastName", { required: "Required" })}
                  label={t("signup.lastname")}
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
                  autoComplete="new-password"
                  {...register("password", { required: true })}
                  label={t("signup.password")}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <div className="ml-2 flex gap-1">
                <X className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {t("signup.first-pswd-req")}
                </p>
              </div>
              <div className="ml-2 flex gap-1">
                <X className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {t("signup.second-pswd-req")}
                </p>
              </div>
            </div>
            <Input
              type="text"
              autoComplete="address-line1"
              {...register("address", { required: true })}
              label={t("signup.address")}
            />
            <div className="flex gap-2 items-start">
              <Checkbox {...register("isTosAccepted", { required: true })} />
              <p
                className={`text-sm ${errors.isTosAccepted && "text-red-500"}`}
              >
                {t("signup.tos")}
              </p>
            </div>
            <Button type="submit">{t("signup.continue")}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
