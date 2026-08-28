export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

export const STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "CONSULT",
    desc: "Understand the space and what you want from it — ideas, references, budget direction.",
    image: "/images/hero.jpg",
    alt: "Warm finished living room used as a design reference",
  },
  {
    n: "02",
    title: "MEASURE",
    desc: "Assess dimensions, levels and site conditions so the design fits the room exactly.",
    image: "/images/before.jpg",
    alt: "Bare room structure before ceiling work begins",
  },
  {
    n: "03",
    title: "PLAN",
    desc: "Develop the ceiling approach around the space, its proportions and the lighting plan.",
    image: "/images/intro.jpg",
    alt: "Layered ceiling planes showing design planning",
  },
  {
    n: "04",
    title: "INSTALL",
    desc: "Execute the work with constant attention to alignment, structure and clean junctions.",
    image: "/images/craft-line.jpg",
    alt: "Close-up of precise ceiling installation detail",
  },
  {
    n: "05",
    title: "FINISH",
    desc: "Complete the detailing, integrate the lighting and inspect every edge before handover.",
    image: "/images/after.jpg",
    alt: "Finished ceiling glowing in the completed room",
  },
];
