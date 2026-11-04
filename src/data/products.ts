import type { Product } from "@/types/product";

/**
 * ============================================================================
 * 10X SHOP — პროდუქციის და ფოტოების მონაცემთა ბაზა (PRODUCTS & IMAGES REGISTRY)
 * ============================================================================
 * 
 * ინსტრუქცია:
 * 1. აქ მოცემულია მაღაზიის ყველა პროდუქტი თავისი ფოტოებით (thumbnail და images).
 * 2. თუ გსურთ ახალი ფოტოების დამატება, შეგიძლიათ უბრალოდ ჩაწეროთ მათი ლინკები
 *    ქვემოთ მოცემულ NEW_PRODUCT_PHOTOS სიაში ან პირდაპირ STORE_PRODUCTS-ში.
 * 3. შეინახეთ ფაილი, მომწერეთ და მე მათ მომენტალურად დავასათაურებ, აღვწერ
 *    და განვათავსებ შესაბამის კატეგორიაში!
 * ============================================================================
 */

/**
 * ⬇️ ახალი ფოტოების სია (დაამატეთ აქ თქვენი ფოტოების ლინკები) ⬇️
 */
export const NEW_PRODUCT_PHOTOS: Array<{
  imageUrl: string;
  suggestedCategory?: "furniture" | "home-decoration" | "christmas-market" | "wooden-toys";
  title?: string;
  description?: string;
}> = [
  // მაგალითად:
  // { imageUrl: "https://images.unsplash.com/...", suggestedCategory: "furniture" },
];

/**
 * მაღაზიის ყველა აქტიური პროდუქტი 4 კატეგორიის მიხედვით
 */
export const STORE_PRODUCTS: Product[] = [
  // ==========================================================================
  // 1. FURNITURE (ავეჯი)
  // ==========================================================================
  {
    id: 11,
    title: "Annibale Colombo Handcrafted Bed",
    description:
      "Solid ash wood headboard with artisanal mortise-and-tenon joints, organic natural timber wax finish, and breathable posture slat support.",
    price: 1899,
    discountPercentage: 10,
    rating: 4.8,
    stock: 6,
    brand: "Annibale Colombo",
    category: "furniture",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/2.png",
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/3.png",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Exceptional solid wood craft and flawless joinery.",
        date: "2026-01-14T10:00:00.000Z",
        reviewerName: "Nino G.",
      },
    ],
  },
  {
    id: 12,
    title: "Annibale Colombo Atelier Sofa",
    description:
      "Sculptural curved timber frame with tactile woven linen upholstery, dense resilient foam, and raw brass ferrule foot accents.",
    price: 2499,
    discountPercentage: 15,
    rating: 4.9,
    stock: 4,
    brand: "Annibale Colombo",
    category: "furniture",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/2.png",
    ],
    reviews: [
      {
        rating: 5,
        comment: "A magnificent statement piece for any minimalist space.",
        date: "2026-01-20T14:15:00.000Z",
        reviewerName: "David K.",
      },
    ],
  },
  {
    id: 13,
    title: "Bedside Table African Cherry Wood",
    description:
      "Artisan nightstand milled from solid African cherry hardwood with soft-close finger-jointed drawer and brushed bronze hardware.",
    price: 299,
    discountPercentage: 8,
    rating: 4.7,
    stock: 12,
    brand: "10X Woodcraft",
    category: "furniture",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/2.png",
    ],
    reviews: [],
  },
  {
    id: 14,
    title: "Knoll Executive Conference Chair",
    description:
      "Ergonomic molded timber shell with vegetable-tanned aniline leather cushions and 360-degree silent walnut swivel base.",
    price: 499,
    discountPercentage: 12,
    rating: 4.8,
    stock: 8,
    brand: "Knoll",
    category: "furniture",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/2.png",
    ],
    reviews: [],
  },
  {
    id: 15,
    title: "Wooden Bathroom Vanity with Stone Sink & Mirror",
    description:
      "Moisture-sealed teak vanity console featuring a natural vessel stone basin and matching beveled floating mirror.",
    price: 799,
    discountPercentage: 10,
    rating: 4.9,
    stock: 5,
    brand: "10X Atelier",
    category: "furniture",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/1.png",
      "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/2.png",
    ],
    reviews: [],
  },

  // ==========================================================================
  // 2. HOME DECOR (დეკორი)
  // ==========================================================================
  {
    id: 43,
    title: "Handmade Organic Indoor Decor Swing",
    description:
      "Acoustic timber hanging seat crafted with thick nautical cotton ropes and natural birch seating for cozy reading nooks.",
    price: 119,
    discountPercentage: 10,
    rating: 4.8,
    stock: 9,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/1.png",
      "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/2.png",
    ],
    reviews: [],
  },
  {
    id: 44,
    title: "Family Heirloom Wooden Photo Frame",
    description:
      "Solid walnut gallery picture frame with matte acid-free museum matting and anti-glare protective glass.",
    price: 49,
    discountPercentage: 8,
    rating: 4.7,
    stock: 22,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/home-decoration/Family%20Tree%20Photo%20Frame/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/home-decoration/Family%20Tree%20Photo%20Frame/1.png",
    ],
    reviews: [],
  },
  {
    id: 45,
    title: "House Showpiece Botanical Planter",
    description:
      "Handcrafted terracotta urn with natural aged patina and raw timber drainage saucer.",
    price: 39,
    discountPercentage: 5,
    rating: 4.8,
    stock: 18,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/1.png",
      "https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/2.png",
    ],
    reviews: [],
  },
  {
    id: 46,
    title: "Artisanal Glazed Ceramic Plant Pot",
    description:
      "Textured studio stoneware with tactile earth glaze, ideal for succulents, bonsai, and interior greenery.",
    price: 35,
    discountPercentage: 7,
    rating: 4.6,
    stock: 25,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/1.png",
    ],
    reviews: [],
  },
  {
    id: 47,
    title: "Solid Turned Oak Atelier Table Lamp",
    description:
      "Warm accent ambient lamp turned from a single block of English oak with hand-pleated flax linen shade and brass dimmer switch.",
    price: 89,
    discountPercentage: 12,
    rating: 4.9,
    stock: 15,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/home-decoration/Table%20Lamp/thumbnail.png",
    images: [
      "https://cdn.dummyjson.com/products/images/home-decoration/Table%20Lamp/1.png",
    ],
    reviews: [],
  },

  // ==========================================================================
  // 3. CHRISTMAS MARKET (საახალწლო მარკეტი)
  // ==========================================================================
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

  // ==========================================================================
  // 4. WOODEN TOYS (ხის სათამაშოები)
  // ==========================================================================
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
];
