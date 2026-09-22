"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const principles = [
  {
    number: "01",
    title: "Product thinking",
    description: "We don't start with code. We start with the commercial objective. Understanding the actual user and business problem is always prioritized before writing architecture.",
  },
  {
    number: "02",
    title: "Custom by default",
    description: "Zero recycled templates masquerading as bespoke software. Every database schema, UI component, and state machine is designed specifically for your constraints.",
  },
  {
    number: "03",
    title: "Design + engineering",
    description: "Aesthetics and systems engineering function as a unified discipline. There is zero handoff friction between design concept and production-grade execution.",
  },
  {
    number: "04",
    title: "Modern stack",
    description: "We leverage edge computing, typed architectures, and modern frameworks that ensure sub-second loads, robust security, and exceptional long-term maintainability.",
  },
  {
    number: "05",
    title: "AI-native thinking",
    description: "Artificial intelligence and workflow automation are embedded at the architectural layer where they create real leverage, not superficial marketing gimmicks.",
  },
  {
    number: "06",
    title: "Long-term thinking",
    description: "We engineer extensible foundations designed to scale with your valuation, eliminating the technical debt of throwaway agency code.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-16 md:py-28 bg-surface border-t border-border overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Positioning Statement */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary font-semibold block mb-3">
                STUDIO PHILOSOPHY
              </span>
              <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-6">
                Built around <br className="hidden sm:inline" />
                the problem, <br className="hidden sm:inline" />
                <span className="italic font-normal text-accent font-display">not</span> the template.
              </h2>
              <p className="text-base md:text-lg text-secondary leading-relaxed max-w-md">
                Our approach rejects agency bloat in favor of precision product engineering. Six core tenets guide every engagement from day zero to deployment.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Six Principles (Editorial Grid / Rows) */}
          <div className="lg:col-span-7">
            {/* Desktop / Tablet Grid (2 cols) */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-x-10 gap-y-8 lg:gap-y-12">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col border-t border-border/70 pt-5 group"
                >
                  <span className="font-mono text-xs tracking-widest text-secondary font-semibold mb-2">
                    {principle.number}
                  </span>
                  <h3 className="text-lg font-bold text-foreground tracking-tight mb-2 group-hover:text-accent transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mobile Stacked Rows (Compact: ~100-120px tall, clean dividers) */}
            <div className="flex flex-col sm:hidden divide-y divide-border/70 border-t border-b border-border/70">
              {principles.map((principle) => (
                <div key={principle.number} className="py-4 space-y-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-semibold text-secondary">
                      {principle.number}
                    </span>
                    <h3 className="text-[15px] font-bold text-foreground tracking-tight">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-[13px] text-secondary leading-relaxed pl-7">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
