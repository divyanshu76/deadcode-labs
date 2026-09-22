import { FounderSection } from "@/components/sections/FounderSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <FounderSection />
      <WhyUsSection />
      <ProcessSection />
    </div>
  );
}
