"use client";

import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate, ShoppingBag, Terminal, Bot, Workflow, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

const services = [
  {
    number: "01",
    icon: LayoutTemplate,
    title: "Web Experiences",
    description: "High-performance brand flagship websites and interactive digital environments built to convert.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "E-Commerce Systems",
    description: "Bespoke headless Shopify and high-volume commerce architectures optimized for checkout speed.",
    tags: ["Shopify Plus", "Headless", "Stripe"],
  },
  {
    number: "03",
    icon: Terminal,
    title: "Web Applications",
    description: "Scalable dashboards, authenticated client portals, and internal enterprise software tooling.",
    tags: ["React", "Supabase", "Node.js"],
  },
  {
    number: "04",
    icon: Bot,
    title: "AI Product Design",
    description: "Custom intelligent assistants, context-aware LLM agents, and automated data pipelines.",
    tags: ["OpenAI", "Gemini", "LangChain"],
  },
  {
    number: "05",
    icon: Workflow,
    title: "Workflow Automation",
    description: "End-to-end automation connecting CRMs, databases, and operational APIs to save team hours.",
    tags: ["n8n", "Webhooks", "Zapier"],
  },
  {
    number: "06",
    icon: Layers,
    title: "SaaS & Systems",
    description: "Complete MVP architecture from UX design tokens down to production cloud infrastructure.",
    tags: ["TypeScript", "PostgreSQL", "AWS"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-28 bg-background border-t border-border">
      <Container>
        <div className="mb-10 md:mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary font-semibold block mb-3">
              CAPABILITIES & EXPERTISE
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Everything digital. <br />
              <span className="italic font-normal text-accent font-display">Engineered</span> properly.
            </h2>
          </motion.div>
        </div>

        {/* Compact editorial cards: ~160px-210px on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const slug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group relative bg-surface border border-border/80 rounded-xl md:rounded-2xl p-5 md:p-7 flex flex-col justify-between hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(32,29,26,0.05)] transition-all duration-300"
              >
                <Link href={`/services#${slug}`} className="absolute inset-0 z-20" aria-label={`Explore ${service.title}`}>
                  <span className="sr-only">Explore {service.title}</span>
                </Link>

                <div>
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg bg-muted flex items-center justify-center text-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      <Icon size={18} className="md:hidden" strokeWidth={1.75} />
                      <Icon size={22} className="hidden md:block" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs md:text-sm text-secondary font-semibold">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-base md:text-xl font-bold text-foreground tracking-tight mb-1.5 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[13px] md:text-sm text-secondary leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <div className="hidden sm:flex gap-1.5">
                    {service.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-background border border-border/60 text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
                    Explore <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
