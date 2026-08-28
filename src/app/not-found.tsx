import Link from "next/link";
import { MaskLine } from "@/components/ui/Reveal";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-32 pb-20 text-center">
      <p className="text-[11px] font-medium tracking-[0.4em] text-mute uppercase">
        404 — Off the plan
      </p>
      <h1 className="mt-8 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.98] tracking-[-0.02em]">
        <MaskLine>This room has</MaskLine>
        <MaskLine delay={0.1}>
          <span className="italic">no ceiling.</span>
        </MaskLine>
      </h1>
      <Link
        href="/"
        data-cursor="open"
        className="group mt-12 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[11px] font-semibold tracking-[0.3em] text-ivory uppercase transition-colors duration-500 hover:bg-bronze"
      >
        Back home
        <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}
