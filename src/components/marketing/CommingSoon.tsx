import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  const { t } = useTranslation("global");

  return (
    <div className="flex items-center justify-center h-[700px] bg-gradient-to-b from-neutral-300 to-brand-secondary rounded">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-5xl font-bold mb-4 text-white">
          {t("comingSoon.title")}
        </h1>
        <p className="text-lg mb-8 text-white">
          {t("comingSoon.description")}
        </p>
        <Button variant="brand" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            <span>{t("comingSoon.backButton")}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
