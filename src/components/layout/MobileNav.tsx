"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export function MobileNav({
  isOpen,
  onClose,
  navLinks,
}: {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
}) {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const easeCurve: [number, number, number, number] = [0.76, 0, 0.24, 1];

  const slide = {
    initial: { x: "100%" },
    enter: { x: 0, transition: { duration: 0.5, ease: easeCurve } },
    exit: { x: "100%", transition: { duration: 0.4, ease: easeCurve } },
  };

  const curve = {
    initial: {
      d: `M100 0 L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`,
    },
    enter: {
      d: `M100 0 L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`,
      transition: { duration: 0.8, ease: easeCurve },
    },
    exit: {
      d: `M100 0 L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`,
      transition: { duration: 0.8, ease: easeCurve },
    },
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      onClose();
      setTimeout(() => {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1900] bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 h-dvh w-full max-w-[320px] sm:max-w-sm bg-[#151C22] z-[2000] shadow-[-10px_0_40px_rgba(0,0,0,0.5)] lg:hidden flex flex-col justify-between p-6 sm:p-8 border-l border-white/10"
          >
            {/* SVG Curve */}
            <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-[#151C22] stroke-none z-0">
              {windowHeight > 0 && <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />}
            </svg>

            <div className="flex flex-col h-full justify-between relative z-10">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 pt-2">
                <span className="font-bold text-lg tracking-tight text-foreground leading-tight">
                  DEADCODE<span className="text-accent">.</span><br/>LABS
                </span>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F1EC] hover:text-accent hover:bg-white/10 transition-colors z-[2100]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col space-y-5 my-auto py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group flex items-center gap-4 font-display text-[28px] sm:text-[32px] font-semibold tracking-tight text-foreground hover:text-accent hover:translate-x-1 transition-all duration-200 leading-[1.1] py-1"
                  >
                    {link.name.toUpperCase()}
                  </Link>
                ))}
              </div>

              {/* Social & Contact Footer */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex items-center space-x-6 text-secondary">
                  <a
                    href="https://github.com/divyanshu76"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors text-[13px] font-mono"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/truly_divyanshu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors text-[13px] font-mono"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/divyanshuverma09/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors text-[13px] font-mono"
                  >
                    LinkedIn
                  </a>
                </div>
                <p className="text-[12px] font-mono text-secondary">
                  Studio Office · Lucknow / Global Edge
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
