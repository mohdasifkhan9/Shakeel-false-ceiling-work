"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/anim";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesHome() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" className="relative px-5 py-24 md:px-10 md:py-36" aria-label="Services">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          index="02"
          eyebrow="Services"
          lines={["WHAT WE", "CREATE"]}
        />
        <Reveal delay={0.2} className="max-w-xs pb-2">
          <p className="text-sm leading-relaxed text-mute">
            Six disciplines, one standard of finish.{" "}
            <span className="hidden lg:inline">Hover a service to preview it.</span>
            <span className="lg:hidden">Tap a service to expand it.</span>
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* ——— interactive list (desktop) ——— */}
        <div className="hidden lg:col-span-7 lg:block">
          <Reveal amount={0.1}>
            <ul className="border-t border-line">
              {services.map((s, i) => (
                <li key={s.slug} className="border-b border-line">
                  <Link
                    href={`/services#${s.slug}`}
                    data-cursor="view"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span className="flex items-baseline gap-7">
                      <span
                        className={cn(
                          "text-[11px] tracking-[0.3em] transition-colors duration-400",
                          active === i ? "text-bronze" : "text-mute",
                        )}
                      >
                        {s.index}
                      </span>
                      <span
                        className={cn(
                          "font-serif text-3xl tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:text-[2.6rem]",
                          active === i ? "translate-x-3 text-ink" : "text-ink/55",
                        )}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "rounded-full border p-2.5 transition-all duration-500",
                        active === i
                          ? "rotate-45 border-bronze text-bronze"
                          : "border-ink/15 text-mute",
                      )}
                    >
                      <ArrowRight className="size-3.5 -rotate-45" strokeWidth={1.5} aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Button href="/services" variant="outline">
              All services & process
            </Button>
          </Reveal>
        </div>

        {/* ——— preview panel ——— */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <Reveal amount={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={services[active].slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: EASE }}
                  >
                    <Image
                      src={services[active].image}
                      alt={services[active].imageAlt}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/65 to-transparent px-5 pt-16 pb-4 text-ivory">
                  <span className="text-[10px] font-medium tracking-[0.3em]">
                    {services[active].title}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-ivory/70">
                    {services[active].index} / 06
                  </span>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">
                {services[active].short}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ——— accordion (mobile / tablet) ——— */}
        <div className="lg:hidden">
          <ul className="border-t border-line">
            {services.map((s, i) => {
              const isOpen = open === i;
              return (
                <li key={s.slug} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="text-[11px] tracking-[0.3em] text-bronze">{s.index}</span>
                      <span className="font-serif text-2xl tracking-tight">{s.title}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="rounded-full border border-ink/20 p-2"
                    >
                      <Plus className="size-3.5" strokeWidth={1.5} aria-hidden />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-stone">
                          <Image
                            src={s.image}
                            alt={s.imageAlt}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                        <p className="max-w-md pb-2 text-sm leading-relaxed text-mute">{s.short}</p>
                        <Link
                          href={`/services#${s.slug}`}
                          className="link-underline mt-3 mb-6 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.3em] uppercase"
                        >
                          Explore service
                          <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          <div className="mt-10">
            <Button href="/services" variant="outline">
              All services & process
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
