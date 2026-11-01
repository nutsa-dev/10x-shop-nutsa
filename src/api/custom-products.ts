import type { Product } from "@/types/product";

export const WINTER_SPORTS_PRODUCTS: Product[] = [
  // ==========================================
  // SKIS (Evo / Backcountry Curated)
  // ==========================================
  {
    id: 101,
    title: "QST 106 Skis 2026",
    brand: "Salomon",
    description: "The benchmark all-mountain freeride ski. Features a full poplar woodcore reinforced with carbon and flax fiber for damp, stable charging in mixed snow and effortless float in powder.",
    category: "skis",
    price: 699.95,
    discountPercentage: 15,
    rating: 4.9,
    stock: 9,
    thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Damp, predictable, and cuts through Pacific Northwest heavy powder like butter.", date: "2026-01-14", reviewerName: "Brad W." },
      { rating: 5, comment: "Best daily driver ski on the market.", date: "2026-02-02", reviewerName: "Chris M." }
    ],
    specs: {
      "Ability Level": "Advanced - Expert",
      "Terrain": "All-Mountain, Freeride",
      "Rocker Type": "Rocker / Camber / Rocker",
      "Turning Radius": "19m @ 181cm",
      "Core": "Full Poplar Woodcore + C/FX",
    },
  },
  {
    id: 102,
    title: "Bent 100 Skis 2026",
    brand: "Atomic",
    description: "Legendary freeride & freestyle versatility designed with Chris Benchetler. Features HRZN Tech Tip & Tail for 10% more surface area in deep snow without adding swing weight.",
    category: "skis",
    price: 599.95,
    discountPercentage: 0,
    rating: 4.95,
    stock: 6,
    thumbnail: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Super playful and energetic. Great on groomers, park, and trees.", date: "2026-01-20", reviewerName: "Tyler G." }
    ],
    specs: {
      "Ability Level": "Intermediate - Advanced",
      "Terrain": "All-Mountain, Freestyle",
      "Rocker Type": "Powder Rocker 20/70/10",
      "Turning Radius": "19.5m @ 180cm",
      "Core": "Light Woodcore",
    },
  },
  {
    id: 103,
    title: "Atris Skis",
    brand: "Black Crows",
    description: "Chamonix-born big mountain powerhouse. A stable 105mm waist with double rocker and classic medium camber that strikes the holy grail of stability at speed and maneuverability.",
    category: "skis",
    price: 899.95,
    discountPercentage: 10,
    rating: 4.92,
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Unbelievable French alpine craftsmanship. Stiff enough for icy steeps yet pops easily.", date: "2026-02-18", reviewerName: "Julien D." }
    ],
    specs: {
      "Ability Level": "Advanced - Expert",
      "Terrain": "Big Mountain, Powder",
      "Rocker Type": "Double Rocker",
      "Turning Radius": "20m @ 184cm",
      "Core": "Poplar / Fiberglass",
    },
  },
  {
    id: 104,
    title: "ARV 106 Skis",
    brand: "Armada",
    description: "All-mountain freestyle flagship. Built with Ash binding inserts and oversized 2.5 impact edges to handle aggressive park landings and backcountry pillows.",
    category: "skis",
    price: 649.95,
    discountPercentage: 12,
    rating: 4.8,
    stock: 7,
    thumbnail: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "The ultimate one-ski quiver for Western resorts.", date: "2026-01-28", reviewerName: "Kyle R." }
    ],
    specs: {
      "Ability Level": "Advanced - Expert",
      "Terrain": "All-Mountain, Park & Pipe",
      "Rocker Type": "AR Freestyle Rocker",
      "Turning Radius": "20.5m @ 180cm",
      "Core": "Poplar Ash Core",
    },
  },

  // ==========================================
  // SNOWBOARDS (Evo / Backcountry Curated)
  // ==========================================
  {
    id: 201,
    title: "Custom Camber Snowboard 2026",
    brand: "Burton",
    description: "The most recognized, proven snowboard in snowboarding history. Pure camber precision combined with Carbon Highlights and Super Fly II 700G core.",
    category: "snowboards",
    price: 659.95,
    discountPercentage: 10,
    rating: 4.95,
    stock: 8,
    thumbnail: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "There is a reason this board has been iconic for 25+ years. Unbeatable pop.", date: "2026-02-11", reviewerName: "Jake P." }
    ],
    specs: {
      "Ability Level": "Intermediate - Expert",
      "Terrain": "All-Mountain",
      "Shape": "Directional",
      "Rocker Type": "Camber",
      "Flex Rating": "Medium-Stiff (7/10)",
    },
  },
  {
    id: 202,
    title: "Mountain Twin Snowboard",
    brand: "Jones",
    description: "Jeremy Jones' daily driver for shredding everything from natural halfpipes to backcountry lines. 3D Contour Base 2.0 with Traction Tech 3.0 edges.",
    category: "snowboards",
    price: 579.95,
    discountPercentage: 0,
    rating: 4.9,
    stock: 5,
    thumbnail: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Turns on ice like it's rail-guided. The blunt nose floats so well.", date: "2026-01-09", reviewerName: "Mark L." }
    ],
    specs: {
      "Ability Level": "Intermediate - Advanced",
      "Terrain": "All-Mountain, Freeride",
      "Shape": "Directional Twin",
      "Rocker Type": "CamRock",
      "Flex Rating": "Medium (6/10)",
    },
  },
  {
    id: 203,
    title: "Defenders of Awesome (D.O.A.)",
    brand: "Capita",
    description: "Seven-time Transworld Good Wood award winner. Resort V1 profile with carbon fiber boosters and Kevlar bound sidewalls. Unstoppable pop and freestyle precision.",
    category: "snowboards",
    price: 529.95,
    discountPercentage: 15,
    rating: 4.93,
    stock: 10,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Fast base, ultra snappy pop off jumps, very responsive.", date: "2026-02-15", reviewerName: "Sean K." }
    ],
    specs: {
      "Ability Level": "Intermediate - Advanced",
      "Terrain": "All-Mountain, Freestyle",
      "Shape": "True Twin",
      "Rocker Type": "Resort V1 Camber",
      "Flex Rating": "Medium (5.5/10)",
    },
  },
  {
    id: 204,
    title: "T.Rice Pro Snowboard",
    brand: "Lib Tech",
    description: "Travis Rice's Jackson Hole designed weapon. Features Original Power Construction with Magne-Traction serrated edges and C2 hybrid rocker/camber contour.",
    category: "snowboards",
    price: 649.95,
    discountPercentage: 8,
    rating: 4.88,
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Magne-Traction holds on pure hardpack ice without slipping.", date: "2026-01-30", reviewerName: "Eric V." }
    ],
    specs: {
      "Ability Level": "Advanced - Expert",
      "Terrain": "All-Mountain, Freeride",
      "Shape": "True Twin",
      "Rocker Type": "C2 Hybrid",
      "Flex Rating": "Stiff (7/10)",
    },
  },

  // ==========================================
  // GOGGLES & EYEWEAR (Smith, Oakley, Anon)
  // ==========================================
  {
    id: 301,
    title: "I/O MAG ChromaPop Goggles",
    brand: "Smith",
    description: "Smith MAG quick-release magnetic lens change system with BirdsEye Vision spherical lens and ChromaPop color enhancement technology.",
    category: "goggles",
    price: 280.00,
    discountPercentage: 20,
    rating: 4.94,
    stock: 12,
    thumbnail: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "ChromaPop lens makes snow contours pop even in flat storm light.", date: "2026-02-04", reviewerName: "Martin G." }
    ],
    specs: {
      "Lens Shape": "Spherical",
      "Quick Change": "Smith MAG Magnetic",
      "Lens Technology": "ChromaPop Sun + Storm Rose",
      "Anti-Fog": "5X Anti-Fog Inner Lens",
    },
  },
  {
    id: 302,
    title: "Flight Deck L Prizm Snow Goggles",
    brand: "Oakley",
    description: "Rimless goggle design inspired by the helmet visors of fighter pilots. Maximizes field of view with Ridgelock lens technology and Prizm Snow optical tuning.",
    category: "goggles",
    price: 240.00,
    discountPercentage: 10,
    rating: 4.9,
    stock: 15,
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Prizm Sapphire lens is crystal clear. Massive peripheral view.", date: "2026-01-22", reviewerName: "Helena B." }
    ],
    specs: {
      "Lens Shape": "Toric",
      "Lens Technology": "Prizm Snow Technology",
      "Frame Style": "Rimless Panoramic",
      "Fit": "Large / Asian Fit Friendly",
    },
  },
  {
    id: 303,
    title: "M4 Toric MFI Goggles + Face Mask",
    brand: "Anon",
    description: "Features Magna-Tech quick lens-change technology with 14 rare-earth neodymium magnets. Includes MFI magnetic snap-on fleece face mask.",
    category: "goggles",
    price: 339.95,
    discountPercentage: 0,
    rating: 4.96,
    stock: 7,
    thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "The MFI mask attachment without fogging your lens is pure genius.", date: "2026-02-12", reviewerName: "Chris K." }
    ],
    specs: {
      "Lens Shape": "Toric Perceive Lens",
      "Magnets": "14 Neodymium Points",
      "Bonus Included": "MFI Face Mask + Extra Lens",
      "Helmet Compatible": "Yes, Over The Glass (OTG)",
    },
  },

  // ==========================================
  // HELMETS & PROTECTION (Smith, POC, Sweet Protection)
  // ==========================================
  {
    id: 401,
    title: "Vantage MIPS Helmet",
    brand: "Smith",
    description: "Aerocore construction featuring Koroyd tubular honeycomb for energy-absorbing impact protection and Dual Regulator active ventilation (21 total vents).",
    category: "helmets",
    price: 275.00,
    discountPercentage: 15,
    rating: 4.92,
    stock: 11,
    thumbnail: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Vents work exceptionally well on spring warm days and lock tight in blizzards.", date: "2026-01-18", reviewerName: "Daniel W." }
    ],
    specs: {
      "Protection": "MIPS Brain Protection System",
      "Structure": "Hybrid SL Shell + Koroyd",
      "Ventilation": "Dual Regulator 21 Vents",
      "Fit System": "BOA 360 Fit System",
    },
  },
  {
    id: 402,
    title: "Fornix MIPS Ski Helmet",
    brand: "POC",
    description: "Award-winning Swedish minimalist design updated with MIPS rotational impact protection and aramid bridge reinforcements for structural stability.",
    category: "helmets",
    price: 220.00,
    discountPercentage: 0,
    rating: 4.88,
    stock: 9,
    thumbnail: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Super light, looks sleek with no bulk, and fits POC goggles flush.", date: "2026-02-08", reviewerName: "Karin L." }
    ],
    specs: {
      "Protection": "MIPS + Aramid Bridge Wire",
      "Construction": "In-Mold PC Shell + EPS Liner",
      "Ventilation": "Adjustable Top & Goggle Vents",
      "Weight": "420g",
    },
  },
  {
    id: 403,
    title: "Grimnir 2Vi MIPS Carbon Helmet",
    brand: "Sweet Protection",
    description: "Terje Håkonsen's signature pre-preg carbon fiber beast. 2Vi technology platform engineered for extreme high-impact freeride snowboarding.",
    category: "helmets",
    price: 499.95,
    discountPercentage: 10,
    rating: 4.98,
    stock: 3,
    thumbnail: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "The carbon shell finish is breathtaking. Zero vibration at 100 km/h.", date: "2026-01-25", reviewerName: "Terje Fan" }
    ],
    specs: {
      "Shell": "Pre-preg Carbon Fiber",
      "Safety": "2Vi Technology + 2-Layer MIPS",
      "Audio Ready": "Audio Compatible Ear Pads",
      "Certification": "CE EN 1077 Class B / ASTM 2040",
    },
  },

  // ==========================================
  // OUTERWEAR & GLOVES (Arc'teryx, Hestra)
  // ==========================================
  {
    id: 501,
    title: "Fall Line Leather 3-Finger Gloves",
    brand: "Hestra",
    description: "Swedish cowhide leather mitts with removable Bemberg polyester lining and G-Loft insulation. Neoprene cuff with velcro closure and carabiner attachment.",
    category: "outerwear",
    price: 175.00,
    discountPercentage: 10,
    rating: 4.96,
    stock: 14,
    thumbnail: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Keeps fingers warm like mittens but gives trigger finger dexterity.", date: "2026-02-01", reviewerName: "Oliver T." }
    ],
    specs: {
      "Material": "Impregnated Cowhide Aniline Leather",
      "Insulation": "G-Loft Polyester",
      "Lining": "Bemberg Removable Liner",
      "Style": "3-Finger Lobster Claw",
    },
  },
  {
    id: 502,
    title: "Sabre SV GORE-TEX Pro Jacket",
    brand: "Arc'teryx",
    description: "Rugged, stormproof freeride shell crafted from Most Rugged 3-layer GORE-TEX Pro. Features helmet-compatible StormHood, WaterTight pit zips, and integrated powder skirt.",
    category: "outerwear",
    price: 850.00,
    discountPercentage: 0,
    rating: 4.97,
    stock: 5,
    thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Completely impervious to torrential wind, wet sleet, and subzero temps.", date: "2026-01-19", reviewerName: "Mia H." }
    ],
    specs: {
      "Membrane": "3L GORE-TEX Pro Most Rugged",
      "Hood": "Helmet Compatible StormHood",
      "Weight": "610g",
      "RECCO": "Integrated Reflector",
    },
  },

  // ==========================================
  // PACKS & BAGS (Dakine, Ortovox)
  // ==========================================
  {
    id: 601,
    title: "Fall Line Padded Ski Roller Bag 190cm",
    brand: "Dakine",
    description: "The gold standard travel bag for skiers. Fully padded 360-degree protection, fits 2 pairs of skis + poles + boots, with oversized 9cm urethane wheels.",
    category: "bags",
    price: 185.00,
    discountPercentage: 15,
    rating: 4.9,
    stock: 8,
    thumbnail: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Survived 6 international flights without a scratch on my skis.", date: "2026-02-14", reviewerName: "Henrik B." }
    ],
    specs: {
      "Capacity": "Fits 2 pairs of skis up to 190cm + boots",
      "Wheels": "Heavy Duty 9cm Urethane",
      "Padding": "360° Closed Cell Foam",
      "Material": "600D Recycled Polyester Ripstop",
    },
  },
  {
    id: 602,
    title: "Free Rider 28L Avalanche Backcountry Pack",
    brand: "Ortovox",
    description: "Ergonomic backcountry ski touring pack featuring a Clasp Spine Protector backplate, diagonal & A-frame ski carry, and rapid-access dedicated safety equipment sleeve.",
    category: "bags",
    price: 210.00,
    discountPercentage: 5,
    rating: 4.92,
    stock: 6,
    thumbnail: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80"
    ],
    reviews: [
      { rating: 5, comment: "Snugs to your back like a second skin during high-speed tree runs.", date: "2026-01-11", reviewerName: "Nils V." }
    ],
    specs: {
      "Volume": "28 Liters",
      "Carrying System": "Diagonal & D-Skifix A-Frame",
      "Safety": "Emergency Safety Compartment + Whistle",
      "Hydration": "Compatible with insulated hose routing",
    },
  }
];
