import {BsSearch} from "react-icons/bs";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";



export const SearchProducts = () => {
    const history = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isInputActive, setIsInputActive] = useState(false);
    const [t] = useTranslation("global")

    const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history(`/products?search=${searchQuery}`);
    }

    const activateInput = () => {
        setIsInputActive(true);
    };

    return (
        <form onSubmit={handleSubmission}
              className="mt-4 mx-auto flex items-center bg-white rounded border border-gray-300">
            <div className="p-2">
                <BsSearch/>
            </div>
            <input
                type="text"
                className={`flex-grow p-2 rounded-l ${isInputActive ? "focus:outline-none" : ""}`}
                placeholder={t("home.placeholder")}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={activateInput}
                onFocus={activateInput}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!searchQuery.trim()}>{t("home.cta")}</button>
        </form>
    )
}