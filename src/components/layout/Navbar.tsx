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
    <header className="wood-plank-header sticky top-0 z-40 w-full transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand & Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-7">
          <Link
            to="/"
            className="wood-engraved flex items-center gap-2 text-xs sm:text-sm uppercase"
          >
            <span>KURA // Atelier Objects</span>
          </Link>

          <nav className="flex items-center gap-1.5">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-xs transition-all ${
                  isActive
                    ? "wood-btn-walnut"
                    : "wood-btn"
                }`
              }
            >
              Collection
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-xs transition-all ${
                  isActive
                    ? "wood-btn-walnut"
                    : "wood-btn"
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
            className="wood-btn flex h-9 w-9 items-center justify-center rounded-lg"
          >
            {theme === "dark" ? (
              <IconSun className="h-4 w-4" />
            ) : (
              <IconMoon className="h-4 w-4" />
            )}
          </button>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs ${
                isActive ? "wood-btn-walnut" : "wood-btn"
              }`
            }
          >
            <IconCart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="text-[11px]">({totalItems})</span>
          </NavLink>

          {/* User Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 pl-1">
              <NavLink
                to="/profile"
                className="wood-btn flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs"
              >
                <IconUser className="h-3.5 w-3.5" />
                <span className="max-w-[70px] truncate">{user?.username}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="wood-btn hidden sm:inline-flex h-9 items-center rounded-lg px-2.5 text-xs"
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
