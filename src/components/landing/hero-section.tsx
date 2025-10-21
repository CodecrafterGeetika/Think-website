import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-animated');

  return (
    <section className="container grid lg:grid-cols-2 gap-12 px-4 md:px-6 py-24 md:py-32 relative">
      <div className="absolute top-1/4 left-1/4 text-foreground/50 text-4xl font-thin">+</div>
      <div className="absolute top-1/3 right-1/2 text-foreground/50 text-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9 9l-7 2.5 7 2.5 3 7 3-7 7-2.5L15 9z"/></svg>
      </div>

      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <p className="text-primary font-semibold">Welcome To</p>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-foreground font-headline">
            Think Plus Education
            <br />
            <span className="text-primary">CAT, IPMAT, CLAT, and More</span>
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Crack CAT, IPMAT, CLAT, and other competitive exams the Thinkplus way with specially curated courses that are made by IIM grads for future IIM grads.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105">
            <Link href="/signup">Explore More &rarr;</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="transition-transform hover:scale-105">
            <Link href="/courses">Contact Us &rarr;</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center relative">
        <div className="bg-[#1C1C2E] p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10">
          <h2 className="text-2xl font-bold text-center text-white mb-4">BEYOND COACHING <br/> PROFILE & CV BUILDING</h2>
          <div className="relative">
              <div className="absolute top-0 left-0 w-full text-center">
                  <span className="text-white text-sm bg-primary px-3 py-1 rounded-full">ROAD TO THINKPLUS</span>
              </div>
              <div className="mt-12">
                  <Image src="https://storage.googleapis.com/stc-llm-project-dev-public-assets/73b3c3b0-6815-4fa8-a15e-a616146c268a" alt="Roadmap" width={400} height={400} className="mx-auto"/>
              </div>
              <div className="absolute -bottom-4 left-0 w-full text-center">
                  <span className="text-white text-sm bg-primary px-3 py-1 rounded-full">ROAD TO YOUR DREAM COLLEGE</span>
              </div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 bg-[#1C1C2E] p-2 rounded-lg">
            <span className="writing-mode-vertical-rl transform rotate-180 text-white text-sm tracking-widest">Let's Keep In Touch</span>
            <div className="h-8 w-px bg-primary"></div>
            <a href="#" className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="#" className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
            <a href="#" className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="#" className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a2.4 2.4 0 0 1 3 0L8 20l4-4.06a2.4 2.4 0 0 1 3 0L19.5 20l-2.5-2.5a2.4 2.4 0 0 1 0-3L19.5 12l-2.5-2.5a2.4 2.4 0 0 1 0-3L19.5 4l-4.06 4.06a2.4 2.4 0 0 1-3 0L8 4l2.5 2.5a2.4 2.4 0 0 1 0 3L8 12l2.5 2.5a2.4 2.4 0 0 1 0 3Z"/></svg></a>
        </div>
      </div>
    </section>
  );
}
