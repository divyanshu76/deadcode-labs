import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Legal documentation and policies for DEADCODE LABS.",
};

export default function privacypolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="October 10, 2026">
      
      <LegalSection title="1. Introduction">
        <p>This Privacy Policy explains how [CONFIRM: Full Business Entity Name, e.g., DEADCODE LABS] ("we", "us", "our") collects, uses, and safeguards your personal data when you visit our website (deadcode.space) or engage our services. We respect your privacy and are committed to protecting your personal information.</p>
        <p>This policy is provided as a draft for owner review and should be reviewed by legal counsel for full compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India and applicable global regulations.</p>
      </LegalSection>
      <LegalSection title="2. Information We Collect">
        <p>We only collect information necessary to provide our services and respond to your inquiries. This includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Information provided by you:</strong> Name, business name, email address, phone number, project budget, and project details submitted through our Project Inquiry form or via direct contact at contact@deadcode.space.</li>
          <li><strong>Technical Data:</strong> [CONFIRM: Are server logs actively monitored for IP addresses? The inquiry API currently checks IPs for basic rate limiting]. We do not currently use invasive tracking cookies or analytics pixels unless explicitly consented to.</li>
        </ul>
      </LegalSection>
      <LegalSection title="3. Purpose of Processing">
        <p>We process your personal data for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To respond to your project inquiries and provide estimates.</li>
          <li>To communicate effectively regarding ongoing or potential projects.</li>
          <li>To maintain basic security and prevent abuse of our public forms (e.g., rate-limiting).</li>
        </ul>
      </LegalSection>
      <LegalSection title="4. Data Storage and Third-Party Services">
        <p>Your data is stored securely. We utilize third-party service providers who assist us in operating our website and business. These include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Supabase:</strong> Used for secure database storage of project inquiries.</li>
          <li><strong>Resend:</strong> Used for transactional email delivery (e.g., inquiry confirmations).</li>
          <li>[CONFIRM: Any other cloud providers (e.g. Vercel) or CRMs used for hosting and data storage].</li>
        </ul>
        <p>We do not sell, rent, or trade your personal data to any third parties.</p>
      </LegalSection>
      <LegalSection title="5. Data Retention and Security">
        <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal or accounting requirements. [CONFIRM: State exact data retention period, e.g., 2 years for inquiries].</p>
        <p>We implement reasonable security safeguards, including server-side validation, rate limiting, and encrypted databases, to protect your data. However, no internet transmission is completely secure.</p>
      </LegalSection>
      <LegalSection title="6. Your Privacy Rights">
        <p>Subject to applicable law (including the DPDP Act, where applicable), you may have the right to request access, correction, or erasure of your personal data. You may also have the right to withdraw consent for processing.</p>
        <p>To exercise these rights, please contact us at contact@deadcode.space. [CONFIRM: Describe process and timeline for handling privacy requests].</p>
      </LegalSection>
      <LegalSection title="7. Contact Us">
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:contact@deadcode.space" className="text-[#C96F3D] hover:underline">contact@deadcode.space</a></p>
        <p>[CONFIRM: Full Business Address and Grievance Officer details if required by law].</p>
      </LegalSection>
    
    </LegalLayout>
  );
}