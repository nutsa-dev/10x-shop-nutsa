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
    <div className="rounded-2xl border border-[#EADBCC] bg-white p-5 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
      <h2 className="text-sm font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
        Order Summary
      </h2>

      {/* Promo */}
      <div className="mt-4 border-b border-[#EADBCC] pb-4 dark:border-[#332C27]">
        {promoCode ? (
          <div className="flex items-center justify-between rounded-lg bg-[#F2EFE9] px-3 py-2 text-xs font-semibold text-[#2C2724] dark:bg-[#191614] dark:text-[#F7F5F0]">
            <span>Promo {promoCode} (-10%)</span>
            <button
              type="button"
              onClick={onRemovePromo}
              aria-label="Remove promo"
              className="text-[#736B63] hover:text-[#2C2724] dark:hover:text-white"
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
                className="w-full rounded-lg border border-[#EADBCC] bg-[#F7F5F0] px-2.5 py-2 text-xs uppercase text-[#2C2724] outline-none focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#F7F5F0]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-3.5 py-2 text-xs font-medium text-white transition-colors"
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
        <div className="flex justify-between text-[#736B63]">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
            {formatPrice(rawSubtotal)}
          </dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-[#736B63]">
            <dt>Discounts</dt>
            <dd className="font-semibold text-[#8C6D58]">
              -{formatPrice(rawSubtotal - subtotal)}
            </dd>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-[#736B63]">
            <dt>Promo Voucher</dt>
            <dd className="font-semibold text-[#8C6D58]">
              -{formatPrice(promoDiscount)}
            </dd>
          </div>
        )}

        <div className="flex justify-between text-[#736B63]">
          <dt>Shipping</dt>
          <dd className="font-semibold text-[#2C2724] dark:text-[#F7F5F0]">Complimentary</dd>
        </div>

        <div className="border-t border-[#EADBCC] pt-3 flex justify-between text-sm font-bold text-[#2C2724] dark:border-[#332C27] dark:text-[#F7F5F0]">
          <dt>Total</dt>
          <dd>{formatPrice(totalPrice)}</dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2.5">
        <Link
          to="/checkout"
          className="flex w-full items-center justify-center rounded-lg bg-[#8C6D58] hover:bg-[#735744] py-2.5 px-4 text-xs font-medium text-white transition-colors"
        >
          Proceed to Checkout
        </Link>
        <Link
          to="/"
          className="block text-center text-xs text-[#736B63] hover:text-[#2C2724] dark:hover:text-white"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
};
