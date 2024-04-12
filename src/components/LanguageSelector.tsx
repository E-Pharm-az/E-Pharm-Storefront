import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Globe} from "lucide-react";

type Language = {
    code: string;
    name: string;
};

const LanguageSelector = () => {
    const languages: Language[] = [
        {code: "ru", name: "Русский"},
        {code: "az", name: "Azərbaycan"},
        {code: "en", name: "English"},
    ];

    const [, i18n] = useTranslation("global");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
        const storedLanguage = localStorage.getItem("selectedLanguage");
        return storedLanguage ? JSON.parse(storedLanguage) : languages[0];
    });

    useEffect(() => {
        localStorage.setItem("selectedLanguage", JSON.stringify(selectedLanguage));
        i18n.changeLanguage(selectedLanguage.code);
    }, [selectedLanguage, i18n]);

    const handleLanguageSelect = (language: Language) => {
        setSelectedLanguage(language);
        setShowDropdown(false);
    };

    return (
        <div className="relative inline-block text-left  hover:cursor-pointer">
            <div className="flex items-center hover:opacity-70 transition" onClick={() => setShowDropdown(!showDropdown)}>
                <Globe className="w-5 h-5 mr-1"/>
                <span className="capitalize">{selectedLanguage.code}</span>
            </div>
            {showDropdown && (
                <div
                    className="origin-top-right z-10 absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {languages.map((language) => (
                            <div
                                key={language.code}
                                onClick={() => handleLanguageSelect(language)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                role="menuitem"
                            >
                                {language.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
