"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const metrics = [
  { id: "01", label: "DEPLOYMENTS", value: "140+" },
  { id: "02", label: "CODE COMMITS", value: "10k+" },
  { id: "03", label: "UPTIME", value: "99.9%" },
];

export function ResultsSection() {
  return (
    <section className="py-8 md:py-12 bg-background">
      <Container>
        {/* Technical Dashboard Row */}
        <div className="border-t border-b border-border/80">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/80">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="py-5 px-4 md:px-8 flex items-center justify-between hover:bg-surface/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-secondary font-medium">{metric.id}</span>
                  <span className="text-border">/</span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-foreground group-hover:text-accent transition-colors">
                    {metric.label}
                  </span>
                </div>
                <span className="font-mono text-[13px] font-bold text-foreground">
                  ({metric.value})
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
