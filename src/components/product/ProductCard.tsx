import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (onAdd) {
      onAdd(product);
    } else {
      addItem(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-stone-200 bg-white p-3.5 shadow-xs transition hover:border-stone-300 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div>
        {/* სურათი (loading="lazy", width/height CLS-ის წინააღმდეგ) */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-stone-100 p-2 dark:bg-stone-800">
          {hasDiscount && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded bg-emerald-600 px-1.5 py-0.5 text-[11px] font-semibold text-white">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}

          <Link to={`/products/${product.id}`} className="flex h-full w-full items-center justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              loading="lazy"
              className="h-full w-full object-contain object-center transition duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* კატეგორია · ბრენდი & რეიტინგი */}
        <div className="mt-3 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span className="truncate uppercase text-[10px] font-medium tracking-wider">
            {product.category.replace("-", " ")}
            {product.brand ? ` · ${product.brand}` : ""}
          </span>
          <span className="font-semibold text-stone-700 dark:text-stone-300">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        {/* სათაური */}
        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-stone-900 dark:text-stone-100" title={product.title}>
          <Link to={`/products/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>

        {/* მარაგის ბეჯი */}
        <div className="mt-1.5 text-xs">
          {isOutOfStock ? (
            <span className="font-medium text-rose-600 dark:text-rose-400">Out of stock</span>
          ) : isLowStock ? (
            <span className="font-medium text-amber-600 dark:text-amber-400">Only {product.stock} left!</span>
          ) : (
            <span className="font-medium text-emerald-600 dark:text-emerald-400">In stock</span>
          )}
        </div>
      </div>

      {/* ფასი და Add to cart ღილაკი */}
      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 dark:border-stone-800">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-stone-900 dark:text-stone-100">
            ${discountedPrice}
          </span>
          {hasDiscount && (
            <span className="text-xs text-stone-400 line-through dark:text-stone-500">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            isAdded
              ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-stone-900"
              : "bg-stone-900 text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
          }`}
        >
          {isAdded ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </article>
  );
};