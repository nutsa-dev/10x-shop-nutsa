import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-stone-900 transition-colors dark:bg-[#121211] dark:text-stone-100">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
