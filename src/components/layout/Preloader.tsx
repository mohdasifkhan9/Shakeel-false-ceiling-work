"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, EASE_INOUT } from "@/lib/anim";
import { markLoaded } from "@/lib/ui-state";
import { site } from "@/data/site";

export function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const t = setTimeout(() => setDone(true), reduce ? 300 : 1650);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        markLoaded();
        document.body.style.overflow = "";
      }}
    >
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink text-ivory"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_INOUT }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-5 text-[10px] font-medium tracking-[0.4em] text-mute-light uppercase"
          >
            {site.descriptor} — {site.city}
          </motion.p>

          <div className="overflow-hidden px-4">
            <motion.h1
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-center font-serif text-[clamp(3rem,9vw,7rem)] leading-none tracking-[-0.02em]"
            >
              {site.short}
            </motion.h1>
          </div>

          <div className="mt-8 h-px w-40 overflow-hidden bg-ivory/15 md:w-56">
            <motion.div
              className="h-full w-full origin-left bg-ivory"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: EASE_INOUT, delay: 0.35 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
