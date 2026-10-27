import type { Product, ProductsResponse, Category } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

/**
 * პროდუქტების წამოღება (პაგინაციის, ლიმიტისა და კატეგორიის მხარდაჭერით)
 */
export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}): Promise<ProductsResponse> {
  const limit = options?.limit ?? 12;
  const skip = options?.skip ?? 0;

  let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

  if (options?.search) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(options.search)}&limit=${limit}&skip=${skip}`;
  } else if (options?.category && options.category !== "all") {
    url = `${BASE_URL}/products/category/${encodeURIComponent(options.category)}?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as ProductsResponse;
}

/**
 * ერთი კონკრეტული პროდუქტის წამოღება ID-ით
 */
export async function getProductById(id: number | string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Product with ID ${id} not found (${res.status})`);
  }
  return (await res.json()) as Product;
}

/**
 * ხელმისაწვდომი კატეგორიების სიის წამოღება
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status})`);
  }
  return (await res.json()) as Category[];
}
