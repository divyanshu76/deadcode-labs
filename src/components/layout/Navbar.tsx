"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  
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
    return () => {
      document.body.style.overflow = "";
    };
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
        className="fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 lg:top-[16px] lg:left-[32px] lg:right-[32px] z-[80] pointer-events-none"
      >
        {/* DESKTOP NAVBAR (>= 1024px) */}
        <div className="hidden lg:block w-full max-w-[1440px] mx-auto pointer-events-auto">
          <div 
            className={cn(
              "grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-350 ease-out w-full",
              isScrolled 
                ? "bg-[#11161B]/72 backdrop-blur-[20px] border border-white/10 shadow-sm px-6 h-[62px] rounded-[20px]" 
                : "bg-transparent px-3 h-[70px] rounded-[20px]"
            )}
          >
            <div className="flex items-center shrink-0">
              <Link href="/" className="font-bold text-[17px] tracking-tight text-foreground outline-none">
                DEADCODE<span className="text-accent">.</span>
                <span className="text-secondary/80 text-[14px]">LABS</span>
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
                        isExactActive ? "text-foreground font-semibold" : "text-secondary hover:text-foreground"
                      )}
                      staggerDuration={0.02}
                      transition={{ duration: 0.5, type: "spring" }}
                    />
                    {isExactActive && (
                      <motion.div 
                        layoutId="nav-active-dot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"
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
                <span className="text-[12.5px] text-secondary font-medium tracking-tight">Available for selected projects</span>
              </div>
              <Link href="/#start-project" onClick={(e) => handleNavClick(e, "/#start-project")} className="outline-none">
                <Button 
                  variant="default"
                  className={cn(
                    "rounded-[12px] text-sm",
                    isScrolled ? "h-[40px] px-5 text-[13.5px]" : "h-[44px] px-5 text-[14px]"
                  )}
                >
                  Start a Project
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* MOBILE & TABLET COMPACT NAVBAR (< 1024px) */}
        <div 
          className={cn(
            "lg:hidden pointer-events-auto w-full transition-all duration-300",
            isScrolled || mobileMenuOpen
              ? "bg-[#11161B]/90 backdrop-blur-[20px] border border-white/10 shadow-sm px-4 h-[56px] rounded-[16px] flex items-center"
              : "bg-transparent px-2 h-[60px] flex items-center"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-lg tracking-tight text-foreground outline-none" onClick={() => setMobileMenuOpen(false)}>
                DEADCODE<span className="text-accent">.</span>LABS
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="p-2 -mr-1 text-foreground relative z-[220] outline-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="flex flex-col justify-center items-center w-6 h-5 relative">
                <span className={cn("absolute block w-full h-[2px] bg-current transition-all duration-300", mobileMenuOpen ? "top-2 rotate-45" : "top-0")} />
                <span className={cn("absolute block w-full h-[2px] bg-current transition-all duration-300 top-2", mobileMenuOpen ? "opacity-0" : "opacity-100")} />
                <span className={cn("absolute block w-full h-[2px] bg-current transition-all duration-300", mobileMenuOpen ? "top-2 -rotate-45" : "top-4")} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Panel */}
      <MobileNav 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={allMobileLinks} 
      />
    </>
  );
}
