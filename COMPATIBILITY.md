# 10X Shop — Device & Browser Compatibility Matrix (COMPATIBILITY.md)

> **Documented in compliance with PRD O3 & Diploma Specification (2026)**  
> Testing conducted on modern desktop browsers and mobile viewport emulation (Chrome DevTools Mobile & Real Devices).

---

## 1. Responsive Breakpoints Strategy

* **Mobile Viewport (≤ 480px, tested down to 375px iPhone SE/12):**
  - Single column product grid.
  - No horizontal scrolling (`overflow-x: hidden`).
  - Min touch targets: ≥ 44px for buttons, steppers, and inputs.
* **Tablet Viewport (481px – 1024px, iPad / Tablets):**
  - 2 to 3 column product catalog grid.
  - Optimized split view for cart and checkout.
* **Desktop Viewport (> 1024px, 1280px, 1440px):**
  - 4 column spacious product catalog grid.
  - Sticky summary sidebar for Cart and Checkout.

---

## 2. Multi-Browser Compatibility Matrix

| Route / View | Chrome (Desktop) | Firefox (Desktop) | Edge (Desktop) | Safari (macOS / iOS) | Mobile (375px) | Result |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Catalog (`/`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Grid collapses to 1 col, search/filter wrap) |
| **Product Details (`/products/:id`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Stacked gallery & details, touch stepper) |
| **Cart (`/cart`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Summary collapses below items on mobile) |
| **Checkout (`/checkout`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Form inputs full width on mobile) |
| **Order History (`/orders`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Responsive status timeline and cards) |
| **Profile (`/profile`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Stats grid collapses to 1-col on mobile) |
| **Login (`/login`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Centered card with clean focus states) |
| **Not Found (`*`)** | ✓ | ✓ | ✓ | ✓ | ✓ | **Pass** (Centered 404 with back-to-catalog action) |

---

## 3. Accessibility (a11y) & Interaction Verification

- **Keyboard Navigation:** Full Tab navigation tested through Catalog -> Product Details -> Stepper -> Add to Cart -> Cart -> Checkout.
- **Focus Rings:** Distinct focus outlines configured on inputs and interactive elements.
- **Color Contrast:** Nordic Stone (#1c1917) and Amber (#d97706) meet WCAG AA contrast ratio standards in both Light and Dark themes.
- **Image Attributes:** All product images provide `alt` descriptions and `loading="lazy"` attributes preventing Cumulative Layout Shifts (CLS).
