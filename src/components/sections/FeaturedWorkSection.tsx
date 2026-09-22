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
          <Button variant="outline" className="group text-sm border-border text-foreground" asChild>
            <Link href="/work">
              View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015, y: -4 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
              className="group flex flex-col relative premium-card bg-[#202A32] transition-colors duration-300 p-3 md:p-5 h-full rounded-[16px] md:rounded-[20px] border border-white/10 hover:border-[#E4573F]/30 shadow-xl"
            >
              <Link href={`/work/${project.slug}`} className="absolute inset-0 z-20" aria-label={`View ${project.title} case study`}>
                <span className="sr-only">View {project.title} case study</span>
              </Link>

              {/* Project Image Area */}
              <div
                className="relative overflow-hidden rounded-xl bg-[#11161B] border border-white/10 mb-4 md:mb-5 aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:border-[#E4573F]/30"
              >
                {/* Fallback pattern if image is missing, otherwise user can add images to public/images/projects/ */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#151C22]">
                   <span className="font-display text-2xl font-bold text-white/20">{project.title}</span>
                </div>
              </div>

              {/* Information Row */}
              <div className="flex flex-col justify-between gap-3 relative z-10 pointer-events-none mt-2 flex-grow">
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
                
                <div className="flex items-center text-[13px] font-semibold text-accent mt-auto group-hover:text-[#F06A4F] transition-all">
                  View Case Study <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
