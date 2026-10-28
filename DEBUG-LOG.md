# 10X Shop — Debugging Log (DEBUG-LOG.md)

> **Documented in compliance with PRD O2 & Diploma Specification (2026)**  
> Records 5 real technical issues encountered and resolved during the engineering lifecycle.

---

### 🐛 Bug 1: Uncaught TypeError: items is not iterable in CartContext (State / Storage)

* **სიმპტომი (Symptom):**  
  ბრაუზერის კონსოლში გამოდიოდა წითელი ერორი: `Uncaught TypeError: items is not iterable at CartContext.tsx:155:26` და აპლიკაციის ეკრანი ჩერდებოდა.
* **რეპროდუქცია (Reproduction Steps):**  
  1. წინა ტესტირებიდან `localStorage`-ში დარჩენილი იყო `shop_cart` ობიექტის სახით (`{ items: [...] }` ან არასწორი JSON).  
  2. საიტის გახსნისას `CartProvider` კითხულობდა მონაცემს `localStorage.getItem("shop_cart")`-ით.  
  3. `useMemo` ცდილობდა `for (const item of items)` ციკლის გაშვებას არამასივ ობიექტზე.
* **ინსტრუმენტი (Tool Used):**  
  Chrome DevTools Console + React DevTools Components tab.
* **მიზეზი (Root Cause):**  
  `JSON.parse(saved)` აბრუნებდა ობიექტს და არა მასივს, რადგან საწყისი ინიციალიზაცია ენდობოდა `localStorage`-ის ტიპს `as CartItem[]` type assertion-ით, ნაცვლად რეალური runtime შემოწმებისა.
* **ფიქსი (Fix & Commit):**  
  დაემატა დაცვითი შემოწმება `Array.isArray(parsed)`. თუ ობიექტია და აქვს `.items`, ამოიღებს მასივს, სხვა შემთხვევაში უსაფრთხოდ აბრუნებს `[]`.  
  *Commit:* `fix(cart): ensure safe array parsing for localStorage shop_cart state` (`21b9e95`)
* **რა ვისწავლე (Lesson Learned):**  
  TypeScript-ის `as Type` (Type Assertion) კომპილაციის დონეზე მუშაობს და არ იცავს runtime მონაცემებისგან. გარე წყაროებიდან (`localStorage`, API) მონაცემების წამოღებისას აუცილებელია Type Guard ან `Array.isArray()` შემოწმება.

---

### 🐛 Bug 2: Unused variable `subtotal` strictly failing build in TypeScript (TypeScript Strict)

* **სიმპტომი (Symptom):**  
  `npm run build` ვარდებოდა შეცდომით: `src/pages/CheckoutPage.tsx(34,5): error TS6133: 'subtotal' is declared but its value is never read.`
* **რეპროდუქცია (Reproduction Steps):**  
  1. `CheckoutPage`-ში `useCart()`-დან ამოღებული იყო `subtotal`, თუმცა გამოთვლებში გამოიყენებოდა მხოლოდ `rawSubtotal` და `savings`.  
  2. გაეშვა `npm run build` (რომელიც რთავს `tsc -b`-ს).
* **ინსტრუმენტი (Tool Used):**  
  TypeScript Compiler (`tsc -b`), VS Code Problems tab.
* **მიზეზი (Root Cause):**  
  `tsconfig.json`-ში ჩართულია `"noUnusedLocals": true`. TypeScript Strict რეჟიმში ნებისმიერი გამოუყენებელი ცვლადი ითვლება ფატალურ კომპილაციის შეცდომად.
* **ფიქსი (Fix & Commit):**  
  გამოუყენებელი `subtotal` ამოიშალა დესტრუქტურიზაციიდან `CheckoutPage.tsx`-ში.  
  *Commit:* `feat(checkout): implement CheckoutPage with Formik shipping form, order summary, and confirmation screen` (`db7f19a`)
* **რა ვისწავლე (Lesson Learned):**  
  TypeScript-ის მკაცრი წესები ხელს უწყობს ზედმეტი კოდის თავიდან არიდებას და Bundle-ის ზომის შემცირებას.

---

### 🐛 Bug 3: Non-numeric / Invalid Product ID breaking fetch (Routing & Network)

* **სიმპტომი (Symptom):**  
  როდესაც მომხმარებელი ხსნიდა მისამართს `/products/abc` ან `/products/-1`, იგზავნებოდა ზედმეტი რექვესთი DummyJSON-ზე: `GET /products/abc` (404 შეცდომა ქსელში).
* **რეპროდუქცია (Reproduction Steps):**  
  1. URL მისამართის ზოლში ჩაიწერა `/products/invalid-id`.  
  2. `useParams` იღებდა `id = "invalid-id"`.  
  3. ეშვებოდა `getProductById("invalid-id")`.
* **ინსტრუმენტი (Tool Used):**  
  Chrome DevTools Network tab.
* **მიზეზი (Root Cause):**  
  არ არსებობდა წინასწარი ვალიდაცია `id`-ის ტიპზე ქსელური რექვესთის გაგზავნამდე.
* **ფიქსი (Fix & Commit):**  
  [ProductPage.tsx](file:///c:/Users/user/Desktop/Exam/10x-shop-nutsa/src/pages/ProductPage.tsx)-ში დაემატა მყისიერი შემოწმება:  
  `const numericId = Number(id); if (!id || isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) { setError("Product not found"); setLoading(false); return; }`  
  *Commit:* `fix(product): add instant numeric id validation before network fetch`
* **რა ვისწავლე (Lesson Learned):**  
  კლიენტის მხარეს მარტივი პარამეტრის ვალიდაცია თავიდან აგვაცილებს ზედმეტ ასინქრონულ ქსელურ ტრაფიკს და აუმჯობესებს UX-ს.

---

### 🐛 Bug 4: Repeated Re-renders & Keystroke Input Lag in Catalog (Optimization / React Profiler)

* **სიმპტომი (Symptom):**  
  კატალოგის საძიებო ველში სწრაფი ბეჭდვისას ყოველ ასოზე იგზავნებოდა API რექვესთი და ხდებოდა მთელი 40-ელემენტიანი ბადის რენდერი.
* **რეპროდუქცია (Reproduction Steps):**  
  1. კატალოგის ძებნის ველში ჩაიწერა სიტყვა `table`.  
  2. 5 ასოს აკრეფაზე გაიგზავნა 5 დამოუკიდებელი API მოთხოვნა.
* **ინსტრუმენტი (Tool Used):**  
  React DevTools Profiler + Network tab.
* **მიზეზი (Root Cause):**  
  `searchInput` პირდაპირ იყო მიბმული `useEffect`-თან debounce დაყოვნების გარეშე.
* **ფიქსი (Fix & Commit):**  
  შეიქმნა [useDebounce.ts](file:///c:/Users/user/Desktop/Exam/10x-shop-nutsa/src/hooks/useDebounce.ts) ჰუკი 400ms დაყოვნებით, რომელიც რექვესთს აგზავნის მხოლოდ მაშინ, როდესაც მომხმარებელი ბეჭდვას შეაჩერებს.  
  *Commit:* `feat(catalog): implement 400ms debounced search, multi-criteria sorting, and URL search params persistence` (`21425d5`)
* **რა ვისწავლე (Lesson Learned):**  
  Debouncing და Throttle ტექნიკები კრიტიკულია საძიებო სისტემებში რენდერების დატვირთვის შესამცირებლად.

---

### 🐛 Bug 5: Direct Deep-Link Route Refresh returning 404 on Deployment (Deploy / Routing)

* **სიმპტომი (Symptom):**  
  Vercel/Netlify-ზე დაჰოსტილ პროექტზე `/products/5`-ზე ან `/orders`-ზე გვერდის დარეფრეშებისას ბრაუზერი აბრუნებს 404 Not Found შეცდომას.
* **რეპროდუქცია (Reproduction Steps):**  
  1. აპლიკაცია აიტვირთა ჰოსტინგზე.  
  2. მომხმარებელი ნავიგაციით გადავიდა `/checkout`-ზე და დააჭირა F5 (Refresh).  
  3. ჰოსტინგის ვებ-სერვერი ეძებდა რეალურ ფიზიკურ ფაილს `/checkout/index.html`.
* **ინსტრუმენტი (Tool Used):**  
  HTTP Response Status Code (404) on Vercel preview.
* **მიზეზი (Root Cause):**  
  SPA (Single Page Application) იყენებს HTML5 History API-ს (`BrowserRouter`). სერვერმა ყველა უცნობი მარშრუტი უნდა გადაამისამართოს root `index.html`-ზე.
* **ფიქსი (Fix & Commit):**  
  შეიქმნა `vercel.json` წესით: `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`.  
  *Commit:* `chore(deploy): add vercel.json SPA rewrite rule`
* **რა ვისწავლე (Lesson Learned):**  
  SPA აპლიკაციების დეპლოისას აუცილებელია სერვერული Rewrite კონფიგურაცია, რათა კლიენტის მხარის როუტერი სწორად ინიციალიზდეს ნებისმიერ URL-ზე.
