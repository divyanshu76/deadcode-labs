"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isProjectHover, setIsProjectHover] = useState(false);

  // References for direct DOM manipulation to bypass React state for high-frequency updates
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // State variables for animation loop
  const position = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

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
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    
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
        setIsProjectHover(true);
        setIsHovering(false);
      } else if (clickable) {
        setIsHovering(true);
        setIsProjectHover(false);
      } else {
        setIsHovering(false);
        setIsProjectHover(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border transition-all duration-300 ease-out flex items-center justify-center`}
        style={{
          width: isProjectHover ? "60px" : isHovering ? "52px" : "36px",
          height: isProjectHover ? "60px" : isHovering ? "52px" : "36px",
          opacity: isVisible ? 1 : 0,
          borderColor: isProjectHover ? "rgba(228, 87, 63, 0.4)" : "rgba(228, 87, 63, 0.65)",
          backgroundColor: isProjectHover ? "rgba(17, 22, 27, 0.5)" : "transparent",
          backdropFilter: isProjectHover ? "blur(4px)" : "none",
        }}
      >
        <span 
          className="font-mono text-[9px] tracking-widest text-[#E4573F] font-bold transition-opacity duration-200"
          style={{ opacity: isProjectHover ? 1 : 0 }}
        >
          VIEW
        </span>
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#E4573F] rounded-full pointer-events-none z-[10000] transition-opacity duration-200"
        style={{
          opacity: isVisible && !isProjectHover ? (isHovering ? 0.3 : 1) : 0,
        }}
      />
    </>
  );
}
