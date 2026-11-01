import type { Product } from "@/types/product";

export const WINTER_SPORTS_PRODUCTS: Product[] = [
  // --- თხილამურები (Skis) ---
  {
    id: 101,
    title: "Apex Carbon All-Mountain Skis",
    description: "High-performance all-mountain skis with lightweight carbon fiber core. Excellent edge grip on hardpack and floating ease in powder.",
    category: "skis",
    brand: "Nordica Peak",
    price: 549.99,
    discountPercentage: 10,
    rating: 4.9,
    stock: 8,
    thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Incredible stability at high speeds on ice and groomed trails.", date: "2026-01-14", reviewerName: "Lukas M." },
      { rating: 5, comment: "Lightweight and turns effortlessly.", date: "2026-02-02", reviewerName: "Sofia K." }
    ],
  },
  {
    id: 102,
    title: "Vanguard Freeride Powder Skis",
    description: "Wide waist freeride powder skis engineered for deep snow backcountry exploration. Rocker profile with tip and tail taper.",
    category: "skis",
    brand: "Alpinist Pro",
    price: 620.00,
    discountPercentage: 15,
    rating: 4.85,
    stock: 5,
    thumbnail: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Floats on deep powder like a dream.", date: "2026-01-20", reviewerName: "Erik S." }
    ],
  },
  {
    id: 103,
    title: "Slalom Pro Race Skis",
    description: "Competition-grade carving skis with dual titanal layers. Designed for aggressive turns and maximum edge control.",
    category: "skis",
    brand: "Nordica Peak",
    price: 699.00,
    discountPercentage: 0,
    rating: 4.95,
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Unbeatable edge hold on steepest slopes.", date: "2026-02-18", reviewerName: "Marc V." }
    ],
  },
  {
    id: 104,
    title: "Backcountry Touring Skis",
    description: "Ultra-lightweight ski mountaineering setup compatible with tech pin bindings. Built for endurance ascents and technical descents.",
    category: "skis",
    brand: "Peak Expedition",
    price: 580.00,
    discountPercentage: 12,
    rating: 4.75,
    stock: 6,
    thumbnail: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Saved me so much energy on long climbs.", date: "2026-01-28", reviewerName: "Johanna T." }
    ],
  },

  // --- სნოუბორდები (Snowboards) ---
  {
    id: 201,
    title: "Phantom All-Mountain Snowboard",
    description: "Directional twin snowboard with responsive camber flex. Designed to conquer resort groomers, park jumps, and sidecountry powder.",
    category: "snowboards",
    brand: "Zero Gravity",
    price: 489.99,
    discountPercentage: 10,
    rating: 4.9,
    stock: 7,
    thumbnail: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Best board I've ridden in 10 years. Pop is insane.", date: "2026-02-11", reviewerName: "Tyler D." }
    ],
  },
  {
    id: 202,
    title: "Glacier Swallowtail Powder Board",
    description: "Iconic swallowtail shape designed specifically for deep untracked powder. Maximum floatation with minimal leg fatigue.",
    category: "snowboards",
    brand: "Zero Gravity",
    price: 540.00,
    discountPercentage: 8,
    rating: 4.95,
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Riding this in waist-deep snow feels like surfing.", date: "2026-01-09", reviewerName: "Chloe B." }
    ],
  },
  {
    id: 203,
    title: "Park & Street Freestyle Snowboard",
    description: "True twin freestyle deck with soft-medium flex and reinforced impact edges. Ideal for rails, boxes, and kicker spins.",
    category: "snowboards",
    brand: "Vertex Snow",
    price: 419.00,
    discountPercentage: 15,
    rating: 4.7,
    stock: 9,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Durable edges and great flex for buttering.", date: "2026-02-15", reviewerName: "Alex N." }
    ],
  },
  {
    id: 204,
    title: "Alpine Carbon Splitboard",
    description: "High-end backcountry splitboard with ultralight carbon stringers and Voilé compatible puck system.",
    category: "snowboards",
    brand: "Peak Expedition",
    price: 679.99,
    discountPercentage: 0,
    rating: 4.92,
    stock: 3,
    thumbnail: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Seamless transition from touring to downhill mode.", date: "2026-01-30", reviewerName: "David R." }
    ],
  },

  // --- ზამთრის სათვალეები და მზის სათვალეები (Goggles & Eyewear) ---
  {
    id: 301,
    title: "Magnetic Toric Alpine Snow Goggles",
    description: "Frameless toric lens goggles with quick-swap magnetic lens system, triple-layer foam, and anti-fog ventilation.",
    category: "goggles",
    brand: "Osprey Vision",
    price: 139.99,
    discountPercentage: 20,
    rating: 4.9,
    stock: 14,
    thumbnail: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Swapping lenses on the chairlift takes 3 seconds. Zero fogging.", date: "2026-02-04", reviewerName: "Martin G." }
    ],
  },
  {
    id: 302,
    title: "Polarized Glacier Winter Sunglasses",
    description: "Classic high-altitude glacier sunglasses with leather side shields and Category 4 polarized lenses for total UV glare protection.",
    category: "goggles",
    brand: "Alpinist Pro",
    price: 119.50,
    discountPercentage: 10,
    rating: 4.85,
    stock: 12,
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Absolute lifesaver in blinding glacier reflection.", date: "2026-01-22", reviewerName: "Helena B." }
    ],
  },
  {
    id: 303,
    title: "Photochromic All-Weather Snow Goggles",
    description: "Adaptive tint lens that automatically adjusts darkness based on sunlight intensity (Cat 1 to Cat 3) in under 10 seconds.",
    category: "goggles",
    brand: "Osprey Vision",
    price: 169.00,
    discountPercentage: 5,
    rating: 4.92,
    stock: 8,
    thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "One lens for both blizzard days and bluebird sunshine.", date: "2026-02-12", reviewerName: "Chris K." }
    ],
  },

  // --- ჩაფხუტები (Helmets) ---
  {
    id: 401,
    title: "MIPS Carbon Winter Ski Helmet",
    description: "Ultra-lightweight ski & snowboard helmet equipped with MIPS rotational impact protection, adjustable active venting, and audio ear pads.",
    category: "helmets",
    brand: "Armor Alpine",
    price: 179.99,
    discountPercentage: 12,
    rating: 4.94,
    stock: 11,
    thumbnail: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Comfortable fit, vents work brilliantly, lightweight.", date: "2026-01-18", reviewerName: "Daniel W." }
    ],
  },
  {
    id: 402,
    title: "Visor Integrated Alpine Helmet",
    description: "Integrated panoramic photochromic visor helmet. Ideal for eyeglass wearers (OTG) and maximum peripheral sight lines.",
    category: "helmets",
    brand: "Armor Alpine",
    price: 219.00,
    discountPercentage: 8,
    rating: 4.88,
    stock: 6,
    thumbnail: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "No more fogged goggles over prescription glasses.", date: "2026-02-08", reviewerName: "Karin L." }
    ],
  },
  {
    id: 403,
    title: "Freestyle Low-Profile Snow Helmet",
    description: "Minimalist skate-inspired winter helmet with durable ABS shell and EPS impact liner. Seamless goggle strap lock.",
    category: "helmets",
    brand: "Vertex Snow",
    price: 99.99,
    discountPercentage: 10,
    rating: 4.78,
    stock: 15,
    thumbnail: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Looks clean, no mushroom head, great fit.", date: "2026-01-25", reviewerName: "Sam P." }
    ],
  },

  // --- აქსესუარები (Accessories: Poles, Gloves, Bags) ---
  {
    id: 501,
    title: "Carbon Fiber Adjustable Ski Poles",
    description: "Pair of two-section telescopic carbon fiber ski poles with ergonomic foam grips, carbide tips, and powder baskets.",
    category: "accessories",
    brand: "Alpinist Pro",
    price: 89.99,
    discountPercentage: 10,
    rating: 4.85,
    stock: 18,
    thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Stiff and super light. Locks don't slip even in freezing cold.", date: "2026-02-01", reviewerName: "Oliver T." }
    ],
  },
  {
    id: 502,
    title: "Gore-Tex Thermal Winter Gloves",
    description: "Waterproof and windproof Gore-Tex insulated alpine gloves with goat leather palm and touchscreen compatible fingertips.",
    category: "accessories",
    brand: "Nordica Peak",
    price: 79.00,
    discountPercentage: 15,
    rating: 4.9,
    stock: 22,
    thumbnail: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Hands stayed warm and bone dry in -18°C wind.", date: "2026-01-19", reviewerName: "Mia H." }
    ],
  },
  {
    id: 503,
    title: "Alpine Avalanche Airbag Backpack 30L",
    description: "Dedicated backcountry ski touring pack with avalanche safety gear pocket, ski/snowboard carry straps, and deployment system.",
    category: "accessories",
    brand: "Peak Expedition",
    price: 389.00,
    discountPercentage: 5,
    rating: 4.96,
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Essential backcountry kit. Build quality is top tier.", date: "2026-02-14", reviewerName: "Henrik B." }
    ],
  }
];
