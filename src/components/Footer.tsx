import Link from 'next/link';
import { Rocket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-6 mt-auto bg-card border-t">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Rocket className="h-6 w-6 text-primary" />
          <p className="text-lg font-semibold">ResumeRocket</p>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} ResumeRocket. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
