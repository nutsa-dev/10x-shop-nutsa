import type { Product, ProductsResponse, Category } from "@/types/product";
import { WINTER_SPORTS_PRODUCTS } from "./custom-products";

const BASE_URL = "https://dummyjson.com";

export const WINTER_CATEGORIES = [
  "skis",
  "snowboards",
  "goggles",
  "helmets",
  "accessories",
] as const;

/**
 * Fetch winter sports products with category & search support
 */
export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}): Promise<ProductsResponse> {
  const limit = options?.limit ?? 50;
  const skip = options?.skip ?? 0;
  const category = options?.category ?? "all";

  let list = [...WINTER_SPORTS_PRODUCTS];

  // Optional: Try fetching DummyJSON sunglasses if goggles category is selected
  if (category === "goggles" || category === "all") {
    try {
      const res = await fetch(`${BASE_URL}/products/category/sunglasses?limit=10`);
      if (res.ok) {
        const data = (await res.json()) as ProductsResponse;
        const mapped = (data.products || []).map((p) => ({
          ...p,
          id: p.id + 1000,
          category: "goggles",
          title: `Alpine ${p.title}`,
        }));
        if (category === "goggles") {
          list = [...list.filter((p) => p.category === "goggles"), ...mapped];
        }
      }
    } catch {
      // Fallback to local winter sports products
    }
  }

  // Filter by category
  if (category !== "all") {
    list = list.filter((p) => p.category === category);
  }

  // Filter by search query
  if (options?.search && options.search.trim() !== "") {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
    );
  }

  return {
    products: list.slice(skip, skip + limit),
    total: list.length,
    skip,
    limit,
  };
}

/**
 * Fetch a single product by numeric ID
 */
export async function getProductById(id: number | string): Promise<Product> {
  const numericId = Number(id);

  const local = WINTER_SPORTS_PRODUCTS.find((p) => p.id === numericId);
  if (local) return local;

  // Fallback for mapped DummyJSON items
  if (numericId > 1000) {
    try {
      const res = await fetch(`${BASE_URL}/products/${numericId - 1000}`);
      if (res.ok) {
        const data = (await res.json()) as Product;
        return {
          ...data,
          id: numericId,
          category: "goggles",
          title: `Alpine ${data.title}`,
        };
      }
    } catch {
      // fall through
    }
  }

  throw new Error(`Product #${id} not found`);
}

/**
 * Category list
 */
export async function getCategories(): Promise<Category[]> {
  return [
    { slug: "all", name: "All Gear", url: "" },
    { slug: "skis", name: "Skis", url: "" },
    { slug: "snowboards", name: "Snowboards", url: "" },
    { slug: "goggles", name: "Goggles & Eyewear", url: "" },
    { slug: "helmets", name: "Helmets", url: "" },
    { slug: "accessories", name: "Accessories", url: "" },
  ];
}
