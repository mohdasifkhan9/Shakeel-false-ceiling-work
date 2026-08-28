import { ArrowUpRight } from "lucide-react";
import { Reveal, MaskLine } from "./Reveal";
import { Button } from "./Button";
import { hasWhatsapp, whatsappHref, WA_DEFAULT_MSG } from "@/data/site";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  lines: string[];
  copy?: string;
  className?: string;
}

/** Compact dark conversion band reused across inner pages. */
export function CTABanner({ lines, copy, className }: CTABannerProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-ink px-5 py-20 text-ivory md:px-10 md:py-32", className)}
      aria-label="Get a quote"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal y={16}>
            <p className="mb-8 text-[10px] font-medium tracking-[0.4em] text-mute-light uppercase">
              Begin the conversation
            </p>
          </Reveal>
          <h2 className="font-serif text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[0.96] tracking-[-0.02em] uppercase">
            {lines.map((l, i) => (
              <MaskLine key={l} delay={i * 0.1}>
                {l}
              </MaskLine>
            ))}
          </h2>
          {copy && (
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute-light">{copy}</p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.2} className="flex flex-wrap gap-3">
          <Button href="/contact" variant="solidLight">
            Get a quote
          </Button>
          {hasWhatsapp && (
            <a
              href={whatsappHref(WA_DEFAULT_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="chat"
              className="group inline-flex items-center gap-3 border border-ivory/35 px-7 py-4 text-[11px] font-semibold tracking-[0.28em] uppercase transition-all duration-500 hover:border-ivory hover:bg-ivory hover:text-ink"
            >
              WhatsApp
              <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden />
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
