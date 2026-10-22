"use client";

import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FOUNDER } from "@/lib/seo";

const divyanshuTechGroups = [
  {
    category: "FRONTEND",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "BACKEND",
    items: ["Node.js", "Python", "FastAPI", "REST APIs"],
  },
  {
    category: "DATABASE & CLOUD",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "Firebase"],
  },
  {
    category: "PRODUCT / COMMERCE",
    items: ["Shopify", "Liquid", "UI/UX"],
  },
];

const alokCapabilities = [
  "Client Relations",
  "Project Management",
  "Requirements Gathering",
  "Client Communication",
  "Project Coordination",
  "Delivery Coordination",
  "Client Success",
  "Business Operations",
  "Documentation & Workflow",
];

/** On the standalone /about page the section heading is the page's h1. */
export function FounderSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="about" className="atmo atmo-silver-right py-12 md:py-20 lg:py-32 relative z-10 border-t border-white/[0.06] overflow-hidden">
      <Container>
        {/* DESKTOP & MOBILE SHARED HEADING */}
        <div className="mb-12 md:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 lg:items-center">
            
            {/* LEFT: Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <span className="chapter-label mb-4">
                08 — ABOUT DEADCODE LABS
              </span>
              <Heading className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-ink">
                {headingLevel === "h1" && <span className="sr-only">About DEADCODE LABS and founder Divyanshu Verma: </span>}
                Engineering <br />
                <span className="italic text-silver-dark">meets</span> aesthetics.
              </Heading>
            </motion.div>

            {/* RIGHT: Studio Statement & Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel metal-edge p-5 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-signal/5 rounded-bl-full -z-10"></div>
              <p className="text-[14.5px] sm:text-[15px] md:text-base xl:text-lg text-ink-soft leading-relaxed mb-6 md:mb-8">
                DEADCODE LABS is a digital product studio focused on engineering high-performance web applications, scalable systems, e-commerce experiences, AI-enabled products and automation-driven solutions.
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-3 pt-5 md:pt-6 border-t border-white/30">
                {["FULL-STACK ENGINEERING", "DIGITAL PRODUCTS", "AI & AUTOMATION", "E-COMMERCE"].map((tag, i) => (
                  <div key={i} className="font-mono text-[9px] md:text-[10px] xl:text-[11px] tracking-wider uppercase px-2.5 py-1.5 rounded bg-white/[0.04] text-ink font-semibold border border-white/20 shadow-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* FOUNDING TEAM SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <h3 className="font-mono text-[10px] sm:text-[11px] md:text-xs tracking-widest uppercase text-ink font-semibold">
              Founding Team
            </h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12 lg:items-start">
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start">
            
            {/* Divyanshu Profile Card */}
            <div id="founder" className="scroll-mt-28 p-5 sm:p-6 md:p-8 rounded-2xl glass-panel metal-edge group hover:-translate-y-1 transition-all duration-500 border border-white/10 hover:border-signal/30 hover:shadow-xl hover:shadow-charcoal/5 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-signal/5 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div>
                  <h4 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">Divyanshu Verma</h4>
                  <p className="text-[12px] sm:text-[13px] md:text-sm text-signal-bright font-medium mt-1.5 uppercase tracking-wider">
                    Founder · Full Stack Developer
                  </p>
                  <p className="text-[11px] sm:text-[12px] md:text-[13px] text-secondary mt-1">
                    6+ Years Experience
                  </p>
                </div>
                <div className="hidden sm:block text-right border-l-2 border-signal/20 pl-4 shrink-0">
                  <span className="font-display text-2xl md:text-3xl font-bold text-foreground block leading-none">
                    6+
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-secondary block mt-1">
                    Years Exp.
                  </span>
                </div>
              </div>
              
              <p className="text-[13.5px] md:text-[14.5px] text-secondary leading-relaxed mb-6 md:mb-8">
                Founder of DEADCODE LABS. Full-stack developer focused on building high-performance web applications, digital products and scalable systems. Combines product thinking, engineering discipline and interface craftsmanship to turn complex ideas into polished digital experiences.
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 -mt-2 mb-6 md:mb-8">
                <a
                  href={FOUNDER.github}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="Divyanshu Verma on GitHub (opens in a new tab)"
                  className="inline-flex items-center font-mono text-[11px] md:text-xs tracking-wider uppercase text-ink-soft hover:text-signal-bright transition-colors"
                >
                  GitHub
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="Divyanshu Verma on LinkedIn (opens in a new tab)"
                  className="inline-flex items-center font-mono text-[11px] md:text-xs tracking-wider uppercase text-ink-soft hover:text-signal-bright transition-colors"
                >
                  LinkedIn
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              
              <div className="pt-5 md:pt-6 border-t border-white/10">
                <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-ink font-semibold block mb-4 md:mb-5">
                  Full-Stack Capabilities
                </span>
                <div className="space-y-4 md:space-y-5">
                  {divyanshuTechGroups.map((group, idx) => (
                    <div key={idx}>
                      <span className="font-mono text-[8px] sm:text-[9px] text-signal-bright font-semibold block mb-1.5 md:mb-2 tracking-widest">
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {group.items.map((item, i) => (
                          <div
                            key={i}
                            className="px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-signal/30 transition-all group/chip"
                          >
                            <span className="text-[10px] sm:text-[11px] font-semibold text-foreground group-hover/chip:text-signal-bright transition-colors">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alok Profile Card */}
            <div className="p-5 sm:p-6 md:p-8 rounded-2xl glass-panel metal-edge group hover:-translate-y-1 transition-all duration-500 border border-white/10 hover:border-signal/30 hover:shadow-xl hover:shadow-charcoal/5 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-signal/5 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div>
                  <h4 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">Alok Verma</h4>
                  <p className="text-[12px] sm:text-[13px] md:text-sm text-signal-bright font-medium mt-1.5 uppercase tracking-wider">
                    Founding Client Success Lead
                  </p>
                  <p className="text-[11px] sm:text-[12px] md:text-[13px] text-secondary mt-1">
                    Project Operations · 3 Years Experience
                  </p>
                </div>
                <div className="hidden sm:block text-right border-l-2 border-signal/20 pl-4 shrink-0">
                  <span className="font-display text-2xl md:text-3xl font-bold text-foreground block leading-none">
                    3
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-secondary block mt-1">
                    Years Exp.
                  </span>
                </div>
              </div>

              <p className="text-[13.5px] md:text-[14.5px] text-secondary leading-relaxed mb-6 md:mb-8">
                Focused on client success, project coordination and clear communication. Works closely with clients to understand requirements, align expectations and keep projects moving smoothly from planning through delivery.
              </p>
              
              <div className="pt-5 md:pt-6 border-t border-white/10">
                <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-ink font-semibold block mb-4 md:mb-5">
                  Operational Capabilities
                </span>
                <div className="flex flex-wrap gap-1.5 md:gap-2.5">
                  {alokCapabilities.map((capability, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-signal/30 transition-all text-[11px] md:text-xs font-medium text-foreground hover:text-signal-bright"
                    >
                      {capability}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            </div>
          </div>

          {/* CTA Row directly below founding cards */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Button size="lg" className="w-full sm:w-auto group text-[13.5px] sm:text-[14px] md:text-[15px] px-6 sm:px-8 h-12 md:h-13 transition-all bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-signal/50 text-ink backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5" asChild>
              <a href="/start-a-project">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 text-signal-bright" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto group text-[13.5px] sm:text-[14px] md:text-[15px] px-6 sm:px-7 h-12 md:h-13 border-white/30 hover:border-white/10 bg-transparent hover:bg-white/[0.08] text-ink-soft hover:text-ink backdrop-blur-sm transition-all hover:-translate-y-0.5" asChild>
              <a href="https://www.divyanshu.space/" target="_blank" rel="noopener noreferrer">
                View Portfolio
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-signal/70 group-hover:text-signal-bright" />
              </a>
            </Button>
          </div>

        </motion.div>

      </Container>
    </section>
  );
}
