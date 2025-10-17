'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Check, PartyPopper } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const sections = [
  { id: 'varc', label: 'Verbal Ability & Reading Comprehension (VARC)' },
  { id: 'dilr', label: 'Data Interpretation & Logical Reasoning (DILR)' },
  { id: 'quant', label: 'Quantitative Aptitude (Quant)' },
];

const formSchema = z.object({
  targetPercentile: z.number().min(80).max(100),
  examDate: z.date({
    required_error: 'An exam date is required.',
  }),
  weakSections: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export function OnboardingForm() {
  const [step, setStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetPercentile: 95,
      examDate: new Date(new Date().getFullYear(), 10, 24),
      weakSections: ['quant'],
    },
  });

  function goToNext() {
    setStep((s) => s + 1);
  }

  function goToPrev() {
    setStep((s) => s - 1);
  }

  async function onSubmit(values: FormData) {
    console.log('Onboarding data:', values);
    // Here you would typically save the data to Firestore
    goToNext();
  }
  
  const progressValue = (step / 3) * 100;

  return (
    <Card>
      <div className="p-2 border-b">
        <Progress value={progressValue} className="w-full h-2" />
      </div>
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Set Your Goal</h2>
                  <FormField
                    control={form.control}
                    name="targetPercentile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Percentile: {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={80}
                            max={100}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          A high but realistic goal will keep you motivated.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Identify Weak Areas</h2>
                   <FormField
                    control={form.control}
                    name="weakSections"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Which sections need more focus?</FormLabel>
                          <FormDescription>
                            Select all that apply. This helps us personalize your study plan.
                          </FormDescription>
                        </div>
                        {sections.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="weakSections"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Set Your Exam Date</h2>
                  <FormField
                    control={form.control}
                    name="examDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                         <FormDescription className="mt-4">
                            This is crucial for creating your timeline.
                          </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <PartyPopper className="mx-auto h-16 w-16 text-accent mb-4" />
                    <h2 className="text-2xl font-bold">You&apos;re All Set!</h2>
                    <p className="text-muted-foreground mt-2 mb-6">Your personalized prep journey is ready to begin.</p>
                     <Button asChild size="lg">
                        <Link href="/dashboard">
                            Go to my Dashboard
                        </Link>
                     </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 3 && (
                <div className="flex justify-between pt-4">
                    <Button type="button" variant="ghost" onClick={goToPrev} disabled={step === 0}>
                        Back
                    </Button>
                    {step < 2 ? (
                        <Button type="button" onClick={goToNext}>Next</Button>
                    ) : (
                        <Button type="submit">
                            <Check className="mr-2 h-4 w-4" />
                            Finish Setup
                        </Button>
                    )}
                </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
