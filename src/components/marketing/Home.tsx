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
import { FC, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Product } from "@/types/product.ts";
import { axiosPrivate } from "@/services/api-client.ts";
import axios from "axios";
import { Separator } from "@/components/ui/separator.tsx";

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

const RelativeSearchResults: FC<{
  products: Product[];
  searchQuery: string | null;
  onProductSelect: (product: Product) => void;
}> = ({ products, searchQuery, onProductSelect }) => {
  const highlightedProductNames = useMemo(() => {
    if (!searchQuery) return products.map((p) => p.name);

    return products.map((product) => {
      const regex = new RegExp(`(${searchQuery})`, "gi");
      return product.name.replace(regex, `<strong>$1</strong>`);
    });
  }, [products, searchQuery]);

  return (
    <div className="bg-white w-full rounded-md rounded-t-none border-t-0 max-h-[300px] overflow-auto border-2 border-neutral-300">
      <Separator />
      {products.length > 0 ? (
        highlightedProductNames.map((name, index) => (
          <div
            key={products[index].id}
            className="flex justify-between items-center px-4 py-2 hover:bg-neutral-100 cursor-pointer"
            onClick={() => onProductSelect(products[index])}
          >
            <div className="flex items-center gap-2">
              <img
                src={products[index].imageUrl}
                alt={products[index].name}
                className="h-10 w-10 rounded-md"
              />
              <p dangerouslySetInnerHTML={{ __html: name }} />
            </div>
            <p>₼ {(products[index].price / 100).toFixed(2)}</p>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-4">Not found</div>
      )}
    </div>
  );
};

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosPrivate.get("/products/search", {
        params: { query: searchQuery, page: 1 },
      });

      setProducts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setProducts([]);
        }
      }
    }
  };

  const handleProductSelect = (product: Product) => {
    navigate(`/product-page?product-id=${product.id}`);
    setShowSearchModal(false);
  };

  useEffect(() => {
    if (searchQuery?.trim()) {
      setShowSearchModal(true);
      fetchProducts();
    } else {
      setShowSearchModal(false);
    }
  }, [searchQuery]);

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
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="absolute m-0 top-full -left-0.5 -right-0.5 z-10">
          <RelativeSearchResults
            products={products}
            searchQuery={searchQuery}
            onProductSelect={handleProductSelect}
          />
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
          <SearchBar />
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
