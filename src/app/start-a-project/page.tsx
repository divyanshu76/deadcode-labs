import { pageMetadata } from "@/lib/seo";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";

export const metadata = pageMetadata({
  path: "/start-a-project",
  title: "Start a Project",
  description:
    "Ready to build something exceptional? Use our project estimator to get started with DEADCODE LABS.",
});

export default function StartProjectPage() {
  return (
    <div className="pt-24 min-h-screen bg-muted/30">
      <ProjectEstimator headingLevel="h1" />
    </div>
  );
}
