import { Link } from "react-router-dom";
import { IconLeaf, IconShield, IconTruck } from "@/components/ui/Icons";

export const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-white text-stone-600 dark:border-stone-800 dark:bg-[#151514] dark:text-stone-400 transition-colors mt-auto">
      {/* Brand Values / Sustainability Strip */}
      <div className="border-b border-stone-100 dark:border-stone-850 py-8 bg-[#FAF9F6]/50 dark:bg-stone-900/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                <IconLeaf className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  100% Sustainable Materials
                </h4>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  FSC-certified solid oak, recycled clay, and toxin-free eco finishes crafted for generations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                <IconTruck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Carbon-Neutral Delivery
                </h4>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Zero-plastic protective packaging with 100% carbon offset on every single shipment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                <IconShield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  30-Day Nordic Trial
                </h4>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Experience Scandinavian comfort in your home with our hassle-free return guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-stone-900 px-2.5 py-1 text-xs font-black tracking-tight text-white dark:bg-stone-100 dark:text-stone-900">
                10X
              </span>
              <span className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Shop · Nordic Living
              </span>
            </div>
            <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400 max-w-sm">
              Conscious e-commerce designed for tranquility, timeless beauty, and sustainable Scandinavian lifestyle. Single Page Application built for the 10X Developer Program 2026.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              Quick Links
            </h5>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
                  Nordic Catalog
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
                  My Orders & Tracking
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-stone-900 dark:hover:text-stone-100 transition">
                  User Account & Preferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Promo & API */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              Special Offer
            </h5>
            <div className="mt-3 rounded-xl border border-stone-200/80 bg-stone-50 p-3 text-xs dark:border-stone-800 dark:bg-stone-900/60">
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Apply coupon code at checkout:
              </p>
              <div className="mt-1.5 flex items-center justify-between font-mono font-bold text-emerald-700 dark:text-emerald-400">
                <span>10X10</span>
                <span className="text-[10px] font-sans rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  -10% OFF
                </span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-stone-400 dark:text-stone-500">
              Powered by{" "}
              <a
                href="https://dummyjson.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-stone-700 dark:hover:text-stone-300 transition"
              >
                DummyJSON API
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 border-t border-stone-100 pt-6 text-center text-xs text-stone-400 dark:border-stone-800 dark:text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 10X Shop. Handcrafted with React 19 & Tailwind CSS v4.</p>
          <p className="text-[11px]">Nutsa · Front-end Diploma Project</p>
        </div>
      </div>
    </footer>
  );
};
