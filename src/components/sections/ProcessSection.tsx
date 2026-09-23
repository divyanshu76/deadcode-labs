"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FileText, Compass, PenTool, Code2, ShieldCheck, Rocket } from "lucide-react";

const timeline = [
  {
    step: "01",
    title: "Brief",
    description: "Understand goals, target audience, and commercial requirements.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Strategy",
    description: "Define technical structure, UX direction, and delivery milestones.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Design",
    description: "Craft a bespoke, high-contrast editorial interface system.",
    icon: PenTool,
  },
  {
    step: "04",
    title: "Build",
    description: "Engineer scalable frontend and backend systems with zero bloat.",
    icon: Code2,
  },
  {
    step: "05",
    title: "Refine",
    description: "Rigorous performance, responsive, and cross-browser QA audits.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Launch",
    description: "Production deployment, edge CDN caching, and continuous stewardship.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-14 md:py-24 relative z-10 border-t border-white/50 overflow-hidden">
      <Container>
        <div className="max-w-3xl mb-10 md:mb-16">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#C96F3D] font-semibold block mb-2">
            METHODOLOGY
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#3B2A21] leading-[1.1] mb-3"
          >
            The execution flow.
          </motion.h2>
          <p className="text-sm md:text-base text-[#6D5A4B] max-w-xl leading-relaxed">
            We follow an engineering-first sprint methodology ensuring predictable velocity, zero communication friction, and exceptional delivery standards.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute top-[2.75rem] left-0 right-0 h-[2px] bg-white/50"></div>
            <div className="absolute top-[2.75rem] left-0 right-0 h-[2px] overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-y-0 left-0 bg-[#C96F3D]"
              />
            </div>
            
            <div className="grid grid-cols-6 gap-5 relative z-10">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.08) }}
                    className="relative group pr-2"
                  >
                    <div className="w-20 h-20 rounded-full glass-panel border border-[rgba(255,255,255,0.70)] flex flex-col items-center justify-center font-mono text-xs font-bold mb-6 relative z-10 transition-all duration-300 group-hover:border-[#C96F3D] group-hover:bg-[rgba(255,255,255,0.60)] group-hover:scale-105">
                      <Icon className="w-5 h-5 mb-1 text-[#927E6E] group-hover:text-[#C96F3D] transition-colors" />
                      <span className="text-[#927E6E] group-hover:text-[#3B2A21] transition-colors">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#3B2A21] mb-1.5 tracking-tight">{item.title}</h3>
                    <p className="text-xs text-[#6D5A4B] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Timeline — compact with dividers */}
          <div className="lg:hidden relative space-y-0">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === timeline.length - 1;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="relative group"
                >
                  <div className="flex items-start gap-3.5 py-4">
                    {/* Step circle */}
                    <div className="w-10 h-10 shrink-0 rounded-full glass-panel border border-[rgba(255,255,255,0.70)] flex items-center justify-center group-hover:border-[#C96F3D] group-hover:bg-[rgba(255,255,255,0.60)] transition-colors">
                      <Icon className="w-4 h-4 text-[#927E6E] group-hover:text-[#C96F3D] transition-colors" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[#C96F3D] font-mono text-[11px] font-bold">{item.step}</span>
                        <h3 className="text-base font-bold tracking-tight text-[#3B2A21]">{item.title}</h3>
                      </div>
                      <p className="text-xs text-[#6D5A4B] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {!isLast && (
                    <div className="h-[1px] bg-white/50 ml-[52px]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
