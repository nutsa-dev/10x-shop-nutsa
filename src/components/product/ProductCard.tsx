import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { IconCheck, IconStar } from "@/components/ui/Icons";
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
    setTimeout(() => setIsAdded(false), 1200);
  };

  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const isOutOfStock = product.stock === 0;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-3 shadow-2xs hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 transition">
      <div>
        {/* Product Image Area */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center p-2">
          {hasDiscount && (
            <span className="absolute left-2 top-2 z-10 rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-neutral-950">
              SALE -{Math.round(product.discountPercentage)}%
            </span>
          )}

          <Link
            to={`/products/${product.id}`}
            className="flex h-full w-full items-center justify-center"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              width={240}
              height={240}
              loading="lazy"
              className="h-full w-full object-cover rounded-md transition duration-300 group-hover:scale-104"
            />
          </Link>
        </div>

        {/* Brand & Rating (Evo / Backcountry style) */}
        <div className="mt-2.5 flex items-center justify-between text-[11px]">
          <span className="font-extrabold tracking-wider text-neutral-900 uppercase dark:text-neutral-200">
            {product.brand || product.category}
          </span>
          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
            <IconStar className="h-3 w-3 fill-current text-neutral-400" />
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="mt-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 line-clamp-1">
          <Link to={`/products/${product.id}`} className="hover:text-neutral-950 dark:hover:text-white">
            {product.title}
          </Link>
        </h3>
      </div>

      {/* Price & Add to Cart button */}
      <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5 dark:border-neutral-800">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-neutral-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`h-7 rounded-lg px-2.5 text-[11px] font-semibold transition ${
            isAdded
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
              : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100 disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          }`}
        >
          {isAdded ? (
            <span className="flex items-center gap-1">
              <IconCheck className="h-3 w-3" />
              <span>Added</span>
            </span>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </article>
  );
};
