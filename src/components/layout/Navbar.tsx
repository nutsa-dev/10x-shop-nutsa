export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        
        {/* 1. Logo and Name */}
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-sm font-black text-white shadow-sm">
            10x
          </span>
          <span>Shop</span>
        </a>

        {/* 2. Searchbar */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-950"
          />
        </div>

        {/* 3. მარჯვენა მოქმედებები (თემა, კალათა, შესვლა) */}
        <div className="flex items-center gap-3">
          
          {/* რეჟიმის გადამრთველი */}
          <button
            type="button"
            aria-label="Toggle theme"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            🌙
          </button>

          {/* კალათა მთვლელით */}
          <button
            type="button"
            className="relative flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 transition"
          >
            <span>🛒 Cart</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              0
            </span>
          </button>

          {/* ავტორიზაცია */}
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </button>

        </div>

      </div>
    </header>
  );
};