import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/format";
import type { Order } from "@/types/order";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { totalItems, clearCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shop_orders");
      if (saved) {
        setOrders(JSON.parse(saved) as Order[]);
      }
    } catch {
      setOrders([]);
    }
  }, []);

  const totalSpent = orders.reduce((acc, curr) => acc + curr.total, 0);

  const handleResetData = () => {
    localStorage.removeItem("shop_orders");
    clearCart();
    setOrders([]);
    setResetMessage("All demo orders and cart data have been reset successfully!");
    setTimeout(() => setResetMessage(null), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-stone-200 pb-4 dark:border-stone-800">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
          User Profile & Settings
        </h1>
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
          Manage your account preferences, theme, and local demo data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column: User Card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900 flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-900 text-2xl font-bold text-white shadow-xs dark:bg-stone-100 dark:text-stone-900">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="mt-4 text-lg font-bold text-stone-900 dark:text-stone-100">
            {user?.username || "Authenticated User"}
          </h2>
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 mt-1">
            10X Diploma Student
          </span>

          <div className="mt-6 w-full border-t border-stone-100 pt-4 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400 space-y-2">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Session</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">Local Auth</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-xl border border-stone-300 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
          >
            Log Out
          </button>
        </div>

        {/* Right Column: Statistics & Preferences */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                {orders.length}
              </span>
              <p className="mt-1 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                Orders Placed
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                {totalItems}
              </span>
              <p className="mt-1 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                Cart Items
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <span className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                {formatPrice(totalSpent)}
              </span>
              <p className="mt-1 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                Total Spent
              </p>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Application Preferences
            </h3>

            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
              <div>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Theme Appearance
                </p>
                <p className="text-[11px] text-stone-400">
                  Currently active: <strong className="capitalize">{theme}</strong> mode
                </p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-xl border border-stone-300 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
              >
                <span>{theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
              <div>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Order History Shortcut
                </p>
                <p className="text-[11px] text-stone-400">
                  View tracking and simulation timelines
                </p>
              </div>

              <Link
                to="/orders"
                className="rounded-xl bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
              >
                View Orders →
              </Link>
            </div>
          </div>

          {/* Reset Demo Data Card */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 shadow-xs dark:border-rose-900/40 dark:bg-rose-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                  Reset Demo Data
                </h3>
                <p className="mt-0.5 text-xs text-rose-700 dark:text-rose-300">
                  Clear local cart, active orders, and promo codes for fresh evaluation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetData}
                className="shrink-0 rounded-xl bg-rose-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-800"
              >
                Reset Data
              </button>
            </div>

            {resetMessage && (
              <p className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                ✓ {resetMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
