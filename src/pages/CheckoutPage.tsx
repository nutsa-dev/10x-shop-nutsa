import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, getDiscountedPrice } from "@/utils/format";
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
      fullName: user?.username ? `${user.username} (Customer)` : "",
      email: "",
      address: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      // სიმულაციური მცირე დაყოვნება შეკვეთის გაფორმებისთვის
      await new Promise((resolve) => setTimeout(resolve, 600));

      const orderId = Date.now();
      const orderNumber = `10X-${Math.floor(100000 + Math.random() * 900000)}`;

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
        console.error("Failed to save order to localStorage", e);
      }

      setPlacedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    },
  });

  // 1. შეკვეთის წარმატების ეკრანი (Success Confirmation View)
  if (placedOrder) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-12 dark:border-stone-800 dark:bg-stone-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            ✓
          </div>

          <div className="mt-6 text-center">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              Order Confirmed
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              Thank You For Your Order!
            </h1>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              We have received your order and are preparing it for shipment.
            </p>
          </div>

          {/* შეკვეთის დეტალების ბარათი */}
          <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-xs text-stone-700 dark:border-stone-800 dark:bg-stone-950/40 dark:text-stone-300">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">
                  Order Number
                </span>
                <p className="mt-0.5 font-bold text-stone-900 text-sm dark:text-stone-100">
                  #{placedOrder.number}
                </p>
              </div>
              <div>
                <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">
                  Recipient
                </span>
                <p className="mt-0.5 font-bold text-stone-900 text-sm dark:text-stone-100">
                  {placedOrder.shipping.fullName}
                </p>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">
                  Shipping Address
                </span>
                <p className="mt-0.5 font-medium">
                  {placedOrder.shipping.address}, {placedOrder.shipping.city}
                </p>
              </div>
              <div>
                <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">
                  Notification Email
                </span>
                <p className="mt-0.5 font-medium">{placedOrder.shipping.email}</p>
              </div>
            </div>

            {/* შეძენილი ნივთების მოკლე სია */}
            <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-800">
              <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">
                Items Purchased ({placedOrder.items.length})
              </span>
              <div className="mt-3 divide-y divide-stone-200 dark:divide-stone-800">
                {placedOrder.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between py-2">
                    <span className="truncate pr-4 text-stone-800 dark:text-stone-200">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {formatPrice(
                        getDiscountedPrice(item.price, item.discountPercentage) * item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-3 text-sm font-bold text-stone-900 dark:border-stone-800 dark:text-stone-100">
                <span>Total Paid</span>
                <span>{formatPrice(placedOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* მოქმედების ღილაკები */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 rounded-xl bg-stone-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. თუ კალათა ცარიელია და შეკვეთა ჯერ არ განხორციელებულა
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <span className="text-4xl">🛒</span>
          <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-stone-100">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            ← Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  // 3. შეკვეთის ფორმა და შეჯამება (Active Checkout Flow)
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ნავიგაცია უკან კალათაში */}
      <div className="mb-6">
        <Link
          to="/cart"
          className="text-xs font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition"
        >
          ← Back to cart
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
          Checkout & Shipping
        </h1>
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
          Please fill in your shipping information to complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* მარცხენა სვეტი: მიწოდების ფორმა */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs lg:col-span-7 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Shipping Information
          </h2>

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-medium text-stone-700 dark:text-stone-300"
              >
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Emily Smith"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className={`mt-1.5 w-full rounded-xl border bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-800 dark:text-stone-100 ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-300 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-stone-700 dark:text-stone-300"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. emily@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1.5 w-full rounded-xl border bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-800 dark:text-stone-100 ${
                  formik.touched.email && formik.errors.email
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-300 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Shipping Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-xs font-medium text-stone-700 dark:text-stone-300"
              >
                Street Address *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="e.g. 104 Nordic Way, Apt 3B"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className={`mt-1.5 w-full rounded-xl border bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-800 dark:text-stone-100 ${
                  formik.touched.address && formik.errors.address
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-300 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  {formik.errors.address}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-xs font-medium text-stone-700 dark:text-stone-300"
              >
                City / Region *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="e.g. Stockholm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={`mt-1.5 w-full rounded-xl border bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-800 dark:text-stone-100 ${
                  formik.touched.city && formik.errors.city
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-300 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  {formik.errors.city}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                <span>{isSubmitting ? "Processing Order..." : "Place Order Now"}</span>
                <span>→</span>
              </button>
            </div>
          </form>
        </div>

        {/* მარჯვენა სვეტი: შეკვეთის შეჯამება */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs lg:col-span-5 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Order Review ({items.length} {items.length === 1 ? "item" : "items"})
          </h2>

          {/* ნივთების მინი სია */}
          <div className="mt-4 max-h-72 divide-y divide-stone-100 overflow-y-auto pr-1 dark:divide-stone-800">
            {items.map((item) => {
              const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
              return (
                <div key={item.productId} className="flex items-center gap-3 py-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-12 w-12 rounded-lg border border-stone-200 bg-stone-50 object-contain p-1 dark:border-stone-800 dark:bg-stone-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-semibold text-stone-900 dark:text-stone-100">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Qty: {item.quantity} × {formatPrice(unitPrice)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {formatPrice(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ჯამების შეჯამება */}
          <dl className="mt-6 border-t border-stone-200 pt-4 space-y-2 text-xs dark:border-stone-800">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-stone-900 dark:text-stone-100">
                {formatPrice(rawSubtotal)}
              </dd>
            </div>

            {savings > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <dt>Savings & Discounts</dt>
                <dd className="font-semibold">
                  -{formatPrice(savings)}
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
              <dt>Total to Pay</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
