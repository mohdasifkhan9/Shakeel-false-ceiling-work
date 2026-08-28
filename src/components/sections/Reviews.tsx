"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/anim";
import { googleRating, googleReviewCount, reviews } from "@/data/reviews";
import { mapsHref } from "@/data/site";

/**
 * Trust section. Shows the full Google-rating + carousel ONLY when genuine,
 * verified reviews are added to src/data/reviews.ts — until then it renders
 * an honest editorial state (we never fabricate testimonials).
 */
export function Reviews() {
  const [i, setI] = useState(0);
  const hasReviews = reviews.length > 0 && googleRating !== null;

  return (
    <section className="border-y border-line bg-stone/60 px-5 py-24 md:px-10 md:py-36" aria-label="Client reviews">
      <Reveal y={16}>
        <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute uppercase">
          <span className="text-bronze">07</span>
          <span className="h-px w-8 bg-ink/25" aria-hidden />
          Trust
        </p>
      </Reveal>

      {hasReviews ? (
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-[clamp(4rem,7vw,7rem)] leading-none">
              {googleRating?.toFixed(1)}
              <span className="text-bronze">★</span>
            </p>
            <div className="mt-4 flex gap-1" aria-label={`${googleRating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="size-4 fill-bronze text-bronze" aria-hidden />
              ))}
            </div>
            {googleReviewCount && (
              <p className="mt-3 text-[11px] tracking-[0.3em] text-mute uppercase">
                {googleReviewCount} Google reviews
              </p>
            )}
            <h2 className="mt-8 font-serif text-3xl tracking-tight md:text-4xl">WHAT CLIENTS SAY</h2>
          </div>

          <div className="lg:col-span-8">
            <div className="relative min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <p className="max-w-2xl font-serif text-2xl leading-snug md:text-[2rem]">
                    “{reviews[i].quote}”
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: reviews[i].rating }).map((_, s) => (
                        <Star key={s} className="size-3.5 fill-bronze text-bronze" aria-hidden />
                      ))}
                    </div>
                    <cite className="text-[11px] font-semibold tracking-[0.25em] uppercase not-italic">
                      {reviews[i].author}
                    </cite>
                    <span className="text-[10px] tracking-[0.25em] text-mute uppercase">
                      via Google
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => setI((i - 1 + reviews.length) % reviews.length)}
                aria-label="Previous review"
                className="rounded-full border border-ink/20 p-3 transition-colors hover:bg-ink hover:text-ivory"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setI((i + 1) % reviews.length)}
                aria-label="Next review"
                className="rounded-full border border-ink/20 p-3 transition-colors hover:bg-ink hover:text-ivory"
              >
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline ml-6 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase"
              >
                View more reviews <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Honest state — no fabricated testimonials */
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <h2 className="font-serif text-[clamp(2.6rem,5.6vw,5rem)] leading-[1.02] tracking-[-0.02em] lg:col-span-7">
            <span className="block">EVERY PROJECT EARNS</span>
            <span className="block italic">its reputation.</span>
          </h2>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-[15px] leading-relaxed text-mute">
              We don&apos;t publish words we didn&apos;t receive. Genuine Google
              reviews from completed projects will be featured here — unedited
              and attributed — as our profile grows.
            </p>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-6 inline-flex w-fit items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase"
            >
              View Google profile <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
