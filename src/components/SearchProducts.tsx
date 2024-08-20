import { FormEvent, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { ProductSearchResults } from "@/components/ProductSearchResults";
import { useProductSearch } from "@/hooks/useProductSearch";

export const SearchProducts = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [t] = useTranslation("global");
  const { query, setQuery, products, isLoading } = useProductSearch();

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query?.trim()) {
      navigate(`/products?search=${query}`);
    }
  };

  const handleProductSelect = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setQuery(null);
  };

  return (
    <form onSubmit={handleSubmission} className="w-full grid gap-1">
      <div className="flex items-center rounded-xl border border-muted-foreground">
        <button
          type="submit"
          className="p-2 disabled:cursor-default disabled:opacity-30"
          disabled={!query?.trim()}
        >
          <Search />
        </button>
        <input
          ref={inputRef}
          type="text"
          className="w-full p-2 rounded-xl text-sm font-medium outline-none"
          placeholder={t("home.placeholder")}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {query && !isLoading && (
        <ProductSearchResults
          products={products}
          query={query}
          onProductSelect={handleProductSelect}
          className="border border-muted-foreground rounded-md shadow-md"
        />
      )}
    </form>
  );
};
