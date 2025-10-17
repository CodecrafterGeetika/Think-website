'use client';

import { useState, useEffect } from 'react';
import { predictRealTimePercentile } from '@/ai/flows/real-time-percentile-prediction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Timer, Loader2, Bot, BarChart, Check, X, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const mockQuestions = [
  { id: 1, question: 'If a rectangle has a length of 8 and a width of 3, what is its area?', options: ['11', '24', '30', '5'], answer: '24', difficulty: 'Easy' },
  { id: 2, question: 'Solve for x: 2x + 5 = 15', options: ['5', '10', '2.5', '7.5'], answer: '5', difficulty: 'Easy' },
  { id: 3, question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], answer: 'Paris', difficulty: 'Easy' },
  { id: 4, question: 'Which number is next in the series: 2, 4, 8, 16, ?', options: ['24', '32', '64', '20'], answer: '32', difficulty: 'Medium' },
  { id: 5, question: 'If a car travels at 60 km/h, how long does it take to travel 180 km?', options: ['2 hours', '3 hours', '4 hours', '1 hour'], answer: '3 hours', difficulty: 'Medium' },
  { id: 6, question: 'What is the value of pi to two decimal places?', options: ['3.14', '3.15', '3.12', '3.16'], answer: '3.14', difficulty: 'Easy' },
  { id: 7, question: 'Simplify the expression: (x^2 * x^3) / x^4', options: ['x', 'x^2', '1', 'x^9'], answer: 'x', difficulty: 'Hard' },
  { id: 8, question: 'What is the primary ingredient in guacamole?', options: ['Tomato', 'Onion', 'Avocado', 'Pepper'], answer: 'Avocado', difficulty: 'Medium' },
  { id: 9, question: 'Find the area of a triangle with base 10 and height 5.', options: ['50', '25', '15', '100'], answer: '25', difficulty: 'Easy' },
  { id: 10, question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], answer: '12', difficulty: 'Easy' },
];

type PercentilePrediction = {
  predictedPercentile: number;
  reasoning: string;
};

export function MockTestClient() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(mockQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes
  const [prediction, setPrediction] = useState<PercentilePrediction | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const { toast } = useToast();
  
  const currentQuestion = mockQuestions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    const questionsAnswered = answers.filter(a => a !== null).length;
    if (questionsAnswered > 0 && questionsAnswered % 3 === 0) {
      getPrediction();
    }
  }, [answers]);

  const getPrediction = async () => {
    setIsPredicting(true);
    const questionsAnswered = answers.filter(a => a !== null).length;
    const correctAnswers = answers.reduce((count, ans, i) => {
      return ans === mockQuestions[i].answer ? count + 1 : count;
    }, 0);
    
    // Simple difficulty aggregation
    const answeredDifficulties = answers.map((a,i) => a ? mockQuestions[i].difficulty : null).filter(Boolean);
    const difficultyCounts = answeredDifficulties.reduce((acc, diff) => {
        acc[diff as string] = (acc[diff as string] || 0) + 1;
        return acc;
    }, {} as {[key: string]: number});
    const dominantDifficulty = Object.keys(difficultyCounts).sort((a,b) => difficultyCounts[b] - difficultyCounts[a])[0] || 'Medium';

    try {
      const result = await predictRealTimePercentile({
        questionsAnswered,
        correctAnswers,
        timeRemaining: Math.floor(timeLeft / 60),
        difficultyLevel: dominantDifficulty
      });
      setPrediction(result);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      toast({
        variant: 'destructive',
        title: 'Prediction Error',
        description: 'Could not fetch AI percentile prediction.',
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const finishTest = () => {
    const score = answers.reduce((count, ans, i) => {
      return ans === mockQuestions[i].answer ? count + 1 : count;
    }, 0);
    setFinalScore(score);
    setIsTestFinished(true);
  };

  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  if (isTestFinished) {
    return (
        <AlertDialog open={isTestFinished} onOpenChange={setIsTestFinished}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-2xl">Test Finished!</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    Here's your performance summary.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Final Score:</span>
                        <span className="font-bold text-lg">{finalScore} / {mockQuestions.length}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-medium">Accuracy:</span>
                        <span className="font-bold text-lg">{((finalScore / mockQuestions.length) * 100).toFixed(2)}%</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-medium">Time Taken:</span>
                        <span className="font-bold text-lg">{Math.floor((10 * 60 - timeLeft) / 60)}m { (10 * 60 - timeLeft) % 60}s</span>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => window.location.reload()}>Try Again</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Mock Test: Section 1</CardTitle>
              <div className="flex items-center gap-2 text-red-500 font-medium">
                <Timer className="h-5 w-5" />
                <span>{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</span>
              </div>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">Question {currentQuestionIndex + 1} of {mockQuestions.length}</p>
            <p className="text-lg font-semibold mb-6">{currentQuestion.question}</p>
            <RadioGroup value={answers[currentQuestionIndex] || ''} onValueChange={handleAnswerChange}>
              {currentQuestion.options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={opt} id={`opt-${i}`} />
                  <Label htmlFor={`opt-${i}`} className="text-base">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <div className="p-6 border-t flex justify-between">
            <Button variant="outline" onClick={goToPrev} disabled={currentQuestionIndex === 0}>Previous</Button>
            <Button onClick={finishTest} variant="destructive">Finish Test</Button>
            <Button onClick={goToNext} disabled={currentQuestionIndex === mockQuestions.length - 1}>Next</Button>
          </div>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
             <Bot className="h-6 w-6 text-primary" />
             <div>
                <CardTitle>AI Percentile Predictor</CardTitle>
                <CardDescription>Updates every 3 questions.</CardDescription>
             </div>
          </CardHeader>
          <CardContent className="text-center">
            {isPredicting ? (
              <div className="flex flex-col items-center gap-2 py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">AI is analyzing your performance...</p>
              </div>
            ) : prediction ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Predicted Percentile</p>
                  <p className="text-5xl font-bold text-accent">{prediction.predictedPercentile.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Reasoning</p>
                  <p className="text-sm">{prediction.reasoning}</p>
                </div>
              </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <p>Answer at least 3 questions to get your first prediction.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
