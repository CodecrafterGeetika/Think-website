import { StudyPlanForm } from '@/components/app/study-plan-form';
import { NotebookText } from 'lucide-react';

export default function StudyPlanPage() {
  return (
    <div className="container mx-auto p-0 animate-in fade-in duration-500">
      <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-dashed mb-8">
        <NotebookText className="w-8 h-8 text-accent mt-1" />
        <div>
          <h1 className="text-2xl font-bold">AI Personalized Study Plan</h1>
          <p className="text-muted-foreground mt-1">
            Tell our AI your goals, and get a custom-tailored weekly study plan to help you ace the CAT. This plan will adapt to your progress and focus on your weak areas.
          </p>
        </div>
      </div>
      
      <StudyPlanForm />
    </div>
  );
}
