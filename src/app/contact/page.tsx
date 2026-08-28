import type { Metadata } from "next";
import { ArrowUpRight, MapPin, MessageCircle, Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { FAQ } from "@/components/ui/FAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import {
  site,
  hasPhone,
  hasEmail,
  hasWhatsapp,
  telHref,
  whatsappHref,
  WA_DEFAULT_MSG,
  mapsHref,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Shakeel False Ceiling Work | Hyderabad",
  description:
    "Contact Shakeel False Ceiling Work in Hafeezpet, Hyderabad for false ceiling and interior ceiling enquiries. Call +91 99598 67685 or send an enquiry.",
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="Contact"
        lines={[
          "Let's Talk About",
          <>
            <span className="italic normal-case">Your Space</span>
          </>,
        ]}
        description="Planning a new ceiling or upgrading an existing interior? Tell us about your space — a few details are enough to begin."
      />

      <section id="quote" className="grid gap-16 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-36" aria-label="Quote request">
        {/* form */}
        <div className="md:col-span-7">
          <Reveal amount={0.15}>
            <p className="mb-10 text-[11px] font-semibold tracking-[0.35em] text-mute uppercase">
              Request a quote
            </p>
            <QuoteForm />
          </Reveal>
        </div>

        {/* info sidebar */}
        <aside className="md:col-span-4 md:col-start-9" aria-label="Contact options">
          <Reveal delay={0.15} amount={0.15}>
            <p className="mb-8 text-[11px] font-semibold tracking-[0.35em] text-mute uppercase">
              Contact Details
            </p>

            <div className="border-t border-line pt-6">
              <h3 className="font-serif text-2xl font-bold tracking-tight uppercase">
                SHAKEEL FALSE CEILING WORK
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                Plot No: 5, Near Flyover,<br />
                New Hafeezpet, Aditya Nagar,<br />
                Hafeezpet, Hyderabad,<br />
                Telangana 500049
              </p>
              <p className="mt-4 font-serif text-2xl text-bronze font-semibold">
                +91 99598 67685
              </p>
            </div>

            <div className="mt-8 space-y-3 flex flex-col">
              <a
                href="tel:+919959867685"
                className="group flex items-center justify-between border border-line px-5 py-4 text-xs font-semibold tracking-wider uppercase hover:border-ink hover:bg-ink hover:text-ivory transition-all duration-500"
              >
                CALL NOW
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden />
              </a>
              <a
                href="https://wa.me/919959867685"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-line px-5 py-4 text-xs font-semibold tracking-wider uppercase hover:border-ink hover:bg-ink hover:text-ivory transition-all duration-500"
              >
                WHATSAPP
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden />
              </a>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-line px-5 py-4 text-xs font-semibold tracking-wider uppercase hover:border-ink hover:bg-ink hover:text-ivory transition-all duration-500"
              >
                GET DIRECTIONS
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden />
              </a>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="text-[10px] font-medium tracking-[0.35em] text-mute uppercase">
                Service area
              </p>
              <p className="mt-3 font-serif text-3xl tracking-tight">
                Hyderabad, <span className="italic">Telangana</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                Residential and commercial ceiling projects across the city.
                Site visits can be arranged after an initial conversation.
              </p>
            </div>
          </Reveal>
        </aside>
      </section>

      {/* faq */}
      <section className="border-t border-line bg-stone/50 px-5 py-20 md:px-10 md:py-28" aria-label="Frequently asked questions">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Before you ask" lines={["QUESTIONS,", "ANSWERED."]} />
          </div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6" amount={0.1}>
            <FAQ items={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
