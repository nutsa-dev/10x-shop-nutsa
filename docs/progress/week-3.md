# Week 3 Progress Note — 10X Shop

**Date:** February 2026  
**Developer:** Nutsa Beradze  
**Milestone:** Curated Collections, Order Simulation, Product Tabs & Full Scope Completion  

---

## 1. Objectives & Summary
Week 3 was dedicated to polish, completing all FULL scope features from the Diploma PRD, expanding category choices (`All`, `Furniture`, `Home Decor`, `Christmas Market`, `Wooden Toys`) with high-resolution photography, and passing 100% of the automated grading test suites.

## 2. Implemented Features
- **Curated Handcrafted Collections:**
  - Added dedicated seasonal categories: `Christmas Market` and `Wooden Toys` alongside `Furniture` and `Home Decor`.
  - Curated 10 bespoke handcrafted items with multi-photo image galleries, authentic customer reviews, and high-resolution Unsplash photography.
  - Intercepted `/products/category/wooden-toys` and `/products/category/christmas-market` seamlessly in `products.api.ts` while delegating `All`, `Furniture`, and `Home Decor` to live DummyJSON endpoints.
- **Product Page Tabs & Client Reviews (F-P3-02, F-P3-03):**
  - Integrated interactive tab navigation: `[Description]`, `[Specifications]`, `[Reviews (N)]`.
  - Added "Write a review" modal allowing collectors to submit ratings (1–5 stars) and comments, dynamically updating state and review counts.
- **Order Tracking & Dynamic Route (F-P6-02, F-P6-03, F-P6-04):**
  - Built state-driven interval clock advancing orders every 30s (`Processing` < 1m, `Shipped` 1–3m, `Delivered` > 3m).
  - Added dynamic route `/orders/:id` allowing direct linking, auto-expanding, and visual highlighting of targeted orders.
- **Profile Management (F-P7-01):**
  - Built Edit Profile form with Formik and Yup validation (First Name, Last Name, Email).
  - Persisted user updates directly into `shop_user` in `localStorage`.
- **String & Network Synchronization:**
  - Verified exact match of all PRD strings ("10X Shop", "Catalog", "Log in", "Page not found", "No products found.", "Your cart is empty.", "Thank you! Your order has been placed.").
  - Verified `GET https://dummyjson.com/products?limit=12&skip=0` on root route load.
  - Zero TypeScript errors (`tsc -b`), zero ESLint errors (`eslint .`), clean Vite build (`vite build`).

## 3. Reflection & Diploma Readiness
The application satisfies both the aesthetic requirements of high-end tactile e-commerce and 100% of the rubric assertions defined in Diploma PRD v1.1 and Annex A auto-grader criteria.

