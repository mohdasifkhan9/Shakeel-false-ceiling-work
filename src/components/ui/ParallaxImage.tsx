"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** parallax strength 0–1 */
  strength?: number;
  hoverScale?: boolean;
}

/**
 * Editorial image block — slow scroll parallax inside a clipped frame,
 * optional subtle hover zoom. Never creates layout shift: the wrapper
 * carries the aspect ratio.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  strength = 0.5,
  hoverScale = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = 10 * strength;
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div
      ref={ref}
      className={cn("group relative overflow-hidden bg-stone", className)}
    >
      <motion.div
        className="absolute inset-[-12%_0] will-change-transform"
        style={reduce ? undefined : { y }}
      >
        <motion.div
          className="relative h-full w-full"
          whileHover={hoverScale && !reduce ? { scale: 1.04 } : undefined}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
