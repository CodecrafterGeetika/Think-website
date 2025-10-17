'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized weekly study plans.
 *
 * The flow takes exam date, target percentile, and weak areas as input and produces a weekly study plan.
 *   - generatePersonalizedStudyPlan - A function that generates a personalized study plan.
 *   - PersonalizedStudyPlanInput - The input type for the generatePersonalizedStudyPlan function.
 *   - PersonalizedStudyPlanOutput - The return type for the generatePersonalizedStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedStudyPlanInputSchema = z.object({
  examDate: z
    .string()
    .describe('The date of the CAT exam in YYYY-MM-DD format.'),
  targetPercentile: z
    .number()
    .min(0)
    .max(100)
    .describe('The desired percentile score on the CAT exam.'),
  weakAreas: z
    .string()
    .describe(
      'A comma-separated list of weak areas that the student needs to focus on, e.g., Quantitative Aptitude, Verbal Ability'
    ),
});

export type PersonalizedStudyPlanInput = z.infer<
  typeof PersonalizedStudyPlanInputSchema
>;

const PersonalizedStudyPlanOutputSchema = z.object({
  weeklyStudyPlan: z
    .string()
    .describe(
      'A detailed weekly study plan in markdown format, broken down by day, including specific topics to study and practice questions to complete. It should contain actionable suggestions.'
    ),
});

export type PersonalizedStudyPlanOutput = z.infer<
  typeof PersonalizedStudyPlanOutputSchema
>;

export async function generatePersonalizedStudyPlan(
  input: PersonalizedStudyPlanInput
): Promise<PersonalizedStudyPlanOutput> {
  return personalizedStudyPlanFlow(input);
}

const studyPlanPrompt = ai.definePrompt({
  name: 'studyPlanPrompt',
  input: {schema: PersonalizedStudyPlanInputSchema},
  output: {schema: PersonalizedStudyPlanOutputSchema},
  prompt: `You are an AI study plan generator for the CAT exam. Your goal is to create a personalized weekly study plan based on the student's exam date, target percentile, and weak areas.

Exam Date: {{{examDate}}}
Target Percentile: {{{targetPercentile}}}
Weak Areas: {{{weakAreas}}}

Generate a detailed weekly study plan in markdown format, broken down by day, including specific topics to study and practice questions to complete. The study plan should be actionable and easy to follow. Consider the time remaining until the exam and the student's weak areas when creating the plan. Also include the expected time to spend on each topic.

Example Output:

## Weekly Study Plan

### Monday
* Topic: Number Systems (2 hours)
* Practice: Solve 20 questions on Number Systems from Arun Sharma (1 hour)

### Tuesday
* Topic: Algebra (2 hours)
* Practice: Solve 20 questions on Algebra from Quantum CAT (1 hour)

### Wednesday
* Topic: Geometry (2 hours)
* Practice: Solve 20 questions on Geometry from previous year CAT papers (1 hour)

### Thursday
* Topic: Reading Comprehension (2 hours)
* Practice: Solve 2 Reading Comprehension passages from past CAT exams (1 hour)

### Friday
* Topic: Logical Reasoning (2 hours)
* Practice: Solve 2 sets of Logical Reasoning questions from online resources (1 hour)

### Saturday
* Mock Test: Attempt a full-length CAT mock test (3 hours)
* Analysis: Analyze the mock test and identify weak areas (2 hours)

### Sunday
* Revision: Revise all topics studied during the week (3 hours)
* Relax: Take a break and relax.
`,
});

const personalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'personalizedStudyPlanFlow',
    inputSchema: PersonalizedStudyPlanInputSchema,
    outputSchema: PersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await studyPlanPrompt(input);
    return output!;
  }
);
