"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    enter: { x: 0, transition: { duration: 0.65, ease: easeCurve } },
    exit: { x: "100%", transition: { duration: 0.55, ease: easeCurve } },
  };

  const curve = {
    initial: {
      d: `M100 0 L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`,
    },
    enter: {
      d: `M100 0 L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`,
      transition: { duration: 0.65, ease: easeCurve },
    },
    exit: {
      d: `M100 0 L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  const linkContainerVariants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, x: 30 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeCurve } },
    exit: { opacity: 0, x: 15, transition: { duration: 0.2, ease: easeCurve } },
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
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 z-[1900] bg-[#3B2A21]/30 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 h-[100dvh] w-full max-w-[320px] sm:max-w-sm glass-elevated z-[2000] lg:hidden flex flex-col justify-between p-6 sm:p-8 border-l border-white/60 rounded-l-2xl rounded-r-none"
          >
            {/* SVG Curve */}
            <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-[rgba(255,255,255,0.60)] stroke-none z-0">
              {windowHeight > 0 && <motion.path variants={curve} initial="initial" animate="enter" exit="exit" className="fill-[rgba(255,255,255,0.60)]" />}
            </svg>

            <div className="flex flex-col h-full justify-between relative z-10 pt-16">
              {/* Nav Links */}
              <motion.div 
                variants={linkContainerVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="flex flex-col space-y-4 my-auto py-6 items-start text-left w-full"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants} className="w-full">
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group flex items-center justify-start text-left font-display text-[26px] sm:text-[30px] font-semibold tracking-tight text-[#3B2A21] hover:text-[#C96F3D] hover:translate-x-1 transition-all duration-200 leading-[1.1] py-1"
                    >
                      {link.name.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social & Contact Footer */}
              <motion.div 
                variants={{
                  initial: { opacity: 0 },
                  enter: { opacity: 1, transition: { delay: 0.4, duration: 0.5 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } }
                }}
                initial="initial"
                animate="enter"
                exit="exit"
                className="border-t border-white/40 pt-6 space-y-4 text-left w-full"
              >
                <div className="flex items-center justify-start space-x-6 text-[#6D5A4B]">
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
                    className="hover:text-[#C96F3D] transition-colors text-[13px] font-mono"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/divyanshuverma09/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C96F3D] transition-colors text-[13px] font-mono"
                  >
                    LinkedIn
                  </a>
                </div>
                <p className="text-[12px] font-mono text-[#927E6E]">
                  Studio Office · Lucknow / Global Edge
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
