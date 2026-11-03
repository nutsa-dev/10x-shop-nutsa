import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="wood-plank-footer relative z-10 mt-auto py-8 text-xs">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="wood-engraved uppercase">
            KURA // Atelier Objects
          </span>
          <span className="hidden sm:inline font-semibold text-[#3B2311] dark:text-[#D8C2A8]">
            — Curated Objects for Mindful Living
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link to="/" className="wood-btn rounded-md px-2.5 py-1 text-[11px]">
            Collection
          </Link>
          <Link to="/cart" className="wood-btn rounded-md px-2.5 py-1 text-[11px]">
            Cart
          </Link>
          <Link to="/orders" className="wood-btn rounded-md px-2.5 py-1 text-[11px]">
            Orders
          </Link>
          <Link to="/profile" className="wood-btn rounded-md px-2.5 py-1 text-[11px]">
            Account
          </Link>
        </div>

        <p className="wood-engraved text-[11px]">© 2026 KURA // Atelier Objects</p>
      </div>
    </footer>
  );
};
