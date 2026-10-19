import { cn } from "@/lib/utils";
import { motion } from "motion/react";

/**
 * Shared gradient defs for the machined-metal isometric faces.
 * Each SVG gets its own id prefix so multiple instances never collide.
 */
function MetalDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D9D9D9" />
      </linearGradient>
      <linearGradient id={`${id}-left`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CFCFCF" />
        <stop offset="100%" stopColor="#A8A8A8" />
      </linearGradient>
      <linearGradient id={`${id}-right`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9C9C9C" />
        <stop offset="100%" stopColor="#6E6E6E" />
      </linearGradient>
      <linearGradient id={`${id}-signal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF3B30" />
        <stop offset="100%" stopColor="#E10600" />
      </linearGradient>
    </defs>
  );
}

export function IsometricBox01({ className = "" }: { className?: string }) {
  const id = "iso-box-01";
  return (
    <div className={cn("relative", className)}>
      <motion.svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <MetalDefs id={id} />
        <g transform="translate(100, 50)">
          <path d="M0 0 L60 30 L0 60 L-60 30 Z" fill={`url(#${id}-top)`} stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
          <path d="M-60 30 L0 60 L0 130 L-60 100 Z" fill={`url(#${id}-left)`} stroke="rgba(42,42,42,0.12)" strokeWidth="1" />
          <path d="M0 60 L60 30 L60 100 L0 130 Z" fill={`url(#${id}-right)`} stroke="rgba(42,42,42,0.12)" strokeWidth="1" />
          <path d="M0 15 L30 30 L0 45 L-30 30 Z" fill={`url(#${id}-signal)`} opacity="0.9" />
        </g>
      </motion.svg>
    </div>
  );
}

function IsoCube({ id, x, y, delay, highlight = false }: { id: string; x: number; y: number; delay: number; highlight?: boolean }) {
  return (
    <motion.g
      initial={{ x, y }}
      variants={{ hover: { y: y - 5, x: x + 2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay }}
    >
      <path
        d="M0 0 L20 10 L0 20 L-20 10 Z"
        fill={highlight ? `url(#${id}-signal)` : `url(#${id}-top)`}
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="0.5"
      />
      <path d="M-20 10 L0 20 L0 40 L-20 30 Z" fill={`url(#${id}-left)`} stroke="rgba(42,42,42,0.12)" strokeWidth="0.5" />
      <path d="M0 20 L20 10 L20 30 L0 40 Z" fill={`url(#${id}-right)`} stroke="rgba(42,42,42,0.12)" strokeWidth="0.5" />
    </motion.g>
  );
}

const PYRAMID: { x: number; y: number; delay: number; highlight?: boolean }[] = [
  // Row 4 (bottom)
  { x: -60, y: 30, delay: 0.0 },
  { x: -20, y: 50, delay: 0.01 },
  { x: 20, y: 70, delay: 0.02 },
  { x: 60, y: 90, delay: 0.03 },
  // Row 3
  { x: -40, y: 20, delay: 0.02 },
  { x: 0, y: 40, delay: 0.03 },
  { x: 40, y: 60, delay: 0.04 },
  // Row 2
  { x: -20, y: 10, delay: 0.04 },
  { x: 20, y: 30, delay: 0.05 },
  // Row 1 (peak)
  { x: 0, y: 0, delay: 0.06, highlight: true },
];

export function IsometricBoxes02({ className = "" }: { className?: string }) {
  const id = "iso-boxes-02";
  return (
    <div className={cn("relative", className)}>
      <motion.svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <MetalDefs id={id} />
        <ellipse cx="100" cy="150" rx="80" ry="8" fill="rgba(42,42,42,0.10)" />
        <motion.g
          initial={{ x: 100, y: 20 }}
          variants={{ hover: { y: 16, x: 103, scale: 1.025 } }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {PYRAMID.map((cube, i) => (
            <IsoCube key={i} id={id} {...cube} />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}
