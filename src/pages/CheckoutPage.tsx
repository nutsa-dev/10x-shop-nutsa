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
      const orderNumber = `KURA-${Math.floor(100000 + Math.random() * 900000)}`;

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
        <div className="mx-auto max-w-lg rounded-2xl border border-[#EADBCC] bg-white p-8 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8C6D58] text-white mb-4">
            <IconCheck className="h-6 w-6" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
            Order Confirmed
          </h1>
          <p className="mt-1 text-xs text-[#736B63]">
            Order #{placedOrder.number} has been placed with KURA // Atelier Objects.
          </p>

          <div className="mt-6 border-t border-[#EADBCC] pt-4 text-xs space-y-2 dark:border-[#332C27]">
            <div className="flex justify-between">
              <span className="text-[#736B63]">Recipient</span>
              <span className="font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
                {placedOrder.shipping.fullName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736B63]">Destination</span>
              <span className="font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
                {placedOrder.shipping.address}, {placedOrder.shipping.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736B63]">Total Paid</span>
              <span className="font-bold text-[#2C2724] dark:text-[#F7F5F0]">
                {formatPrice(placedOrder.total)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2.5">
            <Link
              to="/orders"
              className="flex-1 rounded-lg bg-[#8C6D58] hover:bg-[#735744] py-2.5 text-center text-xs font-medium text-white transition-colors"
            >
              Track Order
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-[#EADBCC] px-4 py-2.5 text-xs font-medium text-[#2C2724] hover:border-[#8C6D58] transition-colors dark:border-[#332C27] dark:text-[#F7F5F0]"
            >
              Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-base font-bold text-[#2C2724] dark:text-[#F7F5F0]">
          Your Cart is Empty
        </h2>
        <Link
          to="/"
          className="mt-4 inline-flex rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-4 py-2.5 text-xs font-medium text-white transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-xs text-[#736B63] hover:text-[#2C2724] dark:hover:text-white mb-4"
      >
        <IconArrowLeft className="h-3.5 w-3.5" />
        <span>Back to cart</span>
      </Link>

      <h1 className="text-xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0] mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Form */}
        <div className="rounded-2xl border border-[#EADBCC] bg-white p-6 lg:col-span-7 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#8C6D58] mb-4">
            Shipping Information
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-medium text-[#2C2724] dark:text-[#F7F5F0]">
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
                className="mt-1.5 w-full rounded-lg border border-[#EADBCC] bg-[#F7F5F0] px-3 py-2 text-xs text-[#2C2724] outline-none focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#F7F5F0]"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#2C2724] dark:text-[#F7F5F0]">
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
                className="mt-1.5 w-full rounded-lg border border-[#EADBCC] bg-[#F7F5F0] px-3 py-2 text-xs text-[#2C2724] outline-none focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#F7F5F0]"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-medium text-[#2C2724] dark:text-[#F7F5F0]">
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
                className="mt-1.5 w-full rounded-lg border border-[#EADBCC] bg-[#F7F5F0] px-3 py-2 text-xs text-[#2C2724] outline-none focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#F7F5F0]"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-medium text-[#2C2724] dark:text-[#F7F5F0]">
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
                className="mt-1.5 w-full rounded-lg border border-[#EADBCC] bg-[#F7F5F0] px-3 py-2 text-xs text-[#2C2724] outline-none focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#F7F5F0]"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-[11px] text-rose-600">{formik.errors.city}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#8C6D58] hover:bg-[#735744] py-2.5 px-4 text-xs font-medium text-white disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Placing Order..." : `Place Order • ${formatPrice(totalPrice)}`}
              </button>
            </div>
          </form>
        </div>

        {/* Review */}
        <div className="rounded-2xl border border-[#EADBCC] bg-white p-6 lg:col-span-5 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#8C6D58] mb-4">
            Objects ({items.length})
          </h2>

          <div className="divide-y divide-[#EADBCC]/60 max-h-60 overflow-y-auto pr-1 dark:divide-[#332C27]">
            {items.map((item) => {
              const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
              return (
                <div key={item.productId} className="flex items-center justify-between py-2.5 text-xs">
                  <span className="truncate pr-3 text-[#2C2724] dark:text-[#F7F5F0]">
                    {item.quantity}× {item.title}
                  </span>
                  <span className="font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
                    {formatPrice(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-[#EADBCC] pt-3 space-y-1.5 text-xs text-[#736B63] dark:border-[#332C27]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#2C2724] dark:text-[#F7F5F0]">{formatPrice(rawSubtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between">
                <span>Discounts</span>
                <span className="font-semibold text-[#8C6D58]">-{formatPrice(savings)}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between">
                <span>Promo Voucher</span>
                <span className="font-semibold text-[#8C6D58]">-{formatPrice(promoDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-[#2C2724] dark:text-[#F7F5F0]">Complimentary</span>
            </div>
            <div className="border-t border-[#EADBCC] pt-2.5 flex justify-between text-sm font-bold text-[#2C2724] dark:border-[#332C27] dark:text-[#F7F5F0]">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
