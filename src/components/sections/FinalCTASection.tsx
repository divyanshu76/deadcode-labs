"use client";

import { motion } from "framer-motion";
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
      className="relative py-16 md:py-24 z-10 text-[#3B2A21] overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto glass-elevated rounded-[40px] p-10 md:p-20 lg:p-24 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(116,88,66,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(116,88,66,0.1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Eyebrow */}
            <p className="text-[#C96F3D] font-mono text-xs tracking-[0.25em] uppercase mb-6 md:mb-8 font-semibold">
              READY WHEN YOU ARE
            </p>

            {/* Heading */}
            <h2
              id="final-cta-heading"
              className="font-display font-bold tracking-tight text-[#3B2A21] mb-5 md:mb-7 leading-[0.92]"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
              }}
            >
              Let&apos;s build
              <br />
              something.
            </h2>

            {/* Supporting text */}
            <p className="text-base md:text-lg text-[#6D5A4B] max-w-md leading-relaxed mb-8 md:mb-12 font-light">
              Have a project in mind? Tell us what you&apos;re building and let&apos;s turn it into
              something useful.
            </p>

            {/* Primary CTA */}
            <button
              type="button"
              id="final-cta-start-project"
              onClick={scrollToEstimator}
              className="group inline-flex items-center gap-2 px-7 md:px-8 h-[50px] md:h-[54px]
                         bg-[rgba(201,111,61,0.76)] text-[#FFF9F2] text-sm md:text-base font-semibold
                         rounded-full border border-white/45
                         backdrop-blur-[18px] saturate-125
                         shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_30px_rgba(201,111,61,0.20)]
                         transition-all duration-300
                         hover:-translate-y-[2px] hover:bg-[rgba(201,111,61,0.86)]
                         hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_40px_rgba(201,111,61,0.30)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F3D]/60
                         focus-visible:ring-offset-2 mb-10 md:mb-12"
            >
              Start a Project
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-[#B5A090]/40 mb-6 md:mb-8" aria-hidden="true" />

            {/* Direct contact */}
            <p className="text-xs md:text-sm font-mono text-[#927D6C] mb-3 tracking-wide">
              Prefer a direct conversation?
            </p>
            <a
              href="mailto:divyanshuv0905@gmail.com"
              className="group relative inline-flex items-center gap-3 text-base md:text-xl font-light
                         text-[#6D5A4B] hover:text-[#3B2A21] transition-colors duration-300
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C96F3D]/50 rounded"
              aria-label="Send email to divyanshuv0905@gmail.com"
            >
              <span
                className="relative pb-1 border-b border-[#B5A090]/40
                           group-hover:border-[#C96F3D] transition-colors duration-300"
              >
                divyanshuv0905@gmail.com
              </span>
              <ArrowRight
                className="h-4 w-4 md:h-5 md:w-5 text-[#C96F3D] opacity-0 -translate-x-3
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
                  className="text-xs md:text-sm font-mono text-[#927D6C] hover:text-[#3B2A21]
                             transition-colors duration-200 underline-offset-4 hover:underline
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C96F3D]/50 rounded"
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
