import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../../services/api-client.ts";
import { Search } from "lucide-react";
import LoaderContext from "@/context/LoaderProvider.tsx";
import ProductCard from "@/components/product/ProductCard.tsx";
import { Product } from "@/types/product.ts";

const Products: FC = () => {
  const { loading, setLoading } = useContext(LoaderContext);
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const searchQuery = search.get("search");
  const { t } = useTranslation("global");

  useEffect(() => {
    (async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const response = await apiClient.get<Product[]>("/products/search", {
            params: { query: searchQuery, page: 1 },
          });
          setProducts(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [searchQuery, setLoading]);

  const selectProduct = useCallback(
    (id: number) => {
      navigate(`/product-page?product-id=${id}`);
    },
    [navigate]
  );

  if (products.length === 0 && !loading) {
    return (
      <div className="grid gap-4 py-12 px-4 text-center w-full">
        <Search className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {t("products.no-products-found")}
        </h2>
      </div>
    );
  }

  return (
    <div className="container w-full relative grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={selectProduct}
        />
      ))}
    </div>
  );
};

export default Products;
