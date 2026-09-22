import { Container } from "@/components/ui/Container";

export function TrustStrip() {
  const capabilities = [
    "WEB DEVELOPMENT",
    "E-COMMERCE",
    "AI PRODUCTS",
    "AUTOMATION",
    "SAAS",
    "UI/UX",
  ];

  // Duplicate items to ensure a seamless loop
  const duplicatedCapabilities = [...capabilities, ...capabilities, ...capabilities, ...capabilities];

  return (
    <section className="h-[44px] md:h-[80px] border-y border-border bg-background overflow-hidden flex items-center">
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex items-center justify-start md:justify-center animate-marquee whitespace-nowrap">
          {duplicatedCapabilities.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center mx-3 md:mx-8">
              <span className="text-[11px] md:text-lg font-mono tracking-widest text-foreground/80 uppercase">
                {item}
              </span>
              <span className="text-border text-sm md:text-xl font-light ml-6 md:ml-16">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
