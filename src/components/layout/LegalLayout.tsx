import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Container className="max-w-4xl relative z-10">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#FFF7F8] mb-4">
            {title}
          </h1>
          <p className="text-sm font-mono text-[#D8C4C9]">Last Updated: {lastUpdated}</p>
        </div>
        <div className="space-y-8 text-[#D8C4C9] leading-relaxed text-base md:text-lg">
          {children}
        </div>
      </Container>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-[#FFF7F8] tracking-tight">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
