"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: any;
}

export function RandomLetterSwap({ label, className, staggerDuration = 0.025, transition }: RandomLetterSwapProps) {
  const [hovered, setHovered] = useState(false);
  const [displayText, setDisplayText] = useState(label);

  useEffect(() => {
    if (!hovered) {
      setDisplayText(label);
      return;
    }

    let iterations = 0;
    const maxIterations = label.length + 5;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        label
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iterations - 5) return label[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iterations += 1;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayText(label);
      }
    }, staggerDuration * 1000);

    return () => {
      clearInterval(interval);
      setDisplayText(label);
    };
  }, [hovered, label, staggerDuration]);

  return (
    <motion.span
      className={className}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      transition={transition}
      layout
    >
      {displayText}
    </motion.span>
  );
}
