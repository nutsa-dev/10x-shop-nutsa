import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="wood-plank-footer relative z-10 mt-auto py-8 text-xs">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="wood-engraved uppercase">
            WOODWORK
          </span>
          <span className="hidden sm:inline font-medium text-[#3B2311]/80 dark:text-[#D8C2A8]/80">
            — Nordic Woodshop & Winter Market
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link to="/" className="wood-engraved text-[11px] uppercase opacity-75 hover:opacity-100 transition-opacity">
            Collection
          </Link>
          <Link to="/cart" className="wood-engraved text-[11px] uppercase opacity-75 hover:opacity-100 transition-opacity">
            Cart
          </Link>
          <Link to="/orders" className="wood-engraved text-[11px] uppercase opacity-75 hover:opacity-100 transition-opacity">
            Orders
          </Link>
          <Link to="/profile" className="wood-engraved text-[11px] uppercase opacity-75 hover:opacity-100 transition-opacity">
            Account
          </Link>
        </div>

        <p className="wood-engraved font-mono text-[11px] opacity-75">© 2026 WOODWORK</p>
      </div>
    </footer>
  );
};
