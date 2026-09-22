"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function Hero() {
  const [isReady, setIsReady] = useState(false);
  const [baseDelay, setBaseDelay] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("deadcode-preloader-seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasSeen && !prefersReducedMotion) {
      setBaseDelay(2.6);
    }
    setIsReady(true);
    
    // Desktop only parallax handler
    if (window.innerWidth >= 1024 && !prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 10px
        const y = (e.clientY / window.innerHeight - 0.5) * 20; // max 10px
        setMousePosition({ x, y });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section id="home" className="relative pt-28 pb-12 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-background">
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-30 m-auto h-[350px] w-[350px] rounded-full bg-[#E4573F]/10 blur-[120px]"></div>
      
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex flex-col space-y-5 md:space-y-7 relative z-10 w-full lg:w-[52%]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: baseDelay }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/80 w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-secondary font-semibold">
                Digital Product & Systems Studio
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: baseDelay + 0.05 }}
              className="font-display tracking-tight leading-[0.92] md:leading-[0.95] text-foreground font-bold"
              style={{
                fontSize: "clamp(42px, 12vw, 92px)",
              }}
            >
              DIGITAL <br className="hidden sm:block" />
              IDEAS, <br />
              <span className="text-accent font-display">ENGINEERED.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: baseDelay + 0.1 }}
              className="text-base md:text-xl text-secondary max-w-[330px] md:max-w-md leading-[1.55]"
            >
              DEADCODE LABS designs and builds premium digital products, websites, e-commerce experiences and intelligent systems for ambitious businesses.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: baseDelay + 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-2"
            >
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base group" asChild>
                <Link href="/#start-project">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base border-border hover:bg-muted" asChild>
                <Link href="/work">
                  Explore Our Work
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Right Visual (Interactive) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isReady ? { opacity: 1, scale: 1, x: mousePosition.x * -1, y: mousePosition.y * -1 } : { opacity: 0, scale: 0.97 }}
            transition={{ 
              opacity: { duration: 0.8, delay: baseDelay + 0.2 }, 
              scale: { duration: 0.8, delay: baseDelay + 0.2 },
              x: { type: "spring", damping: 30, stiffness: 100 },
              y: { type: "spring", damping: 30, stiffness: 100 }
            }}
            className="relative lg:h-[600px] flex items-center justify-center w-full lg:w-[50%]"
          >
            {/* Main floating card */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-20 w-full max-w-md lg:max-w-lg bg-surface/80 backdrop-blur-xl border border-border/60 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                </div>
                <span className="text-xs font-semibold text-secondary px-2 py-1 bg-muted rounded-full">Digital Product</span>
              </div>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-secondary">Performance</span>
                    <span className="font-medium text-emerald-500">Excellent</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "98%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: baseDelay + 0.8 }}
                      className="bg-emerald-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-secondary">Experience</span>
                    <span className="font-medium text-accent">Optimized</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: baseDelay + 1.0 }}
                      className="bg-accent h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-secondary">Automation</span>
                    <span className="font-medium">Connected</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: baseDelay + 1.2 }}
                      className="bg-foreground h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background floating elements — desktop only */}
            <motion.div 
              animate={{ y: [0, 8, 0], x: mousePosition.x * -1.5, rotate: [0, 1, 0] }}
              transition={{ 
                y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
                rotate: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
                x: { type: "spring", damping: 30, stiffness: 100 }
              }}
              className="absolute -right-4 top-12 z-10 bg-surface border border-border p-4 rounded-2xl shadow-xl w-32 hidden lg:block"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                <div className="w-4 h-4 bg-accent rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-foreground">AI Copilot</p>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -8, 0], x: mousePosition.x * -1.2, rotate: [0, -1, 0] }}
              transition={{ 
                y: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 },
                rotate: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 },
                x: { type: "spring", damping: 30, stiffness: 100 }
              }}
              className="absolute -left-8 bottom-24 z-30 bg-surface border border-border p-4 rounded-2xl shadow-xl w-40 hidden lg:block"
            >
              <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center mb-2">
                <div className="w-4 h-4 bg-blue rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-foreground">Workflow Active</p>
              <p className="text-[10px] text-secondary mt-1">Synced instantly</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
