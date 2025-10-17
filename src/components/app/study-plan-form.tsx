'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { generatePersonalizedStudyPlan } from '@/ai/flows/personalized-study-plan';
import { StudyPlanDisplay } from '@/components/app/study-plan-display';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '../ui/card';

const formSchema = z.object({
  examDate: z.date({
    required_error: 'An exam date is required.',
  }),
  targetPercentile: z.number().min(80).max(100),
  weakAreas: z.string().min(3, {
    message: 'Please mention at least one weak area.',
  }),
});

type FormData = z.infer<typeof formSchema>;
type StudyPlan = { weeklyStudyPlan: string } | null;

export function StudyPlanForm() {
  const [studyPlan, setStudyPlan] = useState<StudyPlan>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examDate: new Date(new Date().getFullYear(), 10, 24),
      targetPercentile: 95,
      weakAreas: 'Quantitative Aptitude, Logical Reasoning',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setStudyPlan(null);
    try {
      const formattedDate = format(values.examDate, 'yyyy-MM-dd');
      const result = await generatePersonalizedStudyPlan({
        ...values,
        examDate: formattedDate,
      });
      setStudyPlan(result);
    } catch (error) {
      console.error('Error generating study plan:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate study plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="examDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>CAT Exam Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weakAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weak Sections</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Geometry, Reading Comprehension" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of topics you find difficult.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      What percentile are you aiming for?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate My Plan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Our AI is crafting your personalized plan...</p>
        </div>
      )}

      {studyPlan && (
        <div className="mt-8 animate-in fade-in duration-500">
          <StudyPlanDisplay plan={studyPlan.weeklyStudyPlan} />
        </div>
      )}
    </>
  );
}
