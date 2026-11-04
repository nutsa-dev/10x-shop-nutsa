import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice, formatDate, getDiscountedPrice } from "@/utils/format";
import { storageGetJSON, storageSet } from "@/utils/storage";
import { IconCheck } from "@/components/ui/Icons";
import type { Order, OrderStatus } from "@/types/order";

const STATUS_STEPS: OrderStatus[] = ["Processing", "Shipped", "Delivered"];

/**
 * Pure function: calculates simulated status from explicit timestamp, without calling Date.now() during render.
 */
function getSimulatedStatus(order: Order, currentTime: number): OrderStatus {
  if (order.status) return order.status;
  const elapsedMinutes = (currentTime - new Date(order.placedAt).getTime()) / (1000 * 60);
  if (elapsedMinutes < 1) return "Processing";
  if (elapsedMinutes < 3) return "Shipped";
  return "Delivered";
}

function isOrder(val: unknown): val is Order {
  if (!val || typeof val !== "object") return false;
  const obj = val as Record<string, unknown>;
  return typeof obj.id === "number" && typeof obj.number === "string" && Array.isArray(obj.items);
}

export const OrdersPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [allOrders, setAllOrders] = useState<Order[]>(() => {
    const parsed = storageGetJSON<unknown>("shop_orders", []);
    return Array.isArray(parsed) ? parsed.filter(isOrder) : [];
  });

  // State-driven clock (updates every 30s as per PRD F-P6-03) ensures the timeline advances automatically
  // while keeping renders 100% pure (satisfies React purity rules).
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Filter orders by logged-in user so orders are private to each account
  const visibleOrders = useMemo(() => {
    if (!isLoggedIn || !user?.username) {
      // If guest/logged out, show only guest orders without a username attached
      return allOrders.filter((o) => !o.username || o.username === "guest");
    }
    return allOrders.filter(
      (o) => o.username === user.username || !o.username
    );
  }, [allOrders, isLoggedIn, user]);

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

  const handleCycleStatus = (orderId: number) => {
    setAllOrders((prevOrders) => {
      const updated = prevOrders.map((o) => {
        if (o.id === orderId) {
          const current = getSimulatedStatus(o, now);
          const currentIndex = STATUS_STEPS.indexOf(current);
          const nextStatus = STATUS_STEPS[(currentIndex + 1) % STATUS_STEPS.length];
          return { ...o, status: nextStatus };
        }
        return o;
      });

      storageSet("shop_orders", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (visibleOrders.length === 0) {
    return (
      <div className="mx-auto max-w-[1380px] px-3.5 sm:px-8 lg:px-10 py-14 sm:py-20 text-center">
        <div className="tactile-card mx-auto max-w-sm rounded-2xl p-7 sm:p-10">
          <h1 className="text-base font-bold text-[#26170C] dark:text-[#F5EBE0]">
            No Orders Yet
          </h1>
          <p className="mt-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            {isLoggedIn
              ? `No orders placed under @${user?.username} yet.`
              : "Orders you place will appear here with live simulation tracking."}
          </p>
          <div className="mt-5">
            <Link
              to="/"
              className="wood-btn inline-flex rounded-lg px-4 py-2.5 text-xs"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1380px] px-3.5 sm:px-8 lg:px-10 py-5 sm:py-9">
      <div className="tactile-card mb-4 sm:mb-6 flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
            Orders & Tracking
          </h1>
          <p className="text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            {visibleOrders.length} {visibleOrders.length === 1 ? "order" : "orders"}
            {isLoggedIn && ` for ${user?.username}`}
          </p>
        </div>

        <Link to="/" className="wood-btn rounded-lg px-3 py-1.5 text-xs">
          ← Catalog
        </Link>
      </div>

      <div className="space-y-4">
        {visibleOrders.map((order) => {
          const currentStatus = getSimulatedStatus(order, now);
          const currentStepIndex = STATUS_STEPS.indexOf(currentStatus);
          const isExpanded = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              className="tactile-card rounded-2xl p-4 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#D8C2A8] pb-4 dark:border-[#3D2616]">
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

                <div className="flex items-center justify-between sm:justify-end gap-4">
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
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => toggleExpand(order.id)}
                  className="wood-btn shrink-0 rounded-md px-2.5 py-1 text-xs"
                >
                  {isExpanded ? "Hide objects" : `View ${order.items.length} objects`}
                </button>
                <span className="truncate text-[#5C4938] text-[11px] dark:text-[#D8C2A8]">
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
