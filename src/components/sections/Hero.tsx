"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { EASE, EASE_INOUT } from "@/lib/anim";
import { isLoaded } from "@/lib/ui-state";
import { isFinePointer } from "@/lib/utils";
import { scrollToTarget } from "@/components/layout/SmoothScroll";
import { site } from "@/data/site";

const LINES = ["FALSE CEILINGS", "THAT DEFINE", "THE ROOM."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const base = isLoaded() ? 0.15 : 2; // hold for preloader on first load

  /* scroll-linked scale + drift */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  /* mouse parallax (desktop only) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isFinePointer() || reduce || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 22);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 16);
    },
    [mx, my, reduce],
  );

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* image — clip reveal → settle, then breathe with scroll */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? { opacity: 0 } : { clipPath: "inset(16% 10% 16% 10%)" }}
        animate={
          reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }
        }
        transition={{ duration: 1.6, ease: EASE_INOUT, delay: base * 0.55 }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={reduce ? undefined : { scale: imgScale }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={reduce ? undefined : { x: sx, y: sy }}
          >
            <motion.div
              className="absolute inset-[-3%]"
              initial={reduce ? false : { scale: 1.24 }}
              animate={reduce ? undefined : { scale: 1.08 }}
              transition={{ duration: 2.2, ease: EASE_INOUT, delay: base * 0.55 }}
            >
              <Image
                src="/images/hero.jpg"
                alt="Warm living room with a layered false ceiling and recessed cove lighting"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" aria-hidden />

      {/* content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-24 text-ivory md:px-10 md:pb-16"
      >
        <h1 className="sr-only">False Ceiling Contractor & Ceiling Work in Hyderabad</h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: base + 0.2 }}
          className="mb-6 flex items-center gap-3 text-[10px] font-medium tracking-[0.35em] uppercase md:text-[11px]"
        >
          <span className="h-px w-10 bg-ivory/50" aria-hidden />
          FALSE CEILING & INTERIOR CRAFTSMANSHIP · HYDERABAD
        </motion.p>

        <h2 className="font-serif text-[clamp(3.4rem,11vw,10.5rem)] leading-[0.92] tracking-[-0.03em] uppercase">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block will-change-transform"
                initial={reduce ? { opacity: 0 } : { y: "112%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 1.1, ease: EASE, delay: base + 0.28 + i * 0.11 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: base + 0.75 }}
            className="max-w-md text-[15px] leading-relaxed text-ivory/75"
          >
            False ceiling and interior ceiling solutions for residential and commercial spaces in Hafeezpet, Hyderabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: base + 0.9 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/work"
              data-cursor="view"
              className="group inline-flex items-center gap-3 bg-ivory px-7 py-4 text-[11px] font-semibold tracking-[0.28em] text-ink uppercase transition-colors duration-500 hover:bg-bronze hover:text-ivory"
            >
              EXPLORE OUR WORK
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
            <button
              onClick={() => scrollToTarget("#quote")}
              data-cursor="open"
              className="group inline-flex items-center gap-3 border border-ivory/40 px-7 py-4 text-[11px] font-semibold tracking-[0.28em] text-ivory uppercase transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-ink"
            >
              GET A QUOTE
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* vertical location marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: base + 1.15 }}
        className="absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 items-center gap-4 lg:flex"
        aria-hidden
      >
        <span className="vertical-rl rotate-180 text-[10px] font-medium tracking-[0.4em] text-ivory/70">
          {site.city.toUpperCase()} · {site.region.toUpperCase()}
        </span>
        <span className="h-16 w-px bg-ivory/40" />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: base + 1.3 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/70 md:flex"
        aria-hidden
      >
        <span className="text-[9px] font-medium tracking-[0.4em]">SCROLL TO EXPLORE</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-ivory/60"
        />
      </motion.div>
    </section>
  );
}
