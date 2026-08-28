import type { Variants } from "framer-motion";

/** Signature easing — slow, expensive-feeling expo. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_INOUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = 0.9;

/** Masked line reveal — place inside an `overflow-hidden` wrapper. */
export const lineReveal: Variants = {
  hidden: { y: "115%" },
  visible: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE, delay: i * 0.12 },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay: i * 0.1 },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: EASE, delay: i * 0.1 },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE, delay: i * 0.1 },
  }),
};
