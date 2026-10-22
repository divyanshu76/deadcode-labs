import { pageMetadata } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";

export const metadata = pageMetadata({
  path: "/services",
  title: "Services & Capabilities",
  description:
    "Explore our premium digital services including web development, e-commerce, AI systems, and custom web applications.",
});

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <ServicesSection headingLevel="h1" />
      <TechnologySection />
    </div>
  );
}
