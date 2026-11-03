import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { IconCheck, IconStar } from "@/components/ui/Icons";
import { formatPrice } from "@/utils/format";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
  onAdd?: (product: Product) => void;
}

export const ProductCard = ({ product, index, onAdd }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Build unique gallery images (up to 4 photos) from product.images + thumbnail
  const galleryImages = Array.from(
    new Set([product.thumbnail, ...(product.images || [])].filter(Boolean))
  ).slice(0, 4);

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

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
  const currentImage = galleryImages[selectedIdx] || product.thumbnail;
  const catalogIndex =
    typeof index === "number" ? `N° ${String(index + 1).padStart(2, "0")}` : `N° ${String(product.id).slice(-2)}`;

  return (
    <article className="tactile-card group flex flex-col justify-between rounded-2xl p-4 transition-all duration-300">
      <div>
        {/* Product Image Stage */}
        <div
          className="atelier-image-stage relative aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center p-4"
          onMouseEnter={() => {
            if (galleryImages.length > 1 && selectedIdx === 0) {
              setSelectedIdx(1);
            }
          }}
          onMouseLeave={() => {
            if (galleryImages.length > 1 && selectedIdx === 1) {
              setSelectedIdx(0);
            }
          }}
        >
          {/* Minimalist Nordic Spruce Craft Tag for Discount */}
          {hasDiscount && (
            <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-md bg-[#2C4032] px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-[#F5EBE0] shadow-xs">
              <span className="h-1 w-1 rounded-full bg-[#D49B4B]" />
              -{Math.round(product.discountPercentage)}%
            </span>
          )}

          {/* Minimal Angle Dots */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/80 px-2 py-1 backdrop-blur-xs dark:bg-[#19100A]/80">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`View photo ${idx + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    selectedIdx === idx
                      ? "w-3.5 bg-[#8C6D58]"
                      : "w-1.5 bg-[#C8AB89] hover:bg-[#8C6D58]/70 dark:bg-[#5E3D24]"
                  }`}
                />
              ))}
            </div>
          )}

          <Link
            to={`/products/${product.id}`}
            className="flex h-full w-full items-center justify-center"
          >
            <img
              src={currentImage}
              alt={product.title}
              width={240}
              height={240}
              loading="lazy"
              className="object-contain max-h-full rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Workshop Index, Category & Rating */}
        <div className="mt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#736B63] dark:text-[#A8927B]">
              {catalogIndex}
            </span>
            <span className="text-[#C8AB89] dark:text-[#5E3D24]">·</span>
            <span className="text-[10px] uppercase tracking-widest text-[#8C6D58] font-semibold">
              {product.category.replace("-", " ")}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            <IconStar className="h-3 w-3 fill-current text-[#D49B4B]" />
            <span className="font-mono text-[11px] font-medium text-[#26170C] dark:text-[#F5EBE0]">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Title (Editorial Serif) */}
        <h3 className="font-editorial mt-1 text-lg font-bold tracking-tight text-[#26170C] line-clamp-1 leading-snug dark:text-[#F5EBE0]">
          <Link to={`/products/${product.id}`} className="hover:text-[#8C6D58] transition-colors">
            {product.title}
          </Link>
        </h3>
      </div>

      {/* Price Block & Engraved Wooden CTA Button */}
      <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-[#E5D5C3] pt-3 dark:border-[#3D2616]">
        <div className="flex flex-wrap items-baseline gap-1.5 font-mono">
          <span className="text-sm font-semibold text-[#26170C] dark:text-[#F5EBE0]">
            {formatPrice(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-[#736B63] line-through">
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
