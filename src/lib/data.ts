import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

type Course = {
  id: string;
  title: string;
  category: 'VARC' | 'DILR' | 'Quant';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  description: string;
  image: ImagePlaceholder | undefined;
};

export const courses: Course[] = [
  {
    id: 'quant-basics',
    title: 'Quantitative Aptitude Basics',
    category: 'Quant',
    difficulty: 'Beginner',
    duration: '8 Hours',
    lessons: 15,
    description: 'Build a strong foundation in core quantitative concepts.',
    image: PlaceHolderImages.find((img) => img.id === 'course-quant'),
  },
  {
    id: 'varc-fundamentals',
    title: 'VARC Fundamentals',
    category: 'VARC',
    difficulty: 'Beginner',
    duration: '10 Hours',
    lessons: 12,
    description: 'Master the basics of reading comprehension and verbal ability.',
    image: PlaceHolderImages.find((img) => img.id === 'course-varc'),
  },
  {
    id: 'dilr-introduction',
    title: 'Intro to DILR',
    category: 'DILR',
    difficulty: 'Beginner',
    duration: '12 Hours',
    lessons: 20,
    description: 'Learn to tackle basic logical reasoning puzzles and data sets.',
    image: PlaceHolderImages.find((img) => img.id === 'course-dilr'),
  },
  {
    id: 'advanced-algebra',
    title: 'Advanced Algebra',
    category: 'Quant',
    difficulty: 'Advanced',
    duration: '15 Hours',
    lessons: 18,
    description: 'Deep dive into complex algebraic problems and shortcuts.',
    image: PlaceHolderImages.find((img) => img.id === 'course-algebra'),
  },
  {
    id: 'geometry-masterclass',
    title: 'Geometry Masterclass',
    category: 'Quant',
    difficulty: 'Intermediate',
    duration: '10 Hours',
    lessons: 22,
    description: 'Covering everything from circles to solid geometry.',
    image: PlaceHolderImages.find((img) => img.id === 'course-geometry'),
  },
  {
    id: 'rc-passages-pro',
    title: 'RC Passages Pro',
    category: 'VARC',
    difficulty: 'Advanced',
    duration: '18 Hours',
    lessons: 30,
    description: 'Techniques to read faster and comprehend complex passages.',
    image: PlaceHolderImages.find((img) => img.id === 'course-rc'),
  },
  {
    id: 'lr-puzzles-expert',
    title: 'LR Puzzles Expert',
    category: 'DILR',
    difficulty: 'Advanced',
    duration: '20 Hours',
    lessons: 25,
    description: 'Crack the toughest logical reasoning puzzles and sets.',
    image: PlaceHolderImages.find((img) => img.id === 'course-lr-puzzles'),
  },
  {
    id: 'arithmetic-workshop',
    title: 'Arithmetic Workshop',
    category: 'Quant',
    difficulty: 'Intermediate',
    duration: '12 Hours',
    lessons: 16,
    description: 'Master percentages, profit & loss, and time & work.',
    image: PlaceHolderImages.find((img) => img.id === 'course-arithmetic'),
  },
  {
    id: 'para-jumbles-and-summary',
    title: 'Para Jumbles & Summary',
    category: 'VARC',
    difficulty: 'Intermediate',
    duration: '8 Hours',
    lessons: 14,
    description: 'Strategies for verbal logic questions.',
    image: PlaceHolderImages.find((img) => img.id === 'course-para'),
  },
  {
    id: 'di-sets-practice',
    title: 'DI Sets Practice',
    category: 'DILR',
    difficulty: 'Intermediate',
    duration: '15 Hours',
    lessons: 30,
    description: 'Intensive practice on various types of data interpretation sets.',
    image: PlaceHolderImages.find((img) => img.id === 'course-di-sets'),
  },
  {
    id: 'critical-reasoning-deep-dive',
    title: 'Critical Reasoning Deep Dive',
    category: 'VARC',
    difficulty: 'Advanced',
    duration: '9 Hours',
    lessons: 10,
    description: 'Understand and solve complex critical reasoning questions.',
    image: PlaceHolderImages.find((img) => img.id === 'course-critical-reasoning'),
  },
  {
    id: 'advanced-grammar',
    title: 'Advanced Grammar',
    category: 'VARC',
    difficulty: 'Intermediate',
    duration: '6 Hours',
    lessons: 10,
    description: 'Refine your grammar for sentence correction questions.',
    image: PlaceHolderImages.find((img) => img.id === 'course-grammar'),
  },
];
