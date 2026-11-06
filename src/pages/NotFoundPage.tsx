import { Link } from "react-router-dom";
import { IconArrowLeft } from "@/components/ui/Icons";

export const NotFoundPage = () => {
  return (
    <div className="mx-auto flex min-h-[60vh] flex-col items-center justify-center px-3.5 sm:px-4 py-12 sm:py-16 text-center">
      <div className="tactile-card rounded-2xl p-7 sm:p-10 max-w-sm w-full">
        <span className="wood-engraved font-mono text-5xl">
          404
        </span>
        <h1 className="mt-2 text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
          Page not found
        </h1>
        <p className="mt-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
          The page you are looking for does not exist.
        </p>
        <div className="mt-5">
          <Link
            to="/"
            className="wood-btn inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            <span>Go to catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
