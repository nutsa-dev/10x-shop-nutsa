import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-white py-6 text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <p>© 2026 10X Shop</p>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
            Catalog
          </Link>
          <Link to="/cart" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
            Cart
          </Link>
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-900 dark:hover:text-stone-100 transition"
          >
            DummyJSON API ↗
          </a>
        </div>
      </div>
    </footer>
  );
};