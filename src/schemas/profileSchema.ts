import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
});

export type ProfileSchemaType = Yup.InferType<typeof profileSchema>;

