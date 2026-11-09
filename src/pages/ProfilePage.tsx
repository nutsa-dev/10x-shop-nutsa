import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/format";
import {
  IconBulbOff,
  IconBulbOn,
  IconSoundOff,
  IconSoundOn,
} from "@/components/ui/Icons";
import {
  isSoundEnabled,
  playWoodTap,
  setSoundEnabled,
  subscribeSoundEnabled,
} from "@/utils/sound";
import { storageGetJSON, storageRemove } from "@/utils/storage";
import { profileSchema } from "@/schemas/profileSchema";
import type { Order } from "@/types/order";

export const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const { totalItems, clearCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    enableReinitialize: true,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      updateUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
      });
      setProfileSuccess("Profile updated successfully!");
      setTimeout(() => setProfileSuccess(null), 3000);
    },
  });

  useEffect(() => {
    return subscribeSoundEnabled(setSoundOn);
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) {
      playWoodTap("soft", true);
    }
  };

  const [orders, setOrders] = useState<Order[]>(() => {
    const all = storageGetJSON<Order[]>("shop_orders", []);
    return all.filter((o) => o.username === user?.username || !o.username);
  });

  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const totalSpent = orders.reduce((acc, curr) => acc + curr.total, 0);

  const handleResetData = () => {
    storageRemove("shop_orders");
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
    <div className="mx-auto max-w-2xl px-3.5 sm:px-6 py-5 sm:py-10">
      <div className="tactile-card mb-4 sm:mb-6 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4">
        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
          Account & Settings
        </h1>
        <p className="text-xs text-[#5C4938] dark:text-[#D8C2A8]">
          Logged in as <strong className="text-[#26170C] dark:text-[#F5EBE0]">{user?.username}</strong>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <div className="tactile-card rounded-xl p-2.5 sm:p-3.5 text-center">
          <span className="text-base sm:text-lg font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
            {orders.length}
          </span>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#5C4938] dark:text-[#D8C2A8]">Orders</p>
        </div>
        <div className="tactile-card rounded-xl p-2.5 sm:p-3.5 text-center">
          <span className="text-base sm:text-lg font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
            {totalItems}
          </span>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#5C4938] dark:text-[#D8C2A8]">Cart Objects</p>
        </div>
        <div className="tactile-card rounded-xl p-2.5 sm:p-3.5 text-center">
          <span className="text-base sm:text-lg font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
            {formatPrice(totalSpent)}
          </span>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#5C4938] dark:text-[#D8C2A8]">Spent</p>
        </div>
      </div>

      {/* Edit Profile Form (PRD F-P7-01) */}
      <div className="mt-5 sm:mt-6 tactile-card rounded-2xl p-4 sm:p-6">
        <div className="mb-3">
          <h2 className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0] uppercase tracking-wider">
            Edit Profile
          </h2>
          <p className="text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
            Update your personal information saved to your device.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-[11px] font-bold text-[#5C4938] dark:text-[#D8C2A8] mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. John"
                className="wood-input w-full rounded-xl px-3 py-2 text-xs font-medium outline-none"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-[11px] font-bold text-[#5C4938] dark:text-[#D8C2A8] mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. Doe"
                className="wood-input w-full rounded-xl px-3 py-2 text-xs font-medium outline-none"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-[11px] font-bold text-[#5C4938] dark:text-[#D8C2A8] mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. user@example.com"
              className="wood-input w-full rounded-xl px-3 py-2 text-xs font-medium outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="wood-btn rounded-lg px-4 py-2 text-xs"
            >
              Save Profile
            </button>
            {profileSuccess && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ {profileSuccess}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Settings */}
      <div className="mt-5 sm:mt-6 space-y-3">
        {/* Theme */}
        <div className="tactile-card flex items-center justify-between gap-3 rounded-xl p-3.5 sm:p-4">
          <div className="min-w-0">
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
            className="wood-btn shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs"
          >
            {theme === "light" ? (
              <IconBulbOn className="h-5 w-5 drop-shadow-[0_0_6px_rgba(251,191,36,0.85)]" />
            ) : (
              <IconBulbOff className="h-5 w-5" />
            )}
            <span className="capitalize">{theme} Mode</span>
          </button>
        </div>

        {/* Wood Tap Sound Effects */}
        <div className="tactile-card flex items-center justify-between gap-3 rounded-xl p-3.5 sm:p-4">
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0]">
              Tactile Wood Sound
            </p>
            <p className="text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
              {soundOn ? "Acoustic wood knock active on click" : "Sound effects muted"}
            </p>
          </div>
          <button
            type="button"
            data-sound-ignore="true"
            onClick={handleToggleSound}
            className="wood-btn shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs"
          >
            {soundOn ? (
              <IconSoundOn className="h-4 w-4" />
            ) : (
              <IconSoundOff className="h-4 w-4 opacity-60" />
            )}
            <span>{soundOn ? "Sound On" : "Muted"}</span>
          </button>
        </div>

        {/* Orders link */}
        <div className="tactile-card flex items-center justify-between gap-3 rounded-xl p-3.5 sm:p-4">
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0]">
              Order Tracking
            </p>
            <p className="text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
              Check delivery status and timeline
            </p>
          </div>
          <Link
            to="/orders"
            className="wood-btn shrink-0 rounded-lg px-3.5 py-1.5 text-xs"
          >
            Orders →
          </Link>
        </div>

        {/* Reset Demo Data */}
        <div className="tactile-card flex items-center justify-between gap-3 rounded-xl p-3.5 sm:p-4">
          <div className="min-w-0">
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
            className="wood-btn shrink-0 rounded-lg px-3 py-1.5 text-xs"
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
