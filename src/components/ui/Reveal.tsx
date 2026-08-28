"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/anim";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
  once?: boolean;
}

/** Simple, consistent scroll-triggered entrance. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  amount = 0.35,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Masked single-line reveal for headlines (wrap each line). */
export function MaskLine({
  children,
  delay = 0,
  className,
  innerClassName,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  innerClassName?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className={cn("block will-change-transform", innerClassName)}
        initial={reduce ? { opacity: 0 } : { y: "112%" }}
        whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
