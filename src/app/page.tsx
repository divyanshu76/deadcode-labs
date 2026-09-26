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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "DEADCODE LABS",
    "url": "https://deadcode.space",
    "logo": "https://deadcode.space/icon.svg",
    "description": "Premium digital product studio engineering bespoke web development, e-commerce storefronts, AI systems, and automation.",
    "sameAs": [
      "https://github.com/divyanshu76",
      "https://www.instagram.com/truly_divyanshu/",
      "https://www.linkedin.com/in/divyanshuverma09/"
    ],
    "founder": {
      "@type": "Person",
      "name": "Divyanshu Verma",
      "url": "https://github.com/divyanshu76"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
