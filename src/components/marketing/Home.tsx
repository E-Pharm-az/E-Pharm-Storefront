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
import { Link, useNavigate } from "react-router-dom";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useProductSearch } from "@/hooks/useProductSearch.ts";
import { ProductSearchResults } from "@/components/ProductSearchResults.tsx";

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

export const HomeSearchBar: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const { query, setQuery, products } = useProductSearch();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query?.trim()) {
      navigate(`/products?search=${query}`);
    }
  };

  useEffect(() => {
    setShowSearchModal(!!query?.trim());
  }, [query]);

  return (
    <form
      onSubmit={handleSubmission}
      className={`relative w-full p-1 items-center border-2 border-neutral-300 shadow-lg ${
        showSearchModal
          ? "rounded-md border-b-0 rounded-b-none"
          : "rounded-full"
      }`}
    >
      <div className="flex items-center gap-2 w-full max-w-full sm:h-14 h-10">
        <Button size="icon" variant="ghost" className="h-full hover:bg-white">
          <Search className="w-6 h-6 text-muted-foreground" />
        </Button>
        <div className="flex-1">
          <input
            type="text"
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            className="h-full w-full text-muted-foreground text-md font-medium outline-none"
            placeholder={t("home.placeholder")}
          />
        </div>
        {!showSearchModal && (
          <Button
            type="submit"
            variant="brand"
            className="h-10 px-4 sm:h-full sm:px-6"
          >
            {t("home.cta")}
          </Button>
        )}
      </div>
      {showSearchModal && (
        <div className="absolute m-0 top-full -left-0.5 -right-0.5 z-10 rounded-md rounded-t-none border-t-0 border-neutral-300 border-2">
          <ProductSearchResults products={products} query={query} />
        </div>
      )}
    </form>
  );
};

const Home = () => {
  const [t] = useTranslation("global");

  return (
    <div className="px-4 sm:px-8 md:max-w-[1200px] mx-auto">
      <div className="mx-auto my-8 sm:my-16 md:my-64 max-w-4xl">
        <div className="grid gap-6">
          <div className="grid gap-3 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              {t("home.title")}
            </h1>
            <p className="text-sm sm:text-base">{t("home.description")}</p>
          </div>
          <HomeSearchBar />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
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
    </div>
  );
};

export default Home;
