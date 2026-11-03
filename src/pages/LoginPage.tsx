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
    <div className="flex min-h-[70vh] items-center justify-center px-3.5 sm:px-4 py-8 sm:py-12">
      <div className="tactile-card w-full max-w-sm rounded-2xl p-5 sm:p-6">
        <Link
          to="/"
          className="wood-btn inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs mb-4"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Collection</span>
        </Link>

        <h1 className="text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
          Sign In
        </h1>
        <p className="mt-0.5 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
          Access your WOODWORK account
        </p>

        <form onSubmit={formik.handleSubmit} noValidate className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]"
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
              className="mt-1.5 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
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
              className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]"
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
              className="mt-1.5 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-[11px] text-rose-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="wood-btn w-full rounded-lg py-2.5 px-4 text-xs"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 border-t border-[#D8C2A8] pt-3 text-center dark:border-[#3D2616]">
          <button
            type="button"
            onClick={handleFillDemo}
            className="wood-btn rounded-md px-3 py-1 text-xs"
          >
            Use demo login (<span className="font-mono">emilys</span>)
          </button>
        </div>
      </div>
    </div>
  );
};
