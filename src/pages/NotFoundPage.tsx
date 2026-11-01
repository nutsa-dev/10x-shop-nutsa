import { Link } from "react-router-dom";
import { IconArrowLeft } from "@/components/ui/Icons";

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="font-mono text-5xl font-black text-neutral-300 dark:text-neutral-700">
        404
      </span>
      <h1 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Page Not Found
      </h1>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        The gear or page you are looking for does not exist.
      </p>
      <div className="mt-5">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 transition"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    </div>
  );
};
