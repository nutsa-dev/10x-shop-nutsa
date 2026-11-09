import * as Yup from "yup";

export const checkoutSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name must be at least 3 characters"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .required("Address must be at least 5 characters"),
  city: Yup.string()
    .trim()
    .min(2, "City is required")
    .required("City is required"),
});

export type CheckoutSchemaType = Yup.InferType<typeof checkoutSchema>;

