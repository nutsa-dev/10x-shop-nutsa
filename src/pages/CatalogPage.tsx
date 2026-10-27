import { useEffect, useState, useCallback } from "react";
import { getProducts } from "@/api/products.api";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import type { Product } from "@/types/product";

const CURATED_CATEGORIES = [
  { id: "all", label: "All Collection", count: "40+ items" },
  { id: "kitchen-accessories", label: "🌿 Eco Kitchenware & Bamboo", count: "30 items" },
  { id: "home-decoration", label: "🕯️ Hygge & Home Decor", count: "5 items" },
  { id: "furniture", label: "🪵 Raw Wood & Furniture", count: "5 items" },
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
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* 1. Nordic Editorial Hero Banner */}
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-[#E8E1D5] bg-gradient-to-br from-[#F5EFE6] via-[#F8F5EE] to-[#EFE8DD] p-8 sm:p-12 dark:border-stone-800 dark:from-[#231F1B] dark:via-[#1D1A17] dark:to-[#171412]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CABE] bg-white/70 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#7A533E] uppercase backdrop-blur-xs dark:border-stone-700 dark:bg-stone-900/60 dark:text-[#D4A373]">
            <span>🌿</span>
            <span>Sustainable Crafts & Wood</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#2C241E] sm:text-5xl lg:text-6xl dark:text-[#FAF7F2]">
            Nordic Living & Raw Wood
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#6E6258] sm:text-lg dark:text-stone-300">
            Thoughtfully curated handcrafted pieces — from eco-friendly bamboo utensils and solid wood furnishings to ceramic planters and ambient lighting.
          </p>
        </div>

        {/* 2. Curated Category Navigation Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5 pt-6 border-t border-[#E5DCcf] dark:border-stone-800">
          {CURATED_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#3B2C24] text-[#FAF7F2] shadow-sm dark:bg-[#FAF7F2] dark:text-[#2C241E]"
                    : "border border-[#DFD5C7] bg-white/80 text-[#5C4D42] hover:border-[#7A533E]/50 hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-300 dark:hover:bg-stone-800"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Products Grid Area */}
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
            className="mt-4 rounded-xl bg-rose-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-800"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#DFD5C7] p-12 text-center dark:border-stone-800">
          <h3 className="font-serif text-xl font-bold text-[#2C241E] dark:text-stone-100">
            No products found
          </h3>
          <p className="mt-1 text-sm text-[#6E6258] dark:text-stone-400">
            Try choosing another category to explore our wood and home crafts.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="mt-4 rounded-xl bg-[#3B2C24] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#251B15]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between text-xs text-[#7A6D63] dark:text-stone-400">
            <span className="font-medium">
              Showing {products.length} sustainable pieces
            </span>
          </div>

          <ProductGrid
            products={products}
            onAdd={(p) => {
              console.log("Add to cart:", p.title);
            }}
          />
        </>
      )}
    </div>
  );
};
