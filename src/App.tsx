import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";

// Route-level code splitting (React.lazy)
const CatalogPage = lazy(() =>
  import("@/pages/CatalogPage").then((m) => ({ default: m.CatalogPage }))
);
const ProductPage = lazy(() =>
  import("@/pages/ProductPage").then((m) => ({ default: m.ProductPage }))
);
const CartPage = lazy(() =>
  import("@/pages/CartPage").then((m) => ({ default: m.CartPage }))
);
const CheckoutPage = lazy(() =>
  import("@/pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage }))
);
const OrdersPage = lazy(() =>
  import("@/pages/OrdersPage").then((m) => ({ default: m.OrdersPage }))
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((m) => ({ default: m.ProfilePage }))
);
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

const RouteLoadingFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#8C6D58] border-t-transparent" />
      <span className="text-xs text-[#736B63]">
        Loading...
      </span>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Suspense fallback={<RouteLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<CatalogPage />} />
                    <Route path="products/:id" element={<ProductPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route
                      path="checkout"
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/:id" element={<OrdersPage />} />
                    <Route
                      path="profile"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
