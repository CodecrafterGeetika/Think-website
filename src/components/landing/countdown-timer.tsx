'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const difference = +targetDate - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
}

const TimeValue = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-bold text-primary tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
  </div>
);

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Set initial value on client-side to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <Card className="bg-secondary/50">
        <CardContent className="p-6 text-center">
          <p className="text-xl font-semibold text-primary">The exam has passed. Good luck with your results!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-secondary/50 animate-in fade-in duration-500">
      <CardContent className="p-4 md:p-6">
        <p className="text-center text-sm font-medium text-primary mb-4">Countdown to CAT {targetDate.getFullYear()}</p>
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          <TimeValue value={timeLeft.days} label="Days" />
          <TimeValue value={timeLeft.hours} label="Hours" />
          <TimeValue value={timeLeft.minutes} label="Minutes" />
          <TimeValue value={timeLeft.seconds} label="Seconds" />
        </div>
      </CardContent>
    </Card>
  );
}
