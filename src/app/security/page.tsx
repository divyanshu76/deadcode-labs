import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Responsible Disclosure",
  description: "Legal documentation and policies for DEADCODE LABS.",
};

export default function securityPage() {
  return (
    <LegalLayout title="Security & Responsible Disclosure" lastUpdated="October 10, 2026">
      
      <LegalSection title="1. Security Overview">
        <p>At DEADCODE LABS, we take the security of our systems and our clients' data seriously. We employ industry-standard practices, including secure environment variable management, server-side validation, and encrypted data storage where applicable.</p>
      </LegalSection>
      <LegalSection title="2. Responsible Disclosure">
        <p>If you are a security researcher or user who has discovered a potential vulnerability in our website or systems, we ask that you report it to us responsibly.</p>
        <p>Please email your findings to <a href="mailto:contact@deadcode.space" className="text-[#C96F3D] hover:underline">contact@deadcode.space</a>. Provide enough detail (steps to reproduce, proof of concept) so we can investigate the issue effectively.</p>
      </LegalSection>
      <LegalSection title="3. Rules of Engagement">
        <p>When investigating potential vulnerabilities, you must:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Not exploit the vulnerability to access, modify, or delete data belonging to others.</li>
          <li>Not disrupt our services (e.g., DoS or DDoS attacks).</li>
          <li>Not publicly disclose the vulnerability until we have had a reasonable timeframe to address it.</li>
        </ul>
      </LegalSection>
    
    </LegalLayout>
  );
}