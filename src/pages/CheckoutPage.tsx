import { Link } from "react-router-dom";

export const CheckoutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        Complete your shipping details below.
      </p>
      <div className="mt-6">
        <Link
          to="/cart"
          className="text-sm font-medium text-amber-800 hover:underline dark:text-amber-500"
        >
          ← Back to cart
        </Link>
      </div>
    </div>
  );
};
