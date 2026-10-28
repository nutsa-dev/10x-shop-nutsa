# 10X Shop — Project Plan (PLAN.md)

> **Front-end Diploma Project | 10X Developer Program 2026**  
> Author: **Nutsa**  
> Stack: **React 19**, **TypeScript** (`strict: true`), **Tailwind CSS v4**, **Vite**

---

## 1. Project Goal & Scope Definition

### Project Goal
Deliver a production-ready, highly accessible, and visually captivating Nordic Eco E-Commerce Single Page Application (SPA) adhering strictly to the Diploma PRD requirements (version 1.1, 2026).

### Scope Classification

| Module | CORE (Mandatory Requirements) | FULL Scope (Extended Capabilities) |
| :--- | :--- | :--- |
| **Authentication** | Simulated `AuthContext`, Formik + Yup login, guest redirect to login. | Session persistence in `localStorage`, demo account hint. |
| **Catalog** | DummyJSON + custom eco products, loading/error states, responsive grid. | 400ms debounced search, category filter, multi-criteria sorting, URL persistence (`useSearchParams`). |
| **Product Details** | Dynamic route `/products/:id`, price/discount calculation, stock stepper, add to cart. | Customer reviews, related products recommendation row, numeric ID route validation. |
| **Shopping Cart** | CartContext state, add/update/remove/clear, total calculation, live Navbar badge. | Promo code system (`10X10` for -10% discount), max stock enforcement. |
| **Checkout** | Controlled shipping form (`fullName`, `email`, `address`, `city`), required validation, local order confirmation. | Local order storage in `shop_orders`, transition to Order Confirmed state. |
| **Orders & Profile** | N/A (Optional in CORE) | `/orders` with status simulation timeline (`Processing` ➔ `Shipped` ➔ `Delivered`), `/profile` with stats & data reset. |
| **Optimization** | Responsive 375px–1440px, Error Boundary, 0 TypeScript errors. | Route-level code splitting (`React.lazy` + `Suspense`), CLS prevention, image lazy loading. |

---

## 2. Work Breakdown Structure (WBS) & Schedule

### Week 1 (Oct 17 – Oct 23): Foundation, Architecture & Catalog
- **Setup & Infrastructure:** Vite + React 19 + TypeScript strict configuration, Tailwind CSS v4 integration. *(Estimated: 8h | Actual: 8h)*
- **Domain Modeling & Types:** TypeScript interfaces (`Product`, `CartItem`, `AuthUser`, `AsyncState`). *(Estimated: 4h | Actual: 4h)*
- **Layout & Routing:** Root layout (`Navbar`, `Footer`, `ScrollToTop`, `<Outlet />`), 404 catch-all. *(Estimated: 6h | Actual: 6h)*
- **Authentication:** `AuthContext`, Formik + Yup login form, `ProtectedRoute`. *(Estimated: 8h | Actual: 8h)*
- **Catalog Basics:** DummyJSON fetch, Nordic curated products, Skeleton loading, `ProductCard`, `ProductGrid`. *(Estimated: 10h | Actual: 10h)*

### Week 2 (Oct 24 – Oct 30): Product Details, Cart & Checkout
- **Product Details Page (`/products/:id`):** `useParams`, dynamic fetch, stock stepper, gallery preview, customer reviews, related products. *(Estimated: 12h | Actual: 11h)*
- **Shopping Cart Management:** `CartContext` with `localStorage` sync, `CartPage`, `CartItemRow`, `CartSummary`, promo code `10X10`. *(Estimated: 12h | Actual: 12h)*
- **Checkout Flow (`/checkout`):** Controlled shipping form, validation, order review, local order placement, "Thank You" confirmation screen. *(Estimated: 10h | Actual: 9h)*

### Week 3 (Oct 31 – Nov 06): FULL Scope, Optimization & Quality Assurance
- **Advanced Catalog:** 400ms `useDebounce`, category dropdown, sorting by price/rating/name, `useSearchParams`. *(Estimated: 8h | Actual: 7h)*
- **Order Management & Profile:** `/orders` with simulated timeline, `/profile` with stats & demo data reset. *(Estimated: 8h | Actual: 8h)*
- **Error Handling & Resilience:** Class-based `ErrorBoundary` with fallback, `vercel.json` SPA rewrite. *(Estimated: 4h | Actual: 4h)*
- **Performance & Documentation:** `React.lazy` route code splitting, `REPORT.md`, `DEBUG-LOG.md`, `COMPATIBILITY.md`, production build audit. *(Estimated: 6h | Actual: 6h)*

---

## 3. Risk Assessment & Mitigation Matrix

| Risk ID | Risk Description | Severity | Mitigation Strategy | Status |
| :---: | :--- | :---: | :--- | :---: |
| **R1** | DummyJSON API downtime or rate limiting. | High | Created local hybrid catalog (`custom-products.ts`) providing immediate fallback data. | Resolved |
| **R2** | `localStorage` data corruption or invalid non-array structure in `shop_cart`. | High | Implemented defensive `Array.isArray()` parsing and fallback migration in `CartContext`. | Resolved |
| **R3** | Direct deep-link refreshes (e.g. `/products/5`) causing 404 errors on hosting (Vercel). | Medium | Configured `vercel.json` SPA rewrite rule: `{ "source": "/(.*)", "destination": "/" }`. | Resolved |
| **R4** | Unused variables or strict TypeScript errors failing production build. | High | Configured `tsc --noEmit` and `tsc -b` typecheck scripts in CI/local workflows. | Resolved |

---

## 4. Definition of Done (DoD) per Task

A task is considered **Done** only when:
1. Code adheres strictly to TypeScript `strict: true` (zero `any` types).
2. Clean responsive UI on both mobile (375px) and desktop without horizontal scroll.
3. Component error/empty/loading states are handled gracefully.
4. Production build (`npm run build`) and typecheck (`npm run typecheck`) pass with 0 warnings/errors.
5. Code is committed with meaningful conventional commit messages (`feat:`, `fix:`, `refactor:`).
