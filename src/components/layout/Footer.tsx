import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CookieSettingsTrigger } from "@/components/ui/CookieSettingsTrigger";

export function Footer() {
  return (
    <footer className="glass-panel text-[#3B2A21] pt-14 md:pt-20 pb-8 md:pb-10 rounded-t-[24px] md:rounded-t-[36px] mt-12 md:mt-20 border-t border-white/50 relative z-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="md:col-span-2 flex flex-col space-y-3 md:space-y-4">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight text-[#3B2A21]">
              DEADCODE LABS
            </Link>
            <p className="text-[#6D5A4B] max-w-sm text-sm md:text-base leading-relaxed">
              Digital ideas, engineered. Boutique digital product studio crafting high-end software, platforms, and experiences.
            </p>
            <div className="flex flex-col space-y-1.5 pt-2">
              <a href="mailto:contact@deadcode.space" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm font-mono">
                contact@deadcode.space
              </a>
              <a href="tel:+919151741310" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm font-mono">
                +91 9151741310
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#927E6E] font-semibold mb-1">Capabilities</h4>
            <Link href="/services#web-experiences" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">Web Experiences</Link>
            <Link href="/services#e-commerce" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">E-Commerce Systems</Link>
            <Link href="/services#ai-products" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">AI Product Design</Link>
            <Link href="/services#saas-digital-products" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">SaaS & Systems</Link>
          </div>

          <div className="flex flex-col space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#927E6E] font-semibold mb-1">Studio Network</h4>
            <a href="https://www.linkedin.com/in/divyanshuverma09/" target="_blank" rel="noopener noreferrer" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">LinkedIn</a>
            <a href="https://www.instagram.com/truly_divyanshu/" target="_blank" rel="noopener noreferrer" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">Instagram</a>
            <a href="https://github.com/divyanshu76" target="_blank" rel="noopener noreferrer" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">GitHub</a>
            <a href="https://www.divyanshu.space/" target="_blank" rel="noopener noreferrer" className="text-[#6D5A4B] hover:text-[#E10600] transition-colors text-sm">Founder Portfolio ↗</a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/40 flex flex-col items-center justify-between gap-6">
          <div className="w-full flex flex-wrap gap-4 text-xs font-mono text-[#927E6E] justify-center md:justify-start">
            <Link href="/privacy-policy" className="hover:text-[#3B2A21] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#3B2A21] transition-colors">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-[#3B2A21] transition-colors">Cookie Policy</Link>
            <Link href="/service-terms" className="hover:text-[#3B2A21] transition-colors">Service Terms</Link>
            <Link href="/disclaimer" className="hover:text-[#3B2A21] transition-colors">Disclaimer</Link>
            <Link href="/intellectual-property" className="hover:text-[#3B2A21] transition-colors">Intellectual Property</Link>
            <Link href="/accessibility" className="hover:text-[#3B2A21] transition-colors">Accessibility</Link>
            <Link href="/security" className="hover:text-[#3B2A21] transition-colors">Security</Link>
            <CookieSettingsTrigger />
          </div>
          <div className="w-full flex text-xs font-mono text-[#927E6E] justify-center md:justify-start">
            <p>© 2023 DEADCODE LABS. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
