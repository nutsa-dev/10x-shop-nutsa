import { useEffect, useState, useCallback } from "react";
import { getProducts } from "@/api/products.api";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import type { Product } from "@/types/product";

const CURATED_CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "kitchen-accessories", label: "🌿 Eco Kitchenware" },
  { id: "home-decoration", label: "🕯️ Home & Hygge" },
  { id: "furniture", label: "🪵 Wood & Furniture" },
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

      // თუ "all" არის არჩეული, შეგვიძლია წამოვიღოთ პირველი 24 პროდუქტი ან კონკრეტული კატეგორია
      const data = await getProducts({
        category: selectedCategory === "all" ? undefined : selectedCategory,
        limit: 24,
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
    <div className="container mx-auto px-4 py-8">
      {/* 1. Hero / Header Banner - Nordic Warmth Aesthetic */}
      <div className="mb-8 rounded-3xl border border-stone-200/70 bg-gradient-to-br from-amber-50/70 via-stone-50 to-stone-100/60 p-6 sm:p-10 dark:border-stone-800 dark:from-stone-900/60 dark:via-stone-900 dark:to-stone-950">
        <span className="inline-block rounded-full bg-amber-800/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:bg-amber-500/10 dark:text-amber-400">
          Nordic Warmth & Raw Wood
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-stone-100">
          Sustainable Living & Crafts
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
          Handcrafted wooden essentials, minimalist ceramics, organic kitchenware, and ambient home accents inspired by Scandinavian nature.
        </p>

        {/* 2. Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CURATED_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-amber-800 text-white shadow-sm dark:bg-amber-700"
                    : "border border-stone-300/80 bg-white text-stone-700 hover:border-amber-800/40 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Products Status Area (Loading, Error, Empty, Success) */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-8 text-center dark:border-rose-900/40 dark:bg-rose-950/20">
          <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchProducts}
            className="mt-4 rounded-xl bg-rose-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-800 dark:bg-rose-800 dark:hover:bg-rose-700"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            No products found
          </h3>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Try choosing a different category or clearing your filter.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="mt-4 rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>Showing {products.length} products</span>
          </div>
          <ProductGrid
            products={products}
            onAdd={(p) => {
              console.log("Add to cart clicked for:", p.title);
            }}
          />
        </>
      )}
    </div>
  );
};
