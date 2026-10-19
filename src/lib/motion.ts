import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Short, decisive entrances; springs only where
 * something physically responds to the pointer.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT_QUART: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
} as const;

/** Gentle spring for hover elevation and tilt — no visible bounce. */
export const SOFT_SPRING: Transition = { type: "spring", stiffness: 220, damping: 26, mass: 0.6 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT_EXPO } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
