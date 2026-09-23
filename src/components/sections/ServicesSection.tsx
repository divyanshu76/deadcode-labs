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
    <section id="services" className="py-16 md:py-28 relative z-10">
      <Container>
        <div className="mb-10 md:mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#C96F3D] font-semibold block mb-3">
              CAPABILITIES & EXPERTISE
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#3B2A21] leading-[1.1]">
              Everything digital. <br />
              <span className="italic font-normal text-[#C96F3D] font-display">Engineered</span> properly.
            </h2>
          </motion.div>
        </div>

        {/* Compact editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const slug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01, y: -3 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
                className="group relative premium-card p-[18px] md:p-7 flex flex-col justify-between shadow-xl"
              >
                <Link href={`/services#${slug}`} className="absolute inset-0 z-20" aria-label={`Explore ${service.title}`}>
                  <span className="sr-only">Explore {service.title}</span>
                </Link>

                <div>
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] rounded-[14px] glass-pill flex items-center justify-center text-[#3B2A21] group-hover:bg-[#C96F3D]/12 group-hover:text-[#C96F3D] transition-colors">
                      <Icon size={20} className="md:hidden" strokeWidth={1.75} />
                      <Icon size={22} className="hidden md:block" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[12px] md:text-sm text-[#927E6E] font-semibold">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-[17px] md:text-xl font-bold text-[#3B2A21] tracking-tight mb-2 group-hover:text-[#C96F3D] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[14.5px] md:text-[15px] text-[#6D5A4B] leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <div className="hidden sm:flex gap-1.5">
                    {service.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded glass-pill text-[#6D5A4B]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs font-semibold text-[#C96F3D] group-hover:translate-x-0.5 transition-transform">
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
