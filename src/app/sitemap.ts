import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

const LEGAL_PATHS = [
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/service-terms",
  "/disclaimer",
  "/intellectual-property",
  "/accessibility",
  "/security",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/work"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/start-a-project"), lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];

  const work: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/work/${p.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const legal: MetadataRoute.Sitemap = LEGAL_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...pages, ...work, ...legal];
}
