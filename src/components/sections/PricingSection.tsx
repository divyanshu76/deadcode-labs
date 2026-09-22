"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Launch",
    tagline: "Early-stage brands & MVPs",
    price: "Starting from ₹XX,XXX",
    inclusions: [
      "Bespoke Design (No templates)",
      "Next.js High-Performance Build",
      "Full Responsive Optimization",
      "Core SEO & Speed Tuning",
    ],
    timeline: "2–3 Weeks Delivery",
    highlighted: false,
    cta: "Inquire for Launch",
  },
  {
    name: "Growth",
    tagline: "Scaling brands & e-commerce",
    price: "Starting from ₹XX,XXX",
    inclusions: [
      "Custom Design System & UX",
      "Full-stack App or Headless Store",
      "Interactive Animations & Motion",
      "CRM & Analytics Integration",
    ],
    timeline: "4–6 Weeks Delivery",
    highlighted: true,
    cta: "Discuss Growth Scope",
  },
  {
    name: "Product",
    tagline: "Custom SaaS & complex systems",
    price: "Custom Scope",
    inclusions: [
      "Complete Architecture & APIs",
      "Database & Auth Infrastructure",
      "AI & Automated Workflows",
      "Ongoing Engineering Partnership",
    ],
    timeline: "Tailored Roadmap",
    highlighted: false,
    cta: "Schedule Architecture Call",
  },
];

export function PricingSection() {
  const [activeSnapIndex, setActiveSnapIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = e.currentTarget.offsetWidth * 0.8;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSnapIndex(Math.min(Math.max(index, 0), packages.length - 1));
  };

  return (
    <section id="pricing" className="py-16 md:py-28 bg-background border-t border-border overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary font-semibold block mb-3">
              ENGAGEMENT MODELS
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
              Clear frameworks. <br />
              <span className="italic font-normal text-accent font-display">No</span> guesswork.
            </h2>
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              Transparent, fixed-scope sprints and ongoing advisory. Every tier delivers production-ready engineering with zero bloat.
            </p>
          </motion.div>
        </div>

        {/* DESKTOP 3-COLUMN GRID (>= 1024px) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "relative p-8 rounded-2xl flex flex-col justify-between border transition-all duration-300",
                pkg.highlighted
                  ? "bg-surface border-accent/40 shadow-[0_12px_36px_rgba(117,96,122,0.08)] ring-1 ring-accent/30"
                  : "bg-surface/70 border-border/80 hover:border-border"
              )}
            >
              {pkg.highlighted && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-mono tracking-wider uppercase font-semibold self-start mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs font-mono text-secondary mb-4">
                  {pkg.tagline}
                </p>
                <div className="font-mono text-xl font-bold text-foreground pb-5 mb-5 border-b border-border/60">
                  {pkg.price}
                </div>

                <div className="space-y-3 mb-6">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-secondary font-semibold block">
                    Key Inclusions
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start text-[14px] text-secondary">
                        <span className="shrink-0 mr-2.5 mt-0.5 text-accent font-medium">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <span className="text-xs font-mono text-secondary block mb-3">
                  Est: {pkg.timeline}
                </span>
                <Button
                  variant={pkg.highlighted ? "default" : "outline"}
                  className={cn(
                    "w-full h-11 text-sm font-medium",
                    pkg.highlighted
                      ? "bg-foreground text-background hover:bg-charcoal"
                      : "border-border hover:bg-muted text-foreground"
                  )}
                  asChild
                >
                  <a href="/start-a-project">
                    {pkg.cta}
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE HORIZONTAL SNAP CAROUSEL (< 1024px) */}
        <div className="block lg:hidden">
          <div
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 px-4 -mx-4 scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={cn(
                  "w-[82vw] max-w-[310px] snap-center shrink-0 flex flex-col justify-between p-6 rounded-2xl border transition-all",
                  pkg.highlighted
                    ? "bg-surface border-accent/40 shadow-lg ring-1 ring-accent/30"
                    : "bg-surface border-border/80"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {pkg.name}
                    </h3>
                    {pkg.highlighted && (
                      <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-mono tracking-wider uppercase font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-secondary mb-3">
                    {pkg.tagline}
                  </p>
                  <div className="font-mono text-lg font-bold text-foreground pb-3 mb-4 border-b border-border/60">
                    {pkg.price}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start text-[13px] text-secondary">
                        <span className="shrink-0 mr-2 text-accent font-medium">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-border/50">
                  <span className="text-[11px] font-mono text-secondary block mb-2.5">
                    {pkg.timeline}
                  </span>
                  <Button
                    variant={pkg.highlighted ? "default" : "outline"}
                    className={cn(
                      "w-full h-10 text-xs font-medium",
                      pkg.highlighted
                        ? "bg-foreground text-background"
                        : "border-border text-foreground"
                    )}
                    asChild
                  >
                    <a href="/start-a-project">
                      {pkg.cta}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center items-center gap-1.5 mt-2">
            {packages.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeSnapIndex === i ? "w-6 bg-accent" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
          <p className="text-center text-[11px] font-mono text-secondary/70 mt-2">
            Swipe horizontally to compare engagement models
          </p>
        </div>
      </Container>
    </section>
  );
}
