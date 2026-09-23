"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function Hero() {
  const [isReady, setIsReady] = useState(false);
  const [baseDelay, setBaseDelay] = useState(0);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothOptions = { damping: 30, stiffness: 60, mass: 0.5 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);

  // Background Parallax Layer Transform
  const bgX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  
  // Floating elements Transforms
  const cardTranslateX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const cardTranslateY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const floatTranslateX1 = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const floatTranslateX2 = useTransform(smoothX, [-0.5, 0.5], [14, -14]);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("deadcode-preloader-seen");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasSeen && !prefersReducedMotion) {
      setBaseDelay(2.6);
    }
    setIsReady(true);
    
    // Desktop only parallax handler without React state re-renders
    if (window.innerWidth >= 1024 && !prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      };
      
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section id="home" className="relative pt-28 pb-12 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#F3EDE5]">
      {/* Background Animated Parallax System */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ x: bgX, y: bgY }}
      >
        {/* Layer 3: Subtle architectural grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(116,88,66,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(116,88,66,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_50%,rgba(116,88,66,0.015),transparent)]"></div>
        
        {/* Layer 1: Warm ambient light orb */}
        <div className="absolute right-[-10%] top-[-10%] m-auto h-[600px] w-[600px] rounded-full bg-white/60 blur-[100px] motion-safe:animate-[ambient-drift_16s_ease-in-out_infinite_alternate] md:motion-safe:animate-[ambient-drift_22s_ease-in-out_infinite_alternate]"></div>
        
        {/* Layer 2: Secondary copper light */}
        <div className="absolute right-[20%] bottom-[-10%] w-[400px] h-[400px] rounded-full bg-[#C96F3D]/8 blur-[120px] motion-safe:animate-[ambient-drift-reverse_12s_ease-in-out_infinite_alternate] md:motion-safe:animate-[ambient-drift-reverse_18s_ease-in-out_infinite_alternate]"></div>
        
        {/* Layer 4: Micro particles (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="85%" cy="30%" r="1" fill="#C96F3D" className="motion-safe:animate-[ambient-drift_12s_ease-in-out_infinite_alternate]" />
          <circle cx="75%" cy="60%" r="1" fill="#3B2A21" className="motion-safe:animate-[ambient-drift-reverse_15s_ease-in-out_infinite_alternate]" />
          <circle cx="90%" cy="80%" r="1.5" fill="#C96F3D" className="motion-safe:animate-[ambient-drift_18s_ease-in-out_infinite_alternate]" />
          <circle cx="65%" cy="20%" r="1" fill="#6D5A4B" className="motion-safe:animate-[ambient-drift-reverse_14s_ease-in-out_infinite_alternate]" />
          <circle cx="50%" cy="75%" r="0.5" fill="#C96F3D" className="motion-safe:animate-[ambient-drift_20s_ease-in-out_infinite_alternate]" />
        </svg>
      </motion.div>
      
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex flex-col relative z-10 w-full lg:w-[52%] glass-soft p-6 md:p-10 rounded-[32px] overflow-hidden">
            {/* Moving Glass Reflection */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-20 motion-safe:animate-[glass-reflection_12s_ease-in-out_infinite]"
              style={{ background: 'linear-gradient(120deg, transparent 25%, rgba(255,255,255,1) 42%, transparent 58%)' }}
            />
            
            <div className="relative z-10 flex flex-col space-y-5 md:space-y-7">
              <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: baseDelay }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C96F3D] animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#6D5A4B] font-semibold">
                Digital Product & Systems Studio
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: baseDelay + 0.05 }}
              className="font-display tracking-tight leading-[0.92] md:leading-[0.95] text-[#3B2A21] font-bold"
              style={{
                fontSize: "clamp(42px, 12vw, 92px)",
              }}
            >
              DIGITAL <br className="hidden sm:block" />
              IDEAS, <br />
              <span className="text-[#C96F3D] font-display">ENGINEERED.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: baseDelay + 0.1 }}
              className="text-base md:text-xl text-[#6D5A4B] max-w-[330px] md:max-w-md leading-[1.55]"
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
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base" asChild>
                <Link href="/work">
                  Explore Our Work
                </Link>
              </Button>
            </motion.div>
          </div>
          </div>
          
          {/* Right Visual (Interactive cards restored) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ 
              opacity: { duration: 0.8, delay: baseDelay + 0.2 }, 
              scale: { duration: 0.8, delay: baseDelay + 0.2 },
            }}
            style={{ 
              x: cardTranslateX, 
              y: cardTranslateY,
            }}
            className="relative lg:h-[600px] flex items-center justify-center w-full lg:w-[50%]"
          >
            {/* Main floating card */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-20 w-full max-w-md lg:max-w-lg glass-panel p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#E9E0D6] border border-white/40"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E9E0D6] border border-white/40"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E9E0D6] border border-white/40"></div>
                </div>
                <span className="text-xs font-semibold text-[#6D5A4B] px-3 py-1 glass-pill rounded-full">Digital Product</span>
              </div>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#6D5A4B]">Performance</span>
                    <span className="font-medium text-emerald-600">Excellent</span>
                  </div>
                  <div className="w-full bg-[#E9E0D6] rounded-full h-2 overflow-hidden flex">
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
                    <span className="text-[#6D5A4B]">Experience</span>
                    <span className="font-medium text-[#C96F3D]">Optimized</span>
                  </div>
                  <div className="w-full bg-[#E9E0D6] rounded-full h-2 overflow-hidden flex">
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
                    <span className="text-[#6D5A4B]">Automation</span>
                    <span className="font-medium text-[#3B2A21]">Connected</span>
                  </div>
                  <div className="w-full bg-[#E9E0D6] rounded-full h-2 overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: baseDelay + 1.2 }}
                      className="bg-[#3B2A21] h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background floating elements — desktop only */}
            <motion.div 
              animate={{ y: [0, 8, 0], rotate: [0, 1, 0] }}
              transition={{ 
                y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
                rotate: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
              }}
              style={{ x: floatTranslateX1 }}
              className="absolute -right-4 top-12 z-10 glass-crystal p-4 rounded-2xl w-32 hidden lg:block shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[#C96F3D]/12 flex items-center justify-center mb-2">
                <div className="w-4 h-4 bg-[#C96F3D] rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-[#3B2A21]">AI Copilot</p>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
              transition={{ 
                y: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 },
                rotate: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 },
              }}
              style={{ x: floatTranslateX2 }}
              className="absolute -left-8 bottom-24 z-30 glass-crystal p-4 rounded-2xl w-40 hidden lg:block shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[#6D5A4B]/12 flex items-center justify-center mb-2">
                <div className="w-4 h-4 bg-[#6D5A4B] rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-[#3B2A21]">Workflow Active</p>
              <p className="text-[10px] text-[#927E6E] mt-1">Synced instantly</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
