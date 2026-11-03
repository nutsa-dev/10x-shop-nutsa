import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F7F5F0] text-[#2C2724] transition-colors dark:bg-[#191614] dark:text-[#F7F5F0]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
