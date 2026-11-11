import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { IconArrowLeft, IconEye, IconEyeOff } from "@/components/ui/Icons";
import { loginSchema, signupSchema } from "@/schemas/authSchema";
import type { LoginFormValues, RegisterFormValues } from "@/types/user";

export const LoginPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromLocation = (location.state as { from?: string } | null)?.from || "/";

  // Login formik instance
  const loginFormik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values.username);
      navigate(fromLocation, { replace: true });
    },
  });

  // Sign up formik instance
  const signupFormik = useFormik<RegisterFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      register({
        username: values.username,
        email: values.email,
      });
      navigate(fromLocation, { replace: true });
    },
  });

  const handleFillDemo = () => {
    loginFormik.setFieldValue("username", "emilys");
    loginFormik.setFieldValue("password", "emilyspass");
    setShowLoginPassword(true);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-3.5 sm:px-4 py-8 sm:py-12">
      <div className="tactile-card w-full max-w-sm rounded-2xl p-5 sm:p-6">
        <Link
          to="/"
          className="wood-btn inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs mb-4"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Back to catalog</span>
        </Link>

        {/* Tab Switcher: Log In / Sign Up */}
        <div className="grid grid-cols-2 rounded-xl bg-[#EFE8DC] p-1 text-xs font-bold dark:bg-[#19100A] mb-4">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-lg py-2 transition-all ${
              mode === "login"
                ? "wood-btn shadow-xs"
                : "text-[#5C4938] hover:text-[#26170C] dark:text-[#D8C2A8] dark:hover:text-[#F5EBE0]"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-lg py-2 transition-all ${
              mode === "signup"
                ? "wood-btn shadow-xs"
                : "text-[#5C4938] hover:text-[#26170C] dark:text-[#D8C2A8] dark:hover:text-[#F5EBE0]"
            }`}
          >
            Sign up
          </button>
        </div>

        {mode === "login" ? (
          <>
            <h1 className="text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
              Log in
            </h1>
            <p className="mt-0.5 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
              Enter your credentials to access your account
            </p>

            <form onSubmit={loginFormik.handleSubmit} noValidate className="mt-4 space-y-3.5">
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
                  value={loginFormik.values.username}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  placeholder="e.g. emilys"
                  className="mt-1.5 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
                />
                {loginFormik.touched.username && loginFormik.errors.username && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {loginFormik.errors.username}
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
                <div className="relative mt-1.5">
                  <input
                    id="password"
                    name="password"
                    type={showLoginPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-2 pr-9 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#5C4938] hover:text-[#26170C] dark:text-[#D8C2A8] dark:hover:text-[#F5EBE0] cursor-pointer"
                  >
                    {showLoginPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {loginFormik.touched.password && loginFormik.errors.password && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {loginFormik.errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="wood-btn w-full rounded-lg py-2.5 px-4 text-xs font-bold"
              >
                Log in
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
          </>
        ) : (
          <>
            <h1 className="text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
              Sign up
            </h1>
            <p className="mt-0.5 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
              Create a new 10X Shop profile
            </p>

            <form onSubmit={signupFormik.handleSubmit} noValidate className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="signup-username"
                  className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]"
                >
                  Username
                </label>
                <input
                  id="signup-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={signupFormik.values.username}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  placeholder="Choose username (min 3 chars)"
                  className="mt-1 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-1.5 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
                />
                {signupFormik.touched.username && signupFormik.errors.username && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {signupFormik.errors.username}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={signupFormik.values.email}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  placeholder="name@example.com"
                  className="mt-1 w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-1.5 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
                />
                {signupFormik.touched.email && signupFormik.errors.email && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {signupFormik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="signup-password"
                    name="password"
                    type={showSignupPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={signupFormik.values.password}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    placeholder="Min 8 chars, 1 uppercase, 1 number"
                    className="w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-1.5 pr-9 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword((prev) => !prev)}
                    aria-label={showSignupPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#5C4938] hover:text-[#26170C] dark:text-[#D8C2A8] dark:hover:text-[#F5EBE0] cursor-pointer"
                  >
                    {showSignupPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {signupFormik.touched.password && signupFormik.errors.password && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {signupFormik.errors.password}
                  </p>
                )}
              </div>
    
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-semibold text-[#26170C] dark:text-[#F5EBE0]"
                >
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={signupFormik.values.confirmPassword}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    placeholder="Repeat your password"
                    className="w-full rounded-lg border border-[#CBB092] bg-[#EFE8DC] px-3 py-1.5 pr-9 text-xs text-[#26170C] outline-none focus:border-[#8C6D58] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#5C4938] hover:text-[#26170C] dark:text-[#D8C2A8] dark:hover:text-[#F5EBE0] cursor-pointer"
                  >
                    {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {signupFormik.errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="wood-btn w-full rounded-lg py-2.5 px-4 text-xs font-bold mt-2"
              >
                Create Account
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
