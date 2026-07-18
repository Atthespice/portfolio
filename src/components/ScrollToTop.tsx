import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** React Router doesn't reset scroll on navigation by default (§2 requires it). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
