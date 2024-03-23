import {BsSearch} from "react-icons/bs";
import {FormEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export const SearchProducts = () => {
    const history = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isInputActive, setIsInputActive] = useState(false);
    const [t] = useTranslation("global")

    const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history(`/products?search=${searchQuery}`);
    }

    const activateInput = () => {
        setIsInputActive(true);
    };

    return (
        <form onSubmit={handleSubmission} className="w-full mx-auto flex items-center rounded-xl border border-gray-300">
            <input
                type="text"
                className={`flex-grow p-2 rounded-xl text-xs ${isInputActive ? "focus:outline-none" : ""}`}
                placeholder={t("home.placeholder")}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={activateInput}
                onFocus={activateInput}
            />
            <button type="submit" className="p-2"
                    disabled={!searchQuery.trim()}>
                <BsSearch/>

            </button>
        </form>
    )
}