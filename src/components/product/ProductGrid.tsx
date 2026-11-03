import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  onAdd?: (product: Product) => void;
}

export const ProductGrid = ({ products, onAdd }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          index={idx}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
};
