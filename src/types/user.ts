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
