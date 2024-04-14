import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import apiClient from "../services/api-client.ts";
import Logo from "../assets/e-pharm.png";
import {Loader} from "lucide-react";

const ConfirmEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [onSuccess, setOnSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userIdParam = searchParams.get("userId");
        const tokenParam = searchParams.get("token");

        if (userIdParam && tokenParam) {
            setUserId(userIdParam);
            setToken(tokenParam);
        } else {
            navigate("/");
        }
    }, [location.search, navigate]);

    const confirmEmail = async () => {
        setLoading(true)

        try {
            const response = await apiClient.get(`/auth/confirm-email?userId=${userId}&token=${token}`);
            if (response.status === 200) {
                setOnSuccess(true);
            }

        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                    <Loader className="animate-spin text-blue-500 mr-2"/>
                </div>
            )}
            {error && (
                <div
                    className="fixed top-2 left-0 mx-auto shadow right-0 w-[500px] text-center bg-red-500 p-2 rounded border-2 border-red-600 text-white">
                    <p>{error}</p>
                </div>
            )}
            <div className="space-y-4 w-full  md:w-max-[500px]">
                <img src={Logo} alt="logo" className="w-16 h-16"/>
                <p className="font-semibold text-xl">Account confirmation Successful</p>
                {onSuccess ? (
                    <>
                        <p>Your account has been confirmed, please precede to login.</p>
                        <Link to="/login" className="py-3 px-6 block text-center  bg-lime-600 w-full text-white font-medium rounded-lg border border-lime-500 focus:outline-none hover:bg-lime-700 focus:bg-lime-700 transition duration-300">
                            Go to login
                        </Link>
                    </>
                ) : (
                    <>
                        <p>To confirm your account, please follow the button below.</p>
                        <button
                            className="py-3 px-6 bg-lime-600 w-full text-white font-medium rounded-lg border border-lime-500 focus:outline-none hover:bg-lime-700 focus:bg-lime-700 transition duration-300"
                            onClick={confirmEmail}>
                            Confirm Account
                        </button>
                        <p>If you have any issue confirming your account please, contact</p>
                        <Link to="" className="text-blue-700">
                            info@e-pharm.co.
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmEmail;
