export interface Project {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  url: string;
  liveUrl?: string;
  image?: string;
  challenge: string;
  approach: string;
  features: string[];
  technology: string[];
  hasScreenshots: boolean;
}

export const projects: Project[] = [
  {
    title: "LUXE",
    slug: "luxe-real-estate",
    category: "Real Estate / Web Experience",
    shortDescription: "A premium real-estate digital experience designed around property discovery, luxury presentation and enquiry conversion.",
    url: "https://luxe-real-estate-blond.vercel.app/",
    liveUrl: "https://luxe-real-estate-blond.vercel.app/",
    image: "/projects/LUXE.png",
    challenge: "How can a premium real-estate brand present high-value properties in a sophisticated digital experience?",
    approach: "We used editorial layouts, premium visual hierarchy, property discovery logic, and sophisticated location browsing to elevate luxury positioning. A seamless, responsive experience ensures high enquiry conversion across global destinations.",
    features: ["Property Discovery", "Featured Residences", "Global Destinations", "Market Intelligence", "Enquiry Flow"],
    technology: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    hasScreenshots: false
  },
  {
    title: "CozyCraft",
    slug: "cozycraft",
    category: "E-Commerce / Retail",
    shortDescription: "A modern, high-converting e-commerce platform for handcrafted furniture and home decor.",
    url: "#",
    liveUrl: "https://www.cozycrafts.shop/",
    image: "/projects/COZYCRAFTS.png",
    challenge: "Designing a digital storefront that conveys the physical warmth of handcrafted furniture while driving e-commerce conversions.",
    approach: "Built a lightning-fast headless commerce experience with large, immersive product imagery, smooth cart transitions, and an optimized checkout flow.",
    features: ["Headless Commerce", "Product Galleries", "Seamless Checkout"],
    technology: ["Next.js", "Shopify", "Tailwind CSS"],
    hasScreenshots: false
  },
  {
    title: "FinFlow",
    slug: "finflow",
    category: "SaaS / Fintech",
    shortDescription: "A sophisticated dashboard and analytics platform for modern financial teams.",
    url: "#",
    liveUrl: "https://fin-flow-saa-s-analytics-dashboard.vercel.app/",
    image: "/projects/FinFlow.png",
    challenge: "Organizing complex financial data into an intuitive, high-performance interface for enterprise teams.",
    approach: "Designed a component-driven, dark-mode specialized UI with real-time data visualization and complex state management.",
    features: ["Real-time Analytics", "Data Visualization", "Role-based Access"],
    technology: ["React", "TypeScript", "Recharts"],
    hasScreenshots: false
  },
  {
    title: "Ashirwad Hampers",
    slug: "ashirwad-hampers",
    category: "E-Commerce / B2B",
    shortDescription: "A bespoke corporate gifting platform handling complex bulk orders and customization.",
    url: "#",
    liveUrl: "https://www.ashirwadhampers.store/#home",
    image: "/projects/AshirwadHampers.png",
    challenge: "Handling complex B2B ordering logic involving custom gift configurations, multi-address shipping, and bulk volume pricing.",
    approach: "Developed a custom B2B portal integrated directly with their inventory and fulfillment systems.",
    features: ["Bulk Ordering", "Custom Box Configuration", "B2B Pricing Logic"],
    technology: ["Next.js", "Supabase", "Stripe"],
    hasScreenshots: false
  }
];
