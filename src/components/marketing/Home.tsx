import { useTranslation } from "react-i18next";
import {
  Activity,
  CloudDrizzle,
  Droplet,
  Heart,
  LucideIcon,
  Pill,
  Search,
  Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

interface CategoryButtonProps {
  icon: LucideIcon;
  label: string;
}

const CategoryButton = ({ icon: Icon, label }: CategoryButtonProps) => (
  <Button variant="link" asChild>
    <Link to="/">
      <Icon className="h-4 w-4" />
      <p className="text-md text-neutral-800">{label}</p>
    </Link>
  </Button>
);

const Home = () => {
  const [t] = useTranslation("global");

  return (
    <div className="mx-auto my-8 sm:my-16 md:my-32 max-w-4xl">
      <div className="grid gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t("home.title")}
          </h1>
          <p className="text-base sm:text-lg">{t("home.description")}</p>
        </div>

        <form className="flex w-full p-1 items-center rounded-full border-2 border-neutral-300 h-16">
          <div className="flex items-center gap-2 w-full max-w-full h-full">
            <Button size="icon" variant="ghost" className="h-full hover:bg-white">
              <Search className="w-6 h-6 text-muted-foreground" />
            </Button>
            <input
              type="text"
              className="h-full w-full text-muted-foreground text-md font-medium outline-none"
              placeholder={t("home.placeholder")}
            />
          </div>
          <Button variant="brand" className="h-full px-6">
            {t("home.cta")}
          </Button>
        </form>

        <div className="flex justify-between">
          <CategoryButton
            icon={Thermometer}
            label={t("home.categories.coldFlu")}
          />
          <CategoryButton
            icon={Activity}
            label={t("home.categories.painRelief")}
          />
          <CategoryButton
            icon={CloudDrizzle}
            label={t("home.categories.allergy")}
          />
          <CategoryButton
            icon={Heart}
            label={t("home.categories.digestiveHealth")}
          />
          <CategoryButton
            icon={Droplet}
            label={t("home.categories.skinCare")}
          />
          <CategoryButton icon={Pill} label={t("home.categories.vitamins")} />
        </div>
      </div>
    </div>
  );
};

export default Home;
