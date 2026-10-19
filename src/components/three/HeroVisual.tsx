"use client";

import { Component, useCallback, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { HeroSceneFallback } from "./HeroSceneFallback";

// Three.js + R3F live in their own chunk and never run on the server.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

interface DeviceCaps {
  webgl: boolean;
  finePointer: boolean;
  lowPower: boolean;
}

let cachedCaps: DeviceCaps | null = null;

function detectCaps(): DeviceCaps {
  if (cachedCaps) return cachedCaps;
  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }
  const nav = navigator as Navigator & { deviceMemory?: number };
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const lowPower =
    !finePointer ||
    window.innerWidth < 768 ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4;
  cachedCaps = { webgl, finePointer, lowPower };
  return cachedCaps;
}

const noopSubscribe = () => () => {};

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

class SceneErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

interface HeroVisualProps {
  scrollProgress: MotionValue<number>;
  /** performance.now() in seconds at which the entrance should begin. */
  entranceAt: number;
  /** "stage": full-bleed behind the headline, sculpture offset right. "inline": its own centred block. */
  layout?: "stage" | "inline";
  className?: string;
}

export function HeroVisual({ scrollProgress, entranceAt, layout = "inline", className }: HeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const caps = useSyncExternalStore(noopSubscribe, detectCaps, () => null);
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true
  );
  const reducedMotion = useReducedMotion() ?? false;
  const hasEnteredView = useInView(containerRef, { once: true, margin: "200px" });
  const inView = useInView(containerRef, { margin: "50px" });

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);

  const showScene = Boolean(caps?.webgl) && !failed && hasEnteredView;
  const sceneVisible = showScene && ready;

  return (
    <div
      ref={containerRef}
      // Plinth and light rods fade into the page instead of being cut by the canvas edges.
      className={cn("absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_7%,black_72%,transparent_98%)]", className)}
      aria-hidden="true"
    >
      <HeroSceneFallback
        layout={layout}
        className={cn("transition-opacity duration-700 ease-out", sceneVisible ? "opacity-0" : "opacity-100")}
      />
      {showScene && caps && (
        <SceneErrorBoundary onError={handleFailure}>
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              sceneVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <HeroScene
              scrollProgress={scrollProgress}
              active={inView && pageVisible}
              reducedMotion={reducedMotion}
              interactive={caps.finePointer}
              quality={caps.lowPower ? "low" : "high"}
              entranceAt={entranceAt}
              layout={layout}
              onReady={handleReady}
              onContextLost={handleFailure}
            />
          </div>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
