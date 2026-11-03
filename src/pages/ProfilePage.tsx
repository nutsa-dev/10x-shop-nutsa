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
      <div className="mb-6 border-b border-[#EADBCC] pb-4 dark:border-[#332C27]">
        <h1 className="text-xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
          Account & Settings
        </h1>
        <p className="text-xs text-[#736B63]">
          Logged in as <strong className="text-[#2C2724] dark:text-[#F7F5F0]">{user?.username}</strong>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#EADBCC] bg-white p-3.5 text-center dark:border-[#332C27] dark:bg-[#24201D]">
          <span className="text-lg font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            {orders.length}
          </span>
          <p className="text-[10px] uppercase tracking-wider text-[#736B63]">Orders</p>
        </div>
        <div className="rounded-xl border border-[#EADBCC] bg-white p-3.5 text-center dark:border-[#332C27] dark:bg-[#24201D]">
          <span className="text-lg font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            {totalItems}
          </span>
          <p className="text-[10px] uppercase tracking-wider text-[#736B63]">Cart Objects</p>
        </div>
        <div className="rounded-xl border border-[#EADBCC] bg-white p-3.5 text-center dark:border-[#332C27] dark:bg-[#24201D]">
          <span className="text-lg font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            {formatPrice(totalSpent)}
          </span>
          <p className="text-[10px] uppercase tracking-wider text-[#736B63]">Spent</p>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 space-y-3">
        {/* Theme */}
        <div className="flex items-center justify-between rounded-xl border border-[#EADBCC] bg-white p-4 dark:border-[#332C27] dark:bg-[#24201D]">
          <div>
            <p className="text-xs font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
              Appearance
            </p>
            <p className="text-[11px] text-[#736B63]">
              {theme === "dark" ? "Dark mode active" : "Light mode active"}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-lg border border-[#EADBCC] px-3 py-1.5 text-xs font-medium text-[#2C2724] hover:border-[#8C6D58] dark:border-[#332C27] dark:text-[#F7F5F0]"
          >
            {theme === "dark" ? <IconSun className="h-3.5 w-3.5" /> : <IconMoon className="h-3.5 w-3.5" />}
            <span className="capitalize">{theme} Mode</span>
          </button>
        </div>

        {/* Orders link */}
        <div className="flex items-center justify-between rounded-xl border border-[#EADBCC] bg-white p-4 dark:border-[#332C27] dark:bg-[#24201D]">
          <div>
            <p className="text-xs font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
              Order Tracking
            </p>
            <p className="text-[11px] text-[#736B63]">
              Check delivery status and timeline
            </p>
          </div>
          <Link
            to="/orders"
            className="rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-3.5 py-1.5 text-xs font-medium text-white transition-colors"
          >
            Orders →
          </Link>
        </div>

        {/* Reset Demo Data */}
        <div className="flex items-center justify-between rounded-xl border border-[#EADBCC] bg-white p-4 dark:border-[#332C27] dark:bg-[#24201D]">
          <div>
            <p className="text-xs font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
              Reset Demo Data
            </p>
            <p className="text-[11px] text-[#736B63]">
              Clear demo orders and local cart
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetData}
            className="rounded-lg border border-[#EADBCC] px-3 py-1.5 text-xs text-[#736B63] hover:border-[#8C6D58] hover:text-[#2C2724] dark:border-[#332C27] dark:text-[#D6CEC5]"
          >
            Reset
          </button>
        </div>

        {resetMessage && (
          <p className="text-xs font-medium text-[#8C6D58]">
            ✓ {resetMessage}
          </p>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-[#EADBCC] bg-white py-2.5 text-xs font-medium text-[#2C2724] hover:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
