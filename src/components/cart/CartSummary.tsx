import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/format";

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
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
      <h2 className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Order Summary
      </h2>

      {/* Promo Code Form */}
      <div className="mt-4 border-b border-stone-100 pb-4 dark:border-stone-800">
        {promoCode ? (
          <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span className="flex items-center gap-1.5 font-bold">
              🏷️ Promo: {promoCode} (-10%)
            </span>
            <button
              type="button"
              onClick={onRemovePromo}
              aria-label="Remove promo code"
              className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              ✕
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (e.g. 10X10)"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  if (promoError) setPromoError(null);
                }}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-xs uppercase text-stone-900 outline-none transition focus:border-stone-500 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {promoError}
              </p>
            )}
            <p className="text-[10px] text-stone-400 dark:text-stone-500">
              💡 Tip: Use <strong className="text-stone-700 dark:text-stone-300">10X10</strong> for 10% off your order
            </p>
          </form>
        )}
      </div>

      {/* Calculations */}
      <dl className="mt-4 space-y-2.5 text-xs">
        <div className="flex justify-between text-stone-600 dark:text-stone-400">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-stone-900 dark:text-stone-100">
            {formatPrice(rawSubtotal)}
          </dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <dt>Product Savings</dt>
            <dd className="font-semibold">
              -{formatPrice(rawSubtotal - subtotal)}
            </dd>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <dt>Promo Discount (10%)</dt>
            <dd className="font-semibold">
              -{formatPrice(promoDiscount)}
            </dd>
          </div>
        )}

        <div className="flex justify-between text-stone-600 dark:text-stone-400">
          <dt>Shipping</dt>
          <dd className="font-semibold text-emerald-600 dark:text-emerald-400">
            Free
          </dd>
        </div>

        <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-extrabold text-stone-900 dark:border-stone-800 dark:text-stone-100">
          <dt>Total</dt>
          <dd>{formatPrice(totalPrice)}</dd>
        </div>
      </dl>

      {/* Checkout CTA */}
      <div className="mt-6 space-y-3">
        <Link
          to="/checkout"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          <span>Proceed to Checkout</span>
          <span>→</span>
        </Link>

        <Link
          to="/"
          className="block text-center text-xs font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition"
        >
          ← Continue Shopping
        </Link>
      </div>

      {/* Security assurances */}
      <div className="mt-6 border-t border-stone-100 pt-4 text-center text-[11px] text-stone-400 dark:border-stone-800 dark:text-stone-500">
        🔒 Encrypted Checkout & 100% Eco-Guaranteed
      </div>
    </div>
  );
};
