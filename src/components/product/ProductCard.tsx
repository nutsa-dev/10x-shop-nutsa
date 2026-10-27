import { Link } from "react-router-dom";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  // ფასდაკლებული ფასის გამოთვლა (2 ათწილადამდე დამრგვალებით)
  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  // მარაგის სტატუსის განსაზღვრა დოკუმენტაციის მიხედვით
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm transition hover:shadow-lg dark:border-stone-800 dark:bg-stone-900">
      {/* ფასდაკლების ბეჯი */}
      {hasDiscount && (
        <span className="absolute left-6 top-6 z-10 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      {/* სურათი - ბმული დეტალებზე */}
      <Link
        to={`/products/${product.id}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
        />
      </Link>

      {/* კატეგორია და რეიტინგი */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-medium uppercase tracking-wider text-amber-800 dark:text-amber-500">
          {product.category}
        </span>
        <span className="flex items-center gap-1 font-semibold text-stone-700 dark:text-stone-300">
          ★ {product.rating.toFixed(1)}
        </span>
      </div>

      {/* სათაური - ბმული დეტალებზე */}
      <h3 className="mt-1 line-clamp-1 text-base font-semibold text-stone-900 dark:text-white" title={product.title}>
        <Link
          to={`/products/${product.id}`}
          className="hover:text-amber-800 transition dark:hover:text-amber-400"
        >
          {product.title}
        </Link>
      </h3>

      {/* მარაგის სტატუსი */}
      <div className="mt-1.5 text-xs">
        {isOutOfStock ? (
          <span className="font-medium text-rose-600 dark:text-rose-400">Out of stock</span>
        ) : isLowStock ? (
          <span className="font-medium text-amber-600 dark:text-amber-400">
            Only {product.stock} left!
          </span>
        ) : (
          <span className="font-medium text-emerald-600 dark:text-emerald-400">In stock</span>
        )}
      </div>

      {/* ფასი და დამატების ღილაკი */}
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
        <div>
          <span className="text-lg font-bold text-stone-900 dark:text-white">
            ${discountedPrice}
          </span>
          {hasDiscount && (
            <span className="ml-2 text-xs text-stone-400 line-through dark:text-stone-500">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => onAdd?.(product)}
          className="rounded-lg bg-stone-900 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 dark:disabled:bg-stone-700"
        >
          {isOutOfStock ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};