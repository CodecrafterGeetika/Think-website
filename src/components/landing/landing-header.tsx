import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">CATapult</span>
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="#features"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Features
          </Link>
          <Link
            href="/courses"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Courses
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
