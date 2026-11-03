import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { playWoodTap } from "@/utils/sound";

export const Layout = () => {
  // Global minimalist wooden knock sound on interactive clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, select, input[type="checkbox"], input[type="radio"], [role="button"]'
      ) as HTMLElement | null;

      if (!interactive || (interactive as HTMLButtonElement).disabled) return;

      if (interactive.getAttribute("aria-label")?.toLowerCase().includes("light")) {
        playWoodTap("switch");
      } else if (interactive.classList.contains("wood-btn-walnut")) {
        playWoodTap("deep");
      } else {
        playWoodTap("soft");
      }
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col text-[#26170C] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] dark:text-[#F5EBE0]">
      {/* Fixed Dual-Layer Wood Background for silky-smooth Light <-> Dark crossfade */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Light Nordic Oak Layer */}
        <div className="nordic-wood-layer-light absolute inset-0" />
        {/* Dark Smoked Walnut Layer (crossfades via opacity) */}
        <div className="nordic-wood-layer-dark absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] dark:opacity-100" />
      </div>

      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
