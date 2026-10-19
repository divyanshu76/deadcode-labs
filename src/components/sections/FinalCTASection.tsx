"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Social links — sourced from Footer to keep a single source of truth
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/divyanshuverma09/",
  },
  {
    label: "GitHub",
    href: "https://github.com/divyanshu76",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/truly_divyanshu/",
  },
] as const;

function scrollToEstimator() {
  // Prefer the #start-a-project alias, fall back to #start-project
  const target =
    document.getElementById("start-a-project") ??
    document.getElementById("start-project");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function FinalCTASection() {
  return (
    <section
      className="relative py-16 md:py-24 z-10 text-charcoal overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto glass-dark signal-glow metal-edge rounded-[32px] md:rounded-[40px] px-6 py-12 sm:p-10 md:p-20 lg:p-24 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Concentric orbit rings echoing the hero assembly */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="absolute w-[520px] h-[520px] md:w-[760px] md:h-[760px] rounded-full border border-silver/50 [transform:rotateX(68deg)]" />
            <div className="absolute w-[400px] h-[400px] md:w-[580px] md:h-[580px] rounded-full border border-silver/40 [transform:rotateX(68deg)_rotateZ(24deg)]" />
            <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(192,192,192,0.16),transparent_65%)]" />
          </div>
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Eyebrow */}
            <p className="chapter-label mb-5 md:mb-6">
              11 — READY WHEN YOU ARE
            </p>

            {/* Heading */}
            <h2
              id="final-cta-heading"
              className="font-display font-bold tracking-tight text-charcoal mb-5 md:mb-7 leading-[0.92]"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
              }}
            >
              Let&apos;s build
              <br />
              something.
            </h2>

            {/* Supporting text */}
            <p className="text-base md:text-lg text-ink-soft max-w-md leading-relaxed mb-8 md:mb-12 font-light">
              Have a project in mind? Tell us what you&apos;re building and let&apos;s turn it into
              something useful.
            </p>

            {/* Primary CTA */}
            <button
              type="button"
              id="final-cta-start-project"
              onClick={scrollToEstimator}
              className="group inline-flex items-center gap-2 px-7 md:px-8 h-[50px] md:h-[54px]
                         bg-signal text-white text-sm md:text-base font-semibold
                         rounded-full border border-white/45
                         backdrop-blur-[18px] saturate-125
                         shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_30px_rgba(225,6,0,0.22)]
                         transition-all duration-300
                         hover:-translate-y-[2px] hover:bg-signal-dark
                         hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_40px_rgba(225,6,0,0.32)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60
                         focus-visible:ring-offset-2 mb-10 md:mb-12"
            >
              Start a Project
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-silver/40 mb-6 md:mb-8" aria-hidden="true" />

            {/* Direct contact */}
            <p className="text-xs md:text-sm font-mono text-ink-muted mb-3 tracking-wide">
              Prefer a direct conversation?
            </p>
            <a
              href="mailto:contact@deadcode.space"
              className="group relative inline-flex items-center gap-3 text-base md:text-xl font-light
                         text-ink-soft hover:text-charcoal transition-colors duration-300
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal/50 rounded"
              aria-label="Send email to contact@deadcode.space"
            >
              <span
                className="relative pb-1 border-b border-silver/40
                           group-hover:border-signal transition-colors duration-300"
              >
                contact@deadcode.space
              </span>
              <ArrowRight
                className="h-4 w-4 md:h-5 md:w-5 text-signal opacity-0 -translate-x-3
                           group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                aria-hidden="true"
              />
            </a>

            {/* Social links */}
            <div
              className="flex items-center gap-5 md:gap-7 mt-8 md:mt-10"
              aria-label="Social links"
            >
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm font-mono text-ink-muted hover:text-charcoal
                             transition-colors duration-200 underline-offset-4 hover:underline
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal/50 rounded"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
