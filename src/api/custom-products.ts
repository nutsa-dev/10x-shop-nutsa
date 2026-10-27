import type { Product } from "@/types/product";

export const CUSTOM_NORDIC_PRODUCTS: Product[] = [
  // --- ავეჯი (IKEA style & Wood) ---
  {
    id: 501,
    title: "Modular Oak Wall Shelf",
    description: "Easy-to-assemble Scandinavian minimalist oak floating shelf. Perfect for books, plants, and home accents.",
    category: "furniture",
    brand: "Nordic Craft",
    price: 49.99,
    discountPercentage: 10,
    rating: 4.9,
    stock: 14,
    thumbnail: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "Super easy to mount and looks stunning!", date: "2026-02-15", reviewerName: "Anna Lind" }
    ],
  },
  {
    id: 502,
    title: "Birch Wood Coffee Table",
    description: "Minimalist round coffee table crafted from sustainable birch wood with tapered legs. Flat-packed, 5-minute tool-free assembly.",
    category: "furniture",
    brand: "Ikea Style Nordic",
    price: 89.99,
    discountPercentage: 15,
    rating: 4.8,
    stock: 8,
    thumbnail: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "Classic Scandinavian design. Beautiful natural grain.", date: "2026-03-01", reviewerName: "Lars Jensen" }
    ],
  },
  {
    id: 503,
    title: "Eco Kids Wooden Bed & Crib",
    description: "Solid pine toddler and kids bed with rounded edges and non-toxic natural beeswax finish. Built to grow with your child.",
    category: "furniture",
    brand: "Nordic Junior",
    price: 199.99,
    discountPercentage: 8,
    rating: 4.95,
    stock: 5,
    thumbnail: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "Extremely sturdy and safe for our toddler.", date: "2026-01-20", reviewerName: "Elena Rostova" }
    ],
  },
  {
    id: 504,
    title: "Balcony Wooden Rocking Chair",
    description: "Handcrafted ergonomic rocking chair made from weather-treated beech wood. Ideal for cozy mornings on the patio or balcony.",
    category: "furniture",
    brand: "Fjord Living",
    price: 149.99,
    discountPercentage: 12,
    rating: 4.75,
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "The rhythm of rocking on this chair is pure therapy.", date: "2026-02-10", reviewerName: "Freja Olsen" }
    ],
  },

  // --- საახალწლო კატეგორია (Holiday & Christmas Wood Decor) ---
  {
    id: 601,
    title: "Hand-Carved Wooden Tree Ornaments",
    description: "Set of 6 rustic wooden ornaments including reindeer, pine trees, and bells. Hand-finished with natural jute hangers.",
    category: "holiday-decor",
    brand: "Winter Hygge",
    price: 24.99,
    discountPercentage: 15,
    rating: 4.95,
    stock: 25,
    thumbnail: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "Smells like fresh pine and looks magical on our tree!", date: "2025-12-15", reviewerName: "Klara Blom" }
    ],
  },
  {
    id: 602,
    title: "Nordic Wooden Snowflake Set",
    description: "Geometric wooden snowflake hangings laser-cut from birch plywood. Adds warm Scandinavian holiday charm to any room.",
    category: "holiday-decor",
    brand: "Winter Hygge",
    price: 18.99,
    discountPercentage: 10,
    rating: 4.88,
    stock: 30,
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "Intricate details and lovely raw wood texture.", date: "2025-12-20", reviewerName: "Mikkel H." }
    ],
  },
  {
    id: 603,
    title: "Wooden Christmas Star Tree Topper",
    description: "Traditional 3D wooden star tree topper crafted from lightweight natural pine with a secure spiral tree mount.",
    category: "holiday-decor",
    brand: "Nordic Holiday",
    price: 29.99,
    discountPercentage: 5,
    rating: 4.9,
    stock: 12,
    thumbnail: "https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "The crowning piece of our Christmas celebration.", date: "2025-12-22", reviewerName: "Sven Erik" }
    ],
  },
  {
    id: 604,
    title: "Handcrafted Wooden Nutcracker Figure",
    description: "Classic heirloom nutcracker figure carved from solid linden wood with painted natural earth-tone accents.",
    category: "holiday-decor",
    brand: "Craft Tradition",
    price: 34.99,
    discountPercentage: 20,
    rating: 4.85,
    stock: 9,
    thumbnail: "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 5, comment: "A timeless wooden toy that our family treasures.", date: "2025-12-24", reviewerName: "Ingrid M." }
    ],
  },
  {
    id: 605,
    title: "Festive Pinecone & Wooden Garland",
    description: "6-foot decorative holiday garland combining natural pinecones, wooden beads, and dried citrus slices.",
    category: "holiday-decor",
    brand: "Winter Hygge",
    price: 22.50,
    discountPercentage: 10,
    rating: 4.7,
    stock: 18,
    thumbnail: "https://images.unsplash.com/photo-1575224526797-5730d09d781d?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1575224526797-5730d09d781d?w=600&auto=format&fit=crop&q=80"],
    reviews: [
      { rating: 4, comment: "Looks beautiful along our fireplace mantle.", date: "2025-12-18", reviewerName: "Astrid N." }
    ],
  },
];
