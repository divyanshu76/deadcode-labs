"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, ShoppingBag, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import Link from "next/link";

export function FeaturedWorkSection() {
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="work" className="py-14 md:py-24 bg-background border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-8">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-accent font-semibold block mb-2">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Selected work.
            </h2>
            <p className="text-sm md:text-base text-secondary mt-2 max-w-md">
              Real commercial products, platforms, and digital systems built with architectural rigor.
            </p>
          </div>
          <Button variant="outline" className="group text-sm border-border text-foreground hover:bg-surface-lavender" asChild>
            <Link href="/work">
              View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group flex flex-col relative rounded-2xl md:rounded-3xl p-5 md:p-7 bg-surface border border-border shadow-[0_4px_24px_rgba(21,21,26,0.03)] hover:border-accent/40 hover:shadow-[0_12px_36px_rgba(21,21,26,0.06)] transition-all duration-300"
            >
              <Link href={`/work/${project.slug}`} className="absolute inset-0 z-20" aria-label={`View ${project.title} case study`}>
                <span className="sr-only">View {project.title} case study</span>
              </Link>

              {/* Browser Device Shell */}
              <div
                className="relative overflow-hidden rounded-xl md:rounded-2xl bg-surface-lavender/40 border border-border mb-5 md:mb-6 aspect-[16/10] md:aspect-[1.6/1] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              >
                {/* Browser Top Navigation Bar */}
                <div className="h-8 md:h-9 bg-surface/90 border-b border-border/80 flex items-center justify-between px-3 md:px-4 z-20 relative">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/70" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-background border border-border text-[10px] font-mono text-secondary truncate max-w-[180px]">
                    {project.slug}.deadcode.design
                  </div>
                  <div className="w-4" />
                </div>

                {/* Branded Editorial UI Mockup */}
                <div className="absolute inset-0 top-8 md:top-9 p-4 md:p-6 flex flex-col justify-between bg-gradient-to-br from-surface to-surface-lavender/30 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  {project.slug === "luxe-real-estate" && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-[10px] tracking-widest uppercase text-accent font-semibold">
                            ARCHITECTURAL COLLECTION
                          </span>
                          <h4 className="font-display text-xl md:text-3xl font-bold text-foreground">
                            Villa Bellagio · Lake Como
                          </h4>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-white border border-border text-foreground font-semibold">
                          €14,800,000
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-4">
                        <div className="p-2.5 rounded bg-white/80 border border-border/70 text-center">
                          <span className="text-[10px] font-mono text-secondary block">LIVING AREA</span>
                          <span className="text-xs font-semibold text-foreground">840 sq.m</span>
                        </div>
                        <div className="p-2.5 rounded bg-white/80 border border-border/70 text-center">
                          <span className="text-[10px] font-mono text-secondary block">BEDROOMS</span>
                          <span className="text-xs font-semibold text-foreground">6 Suites</span>
                        </div>
                        <div className="p-2.5 rounded bg-white/80 border border-border/70 text-center">
                          <span className="text-[10px] font-mono text-secondary block">VIEW</span>
                          <span className="text-xs font-semibold text-foreground">Panoramic Lake</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.slug === "cozycraft" && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4 text-accent" />
                          <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-foreground">
                            COZYCRAFT LIVING
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-success font-semibold">
                          ● Headless Storefront
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-border flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-foreground block">Solid Oak Dining Table</span>
                          <span className="text-[11px] text-secondary">Bespoke Joinery Collection</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-foreground">₹68,500</span>
                      </div>
                    </div>
                  )}

                  {project.slug === "finflow" && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LineChart className="w-4 h-4 text-accent-blue" />
                          <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-foreground">
                            FINFLOW INTELLIGENCE
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-accent font-semibold">
                          Real-time Sync
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-border flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-secondary block">NET TRANSACTION VOLUME</span>
                          <span className="text-base font-bold text-foreground font-mono">$4,289,120</span>
                        </div>
                        <span className="text-xs font-mono text-success font-bold">+18.4% MoM</span>
                      </div>
                    </div>
                  )}

                  {project.slug !== "luxe-real-estate" && project.slug !== "cozycraft" && project.slug !== "finflow" && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Building2 className="w-8 h-8 text-accent mx-auto mb-1" />
                        <span className="font-display text-lg font-bold text-foreground">{project.title}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Information Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative z-10 pointer-events-none">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-accent group-hover:text-foreground transition-colors">
                      {project.category}
                    </span>
                    <span className="text-border">•</span>
                    <span className="text-xs text-secondary font-mono">
                      {project.technology.slice(0, 3).join(", ")}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-secondary line-clamp-2 max-w-xl leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
                
                <div className="flex items-center text-xs font-semibold text-accent whitespace-nowrap mt-1 sm:mt-0 group-hover:translate-x-1 group-hover:text-foreground transition-all">
                  View Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
