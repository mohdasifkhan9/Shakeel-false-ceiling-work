"use client";

import Image from "next/image";
import { Reveal, MaskLine } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { ArrowUpRight } from "lucide-react";
import { hasWhatsapp, whatsappHref, WA_DEFAULT_MSG } from "@/data/site";

export function FinalCTA() {
  return (
    <section
      id="quote"
      className="relative overflow-hidden bg-ink text-ivory"
      aria-label="Request a quote"
    >
      {/* slow-reveal backdrop */}
      <Reveal className="absolute inset-0" amount={0.05} y={0}>
        <div className="absolute inset-0 opacity-[0.16]">
          <Image
            src="/images/after.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" aria-hidden />
      </Reveal>

      <div className="relative px-5 py-24 md:px-10 md:py-40">
        <Reveal y={16}>
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute-light uppercase">
            <span className="text-bronze">10</span>
            <span className="h-px w-8 bg-ivory/25" aria-hidden />
            Begin
          </p>
        </Reveal>

        <h2 className="mt-8 font-serif text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em] uppercase">
          <MaskLine>LET&apos;S TALK ABOUT</MaskLine>
          <MaskLine delay={0.1}>
            <span className="italic normal-case">your space.</span>
          </MaskLine>
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-serif text-2xl leading-snug text-ivory/90 md:text-3xl">
                Tell us what you&apos;re working on.
              </p>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute-light">
                Planning a new false ceiling, upgrading an existing room, or looking for a tailored ceiling solution?
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="#quote-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-3 bg-ivory px-7 py-4 text-[10px] font-semibold tracking-[0.25em] text-ink uppercase transition-colors duration-500 hover:bg-bronze hover:text-ivory"
                >
                  REQUEST A QUOTE
                </a>
                <a
                  href="tel:+919959867685"
                  className="group inline-flex items-center justify-center gap-3 border border-ivory/35 px-7 py-4 text-[10px] font-semibold tracking-[0.25em] text-ivory uppercase transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-ink"
                >
                  CALL +91 99598 67685
                </a>
                <a
                  href="https://wa.me/919959867685"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 border border-ivory/35 px-7 py-4 text-[10px] font-semibold tracking-[0.25em] text-ivory uppercase transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-ink"
                >
                  WHATSAPP US
                </a>
              </div>
              <p className="mt-10 text-[10px] tracking-[0.2em] text-mute-light uppercase leading-relaxed">
                Plot No: 5, Near Flyover, New Hafeezpet, Aditya Nagar, Hafeezpet, Hyderabad, Telangana 500049
              </p>
            </Reveal>
          </div>

          <div id="quote-form" className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.15}>
              <p className="mb-8 text-[11px] font-semibold tracking-[0.35em] text-mute-light uppercase">
                Request a quote
              </p>
              <QuoteForm dark />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
