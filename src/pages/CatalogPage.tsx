import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "@/api/products.api";
import { useCart } from "@/context/CartContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { IconClose, IconSearch, IconLeaf, IconTruck, IconShield } from "@/components/ui/Icons";
import { getDiscountedPrice } from "@/utils/format";
import type { Product } from "@/types/product";

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "kitchen-accessories", label: "Kitchen & Dining" },
  { id: "furniture", label: "Wooden Furniture" },
  { id: "holiday-decor", label: "Holiday & Decor" },
  { id: "home-decoration", label: "Home Decor & Hygge" },
] as const;

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc" | "title-asc";

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  // Extract query parameters from URL
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

  // Synchronize URL search params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (sortOption !== "featured") params.sort = sortOption;

    setSearchParams(params, { replace: true });
  }, [selectedCategory, debouncedSearch, sortOption, setSearchParams]);

  // Fetch products
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

  // Sort products in-memory
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
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      
      {/* 1. Nordic Ambient Hero Banner */}
      <section className="relative mb-8 sm:mb-12 overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-b from-stone-100/90 via-stone-50/70 to-white p-6 sm:p-10 shadow-xs dark:border-stone-800 dark:from-[#1b1b19] dark:via-[#161614] dark:to-[#121211]">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <IconLeaf className="h-3 w-3" />
            <span>Nordic Eco Craftsmanship</span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-stone-100 font-sans">
            Tranquil Design for Mindful Living
          </h1>
          
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-600 dark:text-stone-400">
            Curated Scandinavian wooden essentials, minimalist ceramics, and warm hygge accents crafted sustainably for timeless homes.
          </p>

          {/* Value props */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-semibold text-stone-700 dark:text-stone-300">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-1.5 shadow-2xs border border-stone-200/80 dark:bg-stone-900/80 dark:border-stone-800">
              <IconLeaf className="h-3.5 w-3.5 text-emerald-600" />
              100% Sustainable Wood
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-1.5 shadow-2xs border border-stone-200/80 dark:bg-stone-900/80 dark:border-stone-800">
              <IconTruck className="h-3.5 w-3.5 text-emerald-600" />
              Carbon-Neutral Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-1.5 shadow-2xs border border-stone-200/80 dark:bg-stone-900/80 dark:border-stone-800">
              <IconShield className="h-3.5 w-3.5 text-emerald-600" />
              30-Day Nordic Trial
            </span>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Chips (Tap friendly) */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-stone-900 text-white shadow-xs dark:bg-stone-100 dark:text-stone-900"
                  : "border border-stone-200/90 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3. Search and Sort Filter Toolbar */}
      <div className="mb-8 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-center">
          
          {/* Search Input */}
          <div className="relative sm:col-span-2 lg:col-span-7">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
              <IconSearch className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search handcrafted products, furniture, ceramics..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/60 py-2.5 pl-10 pr-9 text-xs font-medium text-stone-900 outline-none transition focus:border-stone-500 focus:bg-white dark:border-stone-700/80 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-stone-400"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown (fallback & mobile select) */}
          <div className="flex items-center gap-2 lg:col-span-2">
            <select
              id="category-select"
              aria-label="Select category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3 py-2.5 text-xs font-semibold text-stone-800 outline-none transition focus:border-stone-500 focus:bg-white dark:border-stone-700/80 dark:bg-stone-900 dark:text-stone-200"
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
            <select
              id="sort-select"
              aria-label="Sort products"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3 py-2.5 text-xs font-semibold text-stone-800 outline-none transition focus:border-stone-500 focus:bg-white dark:border-stone-700/80 dark:bg-stone-900 dark:text-stone-200"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Customer Rating</option>
              <option value="title-asc">Alphabetical: A to Z</option>
            </select>
          </div>

        </div>

        {/* Results Counter and Active Filter Reset */}
        <div className="mt-3.5 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500 dark:border-stone-800/80 dark:text-stone-400">
          <div>
            {!loading && (
              <span>
                Showing <strong className="text-stone-900 dark:text-stone-100">{sortedProducts.length}</strong> items
                {debouncedSearch && ` matching "${debouncedSearch}"`}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400 flex items-center gap-1"
            >
              <span>Reset filters</span>
              <span>✕</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Products Grid & Status States */}
      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-8 text-center dark:border-rose-900/40 dark:bg-rose-950/20">
          <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchProducts}
            className="mt-4 rounded-xl bg-rose-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-rose-800"
          >
            Try reloading
          </button>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900/60">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
            <IconSearch className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-stone-900 dark:text-stone-100">
            No products match your criteria
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-5 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 shadow-xs"
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
