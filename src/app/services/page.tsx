import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { FAQ } from "@/components/ui/FAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/ui/CTABanner";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import { STEPS } from "@/data/steps";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "False Ceiling & Ceiling Design Services in Hyderabad",
  description:
    "Explore false ceiling and ceiling design services from Shakeel False Ceiling Work in Hafeezpet, Hyderabad, for residential and commercial spaces.",
  alternates: { canonical: "/services" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Services"
        lines={[
          "False Ceiling",
          "Services",
          <span key="hyd" className="italic normal-case">in Hyderabad</span>,
        ]}
        description="Six disciplines around one material question: what should this room feel like from above? Every scope begins with a conversation about your space."
      />

      {/* service sections */}
      <div className="px-5 pb-8 md:px-10">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className="scroll-mt-24 border-t border-line py-14 md:py-20"
            aria-label={s.title}
          >
            <div className="grid items-start gap-10 lg:grid-cols-12">
              <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                <Reveal y={16}>
                  <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-mute uppercase">
                    <span className="text-bronze">{s.index}</span>
                    <span className="h-px w-8 bg-ink/25" aria-hidden />
                    Service
                  </p>
                </Reveal>
                <h2 className="mt-6 font-serif text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.02] tracking-[-0.02em]">
                  {s.title}
                </h2>
                <Reveal delay={0.12}>
                  <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute">{s.overview}</p>
                </Reveal>
                <Reveal delay={0.2}>
                  <ul className="mt-8 space-y-3">
                    {s.applications.map((a) => (
                      <li key={a} className="flex items-center gap-3 text-sm">
                        <Check className="size-3.5 text-bronze" strokeWidth={2} aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <div className={cn("lg:col-span-6 lg:col-start-7", i % 2 === 1 && "lg:order-1 lg:col-start-1")}>
                <Reveal amount={0.25}>
                  <ParallaxImage
                    src={s.image}
                    alt={s.imageAlt}
                    className="aspect-[16/11]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* process strip */}
      <section className="border-t border-line bg-stone/50 px-5 py-16 md:px-10 md:py-24" aria-label="Process overview">
        <SectionHeading eyebrow="How it works" lines={["A CLEAR PATH", "TO FINISH."]} size="lg" />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="bg-ivory">
              <div className="p-7">
                <p className="font-serif text-4xl text-bronze">{s.n}</p>
                <h3 className="mt-4 text-[11px] font-semibold tracking-[0.3em]">{s.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-mute">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="px-5 py-20 md:px-10 md:py-32" aria-label="Frequently asked questions">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" lines={["ASKED,", "ANSWERED."]} />
            <Reveal delay={0.2} className="mt-8">
              <p className="max-w-xs text-sm leading-relaxed text-mute">
                Anything else on your mind? Send it through the enquiry form —
                real questions get real answers.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6" amount={0.1}>
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTABanner
        lines={["Have a ceiling", "in mind?"]}
        copy="Share your room and its dimensions — we'll propose an approach and a clear quotation."
      />
    </>
  );
}
