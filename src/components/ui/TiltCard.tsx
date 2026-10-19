"use client";

import { useRef, type ComponentProps, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const TILT_SPRING = { stiffness: 180, damping: 22, mass: 0.6 };

type TiltCardProps = Omit<ComponentProps<typeof motion.div>, "children"> & {
  children?: ReactNode;
  /** Maximum rotation in degrees at the card's edge. Keep small — this is depth, not a gimmick. */
  maxTilt?: number;
  /** Render the pointer-following specular sheen. */
  sheen?: boolean;
};

/**
 * Card with restrained dimensional response. Mouse users get a small
 * perspective tilt and a moving highlight; every input gets a gentle lift on
 * hover / keyboard focus; reduced-motion users get no tilt.
 *
 * The lift uses the standalone CSS `translate` property so it never competes
 * with the `transform` Framer Motion writes for reveals and tilt.
 */
export function TiltCard({
  maxTilt = 4,
  sheen = true,
  className,
  style,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), TILT_SPRING);
  const rotateY = useSpring(useMotionValue(0), TILT_SPRING);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || reducedMotion) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * maxTilt);
    rotateX.set(-(py - 0.5) * 2 * maxTilt);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      {...props}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "group relative [translate:0_var(--lift,0px)] transition-[translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:[--lift:-4px] motion-safe:focus-within:[--lift:-4px]",
        className
      )}
    >
      {children}
      {sheen && <span className="tilt-sheen" aria-hidden="true" />}
    </motion.div>
  );
}
