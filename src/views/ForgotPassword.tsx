import { useTranslation } from "react-i18next";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button.tsx";
import apiClient from "@/services/api-client.ts";
import axios from "axios";
import {Loader, LucideMail} from "lucide-react";

const ForgotPassword = () => {
  const [t] = useTranslation("global");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isPasswordChangeInitiated, setIsPasswordChangeInitiated] =
    useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await apiClient.post("/user/initiate-password-change", {
        email: email,
      });

      if (response.status === 200) {
        setIsPasswordChangeInitiated(true);
        setError(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(t("forgot-password.noServerResponse"));
      } else {
        setError(t("forgot-password.unexpectedError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-45">
          <Loader className="h-4 w-4 animate-spin text-white" />
        </div>
      )}
      <div className="mx-auto w-full py-8 sm:w-[400px]">
        <div className="bg-white md:mt-0 xl:p-0">
          {isPasswordChangeInitiated ? (
            <div className="grid gap-4">
              <LucideMail className="w-8 h-8" />
              <div className="grid gap-2">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                  {t("forgot-password.email-sent")}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {t("forgot-password.email-sent-detail")}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-4 sm:p-8">
              <div className="grid gap-2">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                  {t("forgot-password.title")}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {t("forgot-password.detail")}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                    placeholder={t("forgot-password.placeholder")}
                    required={true}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <Button type="submit">{t("signup.continue")}</Button>
              </form>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link
                  to={"/login"}
                  className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {t("forgot-password.back")}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
