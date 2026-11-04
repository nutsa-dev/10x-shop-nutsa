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

/**
 * Custom ApiError class adhering strictly to PRD F-T02
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Curated handcrafted items for Wooden Toys and Christmas Market
 * with verified high-resolution photography and multi-photo galleries.
 */
export const CURATED_PRODUCTS: Product[] = [
  // --- Wooden Toys ---
  {
    id: 2001,
    title: "Nordic Birch Wooden Train Set",
    description:
      "Hand-carved solid birchwood locomotive and carriages on modular wooden tracks. Finished with natural beeswax and non-toxic botanical oils for heirloom play and nursery display.",
    price: 68,
    discountPercentage: 12,
    rating: 4.9,
    stock: 18,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail:
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Beautiful natural wood grain and super smooth wheels.",
        date: "2026-02-10T10:00:00.000Z",
        reviewerName: "Nino K.",
      },
      {
        rating: 5,
        comment: "Heirloom quality craft. My daughter plays with it every day.",
        date: "2026-02-18T14:20:00.000Z",
        reviewerName: "David B.",
      },
    ],
  },
  {
    id: 2002,
    title: "Montessori Beechwood Building Blocks",
    description:
      "Architectural 36-piece wooden block set crafted from sustainably harvested European beechwood. Encourages tactile spatial exploration and doubles as sculptural shelf decor.",
    price: 54,
    discountPercentage: 10,
    rating: 4.8,
    stock: 25,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail:
      "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Heirloom quality blocks, feels wonderful in hand.",
        date: "2026-02-14T12:30:00.000Z",
        reviewerName: "Luka M.",
      },
    ],
  },
  {
    id: 2003,
    title: "Atelier Heirloom Nursery Play Set",
    description:
      "Minimalist Scandinavian wooden stacking toys and sensory figures made from raw maple and walnut wood with rounded organic edges.",
    price: 75,
    discountPercentage: 15,
    rating: 4.9,
    stock: 14,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Perfect gift, minimalist aesthetic and safe materials.",
        date: "2026-01-28T09:15:00.000Z",
        reviewerName: "Ana T.",
      },
    ],
  },
  {
    id: 2008,
    title: "Handcrafted Wooden Animal Stacking Ark",
    description:
      "Artisanal wild animal balance figures carved from natural walnut, cherry, and maple wood with velvety beeswax finish.",
    price: 62,
    discountPercentage: 10,
    rating: 4.9,
    stock: 16,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1560859251-d563a49c5e4a?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Exquisite craftsmanship, pieces fit snugly and feel great.",
        date: "2026-02-04T16:10:00.000Z",
        reviewerName: "Elene G.",
      },
    ],
  },
  {
    id: 2009,
    title: "Forest Rainbow Wooden Stacking Arch",
    description:
      "Multi-piece open-ended architectural arch set dyed with water-based non-toxic earth pigments, showing rich tactile timber texture.",
    price: 49,
    discountPercentage: 8,
    rating: 4.8,
    stock: 28,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [],
  },

  // --- Christmas Market ---
  {
    id: 2004,
    title: "Handcrafted Holiday Pine & Ornament Tree Set",
    description:
      "Artisanal winter holiday centerpiece with warm ceramic and brushed brass ornaments, natural pine cones, and woven linen ribbons.",
    price: 89,
    discountPercentage: 15,
    rating: 4.9,
    stock: 20,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1634507708682-f37ef194ed13?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Brings such a warm, festive glow to our living room.",
        date: "2025-12-19T18:00:00.000Z",
        reviewerName: "Mariam S.",
      },
    ],
  },
  {
    id: 2005,
    title: "Artisanal Wooden Snowflake Ornaments (Set of 6)",
    description:
      "Precision laser-cut and hand-finished Scandinavian birch plywood snowflakes with brass wire hangers. Designed to catch soft festive light.",
    price: 38,
    discountPercentage: 10,
    rating: 4.8,
    stock: 35,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Subtle and elegant, far nicer than plastic ornaments.",
        date: "2025-12-21T11:45:00.000Z",
        reviewerName: "Giorgi B.",
      },
    ],
  },
  {
    id: 2006,
    title: "Nordic Brass & Cedar Advent Candleholder",
    description:
      "Solid turned brass cups nestled into a raw aromatic cedar beam. Four candle chambers for Nordic winter solstice countdown traditions.",
    price: 64,
    discountPercentage: 12,
    rating: 4.9,
    stock: 16,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail:
      "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Heavy, high-quality brass. Smells like fresh cedar wood.",
        date: "2025-12-23T14:10:00.000Z",
        reviewerName: "Salome Ch.",
      },
    ],
  },
  {
    id: 2007,
    title: "Hand-Carved Winter Reindeer Figurine",
    description:
      "Sculptural minimalist holiday reindeer carved from reclaimed linden wood. Untreated natural grain celebrates organic timber warmth.",
    price: 42,
    discountPercentage: 8,
    rating: 4.8,
    stock: 22,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [],
  },
  {
    id: 2010,
    title: "Handmade Wool Felt & Cinnamon Star Garland",
    description:
      "Cozy holiday garland strung with hand-felted pure wool stars, natural cinnamon sticks, and dried orange slices for festive warmth and fragrance.",
    price: 34,
    discountPercentage: 10,
    rating: 4.9,
    stock: 30,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail:
      "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Fabulous aroma and lovely craftsmanship, looks charming over the fireplace.",
        date: "2025-12-24T10:15:00.000Z",
        reviewerName: "Tamar M.",
      },
    ],
  },
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
 * Also seamlessly delivers curated Wooden Toys & Christmas Market items when requested.
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

  // Handle Curated Categories (Christmas Market & Wooden Toys)
  if (category === "wooden-toys" || category === "christmas-market") {
    let pool = CURATED_PRODUCTS.filter((p) => p.category === category);
    if (q) {
      const lower = q.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          (p.brand && p.brand.toLowerCase().includes(lower))
      );
    }
    pool = sortProductsLocally(pool, sort);
    return {
      products: pool.slice(skip, skip + limit),
      total: pool.length,
      skip,
      limit,
    };
  }

  // Handle DummyJSON Categories or All Products
  let url: string;

  if (q) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== ALL_CATEGORY) {
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    // Official PRD C-P2-01 endpoint
    url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  }

  // Append sorting parameters
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
    throw new ApiError(res.status, `Failed to fetch products (${res.status})`);
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
 * Fetch a single product by ID (handles both DummyJSON IDs and Curated IDs)
 */
export async function getProductById(
  id: number | string,
  signal?: AbortSignal
): Promise<Product> {
  const numericId = Number(id);
  if (!id || isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  // Check curated products first (IDs 2001–2010)
  const curated = CURATED_PRODUCTS.find((p) => p.id === numericId);
  if (curated) {
    return curated;
  }

  const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(String(numericId))}`, {
    signal,
  });
  if (!res.ok) {
    throw new ApiError(res.status, `Product #${id} not found (${res.status})`);
  }
  return (await res.json()) as Product;
}
