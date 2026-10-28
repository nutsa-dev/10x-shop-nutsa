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

  // ცარიელი კალათის მდგომარეობა (Empty State)
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-3xl dark:bg-stone-800">
            🛒
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Your Cart is Empty
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Looks like you haven't added any handcrafted Nordic items to your cart yet.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              <span>Explore Products</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Toolbar */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
            Shopping Cart
          </h1>
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            You have {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="self-start sm:self-auto text-xs font-semibold text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 transition"
        >
          Clear all items
        </button>
      </div>

      {/* Main Grid: Items List + Summary */}
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
