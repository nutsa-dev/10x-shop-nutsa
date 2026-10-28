import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "@/api/products.api";
import { useCart } from "@/context/CartContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { getDiscountedPrice } from "@/utils/format";
import type { Product } from "@/types/product";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "kitchen-accessories", label: "Kitchen & Dining" },
  { id: "furniture", label: "Wooden Furniture" },
  { id: "holiday-decor", label: "Holiday & Christmas Decor" },
  { id: "home-decoration", label: "Home Decor & Hygge" },
] as const;

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc" | "title-asc";

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  // URL-იდან პარამეტრების ამოღება
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";
  const sortParam = (searchParams.get("sort") as SortOption) || "featured";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchInput, setSearchInput] = useState<string>(searchParam);
  const [sortOption, setSortOption] = useState<SortOption>(sortParam);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 400ms Debounced Search
  const debouncedSearch = useDebounce(searchInput, 400);

  // URL SearchParams სინქრონიზაცია
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (sortOption !== "featured") params.sort = sortOption;

    setSearchParams(params, { replace: true });
  }, [selectedCategory, debouncedSearch, sortOption, setSearchParams]);

  // პროდუქტების წამოღება API-დან
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

  // პროდუქტების სორტირება
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

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* 1. Header Toolbar */}
      <div className="mb-6 flex flex-col gap-4 border-b border-stone-200 pb-5 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
              Nordic Catalog
            </h1>
            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              {!loading && (
                <>
                  Showing <strong>{sortedProducts.length}</strong> handcrafted products
                  {debouncedSearch && ` for "${debouncedSearch}"`}
                </>
              )}
            </p>
          </div>

          {/* Quick Active Filter Reset */}
          {(selectedCategory !== "all" || debouncedSearch || sortOption !== "featured") && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="self-start sm:self-auto text-xs font-semibold text-amber-700 hover:underline dark:text-amber-500"
            >
              Reset filters ✕
            </button>
          )}
        </div>

        {/* 2. Search, Category & Sort Filter Controls */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-center">
          {/* Debounced Search Input */}
          <div className="relative sm:col-span-2 lg:col-span-6">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products by title, description..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white py-2 pl-9 pr-8 text-xs text-stone-900 shadow-xs outline-none transition focus:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 lg:col-span-3">
            <label htmlFor="category-select" className="shrink-0 text-xs font-medium text-stone-600 dark:text-stone-400">
              Category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-800 shadow-xs outline-none transition focus:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-2 lg:col-span-3">
            <label htmlFor="sort-select" className="shrink-0 text-xs font-medium text-stone-600 dark:text-stone-400">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-800 shadow-xs outline-none transition focus:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="title-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Products Grid States */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-8 text-center dark:border-rose-900/40 dark:bg-rose-950/20">
          <p className="text-sm font-medium text-rose-800 dark:text-rose-300">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchProducts}
            className="mt-3 rounded-lg bg-rose-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-rose-800"
          >
            Try again
          </button>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800">
          <span className="text-3xl">🔍</span>
          <h3 className="mt-3 text-base font-semibold text-stone-900 dark:text-stone-100">
            No products found
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Try adjusting your search query or switching categories.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <ProductGrid
          products={sortedProducts}
          onAdd={(p) => addItem(p)}
        />
      )}
    </div>
  );
};
