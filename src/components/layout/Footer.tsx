import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[#201D1A] text-[#F5F1E8] pt-14 md:pt-20 pb-8 md:pb-10 rounded-t-[24px] md:rounded-t-[36px] mt-12 md:mt-20 border-t border-[rgba(245,241,232,0.08)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="md:col-span-2 flex flex-col space-y-3 md:space-y-4">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight text-[#F5F1E8]">
              DEADCODE LABS
            </Link>
            <p className="text-[#81786E] max-w-sm text-sm md:text-base leading-relaxed">
              Digital ideas, engineered. Boutique digital product studio crafting high-end software, platforms, and experiences.
            </p>
            <div className="flex flex-col space-y-1.5 pt-2">
              <a href="mailto:divyanshuv0905@gmail.com" className="text-[#D8C7AA] hover:text-white transition-colors text-sm font-mono">
                divyanshuv0905@gmail.com
              </a>
              <a href="tel:+919151741310" className="text-[#D8C7AA] hover:text-white transition-colors text-sm font-mono">
                +91 9151741310
              </a>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#81786E] font-semibold mb-1">Capabilities</h4>
            <Link href="/services#web-experiences" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">Web Experiences</Link>
            <Link href="/services#e-commerce" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">E-Commerce Systems</Link>
            <Link href="/services#ai-products" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">AI Product Design</Link>
            <Link href="/services#saas-digital-products" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">SaaS & Systems</Link>
          </div>

          <div className="flex flex-col space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#81786E] font-semibold mb-1">Studio Network</h4>
            <a href="https://www.linkedin.com/in/divyanshuverma09/" target="_blank" rel="noopener noreferrer" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">LinkedIn</a>
            <a href="https://www.instagram.com/truly_divyanshu/" target="_blank" rel="noopener noreferrer" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">Instagram</a>
            <a href="https://github.com/divyanshu76" target="_blank" rel="noopener noreferrer" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">GitHub</a>
            <a href="https://www.divyanshu.space/" target="_blank" rel="noopener noreferrer" className="text-[#D8C7AA]/80 hover:text-white transition-colors text-sm">Founder Portfolio ↗</a>
          </div>
        </div>

        <div className="pt-6 border-t border-[rgba(245,241,232,0.10)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#81786E] font-mono">
          <p>© {new Date().getFullYear()} DEADCODE LABS. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
