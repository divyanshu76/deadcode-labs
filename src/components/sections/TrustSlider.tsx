"use client";

const items = [
  "FAST DELIVERY — 48hr initial interactive demos",
  "PREMIUM QUALITY — Pixel-perfect architectural craft",
  "5-STAR RATED — 50+ bespoke client deliveries",
];

export function TrustSlider() {
  // Duplicate for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="h-[40px] md:h-[50px] border-b border-border/80 bg-surface flex items-center overflow-hidden">
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex items-center justify-start animate-marquee whitespace-nowrap">
          {duplicatedItems.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center mx-4 md:mx-8">
              <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-foreground">
                {item.split(" — ")[0]}
              </span>
              <span className="text-[10px] md:text-[11px] font-mono tracking-widest uppercase text-secondary ml-2">
                — {item.split(" — ")[1]}
              </span>
              <span className="text-accent/30 text-[10px] mx-4 md:mx-8">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
