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
  { value: "home-decoration", label: "All Atelier Objects" },
  { value: "wooden-toys", label: "Wooden Toys" },
  { value: "holiday-decor", label: "Holiday Market" },
  { value: "furniture", label: "Wood Furniture" },
  { value: "kitchen-accessories", label: "Tableware & Kitchen" },
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
    <div className="container mx-auto px-4 sm:px-6 pt-6 pb-10">
      {/* Search & Sort Toolbar directly on the wooden table */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-center">
        {/* Search Input */}
        <div className="relative sm:col-span-8 lg:col-span-9">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#4E3622] dark:text-[#C8B29B]">
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
            className="wood-input w-full rounded-xl py-2.5 pl-10 pr-8 text-xs font-semibold outline-none"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setPage(1);
              }}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#4E3622] hover:text-[#26170C] dark:text-[#C8B29B]"
            >
              <IconClose className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="sm:col-span-4 lg:col-span-3">
          <select
            id="sort-select"
            aria-label="Sort products"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="wood-input w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Workshop Drawer Category Plates & Status Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {CATEGORY_OPTIONS.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
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

        <div className="flex items-center gap-3 text-xs">
          {!loading && (
            <span className="wood-engraved font-mono text-xs">
              [{total} OBJECTS]
            </span>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="wood-btn rounded-lg px-3 py-1.5 text-xs"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-4">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              onClick={fetchProducts}
              className="wood-btn mt-4 rounded-lg px-4 py-2 text-xs"
            >
              Retry
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="tactile-card rounded-2xl p-12 text-center">
            <h3 className="font-editorial text-lg font-bold text-[#26170C] dark:text-[#F5EBE0]">
              No objects found
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
              products={sortedProducts}
              onAdd={(p) => addItem(p)}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="wood-btn rounded-lg px-4 py-2 text-xs disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="wood-engraved font-mono px-3 text-xs">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
