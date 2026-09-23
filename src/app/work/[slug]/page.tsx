import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/data/projects";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 md:pt-48 pb-24 md:pb-40">
        <Container>
          <div className="mb-12">
            <Link 
              href="/work" 
              className="inline-flex items-center text-sm font-medium text-secondary hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to work
            </Link>
          </div>

          {/* Hero Section */}
          <div className="max-w-4xl mb-16 md:mb-24">
            <p className="text-accent-light font-mono text-sm tracking-widest uppercase mb-6">
              {project.category}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tighter mb-8 leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed mb-10 max-w-2xl">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              {project.url !== "#" && (
                <Button asChild size="lg" className="h-14 px-8 text-base">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    Visit Live Site <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              )}
              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs font-semibold tracking-wider uppercase px-4 py-2 bg-surface border border-border/50 rounded-full text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual Fallback */}
          {project.image ? (
            <div className="aspect-[16/10] md:aspect-video w-full rounded-[2rem] overflow-hidden mb-24 md:mb-40 shadow-2xl relative border border-white/40">
              <Image 
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-foreground text-background flex items-center justify-center mb-24 md:mb-40 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none opacity-50"></div>
              <div className="text-center p-8 relative z-10">
                <span className="text-xl md:text-3xl font-mono tracking-widest uppercase opacity-20 block mb-6">
                  {project.category}
                </span>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter opacity-80">
                  {project.title}
                </h2>
              </div>
            </div>
          )}

          {/* Content Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4">
              <h3 className="text-sm font-mono tracking-widest uppercase text-secondary mb-4 border-b border-border pb-4">
                The Challenge
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-3xl font-light leading-relaxed mb-24 text-foreground/90">
                {project.challenge}
              </p>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-sm font-mono tracking-widest uppercase text-secondary mb-4 border-b border-border pb-4">
                The Approach
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-2xl font-light leading-relaxed mb-24 text-foreground/80">
                {project.approach}
              </p>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-sm font-mono tracking-widest uppercase text-secondary mb-4 border-b border-border pb-4">
                Key Features
              </h3>
            </div>
            <div className="md:col-span-8 mb-24">
              <ul className="space-y-6">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-accent font-mono mr-6">0{i + 1}</span>
                    <span className="text-xl md:text-2xl font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </article>

      {/* Navigation */}
      <section className="border-t border-border bg-surface py-16 md:py-24">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            {prevProject ? (
              <Link href={`/work/${prevProject.slug}`} className="group flex flex-col items-start w-full sm:w-1/2">
                <span className="text-sm font-mono tracking-widest uppercase text-secondary mb-2 flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div className="w-full sm:w-1/2"></div>
            )}

            {nextProject && (
              <Link href={`/work/${nextProject.slug}`} className="group flex flex-col items-end w-full sm:w-1/2 text-right">
                <span className="text-sm font-mono tracking-widest uppercase text-secondary mb-2 flex items-center">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {nextProject.title}
                </span>
              </Link>
            )}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
