"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

/** Programmatic smooth-scroll helper (used by quote CTAs & anchors). */
export function scrollToTarget(target: string | number, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.4 });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchors through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : null;
      if (!hash || !document.querySelector(hash)) return;
      if (href.startsWith("/#") && window.location.pathname !== "/") return; // let router navigate home first
      e.preventDefault();
      lenis.scrollTo(hash, { offset: 0, duration: 1.5 });
    };
    document.addEventListener("click", onClick);

    // Deep-link on arrival (e.g. /#quote)
    if (window.location.hash && document.querySelector(window.location.hash)) {
      const hash = window.location.hash;
      const t = setTimeout(() => lenis.scrollTo(hash, { offset: 0, duration: 1.6 }), 2200);
      return () => {
        clearTimeout(t);
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenisInstance = null;
      };
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
