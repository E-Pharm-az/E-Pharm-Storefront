import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        navigate(from, {replace: true});
    }, []);

    return(<></>);
}

export default NotFound;