'use server';
/**
 * @fileOverview AI-powered real-time percentile prediction flow for CAT mock tests.
 *
 * - predictRealTimePercentile - A function that predicts the real-time percentile.
 * - PredictRealTimePercentileInput - The input type for the predictRealTimePercentile function.
 * - PredictRealTimePercentileOutput - The return type for the predictRealTimePercentile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictRealTimePercentileInputSchema = z.object({
  questionsAnswered: z
    .number()
    .describe('The number of questions answered so far.'),
  correctAnswers: z
    .number()
    .describe('The number of correct answers so far.'),
  timeRemaining: z
    .number()
    .describe('The time remaining in the mock test (in minutes).'),
  difficultyLevel: z
    .string()
    .describe(
      'The overall difficulty level of the questions answered so far (e.g., Easy, Medium, Hard).' ),
});
export type PredictRealTimePercentileInput = z.infer<
  typeof PredictRealTimePercentileInputSchema
>;

const PredictRealTimePercentileOutputSchema = z.object({
  predictedPercentile: z
    .number()
    .describe(
      'The predicted percentile based on the current performance in the mock test.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the predicted percentile, including factors like accuracy, time management, and difficulty level.'
    ),
});
export type PredictRealTimePercentileOutput = z.infer<
  typeof PredictRealTimePercentileOutputSchema
>;

export async function predictRealTimePercentile(
  input: PredictRealTimePercentileInput
): Promise<PredictRealTimePercentileOutput> {
  return predictRealTimePercentileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRealTimePercentilePrompt',
  input: {schema: PredictRealTimePercentileInputSchema},
  output: {schema: PredictRealTimePercentileOutputSchema},
  prompt: `You are an AI-powered CAT exam percentile predictor. Based on the student's performance so far, predict their real-time percentile.

  Questions Answered: {{{questionsAnswered}}}
  Correct Answers: {{{correctAnswers}}}
  Time Remaining: {{{timeRemaining}}} minutes
  Difficulty Level: {{{difficultyLevel}}}

  Consider factors such as the accuracy (correct answers / questions answered), time management (time remaining vs. questions answered), and the difficulty level of the questions.
  Provide a predicted percentile and a brief reasoning for the prediction.
  `,
});

const predictRealTimePercentileFlow = ai.defineFlow(
  {
    name: 'predictRealTimePercentileFlow',
    inputSchema: PredictRealTimePercentileInputSchema,
    outputSchema: PredictRealTimePercentileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
