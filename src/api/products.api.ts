import type { Product, ProductsResponse, Category } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

// სკანდინავიური ეკო-მაღაზიისთვის შერჩეული კატეგორიები DummyJSON-იდან
export const NORDIC_CATEGORIES = [
  "kitchen-accessories",
  "home-decoration",
  "furniture",
] as const;

// პლასტმასისა და ელექტრო/მეტალის ნივთების სია, რომლებიც უნდა გაიფილტროს
const EXCLUDED_KEYWORDS = [
  "peeler",
  "blender",
  "microwave",
  "stove",
  "aluminium",
  "aluminum",
  "tongs",
  "grater",
  "whisk",
  "ice cube",
  "egg slicer",
  "strainer",
  "sieve",
  "fork",
  "pan",
  "pot with",
  "slotted turner",
  "lunch box",
  "carbon steel",
  "electric",
];

function isWoodEcoProduct(product: Product): boolean {
  const text = (product.title + " " + product.description).toLowerCase();
  return !EXCLUDED_KEYWORDS.some((kw) => text.includes(kw));
}

// ხის და ეკო მასალის ხაზგასმა დასახელებებში
function sanitizeEcoProduct(product: Product): Product {
  let title = product.title;
  if (title === "Chopping Board") title = "Wooden Chopping Board";
  if (title === "Spoon") title = "Carved Wooden Spoon";
  if (title === "Tray") title = "Solid Wood Serving Tray";
  if (title === "Spice Rack") title = "Oak Wood Spice Rack";
  if (title === "Mug Tree Stand") title = "Nordic Wooden Mug Stand";
  if (title === "Family Tree Photo Frame") title = "Wooden Photo Frame";
  if (title === "Plant Pot") title = "Ceramic & Wood Plant Pot";
  if (title === "Table Lamp") title = "Wood Base Ambient Lamp";

  return {
    ...product,
    title,
  };
}

/**
 * პროდუქტების წამოღება.
 * აბრუნებს მხოლოდ ნატურალურ ხის, ბამბუკისა და ეკო-დეკორის პროდუქციას.
 * პლასტმასის ყველა პროდუქტი იფილტრება.
 */
export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}): Promise<ProductsResponse> {
  const limit = options?.limit ?? 40;
  const skip = options?.skip ?? 0;

  // 1. ძებნა
  if (options?.search && options.search.trim() !== "") {
    const url = `${BASE_URL}/products/search?q=${encodeURIComponent(options.search)}&limit=100`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Search request failed");
    const data = (await res.json()) as ProductsResponse;
    const filtered = data.products.filter(isWoodEcoProduct).map(sanitizeEcoProduct);
    return {
      products: filtered.slice(skip, skip + limit),
      total: filtered.length,
      skip,
      limit,
    };
  }

  // 2. კონკრეტული კატეგორია
  if (options?.category && options.category !== "all") {
    const url = `${BASE_URL}/products/category/${encodeURIComponent(options.category)}?limit=100`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch category: ${options.category}`);
    const data = (await res.json()) as ProductsResponse;
    const filtered = data.products.filter(isWoodEcoProduct).map(sanitizeEcoProduct);
    return {
      products: filtered.slice(skip, skip + limit),
      total: filtered.length,
      skip,
      limit,
    };
  }

  // 3. მთავარი კატალოგი ("all") - 3 შერჩეული კატეგორიიდან ვიღებთ მხოლოდ ხის/ეკო ნივთებს
  const responses = await Promise.all(
    NORDIC_CATEGORIES.map(async (cat) => {
      const res = await fetch(`${BASE_URL}/products/category/${cat}?limit=50`);
      if (!res.ok) return { products: [] };
      return (await res.json()) as ProductsResponse;
    })
  );

  const combined = responses
    .flatMap((r) => r.products || [])
    .filter(isWoodEcoProduct)
    .map(sanitizeEcoProduct);

  return {
    products: combined.slice(skip, skip + limit),
    total: combined.length,
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
  const data = (await res.json()) as Product;
  return sanitizeEcoProduct(data);
}

/**
 * კატეგორიების სია
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return (await res.json()) as Category[];
}
