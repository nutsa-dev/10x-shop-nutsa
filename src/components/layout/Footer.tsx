import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="wood-plank-footer relative z-10 mt-auto py-7 text-xs">
      <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8 lg:px-10">
        <div className="flex items-center gap-2">
          <span className="font-editorial text-sm font-bold tracking-[0.06em] uppercase text-[#26170C] dark:text-[#F5EBE0]">
            WOODWORK
          </span>
          <span className="hidden sm:inline font-medium text-[#5C4938] dark:text-[#D8C2A8]/80">
            — Nordic Woodshop & Winter Market
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link to="/" className="text-[11px] font-bold tracking-wider uppercase text-[#5C4938] hover:text-[#26170C] transition-colors dark:text-[#D8C2A8]/80 dark:hover:text-[#F5EBE0]">
            Collection
          </Link>
          <Link to="/cart" className="text-[11px] font-bold tracking-wider uppercase text-[#5C4938] hover:text-[#26170C] transition-colors dark:text-[#D8C2A8]/80 dark:hover:text-[#F5EBE0]">
            Cart
          </Link>
          <Link to="/orders" className="text-[11px] font-bold tracking-wider uppercase text-[#5C4938] hover:text-[#26170C] transition-colors dark:text-[#D8C2A8]/80 dark:hover:text-[#F5EBE0]">
            Orders
          </Link>
          <Link to="/profile" className="text-[11px] font-bold tracking-wider uppercase text-[#5C4938] hover:text-[#26170C] transition-colors dark:text-[#D8C2A8]/80 dark:hover:text-[#F5EBE0]">
            Account
          </Link>
        </div>

        <p className="font-mono text-[11px] font-medium text-[#5C4938] dark:text-[#D8C2A8]/75">© 2026 WOODWORK</p>
      </div>
    </footer>
  );
};
