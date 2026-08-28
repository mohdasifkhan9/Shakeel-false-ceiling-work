import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/instrument-serif";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";

import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Footer } from "@/components/layout/Footer";
import { site, hasPhone, hasMaps } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "False Ceiling Contractor in Hyderabad | Shakeel False Ceiling Work",
    template: "%s · Shakeel False Ceiling Work",
  },
  description:
    "Shakeel False Ceiling Work provides false ceiling and interior ceiling solutions in Hafeezpet, Hyderabad. Explore our work and contact us for residential or commercial projects.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "False Ceiling Contractor in Hyderabad | Shakeel False Ceiling Work",
    description:
      "Shakeel False Ceiling Work provides false ceiling and interior ceiling solutions in Hafeezpet, Hyderabad. Explore our work and contact us for residential or commercial projects.",
    url: site.url,
    images: [{ url: "/images/hero.jpg", alt: "Layered false ceiling with warm cove lighting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "False Ceiling Contractor in Hyderabad | Shakeel False Ceiling Work",
    description:
      "Shakeel False Ceiling Work provides false ceiling and interior ceiling solutions in Hafeezpet, Hyderabad. Explore our work and contact us for residential or commercial projects.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#17150f",
  width: "device-width",
  initialScale: 1,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Shakeel False Ceiling Work",
  description:
    "False ceiling and interior ceiling craftsmanship in Hyderabad — false ceilings, gypsum ceiling work, lighting integration and custom ceiling design for residential and commercial spaces.",
  url: site.url,
  image: `${site.url}/images/hero.jpg`,
  telephone: "+91 99598 67685",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No: 5, Near Flyover, New Hafeezpet, Aditya Nagar, Hafeezpet",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500049",
    addressCountry: "IN",
  },
  hasMap: site.mapsUrl,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ivory pb-[52px] text-ink antialiased md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <div className="grain" aria-hidden />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
