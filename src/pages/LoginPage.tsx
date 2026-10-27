import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { LoginFormValues } from "@/types/user";

// Yup ვალიდაციის სქემა PRD P1.2-ის ზუსტი ტექსტებით
const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // თუ მომხმარებელი Checkout-იდან გადმომისამართდა, შესვლის შემდეგ იქ ვაბრუნებთ
  const fromLocation = (location.state as { from?: string } | null)?.from || "/";

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values.username);
      navigate(fromLocation, { replace: true });
    },
  });

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8 dark:border-stone-800 dark:bg-stone-900">
        
        {/* სათაური */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-xs font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition"
          >
            ← Back to catalog
          </Link>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Sign In
          </h1>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Formik ფორმა */}
        <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
          
          {/* Username ველი */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. emilys"
              className={`mt-1.5 w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition dark:bg-stone-800 dark:text-stone-100 ${
                formik.touched.username && formik.errors.username
                  ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  : "border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 dark:border-stone-700 dark:focus:border-stone-300"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Password ველი */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className={`mt-1.5 w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition dark:bg-stone-800 dark:text-stone-100 ${
                formik.touched.password && formik.errors.password
                  ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  : "border-stone-300 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 dark:border-stone-700 dark:focus:border-stone-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit ღილაკი */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-stone-900 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-stone-800 active:scale-98 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Log In
          </button>
        </form>

        {/* Demo Account მინიშნება (PRD D3 მოთხოვნა) */}
        <div className="mt-6 border-t border-stone-100 pt-4 text-center dark:border-stone-800">
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Demo credentials: <span className="font-mono font-medium text-stone-700 dark:text-stone-300">emilys</span> / <span className="font-mono font-medium text-stone-700 dark:text-stone-300">emilyspass</span>
          </p>
        </div>

      </div>
    </div>
  );
};
