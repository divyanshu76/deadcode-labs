import { Metadata } from "next";
import { FounderSection } from "@/components/sections/FounderSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about DEADCODE LABS and our founder Divyanshu Verma. We are a premium digital product studio building bespoke web applications and AI systems.",
  alternates: {
    canonical: "https://deadcode.space/about",
  },
  openGraph: {
    url: "https://deadcode.space/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <FounderSection />
      <WhyUsSection />
      <ProcessSection />
    </div>
  );
}
