import { useEffect, useState, useTransition } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProducts } from "@/api/products.api";
import { useCart } from "@/context/CartContext";
import { ProductGrid } from "@/components/product/ProductGrid";
import { formatPrice, getDiscountedPrice, formatDate } from "@/utils/format";
import {
  IconCart,
  IconCheck,
  IconStar,
  IconLeaf,
  IconTruck,
  IconShield,
  IconArrowLeft,
} from "@/components/ui/Icons";
import type { Product } from "@/types/product";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [, startTransition] = useTransition();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      const numericId = Number(id);
      if (!id || isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
        setError("Product not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setQuantity(1);
        setAddedToast(false);

        const data = await getProductById(id);
        if (!isMounted) return;

        setProduct(data);
        setActiveImage(data.images?.[0] || data.thumbnail);

        // Fetch related products from the same category
        try {
          const related = await getProducts({
            category: data.category,
            limit: 5,
          });
          if (isMounted) {
            setRelatedProducts(
              related.products.filter((p) => p.id !== data.id).slice(0, 4)
            );
          }
        } catch {
          // related products error should not break the page
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Product not found");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;
    addItem(product, quantity);
    setAddedToast(true);
    setTimeout(() => {
      startTransition(() => {
        setAddedToast(false);
      });
    }, 2800);
  };

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) return product.stock;
      return next;
    });
  };

  // 1. Loading Skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-pulse">
        <div className="h-4 w-40 rounded-md bg-stone-200/80 dark:bg-stone-800" />
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
          <div className="aspect-square w-full rounded-3xl bg-stone-200/80 dark:bg-stone-800" />
          <div className="space-y-5">
            <div className="h-4 w-28 rounded-md bg-stone-200/80 dark:bg-stone-800" />
            <div className="h-8 w-4/5 rounded-lg bg-stone-200/80 dark:bg-stone-800" />
            <div className="h-5 w-32 rounded-md bg-stone-200/80 dark:bg-stone-800" />
            <div className="h-10 w-48 rounded-lg bg-stone-200/80 dark:bg-stone-800" />
            <div className="h-28 w-full rounded-2xl bg-stone-200/80 dark:bg-stone-800" />
            <div className="h-12 w-64 rounded-xl bg-stone-200/80 dark:bg-stone-800" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Error / 404 State
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-10 shadow-xs dark:border-stone-800 dark:bg-[#181816]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            <IconLeaf className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Product Not Found
          </h2>
          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
            {error || "The requested item is not currently available in our Nordic collection."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition"
          >
            <IconArrowLeft className="h-4 w-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
        <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1 transition">
          <IconArrowLeft className="h-3 w-3" />
          <span>Catalog</span>
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category.replace("-", " ")}</span>
        <span>/</span>
        <span className="truncate text-stone-900 dark:text-stone-200 max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
        
        {/* Left: Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-8 shadow-2xs dark:border-stone-800 dark:bg-[#181816] flex items-center justify-center">
            {hasDiscount && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-xs dark:bg-emerald-600">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
            <img
              src={activeImage || product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`View image ${idx + 1}`}
                  className={`relative aspect-square h-18 w-18 shrink-0 overflow-hidden rounded-2xl border p-1.5 bg-white dark:bg-[#181816] transition-all ${
                    activeImage === img
                      ? "border-stone-900 ring-2 ring-stone-900/30 dark:border-stone-100 dark:ring-stone-100/30 scale-102"
                      : "border-stone-200 opacity-60 hover:opacity-100 dark:border-stone-800"
                  }`}
                >
                  <img src={img} alt={`${product.title} thumb ${idx + 1}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="flex flex-col">
          
          {/* Brand & Category pill */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              <IconLeaf className="h-3 w-3 text-emerald-600" />
              {product.category.replace("-", " ")}
            </span>
            {product.brand && (
              <span className="text-xs font-semibold text-stone-400 dark:text-stone-500">
                by {product.brand}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl dark:text-stone-100 font-sans">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1 font-bold text-amber-500">
              <IconStar className="h-4 w-4" />
              <span className="text-stone-900 dark:text-stone-100 text-sm font-semibold">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-stone-400 dark:text-stone-500">
              • {product.reviews?.length || 0} customer reviews
            </span>
          </div>

          {/* Price Bar */}
          <div className="mt-5 flex items-baseline gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-900/40">
            <span className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              {formatPrice(discountedPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-base text-stone-400 line-through dark:text-stone-500">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Save {formatPrice(product.price - discountedPrice)}
                </span>
              </>
            )}
          </div>

          {/* Stock Meter */}
          <div className="mt-4">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Currently out of stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                Limited Stock: Only {product.stock} units remaining!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                In stock & ready to ship ({product.stock} available)
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              About this piece
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {product.description}
            </p>
          </div>

          {/* Quantity Stepper & Add to Cart */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Stepper */}
              <div className="flex h-12 items-center rounded-2xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900 shadow-2xs">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={isOutOfStock || quantity <= 1}
                  onClick={() => handleQuantityChange(-1)}
                  className="flex h-12 w-11 items-center justify-center rounded-l-2xl text-stone-600 hover:bg-stone-100 disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800 transition"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-bold text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={isOutOfStock || quantity >= product.stock}
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-12 w-11 items-center justify-center rounded-r-2xl text-stone-600 hover:bg-stone-100 disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800 transition"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex h-12 flex-1 min-w-[200px] items-center justify-center gap-2 rounded-2xl px-6 text-sm font-bold shadow-xs transition-all duration-200 active:scale-98 ${
                  addedToast
                    ? "bg-emerald-700 text-white dark:bg-emerald-600"
                    : "bg-stone-900 text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
                }`}
              >
                {addedToast ? (
                  <>
                    <IconCheck className="h-4 w-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <IconCart className="h-4 w-4" />
                    <span>Add to Cart • {formatPrice(discountedPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Added Toast Pill Alert */}
            {addedToast && (
              <div className="flex items-center justify-between rounded-2xl border border-emerald-300/80 bg-emerald-50/90 p-3.5 text-xs font-semibold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-2xs transition-all">
                <span className="flex items-center gap-1.5">
                  <IconCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {quantity}x "{product.title}" is in your cart!
                </span>
                <Link
                  to="/cart"
                  className="rounded-lg bg-emerald-700 px-3 py-1 text-white hover:bg-emerald-800 dark:bg-emerald-500 dark:text-stone-950 transition font-bold"
                >
                  Go to Cart →
                </Link>
              </div>
            )}
          </div>

          {/* Authentic Material / Trust Pillars */}
          <div className="mt-8 border-t border-stone-200/80 pt-6 dark:border-stone-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2.5 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-3 dark:border-stone-800 dark:bg-stone-900/50">
                <IconLeaf className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100">FSC® Oak Craft</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">Sustainable materials</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-3 dark:border-stone-800 dark:bg-stone-900/50">
                <IconTruck className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100">Carbon-Neutral</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">Plastic-free shipping</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-3 dark:border-stone-800 dark:bg-stone-900/50">
                <IconShield className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100">30-Day Trial</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">Nordic guarantee</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-16 sm:mt-20 border-t border-stone-200/80 pt-10 dark:border-stone-800/80">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
              Customer Reviews ({product.reviews?.length || 0})
            </h2>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Verified buyers who welcomed this piece into their home.
            </p>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xs dark:border-stone-800 dark:bg-[#181816]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                        {rev.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        {rev.reviewerName}
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: Math.round(rev.rating) }).map((_, sIdx) => (
                        <IconStar key={sIdx} className="h-3 w-3" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400 italic">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="mt-4 border-t border-stone-100 pt-2 text-[10px] text-stone-400 dark:border-stone-800/80 dark:text-stone-500">
                  Reviewed on {formatDate(rev.date)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-stone-200/80 bg-white p-6 text-center text-xs text-stone-500 dark:border-stone-800 dark:bg-[#181816] dark:text-stone-400">
            No customer reviews yet for this piece.
          </div>
        )}
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-20 border-t border-stone-200/80 pt-10 dark:border-stone-800/80">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
                You May Also Admire
              </h2>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Harmonious Nordic handcrafted companions.
              </p>
            </div>
            <Link
              to="/"
              className="text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Browse all items →
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};
