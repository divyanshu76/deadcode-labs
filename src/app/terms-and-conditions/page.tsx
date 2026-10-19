import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Legal documentation and policies for DEADCODE LABS.",
};

export default function termsandconditionsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="October 10, 2026">
      
      <LegalSection title="1. Agreement to Terms">
        <p>By accessing or using deadcode.space (the "Website"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our Website.</p>
      </LegalSection>
      <LegalSection title="2. Website Use and Conduct">
        <p>You agree to use the Website only for lawful purposes. You must not:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Website in any way that causes, or may cause, damage to the Website or impairment of the availability or accessibility of the Website.</li>
          <li>Engage in unauthorized data collection (scraping, mining, etc.).</li>
          <li>Submit false, malicious, or spam inquiries through our forms.</li>
        </ul>
      </LegalSection>
      <LegalSection title="3. Intellectual Property">
        <p>The content on this Website, including text, graphics, logos, brand elements, and software architecture, is the property of DEADCODE LABS and is protected by intellectual property laws. You may not reproduce or distribute any content without our prior written permission.</p>
      </LegalSection>
      <LegalSection title="4. Informational Content and Estimates">
        <p>Information provided on this Website, including pricing estimates or project timelines, is for informational purposes only. Official project scopes, timelines, and costs will be governed by a separate, signed agreement.</p>
      </LegalSection>
      <LegalSection title="5. Limitation of Liability">
        <p>To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the Website.</p>
      </LegalSection>
      <LegalSection title="6. Governing Law">
        <p>These terms shall be governed and construed in accordance with the laws of India, with jurisdiction in Uttar Pradesh, without regard to conflict of law provisions.</p>
      </LegalSection>
      <LegalSection title="7. Contact Us">
        <p>Questions about the Terms & Conditions should be sent to us at <a href="mailto:contact@deadcode.space" className="text-signal-bright hover:underline">contact@deadcode.space</a>.</p>
      </LegalSection>
    
    </LegalLayout>
  );
}