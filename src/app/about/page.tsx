import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocationSection } from "@/components/sections/LocationSection";
import { CTABanner } from "@/components/ui/CTABanner";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Shakeel False Ceiling Work | Hyderabad",
  description:
    "Learn about Shakeel False Ceiling Work, a local false ceiling and interior ceiling service based in Hafeezpet, Hyderabad. Explore our approach to ceiling design and craftsmanship.",
  alternates: { canonical: "/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about` },
  ],
};

const PRINCIPLES = [
  {
    n: "01",
    title: "CLEAN FINISHING",
    text: "A refined finish can change the perception of an entire room. Edges, junctions and surfaces are treated as the product — not the afterthought.",
  },
  {
    n: "02",
    title: "SPACE-AWARE DESIGN",
    text: "Ceiling proportions should work with the architecture below them. Height, span and light decide the design — never the other way around.",
  },
  {
    n: "03",
    title: "LIGHTING CONSIDERATION",
    text: "The ceiling and lighting are one visual system. Coves, spots and profiles are planned into the structure from the very first sketch.",
  },
  {
    n: "04",
    title: "TAILORED EXECUTION",
    text: "Each space has different dimensions, requirements and visual goals. Execution adapts to the room — the room is never forced into a template.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="About"
        lines={[
          "False Ceiling",
          "Craftsmanship",
          <span key="hyd" className="italic normal-case">in Hyderabad</span>,
        ]}
        description={`${site.name} — false ceiling and interior ceiling craftsmanship, based in Hafeezpet, Hyderabad.`}
      />

      {/* story */}
      <section className="grid gap-12 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-36" aria-label="Our story">
        <div className="md:col-span-5">
          <Reveal amount={0.25}>
            <ParallaxImage
              src="/images/intro.jpg"
              alt="Layered ceiling planes with warm edge light — the kind of detail the studio obsesses over"
              className="aspect-[4/5]"
              sizes="(min-width: 768px) 42vw, 100vw"
              strength={0.6}
            />
            <p className="mt-4 text-[10px] tracking-[0.3em] text-mute uppercase">
              Detail, documented
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="font-serif text-2xl leading-snug md:text-3xl">
              Some trades finish a room. This one defines it.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 text-[15px] leading-relaxed text-mute">
              {site.name} is led by <strong className="font-semibold text-ink">Shakeel</strong>, a
              ceiling craftsman working across {site.city}. The practice does
              one thing and stays with it: false ceilings and the interiors
              they complete — for homes, offices, shops and commercial spaces.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-mute">
              The work is personal and hands-on: the same person who measures
              your room is accountable for how its edges land. Questions are
              welcomed mid-project, and no junction is called finished until it
              survives a close look.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-mute">
              Why does quality matter so much in a ceiling? Because nothing
              else in a room is seen all at once, from everywhere, forever.
              Paint ages; furniture moves. The ceiling stays — and it keeps
              telling the truth about how it was made.
            </p>
            <p className="mt-8 font-serif text-2xl leading-snug text-ink italic">
              “A line is either straight, or it isn&apos;t finished.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* why the details matter */}
      <section className="border-t border-line px-5 py-20 md:px-10 md:py-32" aria-label="Why the details matter">
        <SectionHeading eyebrow="Approach" lines={["WHY THE DETAILS", "MATTER"]} />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="border-t border-ink/20 pt-6">
                <p className="text-[11px] font-medium tracking-[0.3em] text-bronze">{p.n}</p>
                <h3 className="mt-4 font-serif text-2xl tracking-tight">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mute">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <LocationSection />
      <CTABanner
        lines={["Talk ceilings", "with us."]}
        copy="Tell us about your space — a conversation costs nothing and usually sharpens the plan."
      />
    </>
  );
}
