"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Global ambient layer behind every page: cool moonlit light pools plus
 * faint silver technical linework that echoes the hero's orbit wire.
 * One fixed, GPU-cheap layer (CSS + SVG) — no per-section WebGL.
 */
export function BackgroundSpheres() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Linework drifts slower than content for depth; disabled for reduced motion.
  const drift = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const counterDrift = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Moonlit light pools */}
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] max-w-[820px] max-h-[820px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0)_65%)]" />
      <div className="absolute top-[30%] right-[-15%] w-[50vw] h-[50vw] max-w-[760px] max-h-[760px] rounded-full bg-[radial-gradient(circle,rgba(192,192,192,0.32),rgba(192,192,192,0)_65%)]" />
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.6),rgba(255,255,255,0)_60%)]" />

      {/* Technical linework: orbit arcs and measurement ticks */}
      <motion.svg
        style={reducedMotion ? undefined : { y: drift }}
        className="absolute -right-[20vw] top-[8vh] w-[90vw] max-w-[1300px] h-auto opacity-60"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <ellipse cx="500" cy="500" rx="470" ry="210" transform="rotate(-18 500 500)" stroke="#C0C0C0" strokeOpacity="0.55" strokeWidth="1" />
        <ellipse cx="500" cy="500" rx="360" ry="150" transform="rotate(-18 500 500)" stroke="#C0C0C0" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx="912" cy="402" r="3" fill="#E10600" fillOpacity="0.55" />
      </motion.svg>
      <motion.svg
        style={reducedMotion ? undefined : { y: counterDrift }}
        className="absolute -left-[25vw] top-[55vh] w-[80vw] max-w-[1100px] h-auto opacity-50"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <ellipse cx="500" cy="500" rx="460" ry="190" transform="rotate(14 500 500)" stroke="#C0C0C0" strokeOpacity="0.5" strokeWidth="1" />
        <path d="M40 520 H120 M40 540 H90 M40 560 H120 M40 580 H90" stroke="#A8A8A8" strokeOpacity="0.5" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}
