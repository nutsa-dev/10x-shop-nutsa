import { createContext, useContext, useState } from "react";
import type { AuthUser } from "@/types/user";

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem("shop_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as AuthUser;
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (username: string) => {
    const newUser: AuthUser = {
      username: username.trim(),
      isLoggedIn: true,
    };
    setUser(newUser);
    localStorage.setItem("shop_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shop_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user?.isLoggedIn),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
