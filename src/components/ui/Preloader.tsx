"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sequence = [
  "BUILDING DIGITAL EXPERIENCES",
  "डिजिटल अनुभव तैयार हो रहे हैं",
  "ENGINEERING IDEAS",
  "आइडिया को हकीकत में बदल रहे हैं",
];

const GREETING_STEP_MS = 100; 
const EXIT_DURATION = 0.8; 

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"black" | "brand" | "sequence" | "final" | "exit" | "done">("black");
  const [showPreloader, setShowPreloader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("deadcode-preloader-seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasSeen && !prefersReducedMotion) {
      setTimeout(() => setShowPreloader(true), 0);
      document.body.style.overflow = "hidden";
      sessionStorage.setItem("deadcode-preloader-running", "true");
    } else {
      sessionStorage.setItem("deadcode-preloader-seen", "true");
    }
    setIsMounted(true);
  }, []);

  // Timer sequence for main phases
  useEffect(() => {
    if (!showPreloader) return;

    let timeout: NodeJS.Timeout;

    if (phase === "black") {
      timeout = setTimeout(() => setPhase("brand"), 300);
    } else if (phase === "brand") {
      timeout = setTimeout(() => setPhase("sequence"), 400);
    } else if (phase === "final") {
      timeout = setTimeout(() => setPhase("exit"), 350);
    }

    return () => clearTimeout(timeout);
  }, [phase, showPreloader]);

  // Sequence step timer
  useEffect(() => {
    if (!showPreloader || phase !== "sequence") return;

    if (index >= sequence.length) {
      setTimeout(() => setPhase("final"), 0);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, GREETING_STEP_MS);

    return () => clearTimeout(timeout);
  }, [index, showPreloader, phase]);

  // Exit sequence
  const handleExitComplete = useCallback(() => {
    if (phase === "exit") {
      setPhase("done");
      setShowPreloader(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("deadcode-preloader-seen", "true");
      sessionStorage.removeItem("deadcode-preloader-running");
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const timeout = setTimeout(() => {
      handleExitComplete();
    }, EXIT_DURATION * 1000 + 50);
    return () => clearTimeout(timeout);
  }, [phase, handleExitComplete]);

  if (!isMounted) return null;
  if (phase === "done" && !showPreloader) return null;

  return (
    <AnimatePresence>
      {(showPreloader || phase === "exit") && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto"
          style={{ height: "100dvh" }}
        >
          {/* Solid Black background layer until exit */}
          {phase !== "exit" && <div className="absolute inset-0 bg-[#F3EDE5]" />}

          {/* Curved SVG wipe exit */}
          {phase === "exit" && (
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Solid part of the glass sheet */}
              <div className="w-full h-full bg-[#F3EDE5]" />
              {/* The trailing curve */}
              <svg
                className="w-full h-[15vh] fill-[#F3EDE5] translate-y-[-1px]"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M 0 0 L 100 0 L 100 0 Q 50 100 0 0 Z" />
              </svg>
            </motion.div>
          )}

          {/* Multilingual sequence */}
          {phase === "sequence" && (
            <div className="relative flex items-center justify-center w-full h-24 z-10 text-[#3B2A21] px-4 text-center">
              <AnimatePresence mode="wait">
                {index < sequence.length && (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.12,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className={`absolute font-medium tracking-tight select-none text-2xl sm:text-3xl md:text-4xl ${index % 2 !== 0 ? 'font-sans' : 'font-display uppercase tracking-widest'}`}
                  >
                    {sequence[index]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* DEADCODE LABS reveal */}
          {(phase === "brand" || phase === "final") && (
            <div className="relative flex items-center justify-center w-full h-24 z-10 text-[#3B2A21]">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="text-center"
              >
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#C96F3D] block mb-2 font-semibold">
                  DIGITAL PRODUCT STUDIO
                </span>
                <span className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#3B2A21]">
                  DEADCODE LABS
                </span>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
