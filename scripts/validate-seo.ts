import { projects } from "../src/data/projects";
import { services } from "../src/data/services";
import { site } from "../src/data/site";
import * as fs from "fs";
import * as path from "path";

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

function validateSeo(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log("=== SHAKEEL FALSE CEILING WORK - SEO VALIDATION SCRIPT ===");

  // 1. Verify Production URL Configuration
  console.log("\n1. Verifying Site Configuration...");
  if (!site.url.startsWith("https://")) {
    errors.push(`Site URL must start with HTTPS. Found: ${site.url}`);
  } else {
    console.log(`[✓] Canonical Domain matches production: ${site.url}`);
  }
  if (site.url.includes("localhost") || site.url.includes("vercel.app")) {
    errors.push(`Site URL must not point to localhost or Vercel preview hosts: ${site.url}`);
  }

  // 2. Validate NAP Details
  console.log("\n2. Verifying Business NAP Credentials...");
  const expectedPhone = "+91 99598 67685";
  const expectedAddress = "Plot No: 5, Near Flyover, New Hafeezpet, Aditya Nagar, Hafeezpet, Hyderabad, Telangana 500049";

  if (site.phone !== expectedPhone) {
    errors.push(`NAP inconsistency: Phone number must be ${expectedPhone}. Found: ${site.phone}`);
  } else {
    console.log(`[✓] NAP phone verified: ${site.phone}`);
  }

  if (site.address !== expectedAddress) {
    errors.push(`NAP inconsistency: Address must match the verified address. Found: ${site.address}`);
  } else {
    console.log(`[✓] NAP address verified: ${site.address}`);
  }

  // 3. Simulate and Validate XML Sitemap URLs
  console.log("\n3. Simulating and Validating XML Sitemap...");
  const sitemapUrls = new Set<string>();
  const staticPaths = ["", "/work", "/services", "/about", "/contact"];

  // Static route validation
  staticPaths.forEach((route) => {
    const fullUrl = `${site.url}${route}`;
    if (sitemapUrls.has(fullUrl)) {
      errors.push(`Duplicate sitemap URL: ${fullUrl}`);
    }
    sitemapUrls.add(fullUrl);
  });

  // Services route validation
  services.forEach((s) => {
    const fullUrl = `${site.url}/services/${s.slug}`;
    if (s.published !== true) {
      warnings.push(`Service "${s.title}" is not marked as published. Will be skipped in sitemap.`);
      return;
    }
    if (sitemapUrls.has(fullUrl)) {
      errors.push(`Duplicate sitemap URL: ${fullUrl}`);
    }
    sitemapUrls.add(fullUrl);

    // Validate service fields
    if (!s.updatedAt || isNaN(Date.parse(s.updatedAt))) {
      errors.push(`Service "${s.title}" is missing a valid updatedAt date: ${s.updatedAt}`);
    }
  });

  // Projects route validation
  projects.forEach((p) => {
    const fullUrl = `${site.url}/work/${p.slug}`;
    if (p.published !== true) {
      warnings.push(`Project "${p.title}" is not marked as published. Will be skipped in sitemap.`);
      return;
    }
    if (sitemapUrls.has(fullUrl)) {
      errors.push(`Duplicate sitemap URL: ${fullUrl}`);
    }
    sitemapUrls.add(fullUrl);

    // Validate project fields
    if (!p.updatedAt || isNaN(Date.parse(p.updatedAt))) {
      errors.push(`Project "${p.title}" is missing a valid updatedAt date: ${p.updatedAt}`);
    }
  });

  console.log(`[✓] Generated ${sitemapUrls.size} canonical sitemap entries.`);

  // Sitemap URL safety checks
  sitemapUrls.forEach((url) => {
    if (url.includes("localhost") || url.includes("vercel.app")) {
      errors.push(`Sitemap URL contains invalid host: ${url}`);
    }
    if (!url.startsWith("https://")) {
      errors.push(`Sitemap URL does not use HTTPS: ${url}`);
    }
    if (url.endsWith("/") && url !== `${site.url}/`) {
      errors.push(`Trailing slash inconsistency in sitemap: ${url}`);
    }
  });

  // 4. File-level Metadata Audits
  console.log("\n4. Checking Page Metadata configurations...");
  const pagesToCheck = [
    { name: "layout.tsx", path: "../src/app/layout.tsx", hasVerification: true },
    { name: "about/page.tsx", path: "../src/app/about/page.tsx" },
    { name: "services/page.tsx", path: "../src/app/services/page.tsx" },
    { name: "work/page.tsx", path: "../src/app/work/page.tsx" },
    { name: "contact/page.tsx", path: "../src/app/contact/page.tsx" },
  ];

  pagesToCheck.forEach((page) => {
    const filePath = path.join(__dirname, page.path);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing page file: ${page.path}`);
      return;
    }
    const content = fs.readFileSync(filePath, "utf-8");

    // Check H1 lines layout
    if (page.name !== "layout.tsx" && !content.includes("lines={")) {
      warnings.push(`Page "${page.name}" might be missing PageHero / lines array definition.`);
    }

    // Check for google-site-verification in layout.tsx
    if (page.hasVerification) {
      if (!content.includes("google:") && !content.includes("google-site-verification")) {
        errors.push("layout.tsx: Missing google-site-verification key in metadata config.");
      } else {
        console.log("[✓] layout.tsx verified: Contains Google verification tag.");
      }
    }
  });

  console.log("\n=== VALIDATION SUMMARY ===");
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\nErrors Details:");
    errors.forEach((e) => console.log(`[x] ${e}`));
  }
  if (warnings.length > 0) {
    console.log("\nWarnings Details:");
    warnings.forEach((w) => console.log(`[!] ${w}`));
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

const result = validateSeo();
if (!result.passed) {
  process.exit(1);
} else {
  console.log("\n[✓] SEO Validation completed successfully!");
}
