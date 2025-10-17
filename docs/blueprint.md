# **App Name**: CATapult - AI-Powered CAT Prep Platform

## Core Features:

- Landing Page & Hero Section: Create a visually appealing landing page with a bold headline, subheading, CTAs, animated hero, trust indicators, and a countdown timer.
- User Authentication & Onboarding: Implement Firebase Authentication with Google Sign-In and Email/Password. Create a smart 3-step onboarding flow to collect user preferences and store them in Firestore.
- Interactive Course Catalog: Design an interactive course catalog displaying 12 CAT-focused courses organized by sections with detailed course cards and advanced filters.
- AI-Powered Real-Time Percentile Predictor: Develop a mock test interface simulating the CAT exam with a real-time AI percentile predictor that updates every 3 questions and provides post-test analytics.
- Student Dashboard: Create a student dashboard displaying welcome messages, CAT exam countdown, quick stats, performance charts, recommended courses, and recent activity.
- Progress Analytics Page: Develop a progress analytics page with an overview tab, section performance tab, weak areas alert, and an optional leaderboard.
- AI Study Plan: Generate a personalized weekly study plan based on exam date, target percentile, and weak sections, displayed as a weekly calendar view with daily task checklists.

## Style Guidelines:

- Primary: #1E3A5F (Deep blue - headers, nav)
- Accent: #FF6B35 (Vibrant orange - CTAs, progress)
- Success: #10B981 (Green - correct answers)
- Warning: #F59E0B (Yellow - alerts)
- Error: #EF4444 (Red - incorrect answers)
- Background: #FFFFFF (White)
- Secondary BG: #F8FAFB (Light gray sections)
- Text Primary: #1F2937 (Dark gray)
- Text Secondary: #6B7280 (Medium gray)
- Import from Google Fonts: 'Inter', sans-serif
- Headings: font-weight 700/800
- Body: font-weight 400/500
- Use Lucide React icons (imported from lucide-react library)
- Desktop (>1024px): Sidebar navigation (left, 240px fixed width), Main content area (flex-1), Right sidebar for widgets (optional, 280px)
- Mobile (<768px): Bottom navigation bar (fixed), Full-width content, Hamburger menu for secondary nav
- Page Load: Fade in content with stagger (each card 100ms delay), Stats count up from 0 to final value
- Interactions: Button hover: scale 1.05, Card hover: lift with shadow, Progress bars: animate width on load, Toast notifications: slide in from top-right
- Micro-interactions: Checkmark animation when task completed, Confetti burst for milestone achievements (90%ile, 10 tests completed), Ripple effect on button clicks