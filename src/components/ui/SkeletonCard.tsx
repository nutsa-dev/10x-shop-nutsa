export const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs animate-pulse dark:border-stone-800 dark:bg-stone-900/90">
      <div>
        {/* Thumbnail skeleton */}
        <div className="aspect-square w-full rounded-xl bg-stone-200/80 dark:bg-stone-800" />

        {/* Category & Rating */}
        <div className="mt-3 flex items-center justify-between">
          <div className="h-3 w-20 rounded-md bg-stone-200/80 dark:bg-stone-800" />
          <div className="h-3 w-10 rounded-md bg-stone-200/80 dark:bg-stone-800" />
        </div>

        {/* Title */}
        <div className="mt-2.5 h-4 w-4/5 rounded-md bg-stone-200/80 dark:bg-stone-800" />
        <div className="mt-1.5 h-3.5 w-2/5 rounded-md bg-stone-200/80 dark:bg-stone-800" />

        {/* Stock pill */}
        <div className="mt-2.5 h-4 w-20 rounded-full bg-stone-200/80 dark:bg-stone-800" />
      </div>

      {/* Price & Action button */}
      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800">
        <div className="h-5 w-16 rounded-md bg-stone-200/80 dark:bg-stone-800" />
        <div className="h-8 w-24 rounded-xl bg-stone-200/80 dark:bg-stone-800" />
      </div>
    </div>
  );
};
