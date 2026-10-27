import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-xs dark:border-stone-800 dark:bg-stone-900/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        
        {/* Brand & Main Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100"
          >
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-xs font-black text-white dark:bg-stone-100 dark:text-stone-900">
              10X
            </span>
            <span>Shop</span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "bg-stone-100 text-stone-900 font-semibold dark:bg-stone-800 dark:text-stone-100"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`
              }
            >
              Catalog
            </NavLink>
          </nav>
        </div>

        {/* Theme, Cart & Auth (PRD P0.3) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          {/* Cart with Live Badge */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium transition dark:border-stone-700 ${
                isActive
                  ? "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                  : "bg-white text-stone-700 hover:bg-stone-50 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
              }`
            }
          >
            <span>Cart</span>
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-bold text-white dark:bg-stone-100 dark:text-stone-900">
              0
            </span>
          </NavLink>

          {/* Login / Logout Area */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-medium text-stone-600 sm:inline dark:text-stone-400">
                {user?.username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 transition"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Log in
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};