"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/anim";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 70));
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    !href.includes("#") && pathname === href;

  const isLightBg = scrolled || pathname !== "/";
  const textColorClass = isLightBg ? "text-ink" : "text-ivory";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[80]"
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "mt-3 w-[min(1180px,calc(100%-1.5rem))] border border-line/70 bg-ivory/80 py-3 pr-2 pl-6 shadow-[0_10px_40px_rgba(23,21,15,0.08)] backdrop-blur-xl md:pr-3 md:pl-8"
              : "mt-0 w-full border border-transparent bg-transparent px-5 py-6 md:px-10",
          )}
        >
          {/* Brand */}
          <Link href="/" className="group leading-none" aria-label={site.name}>
            <span className={cn("font-serif text-[22px] tracking-tight transition-colors duration-500", textColorClass)}>
              {site.short}
            </span>
            <span className={cn("mt-1 hidden text-[8px] font-semibold tracking-[0.42em] transition-colors duration-500 sm:block", textColorClass)}>
              {site.descriptor.toUpperCase()}
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                data-active={isActive(n.href)}
                className={cn("link-underline text-[11px] font-semibold tracking-[0.26em] transition-colors duration-500", textColorClass)}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              data-cursor="open"
              className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-[10px] font-semibold tracking-[0.3em] text-ivory uppercase transition-colors duration-500 hover:bg-bronze"
            >
              GET A QUOTE
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex items-center gap-3 lg:hidden"
          >
            <span className={cn("text-[10px] font-semibold tracking-[0.3em] transition-colors duration-500", textColorClass)}>
              MENU
            </span>
            <span className={cn("rounded-full border p-2.5 transition-all duration-500", isLightBg ? "border-ink/20 text-ink" : "border-ivory/40 text-ivory")}>
              <Menu className="size-4" strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
