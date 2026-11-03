import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="wood-plank-footer relative z-10 mt-auto py-7 text-xs">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-10 lg:px-16">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2C4032] dark:bg-[#D49B4B]" />
          <span className="font-editorial text-sm font-bold tracking-[0.12em] uppercase text-[#26170C] dark:text-[#F5EBE0]">
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
