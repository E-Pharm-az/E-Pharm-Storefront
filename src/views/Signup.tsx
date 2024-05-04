import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Loader, Eye, EyeOff} from "lucide-react";
import {ChangeEvent, FormEvent, useState} from "react";
import apiClient from "../services/api-client.ts";
import axios from "axios";

const Signup = () => {
    const [t] = useTranslation("global");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        fin: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmEmail, setConfirmEmail] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password === formData.confirmPassword) {
            try {
                const {firstname, lastname, fin, email, phone, password} = formData;

                const response = await apiClient.post("/user/register", {
                        FirstName: firstname,
                        LastName: lastname,
                        Fin: fin,
                        Email: email,
                        PhoneNumber: phone,
                        Password: password
                    },
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                    });
                if (response.status === 200) {
                    setConfirmEmail(true);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 400) {
                            setError("Invalid email or password");
                        } else {
                            setError("No server response");
                        }
                    } else {
                        setError("Login failed")
                    }
                } else {
                    setError("An unexpected error occurred");
                }
            }
        } else {
            setError("Passwords do not match");
        }
        setLoading(false);
    };

    const togglePasswordVisibility = (field: string) => {
        if (field === 'password') {
            setShowPassword(prevState => !prevState);
        }
    };

    return (
        <div className="mx-auto w-full py-8 md:w-[600px]">
            {loading && (
                <div
                    className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
                    <Loader className="mr-2 animate-spin text-blue-500"/>
                </div>
            )}
            {confirmEmail ? (
                <div className="rounded-lg bg-white p-4 text-center shadow dark:border md:mt-0">
                    <div className="mb-4">
                        <h1 className="text-xl font-bold">Check your email</h1>
                        <p>We have just send a verification link to {formData.email}</p>
                    </div>
                    <Link to="/login" className="py-3 px-6 bg-[#61a60e] block w-fit mx-auto text-white font-medium rounded-lg transition duration-300 focus:outline-none focus:bg-green-600">
                        Go to login
                    </Link>
                </div>
            ) : (
                <div className="rounded-lg bg-white shadow dark:border md:mt-0 xl:p-0">
                    <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            {t("signup.title")}
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {error && <div className="text-center text-red-500">{error}</div>}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    {t("signup.firstname")}
                                </label>
                                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange}
                                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                                       placeholder="John" required={true}/>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    {t("signup.lastname")}
                                </label>
                                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange}
                                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                                       placeholder="Doe" required={true}/>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    {t("signup.fin")}
                                </label>
                                <input type="text" name="fin" value={formData.fin} onChange={handleChange}
                                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                                       placeholder="123456" required={true}/>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    {t("signup.email")}
                                </label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                                       placeholder="name@example.com" required={true}/>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    {t("signup.phone")}
                                </label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                                       placeholder="+994 50 123 45 67" required={true}/>
                            </div>
                            <div>
                                <label
                                    className="mb-2 block text-sm font-medium text-gray-900">{t("signup.password")}</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} name="password"
                                           value={formData.password} onChange={handleChange}
                                           placeholder="••••••••"
                                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                                           required={true}/>
                                    <button
                                        type="button"
                                        className={`absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none ${formData.password ? '' : 'disabled:opacity-50 pointer-events-none'}`}
                                        onClick={() => togglePasswordVisibility('password')}
                                        disabled={!formData.password}
                                    >
                                        {showPassword ? <EyeOff/> : <Eye/>}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    {t("signup.confirm")}
                                </label>
                                <input type={showPassword ? "text" : "password"} name="confirmPassword"
                                       value={formData.confirmPassword} onChange={handleChange}
                                       placeholder="••••••••"
                                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 p-2.5 focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
                                       required={true}/>
                            </div>
                            <button type="submit" className="w-full text-white bg-[#61a60e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                {t("signup.cta")}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                <Link to={"/login"} className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    {t("signup.login")}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Signup;