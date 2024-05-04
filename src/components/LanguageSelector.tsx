import {FC, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Globe} from "lucide-react";

type Language = {
    code: string;
    name: string;
};

const LanguageSelector: FC = () => {
    const languages: Language[] = [
        { code: "ru", name: "Русский" },
        { code: "az", name: "Azərbaycan" },
        { code: "en", name: "English" },
    ];

    const [, i18n] = useTranslation("global");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

    useEffect(() => {
        const storedLanguage = localStorage.getItem("selectedLanguage");
        if (storedLanguage) {
            setSelectedLanguage(JSON.parse(storedLanguage));
        } else {
            setSelectedLanguage(languages[0]);
        }
    }, []);

    useEffect(() => {
        if (selectedLanguage) {
            localStorage.setItem("selectedLanguage", JSON.stringify(selectedLanguage));
            i18n.changeLanguage(selectedLanguage.code);
        }
    }, [selectedLanguage, i18n]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        function handleWindowBlur() {
            setShowDropdown(false);
        }

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('blur', handleWindowBlur);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('blur', handleWindowBlur);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('blur', handleWindowBlur);
        };
    }, [showDropdown]);

    const handleLanguageSelect = (language: Language) => {
        setSelectedLanguage(language);
        setShowDropdown(false);
    };

    if (!selectedLanguage) {
        return null;
    }

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div
                className="flex items-center text-left transition hover:cursor-pointer hover:opacity-70"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <Globe className="mr-1 h-5 w-5" />
                <span className="capitalize">{selectedLanguage.code}</span>
            </div>
            {showDropdown && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:absolute md:top-10 md:left-auto md:block md:bg-transparent"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <div
                        className="w-2/3 rounded bg-white p-2 space-y-2 md:w-full md:border md:border-neutral-300 md:shadow-xl"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {languages.map((language) => (
                            <div
                                key={language.code}
                                onClick={() => handleLanguageSelect(language)}
                                className="block w-full cursor-pointer rounded px-4 py-2 text-xl text-gray-700 hover:bg-neutral-300 md:text-sm"
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
