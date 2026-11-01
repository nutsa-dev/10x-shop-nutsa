import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { IconArrowLeft, IconArrowRight, IconUser } from "@/components/ui/Icons";
import type { LoginFormValues } from "@/types/user";

// Yup validation schema following PRD P1.2 specifications
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

  const handleFillDemo = () => {
    formik.setFieldValue("username", "emilys");
    formik.setFieldValue("password", "emilyspass");
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md rounded-3xl border border-stone-200/90 bg-white p-7 sm:p-10 shadow-sm dark:border-stone-800 dark:bg-[#181816]">
        
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            <span>Back to catalog</span>
          </Link>
          
          <div className="mt-4 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-900 text-white shadow-xs dark:bg-stone-100 dark:text-stone-900">
              <IconUser className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
                Sign In to 10X Shop
              </h1>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Access your orders, saved cart and checkout faster
              </p>
            </div>
          </div>
        </div>

        {/* Formik Form */}
        <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
          
          {/* Username Field */}
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
              className={`mt-1.5 w-full rounded-xl border bg-stone-50/70 px-4 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-900 dark:text-stone-100 ${
                formik.touched.username && formik.errors.username
                  ? "border-rose-500 focus:border-rose-600"
                  : "border-stone-200 focus:border-stone-500 dark:border-stone-700"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Password Field */}
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
              className={`mt-1.5 w-full rounded-xl border bg-stone-50/70 px-4 py-2.5 text-xs text-stone-900 outline-none transition focus:bg-white dark:bg-stone-900 dark:text-stone-100 ${
                formik.touched.password && formik.errors.password
                  ? "border-rose-500 focus:border-rose-600"
                  : "border-stone-200 focus:border-stone-500 dark:border-stone-700"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            <span>Sign In</span>
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Demo Account Helper */}
        <div className="mt-6 border-t border-stone-100 pt-5 text-center dark:border-stone-800">
          <div className="rounded-2xl border border-stone-200/80 bg-stone-50/60 p-3.5 text-xs dark:border-stone-800 dark:bg-stone-900/40">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Demo Credentials: <span className="font-mono font-bold text-stone-800 dark:text-stone-200">emilys</span> / <span className="font-mono font-bold text-stone-800 dark:text-stone-200">emilyspass</span>
            </p>
            <button
              type="button"
              onClick={handleFillDemo}
              className="mt-2 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Fill demo credentials ↵
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
