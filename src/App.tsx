import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

// სატესტო პროდუქტი DummyJSON-ის home-decoration კატეგორიიდან
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

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <Navbar />

      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
            Cozy Home Essentials
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Handcrafted Decor</h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Minimalist ceramics, planters, and ambient home accessories.
          </p>
        </div>

        {/* პროდუქტის ბარათის ვიტრინა */}
        <div className="max-w-xs">
          <ProductCard
            product={sampleProduct}
            onAdd={(p) => console.log("Added to cart:", p.title)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}