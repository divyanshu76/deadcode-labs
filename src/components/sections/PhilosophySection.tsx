"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { EASE_OUT_EXPO } from "@/lib/motion";

const DISCIPLINES = ["Web", "E-Commerce", "Web Apps", "AI Products", "Automation", "SaaS"];

/**
 * A visual pause after the hero: one editorial statement (the studio's own
 * description), a technical annotation, and the silver line that carries the
 * hero's motif down into the light chapters.
 */
export function PhilosophySection() {
  return (
    <section aria-labelledby="philosophy-heading" className="relative z-10 pt-4 pb-20 md:pb-28">
      {/* The hero's silver line continues into the editorial canvas */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        className="mx-auto w-px h-20 md:h-28 origin-top bg-linear-to-b from-silver to-transparent"
      />

      <Container className="mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-3">
            <span className="chapter-label">02 — The Studio</span>
          </div>

          <motion.h2
            id="philosophy-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className="lg:col-span-9 font-display text-charcoal tracking-[-0.015em] leading-[1.02] text-[length:clamp(34px,6vw,84px)] [text-wrap:balance]"
          >
            A boutique digital product studio crafting <span className="italic text-silver-dark">high-end software</span>, platforms, and experiences.
          </motion.h2>
        </div>

        <div className="metal-rule mt-12 md:mt-16" aria-hidden="true" />

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted"
        >
          {DISCIPLINES.map((d, i) => (
            <li key={d} className="flex items-center gap-3">
              <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
              {d}
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
