import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with DEADCODE LABS. Let's discuss your next digital product, web application, or e-commerce project.",
  alternates: {
    canonical: "https://deadcode.space/contact",
  },
  openGraph: {
    url: "https://deadcode.space/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
