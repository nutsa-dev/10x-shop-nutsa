import type { Product, ProductsResponse, Category } from "@/types/product";
import { CUSTOM_NORDIC_PRODUCTS } from "./custom-products";

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
 * პროდუქტების წამოღება (ჰიბრიდული: DummyJSON ხის ნივთები + საახალწლო და IKEA-ს ავეჯი)
 */
export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}): Promise<ProductsResponse> {
  const limit = options?.limit ?? 40;
  const skip = options?.skip ?? 0;
  const category = options?.category ?? "all";

  // 1. თუ მხოლოდ საახალწლო კატეგორიაა არჩეული
  if (category === "holiday-decor") {
    const holidayItems = CUSTOM_NORDIC_PRODUCTS.filter((p) => p.category === "holiday-decor");
    return {
      products: holidayItems.slice(skip, skip + limit),
      total: holidayItems.length,
      skip,
      limit,
    };
  }

  // 2. DummyJSON-იდან მონაცემების ჩატვირთვა
  let dummyProducts: Product[] = [];
  try {
    if (category === "kitchen-accessories" || category === "home-decoration") {
      const res = await fetch(`${BASE_URL}/products/category/${category}?limit=50`);
      if (res.ok) {
        const data = (await res.json()) as ProductsResponse;
        dummyProducts = data.products.filter(isWoodEcoProduct).map(sanitizeEcoProduct);
      }
    } else if (category === "furniture") {
      const res = await fetch(`${BASE_URL}/products/category/furniture?limit=50`);
      if (res.ok) {
        const data = (await res.json()) as ProductsResponse;
        dummyProducts = data.products.filter(isWoodEcoProduct).map(sanitizeEcoProduct);
      }
    } else {
      // "all" - ყველა კატეგორიის გაერთიანება
      const responses = await Promise.all(
        NORDIC_CATEGORIES.map(async (cat) => {
          const res = await fetch(`${BASE_URL}/products/category/${cat}?limit=50`);
          if (!res.ok) return { products: [] };
          return (await res.json()) as ProductsResponse;
        })
      );
      dummyProducts = responses
        .flatMap((r) => r.products || [])
        .filter(isWoodEcoProduct)
        .map(sanitizeEcoProduct);
    }
  } catch {
    dummyProducts = [];
  }

  // 3. custom პროდუქტების დამატება კატეგორიის მიხედვით
  let customItems: Product[] = [];
  if (category === "furniture") {
    customItems = CUSTOM_NORDIC_PRODUCTS.filter((p) => p.category === "furniture");
  } else if (category === "all") {
    customItems = CUSTOM_NORDIC_PRODUCTS;
  }

  // 4. გაერთიანება და ძებნის ფილტრი
  let combined = [...customItems, ...dummyProducts];

  if (options?.search && options.search.trim() !== "") {
    const q = options.search.toLowerCase();
    combined = combined.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  return {
    products: combined.slice(skip, skip + limit),
    total: combined.length,
    skip,
    limit,
  };
}

/**
 * ერთი პროდუქტის წამოღება ID-ით (ამოწმებს ჯერ custom პროდუქტებში, შემდეგ DummyJSON-ში)
 */
export async function getProductById(id: number | string): Promise<Product> {
  const numericId = Number(id);

  // შევამოწმოთ custom პროდუქტებში
  const custom = CUSTOM_NORDIC_PRODUCTS.find((p) => p.id === numericId);
  if (custom) return custom;

  // თუ იქ არ არის, წამოვიღოთ DummyJSON-იდან
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
  return [
    { slug: "all", name: "All Products", url: "" },
    { slug: "kitchen-accessories", name: "Kitchen & Dining", url: "" },
    { slug: "furniture", name: "Wooden Furniture", url: "" },
    { slug: "holiday-decor", name: "Holiday & Christmas Decor", url: "" },
    { slug: "home-decoration", name: "Home Decor & Hygge", url: "" },
  ];
}
