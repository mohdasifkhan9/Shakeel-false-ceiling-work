"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { filters, projects, type FilterKey } from "@/data/projects";
import { EASE } from "@/lib/anim";
import { cn } from "@/lib/utils";

export function WorkGallery() {
  const [key, setKey] = useState<FilterKey>("all");
  const visible = projects.filter(
    (p) => key === "all" || p.categories.includes(key),
  );

  return (
    <div className="px-5 pb-24 md:px-10 md:pb-36">
      {/* filters */}
      <div
        className="flex flex-wrap items-center gap-2 border-t border-line pt-8"
        role="tablist"
        aria-label="Filter projects"
      >
        {filters.map((f) => {
          const active = key === f.key;
          const count =
            f.key === "all"
              ? projects.length
              : projects.filter((p) => p.categories.includes(f.key)).length;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={active}
              onClick={() => setKey(f.key)}
              className={cn(
                "relative px-4 py-2.5 text-[10px] font-semibold tracking-[0.25em] transition-colors duration-400",
                active ? "text-ivory" : "text-mute hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-ink"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
              <span className="relative">
                {f.label}
                <sup className="ml-1.5 text-[8px] opacity-70">{String(count).padStart(2, "0")}</sup>
              </span>
            </button>
          );
        })}
      </div>

      {/* gallery — asymmetric, animating with filter changes */}
      <motion.div layout className="mt-12 grid gap-5 md:grid-cols-12 md:gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
              className={cn(
                i % 3 === 0
                  ? "md:col-span-7"
                  : i % 3 === 1
                    ? "md:col-span-5"
                    : "md:col-span-6 md:col-start-4",
              )}
            >
              <ProjectCard
                project={p}
                index={i}
                sizes="(min-width: 768px) 55vw, 100vw"
                className={cn(i % 3 === 1 ? "aspect-[4/3] md:aspect-[3/3.4]" : "aspect-[4/3]")}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-14 text-center text-[10px] tracking-[0.3em] text-mute uppercase">
        Representative showcases — client project photography published as work completes
      </p>
    </div>
  );
}
