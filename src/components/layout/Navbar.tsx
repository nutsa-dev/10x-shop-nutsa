import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E1D5] bg-[#FBF9F5]/90 backdrop-blur-md dark:border-stone-800 dark:bg-[#191715]/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        
        {/* 1. Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#2C241E] dark:text-[#FAF7F2]"
          >
            <span className="rounded-lg bg-[#5C3D2E] px-2.5 py-1 text-sm font-black text-[#FAF7F2] shadow-xs">
              10x
            </span>
            <span className="font-serif">Shop</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? "bg-[#EFE8DD] text-[#3B2C24] dark:bg-stone-800 dark:text-[#FAF7F2]"
                    : "text-[#6E6258] hover:bg-[#F3EDE3] hover:text-[#2C241E] dark:text-stone-400 dark:hover:bg-stone-800/60"
                }`
              }
            >
              Catalog
            </NavLink>
          </nav>
        </div>

        {/* 2. Actions (Cart, Login) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Cart with Live Badge */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center gap-2 rounded-xl border border-[#DFD6C8] px-3.5 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-[#EFE8DD] text-[#2C241E] dark:bg-stone-800 dark:text-stone-100"
                  : "bg-white text-[#5C4D42] hover:bg-[#F7F4EE] dark:bg-[#201D1A] dark:text-stone-200 dark:hover:bg-stone-800"
              }`
            }
          >
            <span aria-hidden="true">🛒</span>
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5C3D2E] px-1 text-[11px] font-bold text-white">
              0
            </span>
          </NavLink>

          {/* Auth Button */}
          <Link
            to="/login"
            className="rounded-xl bg-[#3B2C24] px-4 py-2 text-xs font-semibold text-[#FAF7F2] shadow-xs transition hover:bg-[#251B15] dark:bg-stone-100 dark:text-[#2C241E] dark:hover:bg-stone-200"
          >
            Log in
          </Link>

        </div>

      </div>
    </header>
  );
};