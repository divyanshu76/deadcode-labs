"use client";

import { motion } from "framer-motion";
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
    <section id="foundation" className="py-16 md:py-24 bg-background border-t border-white/10 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-accent font-semibold block mb-3">
              TECHNICAL STANDARDS
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              The foundation.
            </h2>
            <p className="text-base md:text-lg text-secondary mt-4 max-w-xl leading-relaxed">
              We engineer with the exact scalable stack trusted by the world&apos;s leading product teams. Zero bloated site builders, zero unmaintainable themes.
            </p>
          </motion.div>
        </div>

        {/* Compact 5-column editorial grid on desktop, 2-3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 pt-8 border-t border-white/10">
          {techCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="space-y-3"
            >
              <h3 className="font-mono text-xs font-semibold tracking-wider uppercase text-foreground border-b border-white/10 pb-2">
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
