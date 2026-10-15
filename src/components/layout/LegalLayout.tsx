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
        <div className="glass-soft p-6 sm:p-10 md:p-14 lg:p-16 rounded-[28px] md:rounded-[36px] border border-white/60 shadow-[0_20px_60px_rgba(59,42,33,0.06)] bg-white/45 backdrop-blur-xl">
          <div className="mb-8 md:mb-12 pb-6 md:pb-8 border-b border-[#3A2920]/10">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#E10600] font-semibold block mb-2">
              LEGAL & GOVERNANCE
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#3A2920] mb-3 leading-[1.1]">
              {title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#7A6658]">Last Updated: {lastUpdated}</p>
          </div>
          <div className="space-y-8 text-[#4A3B32] leading-relaxed text-sm sm:text-base md:text-[17px]">
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
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#3A2920] tracking-tight">{title}</h2>
      <div className="space-y-3.5 text-[#5A4538] leading-relaxed">{children}</div>
    </section>
  );
}
