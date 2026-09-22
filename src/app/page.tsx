import { Hero } from "@/components/sections/Hero";
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

export default function Home() {
  return (
    <>
      <Hero />
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
