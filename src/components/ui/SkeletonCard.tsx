export const SkeletonCard = () => {
  return (
    <div className="tactile-card flex flex-col justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-4 animate-pulse">
      <div>
        <div className="aspect-square w-full rounded-lg sm:rounded-xl bg-[#FAF6F0]/70 dark:bg-[#19100A]/70" />
        <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between">
          <div className="h-3 w-16 sm:w-20 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
          <div className="h-3 w-7 sm:w-8 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
        </div>
        <div className="mt-2 h-3.5 sm:h-4 w-3/4 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
      </div>

      <div className="mt-2.5 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#B89670]/55 pt-2.5 sm:pt-3 dark:border-[#3D2616]">
        <div className="h-4 sm:h-5 w-14 sm:w-16 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
        <div className="h-7 sm:h-8 w-full sm:w-24 rounded-lg bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
      </div>
    </div>
  );
};
