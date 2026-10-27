import { Link } from "react-router-dom";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  // ფასდაკლებული ფასის გამოთვლა
  const hasDiscount = product.discountPercentage > 1;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#D4C7B5] hover:shadow-md dark:border-stone-800 dark:bg-[#1E1B18]">
      {/* ფასდაკლების ბეჯი */}
      {hasDiscount && (
        <span className="absolute left-6 top-6 z-10 rounded-md bg-[#3E5A44] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#F3F7F4] shadow-xs">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      <div>
        {/* სურათის კონტეინერი - თბილი სელისფერი ფონით */}
        <Link
          to={`/products/${product.id}`}
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#F6F3ED] p-4 transition-colors group-hover:bg-[#EFEAE0] dark:bg-[#282420] dark:group-hover:bg-[#302B26]"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-108"
          />
        </Link>

        {/* კატეგორია და რეიტინგი */}
        <div className="mt-3.5 flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-widest text-[#8C5E3C] text-[10px] dark:text-[#C49472]">
            {product.category.replace("-", " ")}
          </span>
          <span className="flex items-center gap-1 font-medium text-stone-600 dark:text-stone-300">
            <span className="text-amber-700 dark:text-amber-500">★</span>
            <span>{product.rating.toFixed(1)}</span>
          </span>
        </div>

        {/* პროდუქტის სათაური */}
        <h3 className="mt-1.5 line-clamp-1 text-base font-semibold text-[#2C241E] dark:text-stone-100" title={product.title}>
          <Link
            to={`/products/${product.id}`}
            className="transition-colors hover:text-[#7A533E] dark:hover:text-[#D4A373]"
          >
            {product.title}
          </Link>
        </h3>

        {/* მარაგის სტატუსი */}
        <div className="mt-2 text-xs">
          {isOutOfStock ? (
            <span className="inline-block rounded-md bg-stone-100 px-2 py-0.5 font-medium text-stone-500 dark:bg-stone-800 dark:text-stone-400">
              Out of stock
            </span>
          ) : isLowStock ? (
            <span className="inline-block rounded-md bg-[#FAF2EB] px-2 py-0.5 font-medium text-[#9B5C2E] dark:bg-amber-950/40 dark:text-amber-400">
              Only {product.stock} left
            </span>
          ) : (
            <span className="inline-block rounded-md bg-[#EEF4EF] px-2 py-0.5 font-medium text-[#3E5A44] dark:bg-emerald-950/40 dark:text-emerald-400">
              In stock
            </span>
          )}
        </div>
      </div>

      {/* ფასი და დამატების ღილაკი */}
      <div className="mt-4 flex items-center justify-between border-t border-[#F0EBE1] pt-3 dark:border-stone-800">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold tracking-tight text-[#2C241E] dark:text-stone-100">
            ${discountedPrice}
          </span>
          {hasDiscount && (
            <span className="text-xs text-stone-400 line-through dark:text-stone-500">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => onAdd?.(product)}
          className="rounded-xl bg-[#3B2C24] px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] shadow-xs transition hover:bg-[#251B15] active:scale-95 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 dark:bg-stone-100 dark:text-[#2C241E] dark:hover:bg-stone-200 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
        >
          {isOutOfStock ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </article>
  );
};