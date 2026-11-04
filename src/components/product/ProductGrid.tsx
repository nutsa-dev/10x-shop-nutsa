import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  /** Offset for the N° catalog index so numbering continues across pages */
  startIndex?: number;
  onAdd?: (product: Product) => void;
}

export const ProductGrid = ({ products, startIndex = 0, onAdd }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          index={startIndex + idx}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
};
