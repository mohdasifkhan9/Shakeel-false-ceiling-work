import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { CTABanner } from "@/components/ui/CTABanner";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "False Ceiling Designs & Projects in Hyderabad | Shakeel",
  description:
    "Explore false ceiling and interior ceiling projects by Shakeel False Ceiling Work in Hyderabad, with residential and commercial work presented through authentic project photography.",
  alternates: { canonical: "/work" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHero
        eyebrow="Portfolio"
        lines={[
          "Selected",
          "Ceiling",
          <span key="work" className="italic normal-case">Work</span>,
        ]}
        description="Ceiling directions for homes and commercial spaces — layered trays, floating planes, cove-integrated light. Filter by the kind of space you're planning."
      />
      <WorkGallery />
      <CTABanner
        lines={["Imagine this", "in your space."]}
        copy="Tell us about your room — we'll suggest a ceiling approach and share a clear quotation."
      />
    </>
  );
}
