import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";

export const CartPage = () => {
  const {
    items,
    totalItems,
    rawSubtotal,
    subtotal,
    savings,
    promoCode,
    promoDiscount,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-sm rounded-xl border border-neutral-200 bg-white p-10 dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Your Cart is Empty
          </h1>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Explore our collection of alpine skis, snowboards, and winter gear.
          </p>
          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950 transition hover:bg-neutral-800"
            >
              Browse Equipment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Shopping Cart
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Empty the cart?")) {
              clearCart();
            }
          }}
          className="text-xs text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
        >
          Clear cart
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Items */}
        <div className="space-y-3 lg:col-span-8">
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <CartSummary
            subtotal={subtotal}
            rawSubtotal={rawSubtotal}
            savings={savings}
            promoCode={promoCode}
            promoDiscount={promoDiscount}
            totalPrice={totalPrice}
            onApplyPromo={applyPromoCode}
            onRemovePromo={removePromoCode}
          />
        </div>
      </div>
    </div>
  );
};
