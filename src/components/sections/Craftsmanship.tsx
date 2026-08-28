"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { cn } from "@/lib/utils";

const DETAILS = [
  {
    src: "/images/craft-line.jpg",
    alt: "Crisp gypsum ceiling edge meeting a shadow-gap reveal",
    label: "CLEAN EDGES",
    text: "Junctions resolved to a hairline — where planes meet, nothing wavers.",
  },
  {
    src: "/images/intro.jpg",
    alt: "Layered ceiling planes floating above one another",
    label: "PRECISE LINES",
    text: "Levels set once, checked twice. Straight is a decision, made early.",
  },
  {
    src: "/images/craft-light.jpg",
    alt: "Warm LED light washing across a cove channel",
    label: "INTEGRATED LIGHTING",
    text: "Light channels built into the structure — glow without glare.",
  },
  {
    src: "/images/after.jpg",
    alt: "Finished room glowing with layered ceiling light",
    label: "REFINED FINISH",
    text: "The last five percent of the work carries ninety percent of the impression.",
  },
];

export function Craftsmanship() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (reduce) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              DETAILS.length - 1,
              Math.max(0, Math.round(self.progress * DETAILS.length - 0.5)),
            );
            setActive(idx);
          },
        },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, [reduce]);

  /* Reduced motion / mobile → vertical storytelling stack */
  const vertical = (
    <div className="grid gap-6 px-5 md:grid-cols-2 md:px-10">
      {DETAILS.map((d, i) => (
        <Reveal key={d.label} delay={(i % 2) * 0.1} amount={0.2}>
          <div>
            <ParallaxImage src={d.src} alt={d.alt} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.3em]">{d.label}</p>
              <p className="text-[11px] tracking-[0.3em] text-mute">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">{d.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section className="py-24 md:py-36" aria-label="Craftsmanship details">
      <div className="mb-14 px-5 md:px-10">
        <Reveal y={16}>
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute uppercase">
            <span className="text-bronze">05</span>
            <span className="h-px w-8 bg-ink/25" aria-hidden />
            Craftsmanship
          </p>
        </Reveal>
        <h2 className="mt-7 font-serif text-[clamp(2.6rem,6vw,6rem)] leading-[0.98] tracking-[-0.02em]">
          DETAIL IS <span className="italic">the difference.</span>
        </h2>
      </div>

      {reduce ? (
        vertical
      ) : (
        <>
          {/* ——— desktop: pinned horizontal story ——— */}
          <div ref={sectionRef} className="relative hidden h-[380vh] lg:block">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
              <div ref={trackRef} className="flex w-max items-center gap-[6vw] px-[8vw] will-change-transform">
                {DETAILS.map((d, i) => (
                  <figure key={d.label} className="relative w-[62vw] max-w-[880px] shrink-0 xl:w-[54vw]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone">
                      <Image
                        src={d.src}
                        alt={d.alt}
                        fill
                        sizes="60vw"
                        className={cn(
                          "object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active === i ? "scale-100" : "scale-[1.07]",
                        )}
                      />
                      <div
                        className={cn(
                          "absolute inset-0 bg-ink/25 transition-opacity duration-1000",
                          active === i ? "opacity-0" : "opacity-100",
                        )}
                        aria-hidden
                      />
                      <span className="absolute top-5 left-5 bg-ink/55 px-3 py-1.5 text-[9px] font-semibold tracking-[0.32em] text-ivory backdrop-blur-sm">
                        {d.label}
                      </span>
                    </div>
                    <figcaption className="mt-5 flex items-start justify-between gap-8">
                      <p className="max-w-md text-sm leading-relaxed text-mute">{d.text}</p>
                      <span className="font-serif text-4xl text-bronze">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* progress */}
              <div className="absolute inset-x-[8vw] bottom-10">
                <div className="flex items-center justify-between text-[10px] font-medium tracking-[0.3em] text-mute">
                  <span>{DETAILS[active].label}</span>
                  <span>
                    {String(active + 1).padStart(2, "0")} / {String(DETAILS.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 h-px w-full bg-ink/12">
                  <div
                    className="h-px bg-bronze transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: `${((active + 1) / DETAILS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ——— mobile/tablet ——— */}
          <div className="lg:hidden">{vertical}</div>
        </>
      )}
    </section>
  );
}
