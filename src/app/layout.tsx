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
  metadataBase: new URL("https://deadcode.design"),
  title: "DEADCODE LABS | Premium Digital Product Studio",
  description: "Boutique digital product studio engineering bespoke websites, e-commerce storefronts, AI systems, and scalable web applications for ambitious global brands.",
  keywords: [
    "Digital Product Studio",
    "Web Development",
    "Next.js Architecture",
    "E-commerce",
    "Headless Shopify",
    "AI Products",
    "Workflow Automation",
    "UI/UX Design Engineering",
  ],
  authors: [{ name: "Divyanshu Verma", url: "https://www.divyanshu.space" }],
  creator: "Divyanshu Verma",
  openGraph: {
    title: "DEADCODE LABS | Premium Digital Product Studio",
    description: "Digital ideas, engineered. Bespoke digital experiences, web apps, and intelligent platforms.",
    url: "https://deadcode.design",
    siteName: "DEADCODE LABS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEADCODE LABS | Premium Digital Product Studio",
    description: "Digital ideas, engineered. Bespoke digital experiences, web apps, and intelligent platforms.",
    creator: "@truly_divyanshu",
  },
  robots: {
    index: true,
    follow: true,
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
