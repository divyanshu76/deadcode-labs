"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "What do you need?",
    options: ["Website", "E-commerce", "Web App", "SaaS", "AI Product", "Automation", "Other"]
  },
  {
    title: "Project scale",
    options: ["Starter", "Growth", "Advanced", "Custom"]
  },
  {
    title: "Features",
    multi: true,
    options: ["CMS", "Authentication", "Payments", "Dashboard", "AI", "Automation", "API integrations", "Admin panel", "Analytics", "SEO", "Animations"]
  },
  {
    title: "Timeline",
    options: ["ASAP", "2–4 weeks", "1–2 months", "Flexible"]
  },
  {
    title: "Budget range",
    options: ["₹25k–₹50k", "₹50k–₹1L", "₹1L–₹2.5L", "₹2.5L+"]
  }
];

export function ProjectEstimator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (option: string) => {
    const step = STEPS[currentStep];
    
    if (step.multi) {
      const current = (selections[currentStep] as string[]) || [];
      if (current.includes(option)) {
        setSelections({ ...selections, [currentStep]: current.filter(item => item !== option) });
      } else {
        setSelections({ ...selections, [currentStep]: [...current, option] });
      }
    } else {
      setSelections({ ...selections, [currentStep]: option });
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = STEPS[currentStep];
  const isNextDisabled = !selections[currentStep] || (Array.isArray(selections[currentStep]) && selections[currentStep].length === 0);

  return (
    <section id="start-project" className="py-12 md:py-24 bg-surface border-t border-border">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-accent font-semibold block mb-2">
              PROJECT ESTIMATOR
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3 leading-[1.1]">
              Start a project.
            </h2>
            <p className="text-sm md:text-base text-secondary max-w-xl mx-auto">
              Tell us what you need. We'll help you scope it and provide a tailored technical roadmap.
            </p>
          </div>

          <div className="bg-background border border-border rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col max-w-2xl mx-auto w-full"
                >
                  {/* Progress Indicator */}
                  <div className="flex items-center space-x-2 mb-8 md:mb-10">
                    {STEPS.map((_, i) => (
                      <div 
                        key={i}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all duration-300",
                          i === currentStep ? "bg-accent scale-y-125" : i < currentStep ? "bg-accent/40" : "bg-border"
                        )}
                      />
                    ))}
                  </div>

                  <div className="mb-6 md:mb-8 text-center">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-1.5 tracking-tight text-foreground">{currentStepData.title}</h3>
                    {currentStepData.multi && (
                      <p className="text-xs md:text-sm text-secondary">Select all that apply</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 mb-8 md:mb-10">
                    {currentStepData.options.map((option) => {
                      const isSelected = currentStepData.multi 
                        ? (selections[currentStep] as string[])?.includes(option)
                        : selections[currentStep] === option;
                        
                      return (
                        <button
                          key={option}
                          onClick={() => handleSelect(option)}
                          className={cn(
                            "text-left px-4 py-3 md:px-5 md:py-3.5 rounded-xl border transition-all duration-200 text-sm font-medium flex items-center justify-between group",
                            isSelected 
                              ? "border-accent bg-surface-lavender text-foreground shadow-sm" 
                              : "border-border bg-surface text-secondary hover:border-accent/40 hover:text-foreground"
                          )}
                        >
                          <span>{option}</span>
                          <div className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center text-[10px] transition-colors",
                            isSelected ? "border-accent bg-accent text-white" : "border-border"
                          )}>
                            {isSelected && "✓"}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/70">
                    <Button 
                      variant="ghost" 
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className={cn("text-sm", currentStep === 0 ? "invisible" : "")}
                    >
                      <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleNext}
                      disabled={isNextDisabled}
                      size="default"
                      className="px-6 text-sm bg-foreground text-white hover:bg-[#282832]"
                    >
                      {currentStep === STEPS.length - 1 ? "Review Brief" : "Continue"} <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-10 md:py-14"
                >
                  <div className="w-14 h-14 rounded-full bg-surface-lavender text-accent flex items-center justify-center mb-6">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-3 tracking-tight text-foreground">Your brief is ready.</h3>
                  <p className="text-sm md:text-base text-secondary max-w-md mb-8 leading-relaxed">
                    We've gathered the initial requirements for your {selections[0]}. Let's connect directly with the founder to discuss technical architecture and deployment timelines.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="px-7 text-sm bg-foreground text-white" asChild>
                      <a href={`mailto:divyanshuv0905@gmail.com?subject=${encodeURIComponent(`New Project Inquiry: ${selections[0]}`)}&body=${encodeURIComponent(`Hi Divyanshu,\n\nI'd like to discuss a new project with DEADCODE LABS.\n\nProject Details:\n- Type: ${selections[0]}\n- Scale: ${selections[1]}\n- Features: ${(selections[2] as string[] || []).join(", ")}\n- Timeline: ${selections[3]}\n- Budget: ${selections[4]}\n\nBest regards,\n[Your Name]`)}`}>
                        Send Project Brief <ArrowRight className="ml-1.5 h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="px-7 text-sm border-border text-foreground" asChild>
                      <a href="mailto:divyanshuv0905@gmail.com?subject=Strategy%20Call%20Booking">
                        Book a Strategy Call
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </Container>
    </section>
  );
}
