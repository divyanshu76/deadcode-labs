const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');

function ensureDir(route) {
  const p = path.join(appDir, route);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  return p;
}

const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const pages = [
  {
    route: 'privacy-policy',
    title: 'Privacy Policy',
    content: `
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
    `
  },
  {
    route: 'terms-and-conditions',
    title: 'Terms & Conditions',
    content: `
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
        <p>The content on this Website, including text, graphics, logos, and software, is the property of [CONFIRM: Business Entity Name] and is protected by intellectual property laws. You may not reproduce or distribute any content without our prior written permission.</p>
      </LegalSection>
      <LegalSection title="4. Informational Content and Estimates">
        <p>Information provided on this Website, including pricing estimates or project timelines, is for informational purposes only. Official project scopes, timelines, and costs will be governed by a separate, signed agreement.</p>
      </LegalSection>
      <LegalSection title="5. Limitation of Liability">
        <p>To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the Website.</p>
      </LegalSection>
      <LegalSection title="6. Governing Law">
        <p>These terms shall be governed and construed in accordance with the laws of [CONFIRM: Jurisdiction, e.g., India/Uttar Pradesh], without regard to its conflict of law provisions.</p>
      </LegalSection>
      <LegalSection title="7. Contact Us">
        <p>Questions about the Terms & Conditions should be sent to us at <a href="mailto:contact@deadcode.space" className="text-[#C96F3D] hover:underline">contact@deadcode.space</a>.</p>
      </LegalSection>
    `
  },
  {
    route: 'cookie-policy',
    title: 'Cookie Policy',
    content: `
      <LegalSection title="1. What Are Cookies?">
        <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.</p>
      </LegalSection>
      <LegalSection title="2. How We Use Cookies">
        <p>Our website currently uses cookies primarily for essential functionality. We do not use intrusive third-party advertising or marketing cookies.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Strictly Necessary Cookies:</strong> These are required for the operation of our website (e.g., saving your cookie consent preferences). They cannot be switched off in our systems.</li>
          <li><strong>Analytics/Performance Cookies:</strong> [CONFIRM: State clearly if any analytics like Google Analytics, Vercel Analytics, or PostHog are used. Currently, the source code does not indicate active third-party analytics]. If implemented, these help us understand how visitors interact with our website.</li>
        </ul>
      </LegalSection>
      <LegalSection title="3. Managing Your Cookie Preferences">
        <p>You can manage your cookie preferences at any time by clicking the "Cookie Settings" link in the footer of our website. Additionally, most web browsers allow you to control cookies through their settings preferences.</p>
      </LegalSection>
      <LegalSection title="4. Contact Us">
        <p>For more information about our use of cookies, please contact us at <a href="mailto:contact@deadcode.space" className="text-[#C96F3D] hover:underline">contact@deadcode.space</a>.</p>
      </LegalSection>
    `
  },
  {
    route: 'service-terms',
    title: 'Service Terms / Project Agreement',
    content: `
      <LegalSection title="1. Applicability">
        <p>These Service Terms outline the general principles governing client projects undertaken by DEADCODE LABS. These terms apply unless superseded by a separate, signed formal Project Agreement, Master Services Agreement (MSA), or Statement of Work (SOW).</p>
      </LegalSection>
      <LegalSection title="2. Project Scope and Proposals">
        <p>All work will be performed according to a written proposal or SOW accepted by the client. Any requests outside the agreed scope (Change Requests) will require a separate agreement and may incur additional costs and timeline adjustments.</p>
      </LegalSection>
      <LegalSection title="3. Client Responsibilities">
        <p>The client agrees to provide timely feedback, approvals, and any necessary assets (e.g., copy, images, credentials) required for project progression. Delays by the client may result in project timeline extensions.</p>
      </LegalSection>
      <LegalSection title="4. Payment Terms">
        <p>[CONFIRM: Standard payment structure, e.g., "A 50% non-refundable deposit is required to commence work, with the remaining balance due upon project completion prior to handover."]. All invoices must be paid within [CONFIRM: X days] of receipt. Taxes will be applied where applicable by law.</p>
      </LegalSection>
      <LegalSection title="5. Intellectual Property and Licensing">
        <p>Upon full and final payment, the client is granted the agreed rights to the final deliverables. DEADCODE LABS retains the right to use pre-existing tools, open-source code, and reusable internal components. We also reserve the right to display the completed work in our portfolio unless explicitly restricted by a Non-Disclosure Agreement (NDA).</p>
      </LegalSection>
      <LegalSection title="6. Maintenance and Support">
        <p>Post-launch support and ongoing maintenance are not included by default after project delivery, unless specifically outlined in the project agreement or a separate maintenance contract.</p>
      </LegalSection>
    `
  },
  {
    route: 'disclaimer',
    title: 'Disclaimer',
    content: `
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
    `
  },
  {
    route: 'intellectual-property',
    title: 'Intellectual Property Policy',
    content: `
      <LegalSection title="1. Ownership of Website Content">
        <p>All content, branding, designs, graphics, and code architecture presented on deadcode.space are the intellectual property of [CONFIRM: Business Entity Name] unless otherwise noted. Unauthorized copying, framing, or distribution is prohibited.</p>
      </LegalSection>
      <LegalSection title="2. Client Assets">
        <p>Any materials, logos, or content provided by clients during a project remain the intellectual property of the respective client. We do not claim ownership over client-provided materials.</p>
      </LegalSection>
      <LegalSection title="3. Open Source Components">
        <p>Our projects frequently utilize open-source frameworks (e.g., React, Next.js, Tailwind CSS). These components remain under their respective open-source licenses (such as MIT or Apache 2.0).</p>
      </LegalSection>
      <LegalSection title="4. Reporting Infringement">
        <p>If you believe that any content on our website infringes upon your intellectual property rights, please contact us immediately at <a href="mailto:contact@deadcode.space" className="text-[#C96F3D] hover:underline">contact@deadcode.space</a> with a detailed description of the alleged infringement.</p>
      </LegalSection>
    `
  },
  {
    route: 'accessibility',
    title: 'Accessibility Statement',
    content: `
      <LegalSection title="1. Our Commitment">
        <p>DEADCODE LABS is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards where feasible.</p>
      </LegalSection>
      <LegalSection title="2. Implemented Features">
        <p>We strive to implement the following accessibility features on our website:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Semantic HTML structure to support assistive technologies.</li>
          <li>Keyboard navigability for core features and interactive elements.</li>
          <li>Adequate color contrast ratios in our design system.</li>
          <li>ARIA labels where appropriate on interactive controls.</li>
        </ul>
      </LegalSection>
      <LegalSection title="3. Known Limitations">
        <p>While we aim for comprehensive accessibility, some complex visual features (such as intensive WebGL or Framer Motion animations) may present challenges. Users can utilize their system's "Prefers Reduced Motion" settings, which our website respects to minimize animations.</p>
      </LegalSection>
      <LegalSection title="4. Feedback">
        <p>We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers, please let us know by emailing <a href="mailto:contact@deadcode.space" className="text-[#C96F3D] hover:underline">contact@deadcode.space</a>.</p>
      </LegalSection>
    `
  },
  {
    route: 'security',
    title: 'Security & Responsible Disclosure',
    content: `
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
    `
  }
];

pages.forEach(page => {
  const p = ensureDir(page.route);
  const code = [
    'import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";',
    'import type { Metadata } from "next";',
    '',
    'export const metadata: Metadata = {',
    '  title: "' + page.title + '",',
    '  description: "Legal documentation and policies for DEADCODE LABS.",',
    '};',
    '',
    'export default function ' + page.route.replace(/-/g, '') + 'Page() {',
    '  return (',
    '    <LegalLayout title="' + page.title + '" lastUpdated="' + dateStr + '">',
    '      ' + page.content,
    '    </LegalLayout>',
    '  );',
    '}'
  ].join('\\n');
  fs.writeFileSync(path.join(p, 'page.tsx'), code, 'utf8');
});

console.log('Legal pages created successfully.');
