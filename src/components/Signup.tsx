import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {BsArrowRepeat, BsEye, BsEyeSlash} from "react-icons/bs";
import {useState} from "react";
import apiClient from "../services/api-client.ts";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [t] = useTranslation("global");
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password === formData.confirmPassword) {
            try {
                const response = await apiClient.post("/user/register", formData);
                if (response.status === 200) {
                    console.log("User registered successfully");
                }
            }
            catch (error) {
                setError(error.message);
            }
        }
        else {
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <BsArrowRepeat className="animate-spin text-blue-500 mr-2"/>
                </div>
            )}

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <form className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        {t("signup.title")}
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        {error && <div className="text-center text-red-500">{error}</div>}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                {t("signup.firstname")}
                            </label>
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="John" required={true}/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                {t("signup.lastname")}
                            </label>
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="Doe" required={true}/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                {t("signup.fin")}
                            </label>
                            <input type="text" name="fin" value={formData.fin} onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="123456" required={true}/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                {t("signup.email")}
                            </label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="name@example.com" required={true}/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                {t("signup.phone")}
                            </label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="+994 50 123 45 67" required={true}/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900">{t("signup.password")}</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} name="password"
                                       value={formData.password} onChange={handleChange}
                                       placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                       required={true}/>
                                <button
                                    type="button"
                                    className={`absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none ${formData.password ? '' : 'disabled:opacity-50 pointer-events-none'}`}
                                    onClick={() => togglePasswordVisibility('password')}
                                    disabled={!formData.password}
                                >
                                    {showPassword ? <BsEyeSlash/> : <BsEye/>}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                {t("signup.confirm")}
                            </label>
                            <input type={showPassword ? "text" : "password"} name="confirmPassword"
                                   value={formData.confirmPassword} onChange={handleChange}
                                   placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   required={true}/>
                        </div>
                        <button type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            {t("signup.cta")}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            <Link to={"/login"}
                                  className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">{t("signup.login")}</Link>
                        </p>
                    </form>
                </form>
            </div>
        </div>
    )
}

export default Signup;