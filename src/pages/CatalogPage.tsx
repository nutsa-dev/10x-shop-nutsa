import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

const sampleProduct: Product = {
  id: 30,
  title: "Key Holder & Plant Pot",
  description: "Attractive wooden key holder with an integrated small plant pot, perfect for minimalist hallway decor.",
  category: "home-decoration",
  price: 24.99,
  discountPercentage: 10.5,
  rating: 4.85,
  stock: 4,
  thumbnail: "https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/thumbnail.png",
  images: [],
  reviews: [],
};

export const CatalogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-500">
          Nordic Warmth & Raw Wood
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Handcrafted Home Collection
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Minimalist ceramics, planters, eco kitchenware, and ambient accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          product={sampleProduct}
          onAdd={(p) => console.log("Added to cart:", p.title)}
        />
      </div>
    </div>
  );
};
