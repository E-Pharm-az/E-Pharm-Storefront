import {FormEvent, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {Search} from "lucide-react";

export const SearchProducts = () => {
    const history = useNavigate();
    const location = useLocation(); // Add this line
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const [t] = useTranslation("global")

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get("setSearch")) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [location.search]);

    const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history(`/products?search=${searchQuery}`);
    }

    const activateInput = () => {
        setIsInputActive(true);
    };

    return (
        <form onSubmit={handleSubmission} className="w-full flex items-center rounded-xl border border-gray-300">
            <input
                ref={inputRef}
                type="text"
                className={`flex-grow p-2 rounded-xl text-sm font-medium ${isInputActive ? "focus:outline-none" : ""}`}
                placeholder={t("home.placeholder")}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={activateInput}
                onFocus={activateInput}
            />
            <button type="submit" className="p-2 disabled:opacity-30 disabled:cursor-default" disabled={!searchQuery.trim()}>
                <Search/>
            </button>
        </form>
    )
}