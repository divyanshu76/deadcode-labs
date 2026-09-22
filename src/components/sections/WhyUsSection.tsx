"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { WhyUsBento } from "@/components/ui/WhyUsBento";

export function WhyUsSection() {
  return (
    <section className="py-16 md:py-28 bg-[#151C22] border-t border-white/10 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-accent font-semibold block mb-3 text-center lg:text-left">
            STUDIO PHILOSOPHY
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.08] text-center lg:text-left">
            Why DEADCODE LABS.
          </h2>
        </motion.div>
        
        <WhyUsBento />
      </Container>
    </section>
  );
}
