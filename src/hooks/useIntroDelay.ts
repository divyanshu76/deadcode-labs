"use client";

import { useSyncExternalStore } from "react";

/** Seconds the first-visit preloader occupies before page content animates in. */
export const PRELOADER_DURATION_S = 2.6;

const NOT_READY = -1;

const subscribe = () => () => {};

/** performance.now() (seconds) when the client first resolved the intro timing. */
let introOrigin: number | null = null;

function readDelay(): number {
  if (introOrigin === null) introOrigin = performance.now() / 1000;
  try {
    const hasSeen = sessionStorage.getItem("deadcode-preloader-seen") === "true";
    const isRunning = sessionStorage.getItem("deadcode-preloader-running") === "true";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return isRunning || (!hasSeen && !reduced) ? PRELOADER_DURATION_S : 0;
  } catch {
    return 0;
  }
}

/**
 * Entrance timing that waits for the preloader on first visit.
 * The server snapshot reports "not ready", so the initial client render
 * matches the server markup and entrance animations start after hydration.
 */
export function useIntroDelay() {
  const value = useSyncExternalStore(subscribe, readDelay, () => NOT_READY);
  const isReady = value !== NOT_READY;
  const delay = Math.max(value, 0);
  /** Absolute performance.now() seconds at which entrances should start. */
  const entranceAt = isReady ? (introOrigin ?? 0) + delay : 0;
  return { isReady, delay, entranceAt };
}
