import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/cookie-policy",
  title: "Cookie Policy",
  description: "How DEADCODE LABS uses cookies and similar technologies on deadcode.space, and how to manage your preferences.",
});

export default function cookiepolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="October 10, 2026">
      
      <LegalSection title="1. What Are Cookies?">
        <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.</p>
      </LegalSection>
      <LegalSection title="2. How We Use Cookies">
        <p>Our website currently uses cookies primarily for essential functionality. We do not use intrusive third-party advertising or marketing cookies.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Strictly Necessary Cookies:</strong> These are required for the operation of our website (e.g., saving your cookie consent preferences). They cannot be switched off in our systems.</li>
          <li><strong>Analytics/Performance Cookies:</strong> Used exclusively to evaluate site performance, load times, and anonymous usage patterns to optimize user experience.</li>
        </ul>
      </LegalSection>
      <LegalSection title="3. Managing Your Cookie Preferences">
        <p>You can manage your cookie preferences at any time by clicking the "Cookie Settings" link in the footer of our website. Additionally, most web browsers allow you to control cookies through their settings preferences.</p>
      </LegalSection>
      <LegalSection title="4. Contact Us">
        <p>For more information about our use of cookies, please contact us at <a href="mailto:contact@deadcode.space" className="text-signal-bright hover:underline">contact@deadcode.space</a>.</p>
      </LegalSection>
    
    </LegalLayout>
  );
}