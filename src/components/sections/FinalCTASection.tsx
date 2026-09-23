"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTASection() {
  return (
    <section className="relative py-16 md:py-24 relative z-10 text-[#3B2A21] overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto glass-elevated rounded-[40px] p-10 md:p-24 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Small animated grid inside the glass panel */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(116,88,66,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(116,88,66,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="relative z-10">
            <p className="text-[#C96F3D] font-mono text-sm tracking-widest uppercase mb-6 md:mb-10">
              Ready when you are
            </p>
            
            <h2 className="font-display text-5xl md:text-7xl lg:text-[110px] tracking-tight mb-8 md:mb-16 leading-[0.9] text-[#3B2A21]">
              Let's build <br className="hidden md:block" /> something.
            </h2>
            
            <a 
              href="mailto:divyanshuv0905@gmail.com" 
              className="group relative inline-flex items-center text-lg md:text-3xl font-light text-[#6D5A4B] hover:text-[#3B2A21] transition-colors duration-300"
            >
              <span className="relative z-10 pb-2 border-b border-[#B5A090]/50 group-hover:border-[#C96F3D] transition-colors duration-300">
                divyanshuv0905@gmail.com
              </span>
              <ArrowRight className="ml-4 h-5 w-5 md:h-8 md:w-8 text-[#C96F3D] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
