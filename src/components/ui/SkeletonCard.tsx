export const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-3 shadow-2xs animate-pulse dark:border-neutral-800 dark:bg-neutral-900">
      <div>
        <div className="aspect-square w-full rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-8 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="mt-2 h-3.5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5 dark:border-neutral-800">
        <div className="h-4 w-14 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-7 w-12 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
};
