import type { Product, ProductsResponse, Category } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

// სკანდინავიური ეკო-მაღაზიისთვის შერჩეული კატეგორიები DummyJSON-იდან
export const NORDIC_CATEGORIES = [
  "kitchen-accessories", // ბამბუკის სპატულები, ხის დაფები, ჭურჭელი, სანელებლების თაროები
  "home-decoration",     // მცენარეები, ხის ჩარჩოები, სანათები, მყუდრო დეკორი
  "furniture",           // ნატურალური ხის ტუმბოები, სარკეები, სკანდინავიური ავეჯი
] as const;

/**
 * პროდუქტების წამოღება.
 * როცა არცერთი კატეგორია არ არის არჩეული ("all"), მოგვაქვს სპეციალურად
 * ჩვენი სკანდინავიური კოლექცია (ხე, ეკო სამზარეულო, ავეჯი და დეკორი),
 * რათა საიტზე არ გამოჩნდეს კოსმეტიკა ან ტელეფონები.
 */
export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}): Promise<ProductsResponse> {
  const limit = options?.limit ?? 24;
  const skip = options?.skip ?? 0;

  // 1. ძებნა
  if (options?.search && options.search.trim() !== "") {
    const url = `${BASE_URL}/products/search?q=${encodeURIComponent(options.search)}&limit=${limit}&skip=${skip}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Search request failed");
    return (await res.json()) as ProductsResponse;
  }

  // 2. კონკრეტული კატეგორია
  if (options?.category && options.category !== "all") {
    const url = `${BASE_URL}/products/category/${encodeURIComponent(options.category)}?limit=${limit}&skip=${skip}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch category: ${options.category}`);
    return (await res.json()) as ProductsResponse;
  }

  // 3. მთავარი კატალოგი ("all") - ვაერთიანებთ ჩვენს 3 სკანდინავიურ კატეგორიას
  const responses = await Promise.all(
    NORDIC_CATEGORIES.map(async (cat) => {
      const res = await fetch(`${BASE_URL}/products/category/${cat}?limit=15`);
      if (!res.ok) return { products: [] };
      return (await res.json()) as ProductsResponse;
    })
  );

  const combinedProducts: Product[] = responses.flatMap((r) => r.products || []);

  return {
    products: combinedProducts.slice(skip, skip + limit),
    total: combinedProducts.length,
    skip,
    limit,
  };
}

/**
 * ერთი პროდუქტის წამოღება ID-ით
 */
export async function getProductById(id: number | string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Product #${id} not found (${res.status})`);
  }
  return (await res.json()) as Product;
}

/**
 * კატეგორიების სია
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return (await res.json()) as Category[];
}
