import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Legal documentation and policies for DEADCODE LABS.",
};

export default function accessibilityPage() {
  return (
    <LegalLayout title="Accessibility Statement" lastUpdated="October 10, 2026">
      
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
        <p>We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers, please let us know by emailing <a href="mailto:contact@deadcode.space" className="text-[#E10600] hover:underline">contact@deadcode.space</a>.</p>
      </LegalSection>
    
    </LegalLayout>
  );
}