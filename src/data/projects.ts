/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECT SHOWCASE DATA
 *  These entries are REPRESENTATIVE SHOWCASES — the imagery and
 *  descriptions demonstrate ceiling styles & design directions,
 *  and are not presented as completed client projects.
 *  Replace entries with real project photography, names and
 *  details as they become available.
 * ─────────────────────────────────────────────────────────────
 */

export type FilterKey =
  | "all"
  | "residential"
  | "commercial"
  | "living"
  | "bedroom"
  | "lighting";

export const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "residential", label: "RESIDENTIAL" },
  { key: "commercial", label: "COMMERCIAL" },
  { key: "living", label: "LIVING" },
  { key: "bedroom", label: "BEDROOM" },
  { key: "lighting", label: "LIGHTING" },
];

export interface ProjectDetailShot {
  src: string;
  alt: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  categories: FilterKey[];
  location: string;
  scope: string[];
  summary: string;
  story: string[];
  hero: { src: string; alt: string };
  space: { src: string; alt: string }[];
  details: ProjectDetailShot[];
  result: { src: string; alt: string };
  beforeAfter?: boolean;
  representative: true;
}

export const projects: Project[] = [
  {
    slug: "contemporary-residence",
    title: "CONTEMPORARY RESIDENCE",
    category: "RESIDENTIAL — LIVING",
    categories: ["residential", "living"],
    location: "Hyderabad",
    scope: ["Layered false ceiling", "Cove lighting", "Recessed spots"],
    summary:
      "A layered tray ceiling that holds the living room together — warm cove light tracing the perimeter, recessed spots marking the rhythm of the space below.",
    story: [
      "The living room is where the ceiling does its quietest, most important work. Here, a layered tray profile drops the plane just enough to hide a continuous cove channel, washing the upper surface with warm, indirect light.",
      "Shadow gaps between layers keep the geometry crisp, so the ceiling reads as a set of floating planes rather than a single heavy slab.",
    ],
    hero: {
      src: "/images/projects/residence-1.jpg",
      alt: "Layered tray false ceiling with warm cove lighting in a living room",
    },
    space: [
      {
        src: "/images/projects/residence-1.jpg",
        alt: "Wide view of the living room ceiling composition",
      },
      {
        src: "/images/intro.jpg",
        alt: "Floating ceiling planes with a warm edge glow",
      },
    ],
    details: [
      {
        src: "/images/craft-light.jpg",
        alt: "Cove channel with warm LED light",
        label: "INTEGRATED LIGHTING",
      },
      {
        src: "/images/craft-line.jpg",
        alt: "Sharp gypsum edge with shadow gap",
        label: "CLEAN EDGES",
      },
    ],
    result: {
      src: "/images/after.jpg",
      alt: "Finished living room with warm layered ceiling in the evening",
    },
    representative: true,
  },
  {
    slug: "warm-minimal-bedroom",
    title: "WARM MINIMAL INTERIOR",
    category: "RESIDENTIAL — BEDROOM",
    categories: ["residential", "bedroom"],
    location: "Hyderabad",
    scope: ["Floating ceiling slab", "Hidden cove detail", "Soft ambient light"],
    summary:
      "A single floating slab above the bed, light tucked out of sight — a bedroom ceiling designed to disappear into calm.",
    story: [
      "Bedrooms ask for restraint. One clean ceiling plane, a concealed light source behind the headboard line, and no visual noise.",
      "The cove glow does the work of a bedside lamp at the architectural scale — soft, even, and dimmable into the evening.",
    ],
    hero: {
      src: "/images/projects/residence-2.jpg",
      alt: "Minimal bedroom with floating ceiling slab and hidden warm lighting",
    },
    space: [
      {
        src: "/images/projects/residence-2.jpg",
        alt: "Bedroom ceiling plane with soft cove light",
      },
      {
        src: "/images/after.jpg",
        alt: "Warm interior atmosphere finished with layered ceiling light",
      },
    ],
    details: [
      {
        src: "/images/craft-light.jpg",
        alt: "Hidden LED channel detail",
        label: "CONCEALED LIGHT",
      },
      {
        src: "/images/craft-line.jpg",
        alt: "Clean ceiling corner junction",
        label: "PRECISE LINES",
      },
    ],
    result: {
      src: "/images/projects/residence-2.jpg",
      alt: "Completed bedroom ceiling in warm evening light",
    },
    representative: true,
  },
  {
    slug: "linear-office",
    title: "MODERN LIVING SPACE",
    category: "COMMERCIAL — WORKSPACE",
    categories: ["commercial"],
    location: "Hyderabad",
    scope: ["Geometric gypsum ceiling", "Linear lighting channels", "Grid alignment"],
    summary:
      "A commercial ceiling built on rhythm — linear light channels and precise gypsum planes setting the tempo for the floor below.",
    story: [
      "In a workspace, the ceiling is infrastructure and atmosphere at once. Light channels run in long, uninterrupted lines; gypsum planes resolve around services without breaking the pattern.",
      "Everything aligns — the grid, the light, the floor. That alignment is the finish.",
    ],
    hero: {
      src: "/images/projects/commerce-1.jpg",
      alt: "Office ceiling with long linear recessed lighting channels",
    },
    space: [
      {
        src: "/images/projects/commerce-1.jpg",
        alt: "Perspective view of the linear office ceiling",
      },
      {
        src: "/images/intro.jpg",
        alt: "Floating ceiling plane with edge light in a minimal interior",
      },
    ],
    details: [
      {
        src: "/images/craft-line.jpg",
        alt: "Straight ceiling edge detail",
        label: "GRID PRECISION",
      },
      {
        src: "/images/craft-light.jpg",
        alt: "Recessed lighting channel glow",
        label: "LINEAR LIGHT",
      },
    ],
    result: {
      src: "/images/projects/commerce-1.jpg",
      alt: "Completed commercial ceiling with linear lighting",
    },
    representative: true,
  },
  {
    slug: "dining-atelier",
    title: "DINING ATELIER",
    category: "RESIDENTIAL — DINING · LIGHTING",
    categories: ["residential", "lighting"],
    location: "Hyderabad",
    scope: ["Circular ceiling feature", "Cove ring lighting", "Focused downlights"],
    summary:
      "A circular recess drawn above the dining table — one gesture that centres the room and gathers the light into a ring.",
    story: [
      "Some rooms need a single strong move. A circular ceiling feature, lit around its edge, turns the dining table into the anchor of the whole space.",
      "Curved gypsum work demands patience in the framing and the finish — the curve only reads well when the edge is perfect.",
    ],
    hero: {
      src: "/images/projects/dining-1.jpg",
      alt: "Circular ceiling feature with a warm cove-lit ring above a dining table",
    },
    space: [
      {
        src: "/images/projects/dining-1.jpg",
        alt: "Dining space centred under the circular ceiling feature",
      },
      {
        src: "/images/projects/residence-1.jpg",
        alt: "Connected living space with layered ceiling",
      },
    ],
    details: [
      {
        src: "/images/craft-light.jpg",
        alt: "Cove ring lighting detail",
        label: "CURVED COVE",
      },
      {
        src: "/images/craft-line.jpg",
        alt: "Finished ceiling edge",
        label: "REFINED FINISH",
      },
    ],
    result: {
      src: "/images/projects/dining-1.jpg",
      alt: "Completed dining ceiling feature in the evening",
    },
    representative: true,
  },
  {
    slug: "the-fifth-wall",
    title: "THE FIFTH WALL",
    category: "LIGHTING — LIVING",
    categories: ["lighting", "living", "residential"],
    location: "Hyderabad",
    scope: ["Sculpted ceiling planes", "Perimeter cove", "Evening ambience"],
    summary:
      "Ceiling as the fifth wall of the room — sculpted planes whose only decoration is the way they hold and release light.",
    story: [
      "Look up: the ceiling is the largest uninterrupted surface in most rooms. Treating it as a designed surface — not just a lid — changes how everything below it feels.",
      "Here the composition is built from depth and shadow: one floating plane, one lit edge, one dark reveal.",
    ],
    hero: {
      src: "/images/intro.jpg",
      alt: "Sculpted floating ceiling plane with warm perimeter light",
    },
    space: [
      {
        src: "/images/intro.jpg",
        alt: "Close view of the floating plane and its lit edge",
      },
      {
        src: "/images/projects/residence-1.jpg",
        alt: "Full room context of the layered ceiling",
      },
    ],
    details: [
      {
        src: "/images/craft-line.jpg",
        alt: "Shadow-gap between planes",
        label: "SHADOW GAP",
      },
      {
        src: "/images/craft-light.jpg",
        alt: "Warm cove glow on plaster",
        label: "AMBIENT COVE",
      },
    ],
    result: {
      src: "/images/intro.jpg",
      alt: "The finished fifth wall in warm ambient light",
    },
    representative: true,
  },
  {
    slug: "form-and-finish",
    title: "FORM & FINISH",
    category: "RESIDENTIAL — LIVING · LIGHTING",
    categories: ["residential", "living", "lighting"],
    location: "Hyderabad",
    scope: ["Full-room ceiling", "Structure-to-finish", "Layered lighting"],
    summary:
      "The full journey in one room — from bare concrete slab and hanging wires to a finished, glowing ceiling plane.",
    story: [
      "Every ceiling begins as structure: slab, conduit, level lines. The craft is in the transformation — framing true, boarding clean, finishing invisible.",
      "This showcase follows that arc, because the difference between a ceiling and a good ceiling is decided long before the lights turn on.",
    ],
    hero: {
      src: "/images/after.jpg",
      alt: "Finished room with warm layered false ceiling",
    },
    space: [
      {
        src: "/images/after.jpg",
        alt: "Completed room, evening atmosphere",
      },
      {
        src: "/images/projects/residence-1.jpg",
        alt: "Living area with layered ceiling detail",
      },
    ],
    details: [
      {
        src: "/images/craft-line.jpg",
        alt: "Finished gypsum junction",
        label: "CLEAN EDGES",
      },
      {
        src: "/images/craft-light.jpg",
        alt: "Integrated cove lighting",
        label: "INTEGRATED LIGHTING",
      },
    ],
    result: {
      src: "/images/after.jpg",
      alt: "The finished ceiling in warm evening light",
    },
    beforeAfter: true,
    representative: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
