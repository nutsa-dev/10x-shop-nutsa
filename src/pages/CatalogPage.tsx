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

const PAGE_LIMIT = 16;

const CATEGORY_OPTIONS = [
  { value: "home-decoration", label: "All Atelier & Home Decor" },
  { value: "wooden-toys", label: "Wooden Toys" },
  { value: "holiday-decor", label: "Holiday Decorations" },
  { value: "furniture", label: "Furniture" },
  { value: "kitchen-accessories", label: "Kitchen Accessories" },
] as const;

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const categoryParam = searchParams.get("category") || "home-decoration";
  const pageParam = Math.max(1, Number(searchParams.get("page")) || 1);
  const sortParam = (searchParams.get("sort") as SortOption) || "featured";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [page, setPage] = useState<number>(pageParam);
  const [sortOption, setSortOption] = useState<SortOption>(sortParam);
  const [searchInput, setSearchInput] = useState<string>(searchParam);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync URL searchParams (?category=..., ?page=..., ?sort=..., ?search=...)
  useEffect(() => {
    const params: Record<string, string> = {
      category: selectedCategory,
      page: String(page),
      sort: sortOption,
    };
    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim();
    }
    setSearchParams(params, { replace: true });
  }, [selectedCategory, page, sortOption, debouncedSearch, setSearchParams]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const skip = (page - 1) * PAGE_LIMIT;
      const data = await getProducts({
        category: selectedCategory,
        limit: PAGE_LIMIT,
        skip,
        search: debouncedSearch.trim() || undefined,
      });

      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load atelier collection");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, page, debouncedSearch]);

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
      case "featured":
      default:
        return list;
    }
  }, [products, sortOption]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setPage(1);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
  };

  const handleClearFilters = () => {
    setSelectedCategory("home-decoration");
    setPage(1);
    setSortOption("featured");
    setSearchInput("");
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));
  const hasActiveFilters =
    selectedCategory !== "home-decoration" ||
    debouncedSearch.trim() !== "" ||
    sortOption !== "featured";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
      
      {/* Editorial Hero / Header Banner */}
      <section className="rounded-2xl border border-[#EADBCC] bg-white px-6 py-8 sm:px-10 sm:py-12 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#8C6D58]">
          COLLECTION 2026
        </span>
        <h1 className="mt-2.5 text-2xl sm:text-4xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
          Curated Objects for Mindful Living
        </h1>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#736B63] dark:text-[#A39A90]">
          Handcrafted ceramics, raw wood forms, and sculptural accents sourced for modern interiors.
        </p>
      </section>

      {/* Filter, Category Select & Sort Toolbar */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-center">
        {/* Search Input */}
        <div className="relative sm:col-span-5 lg:col-span-6">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#736B63]">
            <IconSearch className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search wooden toys, holiday decor, furniture, ceramics..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-[#EADBCC] bg-white py-2.5 pl-10 pr-8 text-xs text-[#2C2724] placeholder-[#736B63] outline-none transition focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setPage(1);
              }}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#736B63] hover:text-[#2C2724] dark:hover:text-[#F7F5F0]"
            >
              <IconClose className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Select */}
        <div className="sm:col-span-4 lg:col-span-3">
          <select
            id="category-select"
            aria-label="Select category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full rounded-xl border border-[#EADBCC] bg-white px-3.5 py-2.5 text-xs font-medium text-[#2C2724] outline-none transition focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="sm:col-span-3 lg:col-span-3">
          <select
            id="sort-select"
            aria-label="Sort products"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="w-full rounded-xl border border-[#EADBCC] bg-white px-3.5 py-2.5 text-xs font-medium text-[#2C2724] outline-none transition focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Quick Pills & Status Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#EADBCC] pb-4 dark:border-[#332C27]">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {CATEGORY_OPTIONS.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleCategoryChange(cat.value)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#8C6D58] text-white"
                    : "border border-[#EADBCC] bg-white text-[#736B63] hover:border-[#8C6D58] hover:text-[#2C2724] dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#A39A90]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs text-[#736B63]">
          {!loading && <span>{total} objects</span>}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="font-medium text-[#8C6D58] hover:text-[#735744] underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#EADBCC] bg-white p-10 text-center dark:border-[#332C27] dark:bg-[#24201D]">
            <p className="text-xs font-medium text-[#2C2724] dark:text-[#F7F5F0]">
              {error}
            </p>
            <button
              type="button"
              onClick={fetchProducts}
              className="mt-4 rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-4 py-2 text-xs font-medium text-white transition-colors"
            >
              Retry
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#EADBCC] bg-white p-12 text-center dark:border-[#332C27] dark:bg-[#24201D]">
            <h3 className="text-sm font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
              No objects found
            </h3>
            <p className="mt-1 text-xs text-[#736B63]">
              Try adjusting your search query or switching categories.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-4 py-2 text-xs font-medium text-white transition-colors"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <ProductGrid
              products={sortedProducts}
              onAdd={(p) => addItem(p)}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-[#EADBCC] bg-white px-3.5 py-2 text-xs font-medium text-[#2C2724] hover:border-[#8C6D58] disabled:opacity-40 transition-colors dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
                >
                  Previous
                </button>
                <span className="px-3 text-xs font-medium text-[#736B63]">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-[#EADBCC] bg-white px-3.5 py-2 text-xs font-medium text-[#2C2724] hover:border-[#8C6D58] disabled:opacity-40 transition-colors dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
