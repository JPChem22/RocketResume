import Link from 'next/link';
import { Rocket, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="py-4 px-6 shadow-md bg-card">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <Rocket className="h-8 w-8" />
          <h1 className="text-2xl font-bold">ResumeRocket</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/#features">Features</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#pricing">Pricing</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/app">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
