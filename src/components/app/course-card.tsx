import Image from 'next/image';
import Link from 'next/link';
import { Clock, BarChart, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type CourseCardProps = {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  image: ImagePlaceholder | undefined;
};

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800',
  Advanced: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800',
};

export function CourseCard({ id, title, category, difficulty, duration, lessons, image }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={title}
              width={400}
              height={225}
              className="w-full h-48 object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
             <div className="w-full h-48 bg-secondary flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
             </div>
          )}
          <Badge className={`absolute top-3 right-3 ${difficultyColors[difficulty]}`}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{category}</Badge>
        <CardTitle className="text-lg font-bold line-clamp-2 leading-tight">{title}</CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/courses/${id}`}>
            Start Learning <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
