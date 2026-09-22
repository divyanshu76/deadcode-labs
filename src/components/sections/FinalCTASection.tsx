"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTASection() {
  return (
    <section className="relative py-20 md:py-48 bg-foreground text-background overflow-hidden border-t border-border">
      {/* Small animated grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center"
        >
          <p className="text-accent-light font-mono text-sm tracking-widest uppercase mb-6 md:mb-10">
            Ready when you are
          </p>
          
          <h2 className="font-display text-5xl md:text-7xl lg:text-[110px] tracking-tight mb-8 md:mb-16 leading-[0.9]">
            Let's build <br className="hidden md:block" /> something.
          </h2>
          
          <a 
            href="mailto:divyanshuv0905@gmail.com" 
            className="group relative inline-flex items-center text-lg md:text-3xl font-light text-background/80 hover:text-background transition-colors duration-300"
          >
            <span className="relative z-10 pb-2 border-b border-background/30 group-hover:border-accent-light transition-colors duration-300">
              divyanshuv0905@gmail.com
            </span>
            <ArrowRight className="ml-4 h-5 w-5 md:h-8 md:w-8 text-accent-light opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
