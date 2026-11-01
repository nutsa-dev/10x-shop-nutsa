import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, getDiscountedPrice } from "@/utils/format";
import { IconCheck, IconArrowLeft } from "@/components/ui/Icons";
import type { Order, ShippingInfo } from "@/types/order";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
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
    savings,
    promoDiscount,
    totalPrice,
    clearCart,
  } = useCart();

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik<ShippingInfo>({
    initialValues: {
      fullName: user?.username ? `${user.username}` : "",
      email: "",
      address: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const orderId = Date.now();
      const orderNumber = `ALP-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: orderId,
        number: orderNumber,
        items: [...items],
        shipping: values,
        subtotal: rawSubtotal,
        discount: savings,
        shippingCost: 0,
        total: totalPrice,
        placedAt: new Date().toISOString(),
      };

      try {
        const saved = localStorage.getItem("shop_orders");
        const orders: Order[] = saved ? JSON.parse(saved) : [];
        orders.unshift(newOrder);
        localStorage.setItem("shop_orders", JSON.stringify(orders));
      } catch (e) {
        console.error("Failed to save order", e);
      }

      setPlacedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    },
  });

  if (placedOrder) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-lg rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 mb-4">
            <IconCheck className="h-6 w-6" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Order Confirmed
          </h1>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Order #{placedOrder.number} has been placed successfully.
          </p>

          <div className="mt-6 border-t border-neutral-100 pt-4 text-xs space-y-2 dark:border-neutral-800">
            <div className="flex justify-between">
              <span className="text-neutral-500">Recipient</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {placedOrder.shipping.fullName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Destination</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {placedOrder.shipping.address}, {placedOrder.shipping.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Total Paid</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">
                {formatPrice(placedOrder.total)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link
              to="/orders"
              className="flex-1 rounded-lg bg-neutral-900 py-2.5 text-center text-xs font-semibold text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 transition"
            >
              Track Order
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
            >
              Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Your Cart is Empty
        </h2>
        <Link
          to="/"
          className="mt-4 inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-900"
        >
          Browse Equipment
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-4"
      >
        <IconArrowLeft className="h-3.5 w-3.5" />
        <span>Back to cart</span>
      </Link>

      <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Form */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 lg:col-span-7 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
            Shipping Information
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="fullName" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
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
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
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
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
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
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
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
                className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.city}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-neutral-900 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-950 transition"
              >
                {isSubmitting ? "Placing Order..." : `Place Order • ${formatPrice(totalPrice)}`}
              </button>
            </div>
          </form>
        </div>

        {/* Review */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 lg:col-span-5 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
            Items ({items.length})
          </h2>

          <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto pr-1 dark:divide-neutral-800">
            {items.map((item) => {
              const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
              return (
                <div key={item.productId} className="flex items-center justify-between py-2 text-xs">
                  <span className="truncate pr-3 text-neutral-800 dark:text-neutral-200">
                    {item.quantity}× {item.title}
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {formatPrice(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-neutral-100 pt-3 space-y-1.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatPrice(rawSubtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between">
                <span>Discounts</span>
                <span className="font-semibold">-{formatPrice(savings)}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between">
                <span>Promo Voucher</span>
                <span className="font-semibold">-{formatPrice(promoDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="border-t border-neutral-100 pt-2 flex justify-between text-sm font-bold text-neutral-900 dark:border-neutral-800 dark:text-neutral-100">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
