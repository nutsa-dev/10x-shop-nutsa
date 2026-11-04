import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, getDiscountedPrice } from "@/utils/format";
import { storageGetJSON, storageSet } from "@/utils/storage";
import { IconCheck, IconArrowLeft } from "@/components/ui/Icons";
import type { Order, ShippingInfo } from "@/types/order";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .required("Shipping address is required"),
  city: Yup.string()
    .trim()
    .min(2, "City is required")
    .required("City is required"),
});

export const CheckoutPage = () => {
  const { user } = useAuth();
  const {
    items,
    rawSubtotal,
    subtotal,
    savings,
    promoCode,
    promoDiscount,
    totalPrice,
    clearCart,
  } = useCart();

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const formik = useFormik<ShippingInfo>({
    initialValues: {
      fullName: user?.username ? `${user.username}` : "",
      email: "",
      address: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const orderId = Date.now();
      const orderNumber = `10X-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: orderId,
        number: orderNumber,
        username: user?.username,
        items: [...items],
        shipping: values,
        subtotal: rawSubtotal,
        discount: savings,
        shippingCost: 0,
        total: totalPrice,
        placedAt: new Date().toISOString(),
      };

      const orders = storageGetJSON<Order[]>("shop_orders", []);
      orders.unshift(newOrder);
      storageSet("shop_orders", JSON.stringify(orders));

      setPlacedOrder(newOrder);
      clearCart();
    },
  });

  if (placedOrder) {
    return (
      <div className="mx-auto max-w-[1380px] px-3.5 sm:px-8 lg:px-10 py-12 sm:py-16">
        <div className="tactile-card mx-auto max-w-lg rounded-2xl p-6 sm:p-8">
          <div className="wood-btn flex h-12 w-12 items-center justify-center rounded-full mb-4">
            <IconCheck className="h-6 w-6" />
          </div>

          <h1 className="text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
            Thank you! Your order has been placed.
          </h1>
          <p className="mt-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            Order #{placedOrder.number} has been placed with 10X Shop.
          </p>

          <div className="mt-6 border-t border-[#D8C2A8] pt-4 text-xs space-y-2 dark:border-[#3D2616]">
            <div className="flex justify-between gap-2">
              <span className="text-[#5C4938] dark:text-[#D8C2A8]">Recipient</span>
              <span className="font-bold text-right text-[#26170C] dark:text-[#F5EBE0]">
                {placedOrder.shipping.fullName}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#5C4938] dark:text-[#D8C2A8]">Destination</span>
              <span className="font-bold text-right text-[#26170C] dark:text-[#F5EBE0]">
                {placedOrder.shipping.address}, {placedOrder.shipping.city}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#5C4938] dark:text-[#D8C2A8]">Total Paid</span>
              <span className="font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
                {formatPrice(placedOrder.total)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2.5">
            <Link
              to={`/orders/${placedOrder.id}`}
              className="wood-btn flex-1 rounded-lg py-2.5 text-center text-xs"
            >
              Track Order
            </Link>
            <Link
              to="/"
              className="wood-btn-walnut rounded-lg px-4 py-2.5 text-xs"
            >
              Back to catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="mx-auto max-w-[1380px] px-3.5 sm:px-8 lg:px-10 py-5 sm:py-9">
      <Link
        to="/cart"
        className="wood-btn inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs mb-4"
      >
        <IconArrowLeft className="h-3.5 w-3.5" />
        <span>Back to cart</span>
      </Link>

      <h1 className="wood-engraved text-lg sm:text-xl mb-4 sm:mb-6 uppercase">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-start">
        {/* Form */}
        <div className="tactile-card rounded-2xl p-4 sm:p-6 lg:col-span-7">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#8C6D58] mb-4">
            Shipping Information
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className="mt-1.5 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1.5 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]">
                Street Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Street address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className="mt-1.5 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]">
                City / Region
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="mt-1.5 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.city}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="wood-btn w-full rounded-lg py-2.5 px-4 text-xs disabled:opacity-50"
              >
                {formik.isSubmitting ? "Placing Order..." : `Place Order • ${formatPrice(totalPrice)}`}
              </button>
            </div>
          </form>
        </div>

        {/* Review */}
        <div className="tactile-card rounded-2xl p-4 sm:p-6 lg:col-span-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#8C6D58] mb-4">
            Objects ({items.length})
          </h2>

          <div className="divide-y divide-[#D8C2A8] max-h-60 overflow-y-auto pr-1 dark:divide-[#3D2616]">
            {items.map((item) => {
              const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
              return (
                <div key={item.productId} className="flex items-center justify-between py-2.5 text-xs">
                  <span className="truncate pr-3 text-[#26170C] dark:text-[#F5EBE0]">
                    {item.quantity}× {item.title}
                  </span>
                  <span className="font-bold text-[#26170C] dark:text-[#F5EBE0]">
                    {formatPrice(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-[#D8C2A8] pt-3 space-y-1.5 text-xs text-[#5C4938] dark:border-[#3D2616] dark:text-[#D8C2A8]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#26170C] dark:text-[#F5EBE0]">{formatPrice(subtotal)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between">
                <span>Discount ({promoCode || "10X10"} −10%)</span>
                <span className="font-bold text-[#8C6D58]">-{formatPrice(promoDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold text-[#26170C] dark:text-[#F5EBE0]">Complimentary</span>
            </div>
            <div className="border-t border-[#D8C2A8] pt-2.5 flex justify-between text-sm font-extrabold text-[#26170C] dark:border-[#3D2616] dark:text-[#F5EBE0]">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
