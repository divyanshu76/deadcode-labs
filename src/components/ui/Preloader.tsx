"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/lib/motion";

const sequence = [
  "BUILDING DIGITAL EXPERIENCES",
  "डिजिटल अनुभव तैयार हो रहे हैं",
  "ENGINEERING IDEAS",
  "आइडिया को हकीकत में बदल रहे हैं",
];

/** The instrument "powers on" for this long, then the sheet lifts away. */
const BUILD_MS = 1800;
const EXIT_S = 0.8;
const STATUS_STEP_MS = BUILD_MS / sequence.length;

/**
 * First-visit preloader. Runs on a fixed timeline (≈2.6s, matching
 * PRELOADER_DURATION_S) and never waits on network, images or WebGL, so it
 * can't trap the visitor. Shown once per session; skipped for reduced motion.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    let hasSeen = false;
    let reduced = false;
    try {
      hasSeen = sessionStorage.getItem("deadcode-preloader-seen") === "true";
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      hasSeen = true;
    }

    if (hasSeen || reduced) {
      try {
        sessionStorage.setItem("deadcode-preloader-seen", "true");
      } catch {
        /* storage unavailable — nothing to remember */
      }
      return;
    }

    sessionStorage.setItem("deadcode-preloader-running", "true");
    document.body.style.overflow = "hidden";

    const timers = [
      window.setTimeout(() => setVisible(true), 0),
      ...sequence.slice(1).map((_, i) => window.setTimeout(() => setStatusIndex(i + 1), STATUS_STEP_MS * (i + 1))),
      window.setTimeout(() => setExiting(true), BUILD_MS),
      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        sessionStorage.setItem("deadcode-preloader-seen", "true");
        sessionStorage.removeItem("deadcode-preloader-running");
      }, BUILD_MS + EXIT_S * 1000 + 50),
    ];

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] pointer-events-auto"
          style={{ height: "100dvh" }}
          role="status"
          aria-label="Loading DEADCODE LABS"
        >
          {/* Charcoal sheet that lifts away with a curved trailing edge */}
          <motion.div
            className="absolute inset-0"
            initial={{ y: "0%" }}
            animate={{ y: exiting ? "-100%" : "0%" }}
            transition={{ duration: EXIT_S, ease: EASE_IN_OUT_QUART }}
          >
            <div className="w-full h-full bg-ink-950" />
            <svg className="w-full h-[15vh] fill-ink-950 -translate-y-px" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 0 0 L 100 0 L 100 0 Q 50 100 0 0 Z" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-silver-bright"
            animate={{ opacity: exiting ? 0 : 1, y: exiting ? -24 : 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            {/* Corner metadata */}
            <div className="absolute top-6 left-6 right-6 flex justify-between font-mono text-[10px] tracking-[0.24em] uppercase text-silver-dark">
              <span>Digital Product Studio</span>
              <span className="hidden sm:inline">Mirzapur / Remote</span>
            </div>

            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight"
            >
              DEADCODE <span className="italic text-silver">LABS</span>
            </motion.span>

            {/* Silver progress line with a red signal riding its tip */}
            <div className="relative mt-8 w-[min(280px,70vw)] h-px bg-white/10 overflow-visible">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-linear-to-r from-silver-dark via-silver to-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: BUILD_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-signal shadow-[0_0_12px_rgba(225,6,0,0.8)]"
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: BUILD_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>

            {/* Multilingual status line */}
            <div className="relative mt-5 h-5 w-full flex justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  lang={statusIndex % 2 ? "hi" : undefined}
                  className={`absolute text-[11px] tracking-[0.2em] text-silver-dark ${statusIndex % 2 ? "font-sans tracking-normal" : "font-mono uppercase"}`}
                >
                  {sequence[statusIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
