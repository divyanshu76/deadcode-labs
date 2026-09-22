"use client";

import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { Container } from "@/components/ui/Container";

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <Container>
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Our Work.
          </h1>
          <p className="text-lg text-secondary">
            A selection of digital products, websites, and systems we've engineered.
          </p>
        </div>
      </Container>
      <FeaturedWorkSection />
    </div>
  );
}
