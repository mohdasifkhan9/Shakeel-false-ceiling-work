export interface Service {
  slug: string;
  index: string;
  title: string;
  short: string;
  overview: string;
  image: string;
  imageAlt: string;
  applications: string[];
}

/** The definitive service list confirmed by the business. */
export const services: Service[] = [
  {
    slug: "false-ceiling",
    index: "01",
    title: "FALSE CEILING WORK",
    short: "Modern ceiling structures designed around the character of the space.",
    overview:
      "Complete false ceiling work — from clean single-plane drops to layered, multi-level structures. Every ceiling is planned around how the room is used, where light should fall, and what the architecture below it asks for.",
    image: "/images/projects/residence-1.jpg",
    imageAlt: "Layered false ceiling with cove lighting in a contemporary living room",
    applications: ["Living rooms", "Bedrooms", "Foyers & corridors", "Reception areas"],
  },
  {
    slug: "gypsum-false-ceiling",
    index: "02",
    title: "GYPSUM FALSE CEILING",
    short: "Clean, contemporary ceiling solutions for residential and commercial interiors.",
    overview:
      "Gypsum board ceilings allow crisp planes, sharp reveals and smooth paint-ready finishes. Suited to full-room coverage as well as peripheral designs, tray profiles and shadow-gap details.",
    image: "/images/craft-line.jpg",
    imageAlt: "Close-up of a crisp gypsum ceiling edge with a shadow-gap reveal",
    applications: ["Full-room gypsum ceilings", "Peripheral & tray profiles", "Shadow-gap detailing", "Paint-ready finishing"],
  },
  {
    slug: "pop-ceiling",
    index: "03",
    title: "POP CEILING WORK",
    short: "Traditional and customized Plaster of Paris (POP) designs for premium finish.",
    overview:
      "POP ceiling solutions offer excellent design versatility, molding capacity, and high durability. Ideal for custom ceiling moldings, decorative cornices, and integrated modern designs.",
    image: "/images/intro.jpg",
    imageAlt: "Smooth Plaster of Paris ceiling mold with integrated accent lines",
    applications: ["Custom molded designs", "Decorative ceiling borders", "Premium home ceiling styles", "Durable interior coves"],
  },
  {
    slug: "cove-lighting",
    index: "04",
    title: "COVE LIGHTING INTEGRATION",
    short: "Ceiling designs planned around ambient, recessed and architectural lighting.",
    overview:
      "A ceiling and its lighting are one visual system. Cove channels, recessed spotlights and linear profiles are planned into the structure from the start — so light feels built in, not added on.",
    image: "/images/craft-light.jpg",
    imageAlt: "Warm LED cove lighting channel recessed into a ceiling plane",
    applications: ["Cove & ambient lighting", "Recessed spotlights", "Linear profile channels", "Feature ceiling lighting"],
  },
  {
    slug: "residential",
    index: "05",
    title: "RESIDENTIAL CEILING WORK",
    short: "Living rooms, bedrooms, dining spaces and other home interiors.",
    overview:
      "Ceiling work for homes of every scale — a single bedroom refresh or a full residence. The focus stays the same: quiet, refined ceilings that make each room feel considered.",
    image: "/images/projects/residence-2.jpg",
    imageAlt: "Warm minimal bedroom with a softly lit floating ceiling slab",
    applications: ["Living & family rooms", "Bedrooms", "Dining spaces", "Corridors & foyers"],
  },
  {
    slug: "commercial",
    index: "06",
    title: "COMMERCIAL CEILING WORK",
    short: "Ceiling solutions for offices, retail spaces and commercial interiors.",
    overview:
      "Structured ceiling work for commercial interiors — where alignment, repetition and lighting rhythm carry the space. Planned to keep the floor below clear, professional and composed.",
    image: "/images/projects/commerce-1.jpg",
    imageAlt: "Office interior with linear recessed lighting across the ceiling",
    applications: ["Offices & workspaces", "Retail & showrooms", "Reception & lobbies", "Clinics & studios"],
  },
];
