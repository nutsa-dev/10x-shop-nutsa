# 10X Shop — Final Diploma Project Report (REPORT.md)

> **Front-end Diploma Project | 10X Developer Program 2026**  
> Author: **Nutsa**  
> Technology Stack: **React 19**, **TypeScript** (`strict: true`), **Tailwind CSS v4**, **Vite**  
> 🔗 **Live URL:** [https://10x-shop-nutsa.vercel.app/](https://10x-shop-nutsa.vercel.app/)

---

## 1. Planned vs. Delivered Checklist

| Requirement / Module | Planned Scope | Status | Delivery Details |
| :--- | :---: | :---: | :--- |
| **Authentication & Protection** | CORE | **Completed** | Simulated `AuthContext`, Formik + Yup login validation, `ProtectedRoute` with redirect back. |
| **Product Catalog** | CORE + FULL | **Completed** | Hybrid catalog (DummyJSON + Nordic eco items), 400ms debounced search, category filter, sorting, URL persistence. |
| **Product Details** | CORE + FULL | **Completed** | Dynamic route `/products/:id`, gallery, stock stepper, reviews list, related products, numeric ID validation. |
| **Shopping Cart** | CORE + FULL | **Completed** | `CartContext` with safe `localStorage` sync, quantity stepper, clear confirmation, promo code `10X10` (-10%). |
| **Checkout Flow** | CORE | **Completed** | Formik + Yup shipping form, order summary, local placement to `shop_orders`, "Thank You" confirmation screen. |
| **Orders Management** | FULL | **Completed** | `/orders` with status simulation timeline (`Processing` ➔ `Shipped` ➔ `Delivered`) and "Reorder" action. |
| **User Profile & Theming** | FULL | **Completed** | `/profile` with user statistics, Dark/Light theme toggle via Tailwind CSS, "Reset Demo Data" capability. |
| **Performance & Code Splitting** | FULL | **Completed** | `React.lazy` + `Suspense` route-level splitting, image lazy loading, 0 TypeScript errors. |
| **Resilience & Hosting** | CORE + FULL | **Completed** | Class-based `ErrorBoundary` with reload fallback, `vercel.json` SPA rewrite rules. |

---

## 2. Performance & Engineering Metrics

| Metric | Target | Result | Notes |
| :--- | :---: | :---: | :--- |
| **TypeScript Errors** | 0 | **0 Errors** | `strict: true`, zero `any`, full domain interfaces. |
| **Production Build Time** | < 2.0s | **~300ms** | Vite 8 + React 19 fast bundle compilation. |
| **Main Chunk Size (gzip)** | ≤ 250 kB | **~85 kB** | Highly optimized with route-level code splitting. |
| **Lighthouse Performance** | ≥ 85 | **96+** | Fast first contentful paint and optimized lazy chunks. |
| **Lighthouse Accessibility** | ≥ 90 | **95+** | Semantic HTML5, accessible form labels, touch targets ≥ 44px. |
| **Git Commits** | Quality History | **16+ Atomic Commits** | Conventional commit standards (`feat:`, `fix:`, `chore:`). |

---

## 3. The 3 Most Challenging Technical Problems & Solutions

### 1. Robust `localStorage` State Hydration in `CartContext`
* **Problem:** If unexpected data or non-array structures existed in `shop_cart` from previous sessions, iterating over `items` threw `TypeError: items is not iterable`.
* **Solution:** Implemented defensive parsing with `Array.isArray(parsed)`. If legacy objects with `.items` exist, it extracts the array; otherwise it safely initializes to `[]`. All dispatchers guarantee immutability and array safety.

### 2. Debounced Search Synchronization with URL Parameters
* **Problem:** Synchronizing a live search input with URL search parameters without lag or redundant re-fetching on every single keystroke.
* **Solution:** Built a custom `useDebounce(input, 400)` hook. The input remains instantly responsive locally, while the debounced value drives API requests and updates URL query parameters via `useSearchParams` using `{ replace: true }`.

### 3. Deep-Link Direct Refresh on Single Page Hosting
* **Problem:** Direct navigation or refreshing sub-routes like `/products/1` or `/checkout` on hosting providers (Vercel) initially resulted in 404 Not Found.
* **Solution:** Added a root `vercel.json` file configuring SPA rewrites so the hosting server routes all incoming paths back to the client-side `index.html`.

---

## 4. What Would I Do Differently?
In a future iteration or larger production deployment, I would implement:
1. **Server-Side Pagination:** Hooking DummyJSON's backend pagination directly with total counts into an infinite scroll or virtualized list (`tanstack-virtual`) for catalogs with 10,000+ items.
2. **State Management Tooling:** For a team environment, adopting Zustand or Redux Toolkit for complex multi-store global state management, though React 19 Context API with custom hooks was ideal for this SPA.

---

## 5. AI Assistance Summary
* **What was delegated to AI:** Initial scaffolding of repetitive interface definitions, Tailwind color palette harmonies, and drafting technical edge-case unit checks.
* **What was rejected / refined by me:** Rejected generic placeholder designs in favor of warm Nordic eco-minimalism; eliminated overly complex third-party state libraries; insisted on strict type safety without `any` casts; manually fine-tuned Formik + Yup validation messages to match the exact Diploma PRD specifications word-for-word.
