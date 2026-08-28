import { ArrowUpRight } from "lucide-react";
import { Reveal, MaskLine } from "@/components/ui/Reveal";
import { site, mapsHref } from "@/data/site";

export function LocationSection() {
  return (
    <section
      className="border-t border-line px-5 py-24 text-center md:px-10 md:py-36"
      aria-label="Service area"
    >
      <Reveal y={16}>
        <p className="flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute uppercase">
          <span className="text-bronze">09</span>
          <span className="h-px w-8 bg-ink/25" aria-hidden />
          Service area
        </p>
      </Reveal>

      <h2 className="mt-10 font-serif text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.02em] uppercase">
        <MaskLine>Working across</MaskLine>
        <MaskLine delay={0.12}>
          <span className="italic normal-case">Hyderabad.</span>
        </MaskLine>
      </h2>

      <Reveal delay={0.25}>
        <p className="mt-8 text-sm leading-relaxed text-mute max-w-md mx-auto">
          Plot No: 5, Near Flyover, New Hafeezpet, Aditya Nagar, Hafeezpet, Hyderabad, Telangana 500049
        </p>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="open"
          className="group mt-10 inline-flex items-center gap-3 border border-ink/25 px-8 py-4 text-[11px] font-semibold tracking-[0.3em] uppercase transition-all duration-500 hover:bg-ink hover:text-ivory"
        >
          GET DIRECTIONS
          <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
