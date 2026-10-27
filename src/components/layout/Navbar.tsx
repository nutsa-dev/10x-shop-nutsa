import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        
        {/* 1. Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
          >
            <span className="rounded-lg bg-amber-800 px-2.5 py-1 text-sm font-black text-white shadow-sm dark:bg-amber-700">
              10x
            </span>
            <span>Shop</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-stone-200/70 text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800/50 dark:hover:text-stone-200"
                }`
              }
            >
              Catalog
            </NavLink>
          </nav>
        </div>

        {/* 2. Actions (Theme, Cart, Login) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Cart with Live Badge */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-1.5 text-sm font-medium transition dark:border-stone-700 ${
                isActive
                  ? "bg-stone-200/80 text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                  : "bg-white text-stone-700 hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
              }`
            }
          >
            <span aria-hidden="true">🛒</span>
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-800 px-1 text-xs font-bold text-white dark:bg-amber-700">
              0
            </span>
          </NavLink>

          {/* Auth Button */}
          <Link
            to="/login"
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Log in
          </Link>

        </div>

      </div>
    </header>
  );
};