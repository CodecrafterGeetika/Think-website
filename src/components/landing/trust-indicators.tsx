import { GraduationCap, Zap, BarChart } from 'lucide-react';

export function TrustIndicators() {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <GraduationCap className="h-10 w-10 text-accent" />
            <h3 className="text-lg font-semibold text-primary">Expert-Led Courses</h3>
            <p className="text-muted-foreground text-sm">Crafted by IIM alumni and 99%ilers.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="h-10 w-10 text-accent" />
            <h3 className="text-lg font-semibold text-primary">AI-Powered Precision</h3>
            <p className="text-muted-foreground text-sm">Personalized plans that adapt to you.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BarChart className="h-10 w-10 text-accent" />
            <h3 className="text-lg font-semibold text-primary">Proven Results</h3>
            <p className="text-muted-foreground text-sm">Join thousands of successful students.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
