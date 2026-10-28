# 10X Shop — E-Commerce Single Page Application (SPA)

> **Front-end Diploma Project | 10X Developer Program 2026**  
> Built with **React 19**, **TypeScript** (strict mode), and **Tailwind CSS v4** powered by the **DummyJSON API**.  
> 🔗 **Live URL:** [https://10x-shop-nutsa.vercel.app/](https://10x-shop-nutsa.vercel.app/)

---

## 📌 About the Project

**10X Shop** is a modern, responsive, client-side e-commerce web application engineered to deliver a seamless shopping experience. Customers can explore a dynamic product catalog with search, category filtering, and sorting, inspect comprehensive product detail pages, manage a persistent shopping cart, and complete an order through a validated checkout flow.

The project demonstrates production-grade React architecture, immutable state flows, strict TypeScript type safety (`strict: true`, zero `any` usage), and utility-first styling with Tailwind CSS v4.

---

## 🛠 Tech Stack

| Technology | Purpose | Notes |
| :--- | :--- | :--- |
| **React 19** | UI Framework | Functional components, Hooks, Context API |
| **TypeScript (Strict)** | Static Typing | `strict: true`, custom interfaces, zero `any` |
| **Vite** | Build Tool & Dev Server | Fast HMR, optimized production build |
| **Tailwind CSS v4** | Styling & Design System | Utility-first, `@tailwindcss/vite`, CSS-first config |
| **React Router v7 / v6** | Client-side Routing | Single Layout (`Outlet`), dynamic routes, 404 catch-all |
| **DummyJSON API** | Backend Data Source | Products, categories, search endpoints |
| **Context API & Hooks** | State Management | `AuthContext`, `CartContext`, custom hooks |
| **LocalStorage** | Persistence | Cart (`shop_cart`), Theme (`shop_theme`), Orders |

---

## 🏛 Architecture & Data Flow

### Architecture Highlights
- **Single Page Architecture (SPA):** A single root layout (`Navbar`, `<Outlet />`, `Footer`) wraps all pages to eliminate redundant shell renders.
- **Unidirectional Golden Cycle:**  
  `User Action (Event)` ➔ `Handler` ➔ `State / Context Function` ➔ `New Immutable State` ➔ `React Re-render`.
- **Side-Effects Isolation:** API calls run in `useEffect` or dedicated API modules, displaying dedicated `Loading`, `Error`, and `Empty` states.
- **Separation of Concerns:** Business logic lives in models/utilities and Context providers; presentation stays in modular, reusable components.

### Directory Structure
```text
src/
├── api/                  # API client & fetch functions (DummyJSON)
│   ├── products.api.ts   # Product fetching, search, categories
│   └── ApiClient.ts      # (FULL) Typed generic HTTP client & error handler
├── types/                # Domain models & TypeScript interfaces
│   ├── product.ts        # Product, Review, Category, ProductsResponse
│   ├── cart.ts           # CartItem, CartState, CartAction
│   ├── user.ts           # AuthUser, LoginFormValues
│   ├── order.ts          # Order, ShippingInfo, OrderStatus
│   └── api.ts            # AsyncState<T> generic union
├── context/              # Global React Context providers
│   ├── AuthContext.tsx   # Login/Logout state & simulated session
│   ├── CartContext.tsx   # Global cart state, items badge, total calculations
│   └── ThemeContext.tsx  # Dark / Light theme toggle
├── hooks/                # Custom React hooks
│   ├── useDebounce.ts    # Debounce input for search (400ms)
│   ├── useFetch.ts       # Generic async data fetching hook
│   └── useLocalStorage.ts# LocalStorage state synchronization
├── components/           # Reusable UI & Layout components
│   ├── layout/           # Navbar, Footer, Layout wrapper, ScrollToTop
│   ├── ui/               # Button, Input, Modal, Toast, Badge, Spinner
│   ├── product/          # ProductCard, ProductGrid, PriceTag, StockBadge
│   └── cart/             # CartItemRow, CartSummary, CartBadge
├── pages/                # Route Page Views
│   ├── CatalogPage.tsx   # Product list, search, filter, sort, pagination
│   ├── ProductPage.tsx   # Product details, gallery, stock stepper, reviews
│   ├── CartPage.tsx      # Cart items, promo code, quantity adjustments
│   ├── CheckoutPage.tsx  # Controlled shipping form, local place-order
│   ├── LoginPage.tsx     # Controlled login form with validation
│   ├── OrdersPage.tsx    # (FULL) Order history & status simulation
│   ├── ProfilePage.tsx   # (FULL) User profile edit & data reset
│   └── NotFoundPage.tsx  # 404 fallback page
├── utils/                # Pure utility functions
│   ├── format.ts         # formatPrice, formatDate, discountedPrice
│   ├── validation.ts     # Email, required fields validation rules
│   └── url.ts            # Query string URL builders
├── App.tsx               # Root application routes
└── main.tsx              # Application entrypoint
```

---

## 🎯 Project Scope: CORE vs. FULL

### 🟢 CORE (Mandatory Requirements)
- **Authentication Simulation:** Controlled login form (username + password validation), `AuthContext`, guest checkout redirect.
- **Product Catalog (`/`):** Fetch products from DummyJSON, render responsive grid (`ProductCard`), loading/error/empty states.
- **Product Details (`/products/:id`):** `useParams`, dynamic fetching, price calculation, stock indicator, stepper, Add to Cart, 404 handling.
- **Shopping Cart (`/cart`):** Add, update quantity, remove item, clear cart, calculate subtotal and total, live Header cart badge.
- **Checkout (`/checkout`):** Protected route for guests, controlled form (`fullName`, `email`, `address`, `city`), required validation, local order summary confirmation ("Thank you!").
- **Layout & Routing:** Single layout (`Navbar` + `Footer`), active NavLinks, catch-all 404 page, `ScrollToTop`.
- **Responsive Design:** Mobile-first (375px) up to 1440px desktop, no horizontal scroll, min 44px touch targets.
- **Code Quality:** `strict: true` TypeScript (0 errors), zero `any`, Tailwind CSS v4 styling, clean Git history.

### 🔵 FULL (Extended Advanced Features)
- **Advanced Catalog:** Debounced search (`400ms`), category dropdown filter, price/rating/name sorting, pagination, URL-persisted search parameters (`useSearchParams`).
- **Order Management (`/orders`, `/orders/:id`):** Order history saved to `shop_orders`, status simulation timeline (`Processing` ➔ `Shipped` ➔ `Delivered`).
- **Profile & Theming (`/profile`):** User profile editing, Light/Dark theme toggle via Tailwind CSS.
- **Cart Enhancements:** Promo code system (`10X10` for -10% discount), out-of-stock edge cases.
- **Product Extras:** Product reviews, related products recommendation row.
- **Architecture & Performance:** Route-level code splitting (`React.lazy` + `Suspense`), Lighthouse score targets (Perf ≥ 85, A11y ≥ 90), typed `ApiClient` with `ApiError` class.

---

## ⚡ How to Run Locally

### Prerequisites
- Node.js (version 20+ recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/nutsa-dev/10x-shop-nutsa.git

# Navigate into project directory
cd 10x-shop-nutsa

# Install dependencies
npm install
```

### Available Scripts
```bash
npm run dev        # Starts Vite local development server (http://localhost:5173)
npm run build      # Performs TypeScript typecheck and generates production bundle
npm run preview    # Previews production build locally
npm run typecheck  # Executes TypeScript compiler verification without emitting files
npm run lint       # Runs ESLint code style and hook rules check
```

---

## 👤 Test Credentials & Live Demo

- **Live Deployment:** [https://10x-shop-nutsa.vercel.app/](https://10x-shop-nutsa.vercel.app/)
- **Demo User Account:**
  - **Username:** `emilys`
  - **Password:** `emilyspass` *(or any valid credentials ≥ 6 characters)*

---

## 📄 License & Credits
Developed by **Nutsa** for the **10X Front-end Diploma Project (2026)**.  
Guided by the 10X Developer Mentorship & Community.
