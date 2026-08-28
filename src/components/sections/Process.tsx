"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/anim";
import { STEPS } from "@/data/steps";
import { cn } from "@/lib/utils";

export function Process() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (reduce) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      if (!section) return;
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              STEPS.length - 1,
              Math.max(0, Math.floor(self.progress * STEPS.length)),
            );
            setActive(idx);
          },
        },
      });
      return () => st.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, [reduce]);

  const step = STEPS[active];

  const verticalTimeline = (
    <ol className="relative space-y-12 border-l border-line pl-8">
      {STEPS.map((s, i) => (
        <li key={s.n}>
          <Reveal delay={0.05}>
            <span className="absolute -left-[5px] mt-2 size-2.5 rounded-full bg-bronze" aria-hidden />
            <p className="text-[11px] font-medium tracking-[0.3em] text-bronze">{s.n}</p>
            <h3 className="mt-2 font-serif text-3xl tracking-tight">{s.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">{s.desc}</p>
            <div className="relative mt-5 aspect-[16/10] max-w-md overflow-hidden bg-stone">
              <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );

  return (
    <section id="process" className="py-24 md:py-36" aria-label="Process">
      <div className="mb-14 px-5 md:px-10">
        <Reveal y={16}>
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute uppercase">
            <span className="text-bronze">06</span>
            <span className="h-px w-8 bg-ink/25" aria-hidden />
            Process
          </p>
        </Reveal>
        <h2 className="mt-7 font-serif text-[clamp(2.6rem,6vw,6rem)] leading-[0.98] tracking-[-0.02em]">
          FROM IDEA <span className="italic">to finish.</span>
        </h2>
      </div>

      {reduce ? (
        <div className="px-5 md:px-10">{verticalTimeline}</div>
      ) : (
        <>
          {/* ——— desktop: pinned stage ——— */}
          <div ref={sectionRef} className="relative hidden h-[420vh] lg:block">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-[8vw]">
              <div className="grid items-center gap-16 xl:grid-cols-2">
                {/* step copy */}
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.n}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <p className="font-serif text-[clamp(6rem,10vw,10rem)] leading-none text-bronze">
                        {step.n}
                      </p>
                      <h3 className="mt-4 font-serif text-5xl tracking-tight">{step.title}</h3>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-mute">{step.desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* step image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={step.n}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    >
                      <Image src={step.image} alt={step.alt} fill sizes="45vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* timeline rail */}
              <div className="mt-16">
                <div className="relative">
                  <div className="absolute top-1/2 h-px w-full bg-ink/12" aria-hidden />
                  <div
                    className="absolute top-1/2 h-px bg-bronze transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
                    aria-hidden
                  />
                  <ol className="relative flex justify-between">
                    {STEPS.map((s, i) => (
                      <li key={s.n} className="flex flex-col items-center gap-3">
                        <span
                          className={cn(
                            "block rounded-full border transition-all duration-500",
                            i <= active ? "size-3 border-bronze bg-bronze" : "size-2.5 border-ink/25 bg-ivory",
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "font-serif transition-all duration-500",
                            i === active ? "text-3xl text-ink" : "text-xl text-ink/35",
                          )}
                        >
                          {s.n}
                        </span>
                        <span
                          className={cn(
                            "text-[9px] font-semibold tracking-[0.3em] transition-colors duration-500",
                            i === active ? "text-ink" : "text-mute",
                          )}
                        >
                          {s.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* ——— mobile/tablet ——— */}
          <div className="px-5 md:px-10 lg:hidden">{verticalTimeline}</div>
        </>
      )}
    </section>
  );
}
