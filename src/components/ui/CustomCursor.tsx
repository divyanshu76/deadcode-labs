"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);

  // References for direct DOM manipulation to bypass React state for high-frequency updates
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // State variables for animation loop
  const position = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const isVisible = useRef(false);
  const isHovering = useRef(false);
  const isProjectHover = useRef(false);

  useEffect(() => {
    // Check if device is fine pointer (desktop)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!mediaQuery.matches || prefersReducedMotion) {
      setIsMobile(true);
      return;
    }
    
    setIsMobile(false);
    
    const onMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        updateStyles();
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      updateStyles();
    };
    
    const onMouseEnter = () => {
      isVisible.current = true;
      updateStyles();
    };

    const updateStyles = () => {
      if (!cursorRef.current || !dotRef.current) return;
      
      const v = isVisible.current;
      const h = isHovering.current;
      const p = isProjectHover.current;
      
      const size = p ? "60px" : h ? "52px" : "36px";
      const opacity = v ? "1" : "0";
      const borderColor = p ? "rgba(228, 87, 63, 0.4)" : "rgba(228, 87, 63, 0.65)";
      const bg = p ? "rgba(17, 22, 27, 0.5)" : "transparent";
      const blur = p ? "blur(4px)" : "none";
      
      cursorRef.current.style.width = size;
      cursorRef.current.style.height = size;
      cursorRef.current.style.opacity = opacity;
      cursorRef.current.style.borderColor = borderColor;
      cursorRef.current.style.backgroundColor = bg;
      cursorRef.current.style.backdropFilter = blur;
      
      const span = cursorRef.current.querySelector("span");
      if (span) {
        span.style.opacity = p ? "1" : "0";
      }
      
      dotRef.current.style.opacity = (v && !p) ? (h ? "0.3" : "1") : "0";
    };
    
    // Interpolation loop
    const updateCursor = () => {
      // Lerp for smooth following
      position.current.x += (targetPosition.current.x - position.current.x) * 0.2;
      position.current.y += (targetPosition.current.y - position.current.y) * 0.2;
      
      if (cursorRef.current && dotRef.current) {
        // Outer ring smooth movement
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
        // Inner dot immediate movement
        dotRef.current.style.transform = `translate3d(${targetPosition.current.x}px, ${targetPosition.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    
    requestRef.current = requestAnimationFrame(updateCursor);

    // Add global hover listeners for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], input, select, textarea");
      const projectCard = target.closest(".project-card");
      
      if (projectCard) {
        isProjectHover.current = true;
        isHovering.current = false;
      } else if (clickable) {
        isHovering.current = true;
        isProjectHover.current = false;
      } else {
        isHovering.current = false;
        isProjectHover.current = false;
      }
      updateStyles();
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []); // Empty dependency array: NEVER tears down loop!

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: "36px",
          height: "36px",
          opacity: 0,
          borderColor: "rgba(228, 87, 63, 0.65)",
          backgroundColor: "transparent",
        }}
      >
        <span 
          className="font-mono text-[9px] tracking-widest text-[#E4573F] font-bold transition-opacity duration-200"
          style={{ opacity: 0 }}
        >
          VIEW
        </span>
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#E4573F] rounded-full pointer-events-none z-[10000] transition-opacity duration-200"
        style={{ opacity: 0 }}
      />
    </>
  );
}
