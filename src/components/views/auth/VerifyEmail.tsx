import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import FormContext from "@/context/AuthFormProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp.tsx";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import apiClient from "@/services/api-client.ts";

const CODE_LENGTH = 6;

const VerifyEmail = () => {
  const [t] = useTranslation("global");
  const { setError } = useContext(ErrorContext);
  const { formData, updateFormData } = useContext(FormContext);
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // require email to be on this page
    if (!formData.email) {
      navigate("/email-lookup");
    }
  }, []);

  const handleChange = async (value: string) => {
    setCode(value);

    if (value.length === CODE_LENGTH) {
      try {
        await apiClient.post("auth/confirm-email", {
          email: formData.email,
          code: value,
        });
        console.log(parseInt(code));
        updateFormData({ code: parseInt(code), isAccountConfirmed: true });
        navigate("/signup");
      } catch (error) {
        setError(t("verify-email.unexpectedError"));
      }
    }
  };

  const resendOTP = async () => {
    try {
      await apiClient.post("auth/resend-confirmation-email", {
        email: formData.email,
      });
    } catch (error) {
      setError(t("verify-email.unexpectedError"));
    }
  };

  return (
    <div className="mx-auto py-8 sm:py-0 w-full sm:w-[400px]">
      <div className="grid gap-6 p-6 sm:p-0">
        <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">
          {t("verify-email.title")}
        </h1>
        <div className="flex flex-wrap gap-2">
          <p>{t("verify-email.detail")}</p>
          <p>{formData.email}</p>
          <Link to="/email-lookup" className="underline text-muted-foreground">
            {t("verify-email.edit")}
          </Link>
        </div>

        <form className="grid gap-6">
          <div className="flex h-[42px] gap-4 items-center">
            <InputOTP
              value={code}
              onChange={handleChange}
              className="mx-auto"
              pattern={REGEXP_ONLY_DIGITS}
              maxLength={CODE_LENGTH}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <button
            type="button"
            onClick={resendOTP}
            disabled={false}
            className="flex gap-2 items-center bg-muted px-3 py-2 font-medium rounded-full w-fit text-sm transition-all disabled:cursor-not-allowed disabled:text-muted-foreground"
          >
            <p>{t("verify-email.resend")}</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
