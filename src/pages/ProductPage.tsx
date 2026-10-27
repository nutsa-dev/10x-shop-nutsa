import { useParams, Link } from "react-router-dom";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-amber-800 hover:underline dark:text-amber-500"
      >
        ← Back to catalog
      </Link>
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          Product Details (ID: {id})
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400">
          Loading product specifications and gallery...
        </p>
      </div>
    </div>
  );
};
