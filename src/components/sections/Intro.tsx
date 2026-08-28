import { MaskLine, Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { site } from "@/data/site";

const MARQUEE = [
  "FALSE CEILINGS",
  "COVE LIGHTING",
  "GYPSUM WORK",
  "SHADOW GAPS",
  "RECESSED LIGHTING",
  "CUSTOM DESIGN",
  "CLEAN FINISHING",
];

export function Intro() {
  return (
    <section className="relative pt-24 md:pt-40" aria-label="The craft">
      <div className="px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-2" y={16}>
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute uppercase">
              <span className="text-bronze">01</span>
              <span className="h-px w-8 bg-ink/25" aria-hidden />
              The craft
            </p>
          </Reveal>

          <div className="md:col-span-10">
            <h2 className="font-serif text-[clamp(2.8rem,7vw,7rem)] leading-[0.98] tracking-[-0.02em]">
              <MaskLine>A CEILING IS MORE</MaskLine>
              <MaskLine delay={0.1}>THAN WHAT&apos;S</MaskLine>
              <MaskLine delay={0.2}>
                <span className="italic">above you.</span>
              </MaskLine>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.25}>
            <p className="text-[15px] leading-relaxed text-mute">
              It shapes how a space feels, how light moves through it, and how
              every architectural detail comes together.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink">
              <strong className="font-semibold">{site.name}</strong> provides false ceiling and interior ceiling solutions for residential and commercial spaces in Hafeezpet, Hyderabad, Telangana. From contemporary ceiling designs to detailed finishing, every project is approached with attention to proportion, lighting and execution.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal amount={0.2}>
              <ParallaxImage
                src="/images/intro.jpg"
                alt="Floating ivory ceiling planes with warm edge lighting above a charcoal wall"
                className="aspect-[4/3] md:aspect-[16/10]"
                sizes="(min-width: 768px) 66vw, 100vw"
                strength={0.7}
              />
            </Reveal>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <Reveal delay={0.15}>
              <p className="text-[10px] font-medium tracking-[0.35em] text-mute uppercase">
                The fifth wall
              </p>
              <p className="mt-4 font-serif text-2xl leading-snug md:text-[1.7rem]">
                The largest uninterrupted surface in the room — designed, not
                default.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="mt-20 overflow-hidden border-y border-line py-4 md:mt-28" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((term, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-[11px] font-medium tracking-[0.35em] text-mute"
            >
              {term}
              <span className="text-bronze">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
