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
    <header className="sticky top-0 z-40 w-full border-b border-[#EADBCC] bg-[#F7F5F0]/90 backdrop-blur-md transition-colors dark:border-[#332C27] dark:bg-[#191614]/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand & Navigation Links */}
        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#2C2724] dark:text-[#F7F5F0]"
          >
            <span>KURA // Atelier Objects</span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#EADBCC]/60 text-[#2C2724] dark:bg-[#2C2724] dark:text-[#F7F5F0]"
                    : "text-[#736B63] hover:text-[#2C2724] dark:text-[#A39A90] dark:hover:text-[#F7F5F0]"
                }`
              }
            >
              Collection
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#EADBCC]/60 text-[#2C2724] dark:bg-[#2C2724] dark:text-[#F7F5F0]"
                    : "text-[#736B63] hover:text-[#2C2724] dark:text-[#A39A90] dark:hover:text-[#F7F5F0]"
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
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EADBCC] bg-white text-[#736B63] hover:border-[#8C6D58] hover:text-[#2C2724] transition-colors dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#D6CEC5]"
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
              `flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors ${
                isActive
                  ? "border-[#8C6D58] bg-[#8C6D58] text-white"
                  : "border-[#EADBCC] bg-white text-[#2C2724] hover:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
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
                className="flex h-9 items-center gap-1.5 rounded-lg border border-[#EADBCC] bg-white px-2.5 text-xs font-medium text-[#2C2724] hover:border-[#8C6D58] transition-colors dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]"
              >
                <IconUser className="h-3.5 w-3.5 text-[#8C6D58]" />
                <span className="max-w-[70px] truncate">{user?.username}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:inline-block text-xs font-medium text-[#736B63] hover:text-[#2C2724] dark:text-[#A39A90] dark:hover:text-[#F7F5F0] px-1.5"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex h-9 items-center rounded-lg bg-[#8C6D58] px-3.5 text-xs font-medium text-white hover:bg-[#735744] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};
