"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const technologies = [
  { id: "01", name: "React / Next.js", note: "Architecture & SSR" },
  { id: "02", name: "TypeScript", note: "Type-safe Systems" },
  { id: "03", name: "Tailwind CSS", note: "Custom Design Tokens" },
  { id: "04", name: "Node.js / APIs", note: "Scalable Backends" },
  { id: "05", name: "Databases", note: "PostgreSQL & Supabase" },
  { id: "06", name: "UI / UX", note: "Design Engineering" },
];

export function FounderSection() {
  return (
    <section id="about" className="py-16 md:py-28 lg:py-36 bg-surface border-t border-border overflow-hidden">
      <Container>
        {/* DESKTOP LAYOUT (>= 1024px) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary font-semibold block mb-4">
                ABOUT DEADCODE LABS
              </span>
              <h2 className="font-display text-6xl xl:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-foreground">
                Engineering <br />
                <span className="italic font-normal text-accent font-display">meets</span> <br />
                aesthetics.
              </h2>

              <div className="space-y-5 text-base xl:text-lg text-secondary leading-relaxed mb-10 max-w-xl">
                <p>
                  DEADCODE LABS is founded and led by <strong className="text-foreground font-semibold">Divyanshu Verma</strong>, a software engineer and digital product designer obsessed with craftsmanship, speed, and architectural clarity.
                </p>
                <p>
                  We operate as a boutique engineering studio. There are no layers of account managers, no offshore junior handoffs, and zero generic boilerplate templates. Every digital product, website, and system is tailored directly to your commercial ambitions.
                </p>
                <p>
                  Our standard is singular: deliver software that performs with architectural rigor, scales effortlessly, and looks like a fine-art editorial publication.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-14">
                <Button size="lg" className="group text-[15px] px-8 h-13 bg-foreground text-background hover:bg-charcoal transition-all" asChild>
                  <a href="/start-a-project">
                    Start a Conversation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="group text-[15px] px-7 h-13 border-border hover:bg-muted text-foreground" asChild>
                  <a href="https://www.divyanshu.space/" target="_blank" rel="noopener noreferrer">
                    View Portfolio
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-secondary group-hover:text-foreground" />
                  </a>
                </Button>
              </div>

              {/* Technology Stack Grid in Left Column */}
              <div className="pt-8 border-t border-border/70 max-w-xl">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-mono text-xs tracking-widest uppercase text-foreground font-semibold">
                    Core Technical Foundation
                  </h4>
                  <span className="text-xs text-secondary font-mono">Modern Production Stack</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {technologies.map((tech) => (
                    <div
                      key={tech.id}
                      className="p-3.5 rounded-xl bg-background/80 border border-border/80 hover:border-accent/40 transition-colors group"
                    >
                      <span className="font-mono text-[10px] text-secondary/60 block mb-1">
                        {tech.id}
                      </span>
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors block">
                        {tech.name}
                      </span>
                      <span className="text-[11px] text-secondary block mt-0.5">
                        {tech.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Founder Portrait & Credentials */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              {/* Founder Portrait Card */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border/80 shadow-[0_16px_40px_rgba(32,29,26,0.06)] bg-background">
                <Image
                  src="/images/founder.jpg"
                  alt="Divyanshu Verma — Founder & Software Engineer at DEADCODE LABS"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#7C8A78]" />
                    <span className="font-mono text-[11px] tracking-widest uppercase text-white/80 font-medium">
                      Studio Principal
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">Divyanshu Verma</h3>
                </div>
              </div>

              {/* Founder Identity & Experience Block */}
              <div className="p-6 rounded-xl bg-background border border-border/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-foreground text-sm tracking-tight">Divyanshu Verma</h4>
                  <p className="text-xs text-secondary mt-0.5">
                    Founder · Software Engineer · Product Builder
                  </p>
                </div>
                <div className="text-right border-l border-border/60 pl-6 shrink-0">
                  <span className="font-display text-3xl font-bold text-foreground block leading-none">
                    6+
                  </span>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-secondary block mt-1">
                    Years Exp.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* MOBILE LAYOUT (< 1024px) 
            Specified order:
            1. Heading
            2. Short intro
            3. Founder portrait
            4. 6+ Years Experience
            5. Technology Stack
            6. Description
            7. Buttons
        */}
        <div className="flex flex-col lg:hidden space-y-6">
          {/* 1. Heading */}
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              ABOUT DEADCODE LABS
            </span>
            <h2 
              className="font-display font-bold tracking-tight text-foreground leading-[1.05]"
              style={{ fontSize: "clamp(36px, 10vw, 54px)" }}
            >
              Engineering <br />
              <span className="italic font-normal text-accent font-display">meets</span> aesthetics.
            </h2>
          </div>

          {/* 2. Short intro */}
          <p className="text-[15px] text-secondary leading-relaxed">
            DEADCODE LABS is founded by <strong className="text-foreground font-semibold">Divyanshu Verma</strong>, a software engineer and digital product designer focused on creating high-quality web applications, bespoke digital systems, and editorial brand experiences.
          </p>

          {/* 3. Founder portrait */}
          <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-2xl overflow-hidden border border-border/80 shadow-[0_12px_30px_rgba(32,29,26,0.06)] bg-background">
            <Image
              src="/images/founder.jpg"
              alt="Divyanshu Verma — Founder, DEADCODE LABS"
              fill
              sizes="90vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/80 block">
                Founder · Software Engineer
              </span>
              <span className="font-display text-xl font-bold">Divyanshu Verma</span>
            </div>
          </div>

          {/* 4. 6+ Years Experience */}
          <div className="p-4 rounded-xl bg-background border border-border/80 flex items-center justify-between">
            <div>
              <span className="font-mono text-[11px] tracking-wider uppercase text-secondary font-semibold block">
                Independent Track Record
              </span>
              <span className="text-xs text-secondary mt-0.5 block">
                Crafting digital products & software
              </span>
            </div>
            <div className="text-right border-l border-border/60 pl-5 shrink-0">
              <span className="font-display text-3xl font-bold text-foreground leading-none block">
                6+
              </span>
              <span className="font-mono text-[10px] uppercase text-secondary tracking-widest block mt-0.5">
                Years
              </span>
            </div>
          </div>

          {/* 5. Technology Stack */}
          <div className="pt-2">
            <span className="font-mono text-[11px] tracking-widest uppercase text-foreground font-semibold block mb-3">
              Technology Stack
            </span>
            <div className="grid grid-cols-2 gap-2">
              {technologies.map((tech) => (
                <div key={tech.id} className="p-3 rounded-lg bg-background border border-border/70">
                  <span className="font-mono text-[9px] text-secondary/70 block mb-0.5">{tech.id}</span>
                  <span className="text-xs font-semibold text-foreground block">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Description */}
          <div className="space-y-3 text-[14.5px] text-secondary leading-relaxed pt-2">
            <p>
              We operate without the agency bloat. No recycled templates, no non-technical middle managers. You collaborate directly with the engineers designing and shipping your code.
            </p>
            <p>
              Our philosophy is uncompromising: build digital systems that look beautiful, scale flawlessly, and solve real business problems.
            </p>
          </div>

          {/* 7. Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button size="lg" className="w-full sm:w-auto h-12 text-sm bg-foreground text-background font-medium" asChild>
              <a href="/start-a-project">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 text-sm border-border text-foreground font-medium" asChild>
              <a href="https://www.divyanshu.space/" target="_blank" rel="noopener noreferrer">
                View Portfolio
                <ArrowUpRight className="ml-2 h-4 w-4 text-secondary" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
