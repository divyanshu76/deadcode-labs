"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => {
    setMobileMenuOpen(false);
    // Return focus to the toggle so keyboard users keep their place.
    toggleRef.current?.focus();
  };

  const [isReady, setIsReady] = useState(false);
  const [baseDelay, setBaseDelay] = useState(0);

  useEffect(() => {
    const isRunning = sessionStorage.getItem("deadcode-preloader-running") === "true";
    const hasSeen = sessionStorage.getItem("deadcode-preloader-seen") === "true";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isRunning || (!hasSeen && !prefersReducedMotion)) {
      setBaseDelay(2.6);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 200) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Active section observer
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "Work", href: "/#work", id: "work" },
    { name: "Services", href: "/#services", id: "services" },
    { name: "Process", href: "/#process", id: "process" },
    { name: "About", href: "/#about", id: "about" },
  ];

  const allMobileLinks = [
    ...navLinks,
    { name: "Start a Project", href: "/#start-project", id: "start-project" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.6, delay: baseDelay, ease: [0.76, 0, 0.24, 1] }}
        className={cn(
          "fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 lg:top-[16px] lg:left-[32px] lg:right-[32px] pointer-events-none",
          "z-[80]"
        )}
      >
        {/* DESKTOP NAVBAR (>= 1024px) */}
        <div className="hidden lg:block w-full max-w-[1440px] mx-auto pointer-events-auto">
          <div
            className={cn(
              "grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-350 ease-out w-full",
              isScrolled
                ? "glass-elevated metal-edge px-6 h-[62px]"
                : "bg-transparent border border-transparent px-3 h-[70px] rounded-[24px]"
            )}
          >
            <div className="flex items-center shrink-0">
              <Link href="/" className="font-bold text-[17px] tracking-tight text-ink outline-none">
                DEADCODE<span className="text-signal-bright">.</span>
                <span className="text-ink-muted text-[14px]">LABS</span>
              </Link>
            </div>

            {/* Center Nav: HOME, WORK, SERVICES, PROCESS, ABOUT */}
            <nav className="flex items-center gap-7 xl:gap-8 justify-center">
              {navLinks.map((link) => {
                const isExactActive = (pathname === "/" && activeSection === link.id);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative py-2 group outline-none"
                  >
                    <RandomLetterSwap
                      label={link.name}
                      className={cn(
                        "font-medium text-[14px] transition-colors duration-300",
                        isExactActive ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
                      )}
                      staggerDuration={0.02}
                      transition={{ duration: 0.5, type: "spring" }}
                    />
                    {isExactActive && (
                      <motion.div
                        layoutId="nav-active-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-signal-gradient shadow-[0_0_10px_rgba(225,6,0,0.6)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action */}
            <div className="flex items-center space-x-5 justify-self-end">
              <div className="hidden xl:flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-success opacity-40 duration-[3000ms]"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 m-auto bg-success"></span>
                </span>
                <span className="text-[12.5px] text-ink-soft font-medium tracking-tight">Available for selected projects</span>
              </div>
              <Button
                asChild
                variant="default"
                className={cn(
                  "rounded-[12px] text-sm",
                  isScrolled ? "h-[40px] px-5 text-[13.5px]" : "h-[44px] px-5 text-[14px]"
                )}
              >
                <Link href="/#start-project" onClick={(e) => handleNavClick(e, "/#start-project")}>
                  Start a Project
                </Link>
              </Button>
            </div>

          </div>
        </div>

        {/* MOBILE & TABLET COMPACT NAVBAR (< 1024px) */}
        <div
          className={cn(
            "lg:hidden pointer-events-auto w-full transition-all duration-300",
            (isScrolled)
              ? "bg-[rgba(13,15,18,0.78)] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_14px_36px_rgba(0,0,0,0.45)] px-4 h-[56px] rounded-[16px] flex items-center"
              : "bg-transparent border border-transparent px-2 h-[60px] flex items-center"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-lg tracking-tight text-ink outline-none" onClick={closeMenu}>
                DEADCODE<span className="text-signal-bright">.</span>LABS
              </Link>
            </div>

            <div className="w-11 h-11" aria-hidden="true" /> {/* Spacer for hamburger */}
          </div>
        </div>
      </motion.header>

      {/* INDEPENDENT MOBILE HAMBURGER BUTTON — stays above the drawer as its close control */}
      <button
        ref={toggleRef}
        data-nav-toggle
        className="lg:hidden fixed z-[2100] w-11 h-11 flex items-center justify-center rounded-full bg-[rgba(19,22,26,0.72)] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.45)] text-ink transition-colors hover:border-white/25"
        onClick={() => (mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true))}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        style={{
          top: "max(14px, env(safe-area-inset-top))",
          right: "max(14px, env(safe-area-inset-right))"
        }}
      >
        <span className="relative block w-[18px] h-[12px]" aria-hidden="true">
          <span
            className={cn(
              "absolute right-0 h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              mobileMenuOpen ? "top-[5.25px] rotate-45" : "top-0"
            )}
          />
          <span
            className={cn(
              "absolute right-0 h-[1.5px] rounded-full bg-signal-gradient transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              mobileMenuOpen ? "top-[5.25px] w-[18px] -rotate-45" : "top-[10.5px] w-[11px]"
            )}
          />
        </span>
      </button>

      {/* Mobile Navigation Panel */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={closeMenu}
        navLinks={allMobileLinks}
      />
    </>
  );
}
