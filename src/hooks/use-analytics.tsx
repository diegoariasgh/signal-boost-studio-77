import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-V4YNHQGG3C";

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;

    // GA4 pageview
    if (typeof window.gtag === "function") {
      window.gtag("config", GA_ID, { page_path: path });
    }

    // Plausible pageview (auto-fires when script is loaded; this is a no-op if absent)
    if (typeof window.plausible === "function") {
      window.plausible("pageview");
    }
  }, [location.pathname, location.search]);
}
