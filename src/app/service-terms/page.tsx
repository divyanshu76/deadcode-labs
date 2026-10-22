import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/service-terms",
  title: "Service Terms / Project Agreement",
  description: "Service terms and project agreement covering engagements with DEADCODE LABS.",
});

export default function servicetermsPage() {
  return (
    <LegalLayout title="Service Terms / Project Agreement" lastUpdated="October 10, 2026">
      
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
        <p>A structured milestone payment schedule (typically a deposit upon kickoff and remaining balance upon milestone completion prior to production handover) applies to all engagements as detailed in the project SOW. Invoices must be paid within 7 days of receipt. Applicable taxes are applied as required by law.</p>
      </LegalSection>
      <LegalSection title="5. Intellectual Property and Licensing">
        <p>Upon full and final payment, the client is granted the agreed rights to the final deliverables. DEADCODE LABS retains the right to use pre-existing tools, open-source code, and reusable internal components. We also reserve the right to display the completed work in our portfolio unless explicitly restricted by a Non-Disclosure Agreement (NDA).</p>
      </LegalSection>
      <LegalSection title="6. Maintenance and Support">
        <p>Post-launch support and ongoing maintenance are not included by default after project delivery, unless specifically outlined in the project agreement or a separate maintenance contract.</p>
      </LegalSection>
    
    </LegalLayout>
  );
}