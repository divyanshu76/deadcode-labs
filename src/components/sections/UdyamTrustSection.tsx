"use client";

import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function UdyamTrustSection() {
  return (
    <section className="py-4 md:py-6 bg-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Desktop & Tablet: Single premium horizontal card */}
          <div className="hidden sm:flex items-center justify-between px-6 py-3.5 rounded-2xl bg-surface border border-border shadow-[0_4px_20px_rgba(21,21,26,0.03)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground block">
                  MSME VERIFIED
                </span>
                <span className="text-xs text-secondary">
                  UDYAM REGISTRATION
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-border pl-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-lavender border border-accent/20 text-accent font-mono text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                UDYAM-UP-57-0055432
              </span>
            </div>
          </div>

          {/* Mobile: Compact stacked credibility card */}
          <div className="flex sm:hidden flex-col gap-2.5 p-4 rounded-xl bg-surface border border-border shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground block">
                  MSME VERIFIED
                </span>
                <span className="text-[11px] text-secondary">
                  UDYAM REGISTRATION
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-border/60 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase text-secondary">Registration ID</span>
              <span className="font-mono text-[11px] font-semibold text-accent px-2 py-0.5 rounded bg-surface-lavender">
                UDYAM-UP-57-0055432
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
