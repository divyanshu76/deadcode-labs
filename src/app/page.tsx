import { Hero } from "@/components/sections/Hero";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { UdyamTrustSection } from "@/components/sections/UdyamTrustSection";
import { TrustSlider } from "@/components/sections/TrustSlider";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { SITE_DESCRIPTION, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "DEADCODE LABS — Digital Products, Web Development & AI Systems",
  description: SITE_DESCRIPTION,
});

export default function Home() {
  return (
    <>
      <Hero />
      <PhilosophySection />
      <UdyamTrustSection />
      <TrustSlider />
      <ResultsSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <PricingSection />
      <ProjectEstimator />
      <ProcessSection />
      <FounderSection />
      <TechnologySection />
      <WhyUsSection />
      <FinalCTASection />
    </>
  );
}
