"use client";

import { motion } from "motion/react";
import { ArrowRight, Rocket, TrendingUp, Layers, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { PRICING_FOOTNOTE, PRICING_PLANS, UDYAM_REGISTRATION, type PricingIcon } from "@/data/pricing";

const PLAN_ICONS: Record<PricingIcon, LucideIcon> = {
  starter: Rocket,
  business: TrendingUp,
  premium: Layers,
};

/** Compact MSME badge reusing the site's existing Udyam registration. */
function MsmeBadge() {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-[3px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-success"
      title={`Udyam Registration: ${UDYAM_REGISTRATION}`}
    >
      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
      MSME Verified
      <span className="sr-only">, Udyam Registration {UDYAM_REGISTRATION}</span>
    </span>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="atmo atmo-red-center py-14 md:py-20 relative z-10 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="chapter-label mb-5 md:mb-6">
              05 — ENGAGEMENT MODELS
            </span>
            <h2 className="font-display text-[length:clamp(40px,5.5vw,76px)] tracking-[-0.015em] text-ink leading-[1.02] mb-5">
              Clear frameworks. <br />
              <span className="italic text-silver-dark">No</span> guesswork.
            </h2>
            <p className="text-[14px] md:text-[15px] text-ink-soft leading-relaxed max-w-2xl mx-auto">
              Transparent, fixed-scope sprints and ongoing advisory. Every tier delivers production-ready engineering with zero bloat.
            </p>
          </motion.div>
        </div>

        {/* Three cards in a row on desktop; stacked, full content, on smaller screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 max-w-[560px] lg:max-w-[1220px] mx-auto items-stretch pt-3">
          {PRICING_PLANS.map((plan, index) => {
            const Icon = PLAN_ICONS[plan.icon];
            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
                aria-labelledby={`plan-${plan.id}`}
                className={cn(
                  "group relative flex flex-col rounded-[24px] metal-edge p-6 sm:p-7 lg:p-8 duration-500",
                  "motion-safe:hover:-translate-y-1 [transition-property:box-shadow,border-color,translate]",
                  plan.highlighted
                    ? "glass-dark signal-glow signal-edge shadow-[0_30px_80px_rgba(225,6,0,0.14)] lg:-translate-y-2 lg:motion-safe:hover:-translate-y-3"
                    : "glass-panel hover:border-white/15"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-signal-gradient px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_rgba(225,6,0,0.4)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                    Most Popular
                  </span>
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl border",
                    plan.highlighted
                      ? "border-signal/40 bg-signal-gradient text-white shadow-[0_8px_22px_rgba(225,6,0,0.35)]"
                      : "border-white/10 bg-white/[0.04] text-ink"
                  )}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>

                {/* Title + MSME badge */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <h3 id={`plan-${plan.id}`} className="font-display text-[26px] sm:text-[28px] leading-[1.05] text-ink">
                    {plan.name}
                  </h3>
                  <MsmeBadge />
                </div>
                <p className="mt-1.5 font-mono text-[12px] text-ink-muted">{plan.tagline}</p>

                <p className="mt-4 text-[14.5px] leading-[1.55] text-ink-soft">{plan.description}</p>

                <div className="my-6 h-px w-full bg-linear-to-r from-white/15 via-white/[0.06] to-transparent" aria-hidden="true" />

                {/* Full feature list */}
                <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Key Inclusions
                </span>
                <ul className="space-y-2.5">
                  <li className={cn("flex items-start text-[14px] font-medium leading-[1.45]", plan.highlighted ? "text-silver-bright" : "text-signal-bright")}>
                    <span className="mr-2.5 mt-[2px] shrink-0 text-[13px] font-bold text-signal-bright" aria-hidden="true">✦</span>
                    <span>{plan.domain}</span>
                  </li>
                  {plan.inclusions.map((item) => (
                    <li key={item} className="flex items-start text-[14px] font-medium leading-[1.45] text-ink">
                      <span className="mr-2.5 mt-[2px] shrink-0 text-[13px] font-bold text-signal-bright" aria-hidden="true">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Pushes price and CTA to a shared baseline across cards */}
                <div className="min-h-6 flex-1" />

                {/* Price */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <span className="block font-mono text-[11px] text-ink-muted">{plan.timeline}</span>
                  <div className="mt-4">
                    <span className="block text-[14px] font-medium tracking-tight text-ink-soft">{plan.priceLabel}</span>
                    <span className="mt-0.5 block font-mono text-[44px] font-bold leading-[1.05] tracking-tighter text-ink">
                      {plan.price}
                    </span>
                    <span className="mt-2 block font-mono text-[11.5px] text-ink-muted">{plan.microcopy}</span>
                  </div>

                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className="group/cta mt-6 h-auto min-h-[52px] w-full rounded-full px-4 md:px-5 py-3 text-[13.5px] font-semibold whitespace-normal text-center leading-tight"
                    asChild
                  >
                    <a href={plan.ctaHref}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-1" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="text-center mt-12 md:mt-14">
          <p className="text-[11px] font-mono text-ink-muted/70 max-w-xl mx-auto px-4">{PRICING_FOOTNOTE}</p>
        </div>
      </Container>
    </section>
  );
}
