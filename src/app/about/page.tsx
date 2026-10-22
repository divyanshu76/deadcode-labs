import {
  FOUNDER_ID,
  ORGANIZATION_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbJsonLd,
  jsonLdString,
  pageMetadata,
} from "@/lib/seo";
import { FounderSection } from "@/components/sections/FounderSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Us & Founder Divyanshu Verma",
  description:
    "Meet Divyanshu Verma, founder of DEADCODE LABS, an online studio in Mirzapur, India building web apps, e-commerce, AI systems and automation.",
});

const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/about")}#webpage`,
    url: absoluteUrl("/about"),
    name: "About Us & Founder Divyanshu Verma",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mentions: { "@id": FOUNDER_ID },
  },
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
];

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(aboutJsonLd) }}
      />
      <FounderSection />
      <WhyUsSection />
      <ProcessSection />
    </div>
  );
}
