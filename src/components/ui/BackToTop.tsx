"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed right-6 z-50 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-surface text-foreground border border-border rounded-full shadow-[0_6px_20px_rgba(21,21,26,0.08)] hover:bg-surface-lavender hover:text-accent hover:border-accent/40 active:scale-95 transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
      }`}
      style={{
        bottom: "calc(82px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
