import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - მარშრუტის (URL) ცვლილებისას გვერდს ავტომატურად აბრუნებს თავში.
 * SPA-ში გვერდი თავიდან არ იტვირთება, ამიტომ სქროლის დასაწყისში დაბრუნება აუცილებელია.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};
