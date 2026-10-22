import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us",
  description:
    "Get in touch with DEADCODE LABS. Let's discuss your next digital product, web application, or e-commerce project.",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
