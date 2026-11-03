export const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-[#EADBCC] p-4 shadow-[0_4px_20px_rgba(44,39,36,0.04)] animate-pulse dark:bg-[#24201D] dark:border-[#332C27]">
      <div>
        <div className="aspect-square w-full rounded-xl bg-[#F2EFE9] dark:bg-[#191614]" />
        <div className="mt-3.5 flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
          <div className="h-3 w-8 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
        </div>
        <div className="mt-2 h-4 w-3/4 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#EADBCC]/70 pt-3.5 dark:border-[#332C27]">
        <div className="h-5 w-16 rounded bg-[#EADBCC]/60 dark:bg-[#332C27]" />
        <div className="h-9 w-24 rounded-lg bg-[#EADBCC]/60 dark:bg-[#332C27]" />
      </div>
    </div>
  );
};
