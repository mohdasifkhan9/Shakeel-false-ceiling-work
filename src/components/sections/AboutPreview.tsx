import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function AboutPreview() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36" aria-label="About">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal amount={0.25}>
            <ParallaxImage
              src="/images/craft-light.jpg"
              alt="Warm cove light traced along a finished ceiling recess"
              className="aspect-[4/5]"
              sizes="(min-width: 1024px) 42vw, 100vw"
              strength={0.6}
            />
            <p className="mt-4 text-[10px] tracking-[0.3em] text-mute uppercase">
              The work, up close
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal y={16}>
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute uppercase">
              <span className="text-bronze">08</span>
              <span className="h-px w-8 bg-ink/25" aria-hidden />
              About
            </p>
          </Reveal>
          <h2 className="mt-7 font-serif text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
            BUILT ON <span className="italic">craft.</span>
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-mute">
              {site.name} is a {site.city}-based ceiling practice led by
              hands-on workmanship. The focus is narrow on purpose: false
              ceilings and the interiors they complete — homes, offices and
              commercial spaces across the city.
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mute">
              The approach is simple. Measure honestly. Plan the ceiling and
              the lighting as one system. Install with patience. Finish like
              someone will look closely — because eventually, everyone does.
            </p>
            <p className="mt-8 max-w-xl font-serif text-2xl leading-snug text-ink italic">
              “A line is either straight, or it isn&apos;t finished.”
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <Button href="/about" variant="outline">
              About the studio
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
