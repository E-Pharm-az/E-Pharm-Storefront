import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "@/services/api-client";
import axios from "axios";
import { Product } from "@/types/product";

export const useProductSearch = (initialQuery: string | null = "") => {
  const [query, setQuery] = useState<string | null>(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!query?.trim()) {
      setProducts([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.get("/products/search", {
        params: { query, page: 1 },
      });
      setProducts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setProducts([]);
        } else {
          setError("An error occurred while fetching products");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { query, setQuery, products, isLoading, error };
};
