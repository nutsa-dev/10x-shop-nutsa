import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/format";
import { IconClose } from "@/components/ui/Icons";

interface CartSummaryProps {
  subtotal: number;
  rawSubtotal: number;
  savings: number;
  promoCode: string | null;
  promoDiscount: number;
  totalPrice: number;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export const CartSummary = ({
  subtotal,
  rawSubtotal,
  savings,
  promoCode,
  promoDiscount,
  totalPrice,
  onApplyPromo,
  onRemovePromo,
}: CartSummaryProps) => {
  const [inputCode, setInputCode] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const success = onApplyPromo(inputCode);
    if (success) {
      setInputCode("");
      setPromoError(null);
    } else {
      setPromoError("Invalid promo code. Try '10X10'");
    }
  };

  return (
    <div className="rounded-xl border border-neutral-200/90 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Order Summary
      </h2>

      {/* Promo */}
      <div className="mt-4 border-b border-neutral-100 pb-4 dark:border-neutral-800">
        {promoCode ? (
          <div className="flex items-center justify-between rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <span>Promo {promoCode} (-10%)</span>
            <button
              type="button"
              onClick={onRemovePromo}
              aria-label="Remove promo"
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              <IconClose className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-1.5">
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="Promo code (e.g. 10X10)"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  if (promoError) setPromoError(null);
                }}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs uppercase text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
              <button
                type="submit"
                className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400">
                {promoError}
              </p>
            )}
          </form>
        )}
      </div>

      {/* Breakdown */}
      <dl className="mt-4 space-y-2 text-xs">
        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-neutral-900 dark:text-neutral-100">
            {formatPrice(rawSubtotal)}
          </dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <dt>Discounts</dt>
            <dd className="font-semibold">
              -{formatPrice(rawSubtotal - subtotal)}
            </dd>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <dt>Promo Voucher</dt>
            <dd className="font-semibold">
              -{formatPrice(promoDiscount)}
            </dd>
          </div>
        )}

        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <dt>Shipping</dt>
          <dd className="font-semibold">Free</dd>
        </div>

        <div className="border-t border-neutral-100 pt-3 flex justify-between text-sm font-bold text-neutral-900 dark:border-neutral-800 dark:text-neutral-100">
          <dt>Total</dt>
          <dd>{formatPrice(totalPrice)}</dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2">
        <Link
          to="/checkout"
          className="flex w-full items-center justify-center rounded-lg bg-neutral-900 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 transition"
        >
          Checkout
        </Link>
        <Link
          to="/"
          className="block text-center text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
