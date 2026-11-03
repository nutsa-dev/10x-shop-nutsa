import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { IconBulbOff, IconBulbOn, IconCart, IconUser } from "@/components/ui/Icons";

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
    <header className="wood-plank-header sticky top-0 z-40 w-full">
      <div className="relative z-10 container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand & Engraved Plank Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-9">
          <Link
            to="/"
            className="wood-engraved flex items-center gap-2 text-xs sm:text-sm uppercase"
          >
            <span>KURA // Atelier Objects</span>
          </Link>

          <nav className="flex items-center gap-5">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `wood-engraved relative py-1 text-xs uppercase transition-opacity duration-300 ${
                  isActive
                    ? "opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#2C4032] after:transition-colors after:duration-500 dark:after:bg-[#D49B4B]"
                    : "opacity-65 hover:opacity-100"
                }`
              }
            >
              Collection
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `wood-engraved relative py-1 text-xs uppercase transition-opacity duration-300 ${
                  isActive
                    ? "opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#2C4032] after:transition-colors after:duration-500 dark:after:bg-[#D49B4B]"
                    : "opacity-65 hover:opacity-100"
                }`
              }
            >
              Orders
            </NavLink>
          </nav>
        </div>

        {/* Right Actions: Clean Balance */}
        <div className="flex items-center gap-3">
          {/* Realistic Edison Lightbulb Theme Switcher (Lit on Light Mode, Unlit on Dark Mode) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Turn off light (Dark mode)" : "Turn on light (Light mode)"}
            title={theme === "light" ? "Turn off light (Dark mode)" : "Turn on light (Light mode)"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 hover:scale-110 active:scale-95"
          >
            <IconBulbOn
              className={`absolute h-7 w-7 drop-shadow-[0_0_10px_rgba(251,191,36,0.95)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                theme === "light"
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            />
            <IconBulbOff
              className={`absolute h-7 w-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                theme === "dark"
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            />
          </button>

          {/* Primary Tactile Cart Badge */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs ${
                isActive ? "wood-btn-walnut" : "wood-btn"
              }`
            }
          >
            <IconCart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="font-mono text-[11px]">({totalItems})</span>
          </NavLink>

          {/* User Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 pl-1">
              <NavLink
                to="/profile"
                className="wood-engraved flex items-center gap-1.5 text-xs opacity-85 hover:opacity-100"
              >
                <IconUser className="h-3.5 w-3.5" />
                <span className="max-w-[75px] truncate">{user?.username}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="wood-engraved hidden sm:inline-block text-[11px] uppercase opacity-65 hover:opacity-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="wood-btn-walnut flex h-9 items-center rounded-lg px-3.5 text-xs"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};
