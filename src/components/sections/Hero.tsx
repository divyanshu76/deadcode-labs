"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/three/HeroVisual";
import { useIntroDelay } from "@/hooks/useIntroDelay";
import { EASE_OUT_EXPO } from "@/lib/motion";

const STATUS = [
  { label: "Performance", value: "Excellent", accent: false },
  { label: "Experience", value: "Optimized", accent: true },
  { label: "Automation", value: "Connected", accent: false },
];

const HEADLINE = ["DIGITAL", "IDEAS,", "ENGINEERED."] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, delay, entranceAt } = useIntroDelay();

  // 0 while the hero fills the viewport → 1 once it has scrolled out.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  const reveal = (step: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay: delay + step },
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="dark-stage relative z-10 overflow-hidden lg:min-h-[max(100svh,760px)] pt-28 md:pt-32 pb-32 lg:pb-36 flex flex-col"
    >
      {/* Faint architectural grid in light lines, fading out toward the edges */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] [mask-image:radial-gradient(ellipse_at_65%_45%,black_15%,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      {/* Desktop: the sculpture fills the stage behind the typography */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <HeroVisual scrollProgress={scrollYProgress} entranceAt={entranceAt} layout="stage" />
      </div>

      <Container className="relative z-10 flex-1 flex flex-col">
        {/* Top meta row */}
        <motion.div {...reveal(0)} className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] md:text-[11px] tracking-[0.24em] uppercase text-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-signal motion-safe:animate-pulse" aria-hidden="true" />
            Digital Product &amp; Systems Studio
          </span>
          <span className="hidden md:inline font-mono text-[10.5px] tracking-[0.24em] uppercase text-ink-muted">
            Chapter 01 — The Idea
          </span>
        </motion.div>

        {/* Editorial headline: each line rises out of its own mask */}
        <h1
          aria-label="Digital ideas, engineered."
          className="font-display tracking-[-0.02em] leading-[0.86] text-ink mt-8 md:mt-12 lg:mt-14 text-[length:clamp(52px,16vw,120px)] md:text-[length:clamp(72px,11vw,104px)] lg:text-[length:clamp(84px,9.6vw,168px)]"
        >
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
              <motion.span
                className={i === 2 ? "block italic text-silver" : "block"}
                initial={{ y: "105%" }}
                animate={isReady ? { y: "0%" } : { y: "105%" }}
                transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + 0.1 + i * 0.09 }}
              >
                {i === 2 ? (
                  <>
                    ENGINEERED<span className="not-italic text-signal-bright">.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
              {/* Block lines render no gap; this keeps the words separated in the DOM text. */}
              {i < HEADLINE.length - 1 && " "}
            </span>
          ))}
        </h1>

        {/* Mobile / tablet: the sculpture gets its own stage between headline and copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: delay + 0.2 }}
          className="lg:hidden relative -mx-6 md:-mx-8 h-[min(82vw,420px)] md:h-[340px] mt-2"
        >
          <HeroVisual scrollProgress={scrollYProgress} entranceAt={entranceAt} layout="inline" />
        </motion.div>

        {/* Supporting copy, actions and system status */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="mt-6 lg:mt-auto lg:pt-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <div className="max-w-[440px]">
            <motion.p {...reveal(0.35)} className="text-base md:text-lg text-ink-soft leading-[1.6]">
              DEADCODE LABS designs and builds premium digital products, websites, e-commerce experiences and intelligent systems for ambitious businesses.
            </motion.p>
            <motion.div {...reveal(0.45)} className="flex flex-col sm:flex-row gap-3 mt-7">
              <Button size="lg" className="h-13 md:h-14 px-7 text-[15px] group" asChild>
                <Link href="/#start-project">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-13 md:h-14 px-7 text-[15px] text-silver-bright border border-white/20 bg-white/[0.04] hover:bg-white/10 hover:border-white/35"
                asChild
              >
                <Link href="/work">Explore Our Work</Link>
              </Button>
            </motion.div>
          </div>

          {/* The former status card, re-set as precise studio metadata */}
          <motion.dl {...reveal(0.55)} className="grid grid-cols-3 lg:grid-cols-1 gap-x-6 gap-y-3 lg:min-w-[240px] border-t border-white/10 pt-5 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
            {STATUS.map((item) => (
              <div key={item.label} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1 lg:gap-6">
                <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">{item.label}</dt>
                <dd className={`font-mono text-[11px] tracking-[0.12em] uppercase ${item.accent ? "text-signal-bright" : "text-silver-bright"}`}>
                  {item.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          {...reveal(0.7)}
          href="#work"
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-24 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-ink-muted hover:text-silver-bright transition-colors"
        >
          Scroll
          <span className="relative h-10 w-px bg-white/15 overflow-hidden" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-silver motion-safe:animate-[scroll-cue_2.4s_ease-in-out_infinite]" />
          </span>
        </motion.a>
      </Container>

      {/* Charcoal dissolves into the silver-white editorial canvas below */}
      <div className="absolute inset-x-0 -bottom-px h-28 bg-linear-to-b from-transparent to-[var(--bg-primary)] pointer-events-none z-10" aria-hidden="true" />
    </section>
  );
}
