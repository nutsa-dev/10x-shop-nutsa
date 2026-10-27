import { useEffect, useState, useCallback } from "react";
import { getProducts } from "@/api/products.api";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import type { Product } from "@/types/product";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "kitchen-accessories", label: "Kitchen Accessories" },
  { id: "home-decoration", label: "Home Decoration" },
  { id: "furniture", label: "Furniture" },
] as const;

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts({
        category: selectedCategory === "all" ? undefined : selectedCategory,
        limit: 40,
      });

      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* 1. Header Toolbar (PRD P2.1) */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Catalog
          </h1>
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            {!loading && `Showing ${products.length} products`}
          </p>
        </div>

        {/* Category Select Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="category-select" className="text-xs font-medium text-stone-600 dark:text-stone-400">
            Category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 shadow-xs outline-none transition focus:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Products Grid States */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-6 text-center dark:border-rose-900/40 dark:bg-rose-950/20">
          <p className="text-sm font-medium text-rose-800 dark:text-rose-300">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchProducts}
            className="mt-3 rounded-lg bg-rose-700 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-rose-800"
          >
            Try again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 p-10 text-center dark:border-stone-800">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            No products found.
          </h3>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="mt-3 rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ProductGrid
          products={products}
          onAdd={(p) => {
            console.log("Add to cart:", p.title);
          }}
        />
      )}
    </div>
  );
};
