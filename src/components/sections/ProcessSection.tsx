"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 60%"] });
  const scrolled = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Reduced motion: show the completed line rather than animating it.
  const progress = reducedMotion ? 1 : scrolled;

  return (
    <section ref={sectionRef} id="process" className="atmo atmo-silver-left py-14 md:py-24 relative z-10 border-t border-white/[0.06] overflow-hidden">
      <Container>
        <div className="max-w-3xl mb-10 md:mb-16">
          <span className="chapter-label mb-4">
            07 — METHODOLOGY
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[length:clamp(40px,6vw,80px)] tracking-[-0.015em] text-ink leading-[1.02] mb-4"
          >
            The execution flow.
          </motion.h2>
          <p className="text-sm md:text-base text-ink-soft max-w-xl leading-relaxed">
            We follow an engineering-first sprint methodology ensuring predictable velocity, zero communication friction, and exceptional delivery standards.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute top-[2.75rem] left-0 right-0 h-[2px] bg-white/[0.12]"></div>
            {/* Red progress follows the reader through the stages (scroll-linked, no scroll-jacking) */}
            <div className="absolute top-[2.75rem] left-0 right-0 h-[2px] overflow-hidden" aria-hidden="true">
              <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-signal-gradient" />
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
                    <div className="w-20 h-20 rounded-full metal-chip flex flex-col items-center justify-center font-mono text-xs font-bold mb-6 relative z-10 transition-shadow duration-300 group-hover:shadow-[inset_0_1px_0_#fff,0_0_0_2px_rgba(225,6,0,0.55),0_10px_24px_rgba(42,42,42,0.16)]">
                      <Icon className="w-5 h-5 mb-1 text-ink-muted group-hover:text-signal-bright transition-colors" />
                      <span className="text-ink-muted group-hover:text-ink transition-colors">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-1.5 tracking-tight">{item.title}</h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Timeline — a silver spine with scroll-linked red progress */}
          <div className="lg:hidden relative space-y-0">
            <div className="absolute left-5 top-6 bottom-6 w-px bg-white/[0.12]" aria-hidden="true" />
            <motion.div style={{ scaleY: progress }} className="absolute left-5 top-6 bottom-6 w-px origin-top bg-signal" aria-hidden="true" />
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
                    <div className="relative z-10 w-10 h-10 shrink-0 rounded-full metal-chip flex items-center justify-center">
                      <Icon className="w-4 h-4 text-ink-muted group-hover:text-signal-bright transition-colors" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-signal-bright font-mono text-[11px] font-bold">{item.step}</span>
                        <h3 className="text-base font-bold tracking-tight text-ink">{item.title}</h3>
                      </div>
                      <p className="text-xs text-ink-soft leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {!isLast && (
                    <div className="h-[1px] bg-linear-to-r from-silver to-transparent ml-[52px]" />
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
