import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#EADBCC] bg-[#F7F5F0] py-8 text-xs text-[#736B63] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#A39A90]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider uppercase text-[#2C2724] dark:text-[#F7F5F0]">
            KURA // Atelier Objects
          </span>
          <span className="hidden sm:inline">— Curated Objects for Mindful Living</span>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <Link to="/" className="hover:text-[#2C2724] dark:hover:text-white transition-colors">
            Collection
          </Link>
          <Link to="/cart" className="hover:text-[#2C2724] dark:hover:text-white transition-colors">
            Cart
          </Link>
          <Link to="/orders" className="hover:text-[#2C2724] dark:hover:text-white transition-colors">
            Orders
          </Link>
          <Link to="/profile" className="hover:text-[#2C2724] dark:hover:text-white transition-colors">
            Account
          </Link>
        </div>

        <p className="text-[11px] text-[#736B63]">© 2026 KURA // Atelier Objects</p>
      </div>
    </footer>
  );
};
