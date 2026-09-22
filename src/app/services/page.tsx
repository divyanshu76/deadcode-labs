import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <ServicesSection />
      <TechnologySection />
    </div>
  );
}
