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
      <div className="w-full max-w-sm rounded-2xl border border-[#EADBCC] bg-white p-6 shadow-[0_4px_20px_rgba(44,39,36,0.04)] dark:border-[#332C27] dark:bg-[#24201D]">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-[#736B63] hover:text-[#2C2724] dark:hover:text-white mb-4"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Collection</span>
        </Link>

        <h1 className="text-xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
          Sign In
        </h1>
        <p className="mt-0.5 text-xs text-[#736B63]">
          Access your KURA // Atelier Objects account
        </p>

        <form onSubmit={formik.handleSubmit} noValidate className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium text-[#2C2724] dark:text-[#F7F5F0]"
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
              className="mt-1.5 w-full rounded-lg border border-[#EADBCC] bg-[#F7F5F0] px-3 py-2 text-xs text-[#2C2724] outline-none focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#F7F5F0]"
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
              className="block text-xs font-medium text-[#2C2724] dark:text-[#F7F5F0]"
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
              className="mt-1.5 w-full rounded-lg border border-[#EADBCC] bg-[#F7F5F0] px-3 py-2 text-xs text-[#2C2724] outline-none focus:border-[#8C6D58] dark:border-[#332C27] dark:bg-[#191614] dark:text-[#F7F5F0]"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-[11px] text-rose-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#8C6D58] hover:bg-[#735744] py-2.5 px-4 text-xs font-medium text-white transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 border-t border-[#EADBCC] pt-3 text-center dark:border-[#332C27]">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-[#736B63] hover:text-[#2C2724] dark:hover:text-white"
          >
            Use demo login (<span className="font-mono text-[#8C6D58]">emilys</span>)
          </button>
        </div>
      </div>
    </div>
  );
};
