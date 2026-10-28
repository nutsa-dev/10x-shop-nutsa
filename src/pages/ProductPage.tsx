import { useEffect, useState, useTransition } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProducts } from "@/api/products.api";
import { useCart } from "@/context/CartContext";
import { ProductGrid } from "@/components/product/ProductGrid";
import { formatPrice, getDiscountedPrice, formatDate } from "@/utils/format";
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
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        setQuantity(1);
        setAddedToast(false);

        const data = await getProductById(id);
        if (!isMounted) return;

        setProduct(data);
        setActiveImage(data.images?.[0] || data.thumbnail);

        // მსგავსი პროდუქტების წამოღება იმავე კატეგორიიდან
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
    }, 2500);
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
      <div className="container mx-auto px-4 py-8">
        <div className="h-4 w-32 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-24 w-full animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-12 w-48 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>
      </div>
    );
  }

  // 2. 404 / Not Found State
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <span className="text-4xl">🪵</span>
          <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-stone-100">
            Product Not Found
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {error || "The product you are looking for does not exist or has been removed."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            ← Back to Catalog
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
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-200">
          Catalog
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category.replace("-", " ")}</span>
        <span>/</span>
        <span className="truncate font-medium text-stone-900 dark:text-stone-200">
          {product.title}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900 flex items-center justify-center">
            {hasDiscount && (
              <span className="absolute left-4 top-4 z-10 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
            <img
              src={activeImage || product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border p-1 bg-white dark:bg-stone-900 transition ${
                    activeImage === img
                      ? "border-amber-700 ring-2 ring-amber-600/30 dark:border-amber-500"
                      : "border-stone-200 opacity-70 hover:opacity-100 dark:border-stone-800"
                  }`}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="flex flex-col">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <span>{product.category.replace("-", " ")}</span>
            {product.brand && (
              <>
                <span>•</span>
                <span>{product.brand}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-100">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-500">
              ★ {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-stone-400 dark:text-stone-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-3 border-y border-stone-200 py-4 dark:border-stone-800">
            <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {formatPrice(discountedPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-base text-stone-400 line-through dark:text-stone-500">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  Save {formatPrice(product.price - discountedPrice)}
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div className="mt-4">
            {isOutOfStock ? (
              <span className="inline-flex items-center rounded-md bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                ● Out of stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                ● Low stock: Only {product.stock} units remaining!
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                ● In stock ({product.stock} available)
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              Description
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {product.description}
            </p>
          </div>

          {/* Quantity Stepper & Add to Cart */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center rounded-xl border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={isOutOfStock || quantity <= 1}
                  onClick={() => handleQuantityChange(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-l-xl text-stone-600 hover:bg-stone-100 disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800 transition"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={isOutOfStock || quantity >= product.stock}
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-r-xl text-stone-600 hover:bg-stone-100 disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800 transition"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex flex-1 min-w-[200px] items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
              >
                <span>{addedToast ? "Added to Cart ✓" : "Add to Cart"}</span>
              </button>
            </div>

            {/* Added Toast / View Cart Action */}
            {addedToast && (
              <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300 transition">
                <span>{quantity}x "{product.title}" added to your cart!</span>
                <Link
                  to="/cart"
                  className="font-bold underline hover:no-underline"
                >
                  View Cart →
                </Link>
              </div>
            )}
          </div>

          {/* Highlights / Features */}
          <div className="mt-8 border-t border-stone-200 pt-6 dark:border-stone-800">
            <dl className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg bg-stone-50 p-3 dark:bg-stone-900/60">
                <dt className="text-stone-400">Authentic Materials</dt>
                <dd className="mt-0.5 font-semibold text-stone-800 dark:text-stone-200">
                  Nordic Eco Craft
                </dd>
              </div>
              <div className="rounded-lg bg-stone-50 p-3 dark:bg-stone-900/60">
                <dt className="text-stone-400">Shipping</dt>
                <dd className="mt-0.5 font-semibold text-stone-800 dark:text-stone-200">
                  Fast & Secure Delivery
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-16 border-t border-stone-200 pt-10 dark:border-stone-800">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Customer Reviews ({product.reviews?.length || 0})
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      {rev.reviewerName}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-500">
                      {"★".repeat(Math.round(rev.rating))}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 italic">
                    "{rev.comment}"
                  </p>
                </div>
                <span className="mt-3 text-[10px] text-stone-400 dark:text-stone-500">
                  {formatDate(rev.date)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
            No reviews yet for this product.
          </p>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-stone-200 pt-10 dark:border-stone-800">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Related Nordic Products
            </h2>
            <Link
              to="/"
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
            >
              See all →
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};
