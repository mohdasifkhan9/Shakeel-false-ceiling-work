import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a stable, specific content update date for core pages
  const lastSiteUpdate = new Date("2026-08-28");

  // Core static pages
  const staticRoutes = ["", "/work", "/services", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: lastSiteUpdate,
  }));

  // Dynamic services (filtered by published state and using their exact updatedAt value)
  const serviceRoutes = services
    .filter((s) => s.published === true)
    .map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: new Date(s.updatedAt),
    }));

  // Dynamic project pages (filtered by published state and using their exact updatedAt value)
  const projectRoutes = projects
    .filter((p) => p.published === true)
    .map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: new Date(p.updatedAt),
    }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
