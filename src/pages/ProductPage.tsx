import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProducts } from "@/api/products.api";
import { useCart } from "@/context/CartContext";
import { ProductGrid } from "@/components/product/ProductGrid";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { formatPrice, getDiscountedPrice, formatDate } from "@/utils/format";
import {
  IconCart,
  IconCheck,
  IconStar,
  IconArrowLeft,
} from "@/components/ui/Icons";
import type { Product, Review } from "@/types/product";

type ProductTab = "description" | "specifications" | "reviews";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem, items } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<ProductTab>("description");
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>("");
  const [reviewerRating, setReviewerRating] = useState<number>(5);
  const [reviewerComment, setReviewerComment] = useState<string>("");
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [lastAddedQty, setLastAddedQty] = useState<number>(1);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

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
        setReviewsList(data.reviews || []);
        setActiveImage(data.images?.[0] || data.thumbnail);

        try {
          // Fetch real related objects for this specific category (not the combined 'all' pool)
          const related = await getProducts({
            category: data.category,
            limit: 6,
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

  const inCartQty = product
    ? items.find((i) => i.productId === product.id)?.quantity ?? 0
    : 0;
  const remainingStock = product ? Math.max(0, product.stock - inCartQty) : 0;
  const isOutOfStock = !product || product.stock <= 0;
  const isMaxInCart = !isOutOfStock && remainingStock <= 0;

  const handleAddToCart = () => {
    if (!product || isOutOfStock || isMaxInCart) return;
    const toAdd = Math.min(quantity, remainingStock);
    if (toAdd <= 0) return;

    addItem(product, toAdd);
    setLastAddedQty(toAdd);
    setAddedToast(true);
    setQuantity(1);

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setAddedToast(false);
    }, 2200);
  };

  const handleQuantityChange = (delta: number) => {
    if (!product || remainingStock <= 0) return;
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > remainingStock) return remainingStock;
      return next;
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      setReviewError("Please enter your name");
      return;
    }
    if (!reviewerComment.trim()) {
      setReviewError("Please write a review comment");
      return;
    }

    const newRev: Review = {
      reviewerName: reviewerName.trim(),
      rating: Number(reviewerRating),
      comment: reviewerComment.trim(),
      date: new Date().toISOString(),
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setReviewSuccess("Review submitted successfully! Thank you for your feedback.");
    setReviewError(null);
    setReviewerName("");
    setReviewerComment("");
    setReviewerRating(5);
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSuccess(null);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10 py-8 animate-pulse">
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
    return <NotFoundPage />;
  }

  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="mx-auto max-w-[1380px] px-3.5 sm:px-8 lg:px-10 py-5 sm:py-9">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-xs overflow-hidden">
        <Link to="/" className="wood-btn shrink-0 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs">
          <IconArrowLeft className="h-3 w-3" />
          <span>Back to catalog</span>
        </Link>
        <span className="wood-engraved shrink-0">/</span>
        <span className="wood-engraved hidden sm:inline shrink-0 capitalize">{product.category.replace("-", " ")}</span>
        <span className="wood-engraved hidden sm:inline shrink-0">/</span>
        <span className="wood-engraved truncate">
          {product.title}
        </span>
      </nav>

      {/* Main Showcase Card */}
      <div className="tactile-card rounded-2xl p-4 sm:p-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
        {/* Left: Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center">
            <img
              src={activeImage || product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover object-center"
              loading="lazy"            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`atelier-image-stage relative aspect-square h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border p-1.5 transition ${
                    activeImage === img
                      ? "border-[#8C6D58] ring-2 ring-[#8C6D58]/40"
                      : "border-[#CBB092] opacity-60 dark:border-[#4A301D]"
                  }`}
                >
                  <img src={img} loading="lazy" alt={`${product.title} ${idx + 1}`} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8C6D58] font-semibold">
            {product.brand || product.category.replace("-", " ")}
          </span>

          <h1 className="font-editorial mt-1.5 text-xl sm:text-4xl font-bold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
            <div className="flex items-center gap-0.5 text-[#26170C] dark:text-[#F5EBE0]">
              <IconStar className="h-3.5 w-3.5 fill-current text-[#8C6D58]" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
            </div>
            <span>• {reviewsList.length} client reviews</span>
          </div>

          {/* Price */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-baseline gap-2.5 border-y border-[#D8C2A8] py-3.5 sm:py-4 dark:border-[#3D2616]">
            <span className="text-xl sm:text-2xl font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
              {formatPrice(discountedPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xs sm:text-sm text-[#736B63] line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="wood-btn rounded-md px-2 py-0.5 text-[10px] sm:text-[11px]">
                  Save {formatPrice(product.price - discountedPrice)}
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3 text-xs">
            {isOutOfStock ? (
              <span className="font-semibold text-rose-600 dark:text-rose-400">Out of stock</span>
            ) : isMaxInCart ? (
              <span className="font-semibold text-[#8C6D58]">
                All {product.stock} pieces in cart
              </span>
            ) : product.stock <= 5 ? (
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                Only {product.stock} left!
              </span>
            ) : (
              <span className="font-medium text-[#5C4938] dark:text-[#D8C2A8]">
                In stock ({product.stock} available{inCartQty > 0 ? `, ${inCartQty} in cart` : ""})
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-[#5C4938] dark:text-[#D8C2A8]">
            {product.description}
          </p>

          {/* Actions */}
          <div className="mt-5 sm:mt-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              {/* Stepper */}
              <div className="flex h-11 w-full sm:w-auto shrink-0 items-center justify-between sm:justify-start rounded-lg border border-[#CBB092] bg-[#EFE8DC] dark:border-[#4A301D] dark:bg-[#19100A]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  title={quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                  disabled={isOutOfStock || isMaxInCart || quantity <= 1}
                  onClick={() => handleQuantityChange(-1)}
                  className="wood-btn flex h-11 w-12 sm:w-10 items-center justify-center rounded-l-lg disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-10 sm:w-9 text-center text-xs font-extrabold text-[#26170C] dark:text-[#F5EBE0]">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  title={
                    isOutOfStock
                      ? "Out of stock"
                      : isMaxInCart
                      ? `All ${product.stock} items already in cart`
                      : quantity >= remainingStock
                      ? `Maximum available stock reached (${remainingStock} available)`
                      : "Increase quantity"
                  }
                  disabled={isOutOfStock || isMaxInCart || quantity >= remainingStock}
                  onClick={() => handleQuantityChange(1)}
                  className="wood-btn flex h-11 w-12 sm:w-10 items-center justify-center rounded-r-lg disabled:opacity-40"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                disabled={isOutOfStock || isMaxInCart}
                onClick={handleAddToCart}
                className={`flex h-11 w-full sm:flex-1 items-center justify-center gap-2 rounded-lg px-4 sm:px-5 text-xs disabled:opacity-40 ${
                  addedToast ? "wood-btn-walnut" : "wood-btn"
                }`}
              >
                {addedToast ? (
                  <>
                    <IconCheck className="h-4 w-4 shrink-0" />
                    <span>Added to Cart</span>
                  </>
                ) : isOutOfStock ? (
                  "Out of stock"
                ) : isMaxInCart ? (
                  "Max stock in cart"
                ) : (
                  <>
                    <IconCart className="h-4 w-4 shrink-0" />
                    <span className="truncate">Add to Cart • {formatPrice(discountedPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Stock Limit Notice */}
            {isMaxInCart ? (
              <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                All {product.stock} available pieces are already in your cart.
              </p>
            ) : quantity >= remainingStock && !isOutOfStock ? (
              <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                Maximum available stock reached ({remainingStock} available{inCartQty > 0 ? `, ${inCartQty} already in cart` : ""}).
              </p>
            ) : null}

            {addedToast && (
              <div className="flex items-center justify-between rounded-lg border border-[#CBB092] bg-[#EFE8DC] p-3 text-xs text-[#26170C] dark:border-[#4A301D] dark:bg-[#19100A] dark:text-[#F5EBE0]">
                <span>{lastAddedQty}× added to cart</span>
                <Link to="/cart" className="wood-btn rounded-md px-2.5 py-1 text-xs">
                  View Cart →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Tabs (PRD F-P3-02 & F-P3-03) */}
      <section className="mt-8 sm:mt-12 tactile-card rounded-2xl p-4 sm:p-7">
        <div className="flex border-b border-[#D8C2A8] dark:border-[#3D2616] gap-2 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "description" ? "wood-btn-walnut" : "wood-btn opacity-80"
            }`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specifications")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "specifications" ? "wood-btn-walnut" : "wood-btn opacity-80"
            }`}
          >
            Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "reviews" ? "wood-btn-walnut" : "wood-btn opacity-80"
            }`}
          >
            Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Tab: Description */}
        {activeTab === "description" && (
          <div className="pt-5 space-y-3">
            <h3 className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0] uppercase tracking-wider">
              About This Artisan Piece
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#5C4938] dark:text-[#D8C2A8]">
              {product.description}
            </p>
            <div className="mt-4 rounded-xl border border-[#CBB092] bg-[#EFE8DC]/50 p-4 dark:border-[#4A301D] dark:bg-[#19100A]/50">
              <h4 className="text-[11px] font-bold text-[#26170C] dark:text-[#F5EBE0] uppercase">
                Artisan Quality & Care Guarantee
              </h4>
              <p className="mt-1 text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
                Crafted using responsibly sourced materials and non-toxic finishes. Wipe gently with a soft dry cloth. Keep away from excessive dampness or direct radiant heat.
              </p>
            </div>
          </div>
        )}

        {/* Tab: Specifications */}
        {activeTab === "specifications" && (
          <div className="pt-5">
            <h3 className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0] uppercase tracking-wider mb-3">
              Item Specifications
            </h3>
            <div className="divide-y divide-[#D8C2A8] dark:divide-[#3D2616] text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-[#5C4938] dark:text-[#D8C2A8]">Brand / Maker</span>
                <span className="font-semibold text-[#26170C] dark:text-[#F5EBE0]">{product.brand || "10X Atelier"}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#5C4938] dark:text-[#D8C2A8]">Category</span>
                <span className="font-semibold capitalize text-[#26170C] dark:text-[#F5EBE0]">{product.category.replace("-", " ")}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#5C4938] dark:text-[#D8C2A8]">Inventory Status</span>
                <span className="font-semibold text-[#26170C] dark:text-[#F5EBE0]">{product.stock} units available</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#5C4938] dark:text-[#D8C2A8]">Average Rating</span>
                <span className="font-semibold text-[#26170C] dark:text-[#F5EBE0]">★ {product.rating.toFixed(1)} / 5.0</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#5C4938] dark:text-[#D8C2A8]">SKU Identifier</span>
                <span className="font-mono text-[#26170C] dark:text-[#F5EBE0]">SKU-10X-{product.id}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Reviews */}
        {activeTab === "reviews" && (
          <div className="pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-xs font-bold text-[#26170C] dark:text-[#F5EBE0] uppercase tracking-wider">
                  Client Reviews ({reviewsList.length})
                </h3>
                <p className="text-[11px] text-[#5C4938] dark:text-[#D8C2A8]">
                  Verified buyers and collector community feedback.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="wood-btn-walnut self-start sm:self-auto rounded-lg px-4 py-2 text-xs"
              >
                Write a review
              </button>
            </div>

            {reviewsList.length === 0 ? (
              <p className="py-6 text-center text-xs text-[#5C4938] dark:text-[#D8C2A8]">
                No reviews yet for this product. Be the first to share your thoughts!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviewsList.map((rev, idx) => (
                  <div
                    key={`${rev.reviewerName}-${rev.date}-${idx}`}
                    className="tactile-card rounded-xl p-4 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-[#26170C] dark:text-[#F5EBE0]">
                      <span>{rev.reviewerName}</span>
                      <span className="text-[#8C6D58]">★ {rev.rating}</span>
                    </div>
                    <p className="mt-1.5 text-[#5C4938] dark:text-[#D8C2A8]">
                      "{rev.comment}"
                    </p>
                    <p className="mt-2 text-[10px] text-[#736B63]">
                      {formatDate(rev.date)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="tactile-card w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D8C2A8] pb-3 dark:border-[#3D2616]">
              <h3 className="text-sm font-bold text-[#26170C] dark:text-[#F5EBE0]">
                Write a Review for {product.title}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewError(null);
                  setReviewSuccess(null);
                }}
                className="text-lg text-[#5C4938] hover:text-[#26170C] dark:text-[#D8C2A8]"
              >
                ✕
              </button>
            </div>

            {reviewSuccess ? (
              <div className="py-6 text-center">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ {reviewSuccess}
                </span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="mt-4 space-y-4">
                {reviewError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    {reviewError}
                  </p>
                )}

                <div>
                  <label htmlFor="reviewerName" className="block text-[11px] font-bold text-[#5C4938] dark:text-[#D8C2A8] mb-1">
                    Your Name
                  </label>
                  <input
                    id="reviewerName"
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Maya Beridze"
                    className="wood-input w-full rounded-xl px-3 py-2 text-xs font-medium outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="reviewerRating" className="block text-[11px] font-bold text-[#5C4938] dark:text-[#D8C2A8] mb-1">
                    Rating (1-5 stars)
                  </label>
                  <select
                    id="reviewerRating"
                    value={reviewerRating}
                    onChange={(e) => setReviewerRating(Number(e.target.value))}
                    className="wood-input w-full rounded-xl px-3 py-2 text-xs font-bold outline-none"
                  >
                    <option value={5}>★★★★★ (5 - Excellent)</option>
                    <option value={4}>★★★★☆ (4 - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 - Average)</option>
                    <option value={2}>★★☆☆☆ (2 - Poor)</option>
                    <option value={1}>★☆☆☆☆ (1 - Terrible)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="reviewerComment" className="block text-[11px] font-bold text-[#5C4938] dark:text-[#D8C2A8] mb-1">
                    Review Comment
                  </label>
                  <textarea
                    id="reviewerComment"
                    rows={3}
                    value={reviewerComment}
                    onChange={(e) => setReviewerComment(e.target.value)}
                    placeholder="Share your thoughts about this piece..."
                    className="wood-input w-full rounded-xl px-3 py-2 text-xs font-medium outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="wood-btn rounded-lg px-4 py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="wood-btn-walnut rounded-lg px-4 py-2 text-xs"
                  >
                    Submit review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="wood-engraved mb-4 text-xs uppercase">
            Related Objects
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};
