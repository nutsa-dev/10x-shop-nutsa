export const SkeletonCard = () => {
  return (
    <div className="tactile-card flex flex-col justify-between rounded-2xl p-4 animate-pulse">
      <div>
        <div className="aspect-square w-full rounded-xl bg-[#FAF6F0]/70 dark:bg-[#19100A]/70" />
        <div className="mt-3.5 flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
          <div className="h-3 w-8 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
        </div>
        <div className="mt-2 h-4 w-3/4 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#B89670]/55 pt-3 dark:border-[#3D2616]">
        <div className="h-5 w-16 rounded bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
        <div className="h-8 w-24 rounded-lg bg-[#D8C2A8]/60 dark:bg-[#3D2616]" />
      </div>
    </div>
  );
};
