import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Target, BarChart3, NotebookText } from 'lucide-react';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: "AI Study Planner",
    description: "Get a dynamic study schedule tailored to your exam date, target percentile, and weak areas."
  },
  {
    icon: <Target className="h-8 w-8 text-accent" />,
    title: "Real-Time Predictor",
    description: "See your predicted percentile update in real-time during mock tests to gauge your performance."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-accent" />,
    title: "In-Depth Analytics",
    description: "Track your progress with detailed analytics on section-wise performance and question accuracy."
  },
  {
    icon: <NotebookText className="h-8 w-8 text-accent" />,
    title: "Comprehensive Courses",
    description: "Access a full library of courses covering every section of the CAT syllabus, from basics to advanced."
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="container px-4 md:px-6 py-24 md:py-32">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-primary font-headline">
          Everything You Need to Succeed
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          CATapult combines cutting-edge AI with proven prep strategies to give you an unbeatable edge.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
           <Card key={index} className="bg-background hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
              {feature.icon}
              <CardTitle className="pt-4 text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
