import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { IconArrowLeft } from "@/components/ui/Icons";
import type { LoginFormValues } from "@/types/user";

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
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-4"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Catalog</span>
        </Link>

        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Sign In
        </h1>
        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
          Access your orders and account
        </p>

        <form onSubmit={formik.handleSubmit} noValidate className="mt-5 space-y-3.5">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
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
              className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-[11px] text-rose-600">
                {formik.errors.username}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
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
              className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-[11px] text-rose-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-900 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 border-t border-neutral-100 pt-3 text-center dark:border-neutral-800">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            Use demo login (<span className="font-mono">emilys</span>)
          </button>
        </div>
      </div>
    </div>
  );
};
