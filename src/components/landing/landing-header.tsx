import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">think⁺</span>
            <span className="text-xs text-muted-foreground">An IIM Grads' Initiative</span>
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            About Us
          </Link>
          <Link
            href="/courses"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Testimonials
          </Link>
           <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Blog
          </Link>
           <Link
            href="#"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/signup">Join Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
