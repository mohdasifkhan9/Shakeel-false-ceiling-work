"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { EASE } from "@/lib/anim";
import { isLoaded } from "@/lib/ui-state";
import {
  hasPhone,
  hasWhatsapp,
  telHref,
  whatsappHref,
  WA_DEFAULT_MSG,
} from "@/data/site";

/**
 * Persistent conversion CTA.
 * Desktop → floating chat/quote button. Mobile → sticky bottom bar.
 * Phone/WhatsApp pills appear only once the real numbers are configured.
 */
export function WhatsAppButton() {
  const delay = isLoaded() ? 0.7 : 2.6;

  return (
    <>
      {/* ——— Desktop floating ——— */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        className="fixed right-8 bottom-8 z-[70] hidden md:block"
      >
        {hasWhatsapp ? (
          <a
            href={whatsappHref(WA_DEFAULT_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="chat"
            className="group flex items-center gap-3 rounded-full bg-ink py-4 pr-7 pl-5 text-ivory shadow-[0_16px_40px_rgba(23,21,15,0.25)] transition-colors duration-500 hover:bg-bronze"
          >
            <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">
              Chat on WhatsApp
            </span>
          </a>
        ) : (
          <Link
            href="/contact"
            data-cursor="open"
            className="group flex items-center gap-3 rounded-full bg-ink py-4 pr-7 pl-6 text-ivory shadow-[0_16px_40px_rgba(23,21,15,0.25)] transition-colors duration-500 hover:bg-bronze"
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">
              Get a quote
            </span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </motion.div>

      {/* ——— Mobile sticky bar ——— */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        className="fixed inset-x-0 bottom-0 z-[70] flex border-t border-ivory/12 bg-ink/92 text-ivory backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={telHref}
          className="flex flex-1 items-center justify-center gap-2 py-4 text-[10px] font-semibold tracking-[0.25em] uppercase"
        >
          <Phone className="size-3.5" strokeWidth={1.5} aria-hidden />
          Call
        </a>
        <a
          href={whatsappHref(WA_DEFAULT_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 border-x border-ivory/12 py-4 text-[10px] font-semibold tracking-[0.25em] uppercase"
        >
          <MessageCircle className="size-3.5" strokeWidth={1.5} aria-hidden />
          WhatsApp
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2 bg-ivory py-4 text-[10px] font-semibold tracking-[0.25em] text-ink uppercase"
        >
          Get Quote
          <span aria-hidden>→</span>
        </Link>
      </motion.div>
    </>
  );
}
