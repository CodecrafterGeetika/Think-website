'use client'

import { useState } from 'react';
import { CourseCard } from '@/components/app/course-card';
import { courses } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Category = 'All' | 'VARC' | 'DILR' | 'Quant';
type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export default function CoursesPage() {
  const [category, setCategory] = useState<Category>('All');
  const [difficulty, setDifficulty] = useState<Difficulty>('All');

  const filteredCourses = courses.filter(course => {
    const categoryMatch = category === 'All' || course.category === category;
    const difficultyMatch = difficulty === 'All' || course.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="space-y-1.5 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
        <p className="text-muted-foreground">
          Explore our expert-led courses and start learning today.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Tabs value={category} onValueChange={(value) => setCategory(value as Category)}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="VARC">VARC</TabsTrigger>
            <TabsTrigger value="DILR">DILR</TabsTrigger>
            <TabsTrigger value="Quant">Quant</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="w-full sm:w-auto sm:ml-auto">
          <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Difficulties</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course, index) => (
          <div key={course.id} className="animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 50}ms` }}>
            <CourseCard {...course} />
          </div>
        ))}
      </div>
      {filteredCourses.length === 0 && (
        <div className="text-center py-20 col-span-full">
            <h3 className="text-xl font-semibold">No courses found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
