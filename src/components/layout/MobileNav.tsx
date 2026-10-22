"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

/** Drawer surface colour, shared by the panel and its curved leading edge so they read as one sheet. */
const SHEET = "rgba(17, 20, 24, 0.97)";

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export function MobileNav({
  isOpen,
  onClose,
  navLinks,
}: {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
}) {
  const windowHeight = useSyncExternalStore(subscribeResize, () => window.innerHeight, () => 0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Move focus into the drawer when it opens, and keep Tab cycling inside it
  // (plus the toggle button, which doubles as the visible close control).
  useEffect(() => {
    if (!isOpen) return;
    const focusFirst = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus(), 350);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const toggle = document.querySelector<HTMLElement>("[data-nav-toggle]");
      const items = [
        ...(toggle ? [toggle] : []),
        ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button")),
      ];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
      transition: { staggerChildren: 0.06, delayChildren: 0.22 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, x: 24 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeCurve } },
    exit: { opacity: 0, x: 12, transition: { duration: 0.2, ease: easeCurve } },
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
            className="fixed inset-0 z-[1900] bg-obsidian/70 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
            style={{ backgroundColor: SHEET }}
            className="fixed right-0 top-0 h-[100dvh] w-full max-w-[320px] sm:max-w-sm z-[2000] lg:hidden flex flex-col justify-between p-6 sm:p-8 border-l border-white/[0.06] shadow-[-30px_0_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            {/* Curved leading edge, same sheet colour as the panel */}
            <svg className="absolute top-0 left-[-99px] w-[100px] h-full stroke-none z-0 pointer-events-none" style={{ fill: SHEET }} aria-hidden="true">
              {windowHeight > 0 && <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />}
            </svg>

            {/* Faint red light pooling at the base of the sheet */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(90%_40%_at_100%_100%,rgba(225,6,0,0.14),transparent_70%)]" aria-hidden="true" />

            <div className="flex flex-col h-full justify-between relative z-10 pt-16">
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink-muted">Navigation</span>

              {/* Nav Links */}
              <motion.nav
                aria-label="Mobile"
                variants={linkContainerVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="flex flex-col my-auto py-6 items-start text-left w-full"
              >
                {navLinks.map((link, i) => (
                  <motion.div key={link.name} variants={linkVariants} className="w-full border-b border-white/[0.06] last:border-b-0">
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group flex items-baseline gap-4 py-3 font-display text-[28px] sm:text-[32px] tracking-tight text-ink hover:text-signal-bright focus-visible:text-signal-bright transition-colors duration-200 leading-[1.1]"
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] text-signal-bright/80 translate-y-[-0.4em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Social & Contact Footer */}
              <motion.div
                variants={{
                  initial: { opacity: 0 },
                  enter: { opacity: 1, transition: { delay: 0.45, duration: 0.5 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } }
                }}
                initial="initial"
                animate="enter"
                exit="exit"
                className="border-t border-white/10 pt-6 space-y-4 text-left w-full"
              >
                <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-ink-soft">
                  <a
                    href="https://github.com/divyanshu76"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal-bright transition-colors text-[13px] font-mono"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/truly_divyanshu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal-bright transition-colors text-[13px] font-mono"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/divyanshuverma09/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal-bright transition-colors text-[13px] font-mono"
                  >
                    LinkedIn
                  </a>
                </div>
                <p className="text-[12px] font-mono text-ink-muted">
                  Mirzapur, India · Remote / International
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
