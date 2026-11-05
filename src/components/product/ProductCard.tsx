import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { IconCheck, IconStar } from "@/components/ui/Icons";
import { formatPrice, getDiscountedPrice } from "@/utils/format";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
  onAdd?: (product: Product) => void;
}

export const ProductCard = ({ product, index, onAdd }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Build unique gallery images (up to 4 photos) from product.images + thumbnail
  const galleryImages = Array.from(
    new Set([product.thumbnail, ...(product.images || [])].filter(Boolean))
  ).slice(0, 4);

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAdd) {
      onAdd(product);
    } else {
      addItem(product);
    }
    setIsAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsAdded(false), 1200);
  };

  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const isOutOfStock = product.stock <= 0;
  const currentImage = galleryImages[selectedIdx] || product.thumbnail;
  const catalogIndex =
    typeof index === "number" ? `N° ${String(index + 1).padStart(2, "0")}` : `N° ${String(product.id).slice(-2)}`;

  return (
    <article className="tactile-card group flex flex-col justify-between rounded-2xl p-4 transition-all duration-300">
      <div>
        {/* Product Image Stage (No inner border, full edge-to-edge display) */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center">
          {/* Minimalist Nordic Spruce Craft Tag for Discount */}
          {hasDiscount && (
            <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-md bg-[#2C4032] px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-[#F5EBE0] shadow-xs">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}

          {/* Left & Right Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#F5EBE0]/90 text-[#26170C] shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-105 hover:bg-[#F5EBE0] active:scale-95 md:opacity-0 md:group-hover:opacity-100 dark:bg-[#19100A]/85 dark:text-[#F5EBE0] dark:hover:bg-[#19100A]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 -ml-0.5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#F5EBE0]/90 text-[#26170C] shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-105 hover:bg-[#F5EBE0] active:scale-95 md:opacity-0 md:group-hover:opacity-100 dark:bg-[#19100A]/85 dark:text-[#F5EBE0] dark:hover:bg-[#19100A]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 -mr-0.5"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <Link
            to={`/products/${product.id}`}
            className="flex h-full w-full items-center justify-center"
          >
            <img
              src={currentImage}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Workshop Index, Category & Rating */}
        <div className="mt-3.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#593E28] dark:text-[#A8927B]">
              {catalogIndex}
            </span>
            <span className="text-[#8A6542] dark:text-[#5E3D24]">·</span>
            <span className="truncate text-[10px] uppercase tracking-widest text-[#593E28] font-bold dark:text-[#C8B29B]">
              {product.category.replace("-", " ")}{product.brand ? ` · ${product.brand}` : ""}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-xs text-[#4A321F] dark:text-[#D8C2A8]">
            <IconStar className="h-3 w-3 fill-current text-[#B45309] dark:text-[#D49B4B]" />
            <span className="font-mono text-[11px] font-semibold text-[#26170C] dark:text-[#F5EBE0]">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Title (Editorial Font) */}
        <h3 className="font-editorial mt-1.5 text-[15px] font-semibold tracking-tight text-[#26170C] line-clamp-1 leading-snug dark:text-[#F5EBE0]">
          <Link to={`/products/${product.id}`} className="hover:text-[#593E28] dark:hover:text-[#D49B4B] transition-colors">
            {product.title}
          </Link>
        </h3>

        {/* Stock Badge */}
        <div className="mt-1">
          {product.stock <= 0 ? (
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Out of stock
            </span>
          ) : product.stock <= 5 ? (
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Only {product.stock} left!
            </span>
          ) : (
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              In stock
            </span>
          )}
        </div>
      </div>

      {/* Price Block & Engraved Wooden CTA Button */}
      <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-[#B89670]/55 pt-3 dark:border-[#3D2616]">
        <div className="flex flex-wrap items-baseline gap-1.5 font-mono">
          <span className="text-sm font-semibold text-[#26170C] dark:text-[#F5EBE0]">
            {formatPrice(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-[#5E432C] line-through dark:text-[#9A826B]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`rounded-lg py-2 px-3.5 text-xs disabled:opacity-40 shrink-0 ${
            isAdded ? "wood-btn-walnut" : "wood-btn"
          }`}
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
