import { LandingHeader } from '@/components/landing/landing-header';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustIndicators } from '@/components/landing/trust-indicators';
import { FeaturesSection } from '@/components/landing/features-section';
import { LandingFooter } from '@/components/landing/landing-footer';

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        {/*
          <TrustIndicators />
          <FeaturesSection />
        */}
      </main>
      {/* <LandingFooter /> */}
    </div>
  );
}
