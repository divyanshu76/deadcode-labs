import { Metadata } from "next";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Ready to build something exceptional? Use our project estimator to get started with DEADCODE LABS.",
  alternates: {
    canonical: "https://deadcode.space/start-a-project",
  },
  openGraph: {
    url: "https://deadcode.space/start-a-project",
  },
};

export default function StartProjectPage() {
  return (
    <div className="pt-24 min-h-screen bg-muted/30">
      <ProjectEstimator />
    </div>
  );
}
