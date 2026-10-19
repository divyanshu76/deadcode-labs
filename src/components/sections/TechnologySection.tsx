"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";

const techCategories = [
  {
    category: "Frontend Architecture",
    items: ["Next.js App Router", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend & Systems",
    items: ["Node.js", "Python / FastAPI", "Go", "GraphQL", "RESTful APIs"],
  },
  {
    category: "Data & Cloud",
    items: ["Supabase", "PostgreSQL", "Firebase", "AWS Infrastructure", "Vercel Edge"],
  },
  {
    category: "Modern Commerce",
    items: ["Shopify Plus", "Hydrogen", "Headless Storefronts", "Stripe", "Medusa.js"],
  },
  {
    category: "AI & Automation",
    items: ["OpenAI API", "Google Gemini", "LangChain", "n8n Workflows", "Custom Embeddings"],
  },
];

export function TechnologySection() {
  return (
    <section id="foundation" className="atmo atmo-alt py-16 md:py-24 relative z-10 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="chapter-label mb-4">
              09 — TECHNICAL STANDARDS
            </span>
            <h2 className="font-display text-[length:clamp(40px,6vw,80px)] tracking-[-0.015em] text-foreground leading-[1.02]">
              The foundation.
            </h2>
            <p className="text-base md:text-lg text-secondary mt-4 max-w-xl leading-relaxed">
              We engineer with the exact scalable stack trusted by the world&apos;s leading product teams. Zero bloated site builders, zero unmaintainable themes.
            </p>
          </motion.div>
        </div>

        {/* The stack as one system: groups hang from a silver rail (desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 pt-8 lg:pt-12 border-t border-silver/70">
          {techCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="space-y-3 premium-card metal-edge rounded-[20px] p-4 sm:p-5"
            >
              {/* Rail connector and node */}
              <span className="hidden lg:block absolute -top-12 left-6 w-px h-12 bg-white/[0.12]" aria-hidden="true" />
              <span
                className={`hidden lg:block absolute -top-[53px] left-[19.5px] w-3 h-3 rounded-full border bg-[var(--bg-primary)] ${index === 0 ? "border-signal" : "border-silver-dark"}`}
                aria-hidden="true"
              />
              <span className="block font-mono text-[10px] tracking-[0.2em] text-ink-muted">S.{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-foreground border-b border-silver/60 pb-2">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] md:text-[14.5px] text-secondary hover:text-foreground transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
