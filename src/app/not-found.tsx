import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <Container className="text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-muted/20 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            You took a wrong turn in the codebase.
          </h2>
          <p className="text-secondary text-lg mb-10 max-w-md">
            The page you're looking for doesn't exist or has been moved to a different route.
          </p>
          <Button asChild size="lg" className="group px-8">
            <Link href="/">
              Back Home <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
