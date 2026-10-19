"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { WhyUsBento } from "@/components/ui/WhyUsBento";

export function WhyUsSection() {
  return (
    <section className="atmo atmo-red-right py-16 md:py-28 relative z-10 border-t border-white/[0.06] overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <span className="chapter-label mb-4 flex justify-center lg:justify-start">
            10 — STUDIO PHILOSOPHY
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink leading-[1.08] text-center lg:text-left">
            Why DEADCODE LABS.
          </h2>
        </motion.div>
        
        <WhyUsBento />
      </Container>
    </section>
  );
}
