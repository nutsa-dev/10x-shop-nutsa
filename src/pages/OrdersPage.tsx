import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice, formatDate, getDiscountedPrice } from "@/utils/format";
import { IconCheck } from "@/components/ui/Icons";
import type { Order, OrderStatus } from "@/types/order";

const STATUS_STEPS: OrderStatus[] = ["Processing", "Shipped", "Delivered"];

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("shop_orders");
      return saved ? (JSON.parse(saved) as Order[]) : [];
    } catch {
      return [];
    }
  });

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

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-sm rounded-xl border border-neutral-200 bg-white p-10 dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            No Orders Yet
          </h1>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Orders you place will appear here with live simulation tracking.
          </p>
          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950 transition hover:bg-neutral-800"
            >
              Browse Equipment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 flex items-center justify-between border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Orders & Tracking
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        <Link to="/" className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
          ← Catalog
        </Link>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const currentStatus = getSimulatedStatus(order);
          const currentStepIndex = STATUS_STEPS.indexOf(currentStatus);
          const isExpanded = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              className="rounded-xl border border-neutral-200/90 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      #{order.number}
                    </span>
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {currentStatus}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-neutral-400">
                    Placed {formatDate(order.placedAt)} • To: {order.shipping.fullName}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase text-neutral-400">Total</span>
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
                    >
                      Reorder
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCycleStatus(order.id)}
                      className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300"
                    >
                      Simulate ↻
                    </button>
                  </div>
                </div>
              </div>

              {/* Minimal Timeline */}
              <div className="py-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  {STATUS_STEPS.map((step, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition ${
                            isPassed
                              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
                              : "border border-neutral-300 text-neutral-400 dark:border-neutral-700"
                          } ${isCurrent ? "ring-2 ring-neutral-400" : ""}`}
                        >
                          {isPassed ? <IconCheck className="h-3 w-3" /> : idx + 1}
                        </div>
                        <span className={`mt-1.5 text-[11px] font-medium ${isCurrent ? "font-bold text-neutral-900 dark:text-white" : "text-neutral-400"}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expand Toggle */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => toggleExpand(order.id)}
                  className="font-medium text-neutral-600 hover:underline dark:text-neutral-400"
                >
                  {isExpanded ? "Hide items" : `View ${order.items.length} items`}
                </button>
                <span className="text-neutral-400 text-[11px]">
                  {order.shipping.address}, {order.shipping.city}
                </span>
              </div>

              {isExpanded && (
                <div className="mt-3 space-y-2 rounded-lg bg-neutral-50 p-3 text-xs dark:bg-neutral-800/50">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center">
                      <span className="truncate pr-2">
                        {item.quantity}× {item.title}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(getDiscountedPrice(item.price, item.discountPercentage) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
