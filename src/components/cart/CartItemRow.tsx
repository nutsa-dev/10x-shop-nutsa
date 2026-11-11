import { Link } from "react-router-dom";
import type { CartItem } from "@/types/cart";
import { formatPrice, getDiscountedPrice } from "@/utils/format";
import { IconClose } from "@/components/ui/Icons";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItemRow = ({ item, onUpdateQuantity, onRemove }: CartItemRowProps) => {
  const hasDiscount = item.discountPercentage > 1;
  const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
  const itemTotal = unitPrice * item.quantity;
  const isMaxStock = item.quantity >= item.stock;

  return (
    <div className="tactile-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-3.5 sm:p-4">
      <div className="flex min-w-0 items-center gap-3 sm:gap-3.5">
        <Link
          to={`/products/${item.productId}`}
          className="atelier-image-stage relative aspect-square h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border border-[#CBB092] p-1.5 flex items-center justify-center dark:border-[#4A301D]"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0]">
            <Link to={`/products/${item.productId}`} className="hover:text-[#8C6D58] line-clamp-1">
              {item.title}
            </Link>
          </h3>

          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-xs font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
              {formatPrice(unitPrice)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-[#736B63] line-through">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {isMaxStock && (
            <p className="text-[10px] text-[#8C6D58]">
              Max available stock ({item.stock})
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t border-[#D8C2A8] pt-2.5 sm:border-t-0 sm:pt-0 dark:border-[#3D2616]">
        <div className="flex h-8 shrink-0 items-center rounded-lg border border-[#CBB092] bg-[#EFE8DC] dark:border-[#4A301D] dark:bg-[#19100A]">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="wood-btn flex h-8 w-8 items-center justify-center rounded-l-lg text-xs disabled:opacity-40"
          >
            −
          </button>
          <span className="w-7 text-center text-xs font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isMaxStock}
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="wood-btn flex h-8 w-8 items-center justify-center rounded-r-lg text-xs disabled:opacity-40"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="min-w-[56px] sm:w-16 text-right">
            <span className="text-xs font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
              {formatPrice(itemTotal)}
            </span>
          </div>

          <button
            type="button"
            aria-label={`Remove ${item.title}`}
            onClick={() => onRemove(item.productId)}
            className="wood-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
          >
            <IconClose className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
