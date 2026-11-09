import * as Yup from "yup";

// Log in validation schema (Core PRD spec: min 6 chars)
export const loginSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Sign up validation schema (Exact user spec: 8 chars, 1 capital letter, 1 number)
export const signupSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Password must contain at least 1 number"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export type LoginSchemaType = Yup.InferType<typeof loginSchema>;
export type SignupSchemaType = Yup.InferType<typeof signupSchema>;

