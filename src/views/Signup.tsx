import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import apiClient from "../services/api-client.ts";
import axios from "axios";
import {Button} from "@/components/ui/Button.tsx";

const Signup = () => {
  const [t] = useTranslation("global");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmEmail, setConfirmEmail] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate password
    if (!passwordRegex.test(value) && value.length > 0) {
      setPasswordError(t("signup.passwordError"));
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password === formData.confirmPassword) {
      try {
        const { firstname, lastname, email, phone, password } = formData;

        const response = await apiClient.post(
          "/user/register",
          {
            FirstName: firstname,
            LastName: lastname,
            Email: email,
            PhoneNumber: phone,
            Password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          setConfirmEmail(true);
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
    } else {
      setError(t("signup.passwordsDoNotMatch"));
    }
    setLoading(false);
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword((prevState) => !prevState);
    }
  };

  return (
    <div className="mx-auto w-full py-8 sm:w-[400px]">
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
          <Loader className="mr-2 animate-spin text-blue-500" />
        </div>
      )}
      {confirmEmail ? (
        <div className="rounded-lg bg-white p-4 text-center shadow dark:border sm:mt-0">
          <div className="mb-4">
            <h1 className="text-xl font-bold">Check your email</h1>
            <p>We have just send a verification link to {formData.email}</p>
          </div>
          <Link
            to="/login"
            className="py-3 px-6 bg-[#61a60e] block w-fit mx-auto text-white font-medium rounded-lg transition duration-300 focus:outline-none focus:bg-green-600"
          >
            Go to login
          </Link>
        </div>
      ) : (
        <div className="bg-white md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              {t("signup.title")}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                  placeholder={t("signup.placeholder")}
                  required={true}
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
              </div>
              <Button type="submit">
                {t("signup.continue")}
              </Button>
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
      )}
    </div>
  );
};

export default Signup;
