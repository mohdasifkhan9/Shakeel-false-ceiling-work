/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS INFORMATION — single source of truth.
 *  Real contact details are injected via public env vars.
 *  Placeholders remain empty until the client supplies them:
 *    NEXT_PUBLIC_SFCW_PHONE      → [CLIENT PHONE]
 *    NEXT_PUBLIC_SFCW_WHATSAPP   → [WHATSAPP NUMBER]  (digits, with country code)
 *    NEXT_PUBLIC_SFCW_EMAIL      → [CLIENT EMAIL]
 *    NEXT_PUBLIC_SFCW_MAPS       → [GOOGLE BUSINESS LISTING URL]
 *  UI components degrade gracefully (hide / reroute) while empty.
 * ─────────────────────────────────────────────────────────────
 */

export interface NavItem {
  label: string;
  href: string;
  cursor?: string;
}

export const site = {
  name: "Shakeel False Ceiling Work",
  short: "SHAKEEL",
  descriptor: "False Ceiling Work",
  tagline: "False ceiling & interior craftsmanship",
  city: "Hyderabad",
  region: "Telangana, India",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shakeelfalseceilingwork.in",

  phone: "+91 99598 67685",
  whatsapp: "+91 99598 67685",
  email: "", // Not verified
  address: "Plot No: 5, Near Flyover, New Hafeezpet, Aditya Nagar, Hafeezpet, Hyderabad, Telangana 500049",
  mapsUrl: "https://maps.google.com/?q=Shakeel+False+Ceiling+Work+Plot+No:+5,+Near+Flyover,+New+Hafeezpet,+Aditya+Nagar,+Hafeezpet,+Hyderabad,+Telangana+500049",
};

export const nav: NavItem[] = [
  { label: "WORK", href: "/work", cursor: "view" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "PROCESS", href: "/#process" },
  { label: "CONTACT", href: "/contact" },
];

export const hasPhone = true;
export const hasWhatsapp = true;
export const hasEmail = false;
export const hasMaps = true;

export const telHref = "tel:+919959867685";
export const mapsHref = site.mapsUrl;

export function whatsappHref(message?: string) {
  const num = "919959867685";
  const base = `https://wa.me/${num}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WA_DEFAULT_MSG =
  "Hello Shakeel False Ceiling Work — I'd like to discuss a false ceiling project in Hyderabad.";
