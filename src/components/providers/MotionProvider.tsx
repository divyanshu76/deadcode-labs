"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * App-wide Motion settings. `reducedMotion="user"` disables transform and
 * layout animations for visitors who ask for reduced motion, while keeping
 * opacity / colour fades so content still appears.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
