import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { IconCart, IconCheck, IconStar } from "@/components/ui/Icons";
import { formatPrice } from "@/utils/format";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAdd) {
      onAdd(product);
    } else {
      addItem(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-3.5 sm:p-4 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md dark:border-stone-800 dark:bg-[#181816] dark:hover:border-stone-700">
      <div>
        {/* Product Image Area */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-100/70 p-3 dark:bg-stone-800/60">
          
          {/* Top badges: Discount & Eco */}
          <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1 items-start">
            {hasDiscount && (
              <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-xs dark:bg-emerald-600">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <Link
            to={`/products/${product.id}`}
            className="flex h-full w-full items-center justify-center focus:outline-none"
            aria-label={`View details for ${product.title}`}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              width={240}
              height={240}
              loading="lazy"
              className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-108"
            />
          </Link>
        </div>

        {/* Category & Rating */}
        <div className="mt-3.5 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-stone-400 dark:text-stone-500 truncate max-w-[140px]">
            {product.category.replace("-", " ")}
            {product.brand ? ` · ${product.brand}` : ""}
          </span>
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <IconStar className="h-3 w-3" />
            <span className="text-stone-700 dark:text-stone-300 text-[11px]">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="mt-1.5 text-sm font-semibold tracking-tight text-stone-900 line-clamp-1 dark:text-stone-100" title={product.title}>
          <Link
            to={`/products/${product.id}`}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            {product.title}
          </Link>
        </h3>

        {/* Stock Badge with micro dot */}
        <div className="mt-2 flex items-center">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Out of stock
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Only {product.stock} left
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In stock
            </span>
          )}
        </div>
      </div>

      {/* Price & Add to Cart button */}
      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800/80">
        <div className="flex flex-col">
          <span className="text-base font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
            {formatPrice(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-stone-400 line-through dark:text-stone-500 -mt-0.5">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold shadow-2xs transition-all duration-200 active:scale-95 ${
            isAdded
              ? "bg-emerald-700 text-white dark:bg-emerald-600"
              : "bg-stone-900 text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
          }`}
          title={isOutOfStock ? "Out of stock" : "Add to shopping cart"}
        >
          {isAdded ? (
            <>
              <IconCheck className="h-3.5 w-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <IconCart className="h-3.5 w-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
