import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white py-8 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-neutral-900 dark:text-white">10X Alpine</span>
          <span>— Winter Sports Equipment</span>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <Link to="/" className="hover:text-neutral-900 dark:hover:text-white transition">
            Catalog
          </Link>
          <Link to="/cart" className="hover:text-neutral-900 dark:hover:text-white transition">
            Cart
          </Link>
          <Link to="/orders" className="hover:text-neutral-900 dark:hover:text-white transition">
            Orders
          </Link>
          <Link to="/profile" className="hover:text-neutral-900 dark:hover:text-white transition">
            Account
          </Link>
        </div>

        <p className="text-[11px] text-neutral-400">© 2026 10X Alpine</p>
      </div>
    </footer>
  );
};
