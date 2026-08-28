import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ServicesHome } from "@/components/sections/ServicesHome";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesHome />
      <FeaturedWork />
      <BeforeAfter />
      <Craftsmanship />
      <Process />
      <Reviews />
      <AboutPreview />
      <LocationSection />
      <FinalCTA />
    </>
  );
}
