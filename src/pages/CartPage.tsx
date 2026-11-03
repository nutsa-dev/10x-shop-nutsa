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
        <div className="mx-auto max-w-sm rounded-2xl border border-[#EADBCC] bg-white p-10 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
          <h1 className="text-base font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            Your Cart is Empty
          </h1>
          <p className="mt-1 text-xs text-[#736B63]">
            Explore our curated collection of ceramics, raw wood forms, and sculptural objects.
          </p>
          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-4 py-2.5 text-xs font-medium text-white transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-[#EADBCC] pb-4 dark:border-[#332C27]">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
            Shopping Cart
          </h1>
          <p className="text-xs text-[#736B63]">
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
          className="text-xs text-[#736B63] hover:text-[#2C2724] dark:hover:text-[#F7F5F0]"
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
