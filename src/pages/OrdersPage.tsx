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
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10 py-20 text-center">
        <div className="tactile-card mx-auto max-w-sm rounded-2xl p-10">
          <h1 className="text-base font-bold text-[#26170C] dark:text-[#F5EBE0]">
            No Orders Yet
          </h1>
          <p className="mt-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            Orders you place will appear here with live simulation tracking.
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
      <div className="tactile-card mb-6 flex items-center justify-between rounded-2xl px-6 py-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
            Orders & Tracking
          </h1>
          <p className="text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        <Link to="/" className="wood-btn rounded-lg px-3 py-1.5 text-xs">
          ← Collection
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
              className="tactile-card rounded-2xl p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#D8C2A8] pb-4 dark:border-[#3D2616]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
                      #{order.number}
                    </span>
                    <span className="wood-btn rounded-md px-2 py-0.5 text-[10px] uppercase">
                      {currentStatus}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
                    Placed {formatDate(order.placedAt)} • To: {order.shipping.fullName}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase text-[#5C4938] dark:text-[#D8C2A8]">Total</span>
                    <p className="text-sm font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="wood-btn rounded-lg px-3 py-1.5 text-xs"
                    >
                      Reorder
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCycleStatus(order.id)}
                      className="wood-btn-walnut rounded-lg px-2.5 py-1.5 text-xs"
                    >
                      Simulate ↻
                    </button>
                  </div>
                </div>
              </div>

              {/* Minimal Timeline */}
              <div className="py-4 border-b border-[#D8C2A8] dark:border-[#3D2616]">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  {STATUS_STEPS.map((step, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition ${
                            isPassed
                              ? "wood-btn"
                              : "border border-[#CBB092] text-[#5C4938] dark:border-[#4A301D] dark:text-[#D8C2A8]"
                          } ${isCurrent ? "ring-2 ring-[#8C6D58]" : ""}`}
                        >
                          {isPassed ? <IconCheck className="h-3 w-3" /> : idx + 1}
                        </div>
                        <span className={`mt-1.5 text-[11px] font-medium ${isCurrent ? "font-extrabold text-[#26170C] dark:text-[#F5EBE0]" : "text-[#5C4938] dark:text-[#D8C2A8]"}`}>
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
                  className="wood-btn rounded-md px-2.5 py-1 text-xs"
                >
                  {isExpanded ? "Hide objects" : `View ${order.items.length} objects`}
                </button>
                <span className="text-[#5C4938] text-[11px] dark:text-[#D8C2A8]">
                  {order.shipping.address}, {order.shipping.city}
                </span>
              </div>

              {isExpanded && (
                <div className="mt-3 space-y-2 rounded-xl bg-[#EFE8DC] p-3.5 text-xs dark:bg-[#19100A]">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center">
                      <span className="truncate pr-2 text-[#26170C] dark:text-[#F5EBE0]">
                        {item.quantity}× {item.title}
                      </span>
                      <span className="font-bold text-[#26170C] dark:text-[#F5EBE0]">
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
