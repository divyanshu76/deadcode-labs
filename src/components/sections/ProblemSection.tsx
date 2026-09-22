"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const problems = [
  {
    number: "01",
    title: "The Generic Identity",
    text: "Your website looks exactly like every other competitor in your industry. It's technically functional, but it fails to convert visitors or communicate your premium positioning.",
  },
  {
    number: "02",
    title: "The Commerce Trap",
    text: "Your e-commerce storefront relies on rigid templates. The user experience is clunky, the checkout drops conversions, and the brand identity is lost in the transaction.",
  },
  {
    number: "03",
    title: "The Operational Mess",
    text: "Critical business processes are buried inside spreadsheets, disconnected SaaS tools, and WhatsApp groups. Your team wastes hours on manual data entry instead of scaling.",
  },
  {
    number: "04",
    title: "The AI Disconnect",
    text: "You want to leverage AI, but standard chatbots aren't enough. You need intelligent workflows deeply integrated into your actual business data and operations.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-32 bg-muted/30">
      <Container>
        <div className="max-w-4xl mb-10 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-bold tracking-tight mb-5 md:mb-8 leading-[1.1]"
          >
            Your digital presence shouldn't feel stitched together.
          </motion.h2>
          <p className="text-base md:text-xl text-secondary max-w-2xl leading-[1.55]">
            Most digital projects fail because design and engineering are treated as separate steps. The result is always a compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-16 mb-14 md:mb-32">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Subtle top border for editorial feel */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-border group-hover:bg-accent/50 transition-colors duration-500"></div>
              
              <div className="pt-5 md:pt-6">
                <div className="text-3xl md:text-7xl font-light text-border/40 mb-4 md:mb-6 font-mono tracking-tighter">
                  {problem.number}
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                  {problem.title}
                </h3>
                <p className="text-base md:text-lg text-secondary leading-[1.55] max-w-[32ch]">
                  {problem.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between bg-foreground text-background p-6 md:p-12 rounded-[20px] md:rounded-[2.5rem]"
        >
          <h3 className="text-xl md:text-3xl font-bold mb-5 sm:mb-0">
            That's where we come in.
          </h3>
          <Button variant="outline" size="lg" className="border-background/20 text-background hover:bg-background hover:text-foreground shrink-0 w-full sm:w-auto h-12 md:h-14">
            Build Something Better <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
