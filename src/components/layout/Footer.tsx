import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskLine, Reveal } from "@/components/ui/Reveal";
import {
  nav,
  site,
  hasPhone,
  hasEmail,
  hasWhatsapp,
  telHref,
  whatsappHref,
  WA_DEFAULT_MSG,
  mapsHref,
} from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      {/* statement */}
      <div className="border-b border-ivory/10 px-5 pt-24 pb-16 md:px-10 md:pt-36 md:pb-24">
        <Reveal y={16}>
          <p className="mb-8 text-[10px] font-medium tracking-[0.4em] text-mute-light uppercase">
            {site.name}
          </p>
        </Reveal>
        <h2 className="font-serif text-[clamp(2.8rem,8.5vw,8.5rem)] leading-[0.95] tracking-[-0.02em]">
          <MaskLine>GOOD SPACES</MaskLine>
          <MaskLine delay={0.1}>DESERVE GOOD</MaskLine>
          <MaskLine delay={0.2}>
            <span className="text-outline-light">CEILINGS.</span>
          </MaskLine>
        </h2>
      </div>

      {/* columns */}
      <div className="grid gap-12 px-5 py-14 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-6">
          <Reveal>
            <p className="font-serif text-2xl font-bold tracking-tight">{site.name.toUpperCase()}</p>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-mute-light uppercase">
              False Ceiling & Interior Craftsmanship
            </p>
            <p className="mt-2 text-[10px] tracking-[0.2em] text-mute-light uppercase">
              Hafeezpet · Hyderabad · Telangana
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute-light">
              Plot No: 5, Near Flyover,<br />
              New Hafeezpet, Aditya Nagar,<br />
              Hafeezpet, Hyderabad,<br />
              Telangana 500049
            </p>
            <p className="mt-6 text-lg font-semibold text-ivory">
              <a href={telHref} className="hover:text-bronze transition-colors">
                +91 99598 67685
              </a>
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-3">
          <Reveal delay={0.08}>
            <p className="mb-5 text-[10px] tracking-[0.4em] text-mute-light uppercase">
              Navigate
            </p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    className="link-underline text-sm tracking-[0.12em] text-ivory/85"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="md:col-span-3">
          <Reveal delay={0.16}>
            <p className="mb-5 text-[10px] tracking-[0.4em] text-mute-light uppercase">
              Connect
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 tracking-[0.12em] text-ivory/85"
                >
                  GOOGLE MAPS <ArrowUpRight className="size-3" aria-hidden />
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(WA_DEFAULT_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 tracking-[0.12em] text-ivory/85"
                >
                  WHATSAPP <ArrowUpRight className="size-3" aria-hidden />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      {/* baseline */}
      <div className="flex flex-col gap-3 border-t border-ivory/10 px-5 py-6 text-[10px] tracking-[0.3em] text-mute-light uppercase md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 {site.name}</p>
        <p>Designed for craft.</p>
      </div>
    </footer>
  );
}
