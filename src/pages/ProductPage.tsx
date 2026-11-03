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
        <div className="h-4 w-32 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square w-full rounded-2xl bg-[#F2EFE9] dark:bg-[#24201D]" />
          <div className="space-y-4">
            <div className="h-3 w-20 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
            <div className="h-6 w-3/4 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
            <div className="h-5 w-28 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
            <div className="h-20 w-full rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="mx-auto max-w-sm rounded-2xl border border-[#EADBCC] bg-white p-8 dark:border-[#332C27] dark:bg-[#24201D]">
          <h2 className="text-base font-bold text-[#2C2724] dark:text-[#F7F5F0]">
            Object Not Found
          </h2>
          <p className="mt-1 text-xs text-[#736B63]">
            {error || "The requested atelier object could not be found."}
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-4 py-2.5 text-xs font-medium text-white transition-colors"
          >
            <IconArrowLeft className="h-3 w-3" />
            <span>Return to Collection</span>
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
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-[#736B63]">
        <Link to="/" className="hover:text-[#2C2724] dark:hover:text-[#F7F5F0] flex items-center gap-1">
          <IconArrowLeft className="h-3 w-3" />
          <span>Collection</span>
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category.replace("-", " ")}</span>
        <span>/</span>
        <span className="truncate text-[#2C2724] dark:text-[#F7F5F0] font-medium">
          {product.title}
        </span>
      </nav>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Left: Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#EADBCC] bg-[#F2EFE9] dark:border-[#332C27] dark:bg-[#24201D] flex items-center justify-center p-6">
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
                  className={`relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border p-1.5 bg-[#F2EFE9] dark:bg-[#24201D] transition ${
                    activeImage === img
                      ? "border-[#8C6D58]"
                      : "border-[#EADBCC] opacity-60 dark:border-[#332C27]"
                  }`}
                >
                  <img src={img} alt={`${product.title} ${idx + 1}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6D58] font-medium">
            {product.brand || product.category.replace("-", " ")}
          </span>

          <h1 className="mt-1.5 text-xl sm:text-3xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#736B63]">
            <div className="flex items-center gap-0.5 text-[#2C2724] dark:text-[#F7F5F0]">
              <IconStar className="h-3.5 w-3.5 fill-current text-[#8C6D58]" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
            </div>
            <span>• {product.reviews?.length || 0} client reviews</span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-2.5 border-y border-[#EADBCC] py-4 dark:border-[#332C27]">
            <span className="text-2xl font-bold text-[#2C2724] dark:text-[#F7F5F0]">
              {formatPrice(discountedPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-[#736B63] line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-md bg-[#8C6D58]/15 px-2 py-0.5 text-[11px] font-semibold text-[#8C6D58]">
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
              <span className="font-medium text-[#736B63]">
                In stock ({product.stock} pieces available)
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-[#736B63] dark:text-[#D6CEC5]">
            {product.description}
          </p>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex h-11 items-center rounded-lg border border-[#EADBCC] bg-white dark:border-[#332C27] dark:bg-[#24201D]">
                <button
                  type="button"
                  disabled={isOutOfStock || quantity <= 1}
                  onClick={() => handleQuantityChange(-1)}
                  className="flex h-11 w-10 items-center justify-center text-[#736B63] hover:text-[#2C2724] disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#2C2724] dark:text-[#F7F5F0]">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={isOutOfStock || quantity >= product.stock}
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-11 w-10 items-center justify-center text-[#736B63] hover:text-[#2C2724] disabled:opacity-40"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-5 text-xs font-medium text-white disabled:opacity-40 transition-colors"
              >
                {addedToast ? (
                  <>
                    <IconCheck className="h-4 w-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <IconCart className="h-4 w-4" />
                    <span>Add to Cart • {formatPrice(discountedPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {addedToast && (
              <div className="flex items-center justify-between rounded-lg border border-[#EADBCC] bg-white p-3 text-xs text-[#2C2724] dark:border-[#332C27] dark:bg-[#24201D] dark:text-[#F7F5F0]">
                <span>{quantity}× added to cart</span>
                <Link to="/cart" className="font-semibold text-[#8C6D58] underline">
                  View Cart →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-12 border-t border-[#EADBCC] pt-8 dark:border-[#332C27]">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2C2724] dark:text-[#F7F5F0]">
            Client Reviews ({product.reviews.length})
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#EADBCC] bg-white p-4 text-xs dark:border-[#332C27] dark:bg-[#24201D]"
              >
                <div className="flex items-center justify-between font-semibold text-[#2C2724] dark:text-[#F7F5F0]">
                  <span>{rev.reviewerName}</span>
                  <span className="text-[#8C6D58]">★ {rev.rating}</span>
                </div>
                <p className="mt-1.5 text-[#736B63]">
                  "{rev.comment}"
                </p>
                <p className="mt-2 text-[10px] text-[#736B63]/80">
                  {formatDate(rev.date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 border-t border-[#EADBCC] pt-8 dark:border-[#332C27]">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#2C2724] dark:text-[#F7F5F0]">
            Related Objects
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};
