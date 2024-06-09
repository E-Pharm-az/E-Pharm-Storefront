import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader, Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button.tsx";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";

const Signup = () => {
  const [t] = useTranslation("global");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setError } = useContext(ErrorContext);
  const { formData, updateFormData } = useContext(FormContext);
  const navigate = useNavigate();

  useEffect(() => {
    // require email to be on this page
    if (!formData.email) {
      navigate("/email-lookup");
    }
  }, []);

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
          <form className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                placeholder={t("signup.placeholder")}
                required={true}
              />
            </div>
            <Button type="submit">{t("signup.continue")}</Button>
          </form>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            <Link
              to={"/login"}
              className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              {t("signup.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
