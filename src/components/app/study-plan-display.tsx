'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

type DailyPlan = {
    day: string;
    tasks: { text: string; completed: boolean }[];
};

function parseMarkdownPlan(markdown: string): DailyPlan[] {
    if (!markdown) return [];

    const dayRegex = /###\s*(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/g;
    const taskRegex = /\*\s*(.*)/g;
    
    const sections = markdown.split(dayRegex).filter(Boolean);
    const weeklyPlan: DailyPlan[] = [];

    for (let i = 0; i < sections.length; i += 2) {
        const day = sections[i].trim();
        const content = sections[i + 1];
        const tasks = [];
        let match;
        while ((match = taskRegex.exec(content)) !== null) {
            tasks.push({ text: match[1].trim(), completed: false });
        }
        if (tasks.length > 0) {
            weeklyPlan.push({ day, tasks });
        }
    }
    
    return weeklyPlan;
}


export function StudyPlanDisplay({ plan }: { plan: string }) {
    const weeklyPlan = parseMarkdownPlan(plan);

    if (weeklyPlan.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Your Weekly Study Plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Could not parse the study plan. Please try generating it again.</p>
                    <pre className="mt-4 whitespace-pre-wrap bg-secondary p-4 rounded-md">{plan}</pre>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                    <CardTitle className="text-2xl">Your AI-Generated Weekly Plan</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible defaultValue="Monday" className="w-full">
                    {weeklyPlan.map((dayPlan) => (
                        <AccordionItem value={dayPlan.day} key={dayPlan.day}>
                            <AccordionTrigger className="text-lg font-semibold">{dayPlan.day}</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 pl-2">
                                    {dayPlan.tasks.map((task, taskIndex) => (
                                        <div key={taskIndex} className="flex items-center space-x-3">
                                            <Checkbox id={`${dayPlan.day}-${taskIndex}`} />
                                            <label
                                                htmlFor={`${dayPlan.day}-${taskIndex}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {task.text}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
