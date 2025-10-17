import { OnboardingForm } from '@/components/app/onboarding-form';
import { Logo } from '@/components/icons';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
            <Logo className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold text-primary">Welcome to CATapult!</h1>
          <p className="text-muted-foreground mt-2">Let&apos;s personalize your prep experience. Just a few steps to get started.</p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
