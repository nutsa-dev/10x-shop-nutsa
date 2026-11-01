import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { IconCart, IconArrowRight, IconLeaf } from "@/components/ui/Icons";

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

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-stone-300 bg-white p-10 sm:p-14 text-center shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            <IconCart className="h-10 w-10 stroke-1" />
          </div>
          
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
            Your Cart is Peaceful & Empty
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
            Discover our collection of handcrafted Nordic wooden essentials and bring calm to your space.
          </p>
          
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
            >
              <span>Explore Collection</span>
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Header Toolbar */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200/80 pb-5 dark:border-stone-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
            Shopping Cart
          </h1>
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            Review your {totalItems} {totalItems === 1 ? "item" : "items"} before checkout
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Empty the entire cart?")) {
              clearCart();
            }
          }}
          className="self-start sm:self-auto text-xs font-semibold text-stone-400 hover:text-rose-600 dark:text-stone-500 dark:hover:text-rose-400 transition"
        >
          Clear cart
        </button>
      </div>

      {/* Free Carbon-Neutral Shipping Banner */}
      <div className="mb-8 flex items-center justify-between rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
        <div className="flex items-center gap-2">
          <IconLeaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>You qualify for <strong>Free Carbon-Neutral Shipping</strong> & Plastic-Free Packaging!</span>
        </div>
        <span className="hidden sm:inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
          Applied
        </span>
      </div>

      {/* Main Grid: Items List + Order Summary */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        
        {/* Items column */}
        <div className="space-y-4 lg:col-span-8">
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Summary column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
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
