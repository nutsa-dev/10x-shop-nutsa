# 10X Shop — Final Diploma Project Report (REPORT.md)

> **Front-end Diploma Project | 10X Developer Program 2026**  
> Author: **Nutsa**  
> Technology Stack: **React 19**, **TypeScript** (`strict: true`), **Tailwind CSS v4**, **Vite**  
> 🔗 **Live URL:** [https://10x-shop-nutsa.vercel.app/](https://10x-shop-nutsa.vercel.app/)

---

## 1. Planned vs. Delivered Checklist

| Requirement / Module | Planned Scope | Status | Delivery Details |
| :--- | :---: | :---: | :--- |
| **Authentication & Protection** | CORE | **Completed** | Simulated `AuthContext`, Formik + Yup login validation (`username`, `password` ≥ 6), `ProtectedRoute` with redirect back to target route. |
| **Product Catalog** | CORE + FULL | **Completed** | Full DummyJSON API integration (`limit=12`, `skip`, server search `?q=`, dynamic categories), 400ms debounced search, 5 sort criteria, URL persistence (`useSearchParams`), `AbortController`. |
| **Product Details** | CORE + FULL | **Completed** | Dynamic route `/products/:id`, multi-photo gallery, stock indicator (`In stock` / `Only N left!` / `Out of stock`), quantity stepper, tabbed specifications/description/reviews (F-P3-02), "Write a review" modal with rating composer (F-P3-03), related products, numeric ID validation with 404 fallback. |
| **Shopping Cart** | CORE + FULL | **Completed** | `CartContext` with safe `localStorage` sync, quantity stepper (`1 ≤ qty ≤ stock`), clear confirmation modal, promo code `10X10` (-10%), exact cent-accurate subtotal. |
| **Checkout Flow** | CORE | **Completed** | Formik + Yup shipping form, empty cart redirect to `/cart`, order summary, local placement to `shop_orders`, "Thank you! Your order has been placed." confirmation screen. |
| **Orders Management** | FULL | **Completed** | `/orders` and dynamic `/orders/:id` deep link route (F-P6-04) with status simulation timeline (< 1 min `Processing` ➔ 1–3 min `Shipped` ➔ > 3 min `Delivered`), 30s clock interval, and "Reorder" action. |
| **User Profile & Theming** | FULL | **Completed** | `/profile` with user statistics, Formik + Yup Edit Profile form updating localStorage (F-P7-01), Dark/Light theme toggle via Tailwind CSS `@theme`, zero-flash inline script, "Reset Demo Data" capability. |
| **Performance & Code Splitting** | FULL | **Completed** | `React.lazy` + `Suspense` route-level splitting, image lazy loading, 0 TypeScript errors with `tsc -b`. |
| **Resilience & Hosting** | CORE + FULL | **Completed** | Class-based `ErrorBoundary` with reload fallback, `vercel.json` SPA rewrite rules. |

---

## 2. Performance & Engineering Metrics

| Metric | Target | Result | Notes |
| :--- | :---: | :---: | :--- |
| **TypeScript Errors** | 0 | **0 Errors** | `strict: true`, zero `any`, full domain interfaces validated via `tsc -b`. |
| **ESLint Warnings/Errors** | 0 | **0 Errors** | Strict linting passing with 0 errors and 0 warnings. |
| **Production Build Time** | < 2.0s | **~600ms** | Vite 8 + React 19 fast bundle compilation. |
| **Main Chunk Size (gzip)** | ≤ 250 kB | **~90 kB** | Highly optimized with route-level code splitting. |
| **Lighthouse Performance** | ≥ 85 | **96+** | Fast first contentful paint and optimized lazy chunks. |
| **Lighthouse Accessibility** | ≥ 90 | **95+** | Semantic HTML5, accessible form labels, touch targets ≥ 44px. |
| **Git Commits** | Quality History | **65+ Atomic Commits** | Conventional commit standards (`feat:`, `fix:`, `chore:`, `style:`). |

---

## 3. The 3 Most Challenging Technical Problems & Solutions

### 1. Robust `localStorage` State Hydration in `CartContext`
* **Problem:** If unexpected data or non-array structures existed in `shop_cart` from previous sessions, iterating over `items` threw `TypeError: items is not iterable`.
* **Solution:** Implemented defensive parsing with `isCartItem` runtime type guards and `Array.isArray()`. If legacy objects with `.items` exist, it extracts and validates the array; otherwise it safely initializes to `[]`. All dispatchers guarantee immutability and array safety.

### 2. 400ms Debounced Search Synchronization with URL Parameters & Cancellation
* **Problem:** Synchronizing a live search input with URL search parameters without lag, redundant re-fetching, or out-of-order race conditions on every keystroke.
* **Solution:** Built a custom `useDebounce(input, 400)` hook and combined it with `AbortController`. The input remains instantly responsive locally, while the debounced value updates `?q=` in the URL using `{ replace: true }`, cancelling in-flight fetch requests before triggering a new DummyJSON query.

### 3. Deep-Link Direct Refresh on Single Page Hosting
* **Problem:** Direct navigation or refreshing sub-routes like `/products/1` or `/checkout` on hosting providers (Vercel) initially resulted in 404 Not Found.
* **Solution:** Added a root `vercel.json` file configuring SPA rewrites so the hosting server routes all incoming paths back to the client-side `index.html`.

---

## 4. What Was Deliberately Left Out of Scope and Why (რა არ გაკეთდა და რატომ)

1. **Real Backend Payment Gateway / Stripe Integration:**  
   *Reason:* PRD requirement P5 explicitly dictates that checkout must be simulated locally ("სიმულირებული შეკვეთა, ბარათის მონაცემების შეყვანა და რეალური გადახდა არ კეთდება"). Checkout collects shipping details, saves the order to `shop_orders`, and renders an instant local confirmation.
2. **Real Backend Authentication API / Database:**  
   *Reason:* PRD requirement P1 specifies an in-browser simulated session. Authentic user credentials (`username` / `password`) are validated via Formik + Yup, and user identity is persisted in `localStorage` under `shop_user` without calling an external auth server.
3. **OOP Class Hierarchies for Services:**  
   *Reason:* Modern React 19 / TypeScript best practices favor functional composition, modular API functions (`products.api.ts`, `storage.ts`), and React custom hooks over classical object-oriented inheritance. This keeps the bundle size under 90 kB gzip and eliminates boilerplate while providing 100% type safety.

---

## 5. What Would I Do Differently?
In a future iteration or larger enterprise deployment, I would implement:
1. **Server-Side Infinite Scrolling:** Hooking DummyJSON's backend pagination directly with virtualized lists (`@tanstack/react-virtual`) for catalogs with 50,000+ items.
2. **State Management Tooling:** For a multi-developer team environment, adopting Zustand or TanStack Query for caching and global store management, though React 19 Context API with custom hooks was ideal and lightweight for this SPA.

---

## 6. AI Assistance Summary
* **What was delegated to AI:** Initial scaffolding of repetitive interface definitions, Tailwind color palette harmonies, and drafting technical edge-case unit checks.
* **What was rejected / refined by me:** Rejected generic placeholder designs in favor of warm Nordic craftsmanship minimalism; eliminated overly complex third-party state libraries; insisted on strict type safety without `any` casts; manually fine-tuned Formik + Yup validation messages to match the exact Diploma PRD specifications word-for-word.
