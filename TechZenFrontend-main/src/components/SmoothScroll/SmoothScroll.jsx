import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * High-performance smooth scrolling provider powered by Lenis.
 * Gives the entire website weighted, buttery-smooth momentum scrolling
 * and handles seamless in-page anchor navigation.
 */
export default function SmoothScroll({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Respect user's system preferences for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      infinite: false,
      prevent: (node) => {
        return Boolean(
          node?.hasAttribute?.("data-lenis-prevent") ||
          node?.closest?.("[data-lenis-prevent]") ||
          node?.closest?.(".lenis-prevent")
        );
      },
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global in-page anchor interceptor for ultra-smooth gliding navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Handle "#hash" or "/#hash" when currently on homepage
      const isHashLink =
        href.startsWith("#") ||
        (href.startsWith("/#") &&
          (window.location.pathname === "/" || window.location.pathname === ""));

      if (isHashLink) {
        const rawHash = href.startsWith("/#") ? href.slice(1) : href;

        if (rawHash === "#" || rawHash === "#home") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          window.history.pushState(null, "", href);
          return;
        }

        const targetEl = document.querySelector(rawHash);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -50, duration: 1.25 });
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick, {
        capture: true,
      });
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Handle route change scroll-to-top
  useEffect(() => {
    if (!window.__lenis) return;

    if (!location.hash) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      const timer = setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target && window.__lenis) {
          window.__lenis.scrollTo(target, { offset: -50, duration: 1.2 });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return <>{children}</>;
}
