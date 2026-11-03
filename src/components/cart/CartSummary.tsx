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
    <div className="tactile-card rounded-2xl p-5">
      <h2 className="text-sm font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
        Order Summary
      </h2>

      {/* Promo */}
      <div className="mt-4 border-b border-[#D8C2A8] pb-4 dark:border-[#3D2616]">
        {promoCode ? (
          <div className="flex items-center justify-between rounded-lg bg-[#EFE8DC] px-3 py-2 text-xs font-semibold text-[#26170C] dark:bg-[#19100A] dark:text-[#F5EBE0]">
            <span>Promo {promoCode} (-10%)</span>
            <button
              type="button"
              onClick={onRemovePromo}
              aria-label="Remove promo"
              className="wood-btn flex h-6 w-6 items-center justify-center rounded"
            >
              <IconClose className="h-3 w-3" />
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
                className="w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-2.5 py-2 text-xs uppercase text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
              />
              <button
                type="submit"
                className="wood-btn rounded-lg px-3.5 py-2 text-xs"
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
        <div className="flex justify-between text-[#5C4938] dark:text-[#D8C2A8]">
          <dt>Subtotal</dt>
          <dd className="font-bold text-[#26170C] dark:text-[#F5EBE0]">
            {formatPrice(rawSubtotal)}
          </dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-[#5C4938] dark:text-[#D8C2A8]">
            <dt>Discounts</dt>
            <dd className="font-bold text-[#8C6D58]">
              -{formatPrice(rawSubtotal - subtotal)}
            </dd>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-[#5C4938] dark:text-[#D8C2A8]">
            <dt>Promo Voucher</dt>
            <dd className="font-bold text-[#8C6D58]">
              -{formatPrice(promoDiscount)}
            </dd>
          </div>
        )}

        <div className="flex justify-between text-[#5C4938] dark:text-[#D8C2A8]">
          <dt>Shipping</dt>
          <dd className="font-bold text-[#26170C] dark:text-[#F5EBE0]">Complimentary</dd>
        </div>

        <div className="border-t border-[#D8C2A8] pt-3 flex justify-between text-sm font-extrabold text-[#26170C] dark:border-[#3D2616] dark:text-[#F5EBE0]">
          <dt>Total</dt>
          <dd>{formatPrice(totalPrice)}</dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2.5">
        <Link
          to="/checkout"
          className="wood-btn flex w-full items-center justify-center rounded-lg py-2.5 px-4 text-xs"
        >
          Proceed to Checkout
        </Link>
        <Link
          to="/"
          className="wood-btn-walnut flex w-full items-center justify-center rounded-lg py-2 px-4 text-xs"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
};
