import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/intellectual-property",
  title: "Intellectual Property Policy",
  description: "How intellectual property and ownership of delivered work are handled by DEADCODE LABS.",
});

export default function intellectualpropertyPage() {
  return (
    <LegalLayout title="Intellectual Property Policy" lastUpdated="October 10, 2026">
      
      <LegalSection title="1. Ownership of Website Content">
        <p>All content, branding, designs, graphics, and code architecture presented on deadcode.space are the intellectual property of DEADCODE LABS unless otherwise noted. Unauthorized copying, framing, or distribution is prohibited.</p>
      </LegalSection>
      <LegalSection title="2. Client Assets">
        <p>Any materials, logos, or content provided by clients during a project remain the intellectual property of the respective client. We do not claim ownership over client-provided materials.</p>
      </LegalSection>
      <LegalSection title="3. Open Source Components">
        <p>Our projects frequently utilize open-source frameworks (e.g., React, Next.js, Tailwind CSS). These components remain under their respective open-source licenses (such as MIT or Apache 2.0).</p>
      </LegalSection>
      <LegalSection title="4. Reporting Infringement">
        <p>If you believe that any content on our website infringes upon your intellectual property rights, please contact us immediately at <a href="mailto:contact@deadcode.space" className="text-signal-bright hover:underline">contact@deadcode.space</a> with a detailed description of the alleged infringement.</p>
      </LegalSection>
    
    </LegalLayout>
  );
}