import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function BeforeAfter() {
  return (
    <section className="py-24 md:py-36" aria-label="Before and after">
      <div className="px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="04"
            eyebrow="Transformation"
            lines={["FROM STRUCTURE", "TO ATMOSPHERE."]}
          />
          <Reveal delay={0.2} className="pb-2">
            <p className="max-w-xs text-sm leading-relaxed text-mute">
              Every finished ceiling begins as bare structure. Drag the divider
              to see the journey from slab and conduit to warm, layered light.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal amount={0.15} className="mt-14">
        <BeforeAfterSlider
          before="/images/before.jpg"
          after="/images/after.jpg"
          beforeAlt="Unfinished room — raw concrete slab with exposed conduits and wiring"
          afterAlt="Finished room — layered false ceiling with warm cove lighting"
          className="h-[62vh] min-h-[420px] w-full md:h-[80vh]"
        />
      </Reveal>

      <div className="px-5 md:px-10">
        <Reveal delay={0.1}>
          <p className="mt-5 text-[10px] tracking-[0.25em] text-mute uppercase">
            Representative of a structure-to-finish transformation
          </p>
        </Reveal>
      </div>
    </section>
  );
}
