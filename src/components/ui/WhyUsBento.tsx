"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IsometricBox01, IsometricBoxes02 } from "./IsometricVisuals";
import { Phone, FileText, Code2, Rocket, ArrowRight } from "lucide-react";

export function WhyUsBento() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* CARD 01: AI & Automation */}
        <motion.div
          whileHover="hover"
          whileTap="hover"
          className="md:col-span-2 group relative overflow-hidden premium-card p-6 md:p-8 flex flex-col justify-between"
        >
          <div className="absolute -bottom-10 -right-10 text-[180px] font-display font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            01
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="w-12 h-12 rounded-xl bg-white/55 flex items-center justify-center border border-white/65 transition-colors group-hover:border-[#C96F3D]/50 shadow-[0_4px_12px_rgba(83,58,39,0.06)]">
              <Code2 className="text-[#C96F3D] w-6 h-6" />
            </div>
            
            <div>
              <div className="relative overflow-hidden mb-3 font-display text-2xl md:text-3xl font-bold h-10 flex items-center">
                {/* Default Text Layer */}
                <div className="absolute inset-0 flex text-[#3B2A21]">
                  {"AI & Automation".split("").map((char, index) => (
                    <motion.span
                      key={`default-${index}`}
                      variants={{ hover: { y: "-100%" } }}
                      transition={{ delay: index * 0.02, duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      className={char === " " ? "w-2" : "block"}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                {/* Hover Text Layer (Copper) */}
                <div className="absolute inset-0 flex text-[#C96F3D]">
                  {"AI & Automation".split("").map((char, index) => (
                    <motion.span
                      key={`hover-${index}`}
                      initial={{ y: "100%" }}
                      variants={{ hover: { y: "0%" } }}
                      transition={{ delay: index * 0.02, duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      className={char === " " ? "w-2" : "block"}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
              <p className="text-[#6D5A4B] text-sm md:text-base leading-relaxed max-w-xl relative z-20">
                We build AI agents and intelligent workflows that automate repetitive operations, connect your systems, and create measurable leverage for your business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CARD 02: From Idea to Production */}
        <motion.div
          whileHover="hover"
          whileTap="hover"
          className="md:col-span-1 md:row-span-2 group relative overflow-hidden premium-card p-6 md:p-8 flex flex-col"
        >
          <div className="absolute top-10 right-10 text-[140px] font-display font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            02
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div>
              <h3 className="font-display text-xl font-bold text-[#3B2A21] mb-3 group-hover:text-[#C96F3D] transition-colors">
                From Idea to Production
              </h3>
              <p className="text-[#6D5A4B] text-sm leading-relaxed mb-6">
                Bring us the idea. We shape the architecture, build the product, deploy it, and stay involved through launch and iteration.
              </p>
            </div>

            {/* Stacked Cards Animation */}
            <div className="mt-auto relative w-full aspect-square flex items-center justify-center perspective-[1000px] pointer-events-none pb-4 pt-8">
              <div className="relative w-[140px] h-[140px] md:w-[170px] md:h-[170px] flex items-center justify-center">
                {/* Back Card */}
                <motion.div
                  initial={{ x: -8, y: 8, rotateZ: -10 }}
                  variants={{ hover: { x: -15, y: 10, rotateZ: -16 } }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-full h-full glass-soft rounded-2xl shadow-lg z-0"
                />
                {/* Second Card */}
                <motion.div
                  initial={{ x: -5, y: 5, rotateZ: -6 }}
                  variants={{ hover: { x: -10, y: 7, rotateZ: -11 } }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-full h-full glass-panel rounded-2xl shadow-lg z-10"
                />
                {/* Third Card */}
                <motion.div
                  initial={{ x: -2, y: 2, rotateZ: -3 }}
                  variants={{ hover: { x: -5, y: 4, rotateZ: -6 } }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-full h-full glass-elevated rounded-2xl shadow-lg z-20"
                />
                {/* Front Card */}
                <motion.div
                  initial={{ x: 0, y: 0, rotateZ: 0 }}
                  variants={{ hover: { y: -5, scale: 1.02 } }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-full h-full glass-panel rounded-2xl shadow-2xl z-30 p-5 flex flex-col justify-between"
                >
                  <div className="font-mono text-[14px] font-bold text-[#11161B] space-y-2 mt-1">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E4573F]"/> Idea.</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E4573F]"/> Architecture.</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E4573F]"/> Production.</div>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#C96F3D] mt-auto">
                    {">"} READY TO EXECUTE <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>_</motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 03: Built by Experienced Engineers */}
        <motion.div
          whileHover="hover"
          whileTap="hover"
          className="md:col-span-1 group relative overflow-hidden premium-card p-6"
        >
          <div className="absolute -bottom-8 -right-4 text-[120px] font-display font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            03
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-[#3B2A21] mb-2 group-hover:text-[#C96F3D] transition-colors">
                Built by Experienced Engineers
              </h3>
              <p className="text-[#6D5A4B] text-sm leading-relaxed line-clamp-3">
                Work directly with experienced engineers across frontend, backend, AI, automation, and product engineering from kickoff to launch.
              </p>
            </div>
            
            <div className="flex mt-auto pt-2 relative min-h-[44px] w-full max-w-[160px]">
              <motion.div
                variants={{ hover: { x: -2, y: -2, rotate: -4 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full border-[2.5px] border-[#252F37] group-hover:border-[#2B363F] transition-colors bg-[#11161B] overflow-hidden absolute left-0 z-40 shadow-lg"
              >
                <Image src="/images/founder.jpg" alt="DEADCODE LABS experienced engineer team member" fill className="object-cover" />
              </motion.div>
              <motion.div
                variants={{ hover: { x: 8, y: -4, rotate: 2, scale: 1.05 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full border-[2.5px] border-[#252F37] group-hover:border-[#2B363F] transition-colors bg-[#1B232A] flex items-center justify-center absolute left-[28px] md:left-[30px] z-30 shadow-lg"
              >
                <span className="text-xs font-bold text-[#F5F1EC]">DV</span>
              </motion.div>
              <motion.div
                variants={{ hover: { x: 18, y: -2, rotate: 6 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full border-[2.5px] border-[#252F37] group-hover:border-[#2B363F] transition-colors bg-[#151C22] flex items-center justify-center absolute left-[56px] md:left-[60px] z-20 shadow-lg"
              >
                <span className="text-xs font-bold text-[#F5F1EC]">AI</span>
              </motion.div>
              <motion.div
                variants={{ hover: { x: 28, y: -6, rotate: -2, scale: 1.02 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full border-[2.5px] border-[#252F37] group-hover:border-[#2B363F] transition-colors bg-[#E4573F] flex items-center justify-center absolute left-[84px] md:left-[90px] z-10 shadow-lg"
              >
                <span className="text-xs font-bold text-white">UX</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CARD 04: No Handoffs */}
        <motion.div
          whileHover="hover"
          whileTap="hover"
          className="md:col-span-1 group relative overflow-hidden premium-card p-6"
        >
          <div className="absolute -bottom-8 -right-4 text-[120px] font-display font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            04
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-[#3B2A21] mb-2 group-hover:text-[#C96F3D] transition-colors">
                No Handoffs
              </h3>
              <p className="text-[#6D5A4B] text-sm leading-relaxed line-clamp-3">
                One focused team from strategy through deployment. No unnecessary handoffs, no rotating teams, and no communication gaps.
              </p>
            </div>
            
            {/* Pipeline Animation */}
            <div className="flex items-center justify-between text-[#87919A] mt-auto pt-4 relative w-full">
              <motion.div 
                variants={{ hover: { backgroundColor: "rgba(201, 111, 61, 0.25)" } }}
                className="absolute top-[30px] left-2 right-2 h-[1px] bg-white/40 transition-colors" 
              />
              {[
                { icon: Phone, label: "CALL" },
                { icon: FileText, label: "PLAN" },
                { icon: Code2, label: "BUILD" },
                { icon: ArrowRight, label: "DEPLOY" },
                { icon: Rocket, label: "LAUNCH", isEnd: true },
              ].map((step, i) => (
                <div key={step.label} className="flex flex-col items-center gap-1.5 relative z-10 bg-white/45 backdrop-blur-[10px] px-0.5 sm:px-1 group-hover:bg-white/58 transition-colors rounded">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    {step.isEnd && (
                      <motion.div
                        variants={{
                          hover: { scale: 1.4, opacity: 0 }
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-[#E4573F] opacity-0"
                      />
                    )}
                    <motion.div
                      variants={{
                        hover: step.isEnd ? { color: "#C96F3D", borderColor: "rgba(201,111,61,0.5)" } : { color: "#3B2A21", borderColor: "rgba(255,255,255,0.4)" }
                      }}
                      className="bg-white/55 w-[22px] h-[22px] md:w-7 md:h-7 rounded-full flex items-center justify-center border border-white/65 relative z-10 transition-colors"
                    >
                      <step.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </motion.div>
                  </div>
                  <motion.span 
                    variants={{
                      hover: step.isEnd ? { color: "#C96F3D" } : { color: "#3B2A21" }
                    }}
                    className="text-[8px] md:text-[9px] font-mono font-semibold tracking-widest text-[#927E6E] transition-colors"
                  >
                    {step.label}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 05: Deep Engineering */}
        <motion.div
          whileHover="hover"
          whileTap="hover"
          className="md:col-span-3 group relative overflow-hidden premium-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="absolute -top-10 -left-6 text-[220px] font-display font-bold text-white/[0.03] leading-none pointer-events-none select-none">
            05
          </div>
          
          <div className="relative z-10 md:w-5/12 flex flex-col mb-10 md:mb-0">
            <h3 className="font-display text-2xl font-bold text-[#3B2A21] mb-3 group-hover:text-[#C96F3D] transition-colors">
              Deep Engineering
            </h3>
            <p className="text-[#6D5A4B] text-sm md:text-base leading-relaxed max-w-md">
              Web, e-commerce, AI, automation, SaaS, APIs, and complex digital systems — engineered as one cohesive product.
            </p>
          </div>

          <div className="relative z-10 md:w-7/12 flex items-center justify-end w-full">
            <div className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[16/10] mr-0 md:mr-4">
              <IsometricBoxes02 className="absolute top-0 right-0 w-full h-full opacity-90" />
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
