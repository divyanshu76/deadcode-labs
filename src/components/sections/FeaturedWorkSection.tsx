"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, ShoppingBag, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";

export function FeaturedWorkSection() {
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="work" className="py-14 md:py-24 relative z-10">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-8">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#C96F3D] font-semibold block mb-2">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#3B2A21] leading-[1.1]">
              Selected work.
            </h2>
            <p className="text-sm md:text-base text-[#6D5A4B] mt-2 max-w-md">
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
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
              className="group flex flex-col relative premium-card p-3 md:p-5 h-full rounded-[24px] hover:-translate-y-1 transition-transform duration-500 ease-out"
            >
              {/* Project Image Area */}
              <div
                className="relative overflow-hidden rounded-[16px] border border-white/40 mb-4 md:mb-5 aspect-[16/10] transition-transform duration-700 ease-out z-0 bg-[#3B2A21]/5"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="font-display text-2xl font-bold text-[#6D5A4B]/50">{project.title}</span>
                  </div>
                )}
              </div>

              {/* Information Row */}
              <div className="flex flex-col justify-between gap-3 relative z-10 pointer-events-auto mt-2 flex-grow glass-panel rounded-[16px] p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#C96F3D] group-hover:text-[#A9512C] transition-colors">
                      {project.category}
                    </span>
                    <span className="text-[#927D6C]">•</span>
                    <span className="text-xs text-[#927D6C] font-mono">
                      {project.technology.slice(0, 3).join(", ")}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#3A2920] tracking-tight transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#6F5A4B] line-clamp-2 max-w-xl leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
                  <Link 
                    href={`/work/${project.slug}`} 
                    className="group/btn flex items-center text-[12px] md:text-[13px] font-semibold text-[#3B2A21] hover:text-[#C96F3D] transition-all bg-white/40 hover:bg-white/60 border border-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(59,42,33,0.02)]"
                  >
                    View Case Study <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </Link>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group/btn flex items-center text-[12px] md:text-[13px] font-semibold text-[#6D5A4B] hover:text-[#C96F3D] transition-all bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md px-4 py-2 rounded-full"
                    >
                      View Live Site <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
