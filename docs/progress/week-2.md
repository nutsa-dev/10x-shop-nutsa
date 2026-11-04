# Week 2 Progress Note — 10X Shop

**Date:** February 2026  
**Developer:** Nutsa Beradze  
**Milestone:** Catalog API Integration, Cart Logic & Checkout Validation  

---

## 1. Objectives & Summary
Week 2 focused on connecting live external product data via DummyJSON API, implementing strict URL-as-single-source-of-truth state synchronization, establishing complete cart quantity clamps, and building a validated multi-step checkout workflow.

## 2. Implemented Features
- **API Architecture (`src/api/products.api.ts`):**
  - Integrated `GET https://dummyjson.com/products?limit=12&skip=0` for standard catalog loads (satisfying auto-grader C-P2-01).
  - Implemented 400ms search input debounce (`useDebounce`) with automatic query syncing into URL (`?q=...`).
  - Implemented server-side category filters (`/products/category/:category`) and 5 sort criteria (`price-asc`, `price-desc`, `rating-desc`, `title-asc`, `featured`).
  - Created custom `ApiError` class extending `Error` with HTTP status code support (PRD F-T02).
  - Built network abort controller (`AbortController`) to cleanly handle race conditions and cancelled requests during typing.
- **Cart & Stock Safeguards:**
  - Enforced `1 ≤ quantity ≤ stock` limit on product card and cart item steppers.
  - Decrement `−` button properly disabled at quantity 1 (PRD C-P4-03).
  - When in-cart quantity reaches product stock, disabled button reflects `"Max stock in cart"` (PRD C-P3-05).
  - Added promo code engine (`10X10` for 10% discount).
- **Checkout Page (`/checkout`):**
  - Built protected checkout route requiring authentication.
  - Formik + Yup schema validation ensuring full name (≥ 2 words), valid email, street address (≥ 5 chars), and city.
  - Mathematical integrity check: Subtotal − Promo Discount = Total without double counting.

## 3. Challenges & Technical Solutions
- **Out-of-range Pagination Clamping:** When searching narrows down results, the current page could exceed `totalPages`. Added `useEffect` clamping to automatically redirect out-of-range pages back to the last valid page.
- **Formik + Yup Synchronous Validation:** Ensured all touched fields display red feedback without causing jitter or layout shifts.

## 4. Next Steps for Week 3
- Add dynamic order tracking simulation with 30-second timeline intervals (`Processing` → `Shipped` → `Delivered`).
- Implement curated artisanal categories (`Christmas Market`, `Wooden Toys`) with high-resolution photography.
- Add product tabs, write a review modal, profile editor, and deep-link dynamic routes (`/orders/:id`).
