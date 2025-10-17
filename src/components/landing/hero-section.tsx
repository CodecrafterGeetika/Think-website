import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './countdown-timer';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-animated');
  const catExamDate = new Date(new Date().getFullYear(), 10, 24); // Assuming CAT is on Nov 24th

  return (
    <section className="container grid lg:grid-cols-2 gap-12 px-4 md:px-6 py-24 md:py-32">
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-primary font-headline">
            Conquer the CAT with AI Precision
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Unlock your potential with our AI-driven prep platform. Get personalized study plans, real-time percentile predictions, and expert-led courses to ace the exam.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105">
            <Link href="/signup">Start for Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="transition-transform hover:scale-105">
            <Link href="/courses">View Courses</Link>
          </Button>
        </div>
        <div className="pt-6">
          <CountdownTimer targetDate={catExamDate} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {heroImage && (
           <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            width={600}
            height={400}
            className="rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500"
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>
    </section>
  );
}
