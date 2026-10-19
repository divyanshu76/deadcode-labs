"use client";

import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Case-study gallery: alternating asymmetric editorial rows. Every project
 * name and link is always visible — nothing depends on hover.
 */
export function FeaturedWorkSection() {
  const displayProjects = projects.slice(0, 4);
  const total = String(displayProjects.length).padStart(2, "0");

  return (
    <section id="work" className="py-16 md:py-28 relative z-10">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
          <div>
            <span className="chapter-label mb-4">03 — PORTFOLIO ARCHIVE</span>
            <h2 className="font-display text-[length:clamp(44px,7vw,96px)] tracking-[-0.02em] text-charcoal leading-[0.98]">
              Selected <span className="italic text-silver-dark">work.</span>
            </h2>
            <p className="text-sm md:text-base text-ink-soft mt-4 max-w-md">
              Real commercial products, platforms, and digital systems built with architectural rigor.
            </p>
          </div>
          <Button variant="outline" className="group text-sm" asChild>
            <Link href="/work">
              View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {displayProjects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={project.slug}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
              >
                {/* Image: revealed through a rising clip mask */}
                <motion.div
                  initial={{ clipPath: "inset(18% 0% 0% 0% round 24px)", opacity: 0.4 }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
                  className={cn(
                    "relative lg:col-span-7 aspect-[16/10] rounded-[24px] overflow-hidden bg-ink-850/5 metal-edge shadow-[0_30px_70px_rgba(28,28,28,0.18)]",
                    reversed && "lg:order-2"
                  )}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} ${project.category.toLowerCase()} project`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-3xl text-ink-muted">{project.title}</span>
                    </div>
                  )}
                </motion.div>

                {/* Editorial metadata */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT_EXPO }}
                  className={cn("lg:col-span-5", reversed && "lg:order-1")}
                >
                  <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] uppercase">
                    <span className="text-charcoal">
                      {String(index + 1).padStart(2, "0")} <span className="text-ink-muted">/ {total}</span>
                    </span>
                    <span className="h-px flex-1 bg-silver/70" aria-hidden="true" />
                  </div>

                  <h3 className="font-display text-[length:clamp(40px,5vw,72px)] leading-none tracking-[-0.02em] text-charcoal mt-6">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal mt-4">{project.category}</p>
                  <p className="text-[15px] md:text-base text-ink-soft leading-relaxed mt-4 max-w-md">{project.shortDescription}</p>

                  <dl className="mt-6 pt-5 border-t border-silver/60 flex gap-3 font-mono text-[11px] text-ink-muted">
                    <dt className="uppercase tracking-[0.16em]">Stack</dt>
                    <dd className="text-ink-soft">{project.technology.slice(0, 3).join(" · ")}</dd>
                  </dl>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
                    <Link
                      href={`/work/${project.slug}`}
                      className="group/btn inline-flex items-center gap-2 text-[14px] font-semibold text-charcoal border-b border-charcoal/30 pb-1 hover:border-signal hover:text-signal transition-colors"
                    >
                      View Case Study
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft hover:text-signal transition-colors"
                      >
                        View Live Site
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
