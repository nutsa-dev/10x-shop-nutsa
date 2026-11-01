import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { IconCart, IconMoon, IconSun, IconUser } from "@/components/ui/Icons";

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
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90 transition-colors">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        
        {/* Brand & Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-extrabold tracking-tight text-neutral-950 dark:text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 text-[11px] font-black text-white dark:bg-white dark:text-neutral-950">
              10X
            </span>
            <span className="tracking-widest uppercase text-xs font-bold text-neutral-900 dark:text-white">
              Alpine
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  isActive
                    ? "bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`
              }
            >
              Catalog
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  isActive
                    ? "bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`
              }
            >
              Orders
            </NavLink>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
          >
            {theme === "dark" ? (
              <IconSun className="h-3.5 w-3.5" />
            ) : (
              <IconMoon className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition ${
                isActive
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`
            }
          >
            <IconCart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="text-[11px] font-bold">({totalItems})</span>
          </NavLink>

          {/* User Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 pl-1">
              <NavLink
                to="/profile"
                className="flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200 px-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <IconUser className="h-3.5 w-3.5" />
                <span className="max-w-[70px] truncate">{user?.username}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:inline-block text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-1.5"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex h-8 items-center rounded-lg bg-neutral-900 px-3 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};
