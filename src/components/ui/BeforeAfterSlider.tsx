"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useTransform, animate } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Premium draggable reveal. Pointer-driven with a sprung divider,
 * full touch support, and keyboard control (role="slider").
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  className,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}: BeforeAfterSliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [ariaPos, setAriaPos] = useState(50);
  const pos = useMotionValue(50);
  useMotionValueEvent(pos, "change", (v) => setAriaPos(Math.round(v)));

  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pct = ((clientX - r.left) / r.width) * 100;
      pos.set(Math.min(96, Math.max(4, pct)));
    },
    [pos],
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromClientX]);

  useEffect(() => () => pos.stop?.(), [pos]);

  return (
    <div
      ref={ref}
      data-cursor="drag"
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison — drag or use arrow keys"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaPos}
      onPointerDown={(e) => {
        setDragging(true);
        setFromClientX(e.clientX);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          const next = pos.get() + (e.key === "ArrowRight" ? 6 : -6);
          animate(pos, Math.min(96, Math.max(4, next)), { duration: 0.4 });
        }
      }}
      className={cn(
        "relative touch-none overflow-hidden bg-stone select-none",
        className,
      )}
    >
      {/* after — base layer */}
      <Image src={after} alt={afterAlt} fill sizes="100vw" className="object-cover" draggable={false} />
      {/* before — clipped on top */}
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Image src={before} alt={beforeAlt} fill sizes="100vw" className="object-cover" draggable={false} />
      </motion.div>

      {/* labels */}
      <span className="absolute top-5 left-5 bg-ink/55 px-3 py-1.5 text-[9px] font-semibold tracking-[0.32em] text-ivory backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-5 right-5 bg-ink/55 px-3 py-1.5 text-[9px] font-semibold tracking-[0.32em] text-ivory backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* divider */}
      <motion.div className="absolute inset-y-0" style={{ left }} aria-hidden>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-ivory shadow-[0_0_20px_rgba(23,21,15,0.5)]" />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/60 bg-ink/40 text-ivory backdrop-blur-md transition-transform duration-300",
            dragging ? "scale-90" : "scale-100",
          )}
        >
          <ChevronsLeftRight className="size-4" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* instruction */}
      <motion.span
        animate={{ opacity: dragging ? 0 : 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-ink/55 px-4 py-2 text-[9px] font-semibold tracking-[0.35em] text-ivory backdrop-blur-sm"
        aria-hidden
      >
        DRAG TO REVEAL
      </motion.span>
    </div>
  );
}
