"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/anim";

/** Seamless page-to-page entrance — short, quiet, expensive-feeling. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      {children}
    </motion.main>
  );
}
