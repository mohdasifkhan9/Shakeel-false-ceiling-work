"use client";

import { MaskLine, Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  lines: string[];
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
  size?: "lg" | "xl";
}

export function SectionHeading({
  index,
  eyebrow,
  lines,
  dark = false,
  align = "left",
  className,
  size = "lg",
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal y={20}>
        <p
          className={cn(
            "flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] uppercase",
            align === "center" && "justify-center",
            dark ? "text-mute-light" : "text-mute",
          )}
        >
          {index && <span className="text-bronze">{index}</span>}
          <span
            className={cn("h-px w-8", dark ? "bg-ivory/25" : "bg-ink/25")}
            aria-hidden
          />
          {eyebrow}
        </p>
      </Reveal>
      <h2
        className={cn(
          "mt-7 font-serif leading-[0.98] tracking-[-0.02em]",
          size === "lg"
            ? "text-[clamp(2.6rem,5.6vw,5.2rem)]"
            : "text-[clamp(3rem,8vw,7.5rem)]",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        {lines.map((line, i) => (
          <MaskLine key={line + i} delay={0.08 + i * 0.1}>
            {line}
          </MaskLine>
        ))}
      </h2>
    </div>
  );
}
