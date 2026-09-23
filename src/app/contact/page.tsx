"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Let's build <br className="hidden md:block" /> something useful.
              </h1>
              <p className="text-lg text-secondary mb-12 max-w-md leading-relaxed">
                Whether you need a completely new digital product or an overhaul of your existing systems, we're ready to engineer it.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Email</h3>
                  <a href="mailto:divyanshuv0905@gmail.com" className="text-xl font-medium hover:text-accent transition-colors">
                    divyanshuv0905@gmail.com
                  </a>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">WhatsApp</h3>
                  <a href="https://wa.me/919151741310" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-accent transition-colors">
                    +91 9151741310
                  </a>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Location</h3>
                  <p className="text-xl font-medium">India / International</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Availability</h3>
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                    <p className="text-xl font-medium">Currently accepting selected projects</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Form) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get("name");
                    const email = formData.get("email");
                    const company = formData.get("company");
                    const type = formData.get("type");
                    const budget = formData.get("budget");
                    const desc = formData.get("description");
                    
                    const subject = `New Project Inquiry: ${type || 'General'}`;
                    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nType: ${type}\nBudget: ${budget}\n\nDescription:\n${desc}`;
                    
                    window.location.href = `mailto:divyanshuv0905@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    setIsSubmitted(true);
                  }}
                  className="bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] shadow-sm space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <input required name="name" type="text" id="name" className="w-full glass-input rounded-xl px-4 py-3 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input required name="email" type="email" id="email" className="w-full glass-input rounded-xl px-4 py-3 transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">Company</label>
                    <input type="text" name="company" id="company" className="w-full glass-input rounded-xl px-4 py-3 transition-colors" placeholder="Company Name" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-medium">Project Type</label>
                      <select required name="type" id="type" className="w-full glass-input rounded-xl px-4 py-3 transition-colors appearance-none">
                        <option value="">Select type...</option>
                        <option value="website">Website</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="webapp">Web App / SaaS</option>
                        <option value="automation">AI / Automation</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-sm font-medium">Budget Range</label>
                      <select required name="budget" id="budget" className="w-full glass-input rounded-xl px-4 py-3 transition-colors appearance-none">
                        <option value="">Select budget...</option>
                        <option value="25-50">₹25k – ₹50k</option>
                        <option value="50-100">₹50k – ₹1L</option>
                        <option value="100-250">₹1L – ₹2.5L</option>
                        <option value="250+">₹2.5L+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Project Description</label>
                    <textarea required name="description" id="description" rows={5} className="w-full glass-input rounded-xl px-4 py-3 transition-colors resize-none" placeholder="Tell us what you're trying to achieve..."></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full group">
                    Send Project Inquiry 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-surface border border-border p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center h-full min-h-[500px]"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Your project brief has reached the lab.</h3>
                  <p className="text-lg text-secondary">
                    Thank you for reaching out. We will review your requirements and get back to you within 24 hours to schedule a discovery call.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
