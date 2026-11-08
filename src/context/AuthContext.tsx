import { createContext, useContext, useState } from "react";
import type { AuthUser } from "@/types/user";
import { storageGetJSON, storageRemove, storageSet } from "@/utils/storage";

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  signIn: (username: string) => void;
  logout: () => void;
  signOut: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "shop_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = storageGetJSON<Partial<AuthUser> | null>(USER_STORAGE_KEY, null);
    return saved && typeof saved.username === "string" && saved.username.trim()
      ? {
          username: saved.username.trim(),
          firstName: typeof saved.firstName === "string" ? saved.firstName : undefined,
          lastName: typeof saved.lastName === "string" ? saved.lastName : undefined,
          email: typeof saved.email === "string" ? saved.email : undefined,
        }
      : null;
  });

  const login = (username: string) => {
    const newUser: AuthUser = {
      username: username.trim(),
    };
    setUser(newUser);
    storageSet(USER_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    storageRemove(USER_STORAGE_KEY);
  };

  const updateUser = (data: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated: AuthUser = {
        ...prev,
        ...data,
      };
      storageSet(USER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        signIn: login,
        logout,
        signOut: logout,
        updateUser,
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
