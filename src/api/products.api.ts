import type { Product, ProductsResponse, Category } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export const ATELIER_CATEGORIES = [
  "home-decoration",
  "kitchen-accessories",
] as const;

/**
 * Fetch products from DummyJSON API with category, pagination & search support.
 * Default category: 'home-decoration', default limit: 12, default skip: 0.
 */
export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}): Promise<ProductsResponse> {
  const limit = options?.limit ?? 12;
  const skip = options?.skip ?? 0;
  const category = options?.category ?? "home-decoration";
  const search = options?.search?.trim();

  // If a search query is provided and category is 'all', use DummyJSON search endpoint or filter within category
  if (search) {
    if (category && category !== "all") {
      const res = await fetch(
        `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=100&skip=0`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch category ${category} (${res.status})`);
      }
      const data = (await res.json()) as ProductsResponse;
      const q = search.toLowerCase();
      const filtered = (data.products || []).filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
      return {
        products: filtered.slice(skip, skip + limit),
        total: filtered.length,
        skip,
        limit,
      };
    } else {
      const res = await fetch(
        `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      );
      if (!res.ok) {
        throw new Error(`Failed to search products (${res.status})`);
      }
      return (await res.json()) as ProductsResponse;
    }
  }

  // Category-specific fetch (Default: GET https://dummyjson.com/products/category/home-decoration?limit=12&skip=0)
  if (category && category !== "all") {
    const res = await fetch(
      `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    );
    if (!res.ok) {
      throw new Error(`Failed to load products for ${category} (${res.status})`);
    }
    return (await res.json()) as ProductsResponse;
  }

  // When 'all' is selected, combine 'home-decoration' and 'kitchen-accessories'
  const responses = await Promise.all(
    ATELIER_CATEGORIES.map(async (cat) => {
      const res = await fetch(`${BASE_URL}/products/category/${cat}?limit=50&skip=0`);
      if (!res.ok) return { products: [], total: 0, skip: 0, limit: 50 };
      return (await res.json()) as ProductsResponse;
    })
  );

  const combined = responses.flatMap((r) => r.products || []);
  return {
    products: combined.slice(skip, skip + limit),
    total: combined.length,
    skip,
    limit,
  };
}

/**
 * Fetch a single product by ID from DummyJSON API
 */
export async function getProductById(id: number | string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(String(id))}`);
  if (!res.ok) {
    throw new Error(`Product #${id} not found (${res.status})`);
  }
  return (await res.json()) as Product;
}

/**
 * Available categories for KURA // Atelier Objects
 */
export async function getCategories(): Promise<Category[]> {
  return [
    { slug: "home-decoration", name: "Home Decoration", url: `${BASE_URL}/products/category/home-decoration` },
    { slug: "kitchen-accessories", name: "Kitchen Accessories", url: `${BASE_URL}/products/category/kitchen-accessories` },
    { slug: "all", name: "All Atelier Objects", url: `${BASE_URL}/products` },
  ];
}
