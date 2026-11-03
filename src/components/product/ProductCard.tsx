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

  return (
    <article className="tactile-card group flex flex-col justify-between rounded-2xl p-4 transition-all duration-300">
      <div>
        {/* Product Image Container */}
        <div
          className="relative aspect-square w-full bg-[#EFE8DC] rounded-xl overflow-hidden flex items-center justify-center p-4 shadow-inner dark:bg-[#19100A]"
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
          {hasDiscount && (
            <span className="wood-btn-walnut absolute left-2.5 top-2.5 z-10 rounded-md px-2 py-0.5 text-[10px] uppercase">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}

          {galleryImages.length > 1 && (
            <span className="absolute right-2.5 top-2.5 z-10 rounded-md bg-white/85 backdrop-blur-xs px-1.5 py-0.5 text-[10px] font-semibold text-[#5C4938] border border-[#CBB092] dark:bg-[#23160D]/85 dark:border-[#4A301D] dark:text-[#D8C2A8]">
              {selectedIdx + 1}/{galleryImages.length}
            </span>
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
              className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* 3-4 Photo Mini Gallery Thumbnails */}
        {galleryImages.length > 1 && (
          <div className="mt-2.5 flex items-center gap-1.5">
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View angle ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedIdx(idx);
                }}
                className={`h-9 w-9 overflow-hidden rounded-lg border p-0.5 bg-[#EFE8DC] transition-all dark:bg-[#19100A] ${
                  selectedIdx === idx
                    ? "border-[#8C6D58] ring-2 ring-[#8C6D58]/40"
                    : "border-[#CBB092] opacity-65 hover:opacity-100 dark:border-[#4A301D]"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.title} view ${idx + 1}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        )}

        {/* Category & Rating */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6D58] font-semibold">
            {product.category.replace("-", " ")}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            <IconStar className="h-3 w-3 fill-current text-[#8C6D58]" />
            <span className="font-semibold text-[#26170C] dark:text-[#F5EBE0]">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="mt-1.5 text-sm font-bold text-[#26170C] line-clamp-1 leading-snug dark:text-[#F5EBE0]">
          <Link to={`/products/${product.id}`} className="hover:text-[#8C6D58] transition-colors">
            {product.title}
          </Link>
        </h3>
      </div>

      {/* Price Block & Engraved Wooden CTA Button */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#D8C2A8] pt-3.5 dark:border-[#3D2616]">
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
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
