export const SkeletonCard = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm animate-pulse dark:border-stone-800 dark:bg-stone-900">
      {/* სურათის ჩონჩხი */}
      <div className="aspect-square w-full rounded-xl bg-stone-200 dark:bg-stone-800" />

      {/* კატეგორია & რეიტინგი */}
      <div className="mt-3 flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-3 w-10 rounded bg-stone-200 dark:bg-stone-800" />
      </div>

      {/* სათაური */}
      <div className="mt-2 h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />

      {/* მარაგის სტატუსი */}
      <div className="mt-2 h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />

      {/* ფასი და ღილაკი */}
      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-2 dark:border-stone-800">
        <div className="h-5 w-14 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-7 w-20 rounded-lg bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
};
