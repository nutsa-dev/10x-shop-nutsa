import { Link } from "react-router-dom";

export const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Shopping Cart
      </h1>
      <div className="mt-8 rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-700">
        <p className="text-stone-600 dark:text-stone-400">
          Your cart is currently empty.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          Browse products
        </Link>
      </div>
    </div>
  );
};
