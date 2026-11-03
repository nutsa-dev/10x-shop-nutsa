import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Layout = () => {
  return (
    <div className="nordic-wood-bg relative flex min-h-screen flex-col text-[#2C2724] transition-colors dark:text-[#F7F5F0]">
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
