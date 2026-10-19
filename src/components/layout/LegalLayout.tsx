import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 min-h-screen relative z-10">
      <Container className="max-w-4xl relative z-10">
        <div className="glass-soft p-6 sm:p-10 md:p-14 lg:p-16 rounded-[28px] md:rounded-[36px] border border-white/60 shadow-[0_20px_60px_rgba(42,42,42,0.06)] bg-white/45 backdrop-blur-xl">
          <div className="mb-8 md:mb-12 pb-6 md:pb-8 border-b border-charcoal/10">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-signal font-semibold block mb-2">
              LEGAL & GOVERNANCE
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-3 leading-[1.1]">
              {title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-ink-muted">Last Updated: {lastUpdated}</p>
          </div>
          <div className="space-y-8 text-ink-soft leading-relaxed text-sm sm:text-base md:text-[17px]">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3.5">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-charcoal tracking-tight">{title}</h2>
      <div className="space-y-3.5 text-ink-soft leading-relaxed">{children}</div>
    </section>
  );
}
