import { Link } from "react-router-dom";
import { IconArrowLeft } from "@/components/ui/Icons";

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="font-mono text-5xl font-black text-[#EADBCC] dark:text-[#332C27]">
        404
      </span>
      <h1 className="mt-2 text-xl font-bold tracking-tight text-[#2C2724] dark:text-[#F7F5F0]">
        Page Not Found
      </h1>
      <p className="mt-1 text-xs text-[#736B63]">
        The object or page you are looking for does not exist.
      </p>
      <div className="mt-5">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#8C6D58] hover:bg-[#735744] px-4 py-2.5 text-xs font-medium text-white transition-colors"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Collection</span>
        </Link>
      </div>
    </div>
  );
};
