import Link from 'next/link';
import { Logo } from '@/components/icons';

export function LandingFooter() {
  return (
    <footer className="bg-secondary">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo className="h-8 w-8 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for aspiring CAT toppers.
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} CATapult. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
