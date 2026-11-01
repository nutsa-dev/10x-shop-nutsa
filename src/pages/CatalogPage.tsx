import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "@/api/products.api";
import { useCart } from "@/context/CartContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { IconClose, IconSearch } from "@/components/ui/Icons";
import { getDiscountedPrice } from "@/utils/format";
import type { Product } from "@/types/product";

const CATEGORIES = [
  { id: "all", label: "All Gear" },
  { id: "skis", label: "Skis" },
  { id: "snowboards", label: "Snowboards" },
  { id: "goggles", label: "Goggles & Eyewear" },
  { id: "helmets", label: "Helmets" },
  { id: "accessories", label: "Accessories" },
] as const;

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc" | "title-asc";

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";
  const sortParam = (searchParams.get("sort") as SortOption) || "featured";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchInput, setSearchInput] = useState<string>(searchParam);
  const [sortOption, setSortOption] = useState<SortOption>(sortParam);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync with URL query params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (sortOption !== "featured") params.sort = sortOption;

    setSearchParams(params, { replace: true });
  }, [selectedCategory, debouncedSearch, sortOption, setSearchParams]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts({
        category: selectedCategory === "all" ? undefined : selectedCategory,
        search: debouncedSearch.trim() || undefined,
        limit: 50,
      });

      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortOption) {
      case "price-asc":
        return list.sort((a, b) => {
          const pA = getDiscountedPrice(a.price, a.discountPercentage);
          const pB = getDiscountedPrice(b.price, b.discountPercentage);
          return pA - pB;
        });
      case "price-desc":
        return list.sort((a, b) => {
          const pA = getDiscountedPrice(a.price, a.discountPercentage);
          const pB = getDiscountedPrice(b.price, b.discountPercentage);
          return pB - pA;
        });
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "featured":
      default:
        return list;
    }
  }, [products, sortOption]);

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSearchInput("");
    setSortOption("featured");
  };

  const hasActiveFilters = selectedCategory !== "all" || debouncedSearch.trim() !== "" || sortOption !== "featured";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      
      {/* 1. Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Winter Sports Equipment
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {!loading && `${sortedProducts.length} items`}
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* 2. Minimal Category Navigation Tabs */}
      <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3. Search and Sort Filter Controls */}
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-12 sm:items-center">
        {/* Search Input */}
        <div className="relative sm:col-span-8 lg:col-span-9">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
            <IconSearch className="h-3.5 w-3.5" />
          </span>
          <input
            type="text"
            placeholder="Search skis, snowboards, goggles..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-8 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-400"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <IconClose className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort Filter */}
        <div className="sm:col-span-4 lg:col-span-3">
          <select
            id="sort-select"
            aria-label="Sort products"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="w-full rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-xs font-medium text-neutral-800 outline-none transition focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="title-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* 4. Products Grid */}
      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
              {error}
            </p>
            <button
              type="button"
              onClick={fetchProducts}
              className="mt-3 rounded-lg bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
            >
              Retry
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              No products found
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Try adjusting your search criteria.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 rounded-lg bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ProductGrid
            products={sortedProducts}
            onAdd={(p) => addItem(p)}
          />
        )}
      </div>
    </div>
  );
};
