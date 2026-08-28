"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/anim";
import { cn, isFinePointer } from "@/lib/utils";

const LABELS: Record<string, string> = {
  view: "VIEW",
  open: "OPEN",
  chat: "CHAT",
  drag: "DRAG",
};

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [link, setLink] = useState(false);
  const [down, setDown] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 520, damping: 45, mass: 0.55 });
  const y = useSpring(my, { stiffness: 520, damping: 45, mass: 0.55 });

  useEffect(() => {
    if (!isFinePointer()) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const el = t?.closest?.("[data-cursor]");
      const val = el?.getAttribute("data-cursor");
      setLabel(val && LABELS[val] ? val : null);
      setLink(!!t?.closest?.("a, button, [role='button'], input, select, textarea, label"));
    };
    const out = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x, y }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        {/* default dot — difference blend so it reads on ivory & ink alike */}
        <motion.div
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference",
          )}
          animate={{
            width: label ? 0 : link ? 34 : 10,
            height: label ? 0 : link ? 34 : 10,
            opacity: visible ? (down ? 0.7 : 1) : 0,
          }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        {/* labelled bubble */}
        <motion.div
          className="flex items-center justify-center rounded-full border border-ink/15 bg-ivory shadow-[0_8px_30px_rgba(23,21,15,0.18)]"
          animate={{
            width: label ? 84 : 0,
            height: label ? 84 : 0,
            opacity: label && visible ? 1 : 0,
            scale: down ? 0.92 : 1,
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] text-ink">
            {label ? LABELS[label] : ""}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
