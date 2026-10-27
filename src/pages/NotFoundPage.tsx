import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl font-black tracking-tight text-amber-800/40 dark:text-amber-500/40">
        404
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-2 text-base text-stone-600 dark:text-stone-400">
        The page you are looking for does not exist.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          Go to catalog
        </Link>
      </div>
    </div>
  );
};
