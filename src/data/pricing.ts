/**
 * Single source of truth for the pricing section.
 * Plan content is carried over unchanged from the original implementation;
 * only the plan names and amounts were updated.
 */

export type PricingIcon = "starter" | "business" | "premium";

export interface PricingPlan {
  /** Stable id, independent of the display name. */
  id: "starter" | "business" | "premium";
  name: string;
  icon: PricingIcon;
  tagline: string;
  priceLabel: string;
  price: string;
  microcopy: string;
  description: string;
  /** Plan-specific domain registration term (see footnote). */
  domain: string;
  inclusions: string[];
  timeline: string;
  highlighted: boolean;
  cta: string;
  ctaHref: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Website",
    icon: "starter",
    tagline: "Early-stage brands & MVPs",
    priceLabel: "Starting from",
    price: "$199",
    microcopy: "Scope-based pricing · Clear deliverables",
    description: "A premium, conversion-focused digital presence for early-stage businesses and new brands.",
    domain: "1-Year Domain Included*",
    inclusions: [
      "Bespoke UI/UX design",
      "Responsive website development",
      "Next.js high-performance build",
      "Core SEO setup",
      "Contact / lead integration",
      "Deployment support",
    ],
    timeline: "Est. 1–2 Weeks Delivery",
    highlighted: false,
    cta: "Inquire for Launch",
    ctaHref: "/start-a-project",
  },
  {
    id: "business",
    name: "Business Website",
    icon: "business",
    tagline: "Growing brands & e-commerce",
    priceLabel: "Starting from",
    price: "$699",
    microcopy: "Scope-based pricing · Clear deliverables",
    description: "A more advanced digital experience for businesses ready to improve their online presence and customer journey.",
    domain: "1-Year .com / .in Domain Included*",
    inclusions: [
      "Custom UI/UX system",
      "Multi-page website or e-commerce build",
      "Interactive animations & motion",
      "CMS / CRM integration",
      "Analytics integration",
      "Performance optimization",
      "Deployment support",
    ],
    timeline: "Est. 2–4 Weeks Delivery",
    highlighted: true,
    cta: "Discuss Growth Scope",
    ctaHref: "/start-a-project",
  },
  {
    id: "premium",
    name: "Premium Website",
    icon: "premium",
    tagline: "Custom SaaS & complex systems",
    priceLabel: "Starting from",
    price: "$999",
    microcopy: "Custom scope · Architecture-led pricing",
    description: "Custom-built digital products and applications for businesses that need more than a conventional website.",
    domain: "1-Year .com / .in Domain Included*",
    inclusions: [
      "Custom application architecture",
      "Frontend & backend development",
      "Database & authentication",
      "API integrations",
      "AI & automated workflows",
      "Custom dashboards",
      "Production deployment",
    ],
    timeline: "Est. Tailored Roadmap",
    highlighted: false,
    cta: "Schedule Architecture Call",
    ctaHref: "/start-a-project",
  },
];

export const PRICING_FOOTNOTE =
  "*Standard domain registration included for 1 year. Business Website & Premium Website plans include standard .com / .in registration. Premium domains and renewals are billed separately.";

/** Existing MSME / Udyam registration shown on the site (see UdyamTrustSection). */
export const UDYAM_REGISTRATION = "UDYAM-UP-57-0055432";
