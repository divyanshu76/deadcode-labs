import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/disclaimer",
  title: "Disclaimer",
  description: "Disclaimer covering the information published on the DEADCODE LABS website.",
});

export default function disclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="October 10, 2026">
      
      <LegalSection title="1. General Information">
        <p>The information provided by DEADCODE LABS on deadcode.space is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website.</p>
      </LegalSection>
      <LegalSection title="2. Professional Advice">
        <p>Any project estimates, timelines, architectural recommendations, or technical insights presented on this website do not constitute binding professional advice or a formal contract. You should consult directly with us for specific advice tailored to your project requirements.</p>
      </LegalSection>
      <LegalSection title="3. Third-Party Services">
        <p>Our website and the solutions we engineer often rely on third-party services (e.g., Vercel, Supabase, Resend). We are not responsible for the uptime, security breaches, or policy changes of these independent providers.</p>
      </LegalSection>
      <LegalSection title="4. No Guaranteed Outcomes">
        <p>While we build high-quality software, we do not guarantee specific business outcomes, financial gains, SEO rankings, or uninterrupted service. Software performance is dependent on numerous external factors beyond our control.</p>
      </LegalSection>
    
    </LegalLayout>
  );
}