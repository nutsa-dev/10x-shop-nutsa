import type { Product, ProductsResponse } from "@/types/product";
import { getDiscountedPrice } from "@/utils/format";

const BASE_URL = "https://dummyjson.com";

export const ALL_CATEGORY = "all";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "title-asc";

export const DEFAULT_CATEGORIES = [
  "furniture",
  "home-decoration",
  "kitchen-accessories",
  "beauty",
  "fragrances",
  "groceries",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "skin-care",
];

export interface FetchProductsOptions {
  limit?: number;
  skip?: number;
  category?: string;
  q?: string;
  sort?: SortOption;
  signal?: AbortSignal;
}

/**
 * Sorts products locally to guarantee correct ordering across all endpoints
 */
function sortProductsLocally(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort(
        (a, b) =>
          getDiscountedPrice(a.price, a.discountPercentage) -
          getDiscountedPrice(b.price, b.discountPercentage)
      );
    case "price-desc":
      return sorted.sort(
        (a, b) =>
          getDiscountedPrice(b.price, b.discountPercentage) -
          getDiscountedPrice(a.price, a.discountPercentage)
      );
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "featured":
    default:
      return sorted;
  }
}

/**
 * Fetch products directly from DummyJSON API with server-side pagination,
 * server search, category filtering, and sorting support.
 */
export async function getProducts(
  options?: FetchProductsOptions
): Promise<ProductsResponse> {
  const limit = options?.limit ?? 12;
  const skip = options?.skip ?? 0;
  const category = options?.category ?? ALL_CATEGORY;
  const q = options?.q?.trim();
  const sort = options?.sort ?? "featured";
  const signal = options?.signal;

  let url: string;

  if (q) {
    // DummyJSON server-side search endpoint
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== ALL_CATEGORY) {
    // DummyJSON category endpoint
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    // DummyJSON standard products endpoint
    url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  }

  // Append sorting parameters when supported
  if (sort === "price-asc") {
    url += "&sortBy=price&order=asc";
  } else if (sort === "price-desc") {
    url += "&sortBy=price&order=desc";
  } else if (sort === "rating-desc") {
    url += "&sortBy=rating&order=desc";
  } else if (sort === "title-asc") {
    url += "&sortBy=title&order=asc";
  }

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  const data = (await res.json()) as ProductsResponse;
  const items = Array.isArray(data.products) ? data.products : [];

  return {
    products: sort !== "featured" ? sortProductsLocally(items, sort) : items,
    total: typeof data.total === "number" ? data.total : items.length,
    skip: typeof data.skip === "number" ? data.skip : skip,
    limit: typeof data.limit === "number" ? data.limit : limit,
  };
}

/**
 * Dynamically fetches category list from DummyJSON API
 */
export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/products/category-list`, { signal });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) => (typeof item === "string" ? item : String(item)));
      }
    }

    const fallbackRes = await fetch(`${BASE_URL}/products/categories`, { signal });
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) =>
          typeof item === "string" ? item : (item as { slug?: string; name?: string }).slug || String(item)
        );
      }
    }

    return DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

/**
 * Fetch a single product by ID from DummyJSON API
 */
export async function getProductById(
  id: number | string,
  signal?: AbortSignal
): Promise<Product> {
  const numericId = Number(id);
  if (!id || isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
    throw new Error("Invalid product ID");
  }

  const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(String(numericId))}`, {
    signal,
  });
  if (!res.ok) {
    throw new Error(`Product #${id} not found (${res.status})`);
  }
  return (await res.json()) as Product;
}
