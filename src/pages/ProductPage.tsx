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
          // Ignore related error
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
    }, 2200);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 animate-pulse">
        <div className="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square w-full rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-4">
            <div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-6 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-5 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-20 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="mx-auto max-w-sm rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Product Not Found
          </h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {error || "The requested piece of gear could not be found."}
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950 transition"
          >
            <IconArrowLeft className="h-3 w-3" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const isOutOfStock = product.stock <= 0;
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
        <Link to="/" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1">
          <IconArrowLeft className="h-3 w-3" />
          <span>Catalog</span>
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="truncate text-neutral-900 dark:text-neutral-200 font-medium">
          {product.brand ? `${product.brand} ${product.title}` : product.title}
        </span>
      </nav>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Left: Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 flex items-center justify-center p-4">
            <img
              src={activeImage || product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square h-14 w-14 shrink-0 overflow-hidden rounded-lg border p-1 bg-white dark:bg-neutral-900 transition ${
                    activeImage === img
                      ? "border-neutral-900 dark:border-white"
                      : "border-neutral-200 opacity-60 dark:border-neutral-800"
                  }`}
                >
                  <img src={img} alt={`${product.title} ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info (Evo / Backcountry Specs Layout) */}
        <div className="flex flex-col">
          {product.brand && (
            <span className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {product.brand}
            </span>
          )}

          <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
            <div className="flex items-center gap-0.5 text-neutral-700 dark:text-neutral-300">
              <IconStar className="h-3.5 w-3.5 fill-current text-neutral-400" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
            </div>
            <span>• {product.reviews?.length || 0} customer reviews</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2.5 border-y border-neutral-100 py-3 dark:border-neutral-800">
            <span className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {formatPrice(discountedPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-neutral-950">
                  Save {formatPrice(product.price - discountedPrice)}
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3 text-xs">
            {isOutOfStock ? (
              <span className="font-semibold text-rose-600 dark:text-rose-400">Out of stock</span>
            ) : (
              <span className="font-medium text-neutral-600 dark:text-neutral-400">
                In stock ({product.stock} units available)
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
            {product.description}
          </p>

          {/* Evo / Backcountry Technical Specs Table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-5 border-t border-neutral-100 pt-4 dark:border-neutral-800">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Technical Specifications
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-neutral-100 pb-1.5 dark:border-neutral-800/60">
                    <dt className="text-neutral-500 dark:text-neutral-400">{key}:</dt>
                    <dd className="font-semibold text-neutral-800 dark:text-neutral-200 text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2.5">
              {/* Stepper */}
              <div className="flex h-10 items-center rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                <button
                  type="button"
                  disabled={isOutOfStock || quantity <= 1}
                  onClick={() => handleQuantityChange(-1)}
                  className="flex h-10 w-9 items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={isOutOfStock || quantity >= product.stock}
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-10 w-9 items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-5 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition"
              >
                {addedToast ? (
                  <>
                    <IconCheck className="h-3.5 w-3.5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <IconCart className="h-3.5 w-3.5" />
                    <span>Add to Cart • {formatPrice(discountedPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {addedToast && (
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-100 p-2.5 text-xs text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
                <span>{quantity}x added to cart</span>
                <Link to="/cart" className="font-bold underline">
                  View Cart →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-12 border-t border-neutral-200/80 pt-8 dark:border-neutral-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Customer Reviews ({product.reviews.length})
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200/80 bg-white p-3.5 text-xs dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>{rev.reviewerName}</span>
                  <span className="text-neutral-500">★ {rev.rating}</span>
                </div>
                <p className="mt-1.5 text-neutral-600 dark:text-neutral-400">
                  "{rev.comment}"
                </p>
                <p className="mt-2 text-[10px] text-neutral-400">
                  {formatDate(rev.date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 border-t border-neutral-200/80 pt-8 dark:border-neutral-800">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Related Gear
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};
