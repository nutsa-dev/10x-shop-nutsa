import type { Product, ProductsResponse, Category } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export const DUMMYJSON_CATEGORIES = [
  "home-decoration",
  "furniture",
  "kitchen-accessories",
] as const;

/**
 * Curated Atelier products featuring verified photography for:
 * - Wooden Toys (ხის სათამაშოები)
 * - Holiday & Christmas Decorations (საახალწლო დეკორაციები)
 * - Minimalist Wooden Furniture (ავეჯი)
 * Each item includes 3–4 gallery photos (`images`).
 */
export const CURATED_ATELIER_PRODUCTS: Product[] = [
  {
    id: 2001,
    title: "Nordic Birch Wooden Train Set",
    description:
      "Hand-carved solid birchwood locomotive and carriages on modular wooden tracks. Finished with natural beeswax and non-toxic botanical oils for heirloom play and nursery display.",
    price: 68,
    discountPercentage: 12,
    rating: 4.9,
    stock: 18,
    brand: "WOODWORK Play",
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
    brand: "WOODWORK Play",
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
    brand: "WOODWORK Play",
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
    id: 2004,
    title: "Handcrafted Holiday Pine & Ornament Tree Set",
    description:
      "Artisanal winter holiday centerpiece with warm ceramic and brushed brass ornaments, natural pine cones, and woven linen ribbons.",
    price: 89,
    discountPercentage: 15,
    rating: 4.9,
    stock: 20,
    brand: "WOODWORK Seasonal",
    category: "holiday-decor",
    thumbnail:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1634507708682-f37ef194ed13?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1529973625058-a665431328fb?auto=format&fit=crop&w=800&h=800&q=80",
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
    title: "Nordic Winter Wreath & Botanical Garland",
    description:
      "Hand-tied evergreen holiday wreath accented with dried citrus, cinnamon bark, and raw wooden beads for doors or dining table arrangements.",
    price: 62,
    discountPercentage: 10,
    rating: 4.8,
    stock: 22,
    brand: "WOODWORK Seasonal",
    category: "holiday-decor",
    thumbnail:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1634507708682-f37ef194ed13?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Minimalist and organic holiday decoration.",
        date: "2025-12-22T14:20:00.000Z",
        reviewerName: "Giorgi B.",
      },
    ],
  },
  {
    id: 2006,
    title: "Festive Ceramic Baubles & Beeswax Candle Set",
    description:
      "Set of 6 matte stoneware holiday ornaments paired with hand-dipped honey beeswax taper candles for warm winter tablescapes.",
    price: 48,
    discountPercentage: 8,
    rating: 4.9,
    stock: 30,
    brand: "WOODWORK Seasonal",
    category: "holiday-decor",
    thumbnail:
      "https://images.unsplash.com/photo-1634507708682-f37ef194ed13?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1634507708682-f37ef194ed13?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1529973625058-a665431328fb?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "The matte earth tones look incredible on the tree.",
        date: "2025-12-24T11:00:00.000Z",
        reviewerName: "Salome D.",
      },
    ],
  },
  {
    id: 2007,
    title: "Artisanal Glass & Wood Holiday Ornaments",
    description:
      "Mouth-blown amber glass baubles and turned oak ornaments with raw linen hanging cords, presented in a keepsake wooden box.",
    price: 56,
    discountPercentage: 12,
    rating: 4.7,
    stock: 16,
    brand: "WOODWORK Seasonal",
    category: "holiday-decor",
    thumbnail:
      "https://images.unsplash.com/photo-1529973625058-a665431328fb?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1529973625058-a665431328fb?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1634507708682-f37ef194ed13?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [],
  },
  {
    id: 2008,
    title: "Kyoto Solid Oak Dining Chair",
    description:
      "Sculptural dining chair crafted from kiln-dried white oak with a curved backrest and natural bouclé upholstered seat pad.",
    price: 340,
    discountPercentage: 10,
    rating: 4.9,
    stock: 9,
    brand: "WOODWORK Living",
    category: "furniture",
    thumbnail:
      "https://images.unsplash.com/photo-1598300188992-fb5c3408c9a5?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1598300188992-fb5c3408c9a5?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Exceptional joinery and very comfortable for long dinners.",
        date: "2026-01-15T16:40:00.000Z",
        reviewerName: "Dato K.",
      },
    ],
  },
  {
    id: 2009,
    title: "Atelier Sculpted Ash Lounge Chair",
    description:
      "Low-profile minimalist accent chair featuring tapered solid ash legs and warm sand-toned linen upholstery.",
    price: 420,
    discountPercentage: 14,
    rating: 4.8,
    stock: 7,
    brand: "WOODWORK Living",
    category: "furniture",
    thumbnail:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1598300188992-fb5c3408c9a5?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [],
  },
  {
    id: 2010,
    title: "Sori Bentwood Craft Stool & Side Chair",
    description:
      "Organic steam-bent walnut seat with slender architectural legs. Works effortlessly as a desk chair or sculptural side table.",
    price: 265,
    discountPercentage: 8,
    rating: 4.9,
    stock: 11,
    brand: "WOODWORK Living",
    category: "furniture",
    thumbnail:
      "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1598300188992-fb5c3408c9a5?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [],
  },
];

/**
 * Helper to fetch a single DummyJSON category safely
 */
async function fetchDummyCategory(cat: string, limit = 50): Promise<Product[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/products/category/${encodeURIComponent(cat)}?limit=${limit}&skip=0`
    );
    if (!res.ok) return [];
    const data = (await res.json()) as ProductsResponse;
    return data.products || [];
  } catch {
    return [];
  }
}

/**
 * Fetch products combining DummyJSON ('home-decoration', 'furniture', 'kitchen-accessories')
 * and KURA curated items ('wooden-toys', 'holiday-decor', 'furniture').
 */
export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
}): Promise<ProductsResponse> {
  const limit = options?.limit ?? 16;
  const skip = options?.skip ?? 0;
  const category = options?.category ?? "home-decoration";
  const search = options?.search?.trim().toLowerCase();

  let pool: Product[] = [];

  if (category === "wooden-toys" || category === "holiday-decor") {
    pool = CURATED_ATELIER_PRODUCTS.filter((p) => p.category === category);
  } else if (category === "furniture") {
    const dummyFurniture = await fetchDummyCategory("furniture");
    const curatedFurniture = CURATED_ATELIER_PRODUCTS.filter(
      (p) => p.category === "furniture"
    );
    pool = [...curatedFurniture, ...dummyFurniture];
  } else if (category === "kitchen-accessories") {
    pool = await fetchDummyCategory("kitchen-accessories");
  } else if (category === "home-decoration" || category === "all") {
    // Combine DummyJSON home-decoration (fetched via GET .../category/home-decoration?limit=12&skip=0),
    // DummyJSON furniture & kitchen-accessories, plus Curated Wooden Toys, Holiday Decor & Furniture
    const [homeList, furnitureList, kitchenList] = await Promise.all([
      fetchDummyCategory("home-decoration", 12),
      fetchDummyCategory("furniture"),
      fetchDummyCategory("kitchen-accessories"),
    ]);

<<<<<<< Updated upstream
    pool = [
      ...homeList,
      ...CURATED_ATELIER_PRODUCTS,
      ...furnitureList,
      ...kitchenList,
    ];
=======
  if (category === ALL_CATEGORY) {
    const furniture = STORE_PRODUCTS.filter((p) => p.category === "furniture");
    const homeDecor = STORE_PRODUCTS.filter((p) => p.category === "home-decoration");
    const woodenToys = STORE_PRODUCTS.filter((p) => p.category === "wooden-toys");
    const christmas = STORE_PRODUCTS.filter((p) => p.category === "christmas-market");

    // First 4 cards: 1. Furniture, 2. Home Decor, 3. Furniture, 4. Wooden Toys
    const firstFour = [
      furniture[0],
      homeDecor[0],
      furniture[1],
      woodenToys[0],
    ].filter(Boolean);

    const usedIds = new Set(firstFour.map((p) => p.id));
    const remainingBuckets = [
      furniture.filter((p) => !usedIds.has(p.id)),
      homeDecor.filter((p) => !usedIds.has(p.id)),
      christmas.filter((p) => !usedIds.has(p.id)),
      woodenToys.filter((p) => !usedIds.has(p.id)),
    ];
    const maxLen = Math.max(...remainingBuckets.map((b) => b.length), 0);
    const interleaved: Product[] = [...firstFour];
    for (let i = 0; i < maxLen; i++) {
      for (const bucket of remainingBuckets) {
        if (i < bucket.length) {
          interleaved.push(bucket[i]);
        }
      }
    }
    pool = interleaved;
>>>>>>> Stashed changes
  } else {
    pool = await fetchDummyCategory(category);
  }

  if (search) {
    pool = pool.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        (p.brand && p.brand.toLowerCase().includes(search))
    );
  }

  return {
    products: pool.slice(skip, skip + limit),
    total: pool.length,
    skip,
    limit,
  };
}

/**
 * Fetch a single product by ID (supports both Curated Atelier IDs and DummyJSON IDs)
 */
export async function getProductById(id: number | string): Promise<Product> {
  const numericId = Number(id);
  const curated = CURATED_ATELIER_PRODUCTS.find((p) => p.id === numericId);
  if (curated) {
    return curated;
  }

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
    { slug: "home-decoration", name: "All Atelier & Home Decor", url: `${BASE_URL}/products/category/home-decoration` },
    { slug: "wooden-toys", name: "Wooden Toys", url: "#wooden-toys" },
    { slug: "holiday-decor", name: "Holiday Decorations", url: "#holiday-decor" },
    { slug: "furniture", name: "Furniture", url: `${BASE_URL}/products/category/furniture` },
    { slug: "kitchen-accessories", name: "Kitchen Accessories", url: `${BASE_URL}/products/category/kitchen-accessories` },
  ];
}
