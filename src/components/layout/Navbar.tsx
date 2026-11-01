import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { IconCart, IconMoon, IconSun, IconUser, IconLeaf } from "@/components/ui/Icons";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 dark:bg-stone-950 dark:text-stone-400 py-1.5 px-4 text-[11px] font-medium tracking-wide">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <IconLeaf className="h-3.5 w-3.5" />
              <span>Carbon-Neutral Delivery</span>
            </span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="hidden sm:inline">Use code <strong className="text-white dark:text-stone-200">10X10</strong> for 10% off</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span className="hidden md:inline">Nordic Eco Craftsmanship 2026</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-[#FAF9F6]/90 backdrop-blur-md dark:border-stone-800/80 dark:bg-[#121211]/90 transition-colors">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 gap-4">
          
          {/* Brand Logo & Main Nav */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link
              to="/"
              className="group flex items-center gap-2.5 transition"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-stone-900 to-stone-800 text-white shadow-xs group-hover:scale-105 transition-transform dark:from-emerald-900/80 dark:to-stone-900 dark:border dark:border-emerald-500/30">
                <span className="text-xs font-black tracking-tighter">10X</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
                  Shop
                </span>
                <span className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 dark:text-stone-500 -mt-1">
                  Nordic Living
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-1 sm:gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-stone-900 text-white shadow-xs dark:bg-stone-100 dark:text-stone-900"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800/50"
                  }`
                }
              >
                Catalog
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-stone-900 text-white shadow-xs dark:bg-stone-100 dark:text-stone-900"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800/50"
                  }`
                }
              >
                Orders
              </NavLink>
            </nav>
          </div>

          {/* Actions: Theme Toggle, Cart, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 shadow-2xs hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white transition"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            >
              {theme === "dark" ? (
                <IconSun className="h-4 w-4 text-amber-400" />
              ) : (
                <IconMoon className="h-4 w-4 text-stone-600" />
              )}
            </button>

            {/* Shopping Cart Pill Button with Badge */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `group relative flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition-all ${
                  isActive
                    ? "border-emerald-600/40 bg-emerald-50/80 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "border-stone-200 bg-white text-stone-700 shadow-2xs hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
                }`
              }
            >
              <IconCart className="h-4 w-4 text-stone-600 group-hover:text-stone-900 dark:text-stone-400 dark:group-hover:text-white transition-colors" />
              <span className="hidden sm:inline">Cart</span>
              
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-transform ${
                  totalItems > 0
                    ? "bg-emerald-700 text-white scale-100 shadow-xs dark:bg-emerald-500 dark:text-stone-950"
                    : "bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                }`}
              >
                {totalItems}
              </span>
            </NavLink>

            {/* User Profile or Login CTA */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 pl-1 border-l border-stone-200 dark:border-stone-800">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex h-9 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-semibold transition ${
                      isActive
                        ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                        : "border-stone-200 bg-white text-stone-700 shadow-2xs hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
                    }`
                  }
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                    {user?.username ? user.username.charAt(0).toUpperCase() : <IconUser className="h-3 w-3" />}
                  </div>
                  <span className="max-w-[70px] truncate sm:max-w-[90px]">{user?.username}</span>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden sm:flex h-9 items-center justify-center rounded-xl border border-stone-200 bg-white px-2.5 text-xs font-medium text-stone-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-rose-900 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition"
                  title="Sign out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex h-9 items-center gap-1.5 rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
              >
                <IconUser className="h-3.5 w-3.5" />
                <span>Log in</span>
              </Link>
            )}

          </div>

        </div>
      </header>
    </>
  );
};
