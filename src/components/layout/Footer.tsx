import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CookieSettingsTrigger } from "@/components/ui/CookieSettingsTrigger";
import { FOUNDER } from "@/lib/seo";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Founder", href: "/about#founder" },
  { label: "Start a Project", href: "/#start-project" },
];

const CAPABILITIES = [
  { label: "Web Experiences", href: "/services#web-experiences" },
  { label: "E-Commerce Systems", href: "/services#e-commerce" },
  { label: "AI Product Design", href: "/services#ai-products" },
  { label: "SaaS & Systems", href: "/services#saas-digital-products" },
];

const NETWORK = [
  { label: "LinkedIn", href: FOUNDER.linkedin, ariaLabel: "Founder Divyanshu Verma on LinkedIn" },
  { label: "Instagram", href: "https://www.instagram.com/truly_divyanshu/", ariaLabel: "Founder Divyanshu Verma on Instagram" },
  { label: "GitHub", href: FOUNDER.github, ariaLabel: "Founder Divyanshu Verma on GitHub" },
  { label: "Founder Portfolio ↗", href: "https://www.divyanshu.space/", ariaLabel: "Founder Divyanshu Verma's portfolio" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Service Terms", href: "/service-terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Intellectual Property", href: "/intellectual-property" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Security", href: "/security" },
];

const linkClass = "text-ink-soft hover:text-silver-bright transition-colors text-sm";
const headingClass = "font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1";

/** The closing chapter: a dark stage carrying navigation, contact and the brand signature. */
export function Footer() {
  return (
    <footer className="dark-stage relative z-10 mt-12 md:mt-20 pt-16 md:pt-24 pb-8 md:pb-10 rounded-t-[28px] md:rounded-t-[44px] overflow-hidden">
      <div className="metal-rule absolute top-0 inset-x-[8%] opacity-40" aria-hidden="true" />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 md:gap-12 mb-14 md:mb-20">
          <div className="col-span-2 md:col-span-5 flex flex-col gap-4">
            <span className="chapter-label">12 — Studio Signature</span>
            <p className="font-display text-3xl md:text-4xl leading-[1.08] text-silver-bright max-w-md">
              Digital ideas, <span className="italic text-silver">engineered.</span>
            </p>
            <p className="text-ink-soft max-w-sm text-sm md:text-[15px] leading-relaxed">
              Boutique digital product studio crafting high-end software, platforms, and experiences.
            </p>
            <div className="flex flex-col gap-1.5 pt-2">
              <a href="mailto:contact@deadcode.space" className="text-silver-bright hover:text-signal transition-colors text-sm font-mono w-fit">
                contact@deadcode.space
              </a>
              <a href="tel:+919151741310" className="text-ink-soft hover:text-signal transition-colors text-sm font-mono w-fit">
                +91 9151741310
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 flex flex-col gap-2.5">
            <h4 className={headingClass}>Navigate</h4>
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h4 className={headingClass}>Capabilities</h4>
            {CAPABILITIES.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="col-span-2 md:col-span-2 flex flex-col gap-2.5">
            <h4 className={headingClass}>Studio Network</h4>
            {NETWORK.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.ariaLabel} (opens in a new tab)`} className={linkClass}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Registration */}
        <div className="flex flex-wrap items-center gap-3 pb-6 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-muted">
          <span>MSME · Udyam Registration</span>
          <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-silver-bright tracking-[0.12em]">
            UDYAM-UP-57-0055432
          </span>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-5">
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-mono text-ink-muted [&_button]:text-ink-muted [&_button:hover]:text-silver-bright">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-silver-bright transition-colors">
                {l.label}
              </Link>
            ))}
            <CookieSettingsTrigger />
          </div>
          <p className="text-xs font-mono text-ink-muted">© 2023 DEADCODE LABS. All rights reserved.</p>
        </div>
      </Container>

      {/* Brand signature: an oversized wordmark sinking into the floor */}
      <div aria-hidden="true" className="mt-10 md:mt-14 select-none pointer-events-none overflow-hidden">
        <p className="font-display text-center leading-[0.8] tracking-[-0.03em] text-[length:clamp(64px,17vw,300px)] bg-linear-to-b from-white/[0.14] to-white/0 bg-clip-text text-transparent translate-y-[18%]">
          DEADCODE<span className="italic">LABS</span>
        </p>
      </div>
    </footer>
  );
}
