import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  BarChart,
  Target,
  CheckCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CourseCard } from '@/components/app/course-card';
import { courses } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const performanceData = [
  { date: 'Jan', percentile: 65 },
  { date: 'Feb', percentile: 72 },
  { date: 'Mar', percentile: 70 },
  { date: 'Apr', percentile: 78 },
  { date: 'May', percentile: 82 },
  { date: 'Jun', percentile: 85 },
];

const chartConfig = {
  percentile: {
    label: 'Percentile',
    color: 'hsl(var(--accent))',
  },
};

export default function Dashboard() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  const recommendedCourses = courses.slice(0, 3);
  const catExamDate = new Date(new Date().getFullYear(), 10, 24);
  const today = new Date();
  const daysLeft = Math.ceil((catExamDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 animate-in fade-in duration-500">
      <div className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Welcome back, Student!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your snapshot for today. Keep up the great work!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days to CAT</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysLeft}</div>
            <p className="text-xs text-muted-foreground">
              Stay focused, you&apos;re getting closer.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mock Tests Taken</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Percentile</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.3%</div>
            <p className="text-xs text-muted-foreground">Trending upwards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Target: 85%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>
              Your mock test percentile scores for the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <RechartsBarChart data={performanceData}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="percentile"
                    fill="var(--color-percentile)"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Recommended Courses</CardTitle>
                <CardDescription>
                Courses tailored to improve your weak areas.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/courses">
                View All
                <ArrowUpRight className="h-4 w-4" />
                </Link>
            </Button>
            </CardHeader>
          <CardContent className="grid gap-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-4">
                 <div className="h-16 w-16 bg-secondary rounded-md flex items-center justify-center">
                   <BookOpen className="h-8 w-8 text-muted-foreground" />
                 </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{course.title}</p>
                  <p className="text-sm text-muted-foreground">{course.category}</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/courses/${course.id}`}>Start</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
