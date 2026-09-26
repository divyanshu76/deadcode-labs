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
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#927E6E] font-semibold block mb-3">
              ENGAGEMENT MODELS
            </span>
            <h2 className="font-display text-[32px] md:text-[44px] font-bold tracking-tight text-[#3B2A21] leading-[1.1] mb-4">
              Clear frameworks. <br />
              <span className="italic font-normal text-[#C96F3D] font-display">No</span> guesswork.
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6D5A4B] leading-relaxed max-w-2xl mx-auto">
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
                "relative flex-1 max-w-[380px] min-h-[640px] p-[30px] flex flex-col transition-all duration-300 shadow-xl rounded-[24px]",
                pkg.highlighted
                  ? "glass-elevated border-[#C96F3D]/30 ring-1 ring-[#C96F3D]/20 shadow-[0_20px_60px_rgba(201,111,61,0.12)] -translate-y-1"
                  : "glass-panel"
              )}
            >
              {pkg.highlighted && (
                <div className="absolute top-[30px] right-[30px] inline-flex items-center gap-1.5 px-[10px] py-[6px] rounded-full bg-[#C96F3D]/10 text-[#C96F3D] text-[10px] font-mono tracking-wider uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C96F3D]" />
                  MOST POPULAR
                </div>
              )}

              <div className="flex-none">
                <h3 className="font-display text-[28px] font-bold text-[#3B2A21] mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[13px] font-mono text-[#927E6E] mb-[22px]">
                  {pkg.tagline}
                </p>
                
                <div>
                  <span className="block text-[16px] font-medium text-[#6D5A4B] leading-[1.3] mb-0.5 tracking-tight">
                    {pkg.priceLabel}
                  </span>
                  <span className="block font-mono text-[42px] leading-[1.1] font-bold text-[#3B2A21] tracking-tighter">
                    {pkg.price}
                  </span>
                </div>
                
                <div className="text-[12px] text-[#927E6E] font-mono mt-2">
                  {pkg.microcopy}
                </div>
                
                <div className="w-full h-px bg-white/40 my-[20px]" />
                
                <p className="text-[15px] text-[#6D5A4B] leading-[1.5] max-w-[300px]">
                  {pkg.description}
                </p>

                <div className="mt-[24px]">
                  <span className="text-[11px] font-mono tracking-[0.1em] uppercase text-[#927E6E] font-semibold block mb-3">
                    KEY INCLUSIONS
                  </span>
                  <ul className="space-y-[8px]">
                    <li className="flex items-start text-[14px] text-[#C96F3D] font-medium leading-[1.45]">
                      <span className="shrink-0 mr-2 mt-[2px] font-bold text-[13px]">✦</span>
                      <span>{pkg.name === "Launch" ? "1-Year Domain Included*" : "1-Year .com / .in Domain Included*"}</span>
                    </li>
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start text-[14px] text-[#3B2A21] font-medium leading-[1.45]">
                        <span className="shrink-0 mr-2 mt-[2px] text-[#C96F3D] font-bold text-[13px]">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Flexible space to push CTA to the bottom */}
              <div className="flex-1 min-h-[24px]" />

              <div className="pt-[20px] border-t border-white/40 mt-auto">
                <span className="text-[11px] font-mono text-[#927E6E] block mb-3">
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
                  "w-[86vw] max-w-[340px] min-h-[480px] snap-center shrink-0 flex flex-col p-[22px] transition-all rounded-[24px]",
                  pkg.highlighted
                    ? "glass-elevated border-[#C96F3D]/30 ring-1 ring-[#C96F3D]/20 shadow-[0_20px_50px_rgba(201,111,61,0.12)]"
                    : "glass-panel"
                )}
              >
                {pkg.highlighted && (
                  <div className="absolute top-[22px] right-[22px] inline-flex items-center gap-1 px-[8px] py-[5px] rounded-full bg-[#C96F3D]/10 text-[#C96F3D] text-[9px] font-mono tracking-wider uppercase font-semibold">
                    <span className="w-1 h-1 rounded-full bg-[#C96F3D]" />
                    MOST POPULAR
                  </div>
                )}

                <div className="flex-none">
                  <h3 className="font-display text-[24px] font-bold text-[#3B2A21] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-[12px] font-mono text-[#927E6E] mb-[18px]">
                    {pkg.tagline}
                  </p>
                  
                  <div>
                    <span className="block text-[13px] font-medium text-[#6D5A4B] leading-[1.3] mb-0.5 tracking-tight">
                      {pkg.priceLabel}
                    </span>
                    <span className="block font-mono text-[34px] leading-[1.1] font-bold text-[#3B2A21] tracking-tighter whitespace-normal break-normal">
                      {pkg.price}
                    </span>
                  </div>
                  
                  <div className="text-[11px] text-[#927E6E] font-mono mt-2">
                    {pkg.microcopy}
                  </div>
                  
                  <div className="w-full h-px bg-white/40 my-[16px]" />
                  
                  <p className="text-[13px] text-[#6D5A4B] leading-[1.5] mb-[20px] max-w-[280px]">
                    {pkg.description}
                  </p>

                  <div>
                    <span className="text-[10px] font-mono tracking-[0.1em] uppercase text-[#927E6E] font-semibold block mb-2">
                      KEY INCLUSIONS
                    </span>
                    <ul className="space-y-[8px]">
                      <li className="flex items-start text-[13px] text-[#C96F3D] font-medium leading-[1.45]">
                        <span className="shrink-0 mr-[6px] mt-[2px] font-bold text-[12px]">✦</span>
                        <span>{pkg.name === "Launch" ? "1-Year Domain Included*" : "1-Year .com / .in Domain Included*"}</span>
                      </li>
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start text-[13px] text-[#3B2A21] font-medium leading-[1.45]">
                          <span className="shrink-0 mr-[6px] mt-[2px] text-[#C96F3D] font-bold text-[12px]">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Flexible space to push CTA to the bottom */}
                <div className="flex-1 min-h-[20px]" />

                <div className="pt-[16px] border-t border-white/40 mt-auto">
                  <span className="text-[11px] font-mono text-[#927E6E] block mb-3">
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
                  activeSnapIndex === i ? "w-6 bg-[#C96F3D]" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="text-center mt-12 md:mt-14">
          <p className="text-[11px] font-mono text-[#927E6E]/70 max-w-xl mx-auto px-4">
            *Standard domain registration included for 1 year. Growth & Product plans include standard .com / .in registration. Premium domains and renewals are billed separately.
          </p>
        </div>
      </Container>
    </section>
  );
}
