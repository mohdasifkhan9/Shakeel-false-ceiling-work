"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { EASE } from "@/lib/anim";
import { nav, site, hasPhone, hasWhatsapp, telHref, whatsappHref, WA_DEFAULT_MSG, mapsHref } from "@/data/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const item = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-ink text-ivory"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {/* top row */}
          <div className="flex items-center justify-between px-6 py-6">
            <Link href="/" onClick={onClose} className="leading-none">
              <span className="font-serif text-2xl tracking-tight">{site.short}</span>
              <span className="mt-1 block text-[9px] tracking-[0.38em] text-mute-light">
                {site.descriptor.toUpperCase()}
              </span>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full border border-ivory/25 p-3"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* links */}
          <motion.nav
            variants={list}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col justify-center gap-1 px-6"
            data-lenis-prevent
          >
            {nav.map((n, i) => (
              <div key={n.label} className="overflow-hidden">
                <motion.div variants={item}>
                  <Link
                    href={n.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="text-[10px] tracking-[0.3em] text-bronze">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[clamp(2.4rem,9vw,4.2rem)] leading-[1.06] tracking-tight transition-colors duration-300 group-hover:text-bronze">
                      {n.label}
                    </span>
                    <ArrowUpRight
                      className="size-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={1.25}
                    />
                  </Link>
                </motion.div>
              </div>
            ))}
          </motion.nav>

          {/* footer CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="border-t border-ivory/12 px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <p className="mb-4 text-[10px] tracking-[0.35em] text-mute-light uppercase">
              {site.city} · {site.region}
            </p>
            <div className="flex flex-wrap gap-3">
              {hasWhatsapp && (
                <a
                  href={whatsappHref(WA_DEFAULT_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-none border border-ivory/25 px-4 py-4 text-center text-[10px] font-semibold tracking-[0.3em] uppercase"
                >
                  WHATSAPP
                </a>
              )}
              {hasPhone && (
                <a
                  href={telHref}
                  className="flex-1 rounded-none border border-ivory/25 px-4 py-4 text-center text-[10px] font-semibold tracking-[0.3em] uppercase"
                >
                  CALL
                </a>
              )}
              <Link
                href="/contact"
                onClick={onClose}
                className="flex-1 bg-ivory px-4 py-4 text-center text-[10px] font-semibold tracking-[0.3em] text-ink uppercase"
              >
                GET A QUOTE
              </Link>
            </div>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[10px] tracking-[0.3em] text-mute-light uppercase link-underline"
            >
              Google Maps
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
