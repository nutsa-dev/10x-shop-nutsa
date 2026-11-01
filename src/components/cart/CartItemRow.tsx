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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-neutral-200/90 bg-white p-3.5 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-3">
        <Link
          to={`/products/${item.productId}`}
          className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-md border border-neutral-100 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-800"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </Link>

        <div>
          <h3 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            <Link to={`/products/${item.productId}`} className="hover:underline line-clamp-1">
              {item.title}
            </Link>
          </h3>

          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              {formatPrice(unitPrice)}
            </span>
            {hasDiscount && (
              <span className="text-[10px] text-neutral-400 line-through">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {isMaxStock && (
            <p className="text-[10px] text-neutral-500">
              Max available stock ({item.stock})
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-5 border-t border-neutral-100 pt-2 sm:border-t-0 sm:pt-0 dark:border-neutral-800">
        <div className="flex h-7 items-center rounded-md border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="flex h-7 w-7 items-center justify-center text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            −
          </button>
          <span className="w-6 text-center text-xs font-bold text-neutral-900 dark:text-neutral-100">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isMaxStock}
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="flex h-7 w-7 items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            +
          </button>
        </div>

        <div className="w-16 text-right">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(itemTotal)}
          </span>
        </div>

        <button
          type="button"
          aria-label={`Remove ${item.title}`}
          onClick={() => onRemove(item.productId)}
          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          <IconClose className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
