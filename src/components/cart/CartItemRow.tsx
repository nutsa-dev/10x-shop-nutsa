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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#EADBCC] bg-white p-4 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
      <div className="flex items-center gap-3.5">
        <Link
          to={`/products/${item.productId}`}
          className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#EADBCC] bg-[#F2EFE9] p-1.5 flex items-center justify-center dark:border-[#332C27] dark:bg-[#191614]"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </Link>

        <div>
          <h3 className="text-xs font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
            <Link to={`/products/${item.productId}`} className="hover:text-[#8C6D58] line-clamp-1">
              {item.title}
            </Link>
          </h3>

          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-[#2C2724] dark:text-[#F7F5F0]">
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

      <div className="flex items-center justify-between sm:justify-end gap-5 border-t border-[#EADBCC]/60 pt-2.5 sm:border-t-0 sm:pt-0 dark:border-[#332C27]">
        <div className="flex h-8 items-center rounded-lg border border-[#EADBCC] bg-white dark:border-[#332C27] dark:bg-[#191614]">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="flex h-8 w-8 items-center justify-center text-[#736B63] hover:text-[#2C2724]"
          >
            −
          </button>
          <span className="w-6 text-center text-xs font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isMaxStock}
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="flex h-8 w-8 items-center justify-center text-[#736B63] hover:text-[#2C2724] disabled:opacity-40"
          >
            +
          </button>
        </div>

        <div className="w-16 text-right">
          <span className="text-xs font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            {formatPrice(itemTotal)}
          </span>
        </div>

        <button
          type="button"
          aria-label={`Remove ${item.title}`}
          onClick={() => onRemove(item.productId)}
          className="text-[#736B63] hover:text-[#2C2724] dark:hover:text-white"
        >
          <IconClose className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
