"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 glass-soft rounded-[32px] p-8 md:p-12 text-center">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="text-[32px] md:text-[42px] font-display font-bold text-[#3B2A21] mb-1 md:mb-2 leading-none">
                {metric.value}
              </div>
              <span className="text-[13px] md:text-[14px] font-mono text-[#6D5A4B] font-semibold uppercase tracking-wider">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
