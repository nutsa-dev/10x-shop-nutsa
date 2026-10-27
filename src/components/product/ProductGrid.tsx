import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  onAdd?: (product: Product) => void;
}

/**
 * ProductGrid - პროდუქტების რესპონსიული ბადე:
 * mobile (1 სვეტი), tablet (2-3 სვეტი), desktop (4 სვეტი).
 * map() ფუნქცია იყენებს სტაბილურ key-ს (product.id).
 */
export const ProductGrid = ({ products, onAdd }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
};
