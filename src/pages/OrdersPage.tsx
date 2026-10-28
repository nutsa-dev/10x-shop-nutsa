import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice, formatDate, getDiscountedPrice } from "@/utils/format";
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

  // სტატუსის სიმულაციის ფუნქცია
  const getSimulatedStatus = (order: Order): OrderStatus => {
    if (order.status) return order.status;

    // დროის მიხედვით სიმულაცია
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

  // ცარიელი მდგომარეობა (Empty State)
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-3xl dark:bg-stone-800">
            📦
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            No Orders Placed Yet
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            You haven't placed any orders yet. Discover our handmade Nordic eco products.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              <span>Explore Catalog</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
            Order Management & History
          </h1>
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            Track and inspect your simulated orders and delivery timeline.
          </p>
        </div>

        <Link
          to="/"
          className="text-xs font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition"
        >
          ← Continue Shopping
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
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900"
            >
              {/* Order Header Summary */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                      #{order.number}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        currentStatus === "Delivered"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : currentStatus === "Shipped"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                      }`}
                    >
                      ● {currentStatus}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
                    Placed on {formatDate(order.placedAt)} • Recipient: {order.shipping.fullName} ({order.shipping.city})
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-stone-400 uppercase tracking-wider text-[10px]">
                      Total Paid
                    </span>
                    <p className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      title="Add these items back to cart"
                      className="rounded-lg bg-stone-900 px-3 py-1 text-[11px] font-semibold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
                    >
                      Reorder 🛒
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCycleStatus(order.id)}
                      title="Simulate advancing order status"
                      className="rounded-lg border border-stone-300 px-2.5 py-1 text-[11px] font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
                    >
                      Simulate Status ↻
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Timeline Bar */}
              <div className="py-6 border-b border-stone-100 dark:border-stone-800">
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 top-1/2 -z-0 h-0.5 w-full -translate-y-1/2 bg-stone-200 dark:bg-stone-800" />
                  <div
                    className="absolute left-0 top-1/2 -z-0 h-0.5 -translate-y-1/2 bg-amber-600 transition-all duration-500 dark:bg-amber-500"
                    style={{
                      width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                    }}
                  />

                  {STATUS_STEPS.map((step, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                            isPassed
                              ? "bg-amber-600 text-white shadow-xs dark:bg-amber-500 dark:text-stone-900"
                              : "border-2 border-stone-300 bg-white text-stone-400 dark:border-stone-700 dark:bg-stone-900"
                          } ${isCurrent ? "ring-4 ring-amber-600/20 dark:ring-amber-500/20" : ""}`}
                        >
                          {isPassed ? "✓" : idx + 1}
                        </div>
                        <span
                          className={`mt-2 text-xs font-semibold ${
                            isCurrent
                              ? "text-stone-900 dark:text-stone-100"
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

              {/* Toggle Items View */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleExpand(order.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition"
                >
                  <span>{isExpanded ? "Hide item details ▲" : `View ${order.items.length} items ▼`}</span>
                </button>
                <span className="text-xs text-stone-400">
                  Shipped to: {order.shipping.address}, {order.shipping.city}
                </span>
              </div>

              {/* Expanded Item List */}
              {isExpanded && (
                <div className="mt-4 space-y-3 rounded-xl border border-stone-100 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-950/40">
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
                            className="h-10 w-10 rounded-lg border border-stone-200 bg-white object-contain p-1 dark:border-stone-800 dark:bg-stone-900"
                          />
                          <div>
                            <Link
                              to={`/products/${item.productId}`}
                              className="font-semibold text-stone-900 hover:underline dark:text-stone-100"
                            >
                              {item.title}
                            </Link>
                            <p className="text-stone-400 dark:text-stone-500">
                              Qty: {item.quantity} × {formatPrice(unitPrice)}
                            </p>
                          </div>
                        </div>

                        <span className="font-bold text-stone-900 dark:text-stone-100">
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
