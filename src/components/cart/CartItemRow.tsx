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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs transition-all hover:border-stone-300 dark:border-stone-800 dark:bg-[#181816] dark:hover:border-stone-700">
      
      {/* Product Image & Details */}
      <div className="flex items-center gap-4">
        <Link
          to={`/products/${item.productId}`}
          className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-stone-100 bg-stone-100/70 p-2 dark:border-stone-800 dark:bg-stone-800/60"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </Link>

        <div>
          <h3 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            <Link
              to={`/products/${item.productId}`}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors line-clamp-1"
            >
              {item.title}
            </Link>
          </h3>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
              {formatPrice(unitPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-stone-400 line-through dark:text-stone-500">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {isMaxStock && (
            <p className="mt-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
              Max available stock reached ({item.stock})
            </p>
          )}
        </div>
      </div>

      {/* Stepper, Subtotal & Remove Action */}
      <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-stone-100 pt-3 sm:border-t-0 sm:pt-0 dark:border-stone-800/80">
        
        {/* Quantity Stepper */}
        <div className="flex h-9 items-center rounded-xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900 shadow-2xs">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="flex h-9 w-8 items-center justify-center rounded-l-xl text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition"
          >
            −
          </button>
          <span className="w-8 text-center text-xs font-bold text-stone-900 dark:text-stone-100">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isMaxStock}
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="flex h-9 w-8 items-center justify-center rounded-r-xl text-stone-600 hover:bg-stone-100 disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800 transition"
          >
            +
          </button>
        </div>

        {/* Item Total */}
        <div className="w-24 text-right">
          <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
            {formatPrice(itemTotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          aria-label={`Remove ${item.title} from cart`}
          onClick={() => onRemove(item.productId)}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-stone-400 hover:bg-rose-50 hover:text-rose-600 dark:text-stone-500 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition"
          title="Remove item"
        >
          <IconClose className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
};
