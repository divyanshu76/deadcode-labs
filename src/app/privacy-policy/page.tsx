import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection practices for DEADCODE LABS.",
};

export default function privacypolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="October 10, 2026">
      
      <LegalSection title="1. Introduction">
        <p>This Privacy Policy explains how DEADCODE LABS (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, and safeguards your personal data when you visit our website (deadcode.space) or engage our digital engineering services. We respect your privacy and are committed to protecting your personal information.</p>
        <p>This policy complies with applicable data protection principles, including the Digital Personal Data Protection Act, 2023 (DPDP Act) of India and international standards.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We only collect information necessary to provide our services and respond to your project requests. This includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Information provided directly by you:</strong> Name, business name, email address, phone number, project budget, and technical details submitted through our Project Inquiry form or direct correspondence.</li>
          <li><strong>Technical Data:</strong> Anonymized server logs, basic rate limiting metadata, and technical diagnostic telemetry. We do not use intrusive cross-site ad tracking pixels.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Purpose of Processing">
        <p>We process your personal data strictly for legitimate operational purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To evaluate project scopes, respond to inquiries, and provide architectural estimates.</li>
          <li>To communicate effectively regarding ongoing contracts, engineering sprints, and support.</li>
          <li>To maintain platform security, prevent automated spam, and enforce rate limiting.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Data Storage and Third-Party Services">
        <p>Your data is stored with encrypted enterprise-grade protocols. We utilize vetted infrastructure providers:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Supabase:</strong> Encrypted PostgreSQL database storage for project inquiries.</li>
          <li><strong>Resend:</strong> Secure transactional email delivery for client notifications.</li>
          <li><strong>Vercel:</strong> High-performance edge cloud hosting and delivery network.</li>
        </ul>
        <p>We do not sell, rent, monetize, or trade your personal data to any external third party.</p>
      </LegalSection>

      <LegalSection title="5. Data Retention and Security">
        <p>We retain your personal inquiry data only for as long as necessary to fulfill project requirements, legal accounting obligations, and ongoing advisory relationships.</p>
        <p>We implement stringent technical security controls, including TLS/HTTPS encryption, strict server validation, database row-level security, and rate limiting.</p>
      </LegalSection>

      <LegalSection title="6. Your Privacy Rights">
        <p>You have the right to request access, correction, or deletion of your personal data at any time. You may also withdraw consent for ongoing communications.</p>
        <p>To exercise any of these privacy rights, email us directly at <a href="mailto:contact@deadcode.space" className="text-signal font-semibold underline hover:text-signal-dark">contact@deadcode.space</a>.</p>
      </LegalSection>

      <LegalSection title="7. Contact Us">
        <p>If you have questions regarding this Privacy Policy or data governance practices, please reach out to:</p>
        <p><strong>DEADCODE LABS</strong></p>
        <p>Email: <a href="mailto:contact@deadcode.space" className="text-signal font-semibold underline hover:text-signal-dark">contact@deadcode.space</a></p>
        <p>Office: Lucknow, Uttar Pradesh, India / Global Edge</p>
      </LegalSection>
    
    </LegalLayout>
  );
}