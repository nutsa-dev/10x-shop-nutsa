import { Link } from "react-router-dom";
import { IconArrowLeft, IconLeaf } from "@/components/ui/Icons";

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto flex min-h-[65vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 mb-2">
        <IconLeaf className="h-8 w-8" />
      </div>
      
      <span className="mt-4 font-mono text-5xl sm:text-6xl font-black tracking-tight text-stone-300 dark:text-stone-700">
        404
      </span>
      
      <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
        Page Lost in the Nordic Woods
      </h1>
      
      <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm">
        The destination you are looking for has wandered away or is no longer part of our collection.
      </p>
      
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
        >
          <IconArrowLeft className="h-4 w-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    </div>
  );
};
