import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client.ts";
import Logo from "../../assets/e-pharm.png";
import { Loader } from "lucide-react";

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
    setLoading(true);

    try {
      const response = await apiClient.get(
        `/auth/confirm-email?userId=${userId}&token=${token}`,
      );
      if (response.status === 200) {
        setOnSuccess(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
          <Loader className="mr-2 animate-spin text-blue-500" />
        </div>
      )}
      {error && (
        <div className="fixed top-2 right-0 left-0 mx-auto rounded border-2 border-red-600 bg-red-500 p-2 text-center text-white shadow w-[500px]">
          <p>{error}</p>
        </div>
      )}
      <div className="w-full space-y-4 md:w-max-[500px]">
        <img src={Logo} alt="logo" className="h-16 w-16" />
        <p className="text-xl font-semibold">Account confirmation Successful</p>
        {onSuccess ? (
          <>
            <p>Your account has been confirmed, please precede to login.</p>
            <Link
              to="/login"
              className="block w-full rounded-lg border border-lime-500 bg-lime-600 px-6 py-3 text-center font-medium text-white transition duration-300 hover:bg-lime-700 focus:bg-lime-700 focus:outline-none"
            >
              Go to login
            </Link>
          </>
        ) : (
          <>
            <p>To confirm your account, please follow the button below.</p>
            <button
              className="w-full rounded-lg border border-lime-500 bg-lime-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-lime-700 focus:bg-lime-700 focus:outline-none"
              onClick={confirmEmail}
            >
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
