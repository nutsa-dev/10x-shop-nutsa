import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Sign In
        </h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          Enter your credentials to access your account.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="text-sm font-medium text-amber-800 hover:underline dark:text-amber-500"
          >
            ← Back to catalog
          </Link>
        </div>
      </div>
    </div>
  );
};
