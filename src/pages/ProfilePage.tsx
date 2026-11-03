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
      <div className="tactile-card mb-6 rounded-2xl px-6 py-4">
        <h1 className="text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
          Account & Settings
        </h1>
        <p className="text-xs text-[#5C4938] dark:text-[#D8C2A8]">
          Logged in as <strong className="text-[#26170C] dark:text-[#F5EBE0]">{user?.username}</strong>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="tactile-card rounded-xl p-3.5 text-center">
          <span className="text-lg font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
            {orders.length}
          </span>
          <p className="text-[10px] uppercase tracking-wider text-[#5C4938] dark:text-[#D8C2A8]">Orders</p>
        </div>
        <div className="tactile-card rounded-xl p-3.5 text-center">
          <span className="text-lg font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
            {totalItems}
          </span>
          <p className="text-[10px] uppercase tracking-wider text-[#5C4938] dark:text-[#D8C2A8]">Cart Objects</p>
        </div>
        <div className="tactile-card rounded-xl p-3.5 text-center">
          <span className="text-lg font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
            {formatPrice(totalSpent)}
          </span>
          <p className="text-[10px] uppercase tracking-wider text-[#5C4938] dark:text-[#D8C2A8]">Spent</p>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 space-y-3">
        {/* Theme */}
        <div className="tactile-card flex items-center justify-between rounded-xl p-4">
          <div>
            <p className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0]">
              Appearance
            </p>
            <p className="text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
              {theme === "dark" ? "Dark Walnut Wood active" : "Light Nordic Oak active"}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="wood-btn flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs"
          >
            {theme === "dark" ? <IconSun className="h-3.5 w-3.5" /> : <IconMoon className="h-3.5 w-3.5" />}
            <span className="capitalize">{theme} Mode</span>
          </button>
        </div>

        {/* Orders link */}
        <div className="tactile-card flex items-center justify-between rounded-xl p-4">
          <div>
            <p className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0]">
              Order Tracking
            </p>
            <p className="text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
              Check delivery status and timeline
            </p>
          </div>
          <Link
            to="/orders"
            className="wood-btn rounded-lg px-3.5 py-1.5 text-xs"
          >
            Orders →
          </Link>
        </div>

        {/* Reset Demo Data */}
        <div className="tactile-card flex items-center justify-between rounded-xl p-4">
          <div>
            <p className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0]">
              Reset Demo Data
            </p>
            <p className="text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
              Clear demo orders and local cart
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetData}
            className="wood-btn rounded-lg px-3 py-1.5 text-xs"
          >
            Reset
          </button>
        </div>

        {resetMessage && (
          <p className="wood-engraved text-xs">
            ✓ {resetMessage}
          </p>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className="wood-btn-walnut w-full rounded-lg py-2.5 text-xs"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
