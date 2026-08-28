import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { FAQ } from "@/components/ui/FAQ";
import { CTABanner } from "@/components/ui/CTABanner";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { STEPS } from "@/data/steps";

// Dynamic metadata configuration
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const titles: Record<string, string> = {
    "false-ceiling": "False Ceiling Design & Installation in Hyderabad",
    "gypsum-false-ceiling": "Gypsum Board False Ceiling Contractor in Hyderabad",
    "pop-ceiling": "POP False Ceiling Work & Designs in Hyderabad",
    "cove-lighting": "LED Cove Lighting & Ceiling Light Integration Hyderabad",
    "residential": "Residential False Ceiling Services in Hyderabad",
    "commercial": "Commercial False Ceiling Contractor in Hyderabad",
  };

  const descriptions: Record<string, string> = {
    "false-ceiling": `Professional false ceiling contractor in Hyderabad. We install customized layered ceilings, board installations, and tray profiles in Hafeezpet.`,
    "gypsum-false-ceiling": `Get seamless gypsum false ceiling installation in Hyderabad. Best plasterboard ceiling contractor for homes and commercial interiors.`,
    "pop-ceiling": `Premium Plaster of Paris (POP) false ceiling design and molding services in Hyderabad by skilled local craftsmen.`,
    "cove-lighting": `Enhance your space with integrated LED cove lighting, recessed spot light slots, and custom lighting panels in Hyderabad.`,
    "residential": `Custom bedroom, kitchen, and living room false ceilings in Hyderabad. High-quality residential gypsum board layouts.`,
    "commercial": `Sturdy and aesthetic false ceiling works for corporate offices, retail stores, and commercial zones across Hyderabad.`,
  };

  return {
    title: titles[slug] ?? `${service.title} Services in Hyderabad`,
    description: descriptions[slug] ?? service.short,
    alternates: { canonical: `/services/${slug}` },
  };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": service.title,
    "description": service.short,
    "url": `${site.url}/services/${slug}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": site.url },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${site.url}/services` },
        { "@type": "ListItem", "position": 3, "name": service.title, "item": `${site.url}/services/${slug}` }
      ]
    }
  };

  // Dedicated FAQs based on service type
  const serviceFaqs: Record<string, { q: string; a: string }[]> = {
    "false-ceiling": [
      { q: "What types of false ceilings do you install?", a: "We install premium gypsum board, POP (Plaster of Paris), and acoustic grid ceilings depending on your home or commercial design goals." },
      { q: "How long does a standard false ceiling installation take?", a: "A standard bedroom or living room installation usually takes between 3 to 5 days, depending on geometry complexity and lighting coves." }
    ],
    "gypsum-false-ceiling": [
      { q: "Why choose gypsum board for ceilings?", a: "Gypsum boards offer lightweight, smooth paint-ready finishes, strong thermal/sound insulation, and fire resistance, making them ideal for modern homes." },
      { q: "Do you use premium quality gypsum boards?", a: "Yes, we use verified premium-grade boards and sturdy metal framework to ensure long-term structural integrity and prevent cracks." }
    ],
    "pop-ceiling": [
      { q: "What is the difference between Gypsum and POP ceilings?", a: "POP (Plaster of Paris) allows for custom-molded curves, decorative borders, and intricate cornices, whereas Gypsum boards are pre-fabricated sheets ideal for quick, flat planes and shadow gaps." },
      { q: "Is POP ceiling highly durable?", a: "Yes, when applied professionally with the right density and framework, POP ceiling works remain highly durable and resistant to moisture." }
    ],
    "cove-lighting": [
      { q: "Can you install cove lighting in existing ceilings?", a: "Yes, we can retrofit cove light trims or construct a new peripheral tray ceiling to accommodate architectural LED strip lights." },
      { q: "Do you supply the LED lights?", a: "We handle the complete ceiling framing and conduit preparation. The client can supply their preferred LED strip brand, or we can assist in sourcing them." }
    ],
    "residential": [
      { q: "Which areas do you serve for residential ceiling work?", a: "We provide residential ceiling services across Hafeezpet, Hyderabad, and nearby regions in Telangana." },
      { q: "Is false ceiling work messy for occupied homes?", a: "We take extra care to protect floors and furniture. Dust is minimized using modern cutting and vacuum setups during boarding." }
    ],
    "commercial": [
      { q: "Do you handle large commercial grid ceilings?", a: "Yes, we install standard commercial grid false ceilings, custom acoustic board ceilings, and linear office lobby layouts." },
      { q: "Can you work outside office hours?", a: "We can schedule framing and plaster work during off-peak hours to minimize disruption to your active operations." }
    ]
  };

  const faqs = serviceFaqs[slug] ?? [
    { q: "How do I get a quote?", a: "You can call us directly at +91 99598 67685 or send an enquiry via our contact form with your room dimensions." }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="px-5 pt-36 md:px-10 md:pt-52">
        <Reveal y={14}>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-mute uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.5} aria-hidden />
            All Services
          </Link>
        </Reveal>

        <PageHero
          eyebrow={`Service ${service.index}`}
          lines={[
            service.title.split(" ").slice(0, 2).join(" "),
            <>
              <span className="italic normal-case">{service.title.split(" ").slice(2).join(" ").toLowerCase() || "detail"}</span>
            </>,
          ]}
          description={service.short}
          className="px-0 pt-10"
        />
      </header>

      <Reveal amount={0.15} className="px-5 md:px-10">
        <ParallaxImage
          src={service.image}
          alt={service.imageAlt}
          priority
          className="aspect-[4/3] md:aspect-[21/10]"
          sizes="(min-width: 768px) 100vw, 100vw"
          strength={0.5}
        />
      </Reveal>

      {/* Overview */}
      <section className="grid gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-28" aria-label="Service Overview">
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none">
              A considered ceiling makes the room.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-mute">{service.overview}</p>
          </Reveal>
        </div>
      </section>

      {/* Applications & Capabilities */}
      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24" aria-label="Applications">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[10px] font-semibold tracking-[0.35em] text-mute uppercase">Core Applications</h2>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.applications.map((app) => (
                <Reveal key={app} className="flex items-center gap-3 text-base">
                  <Check className="size-4 text-bronze shrink-0" strokeWidth={2.5} />
                  <span>{app}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Execution Process */}
      <section className="border-t border-line bg-stone/50 px-5 py-16 md:px-10 md:py-24" aria-label="Execution Process">
        <h2 className="text-[10px] font-semibold tracking-[0.35em] text-mute uppercase mb-12">Our Work Process</h2>
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="bg-ivory p-6">
              <span className="font-serif text-3xl text-bronze">{s.n}</span>
              <h3 className="mt-4 text-[10px] font-semibold tracking-[0.25em] uppercase">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-mute">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24" aria-label="Frequently Asked Questions">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-3xl tracking-tight uppercase">Questions Answered</h2>
            <p className="mt-4 text-sm text-mute leading-relaxed">
              Find quick answers regarding our {service.title.toLowerCase()} processes and terms.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>

      {/* Link to Gallery / Contact */}
      <Link
        href="/work"
        className="group block border-t border-line px-5 py-16 md:px-10 md:py-24"
      >
        <p className="text-[10px] font-medium tracking-[0.4em] text-mute uppercase">Portfolio</p>
        <div className="mt-4 flex items-center justify-between gap-6">
          <p className="font-serif text-[clamp(2rem,5vw,5rem)] leading-none tracking-tight uppercase transition-colors duration-500 group-hover:text-bronze">
            Explore False Ceiling Projects
          </p>
          <span className="shrink-0 rounded-full border border-ink/20 p-4 transition-all duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ivory">
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.25} />
          </span>
        </div>
      </Link>

      <CTABanner
        lines={["Shape your", "own ceiling."]}
        copy="Share your space details and dimensions with us. We will provide a clean, transparent quote."
      />
    </>
  );
}
