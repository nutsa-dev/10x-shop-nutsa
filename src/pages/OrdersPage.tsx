import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice, formatDate, getDiscountedPrice } from "@/utils/format";
import {
  IconPackage,
  IconCheck,
  IconCart,
  IconArrowRight,
  IconArrowLeft,
  IconTruck,
} from "@/components/ui/Icons";
import type { Order, OrderStatus } from "@/types/order";

const STATUS_STEPS: OrderStatus[] = ["Processing", "Shipped", "Delivered"];

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleReorder = (order: Order) => {
    for (const item of order.items) {
      addItem(
        {
          id: item.productId,
          title: item.title,
          thumbnail: item.thumbnail,
          price: item.price,
          discountPercentage: item.discountPercentage,
          stock: item.stock,
          description: "",
          category: "",
          rating: 5,
          images: [item.thumbnail],
          reviews: [],
        },
        item.quantity
      );
    }
    navigate("/cart");
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shop_orders");
      if (saved) {
        setOrders(JSON.parse(saved) as Order[]);
      }
    } catch (e) {
      console.error("Failed to load orders from localStorage", e);
    }
  }, []);

  const getSimulatedStatus = (order: Order): OrderStatus => {
    if (order.status) return order.status;
    const elapsedMinutes = (Date.now() - new Date(order.placedAt).getTime()) / (1000 * 60);
    if (elapsedMinutes < 2) return "Processing";
    if (elapsedMinutes < 5) return "Shipped";
    return "Delivered";
  };

  const handleCycleStatus = (orderId: number) => {
    setOrders((prevOrders) => {
      const updated = prevOrders.map((o) => {
        if (o.id === orderId) {
          const current = getSimulatedStatus(o);
          const currentIndex = STATUS_STEPS.indexOf(current);
          const nextStatus = STATUS_STEPS[(currentIndex + 1) % STATUS_STEPS.length];
          return { ...o, status: nextStatus };
        }
        return o;
      });

      try {
        localStorage.setItem("shop_orders", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save updated orders", e);
      }

      return updated;
    });
  };

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  // Empty State
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-stone-300 bg-white p-10 sm:p-14 text-center shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-300">
            <IconPackage className="h-10 w-10 stroke-1" />
          </div>
          
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
            No Orders Placed Yet
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
            Your journey with sustainable Scandinavian living begins here. Discover our handmade Nordic home catalog.
          </p>
          
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
            >
              <span>Explore Products</span>
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
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200/80 pb-5 dark:border-stone-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
            My Orders & Tracking
          </h1>
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            Track shipment milestones and simulate delivery status in real-time.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400 transition"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const currentStatus = getSimulatedStatus(order);
          const currentStepIndex = STATUS_STEPS.indexOf(currentStatus);
          const isExpanded = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-2xs transition-all hover:border-stone-300 dark:border-stone-800 dark:bg-[#181816] dark:hover:border-stone-700"
            >
              {/* Order Header Summary */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-100 pb-5 dark:border-stone-800/80">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
                      #{order.number}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        currentStatus === "Delivered"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
                          : currentStatus === "Shipped"
                          ? "bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {currentStatus}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    Placed on {formatDate(order.placedAt)} • To: {order.shipping.fullName} ({order.shipping.city})
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Total Amount
                    </span>
                    <p className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      title="Add items back to shopping bag"
                      className="flex items-center gap-1.5 rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition shadow-2xs"
                    >
                      <IconCart className="h-3.5 w-3.5" />
                      <span>Reorder</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleCycleStatus(order.id)}
                      title="Cycle to next simulated status"
                      className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition"
                    >
                      Simulate ↻
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Timeline Bar */}
              <div className="py-7 border-b border-stone-100 dark:border-stone-800/80">
                <div className="relative flex items-center justify-between max-w-xl mx-auto px-4">
                  {/* Track background */}
                  <div className="absolute left-6 right-6 top-1/2 -z-0 h-1 -translate-y-1/2 bg-stone-200 dark:bg-stone-800 rounded-full" />
                  
                  {/* Progress active track */}
                  <div
                    className="absolute left-6 top-1/2 -z-0 h-1 -translate-y-1/2 bg-emerald-700 dark:bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `calc(${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}% - 24px)`,
                    }}
                  />

                  {STATUS_STEPS.map((step, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                            isPassed
                              ? "bg-emerald-700 text-white shadow-xs dark:bg-emerald-500 dark:text-stone-950"
                              : "border-2 border-stone-300 bg-white text-stone-400 dark:border-stone-700 dark:bg-stone-900"
                          } ${isCurrent ? "ring-4 ring-emerald-500/30 scale-105" : ""}`}
                        >
                          {isPassed ? <IconCheck className="h-4 w-4" /> : idx + 1}
                        </div>
                        <span
                          className={`mt-2 text-xs font-bold tracking-tight ${
                            isCurrent
                              ? "text-emerald-700 dark:text-emerald-400"
                              : isPassed
                              ? "text-stone-800 dark:text-stone-200"
                              : "text-stone-400 dark:text-stone-500"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Toggle Items View & Address summary */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => toggleExpand(order.id)}
                  className="self-start text-xs font-bold text-stone-700 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400 transition"
                >
                  {isExpanded ? "▲ Hide purchased items" : `▼ View ${order.items.length} purchased items`}
                </button>

                <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  <IconTruck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Delivering to: {order.shipping.address}, {order.shipping.city}</span>
                </div>
              </div>

              {/* Expanded Item List */}
              {isExpanded && (
                <div className="mt-4 space-y-3 rounded-2xl border border-stone-100 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-900/40">
                  {order.items.map((item) => {
                    const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-10 w-10 rounded-xl border border-stone-200 bg-white object-contain p-1 dark:border-stone-800 dark:bg-stone-900"
                          />
                          <div>
                            <Link
                              to={`/products/${item.productId}`}
                              className="font-bold text-stone-900 hover:text-emerald-700 dark:text-stone-100 dark:hover:text-emerald-400 transition"
                            >
                              {item.title}
                            </Link>
                            <p className="text-stone-400 dark:text-stone-500 text-[11px]">
                              Qty: {item.quantity} × {formatPrice(unitPrice)}
                            </p>
                          </div>
                        </div>

                        <span className="font-extrabold text-stone-900 dark:text-stone-100">
                          {formatPrice(unitPrice * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
