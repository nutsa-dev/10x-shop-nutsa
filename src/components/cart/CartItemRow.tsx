import { Link } from "react-router-dom";
import type { CartItem } from "@/types/cart";
import { formatPrice, getDiscountedPrice } from "@/utils/format";

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs transition hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900">
      {/* Product Image & Title */}
      <div className="flex items-center gap-4">
        <Link
          to={`/products/${item.productId}`}
          className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-100 bg-stone-50 p-2 dark:border-stone-800 dark:bg-stone-800"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </Link>

        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            <Link
              to={`/products/${item.productId}`}
              className="hover:underline line-clamp-1"
            >
              {item.title}
            </Link>
          </h3>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {formatPrice(unitPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-stone-400 line-through dark:text-stone-500">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {isMaxStock && (
            <p className="mt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
              Max stock reached ({item.stock} available)
            </p>
          )}
        </div>
      </div>

      {/* Quantity Stepper & Subtotal & Remove */}
      <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-stone-100 pt-3 sm:border-t-0 sm:pt-0 dark:border-stone-800">
        {/* Stepper */}
        <div className="flex items-center rounded-xl border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-l-xl text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition"
          >
            −
          </button>
          <span className="w-8 text-center text-xs font-semibold text-stone-900 dark:text-stone-100">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isMaxStock}
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-r-xl text-stone-600 hover:bg-stone-100 disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800 transition"
          >
            +
          </button>
        </div>

        {/* Total Price for this item */}
        <div className="w-20 text-right">
          <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
            {formatPrice(itemTotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          aria-label={`Remove ${item.title} from cart`}
          onClick={() => onRemove(item.productId)}
          className="rounded-lg p-1.5 text-stone-400 hover:bg-rose-50 hover:text-rose-600 dark:text-stone-500 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition"
          title="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
