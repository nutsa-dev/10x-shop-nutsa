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
    <article className="group flex flex-col justify-between bg-white rounded-2xl border border-[#EADBCC] p-4 shadow-[0_4px_20px_rgba(44,39,36,0.04)] hover:shadow-[0_8px_30px_rgba(44,39,36,0.08)] transition-all duration-300 dark:bg-[#24201D] dark:border-[#332C27]">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-square w-full bg-[#F2EFE9] rounded-xl overflow-hidden flex items-center justify-center p-4 dark:bg-[#191614]">
          {hasDiscount && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#2C2724] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              -{Math.round(product.discountPercentage)}%
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
              className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Category & Rating */}
        <div className="mt-3.5 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6D58] font-medium">
            {product.category.replace("-", " ")}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#736B63]">
            <IconStar className="h-3 w-3 fill-current text-[#8C6D58]" />
            <span className="font-medium text-[#2C2724] dark:text-[#D6CEC5]">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="mt-1.5 text-sm font-semibold text-[#2C2724] line-clamp-1 leading-snug dark:text-[#F7F5F0]">
          <Link to={`/products/${product.id}`} className="hover:text-[#8C6D58] transition-colors">
            {product.title}
          </Link>
        </h3>
      </div>

      {/* Price Block & CTA Button */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#EADBCC]/70 pt-3.5 dark:border-[#332C27]">
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            {formatPrice(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#736B63] line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="rounded-lg py-2.5 px-4 bg-[#8C6D58] hover:bg-[#735744] text-white text-xs font-medium transition-colors disabled:opacity-40 shrink-0"
        >
          {isAdded ? (
            <span className="flex items-center gap-1">
              <IconCheck className="h-3.5 w-3.5" />
              <span>Added</span>
            </span>
          ) : isOutOfStock ? (
            "Out of stock"
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </article>
  );
};
