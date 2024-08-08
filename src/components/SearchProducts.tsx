import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { axiosPrivate } from "@/services/api-client.ts";
import axios from "axios";
import { Product } from "@/types/product.ts";
import { RelativeSearchResults } from "@/components/marketing/Home.tsx";

export const SearchProducts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [t] = useTranslation("global");
  const [products, setProducts] = useState<Product[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

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
    <form onSubmit={handleSubmission} className="w-full grid gap-1">
      <div className="flex items-center rounded-xl border border-muted-foreground">
        <button
          type="submit"
          className="p-2 disabled:cursor-default disabled:opacity-30"
          disabled={!searchQuery?.trim()}
        >
          <Search />
        </button>
        <input
          ref={inputRef}
          type="text"
          className="w-full p-2 rounded-xl text-sm font-medium outline-none"
          placeholder={t("home.placeholder")}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {showSearchModal && (
        <RelativeSearchResults
          className="border border-muted-foreground rounded-md shadow-md"
          products={products}
          searchQuery={searchQuery}
          onProductSelect={handleProductSelect}
        />
      )}
    </form>
  );
};
