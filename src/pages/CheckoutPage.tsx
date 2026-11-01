import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, getDiscountedPrice } from "@/utils/format";
import {
  IconCheck,
  IconShield,
  IconTruck,
  IconArrowLeft,
  IconArrowRight,
  IconCart,
  IconLeaf,
} from "@/components/ui/Icons";
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
  const [copiedOrder, setCopiedOrder] = useState<boolean>(false);

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

      // Brief simulated payment/order placement delay
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

  const handleCopyOrder = () => {
    if (!placedOrder) return;
    navigator.clipboard.writeText(placedOrder.number);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  // 1. Order Success / Confirmation Receipt Screen
  if (placedOrder) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200/90 bg-white p-8 sm:p-12 shadow-sm dark:border-stone-800 dark:bg-[#181816]">
          
          {/* Animated Green Checkmark Badge */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400">
            <IconCheck className="h-10 w-10 stroke-2" />
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
              <IconLeaf className="h-3.5 w-3.5" />
              <span>Order Confirmed & Carbon-Offset</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
              Takk! Your Order is on Its Way
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
              We have received your order and our Nordic workshop is preparing your handcrafted items with plastic-free packaging.
            </p>
          </div>

          {/* Order Details Receipt Card */}
          <div className="mt-8 rounded-2xl border border-stone-200/90 bg-stone-50/70 p-6 text-xs text-stone-700 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                  Order Number
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-900 text-sm dark:text-stone-100">
                    #{placedOrder.number}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="rounded-md border border-stone-300 px-1.5 py-0.5 text-[10px] font-semibold text-stone-600 hover:bg-stone-200 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800"
                  >
                    {copiedOrder ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                  Recipient
                </span>
                <p className="mt-1 font-bold text-stone-900 text-sm dark:text-stone-100">
                  {placedOrder.shipping.fullName}
                </p>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                  Delivery Address
                </span>
                <p className="mt-1 font-medium text-stone-800 dark:text-stone-200">
                  {placedOrder.shipping.address}, {placedOrder.shipping.city}
                </p>
              </div>
              <div>
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                  Confirmation Email
                </span>
                <p className="mt-1 font-medium text-stone-800 dark:text-stone-200">
                  {placedOrder.shipping.email}
                </p>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-800">
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px]">
                Items in This Shipment ({placedOrder.items.length})
              </span>
              <div className="mt-3 divide-y divide-stone-200/80 dark:divide-stone-800">
                {placedOrder.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-10 w-10 rounded-lg border border-stone-200 bg-stone-100 object-contain p-1 dark:border-stone-800 dark:bg-stone-800"
                      />
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        {item.quantity}× {item.title}
                      </span>
                    </div>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {formatPrice(
                        getDiscountedPrice(item.price, item.discountPercentage) * item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-3 text-sm font-extrabold text-stone-900 dark:border-stone-800 dark:text-stone-100">
                <span>Total Paid (incl. VAT)</span>
                <span>{formatPrice(placedOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/orders"
              className="flex-1 rounded-2xl bg-stone-900 px-6 py-3.5 text-center text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Track Order Status →
            </Link>
            <Link
              to="/"
              className="rounded-2xl border border-stone-300 px-6 py-3.5 text-center text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty Cart Fallback
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-10 shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-300">
            <IconCart className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
            Please add handcrafted Nordic items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Active Checkout Form & Order Review
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Checkout Step Breadcrumb */}
      <div className="mb-8 flex flex-col gap-2">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Cart</span>
        </Link>
        
        <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
              Shipping & Checkout
            </h1>
            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Provide delivery details for carbon-neutral shipment.
            </p>
          </div>

          {/* Stepper badge */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-stone-400">1. Cart</span>
            <span className="text-stone-300">→</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
              2. Shipping
            </span>
            <span className="text-stone-300">→</span>
            <span className="text-stone-400">3. Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        
        {/* Left Column: Shipping Details Form */}
        <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-2xs lg:col-span-7 dark:border-stone-800 dark:bg-[#181816]">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
                Delivery Details
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                All shipments are tracked and packaged with zero single-use plastics.
              </p>
            </div>
            <IconTruck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
            
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Astrid Lindgren"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className={`mt-1.5 w-full rounded-xl border bg-stone-50/70 px-4 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-900 dark:text-stone-100 ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-200 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. astrid@nordichome.se"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1.5 w-full rounded-xl border bg-stone-50/70 px-4 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-900 dark:text-stone-100 ${
                  formik.touched.email && formik.errors.email
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-200 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Shipping Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Street Address *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="e.g. 14 Vasagatan, Apt 4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className={`mt-1.5 w-full rounded-xl border bg-stone-50/70 px-4 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-900 dark:text-stone-100 ${
                  formik.touched.address && formik.errors.address
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-200 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {formik.errors.address}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
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
                className={`mt-1.5 w-full rounded-xl border bg-stone-50/70 px-4 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-900 dark:text-stone-100 ${
                  formik.touched.city && formik.errors.city
                    ? "border-rose-500 focus:border-rose-600"
                    : "border-stone-200 focus:border-stone-500 dark:border-stone-700"
                }`}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {formik.errors.city}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-stone-800 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                <span>{isSubmitting ? "Placing Your Order..." : `Place Order • ${formatPrice(totalPrice)}`}</span>
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Guarantees */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-stone-400 dark:text-stone-500">
            <IconShield className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>256-Bit SSL Encrypted & Protected</span>
          </div>
        </div>

        {/* Right Column: Order Review */}
        <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-2xs lg:col-span-5 dark:border-stone-800 dark:bg-[#181816]">
          <h2 className="text-base font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
            Order Review ({items.length} {items.length === 1 ? "item" : "items"})
          </h2>

          {/* Item Mini List */}
          <div className="mt-4 max-h-72 divide-y divide-stone-100 overflow-y-auto pr-1 dark:divide-stone-800">
            {items.map((item) => {
              const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
              return (
                <div key={item.productId} className="flex items-center gap-3 py-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-12 w-12 rounded-xl border border-stone-200/80 bg-stone-100/70 object-contain p-1.5 dark:border-stone-800 dark:bg-stone-800/60"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Qty: {item.quantity} × {formatPrice(unitPrice)}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
                    {formatPrice(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Financial summary */}
          <dl className="mt-6 border-t border-stone-200/80 pt-4 space-y-2.5 text-xs dark:border-stone-800">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-stone-900 dark:text-stone-100">
                {formatPrice(rawSubtotal)}
              </dd>
            </div>

            {savings > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                <dt>Catalog Discounts</dt>
                <dd className="font-bold">
                  -{formatPrice(savings)}
                </dd>
              </div>
            )}

            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                <dt>Promo Voucher (10%)</dt>
                <dd className="font-bold">
                  -{formatPrice(promoDiscount)}
                </dd>
              </div>
            )}

            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <dt>Carbon-Neutral Delivery</dt>
              <dd className="font-bold text-emerald-700 dark:text-emerald-400">
                Free
              </dd>
            </div>

            <div className="border-t border-stone-200/80 pt-3 flex justify-between text-base font-extrabold text-stone-900 dark:border-stone-800 dark:text-stone-100">
              <dt>Total to Pay</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
          </dl>
        </div>

      </div>
    </div>
  );
};
