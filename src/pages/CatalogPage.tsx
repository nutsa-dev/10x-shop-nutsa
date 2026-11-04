import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ALL_CATEGORY,
  DEFAULT_CATEGORIES,
  getCategories,
  getProducts,
  type SortOption,
} from "@/api/products.api";
import { useCart } from "@/context/CartContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { IconClose, IconSearch } from "@/components/ui/Icons";
import type { Product } from "@/types/product";

const PAGE_LIMIT = 12;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Sort: Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rating" },
  { value: "title-asc", label: "Name: A to Z" },
];

interface CatalogResult {
  key: string;
  products: Product[];
  total: number;
  error: string | null;
}

function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);

  // Dynamic category list from DummyJSON API
  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal).then((list) => {
      if (list && list.length > 0) {
        setCategories(list);
      }
    });
    return () => controller.abort();
  }, []);

  // URL is the single source of truth → browser Back / Forward restores state
  const selectedCategory = searchParams.get("category") || ALL_CATEGORY;
  const page = Math.max(1, Math.floor(Number(searchParams.get("page"))) || 1);
  const rawSort = searchParams.get("sort");
  const sortOption: SortOption =
    SORT_OPTIONS.find((opt) => opt.value === rawSort)?.value ?? "featured";
  const searchParam = searchParams.get("q") || "";

  // Local input state for responsive typing; re-synced when URL changes externally
  const [searchInput, setSearchInput] = useState<string>(searchParam);
  const [syncedSearchParam, setSyncedSearchParam] = useState<string>(searchParam);
  if (searchParam !== syncedSearchParam) {
    setSyncedSearchParam(searchParam);
    setSearchInput(searchParam);
  }

  // 400ms debounced search strictly in accordance with PRD P2.4
  const debouncedSearch = useDebounce(searchInput, 400).trim();

  const updateParams = (
    changes: Partial<Record<"category" | "page" | "sort" | "q", string | null>>,
    replace = false
  ) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(changes)) {
          if (value === null || value === "") next.delete(key);
          else next.set(key, value);
        }
        return next;
      },
      { replace }
    );
  };

  // Push debounced search into the URL (?q=...)
  useEffect(() => {
    if (debouncedSearch === searchParam.trim()) return;
    updateParams({ q: debouncedSearch || null, page: null }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const [retryToken, setRetryToken] = useState(0);
  const requestKey = JSON.stringify([
    selectedCategory,
    page,
    sortOption,
    searchParam.trim(),
    retryToken,
  ]);
  const [result, setResult] = useState<CatalogResult | null>(null);

  // Fetch products with AbortController for clean cancellation on rapid user input
  useEffect(() => {
    const controller = new AbortController();

    getProducts({
      category: selectedCategory,
      limit: PAGE_LIMIT,
      skip: (page - 1) * PAGE_LIMIT,
      q: searchParam.trim() || undefined,
      sort: sortOption,
      signal: controller.signal,
    })
      .then((data) => {
        setResult({
          key: requestKey,
          products: data.products,
          total: data.total,
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResult({
          key: requestKey,
          products: [],
          total: 0,
          error: err instanceof Error ? err.message : "Failed to load products",
        });
      });

    return () => {
      controller.abort();
    };
  }, [requestKey, selectedCategory, page, sortOption, searchParam]);

  const loading = result?.key !== requestKey;
  const products = result?.products ?? [];
  const total = result?.total ?? 0;
  const error = loading ? null : result?.error ?? null;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));

  // Clamp out-of-range pages to last available page
  useEffect(() => {
    if (!loading && !error && total > 0 && page > totalPages) {
      updateParams({ page: String(totalPages) }, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, total, page, totalPages]);

  const handleCategoryChange = (newCategory: string) => {
    // When changing category, reset page and clear search query as per PRD
    setSearchInput("");
    updateParams({
      category: newCategory === ALL_CATEGORY ? null : newCategory,
      q: null,
      page: null,
    });
  };

  const handleSortChange = (newSort: SortOption) => {
    updateParams({ sort: newSort === "featured" ? null : newSort, page: null });
  };

  const goToPage = (nextPage: number) => {
    updateParams({ page: nextPage <= 1 ? null : String(nextPage) });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== ALL_CATEGORY ||
    searchParam.trim() !== "" ||
    sortOption !== "featured";

  const categoryOptions = [
    { value: ALL_CATEGORY, label: "All categories" },
    ...categories.map((c) => ({ value: c, label: formatCategoryName(c) })),
  ];

  return (
    <div className="mx-auto max-w-[1380px] px-3.5 sm:px-8 lg:px-10 pt-5 sm:pt-7 pb-10 sm:pb-12">
      {/* Search & Sort Toolbar */}
      <div className="grid grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-12 sm:items-center">
        {/* Search Input */}
        <div className="relative sm:col-span-8 lg:col-span-9">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#4E3622] dark:text-[#C8B29B]">
            <IconSearch className="h-4 w-4" />
          </span>
          <input
            type="text"
            aria-label="Search products"
            placeholder="Search products by title, category, or description..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="wood-input w-full rounded-xl py-2.5 pl-10 pr-8 text-xs font-semibold outline-none"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                updateParams({ q: null, page: null }, true);
              }}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#4E3622] hover:text-[#26170C] dark:text-[#C8B29B]"
            >
              <IconClose className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort Select (5 Options) */}
        <div className="sm:col-span-4 lg:col-span-3">
          <select
            id="sort-select"
            aria-label="Sort products"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="wood-input w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Selection & Status Bar */}
      <div className="mt-3.5 sm:mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2.5 sm:gap-3 pb-2">
        {/* Mobile Category Dropdown (< 640px) */}
        <div className="sm:hidden">
          <select
            id="category-select-mobile"
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="wood-input w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none"
          >
            {categoryOptions.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop / Tablet Category Buttons (>= 640px) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {categoryOptions.slice(0, 8).map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleCategoryChange(cat.value)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-xs ${
                  isActive ? "wood-btn-walnut" : "wood-btn"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
          {!loading && total > 0 && (
            <span className="wood-engraved font-mono text-[11px] sm:text-xs">
              Showing {(page - 1) * PAGE_LIMIT + 1}–{Math.min(page * PAGE_LIMIT, total)} of {total} products
            </span>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="wood-btn rounded-lg px-3 py-1.5 text-xs"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-3 sm:mt-4">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="tactile-card rounded-2xl p-10 text-center">
            <p className="text-xs font-medium text-[#26170C] dark:text-[#F5EBE0]">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setRetryToken((t) => t + 1)}
              className="wood-btn mt-4 rounded-lg px-4 py-2 text-xs"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="tactile-card rounded-2xl p-12 text-center">
            <h3 className="font-editorial text-lg font-bold text-[#26170C] dark:text-[#F5EBE0]">
              No products found.
            </h3>
            <p className="mt-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
              Try adjusting your search query or switching categories.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="wood-btn mt-4 rounded-lg px-4 py-2 text-xs"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <ProductGrid
              products={products}
              startIndex={(page - 1) * PAGE_LIMIT}
              onAdd={(p) => addItem(p)}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                  className="wood-btn rounded-lg px-4 py-2 text-xs disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="wood-engraved font-mono px-3 text-xs">
                  {Math.min(page, totalPages)} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => goToPage(page + 1)}
                  className="wood-btn rounded-lg px-4 py-2 text-xs disabled:opacity-40"
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
