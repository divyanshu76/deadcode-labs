import { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description: "Explore our premium digital services including web development, e-commerce, AI systems, and custom web applications.",
  alternates: {
    canonical: "https://deadcode.space/services",
  },
  openGraph: {
    url: "https://deadcode.space/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <ServicesSection />
      <TechnologySection />
    </div>
  );
}
