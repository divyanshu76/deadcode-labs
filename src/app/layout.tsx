import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { BackToTop } from "@/components/ui/BackToTop";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundSpheres } from "@/components/ui/BackgroundSpheres";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deadcode.space"),
  title: {
    default: "DEADCODE LABS — Digital Products, Web Development & AI Systems",
    template: "%s | DEADCODE LABS",
  },
  description: "A premium digital product studio engineering bespoke web development, e-commerce storefronts, AI systems, and automation for ambitious businesses.",
  keywords: [
    "Digital Product Studio",
    "Web Development",
    "Full-Stack Development",
    "E-commerce",
    "AI Products",
    "Workflow Automation",
    "Custom Web Applications",
    "UI/UX"
  ],
  authors: [{ name: "Divyanshu Verma", url: "https://github.com/divyanshu76" }],
  creator: "DEADCODE LABS",
  alternates: {
    canonical: "https://deadcode.space",
  },
  openGraph: {
    title: "DEADCODE LABS — Digital Products, Web Development & AI Systems",
    description: "A premium digital product studio engineering bespoke web development, e-commerce storefronts, AI systems, and automation for ambitious businesses.",
    url: "https://deadcode.space",
    siteName: "DEADCODE LABS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEADCODE LABS — Digital Products, Web Development & AI Systems",
    description: "A premium digital product studio engineering bespoke web development, e-commerce storefronts, AI systems, and automation for ambitious businesses.",
    creator: "@truly_divyanshu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ambient-bg text-foreground relative">
        <BackgroundSpheres />
        <CustomCursor />
        <Preloader />
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </body>
    </html>
  );
}
