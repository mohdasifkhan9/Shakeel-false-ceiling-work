import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, MaskLine } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { CTABanner } from "@/components/ui/CTABanner";
import { getProject, nextProject, projects } from "@/data/projects";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ceiling Showcase`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { images: [{ url: project.hero.src, alt: project.hero.alt }] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${site.url}/work/${project.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* header */}
      <header className="px-5 pt-36 md:px-10 md:pt-52">
        <Reveal y={14}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-mute uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.5} aria-hidden />
            All work
          </Link>
        </Reveal>

        <h1 className="mt-8 font-serif text-[clamp(2.8rem,8vw,8rem)] leading-[0.95] tracking-[-0.02em] uppercase">
          {project.title.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <MaskLine key={i} delay={0.1 + i * 0.08}>
                <span className="italic normal-case">{word.toLowerCase()}</span>
              </MaskLine>
            ) : (
              <MaskLine key={i} delay={0.1 + i * 0.08}>
                {word}
              </MaskLine>
            ),
          )}
        </h1>

        {/* meta table */}
        <Reveal delay={0.3}>
          <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
            <div>
              <dt className="text-[9px] font-medium tracking-[0.35em] text-mute uppercase">Category</dt>
              <dd className="mt-2.5 text-sm">{project.category}</dd>
            </div>
            <div>
              <dt className="text-[9px] font-medium tracking-[0.35em] text-mute uppercase">Location</dt>
              <dd className="mt-2.5 text-sm">{project.location}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[9px] font-medium tracking-[0.35em] text-mute uppercase">Scope</dt>
              <dd className="mt-2.5 flex flex-wrap gap-x-2 text-sm">
                {project.scope.map((s, i) => (
                  <span key={s}>
                    {s}
                    {i < project.scope.length - 1 && <span className="text-bronze"> · </span>}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-[10px] tracking-[0.3em] text-mute uppercase">
            Representative showcase
          </p>
        </Reveal>
      </header>

      {/* hero image */}
      <Reveal amount={0.15} className="mt-12 px-5 md:px-10">
        <ParallaxImage
          src={project.hero.src}
          alt={project.hero.alt}
          priority
          className="aspect-[4/3] md:aspect-[21/10]"
          sizes="(min-width: 768px) 100vw, 100vw"
          strength={0.5}
        />
      </Reveal>

      {/* summary */}
      <div className="grid gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-28">
        <Reveal className="md:col-span-6 md:col-start-4">
          <p className="font-serif text-2xl leading-snug md:text-[2rem]">{project.summary}</p>
        </Reveal>
      </div>

      {/* THE SPACE */}
      <section className="px-5 pb-16 md:px-10 md:pb-28" aria-label="The space">
        <Reveal y={16}>
          <h2 className="flex items-center gap-4 text-[11px] font-medium tracking-[0.35em] text-mute uppercase">
            <span className="h-px w-10 bg-ink/25" aria-hidden /> The space
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7" amount={0.25}>
            {project.story.map((para, i) => (
              <p key={i} className="mb-5 max-w-xl text-[15px] leading-relaxed text-mute">
                {para}
              </p>
            ))}
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1} amount={0.25}>
            <ParallaxImage
              src={project.space[1]?.src ?? project.space[0].src}
              alt={project.space[1]?.alt ?? project.space[0].alt}
              className="aspect-[4/3]"
              sizes="(min-width: 768px) 42vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* CEILING DETAIL */}
      <section className="px-5 pb-16 md:px-10 md:pb-28" aria-label="Ceiling detail">
        <Reveal y={16}>
          <h2 className="flex items-center gap-4 text-[11px] font-medium tracking-[0.35em] text-mute uppercase">
            <span className="h-px w-10 bg-ink/25" aria-hidden /> Ceiling detail
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
          {project.details.map((d, i) => (
            <Reveal key={d.label + i} delay={i * 0.08} amount={0.25}>
              <ParallaxImage src={d.src} alt={d.alt} className="aspect-[16/11]" sizes="(min-width: 768px) 50vw, 100vw" />
              <p className="mt-4 flex items-center justify-between text-[10px] font-semibold tracking-[0.3em] uppercase">
                {d.label}
                <span className="text-mute">{String(i + 1).padStart(2, "0")}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      {project.beforeAfter && (
        <section className="pb-16 md:pb-28" aria-label="Before and after">
          <div className="px-5 md:px-10">
            <Reveal y={16}>
              <h2 className="mb-8 flex items-center gap-4 text-[11px] font-medium tracking-[0.35em] text-mute uppercase">
                <span className="h-px w-10 bg-ink/25" aria-hidden /> Structure to finish
              </h2>
            </Reveal>
          </div>
          <Reveal amount={0.15}>
            <BeforeAfterSlider
              before="/images/before.jpg"
              after="/images/after.jpg"
              beforeAlt="Bare structure before ceiling work"
              afterAlt="Finished ceiling after completion"
              className="h-[60vh] min-h-[400px] w-full md:h-[78vh]"
            />
          </Reveal>
        </section>
      )}

      {/* THE RESULT */}
      <section className="px-5 pb-20 md:px-10 md:pb-32" aria-label="The result">
        <Reveal y={16}>
          <h2 className="mb-8 flex items-center gap-4 text-[11px] font-medium tracking-[0.35em] text-mute uppercase">
            <span className="h-px w-10 bg-ink/25" aria-hidden /> The result
          </h2>
        </Reveal>
        <Reveal amount={0.2}>
          <ParallaxImage
            src={project.result.src}
            alt={project.result.alt}
            className="aspect-[4/3] md:aspect-[21/10]"
            sizes="(min-width: 768px) 100vw, 100vw"
            strength={0.5}
          />
        </Reveal>
      </section>

      {/* next project */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="view"
        className="group block border-t border-line px-5 py-16 md:px-10 md:py-24"
      >
        <p className="text-[10px] font-medium tracking-[0.4em] text-mute uppercase">Next project</p>
        <div className="mt-4 flex items-center justify-between gap-6">
          <p className="font-serif text-[clamp(2.2rem,6vw,5.5rem)] leading-none tracking-tight uppercase transition-colors duration-500 group-hover:text-bronze">
            {next.title}
          </p>
          <span className="shrink-0 rounded-full border border-ink/20 p-4 transition-all duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ivory md:p-6">
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1 md:size-7" strokeWidth={1.25} aria-hidden />
          </span>
        </div>
      </Link>

      <CTABanner lines={["Shape your", "own ceiling."]} copy="Share your space and requirements — we'll respond with a considered approach." />
    </>
  );
}
