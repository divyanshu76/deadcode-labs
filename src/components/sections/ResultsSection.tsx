"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { TiltCard } from "@/components/ui/TiltCard";
import { EASE_OUT_EXPO } from "@/lib/motion";

const metrics = [
  { id: "01", label: "Global Deployments", value: "140+" },
  { id: "02", label: "Production Commits", value: "10k+" },
  { id: "03", label: "Systems Uptime", value: "99.9%" },
  { id: "04", label: "Bespoke Projects", value: "50+" },
];

export function ResultsSection() {
  return (
    <section className="py-16 md:py-24 relative z-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <TiltCard
              key={metric.id}
              maxTilt={5}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: EASE_OUT_EXPO }}
              className="premium-card metal-edge rounded-[24px] p-5 sm:p-6 md:p-8 flex flex-col overflow-hidden"
            >
              <span className="light-streaks" aria-hidden="true" />
              <div className="flex items-center justify-between mb-5 md:mb-8">
                <span className="font-mono text-[11px] text-ink-muted font-semibold">{metric.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
              </div>
              <div className="text-[32px] md:text-[44px] font-display font-bold text-charcoal mb-1 md:mb-2 leading-none">
                {metric.value}
              </div>
              <span className="text-[11.5px] md:text-[13px] font-mono text-ink-soft font-semibold uppercase tracking-wider">
                {metric.label}
              </span>
              {/* Machined base line */}
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.9, ease: EASE_OUT_EXPO }}
                className="absolute left-5 right-5 md:left-8 md:right-8 bottom-0 h-px origin-left bg-linear-to-r from-silver via-signal/60 to-transparent"
              />
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
