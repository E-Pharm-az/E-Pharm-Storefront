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
import { AxiosError } from "axios";
import LoaderContext from "@/context/LoaderProvider.tsx";
import SlidePage from "@/components/SlidePage.tsx";

export const CODE_LENGTH = 6;
const TIMEOUT_SECONDS = 15;

const VerifyEmail = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { loading, setLoading } = useContext(LoaderContext);
  const { formData, updateFormData } = useContext(FormContext);
  const [code, setCode] = useState<string>("");
  const [timeoutSeconds, setTimeoutSeconds] = useState(0);

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

  useEffect(() => {
    // require email to be on this page
    if (!formData.email) {
      navigate("/email-lookup");
    }
  }, []);

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      setLoading(true);
      const sentOPT = async () => {
        try {
          await apiClient.post("auth/confirm-email", {
            email: formData.email,
            code: code,
          });
          updateFormData({ code: parseInt(code), isAccountConfirmed: true });
          navigate("/signup");
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            setCode("");
            setError(t("errors.unexpectedError"));
          }
        } finally {
          setLoading(false);
        }
      };

      sentOPT();
    }
  }, [code]);

  const resendOTP = async () => {
    try {
      await apiClient.post("auth/resend-confirmation-email", {
        email: formData.email,
      });
      disabledButton();
    } catch (error) {
      setError(t("errors.unexpectedError"));
    }
  };

  return (
    <SlidePage>
      <div className="mx-auto w-full py-8 sm:w-[400px] p-6 grid gap-4 sm:p-8">
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
        <div className="grid gap-6">
          <InputOTP
            value={code}
            onChange={(value) => setCode(value)}
            disabled={loading}
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
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={resendOTP}
              disabled={loading || timeoutSeconds > 0}
              className="flex gap-2 items-center bg-muted px-3 py-2 font-medium rounded-full w-fit text-sm transition-all disabled:cursor-not-allowed disabled:text-muted-foreground"
            >
              <p>{t("verify-email.resend")}</p>
            </button>
            {timeoutSeconds > 0 && <label>{timeoutSeconds}</label>}
          </div>
        </div>
      </div>
    </SlidePage>
  );
};

export default VerifyEmail;
