import type { Metadata } from "next";

export const SITE_URL = "https://deadcode.space";
export const SITE_NAME = "DEADCODE LABS";
export const SITE_DESCRIPTION =
  "DEADCODE LABS: an online digital product studio based in Mirzapur, India, founded by Divyanshu Verma. Remote web apps, e-commerce, AI and automation.";

export const FOUNDER = {
  name: "Divyanshu Verma",
  url: `${SITE_URL}/about#founder`,
  github: "https://github.com/divyanshu76",
  linkedin: "https://www.linkedin.com/in/divyanshuverma09/",
};

// Stable entity identifiers shared by every JSON-LD block on the site.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

export function absoluteUrl(path = "/") {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

// Served by app/opengraph-image.tsx. Pages that set `openGraph` replace the
// file-based image, so the shared card is referenced explicitly here.
const SHARE_IMAGE = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: "DEADCODE LABS — Digital ideas, engineered.",
};

/**
 * Per-page metadata with a self-referencing canonical and a complete Open Graph block.
 * Next.js merges metadata shallowly, so a page that sets `openGraph` must set all of it.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  return {
    // The root layout's title template would otherwise double the brand on the homepage.
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
  };
}

/** Serialises JSON-LD safely for inline <script> tags. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
      description: SITE_DESCRIPTION,
      email: "contact@deadcode.space",
      telephone: "+91-9151741310",
      founder: { "@id": FOUNDER_ID },
      // Online/remote studio: locality only, no street address or customer-facing premises.
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mirzapur",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        "International (remote)",
      ],
      knowsAbout: [
        "Full-stack web development",
        "Custom web applications",
        "SaaS engineering",
        "E-commerce development",
        "UI/UX design",
        "AI-enabled systems",
        "Workflow automation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: FOUNDER.name,
      url: FOUNDER.url,
      jobTitle: "Founder & Full Stack Developer",
      // Mirrors the visible founder bio on /about.
      description:
        "Founder of DEADCODE LABS. Full-stack developer focused on building high-performance web applications, digital products and scalable systems.",
      worksFor: { "@id": ORGANIZATION_ID },
      sameAs: [FOUNDER.github, FOUNDER.linkedin],
    },
  ],
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
