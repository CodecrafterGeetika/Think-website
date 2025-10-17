'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const overviewData = [
  { month: 'Jan', score: 120 },
  { month: 'Feb', score: 135 },
  { month: 'Mar', score: 130 },
  { month: 'Apr', score: 145 },
  { month: 'May', score: 155 },
  { month: 'Jun', score: 160 },
];
const overviewChartConfig = { score: { label: 'Score', color: 'hsl(var(--primary))' } };

const sectionData = [
    { name: 'VARC', accuracy: 75, color: 'hsl(var(--chart-1))' },
    { name: 'DILR', accuracy: 68, color: 'hsl(var(--chart-2))' },
    { name: 'Quant', accuracy: 82, color: 'hsl(var(--chart-3))' },
];
const sectionChartConfig = { accuracy: { label: 'Accuracy' }};


const leaderboardData = [
    { rank: 1, name: 'Arjun Sharma', score: 175, percentile: 99.8 },
    { rank: 2, name: 'Priya Patel', score: 172, percentile: 99.7 },
    { rank: 3, name: 'You', score: 160, percentile: 99.2 },
    { rank: 4, name: 'Rohan Gupta', score: 158, percentile: 99.1 },
    { rank: 5, name: 'Sneha Verma', score: 155, percentile: 98.9 },
]

export default function ProgressPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="space-y-1.5 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Progress Analytics</h1>
        <p className="text-muted-foreground">
          Track your journey to a 99+ percentile score.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sections">Section Performance</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">160</div>
                <p className="text-xs text-muted-foreground">on Mock Test #11</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Time/Question</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1m 45s</div>
                <p className="text-xs text-muted-foreground">-5s from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Strongest Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Quant</div>
                <p className="text-xs text-muted-foreground">82% accuracy</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weakest Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">DILR</div>
                <p className="text-xs text-muted-foreground">68% accuracy</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Overall Score Progression</CardTitle>
              <CardDescription>Your total score in mock tests over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={overviewChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer>
                        <RechartsBarChart data={overviewData}>
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4">
            <Alert variant="default" className="bg-warning/10 border-warning/50">
                <TriangleAlert className="h-4 w-4 text-warning" />
                <AlertTitle className="text-warning">Weak Area Alert</AlertTitle>
                <AlertDescription className="text-warning/90">
                    Your accuracy in DILR is lower than other sections. Focus on our DILR courses to improve.
                </AlertDescription>
            </Alert>
            <Card>
                <CardHeader>
                <CardTitle>Section-wise Accuracy</CardTitle>
                <CardDescription>A breakdown of your accuracy in each major section.</CardDescription>
                </CardHeader>
                <CardContent>
                <ChartContainer config={sectionChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer>
                        <RechartsBarChart data={sectionData} layout="vertical">
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="accuracy" radius={5} layout="vertical">
                            {sectionData.map((entry, index) => (
                                <rect key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Leaderboard</CardTitle>
                    <CardDescription>See how you stack up against other aspirants.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Rank</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                                <TableHead className="text-right">Percentile</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboardData.map(user => (
                                <TableRow key={user.rank} className={user.name === 'You' ? 'bg-secondary' : ''}>
                                    <TableCell className="font-medium">{user.rank}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell className="text-right">{user.score}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={user.name === 'You' ? 'default' : 'secondary'} className={user.name === 'You' ? 'bg-accent' : ''}>{user.percentile.toFixed(1)}%</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
