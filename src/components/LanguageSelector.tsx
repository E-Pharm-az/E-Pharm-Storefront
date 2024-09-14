import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: "ru", name: "Русский" },
  { code: "az", name: "Azərbaycan" },
  { code: "en", name: "English" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation("global");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    () => {
      const storedLanguage = localStorage.getItem("selectedLanguage");
      if (storedLanguage) {
        return JSON.parse(storedLanguage);
      }
      const initialLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];
      localStorage.setItem("selectedLanguage", JSON.stringify(initialLanguage));
      return initialLanguage;
    }
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage.code);
    }
  }, [selectedLanguage, i18n]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    localStorage.setItem("selectedLanguage", JSON.stringify(language));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Globe className="h-4 w-4" />
          <p>{selectedLanguage?.code.toUpperCase()}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen h-screen z-10 relative overflow-hidden">
        {languages.map((language) => (
          <Button
            key={language.code}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleLanguageSelect(language)}
          >
            {language.name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
