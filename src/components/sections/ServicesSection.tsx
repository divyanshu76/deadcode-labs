"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ServiceGlyph, type ServiceGlyphKind } from "@/components/ui/ServiceGlyph";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const services = [
  {
    number: "01",
    glyph: "web" as ServiceGlyphKind,
    id: "web-experiences",
    title: "Web Experiences",
    description: "High-performance brand flagship websites and interactive digital environments built to convert.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
  {
    number: "02",
    glyph: "commerce" as ServiceGlyphKind,
    id: "e-commerce",
    title: "E-Commerce Systems",
    description: "Bespoke headless Shopify and high-volume commerce architectures optimized for checkout speed.",
    tags: ["Shopify Plus", "Headless", "Stripe"],
  },
  {
    number: "03",
    glyph: "app" as ServiceGlyphKind,
    id: "web-applications",
    title: "Web Applications",
    description: "Scalable dashboards, authenticated client portals, and internal enterprise software tooling.",
    tags: ["React", "Supabase", "Node.js"],
  },
  {
    number: "04",
    glyph: "ai" as ServiceGlyphKind,
    id: "ai-products",
    title: "AI Product Design",
    description: "Custom intelligent assistants, context-aware LLM agents, and automated data pipelines.",
    tags: ["OpenAI", "Gemini", "LangChain"],
  },
  {
    number: "05",
    glyph: "automation" as ServiceGlyphKind,
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "End-to-end automation connecting CRMs, databases, and operational APIs to save team hours.",
    tags: ["n8n", "Webhooks", "Zapier"],
  },
  {
    number: "06",
    glyph: "saas" as ServiceGlyphKind,
    id: "saas-digital-products",
    title: "SaaS & Systems",
    description: "Complete MVP architecture from UX design tokens down to production cloud infrastructure.",
    tags: ["TypeScript", "PostgreSQL", "AWS"],
  },
];

/** On the standalone /services page the section heading is the page's h1. */
export function ServicesSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="services" className="atmo atmo-alt py-16 md:py-28 relative z-10">
      <Container>
        <div className="mb-10 md:mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="chapter-label mb-4">
              04 — CAPABILITIES & EXPERTISE
            </span>
            <Heading className="font-display text-[length:clamp(40px,6vw,80px)] tracking-[-0.015em] text-ink leading-[1.02]">
              {headingLevel === "h1" && <span className="sr-only">DEADCODE LABS services and capabilities: </span>}
              Everything digital. <br />
              <span className="italic text-silver-dark">Engineered</span> properly.
            </Heading>
          </motion.div>
        </div>

        {/* Featured service + supporting modules. Each carries an illustration of what it is. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, index) => {
            const featured = index === 0;

            return (
              <motion.article
                key={service.number}
                id={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (index % 3) * 0.07, duration: 0.6, ease: EASE_OUT_EXPO }}
                className={cn(
                  "group relative scroll-mt-28 rounded-[24px] metal-edge overflow-hidden transition-shadow duration-500",
                  featured
                    ? "glass-dark signal-glow md:col-span-2 lg:row-span-2 p-6 md:p-10 flex flex-col"
                    : "premium-card p-5 md:p-6 flex flex-row md:flex-col gap-5 md:gap-0"
                )}
              >
                <Link href={`/services#${service.id}`} className="absolute inset-0 z-20 rounded-[24px]" aria-label={`Explore ${service.title}`}>
                  <span className="sr-only">Explore {service.title}</span>
                </Link>

                {/* Illustration well */}
                <div
                  className={cn(
                    "relative rounded-[16px] flex items-center justify-center shrink-0",
                    featured
                      ? "glass-visual glass-visual-dark h-52 md:h-auto md:flex-1 md:min-h-[260px] mb-8 text-silver"
                      : "glass-visual w-24 h-20 md:w-full md:h-36 md:mb-6 text-ink-soft"
                  )}
                >
                  <span className="light-streaks" aria-hidden="true" />
                  <ServiceGlyph
                    kind={service.glyph}
                    className={cn(
                      "relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]",
                      featured ? "max-w-[420px] w-[78%]" : "w-[82%] md:w-[62%]"
                    )}
                  />
                </div>

                <div className={cn("flex flex-col min-w-0", !featured && "flex-1")}>
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-ink-muted">{service.number}</span>
                    <ArrowUpRight className="w-4 h-4 text-ink-muted transition-all duration-300 group-hover:text-signal-bright group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                  <h3 className={cn("text-ink tracking-tight", featured ? "font-display text-4xl md:text-5xl leading-[1.02]" : "text-[17px] md:text-xl font-semibold")}>
                    {service.title}
                  </h3>
                  <p className={cn("text-ink-soft leading-relaxed mt-2", featured ? "text-base md:text-lg max-w-lg mt-4" : "text-[14px] md:text-[15px]")}>
                    {service.description}
                  </p>
                  <ul className={cn("flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] tracking-[0.14em] uppercase text-ink-muted", featured ? "mt-8" : "mt-4 hidden sm:flex")}>
                    {service.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
