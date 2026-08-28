import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProjectCard({
  project,
  index,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      className={cn("group relative block overflow-hidden bg-stone", className)}
      aria-label={`${project.title} — ${project.category.toLowerCase()}`}
    >
      <Image
        src={project.hero.src}
        alt={project.hero.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />

      {/* hover veil */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden
      />

      {/* index + arrow */}
      {typeof index === "number" && (
        <span className="absolute top-4 left-5 text-[10px] font-medium tracking-[0.3em] text-ivory/75">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span className="absolute top-4 right-4 rounded-full border border-ivory/40 p-2 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
        <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
      </span>

      {/* meta */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-ivory md:p-6">
        <p className="mb-2 translate-y-2 text-[9px] font-medium tracking-[0.32em] text-ivory/70 uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {project.category} — {project.location}
        </p>
        <h3 className="translate-y-1 font-serif text-2xl leading-tight tracking-tight transition-transform duration-500 group-hover:translate-y-0 md:text-3xl">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
