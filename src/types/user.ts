export interface AuthUser {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
