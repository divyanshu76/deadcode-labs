"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";

const faqs = [
  {
    question: "What kind of projects do you take?",
    answer: "We specialize in premium websites, headless e-commerce (Shopify), custom web applications, SaaS MVPs, and business automation systems. We partner with ambitious brands that value high-quality design and engineering."
  },
  {
    question: "How does the process work?",
    answer: "Every project starts with a Discovery phase where we align on goals. Then we move into Definition (architecture/scoping), Design, Build, and finally Launch. You get weekly updates and direct access to the team building your product."
  },
  {
    question: "How much does a project cost?",
    answer: "Our minimum engagement starts at ₹XX,XXX. The final cost depends on the scope, technical complexity, and timeline of the project. We provide a detailed estimate after our initial discovery call."
  },
  {
    question: "How long does development take?",
    answer: "A standard marketing website typically takes 3-5 weeks. E-commerce and custom web applications usually range from 6-12 weeks depending on the complexity of features and integrations required."
  },
  {
    question: "Do you work with clients outside India?",
    answer: "Yes, we operate internationally. Our digital studio structure is designed for seamless remote collaboration, async updates, and timezone-friendly communication."
  },
  {
    question: "Can you automate business workflows?",
    answer: "Absolutely. We build custom automation systems using n8n, Zapier, custom APIs, and AI integrations to connect your CRMs, databases, and operational tools."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-32 bg-background">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Common questions.
            </h2>
            <p className="text-base md:text-lg text-secondary">
              Everything you need to know about working with DEADCODE LABS.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-border rounded-2xl overflow-hidden bg-surface transition-colors hover:border-border/80"
              >
                <button
                  className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-lg pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-secondary shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-secondary leading-relaxed border-t border-border/50 pt-4 mt-2 mx-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
