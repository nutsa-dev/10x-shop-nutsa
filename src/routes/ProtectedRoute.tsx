import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * ProtectedRoute - დაცული მარშრუტების კომპონენტი.
 * თუ მომხმარებელი არ არის ავტორიზებული, გადაამისამართებს /login-ზე
 * და state-ში იმახსოვრებს მიმდინარე გვერდს (from: location.pathname),
 * რათა ლოგინის შემდეგ მომხმარებელი დაბრუნდეს იქ, სადაც მიდიოდა.
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    const from = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to="/login" state={{ from }} replace />;
  }

  return <>{children}</>;
};
