import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/format";
import {
  IconSun,
  IconMoon,
  IconLeaf,
  IconPackage,
  IconCart,
  IconArrowRight,
  IconCheck,
} from "@/components/ui/Icons";
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
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Header */}
      <div className="mb-8 border-b border-stone-200/80 pb-5 dark:border-stone-800/80">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
          Account & Preferences
        </h1>
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
          Manage your session, Nordic theme settings, and evaluation demo data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Left Column: User Card */}
        <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-2xs dark:border-stone-800 dark:bg-[#181816] flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-stone-900 text-2xl font-black text-white shadow-xs dark:bg-stone-100 dark:text-stone-900">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="mt-4 text-lg font-bold text-stone-900 dark:text-stone-100">
            {user?.username || "Authenticated User"}
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 mt-1.5">
            <IconLeaf className="h-3 w-3" />
            <span>10X Nordic Member</span>
          </span>

          <div className="mt-6 w-full border-t border-stone-100 pt-4 text-xs text-stone-500 dark:border-stone-800/80 dark:text-stone-400 space-y-2.5">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Session Mode</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">Local Auth</span>
            </div>
            <div className="flex justify-between">
              <span>Carbon Offset</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">100% Offset</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-2xl border border-stone-200 bg-stone-50 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Right Column: Statistics & Preferences */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-3xl border border-stone-200/90 bg-white p-4 sm:p-5 text-center shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-1">
                <IconPackage className="h-5 w-5" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                {orders.length}
              </span>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Orders
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200/90 bg-white p-4 sm:p-5 text-center shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-1">
                <IconCart className="h-5 w-5" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                {totalItems}
              </span>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Cart Items
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200/90 bg-white p-4 sm:p-5 text-center shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-1">
                <IconLeaf className="h-5 w-5" />
              </div>
              <span className="text-lg sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 truncate block">
                {formatPrice(totalSpent)}
              </span>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Total Spent
              </p>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-2xs dark:border-stone-800 dark:bg-[#181816]">
            <h3 className="text-sm font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
              Store Preferences
            </h3>

            {/* Theme Toggle */}
            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800/80">
              <div>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  Theme Appearance
                </p>
                <p className="text-[11px] text-stone-400">
                  Active style: <strong className="capitalize">{theme}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition"
              >
                {theme === "dark" ? (
                  <>
                    <IconSun className="h-3.5 w-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <IconMoon className="h-3.5 w-3.5 text-stone-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Orders shortcut */}
            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800/80">
              <div>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  Order Tracking
                </p>
                <p className="text-[11px] text-stone-400">
                  Inspect shipment steps and simulated delivery
                </p>
              </div>

              <Link
                to="/orders"
                className="inline-flex items-center gap-1 rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
              >
                <span>View Orders</span>
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Reset Demo Data Card */}
          <div className="rounded-3xl border border-rose-200/80 bg-rose-50/40 p-6 shadow-2xs dark:border-rose-900/40 dark:bg-rose-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                  Reset Demo State
                </h3>
                <p className="mt-0.5 text-xs text-rose-700 dark:text-rose-300 max-w-sm">
                  Clear local cart, saved orders, and promo codes for fresh grading or testing.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetData}
                className="shrink-0 rounded-2xl bg-rose-700 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-rose-800 transition"
              >
                Reset Data
              </button>
            </div>

            {resetMessage && (
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <IconCheck className="h-4 w-4 text-emerald-600" />
                <span>{resetMessage}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
