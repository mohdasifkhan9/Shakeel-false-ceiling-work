"use client";

import type { ReactNode } from "react";
import { MaskLine, Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  lines: (string | ReactNode)[];
  description?: string;
  children?: ReactNode;
  className?: string;
}

/** Shared inner-page hero — editorial, quiet, spacious. */
export function PageHero({ eyebrow, lines, description, children, className }: PageHeroProps) {
  return (
    <header className={cn("px-5 pt-36 pb-16 md:px-10 md:pt-52 md:pb-24", className)}>
      <Reveal y={14}>
        <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.35em] text-mute uppercase">
          <span className="h-px w-10 bg-ink/25" aria-hidden />
          {eyebrow}
        </p>
      </Reveal>

      <h1 className="mt-8 font-serif text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.95] tracking-[-0.02em] uppercase">
        {lines.map((line, i) => (
          <MaskLine key={i} delay={0.1 + i * 0.1}>
            {line}
          </MaskLine>
        ))}
      </h1>

      {description && (
        <Reveal delay={0.35}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-mute">{description}</p>
        </Reveal>
      )}

      {children && (
        <Reveal delay={0.45}>
          <div className="mt-10">{children}</div>
        </Reveal>
      )}
    </header>
  );
}
