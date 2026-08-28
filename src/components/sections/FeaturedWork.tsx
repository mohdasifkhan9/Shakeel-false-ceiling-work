import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";

/**
 * Asymmetric editorial gallery — deliberately breaks the grid.
 * Featured pieces use the first five projects; /work shows all.
 */
export function FeaturedWork() {
  const [p1, p2, p3, p4, p5] = projects;

  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-36" aria-label="Selected work">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          lines={["SPACES, SHAPED", "FROM ABOVE."]}
        />
        <Reveal delay={0.2} className="pb-2">
          <p className="max-w-xs text-sm leading-relaxed text-mute">
            Representative showcases of ceiling styles and design directions —
            composed to show what considered ceiling work can do for a room.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-12 md:gap-6 md:pb-10">
        {/* large feature */}
        <Reveal className="md:col-span-7" amount={0.2}>
          <ProjectCard
            project={p1}
            index={0}
            priority
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3]"
          />
        </Reveal>

        {/* tall secondary — offset down */}
        <Reveal className="md:col-span-4 md:col-start-9 md:mt-28" amount={0.2} delay={0.1}>
          <ProjectCard
            project={p2}
            index={1}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[4/3] md:aspect-[3/4]"
          />
        </Reveal>

        {/* wide horizontal — pulled up to overlap */}
        <Reveal className="md:col-span-6 md:col-start-4 md:-mt-24" amount={0.2}>
          <ProjectCard
            project={p4}
            index={3}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3] md:aspect-[21/12]"
          />
        </Reveal>

        {/* vertical */}
        <Reveal className="md:col-span-3 md:col-start-2 md:mt-16" amount={0.2} delay={0.05}>
          <ProjectCard
            project={p3}
            index={2}
            sizes="(min-width: 768px) 25vw, 100vw"
            className="aspect-[4/3] md:aspect-[3/4]"
          />
        </Reveal>

        {/* large — overlapping the vertical */}
        <Reveal className="md:col-span-7 md:col-start-6 md:-mt-40" amount={0.2} delay={0.1}>
          <ProjectCard
            project={p5}
            index={4}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3] md:aspect-[16/9]"
          />
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Reveal>
          <p className="max-w-md text-[11px] leading-relaxed tracking-[0.14em] text-mute uppercase">
            Showcase imagery is representative — final project photography will
            be added as new work is completed.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/work" cursor="view">
            View all work
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
