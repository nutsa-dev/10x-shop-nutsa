import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-[#E8E1D5] bg-[#F7F4EC] text-[#6E6258] dark:border-stone-800 dark:bg-[#161412] dark:text-stone-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        
        {/* ბრენდი და საავტორო უფლებები */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-serif text-lg font-bold text-[#2C241E] dark:text-stone-100">
            10X Shop — Nordic Living
          </span>
          <p className="text-xs text-[#85776C] dark:text-stone-500">
            © 2026 Sustainable & Handcrafted Home Essentials.
          </p>
        </div>

        {/* ნავიგაცია და რესურსები */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
          <Link to="/" className="transition hover:text-[#7A533E] dark:hover:text-stone-200">
            Catalog
          </Link>
          <Link to="/cart" className="transition hover:text-[#7A533E] dark:hover:text-stone-200">
            Cart
          </Link>
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#7A533E] dark:hover:text-stone-200"
          >
            DummyJSON API ↗
          </a>
        </div>

      </div>
    </footer>
  );
};