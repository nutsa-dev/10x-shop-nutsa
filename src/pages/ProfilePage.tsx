import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/format";
import { IconSun, IconMoon } from "@/components/ui/Icons";
import type { Order } from "@/types/order";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { totalItems, clearCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("shop_orders");
      return saved ? (JSON.parse(saved) as Order[]) : [];
    } catch {
      return [];
    }
  });

  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const totalSpent = orders.reduce((acc, curr) => acc + curr.total, 0);

  const handleResetData = () => {
    localStorage.removeItem("shop_orders");
    clearCart();
    setOrders([]);
    setResetMessage("All demo orders and cart data have been reset.");
    setTimeout(() => setResetMessage(null), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6 border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Account & Settings
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Logged in as <strong className="text-neutral-900 dark:text-white">{user?.username}</strong>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-3 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {orders.length}
          </span>
          <p className="text-[10px] uppercase text-neutral-400">Orders</p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-3 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {totalItems}
          </span>
          <p className="text-[10px] uppercase text-neutral-400">Cart Items</p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-3 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(totalSpent)}
          </span>
          <p className="text-[10px] uppercase text-neutral-400">Spent</p>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 space-y-3">
        {/* Theme */}
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div>
            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              Appearance
            </p>
            <p className="text-[11px] text-neutral-500">
              {theme === "dark" ? "Dark mode active" : "Light mode active"}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {theme === "dark" ? <IconSun className="h-3.5 w-3.5" /> : <IconMoon className="h-3.5 w-3.5" />}
            <span className="capitalize">{theme} Mode</span>
          </button>
        </div>

        {/* Orders link */}
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div>
            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              Order Tracking
            </p>
            <p className="text-[11px] text-neutral-500">
              Check delivery status and timeline
            </p>
          </div>
          <Link
            to="/orders"
            className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
          >
            Orders →
          </Link>
        </div>

        {/* Reset Demo Data */}
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div>
            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              Reset Demo Data
            </p>
            <p className="text-[11px] text-neutral-500">
              Clear demo orders and local cart
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetData}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Reset
          </button>
        </div>

        {resetMessage && (
          <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            ✓ {resetMessage}
          </p>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-neutral-200 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
