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
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10 py-20 text-center">
        <div className="tactile-card mx-auto max-w-sm rounded-2xl p-10">
          <h1 className="text-base font-bold text-[#26170C] dark:text-[#F5EBE0]">
            Your Cart is Empty
          </h1>
          <p className="mt-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            Explore our curated collection of ceramics, raw wood forms, and sculptural objects.
          </p>
          <div className="mt-5">
            <Link
              to="/"
              className="wood-btn inline-flex rounded-lg px-4 py-2.5 text-xs"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10 py-7 sm:py-9">
      {/* Header */}
      <div className="tactile-card mb-6 flex items-center justify-between rounded-2xl px-6 py-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
            Shopping Cart
          </h1>
          <p className="text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            {totalItems} {totalItems === 1 ? "object" : "objects"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Empty the cart?")) {
              clearCart();
            }
          }}
          className="wood-btn rounded-lg px-3 py-1.5 text-xs"
        >
          Clear cart
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Items */}
        <div className="space-y-3.5 lg:col-span-8">
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
