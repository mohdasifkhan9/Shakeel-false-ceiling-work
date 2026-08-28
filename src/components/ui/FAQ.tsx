"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/data/faqs";
import { EASE } from "@/lib/anim";
import { cn } from "@/lib/utils";

export function FAQ({ items, dark = false }: { items: Faq[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("border-t", dark ? "border-line-light" : "border-line")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn("border-b", dark ? "border-line-light" : "border-line")}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
            >
              <span className="flex items-baseline gap-4 md:gap-8">
                <span
                  className={cn(
                    "text-[11px] tracking-[0.3em]",
                    dark ? "text-mute-light" : "text-bronze",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-serif text-xl transition-colors duration-300 md:text-2xl",
                    dark ? "text-ivory" : "text-ink group-hover:text-bronze",
                  )}
                >
                  {item.q}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={cn(
                  "shrink-0 rounded-full border p-2",
                  dark ? "border-ivory/25 text-ivory" : "border-ink/20 text-ink",
                )}
              >
                <Plus className="size-3.5" strokeWidth={1.5} aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-2xl pb-7 pl-8 text-[15px] leading-relaxed md:pl-16",
                      dark ? "text-mute-light" : "text-mute",
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
