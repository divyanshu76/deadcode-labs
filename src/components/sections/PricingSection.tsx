"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Launch",
    tagline: "Early-stage brands & MVPs",
    priceLabel: "Starting from",
    price: "₹15,999",
    microcopy: "Scope-based pricing · Clear deliverables",
    description: "A premium, conversion-focused digital presence for early-stage businesses and new brands.",
    inclusions: [
      "Bespoke UI/UX design",
      "Responsive website development",
      "Next.js high-performance build",
      "Core SEO setup",
      "Contact / lead integration",
      "Deployment support"
    ],
    timeline: "Est. 1–2 Weeks Delivery",
    highlighted: false,
    cta: "Inquire for Launch",
  },
  {
    name: "Growth",
    tagline: "Growing brands & e-commerce",
    priceLabel: "Starting from",
    price: "₹29,999",
    microcopy: "Scope-based pricing · Clear deliverables",
    description: "A more advanced digital experience for businesses ready to improve their online presence and customer journey.",
    inclusions: [
      "Custom UI/UX system",
      "Multi-page website or e-commerce build",
      "Interactive animations & motion",
      "CMS / CRM integration",
      "Analytics integration",
      "Performance optimization",
      "Deployment support"
    ],
    timeline: "Est. 2–4 Weeks Delivery",
    highlighted: true,
    cta: "Discuss Growth Scope",
  },
  {
    name: "Product",
    tagline: "Custom SaaS & complex systems",
    priceLabel: "Starting from",
    price: "₹59,999",
    microcopy: "Custom scope · Architecture-led pricing",
    description: "Custom-built digital products and applications for businesses that need more than a conventional website.",
    inclusions: [
      "Custom application architecture",
      "Frontend & backend development",
      "Database & authentication",
      "API integrations",
      "AI & automated workflows",
      "Custom dashboards",
      "Production deployment"
    ],
    timeline: "Est. Tailored Roadmap",
    highlighted: false,
    cta: "Schedule Architecture Call",
  },
];

export function PricingSection() {
  const [activeSnapIndex, setActiveSnapIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = e.currentTarget.offsetWidth * 0.86; // approx card width ratio
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSnapIndex(Math.min(Math.max(index, 0), packages.length - 1));
  };

  return (
    <section id="pricing" className="py-14 md:py-20 relative z-10 border-t border-white/50 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="chapter-label mb-5 md:mb-6">
              05 — ENGAGEMENT MODELS
            </span>
            <h2 className="font-display text-[length:clamp(40px,5.5vw,76px)] tracking-[-0.015em] text-charcoal leading-[1.02] mb-5">
              Clear frameworks. <br />
              <span className="italic text-silver-dark">No</span> guesswork.
            </h2>
            <p className="text-[14px] md:text-[15px] text-ink-soft leading-relaxed max-w-2xl mx-auto">
              Transparent, fixed-scope sprints and ongoing advisory. Every tier delivers production-ready engineering with zero bloat.
            </p>
          </motion.div>
        </div>

        {/* DESKTOP 3-COLUMN GRID (>= 1024px) */}
        <div className="hidden lg:flex justify-center max-w-[1220px] mx-auto gap-[28px] items-stretch">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
              className={cn(
                "relative flex-1 max-w-[380px] min-h-[640px] p-[30px] flex flex-col rounded-[24px] metal-edge",
                pkg.highlighted
                  ? "glass-dark signal-glow signal-edge -translate-y-1"
                  : "glass-panel"
              )}
            >
              {pkg.highlighted && (
                <div className="absolute top-[30px] right-[30px] inline-flex items-center gap-1.5 px-[10px] py-[6px] rounded-full bg-signal text-white shadow-[0_6px_16px_rgba(225,6,0,0.35)] text-[10px] font-mono tracking-wider uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  MOST POPULAR
                </div>
              )}

              <div className="flex-none">
                <h3 className="font-display text-[28px] font-bold text-charcoal mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[13px] font-mono text-ink-muted mb-[22px]">
                  {pkg.tagline}
                </p>
                
                <div>
                  <span className="block text-[16px] font-medium text-ink-soft leading-[1.3] mb-0.5 tracking-tight">
                    {pkg.priceLabel}
                  </span>
                  <span className="block font-mono text-[42px] leading-[1.1] font-bold text-charcoal tracking-tighter">
                    {pkg.price}
                  </span>
                </div>
                
                <div className="text-[12px] text-ink-muted font-mono mt-2">
                  {pkg.microcopy}
                </div>
                
                <div className="w-full h-px bg-linear-to-r from-silver via-silver/40 to-transparent my-[20px]" />
                
                <p className="text-[15px] text-ink-soft leading-[1.5] max-w-[300px]">
                  {pkg.description}
                </p>

                <div className="mt-[24px]">
                  <span className="text-[11px] font-mono tracking-[0.1em] uppercase text-ink-muted font-semibold block mb-3">
                    KEY INCLUSIONS
                  </span>
                  <ul className="space-y-[8px]">
                    <li className={cn("flex items-start text-[14px] font-medium leading-[1.45]", pkg.highlighted ? "text-silver-bright" : "text-signal")}>
                      <span className="shrink-0 mr-2 mt-[2px] font-bold text-[13px] text-signal">✦</span>
                      <span>{pkg.name === "Launch" ? "1-Year Domain Included*" : "1-Year .com / .in Domain Included*"}</span>
                    </li>
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start text-[14px] text-charcoal font-medium leading-[1.45]">
                        <span className="shrink-0 mr-2 mt-[2px] text-signal font-bold text-[13px]">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Flexible space to push CTA to the bottom */}
              <div className="flex-1 min-h-[24px]" />

              <div className="pt-[20px] border-t border-white/40 mt-auto">
                <span className="text-[11px] font-mono text-ink-muted block mb-3">
                  {pkg.timeline}
                </span>
                <Button
                  variant={pkg.highlighted ? "default" : "outline"}
                  className="w-full h-[48px] text-[13px] font-semibold group rounded-full"
                  asChild
                >
                  <a href="/start-a-project">
                    {pkg.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                  "relative w-[86vw] max-w-[340px] min-h-[480px] snap-center shrink-0 flex flex-col p-[22px] rounded-[24px] metal-edge",
                  pkg.highlighted
                    ? "glass-dark signal-glow signal-edge"
                    : "glass-panel"
                )}
              >
                {pkg.highlighted && (
                  <div className="absolute top-[22px] right-[22px] inline-flex items-center gap-1 px-[8px] py-[5px] rounded-full bg-signal text-white shadow-[0_6px_16px_rgba(225,6,0,0.35)] text-[9px] font-mono tracking-wider uppercase font-semibold">
                    <span className="w-1 h-1 rounded-full bg-white" />
                    MOST POPULAR
                  </div>
                )}

                <div className="flex-none">
                  <h3 className="font-display text-[24px] font-bold text-charcoal mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-[12px] font-mono text-ink-muted mb-[18px]">
                    {pkg.tagline}
                  </p>
                  
                  <div>
                    <span className="block text-[13px] font-medium text-ink-soft leading-[1.3] mb-0.5 tracking-tight">
                      {pkg.priceLabel}
                    </span>
                    <span className="block font-mono text-[34px] leading-[1.1] font-bold text-charcoal tracking-tighter whitespace-normal break-normal">
                      {pkg.price}
                    </span>
                  </div>
                  
                  <div className="text-[11px] text-ink-muted font-mono mt-2">
                    {pkg.microcopy}
                  </div>
                  
                  <div className="w-full h-px bg-linear-to-r from-silver via-silver/40 to-transparent my-[16px]" />
                  
                  <p className="text-[13px] text-ink-soft leading-[1.5] mb-[20px] max-w-[280px]">
                    {pkg.description}
                  </p>

                  <div>
                    <span className="text-[10px] font-mono tracking-[0.1em] uppercase text-ink-muted font-semibold block mb-2">
                      KEY INCLUSIONS
                    </span>
                    <ul className="space-y-[8px]">
                      <li className={cn("flex items-start text-[13px] font-medium leading-[1.45]", pkg.highlighted ? "text-silver-bright" : "text-signal")}>
                        <span className="shrink-0 mr-[6px] mt-[2px] font-bold text-[12px] text-signal">✦</span>
                        <span>{pkg.name === "Launch" ? "1-Year Domain Included*" : "1-Year .com / .in Domain Included*"}</span>
                      </li>
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start text-[13px] text-charcoal font-medium leading-[1.45]">
                          <span className="shrink-0 mr-[6px] mt-[2px] text-signal font-bold text-[12px]">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Flexible space to push CTA to the bottom */}
                <div className="flex-1 min-h-[20px]" />

                <div className="pt-[16px] border-t border-white/40 mt-auto">
                  <span className="text-[11px] font-mono text-ink-muted block mb-3">
                    {pkg.timeline}
                  </span>
                  <Button
                    variant={pkg.highlighted ? "default" : "outline"}
                    className="w-full h-[44px] text-[13px] font-semibold group rounded-full"
                    asChild
                  >
                    <a href="/start-a-project">
                      {pkg.cta}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
                  activeSnapIndex === i ? "w-6 bg-signal" : "w-1.5 bg-silver"
                )}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="text-center mt-12 md:mt-14">
          <p className="text-[11px] font-mono text-ink-muted/70 max-w-xl mx-auto px-4">
            *Standard domain registration included for 1 year. Growth & Product plans include standard .com / .in registration. Premium domains and renewals are billed separately.
          </p>
        </div>
      </Container>
    </section>
  );
}
