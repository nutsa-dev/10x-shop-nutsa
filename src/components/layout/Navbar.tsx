import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  IconBulbOff,
  IconBulbOn,
  IconCart,
  IconSoundOff,
  IconSoundOn,
  IconUser,
} from "@/components/ui/Icons";
import {
  isSoundEnabled,
  playWoodTap,
  setSoundEnabled,
  subscribeSoundEnabled,
} from "@/utils/sound";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="wood-plank-header sticky top-0 z-40 w-full">
      <div className="relative z-10 mx-auto flex h-[68px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:px-10">
        
        {/* Left Zone: Editorial Brand Identity */}
        <Link
          to="/"
          className="flex items-center"
        >
          <span className="font-editorial text-lg sm:text-xl font-bold tracking-[0.12em] uppercase text-[#26170C] dark:text-[#F5EBE0]">
            WOODWORK
          </span>
        </Link>

        {/* Center Zone: Symmetrical Minimalist Navigation */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative py-1 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 ${
                isActive
                  ? "text-[#26170C] dark:text-[#F5EBE0] after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[#2C4032] dark:after:bg-[#D49B4B]"
                  : "text-[#5C4938]/80 hover:text-[#26170C] dark:text-[#D8C2A8]/75 dark:hover:text-[#F5EBE0]"
              }`
            }
          >
            Collection
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `relative py-1 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 ${
                isActive
                  ? "text-[#26170C] dark:text-[#F5EBE0] after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[#2C4032] dark:after:bg-[#D49B4B]"
                  : "text-[#5C4938]/80 hover:text-[#26170C] dark:text-[#D8C2A8]/75 dark:hover:text-[#F5EBE0]"
              }`
            }
          >
            Orders
          </NavLink>
        </nav>

        {/* Right Zone: Independent Icons (Bell, Lightbulb) + Cart & Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Independent Wooden Bell Sound Toggle (No circle container) */}
          <button
            type="button"
            data-sound-ignore="true"
            onClick={handleToggleSound}
            aria-label={soundOn ? "Mute woodshop sound" : "Enable woodshop sound"}
            title={soundOn ? "Wood sound: ON (Click to mute)" : "Wood sound: OFF (Click to enable)"}
            className="relative flex h-9 w-9 items-center justify-center text-[#5E3D20] transition-transform duration-300 hover:scale-110 active:scale-90 dark:text-[#D8C2A8]"
          >
            <IconSoundOn
              className={`absolute h-6 w-6 drop-shadow-[0_2px_3px_rgba(42,22,6,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                soundOn
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            />
            <IconSoundOff
              className={`absolute h-6 w-6 drop-shadow-[0_2px_3px_rgba(42,22,6,0.22)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                !soundOn
                  ? "scale-100 opacity-75"
                  : "scale-75 opacity-0"
              }`}
            />
          </button>

          {/* Independent Realistic Edison Lightbulb Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Turn off light (Dark mode)" : "Turn on light (Light mode)"}
            title={theme === "light" ? "Turn off light (Dark mode)" : "Turn on light (Light mode)"}
            className="relative flex h-9 w-9 items-center justify-center transition-transform duration-500 hover:scale-110 active:scale-95"
          >
            <IconBulbOn
              className={`absolute h-7 w-7 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                theme === "light"
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            />
            <IconBulbOff
              className={`absolute h-7 w-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
            <div className="flex items-center gap-2.5 pl-1">
              <NavLink
                to="/profile"
                className="group flex items-center gap-1.5 text-xs font-bold text-[#26170C] opacity-95 hover:opacity-100 dark:text-[#F5EBE0]"
              >
                <IconUser className="h-6 w-6 drop-shadow-[0_2px_3px_rgba(42,22,6,0.28)] transition-transform duration-300 group-hover:scale-110" />
                <span className="max-w-[75px] truncate">{user?.username}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-[#5C4938] hover:text-[#26170C] dark:text-[#D8C2A8] dark:hover:text-[#F5EBE0]"
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
