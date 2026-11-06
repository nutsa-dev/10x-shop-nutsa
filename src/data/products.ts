import type { Product } from "@/types/product";

/**
 * ============================================================================
 * 10X SHOP — პროდუქციის და ფოტოების მონაცემთა ბაზა (PRODUCTS & IMAGES REGISTRY)
 * ============================================================================
 * 
 * ყველა პროდუქტი ლოკალური და ქურეითიდ ფოტოებით (public/products/ ფოლდერიდან).
 * ============================================================================
 */

export const NEW_PRODUCT_PHOTOS: Array<{
  imageUrl: string;
  suggestedCategory?: "furniture" | "home-decoration" | "christmas-market" | "wooden-toys";
  title?: string;
  description?: string;
}> = [];

/**
 * მაღაზიის ყველა აქტიური პროდუქტი 4 კატეგორიის მიხედვით
 */
export const STORE_PRODUCTS: Product[] = [
  // ==========================================================================
  // 1. FURNITURE (ავეჯი)
  // ==========================================================================
  {
    id: 3009,
    title: "Scandinavian Sculptural Oak Lounge Chair & Low Coffee Table Set",
    description:
      "Handcrafted Nordic living room ensemble featuring a curved steam-bent solid oak lounge armchair with natural linen seat cushion and a matching low architectural oak coffee table with slab legs.",
    price: 1150,
    discountPercentage: 12,
    rating: 4.9,
    stock: 6,
    brand: "10X Atelier",
    category: "furniture",
    thumbnail: "/products/Furniture.jpg",
    images: ["/products/Furniture.jpg"],
    reviews: [
      {
        rating: 5,
        comment: "The steam-bent oak backrest is a work of art and remarkably comfortable.",
        date: "2026-02-10T13:15:00.000Z",
        reviewerName: "Luka M.",
      },
    ],
  },
  {
    id: 3010,
    title: "Nordic Solid Oak Dining Table & 4 Linen-Cushioned Chairs Set",
    description:
      "Full-grain European white oak dining table with sled-frame timber legs and four ergonomic curved-back oak dining chairs upholstered in tactile oatmeal bouclé cushions.",
    price: 1680,
    discountPercentage: 15,
    rating: 5.0,
    stock: 4,
    brand: "10X Atelier",
    category: "furniture",
    thumbnail: "/products/furniture1.jpeg",
    images: ["/products/furniture1.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "Our family gathering centerpiece. Heavy, solid timber and timeless Nordic lines.",
        date: "2026-02-14T15:20:00.000Z",
        reviewerName: "Ketevan S.",
      },
    ],
  },
  {
    id: 3001,
    title: "Nordic Minimalist Oak Bookcase & Modular Floating Shelves",
    description:
      "Handcrafted Scandinavian natural oak floor-to-ceiling shelving library accompanied by floating wall shelves. Built with mortise-and-tenon timber joinery, organic matte wax finish, and ample room for heirloom book collections, art volumes, and studio ceramic display.",
    price: 890,
    discountPercentage: 10,
    rating: 4.9,
    stock: 5,
    brand: "10X Atelier",
    category: "furniture",
    thumbnail: "/products/Furniture3.jpg",
    images: [
      "/products/Furniture3.jpg",
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Flawless joinery and warm timber grain. Transformed our reading room.",
        date: "2026-02-12T11:30:00.000Z",
        reviewerName: "Nino G.",
      },
      {
        rating: 5,
        comment: "Incredible solid oak quality, feels sturdy and heirloom-grade.",
        date: "2026-02-18T16:40:00.000Z",
        reviewerName: "David K.",
      },
    ],
  },
  {
    id: 3011,
    title: "Artisanal Oak Reading Lounge Chair, Shelving & Sideboard Ensemble",
    description:
      "Complete Scandinavian study and living room furniture collection crafted from kiln-dried natural oak, combining a deep cushioned reading armchair, low tea table, open bookcase, and cabinet console.",
    price: 1390,
    discountPercentage: 10,
    rating: 4.9,
    stock: 5,
    brand: "10X Atelier",
    category: "furniture",
    thumbnail: "/products/furniture4.jpeg",
    images: ["/products/furniture4.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "Brings unmatched warmth and harmony to our sunlit studio apartment.",
        date: "2026-02-19T11:00:00.000Z",
        reviewerName: "Giorgi T.",
      },
    ],
  },
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
    id: 3002,
    title: "Artisanal Turned Oak Wall Clock, Mirror & Botanical Vases Set",
    description:
      "Curated Nordic entryway wall gallery featuring a solid turned oak circular wall clock, matching round beveled timber mirror, hand-lathed wooden bud vases, carved console bowl, and geometric sculptural accents. Infuses warmth, organic textures, and acoustic serenity into any living room or foyer.",
    price: 165,
    discountPercentage: 12,
    rating: 4.9,
    stock: 14,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail: "/products/Home-decor2.jpg",
    images: [
      "/products/Home-decor2.jpg",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    reviews: [
      {
        rating: 5,
        comment: "Exquisite craftsmanship, the clock mechanism is completely silent and the wood is silky smooth.",
        date: "2026-02-15T14:20:00.000Z",
        reviewerName: "Salome B.",
      },
    ],
  },
  {
    id: 3012,
    title: "Nordic Oak Framed Botanical Art, Taper Candleholders & Sculptural Rings Set",
    description:
      "Gallery-grade solid oak wall frames paired with hand-lathed wooden taper candleholders, interlocking sculptural timber rings, a carved console tray, and turned wooden bud vases.",
    price: 148,
    discountPercentage: 10,
    rating: 4.9,
    stock: 11,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail: "/products/Home-decor2.jpg1.jpeg",
    images: ["/products/Home-decor2.jpg1.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "Looks like an architectural design magazine spread on our sideboard.",
        date: "2026-02-17T10:30:00.000Z",
        reviewerName: "Nia K.",
      },
    ],
  },
  {
    id: 3013,
    title: "Hand-Turned Timber Candleholders, Carved Tray & Figurines Collection",
    description:
      "Minimalist Scandinavian bedroom and console decor set featuring geometric and cylindrical turned ash candleholders, organic carved wooden tray, abstract timber figurines, and wooden chain links.",
    price: 134,
    discountPercentage: 8,
    rating: 4.8,
    stock: 16,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail: "/products/home-decor5.jpeg",
    images: ["/products/home-decor5.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "Warm organic wood tones and wonderful tactile finish.",
        date: "2026-02-20T16:15:00.000Z",
        reviewerName: "Tamar D.",
      },
    ],
  },
  {
    id: 3014,
    title: "Scandinavian Oak Wall Gallery, Tree-Ring Medallions & Turned Stool Ensemble",
    description:
      "Curated botanical oak wall frames, natural live-edge tree-ring slices, woven bamboo sunburst medallion, mini decorative wall ladder, and a solid turned oak side stool with carved timber vessels.",
    price: 178,
    discountPercentage: 10,
    rating: 4.9,
    stock: 12,
    brand: "10X Living",
    category: "home-decoration",
    thumbnail: "/products/home-decor3.jpg",
    images: ["/products/home-decor3.jpg"],
    reviews: [
      {
        rating: 5,
        comment: "Every piece feels authentically handcrafted and brings nature right indoors.",
        date: "2026-02-22T12:40:00.000Z",
        reviewerName: "Nino M.",
      },
    ],
  },
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
    id: 3015,
    title: "Hand-Painted Nordic Folk Wooden Tree Ornaments Set",
    description:
      "Heirloom Scandinavian holiday tree ornaments carved from solid oak and walnut with white hand-painted botanical motifs, including folk baubles, woodland bird, Dala horse, stocking, and turned wooden bells on jute twine.",
    price: 46,
    discountPercentage: 10,
    rating: 4.9,
    stock: 28,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail: "/products/christmas.jpeg",
    images: ["/products/christmas.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "Delicate white folk artwork on real wood grain. Looks magical on our fir tree.",
        date: "2025-12-20T14:15:00.000Z",
        reviewerName: "Anano K.",
      },
    ],
  },
  {
    id: 3016,
    title: "Artisanal Wooden Christmas Market Stalls & Ferris Wheel Village",
    description:
      "Handcrafted miniature European winter market fairground featuring striped linen-canopy wooden vendor stalls, rotating timber Ferris wheel, carved pine trees, miniature sleigh, fences, and festive wooden villagers.",
    price: 124,
    discountPercentage: 12,
    rating: 5.0,
    stock: 10,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail: "/products/christmas1.jpeg",
    images: ["/products/christmas1.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "A breathtaking family heirloom centerpiece! The tiny wooden stalls and Ferris wheel are incredible.",
        date: "2025-12-23T19:00:00.000Z",
        reviewerName: "Dato G.",
      },
    ],
  },
  {
    id: 3003,
    title: "Nordic Wooden Miniature Holiday Village & Tree Ornaments Set",
    description:
      "Hand-carved Scandinavian holiday timber village featuring tabletop pine trees, mini chalets with cutout windows, carved forest reindeer, and hanging snowflakes, stars, and wooden angels with natural twine loops.",
    price: 58,
    discountPercentage: 15,
    rating: 4.9,
    stock: 24,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail: "/products/Christmas-Market.jpeg",
    images: ["/products/Christmas-Market.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "Brings such a heartwarming Nordic festive glow to our holiday table.",
        date: "2025-12-22T12:00:00.000Z",
        reviewerName: "Mariam S.",
      },
    ],
  },
  {
    id: 3004,
    title: "Artisanal Timber Candleholders & Winter Solstice Mantelpiece Collection",
    description:
      "Solid turned oak and beech taper candleholders accompanied by carved forest reindeer pairs, timber winter angels, snow-dusted wooden cottages, aromatic cinnamon sticks, and pinecone accents.",
    price: 94,
    discountPercentage: 10,
    rating: 5.0,
    stock: 16,
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail: "/products/Christmas-Market3.jpg",
    images: ["/products/Christmas-Market3.jpg"],
    reviews: [
      {
        rating: 5,
        comment: "Absolutely stunning centerpiece. The natural wood fragrance and candlelight reflection are magical.",
        date: "2025-12-24T18:30:00.000Z",
        reviewerName: "Salome Ch.",
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
    brand: "10X Seasonal",
    category: "christmas-market",
    thumbnail:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&h=800&q=80",
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
    id: 3005,
    title: "Heirloom Montessori Wooden Train & Forest Wildlife Set",
    description:
      "Solid beechwood handcrafted locomotive with modular detachable cargo carriages, natural rainbow stacking ring tower, miniature wooden vehicles, and smooth carved woodland animal figures (bear, deer, rabbit, fox). Finished with organic beeswax.",
    price: 76,
    discountPercentage: 10,
    rating: 4.9,
    stock: 18,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail: "/products/Wooden-Toys.jpeg",
    images: ["/products/Wooden-Toys.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "The quality is simply sublime. Smooth, non-toxic, and our toddler loves it.",
        date: "2026-02-14T09:20:00.000Z",
        reviewerName: "Elene M.",
      },
    ],
  },
  {
    id: 3006,
    title: "Artisanal Wooden Vehicle, Rainbow Arch & Playroom Play Set",
    description:
      "Premium ecological nursery play collection including red fire engine with swivel ladder, police rescue cruiser, large wooden rainbow stacking arch, Noah's balance ark with animals, wooden tool hammers, and organic timber cookware.",
    price: 88,
    discountPercentage: 12,
    rating: 4.9,
    stock: 15,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail: "/products/Wooden-Toys1.jpeg",
    images: ["/products/Wooden-Toys1.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "Gorgeous colors dyed with water pigments. The rainbow arch and fire truck are heirloom quality.",
        date: "2026-02-16T11:45:00.000Z",
        reviewerName: "Levan K.",
      },
    ],
  },
  {
    id: 3007,
    title: "Montessori Wooden Castle Blocks, Shape Sorter & Railway Set",
    description:
      "Multi-element architectural nursery fortress featuring pastel turrets, medieval gateway arches, geometric shape sorter with wooden bead maze, biplane, helicopter, wooden railway bridge, and safari figures.",
    price: 92,
    discountPercentage: 10,
    rating: 4.8,
    stock: 20,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail: "/products/Wooden-Toys2.jpg",
    images: ["/products/Wooden-Toys2.jpg"],
    reviews: [
      {
        rating: 5,
        comment: "Endless creative possibilities for spatial development and open-ended play.",
        date: "2026-02-19T13:10:00.000Z",
        reviewerName: "Tato J.",
      },
    ],
  },
  {
    id: 3008,
    title: "Nordic Dala Horse, Wooden Cargo Trucks & Wildlife Sensory Set",
    description:
      "Authentic Swedish folk-inspired Dala horse figurine paired with natural timber cargo transport trucks, sensory timber stacking rings, modular jigsaw puzzle blocks, and rounded forest creatures.",
    price: 72,
    discountPercentage: 8,
    rating: 4.9,
    stock: 22,
    brand: "10X Play",
    category: "wooden-toys",
    thumbnail: "/products/Wooden-Toys3.jpeg",
    images: ["/products/Wooden-Toys3.jpeg"],
    reviews: [
      {
        rating: 5,
        comment: "The Dala horse is so charming, and the trucks roll smoothly on hardwood floors.",
        date: "2026-02-21T15:00:00.000Z",
        reviewerName: "Ana T.",
      },
    ],
  },
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
    ],
    reviews: [],
  },
];
