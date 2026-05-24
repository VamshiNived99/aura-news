# Aura Pulse News - Complete App Documentation

> **Last updated:** 2026-04-18
> **Document path:** `docs/APP_DOCUMENTATION.md`

## Recent Changes (2026-04-18)

- **Trending tab removed** from bottom navigation. Bottom nav is now: **Home · Local · Jobs · Prep** (Profile remains a floating top-right button). The `/daily-test` routes still exist internally and remain reachable from Exam Prep, but are no longer surfaced in the primary tab bar.
- **Native-language Text-to-Speech (free)** is now the default for all non-English articles. The app uses the free `regional-tts` Edge Function (Google Translate TTS) which streams natural-sounding MP3 audio for Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, and Punjabi. English continues to use the browser's `SpeechSynthesis` API. No API key required.
- **Relevant news background images.** The image fallback in `fetch-news` and `ReelsView` now derives a keyword from the article title (plus a category hint) and queries `source.unsplash.com` so the background visual is contextually related to the story instead of a single random stock image. The next two images are also `<link rel="preload">`-ed for smoother vertical scrolling.
- **Performance improvements (no functional change):**
  - All non-critical routes are now `React.lazy` + `Suspense` loaded — the initial JS bundle is dramatically smaller, so the Home screen paints faster.
  - `QueryClient` now defaults to `staleTime: 60s`, `gcTime: 5min`, `refetchOnWindowFocus: false`, and `retry: 1` to cut redundant network requests.
  - Edge `fetch-news` keeps a 3-minute in-memory cache and returns `Cache-Control: public, max-age=180`.
  - Background images are preloaded one step ahead in the Reels feed.

## Table of Contents
1. [App Overview](#app-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Functional Modules](#functional-modules)
5. [Technical Architecture](#technical-architecture)
6. [API Integrations](#api-integrations)
7. [State Management](#state-management)
8. [Navigation & Routing](#navigation--routing)
9. [Styling & Design System](#styling--design-system)
10. [Mobile Deployment](#mobile-deployment)
11. [Monetization](#monetization)

---

## App Overview

**Aura Pulse News** is a comprehensive mobile-first web application designed for Indian users, providing:
- Real-time news in local Indian languages
- Government job listings with live scraping
- Exam preparation content with AI-generated materials
- Programming tutorials with an in-built code compiler

### Target Audience
- Indian students preparing for competitive exams
- Job seekers looking for government positions
- General users seeking local news in regional languages

### Key Features
- 🌐 Multi-language support (English, Hindi, Local regional languages)
- 📰 Instagram Reels-style news browsing
- 💼 Live government job listings
- 📚 AI-powered exam preparation content
- 💻 In-app code compiler for 12+ programming languages
- 🎯 Competitive exam preparation materials
- 🔊 Free native-language TTS (Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi)

---

## Technology Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 18.3.1 |
| TypeScript | Type Safety | - |
| Vite | Build Tool & Dev Server | - |
| Tailwind CSS | Styling | - |
| Framer Motion | Animations & Transitions | 12.x |
| React Router DOM | Client-side Routing | 6.30.1 |
| TanStack React Query | Server State Management | 5.x |
| Shadcn/UI | Component Library | - |

### Backend (Lovable Cloud / Supabase)
| Service | Purpose |
|---------|---------|
| Supabase Edge Functions | Serverless API endpoints |
| Supabase Secrets | Secure API key storage |

### Mobile Deployment
| Technology | Purpose |
|------------|---------|
| Capacitor | Native mobile wrapper |
| Capacitor Splash Screen | App launch screen |

---

## Project Structure Overview

```
├── .env                    # Environment variables (auto-generated, DO NOT EDIT)
├── capacitor.config.ts     # Capacitor mobile app configuration
├── eslint.config.js        # ESLint code quality rules
├── index.html              # Main HTML entry point with meta tags
├── tailwind.config.ts      # Tailwind CSS configuration & design tokens
├── vite.config.ts          # Vite build tool configuration
├── tsconfig.json           # TypeScript compiler configuration
├── package.json            # NPM dependencies and scripts
│
├── public/                 # Static assets (served as-is)
│   ├── app-icon.png        # Android app icon (512x512)
│   ├── splash.png          # Android splash screen (1024x1024)
│   ├── favicon.ico         # Browser tab icon
│   ├── robots.txt          # SEO robots configuration
│   └── placeholder.svg     # Default placeholder image
│
├── src/                    # Main source code
│   ├── main.tsx            # React app entry point
│   ├── App.tsx             # Root component with routing
│   ├── App.css             # Global CSS styles
│   ├── index.css           # Tailwind base + design tokens
│   ├── vite-env.d.ts       # Vite TypeScript declarations
│   │
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route page components
│   ├── data/               # Static data files
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # External service clients
│   └── lib/                # Utility functions
│
├── supabase/               # Backend configuration
│   ├── config.toml         # Supabase project settings
│   └── functions/          # Edge Functions (serverless)
│
└── docs/                   # Documentation
    └── APP_DOCUMENTATION.md # This file
```

---

## Detailed File Reference

### Root Configuration Files

| File | Purpose | Key Contents |
|------|---------|--------------|
| `.env` | Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` - **Auto-generated, never edit** |
| `capacitor.config.ts` | Mobile app config | App ID, name, webDir, splash screen settings, server URL for dev |
| `eslint.config.js` | Code linting rules | TypeScript + React linting configuration |
| `index.html` | HTML entry | Meta tags, viewport settings, AdSense script, root div |
| `tailwind.config.ts` | Tailwind config | Color tokens, font families, custom animations, plugins |
| `vite.config.ts` | Build config | React plugin, path aliases (@/), build settings |
| `tsconfig.json` | TypeScript config | Compiler options, path mappings, strict mode |
| `package.json` | Dependencies | All npm packages, scripts (dev, build, preview) |

---

### Source Files (`src/`)

#### Entry Points

| File | Purpose | Details |
|------|---------|---------|
| `src/main.tsx` | App bootstrap | Renders `<App />` into DOM, imports global CSS |
| `src/App.tsx` | Root component | `QueryClientProvider`, `BrowserRouter`, `AnimatedRoutes`, global providers (Toaster, Tooltip) |
| `src/App.css` | Global styles | Body styles, scrollbar hiding, animation keyframes |
| `src/index.css` | Design system | Tailwind imports, CSS variables (colors, gradients, shadows), safe-area utilities |
| `src/vite-env.d.ts` | Type declarations | Vite client types reference |

---

### Components (`src/components/`)

#### Layout Components

| File | Purpose | Props/Features |
|------|---------|----------------|
| `MainLayout.tsx` | App shell | Bottom navigation bar, content area wrapper, handles navigation between main sections |
| `NavLink.tsx` | Navigation item | `to`, `icon`, `label` props - renders bottom nav buttons with active states |
| `PageTransition.tsx` | Animation wrapper | Framer Motion wrapper for page enter/exit animations |

#### Feature Components

| File | Purpose | Props/Features |
|------|---------|----------------|
| `ReelsView.tsx` | Vertical scroll | Instagram Reels-style infinite scroll container, swipe up/down navigation, snap scrolling |
| `LiveDataWidgets.tsx` | Daily updates | Weather widget, gold/silver prices, fuel prices - fetches from `fetch-live-data` edge function |
| `JobDetailsModal.tsx` | Job popup | Modal displaying job details (post name, vacancies, salary, dates, apply link) |

#### Ad Components (`src/components/ads/`)

| File | Purpose | Props/Features |
|------|---------|----------------|
| `AdBanner.tsx` | Banner ad | Renders Google AdSense banner ad, `slot` prop for ad unit ID |
| `AdInterstitial.tsx` | Full-screen ad | `show`, `onClose` props - displays interstitial ad overlay |

#### UI Components (`src/components/ui/`)

All Shadcn/UI components - pre-styled, accessible React components:

| File | Component | Usage |
|------|-----------|-------|
| `accordion.tsx` | Accordion | Expandable content sections |
| `alert.tsx` | Alert | Status messages |
| `alert-dialog.tsx` | AlertDialog | Confirmation dialogs |
| `aspect-ratio.tsx` | AspectRatio | Maintain aspect ratios |
| `avatar.tsx` | Avatar | User profile images |
| `badge.tsx` | Badge | Status labels, tags |
| `breadcrumb.tsx` | Breadcrumb | Navigation path |
| `button.tsx` | Button | Primary action element with variants (default, outline, ghost, etc.) |
| `calendar.tsx` | Calendar | Date picker calendar |
| `card.tsx` | Card | Content containers (Card, CardHeader, CardContent, CardFooter) |
| `carousel.tsx` | Carousel | Image/content slider |
| `chart.tsx` | Chart | Recharts wrapper |
| `checkbox.tsx` | Checkbox | Boolean input |
| `collapsible.tsx` | Collapsible | Expandable sections |
| `command.tsx` | Command | Command palette |
| `context-menu.tsx` | ContextMenu | Right-click menus |
| `dialog.tsx` | Dialog | Modal dialogs |
| `drawer.tsx` | Drawer | Slide-out panels |
| `dropdown-menu.tsx` | DropdownMenu | Dropdown selections |
| `form.tsx` | Form | React Hook Form integration |
| `hover-card.tsx` | HoverCard | Hover tooltips |
| `input.tsx` | Input | Text input field |
| `input-otp.tsx` | InputOTP | OTP code input |
| `label.tsx` | Label | Form labels |
| `menubar.tsx` | Menubar | Menu navigation |
| `navigation-menu.tsx` | NavigationMenu | Nav dropdowns |
| `pagination.tsx` | Pagination | Page navigation |
| `popover.tsx` | Popover | Popup content |
| `progress.tsx` | Progress | Progress bars |
| `radio-group.tsx` | RadioGroup | Single selection |
| `resizable.tsx` | Resizable | Resizable panels |
| `scroll-area.tsx` | ScrollArea | Custom scrollbars |
| `select.tsx` | Select | Dropdown select |
| `separator.tsx` | Separator | Visual dividers |
| `sheet.tsx` | Sheet | Side panels |
| `sidebar.tsx` | Sidebar | App sidebars |
| `skeleton.tsx` | Skeleton | Loading placeholders |
| `slider.tsx` | Slider | Range input |
| `sonner.tsx` | Sonner | Toast notifications (Sonner library) |
| `switch.tsx` | Switch | Toggle switch |
| `table.tsx` | Table | Data tables |
| `tabs.tsx` | Tabs | Tab navigation |
| `textarea.tsx` | Textarea | Multi-line input |
| `toast.tsx` | Toast | Notification toasts |
| `toaster.tsx` | Toaster | Toast container |
| `toggle.tsx` | Toggle | Toggle buttons |
| `toggle-group.tsx` | ToggleGroup | Button groups |
| `tooltip.tsx` | Tooltip | Hover hints |
| `use-toast.ts` | useToast | Toast hook |

---

### Pages (`src/pages/`)

#### Main Navigation Pages

| File | Route | Purpose | Key Features |
|------|-------|---------|--------------|
| `Index.tsx` | `/` | Redirect | Redirects to `/onboarding` or `/home` |
| `Onboarding.tsx` | `/onboarding` | Welcome screen | First-time user intro, language selection, location permission |
| `Home.tsx` | `/home` | Main feed | India/World toggle, Reels-style news, Daily Updates tab, TTS |
| `News.tsx` | `/news` | Local news | Regional language news, infinite scroll, language toggle |
| `Jobs.tsx` | `/jobs` | Job listings | Category/state filters, job cards, detail modal, apply links |
| `Trending.tsx` | `/trending` | Trending content | Trending articles feed |
| `Profile.tsx` | `/profile` | User profile | Settings, preferences (placeholder for v2 auth) |
| `NotFound.tsx` | `*` | 404 page | Error page for invalid routes |

#### Exam Prep - Main

| File | Route | Purpose |
|------|-------|---------|
| `ExamPrepHome.tsx` | `/exam-prep` | Exam prep landing with 5 category cards (Govt, Engineering, Aptitude, Competitive, Programming) |

#### Exam Prep - Government Exams

| File | Route | Purpose |
|------|-------|---------|
| `GovtExamsList.tsx` | `/exam-prep/govt-exams` | List of govt exams (UPSC, SSC, RRB, Banking, etc.) |
| `GovtExamDetails.tsx` | `/exam-prep/govt-exams/:examId` | Exam overview, eligibility, syllabus sections |
| `GovtExamTopic.tsx` | `/exam-prep/govt-exams/:examId/:sectionId` | Topics within a syllabus section |
| `GovtExamContent.tsx` | `/exam-prep/govt-exams/:examId/:sectionId/content` | AI-generated topic content with ads |

#### Exam Prep - Engineering

| File | Route | Purpose |
|------|-------|---------|
| `EngineeringBranches.tsx` | `/exam-prep/engineering` | Branch selection (CSE, ECE, EEE, Civil, Mech) |
| `BranchYears.tsx` | `/exam-prep/engineering/:branchId` | Year selection (1st - 4th year) |
| `SemesterList.tsx` | `/exam-prep/engineering/:branchId/:year` | Semester selection (Sem 1, Sem 2) |
| `SubjectsList.tsx` | `/exam-prep/engineering/:branchId/:year/:semester` | Subject list with codes |
| `SubjectDetails.tsx` | `/exam-prep/engineering/:branchId/:year/:semester/:subjectId` | Unit list (Unit I-V) |
| `ChapterContent.tsx` | `/exam-prep/engineering/.../chapter` | AI-generated unit content with diagrams, examples, practice questions |

#### Exam Prep - Aptitude

| File | Route | Purpose |
|------|-------|---------|
| `AptitudeHome.tsx` | `/exam-prep/aptitude` | Category selection (Quantitative, Logical, Verbal) |
| `AptitudeCategory.tsx` | `/exam-prep/aptitude/:categoryId` | Topics within category |
| `AptitudeTopic.tsx` | `/exam-prep/aptitude/:categoryId/:topicId` | Topic detail view |
| `AptitudeContent.tsx` | `/exam-prep/aptitude/.../content` | AI-generated content with 15-20 examples, 10 MCQs |

#### Exam Prep - Competitive Exams

| File | Route | Purpose |
|------|-------|---------|
| `CompetitiveExamsHome.tsx` | `/exam-prep/competitive` | Exam list (JEE, NEET, GATE, CAT) |
| `CompetitiveExamDetails.tsx` | `/exam-prep/competitive/:examId` | Exam pattern, sections |
| `CompetitiveExamTopic.tsx` | `/exam-prep/competitive/:examId/:sectionId` | Section topics |
| `CompetitiveExamContent.tsx` | `/exam-prep/competitive/.../content` | AI-generated content |

#### Exam Prep - Programming

| File | Route | Purpose |
|------|-------|---------|
| `ProgrammingHome.tsx` | `/exam-prep/programming` | Language selection (12 languages) |
| `ProgrammingLanguageDetails.tsx` | `/exam-prep/programming/:languageId` | Language topics list |
| `ProgrammingTopic.tsx` | `/exam-prep/programming/:languageId/:topicId` | Topic overview |
| `ProgrammingContent.tsx` | `/exam-prep/programming/.../content` | AI-generated tutorials with code examples |
| `CodeCompiler.tsx` | `/code-compiler` | In-app code compiler for 12 languages |

#### Mock Tests

| File | Route | Purpose |
|------|-------|---------|
| `MockTest.tsx` | `/mock-test` | Full mock test with AI-generated questions |
| `QuickMockTest.tsx` | `/quick-mock-test` | Quick 10-question test |

---

### Data Files (`src/data/`)

#### Engineering Data

| File | Contains |
|------|----------|
| `engineering/index.ts` | Branch definitions with IDs, names, icons |
| `engineering/cse.ts` | CSE curriculum: 4 years × 2 semesters × subjects × units |
| `engineering/cse-aiml.ts` | CSE-AIML specialization curriculum |
| `engineering/ece.ts` | ECE curriculum |
| `engineering/eee.ts` | EEE curriculum |
| `engineering/civil.ts` | Civil Engineering curriculum |
| `engineering/mechanical.ts` | Mechanical Engineering curriculum |

**Data Structure:**
```typescript
// engineering/index.ts
export const engineeringBranches = [
  { id: 'cse', name: 'Computer Science', icon: '💻' },
  // ...
];

// engineering/cse.ts
export const cseSubjects = {
  '1': {  // Year 1
    '1': [ // Semester 1
      { code: 'CS101', name: 'Programming', units: ['Unit I: Intro', ...] }
    ]
  }
};
```

#### Other Data Files

| File | Contains |
|------|----------|
| `aptitude/index.ts` | Aptitude categories and topics (Quantitative, Logical, Verbal) |
| `govtExams.ts` | Government exam definitions (UPSC, SSC, etc.) with syllabus structure |
| `competitiveExams.ts` | Competitive exam data (JEE, NEET, GATE, CAT) |
| `programmingLanguages.ts` | Programming languages with topics and descriptions |

---

### Hooks (`src/hooks/`)

| File | Hook | Purpose | Usage |
|------|------|---------|-------|
| `use-mobile.tsx` | `useIsMobile()` | Detect mobile viewport | Returns `boolean` for responsive logic |
| `use-toast.ts` | `useToast()` | Show toast notifications | `toast({ title, description })` |
| `useInterstitialAd.tsx` | `useInterstitialAd()` | Manage ad display | Tracks view count, triggers ads |

---

### Integrations (`src/integrations/`)

| File | Purpose | Notes |
|------|---------|-------|
| `supabase/client.ts` | Supabase client instance | **Auto-generated - DO NOT EDIT** |
| `supabase/types.ts` | Database TypeScript types | **Auto-generated - DO NOT EDIT** |

**Usage:**
```typescript
import { supabase } from '@/integrations/supabase/client';

// Call edge function
const { data } = await supabase.functions.invoke('fetch-news', {
  body: { country: 'in' }
});
```

---

### Utilities (`src/lib/`)

| File | Exports | Purpose |
|------|---------|---------|
| `utils.ts` | `cn()` | Tailwind class merger using `clsx` + `tailwind-merge` |

**Usage:**
```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-class', isActive && 'active-class')} />
```

---

### Edge Functions (`supabase/functions/`)

| Function | File | Purpose | Input | Output |
|----------|------|---------|-------|--------|
| `fetch-news` | `fetch-news/index.ts` | Fetch news from Google RSS | `{ country, language, page }` | `{ articles, totalResults }` |
| `fetch-trending` | `fetch-trending/index.ts` | Fetch trending articles | `{ country }` | `{ articles }` |
| `fetch-live-data` | `fetch-live-data/index.ts` | Weather, gold, fuel prices via Firecrawl | `{ type, city, lat, lon }` | Price/weather data |
| `generate-topic-content` | `generate-topic-content/index.ts` | AI content generation for exam prep | `{ topic, subject, unit }` | Structured educational content |
| `generate-programming-content` | `generate-programming-content/index.ts` | AI programming tutorials | `{ language, topic }` | Code tutorials with examples |
| `generate-mock-questions` | `generate-mock-questions/index.ts` | AI quiz generation | `{ topic, count }` | MCQ questions with answers |
| `compile-code` | `compile-code/index.ts` | Execute code via Piston API | `{ language, code, input }` | `{ output, error }` |
| `text-to-speech` | `text-to-speech/index.ts` | TTS functionality | `{ text, language }` | Audio stream |

**Edge Function Structure:**
```typescript
// supabase/functions/[function-name]/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const body = await req.json();
    // ... logic
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
```

---

### Supabase Configuration

| File | Purpose |
|------|---------|
| `supabase/config.toml` | Project settings, function configurations, JWT verification settings |

**Key Sections:**
```toml
project_id = "upxclnibwgzybcgvevow"

[functions.fetch-news]
verify_jwt = false  # Public access

[functions.compile-code]
verify_jwt = false
```

---

## Complete File Tree with Descriptions

```
aura-pulse-news/
│
├── .env                          # [AUTO] Supabase environment variables
├── capacitor.config.ts           # Mobile app: ID, name, splash, server URL
├── eslint.config.js              # Linting rules for code quality
├── index.html                    # HTML shell with meta, AdSense, root div
├── tailwind.config.ts            # Design tokens: colors, fonts, animations
├── vite.config.ts                # Build: React plugin, @ alias, port
├── tsconfig.json                 # TypeScript: strict, paths, target
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node scripts TS config
├── package.json                  # Dependencies, scripts
├── package-lock.json             # Locked dependency versions
├── components.json               # Shadcn UI configuration
├── postcss.config.js             # PostCSS for Tailwind
│
├── public/
│   ├── app-icon.png              # Android launcher icon (512x512)
│   ├── splash.png                # Android splash screen (1024x1024)
│   ├── favicon.ico               # Browser favicon
│   ├── robots.txt                # SEO: User-agent rules
│   └── placeholder.svg           # Default image placeholder
│
├── src/
│   ├── main.tsx                  # ReactDOM.render entry point
│   ├── App.tsx                   # Routes, providers, global components
│   ├── App.css                   # Body styles, scrollbar, keyframes
│   ├── index.css                 # Tailwind + CSS variables (design system)
│   ├── vite-env.d.ts             # Vite types reference
│   │
│   ├── components/
│   │   ├── MainLayout.tsx        # Bottom nav shell, content wrapper
│   │   ├── NavLink.tsx           # Nav button with icon + label
│   │   ├── PageTransition.tsx    # Framer Motion page wrapper
│   │   ├── ReelsView.tsx         # Vertical infinite scroll container
│   │   ├── LiveDataWidgets.tsx   # Weather, gold, fuel price cards
│   │   ├── JobDetailsModal.tsx   # Job detail popup with all info
│   │   │
│   │   ├── ads/
│   │   │   ├── AdBanner.tsx      # Google AdSense banner component
│   │   │   └── AdInterstitial.tsx # Full-screen interstitial ad
│   │   │
│   │   └── ui/                   # [35+ Shadcn components]
│   │       ├── button.tsx        # Button with variants
│   │       ├── card.tsx          # Card container
│   │       ├── dialog.tsx        # Modal dialog
│   │       ├── input.tsx         # Text input
│   │       ├── select.tsx        # Dropdown select
│   │       ├── skeleton.tsx      # Loading placeholder
│   │       ├── tabs.tsx          # Tab navigation
│   │       ├── toast.tsx         # Notification toast
│   │       └── ... (30+ more)    # See UI Components table
│   │
│   ├── pages/
│   │   ├── Index.tsx             # / - Redirect logic
│   │   ├── Onboarding.tsx        # Welcome, permissions, setup
│   │   ├── Home.tsx              # Main feed with India/World toggle
│   │   ├── News.tsx              # Local news in regional language
│   │   ├── Jobs.tsx              # Govt job listings + filters
│   │   ├── Trending.tsx          # Trending articles feed
│   │   ├── Profile.tsx           # User settings (v2 auth ready)
│   │   ├── NotFound.tsx          # 404 error page
│   │   │
│   │   ├── ExamPrepHome.tsx      # Exam prep category selection
│   │   │
│   │   ├── GovtExamsList.tsx     # All govt exams list
│   │   ├── GovtExamDetails.tsx   # Single exam overview + syllabus
│   │   ├── GovtExamTopic.tsx     # Syllabus section topics
│   │   ├── GovtExamContent.tsx   # AI-generated topic content
│   │   │
│   │   ├── EngineeringBranches.tsx # Branch selection cards
│   │   ├── BranchYears.tsx       # Year 1-4 selection
│   │   ├── SemesterList.tsx      # Semester 1-2 selection
│   │   ├── SubjectsList.tsx      # Subject cards with codes
│   │   ├── SubjectDetails.tsx    # Unit I-V list
│   │   ├── ChapterContent.tsx    # AI content: diagrams, examples
│   │   │
│   │   ├── AptitudeHome.tsx      # 3 aptitude categories
│   │   ├── AptitudeCategory.tsx  # Topics in category
│   │   ├── AptitudeTopic.tsx     # Topic detail
│   │   ├── AptitudeContent.tsx   # AI content: examples, MCQs
│   │   │
│   │   ├── CompetitiveExamsHome.tsx # JEE, NEET, GATE, CAT
│   │   ├── CompetitiveExamDetails.tsx # Exam sections
│   │   ├── CompetitiveExamTopic.tsx # Section topics
│   │   ├── CompetitiveExamContent.tsx # AI content
│   │   │
│   │   ├── ProgrammingHome.tsx   # 12 programming languages
│   │   ├── ProgrammingLanguageDetails.tsx # Language topics
│   │   ├── ProgrammingTopic.tsx  # Topic overview
│   │   ├── ProgrammingContent.tsx # AI tutorials + code
│   │   ├── CodeCompiler.tsx      # Multi-language code editor
│   │   │
│   │   ├── MockTest.tsx          # Full practice test
│   │   └── QuickMockTest.tsx     # Quick 10-question test
│   │
│   ├── data/
│   │   ├── engineering/
│   │   │   ├── index.ts          # Branch IDs, names, icons
│   │   │   ├── cse.ts            # CSE: years → semesters → subjects
│   │   │   ├── cse-aiml.ts       # CSE-AIML curriculum
│   │   │   ├── ece.ts            # ECE curriculum
│   │   │   ├── eee.ts            # EEE curriculum
│   │   │   ├── civil.ts          # Civil curriculum
│   │   │   └── mechanical.ts     # Mechanical curriculum
│   │   │
│   │   ├── aptitude/
│   │   │   └── index.ts          # Categories + topics
│   │   │
│   │   ├── govtExams.ts          # Exam definitions + syllabus
│   │   ├── competitiveExams.ts   # JEE/NEET/GATE/CAT data
│   │   └── programmingLanguages.ts # Languages + topics
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx        # useIsMobile() - viewport detection
│   │   ├── use-toast.ts          # useToast() - notifications
│   │   └── useInterstitialAd.tsx # Ad timing and display logic
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts         # [AUTO] Supabase client instance
│   │       └── types.ts          # [AUTO] Database types
│   │
│   └── lib/
│       └── utils.ts              # cn() - Tailwind class merger
│
├── supabase/
│   ├── config.toml               # Project ID, function settings
│   │
│   └── functions/
│       ├── fetch-news/
│       │   └── index.ts          # Google RSS news fetching
│       │
│       ├── fetch-trending/
│       │   └── index.ts          # Trending articles
│       │
│       ├── fetch-live-data/
│       │   └── index.ts          # Firecrawl: weather, prices
│       │
│       ├── generate-topic-content/
│       │   └── index.ts          # Lovable AI: exam content
│       │
│       ├── generate-programming-content/
│       │   └── index.ts          # Lovable AI: code tutorials
│       │
│       ├── generate-mock-questions/
│       │   └── index.ts          # Lovable AI: quiz MCQs
│       │
│       ├── compile-code/
│       │   └── index.ts          # Piston API: code execution
│       │
│       └── text-to-speech/
│           └── index.ts          # TTS audio generation
│
└── docs/
    └── APP_DOCUMENTATION.md      # This comprehensive documentation
```

---

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn UI components (Button, Card, etc.)
│   ├── ads/             # Ad components (Banner, Interstitial)
│   ├── MainLayout.tsx   # App shell with bottom navigation
│   ├── NavLink.tsx      # Navigation link component
│   ├── PageTransition.tsx # Page animation wrapper
│   ├── ReelsView.tsx    # Instagram-style vertical scroll
│   ├── LiveDataWidgets.tsx # Weather, prices widgets
│   └── JobDetailsModal.tsx # Job details popup
│
├── pages/               # Route components
│   ├── Home.tsx         # Main landing page
│   ├── News.tsx         # Local news feed
│   ├── Jobs.tsx         # Government job listings
│   ├── Trending.tsx     # Trending content
│   ├── Profile.tsx      # User profile
│   │
│   ├── ExamPrepHome.tsx # Exam prep landing
│   ├── GovtExamsList.tsx # Government exams list
│   ├── GovtExamDetails.tsx # Individual exam details
│   ├── GovtExamTopic.tsx # Exam topic view
│   ├── GovtExamContent.tsx # Topic content display
│   │
│   ├── EngineeringBranches.tsx # Engineering branch selection
│   ├── BranchYears.tsx  # Year selection (1st-4th)
│   ├── SemesterList.tsx # Semester selection
│   ├── SubjectsList.tsx # Subject listing
│   ├── SubjectDetails.tsx # Subject units
│   ├── ChapterContent.tsx # Unit content with AI generation
│   │
│   ├── AptitudeHome.tsx # Aptitude section home
│   ├── AptitudeCategory.tsx # Category selection
│   ├── AptitudeTopic.tsx # Topic selection
│   ├── AptitudeContent.tsx # Topic content
│   │
│   ├── CompetitiveExamsHome.tsx # Competitive exams
│   ├── CompetitiveExamDetails.tsx
│   ├── CompetitiveExamTopic.tsx
│   ├── CompetitiveExamContent.tsx
│   │
│   ├── ProgrammingHome.tsx # Programming languages
│   ├── ProgrammingLanguageDetails.tsx
│   ├── ProgrammingTopic.tsx
│   ├── ProgrammingContent.tsx
│   ├── CodeCompiler.tsx # In-app code compiler
│   │
│   ├── MockTest.tsx     # Practice tests
│   ├── QuickMockTest.tsx # Quick test mode
│   └── Onboarding.tsx   # First-time user flow
│
├── data/                # Static data files
│   ├── engineering/     # Engineering curriculum data
│   │   ├── index.ts     # Branch definitions
│   │   ├── cse.ts       # CSE subjects & units
│   │   ├── cse-aiml.ts  # CSE-AIML curriculum
│   │   ├── ece.ts       # ECE curriculum
│   │   ├── eee.ts       # EEE curriculum
│   │   ├── civil.ts     # Civil curriculum
│   │   └── mechanical.ts # Mechanical curriculum
│   ├── aptitude/        # Aptitude topics data
│   ├── govtExams.ts     # Government exam definitions
│   ├── competitiveExams.ts # Competitive exam data
│   └── programmingLanguages.ts # Programming language topics
│
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection hook
│   ├── use-toast.ts     # Toast notifications
│   └── useInterstitialAd.tsx # Ad display logic
│
├── integrations/        # External service integrations
│   └── supabase/
│       ├── client.ts    # Supabase client (auto-generated)
│       └── types.ts     # Database types (auto-generated)
│
├── lib/
│   └── utils.ts         # Utility functions (cn, etc.)
│
├── App.tsx              # Root component with routing
├── App.css              # Global styles
├── index.css            # Tailwind & design tokens
└── main.tsx             # App entry point

supabase/
├── config.toml          # Supabase configuration
└── functions/           # Edge Functions
    ├── fetch-news/      # News fetching (Google RSS)
    ├── fetch-trending/  # Trending content
    ├── fetch-live-data/ # Weather, prices (Firecrawl)
    ├── generate-topic-content/ # AI content generation
    ├── generate-programming-content/ # Programming AI content
    ├── generate-mock-questions/ # Quiz generation
    ├── compile-code/    # Code compilation service
    └── text-to-speech/  # TTS functionality

public/
├── app-icon.png         # Android app icon
├── splash.png           # Splash screen image
├── robots.txt           # SEO robots file
└── favicon.ico          # Browser favicon
```

---

## Functional Modules

### 1. Home Module
**Path:** `/home`

**Features:**
- India/Worldwide news toggle
- Instagram Reels-style vertical scrolling
- Daily Updates widget (weather, gold/silver prices, fuel prices)
- Local language auto-detection based on user's Indian state
- Text-to-speech for news articles

**Key Components:**
- `ReelsView.tsx` - Vertical scroll container
- `LiveDataWidgets.tsx` - Real-time data display

**User Flow:**
```
Home Page → Swipe Up/Down → Read Articles → Toggle India/World → View Daily Updates
```

### 2. News Module
**Path:** `/news`

**Features:**
- Local Indian news in regional language
- Infinite scroll with pagination
- Language toggle (English/Hindi/Local)
- URL-based deduplication
- Geolocation-based state detection

**Data Source:** Google News RSS feeds via Edge Function

**User Flow:**
```
News Page → Auto-detect Language → Scroll Articles → Change Language → Refresh
```

### 3. Jobs Module
**Path:** `/jobs`

**Features:**
- Live government job listings
- Category filters (Banking, Teaching, Railway, Police, Engineering)
- State-wise filtering (all Indian states)
- Job detail modal with structured information
- Direct apply links to official websites

**Data Source:** Live scraping via Cloudflare Worker from freejobalert.com

**Job Data Structure:**
```typescript
interface Job {
  title: string;
  date: string;
  detailsUrl: string;
  postName?: string;
  vacancies?: string;
  salary?: string;
  ageLimit?: string;
  qualification?: string;
  importantDates?: { event: string; date: string }[];
  applyLink?: string;
}
```

**User Flow:**
```
Jobs Page → Select Category → Select State → View Listings → Click Job → View Details Modal → Apply (External Link)
```

### 4. Exam Preparation Module
**Base Path:** `/exam-prep`

#### 4.1 Government Exams
**Path:** `/exam-prep/govt-exams/*`

**Covered Exams:**
- UPSC (Civil Services)
- SSC (Staff Selection Commission)
- RRB (Railway Recruitment Board)
- Banking (IBPS, SBI)
- Teaching (TET, CTET)
- Police & Defence
- State PSCs

**Content Structure:**
```
Exam List → Exam Details → Subject/Section → Topic → AI-Generated Content
```

#### 4.2 Engineering
**Path:** `/exam-prep/engineering/*`

**Branches Covered:**
- CSE (Computer Science)
- CSE-AIML (AI/ML Specialization)
- ECE (Electronics & Communication)
- EEE (Electrical & Electronics)
- Civil Engineering
- Mechanical Engineering

**Hierarchy:**
```
Branch → Year (1-4) → Semester (1-2) → Subject → Unit (I-V) → AI-Generated Content
```

**Subject Data Structure:**
```typescript
interface Subject {
  code: string;      // e.g., "CS301"
  name: string;      // e.g., "Data Structures"
  units: string[];   // ["Unit I: Introduction", ...]
}
```

#### 4.3 Aptitude
**Path:** `/exam-prep/aptitude/*`

**Categories:**
1. **Quantitative Aptitude**
   - Number System, Percentages, Profit & Loss, Time & Work, etc.
2. **Logical Reasoning**
   - Blood Relations, Coding-Decoding, Syllogisms, etc.
3. **Verbal Ability**
   - Reading Comprehension, Grammar, Vocabulary, etc.

**Content Requirements:**
- 15-20 worked examples per topic
- 10 MCQ practice questions (A, B, C, D options)

#### 4.4 Competitive Exams
**Path:** `/exam-prep/competitive/*`

**Exams Covered:**
- JEE Mains
- JEE Advanced
- NEET UG
- GATE
- CAT

**Content:** Exam patterns, syllabus, formulas, tips, practice questions

### 5. Programming Module
**Path:** `/exam-prep/programming/*`

**Languages Supported:**
| Language | Icon | Version |
|----------|------|---------|
| Python | 🐍 | 3.x |
| Java | ☕ | 11 |
| C++ | ⚙️ | 17 |
| JavaScript | 🟨 | ES6+ |
| C | 📘 | C11 |
| SQL | 🗃️ | - |
| HTML & CSS | 🌐 | 5/3 |
| TypeScript | 🔷 | 4.x |
| Go | 🔵 | 1.x |
| Rust | 🦀 | 1.x |
| Kotlin | 🟣 | 1.x |
| Swift | 🍎 | 5.x |

**Features:**
- Topic-wise tutorials
- In-built code compiler
- Executable code examples
- Practice problems

**Code Compiler Flow:**
```
Select Language → Write/Edit Code → Add Input (optional) → Run → View Output
```

### 6. Trending Module
**Path:** `/trending`

**Features:**
- Trending articles aggregation
- Similar Reels-style interface to Home/News
- Full article reading capability

### 7. Mock Test Module
**Path:** `/mock-test`, `/quick-mock-test`

**Features:**
- AI-generated quiz questions
- Multiple choice format
- Instant results and explanations
- Topic-specific tests

---

## Technical Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │   Home   │    │   News   │    │   Jobs   │    │ ExamPrep │  │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘  │
│       │               │               │               │         │
│       ▼               ▼               ▼               ▼         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React Query (TanStack Query)               │   │
│  │         - Caching - Refetching - State Sync            │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE EDGE FUNCTIONS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐    │
│  │  fetch-news    │  │ fetch-live-data│  │ generate-topic │    │
│  │  (Google RSS)  │  │  (Firecrawl)   │  │   -content     │    │
│  └────────────────┘  └────────────────┘  └────────────────┘    │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐    │
│  │ compile-code   │  │fetch-trending  │  │ generate-mock  │    │
│  │ (Piston API)   │  │ (Google RSS)   │  │  -questions    │    │
│  └────────────────┘  └────────────────┘  └────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Google News  │  │  Firecrawl   │  │  Lovable AI  │          │
│  │     RSS      │  │   (Prices)   │  │  (Content)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │  Piston API  │  │  Cloudflare  │                            │
│  │  (Compiler)  │  │   Worker     │                            │
│  └──────────────┘  └──────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App.tsx
│
├── BrowserRouter
│   └── AnimatedRoutes
│       │
│       ├── Onboarding (/)
│       │
│       └── MainLayout (Shell)
│           ├── Header (dynamic per page)
│           ├── Content Area
│           │   └── [Page Components with PageTransition]
│           └── Bottom Navigation
│               ├── Home
│               ├── News
│               ├── Jobs
│               ├── Exam Prep
│               └── Profile
```

---

## API Integrations

### 1. News Fetching (Google RSS)
**Edge Function:** `fetch-news/index.ts`

**Endpoint:** `POST /functions/v1/fetch-news`

**Request:**
```typescript
{
  country: 'in' | 'world',
  language: 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa',
  page?: number
}
```

**Response:**
```typescript
{
  articles: Array<{
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: { name: string };
  }>;
  totalResults: number;
  nextPage?: string;
}
```

### 2. Live Data (Firecrawl)
**Edge Function:** `fetch-live-data/index.ts`

**Endpoint:** `POST /functions/v1/fetch-live-data`

**Request:**
```typescript
{
  type: 'weather' | 'gold' | 'fuel',
  city?: string,
  lat?: number,
  lon?: number
}
```

### 3. AI Content Generation (Lovable AI)
**Edge Function:** `generate-topic-content/index.ts`

**Endpoint:** `POST /functions/v1/generate-topic-content`

**Request:**
```typescript
{
  topic: string,
  subject: string,
  unit: string
}
```

**Response Structure:**
```typescript
{
  title: string;
  introduction: string;
  sections: Array<{
    heading: string;
    content: string;
    keyPoints: string[];
    examples?: Array<{
      problem: string;
      solution: string;
      answer: string;
    }>;
  }>;
  diagram?: {
    type: string;
    title: string;
    elements: Array<{
      id: string;
      label: string;
      level: number;
      connections?: string[];
    }>;
  };
  formulas?: Array<{
    name: string;
    expression: string;
    description: string;
  }>;
  summary: string;
  practiceQuestions: Array<{
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
}
```

### 4. Code Compilation (Piston API)
**Edge Function:** `compile-code/index.ts`

**Endpoint:** `POST /functions/v1/compile-code`

**Request:**
```typescript
{
  language: string,  // 'python', 'java', 'cpp', etc.
  version: string,   // Language version
  code: string,      // Source code
  input?: string     // Standard input
}
```

**Response:**
```typescript
{
  output: string,
  error?: string,
  executionTime?: number
}
```

### 5. Jobs Scraping (Cloudflare Worker)
**External Worker Endpoints:**

**List Jobs:**
```
GET /api/scrape?url={category_url}
```

**Job Details:**
```
GET /api/scrapeDetail?url={job_detail_url}
```

---

## State Management

### React Query Usage

```typescript
// Example: Fetching news
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['news', country, language, page],
  queryFn: async () => {
    const { data, error } = await supabase.functions.invoke('fetch-news', {
      body: { country, language, page }
    });
    if (error) throw error;
    return data;
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Local State Patterns

```typescript
// Page-level state
const [loading, setLoading] = useState(false);
const [content, setContent] = useState<TopicContent | null>(null);
const [showAd, setShowAd] = useState(false);

// URL params for navigation state
const [searchParams] = useSearchParams();
const topic = searchParams.get('topic');
```

### Shared State via URL

Navigation state is passed through:
- URL parameters (`?topic=...&subject=...`)
- Route state (`navigate('/path', { state: { ... } })`)

---

## Navigation & Routing

### Route Structure

```typescript
const routes = [
  { path: '/', element: <Onboarding /> },
  { path: '/home', element: <Home /> },
  { path: '/news', element: <News /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/trending', element: <Trending /> },
  { path: '/profile', element: <Profile /> },
  
  // Exam Prep Routes
  { path: '/exam-prep', element: <ExamPrepHome /> },
  { path: '/exam-prep/govt-exams', element: <GovtExamsList /> },
  { path: '/exam-prep/govt-exams/:examId', element: <GovtExamDetails /> },
  { path: '/exam-prep/govt-exams/:examId/:sectionId', element: <GovtExamTopic /> },
  { path: '/exam-prep/govt-exams/:examId/:sectionId/content', element: <GovtExamContent /> },
  
  // Engineering Routes
  { path: '/exam-prep/engineering', element: <EngineeringBranches /> },
  { path: '/exam-prep/engineering/:branchId', element: <BranchYears /> },
  { path: '/exam-prep/engineering/:branchId/:year', element: <SemesterList /> },
  { path: '/exam-prep/engineering/:branchId/:year/:semester', element: <SubjectsList /> },
  { path: '/exam-prep/engineering/:branchId/:year/:semester/:subjectId', element: <SubjectDetails /> },
  { path: '/exam-prep/engineering/:branchId/:year/:semester/:subjectId/chapter', element: <ChapterContent /> },
  
  // Aptitude Routes
  { path: '/exam-prep/aptitude', element: <AptitudeHome /> },
  { path: '/exam-prep/aptitude/:categoryId', element: <AptitudeCategory /> },
  { path: '/exam-prep/aptitude/:categoryId/:topicId', element: <AptitudeTopic /> },
  { path: '/exam-prep/aptitude/:categoryId/:topicId/content', element: <AptitudeContent /> },
  
  // Programming Routes
  { path: '/exam-prep/programming', element: <ProgrammingHome /> },
  { path: '/exam-prep/programming/:languageId', element: <ProgrammingLanguageDetails /> },
  { path: '/exam-prep/programming/:languageId/:topicId', element: <ProgrammingTopic /> },
  { path: '/exam-prep/programming/:languageId/:topicId/content', element: <ProgrammingContent /> },
  { path: '/code-compiler', element: <CodeCompiler /> },
  
  // Mock Tests
  { path: '/mock-test', element: <MockTest /> },
  { path: '/quick-mock-test', element: <QuickMockTest /> },
];
```

### Page Transitions

```typescript
// PageTransition wrapper for smooth animations
<AnimatePresence mode="wait">
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## Styling & Design System

### Design Tokens (index.css)

```css
:root {
  /* Colors - HSL Format */
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;
  --card: 222 47% 8%;
  --card-foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 222 47% 11%;
  --secondary: 217 33% 17%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 33% 17%;
  --border: 217 33% 17%;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(217 91% 70%));
  
  /* Shadows */
  --shadow-glow: 0 0 40px hsl(var(--primary) / 0.3);
}
```

### Tailwind Usage Guidelines

```typescript
// ✅ CORRECT - Use semantic tokens
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">

// ❌ WRONG - Don't use direct colors
<div className="bg-black text-white">
<button className="bg-blue-500 text-white">
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="w-full min-h-[100dvh] p-4 md:p-6 lg:p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Content */}
  </div>
</div>
```

### Safe Area Handling

```css
.safe-area-top { padding-top: env(safe-area-inset-top); }
.safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
.pb-safe { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
```

---

## Mobile Deployment

### Capacitor Configuration

**File:** `capacitor.config.ts`

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.93b75c7350f74d1eb401548a86d632e9',
  appName: 'aura-pulse-news',
  webDir: 'dist',
  server: {
    // For development - remove for production
    url: 'https://93b75c73-50f7-4d1e-b401-548a86d632e9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a0a1a',
      androidSplashResourceName: 'splash',
      showSpinner: false
    }
  }
};
```

### Build Process

```bash
# 1. Clone repository
git clone <repo-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Add Android platform
npx cap add android

# 4. Build web assets
npm run build

# 5. Sync to native project
npx cap sync android

# 6. Open in Android Studio
npx cap open android

# 7. Generate APK in Android Studio
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### Asset Sizes for Android

| Asset | Size | Location |
|-------|------|----------|
| ic_launcher (mdpi) | 48x48 | mipmap-mdpi |
| ic_launcher (hdpi) | 72x72 | mipmap-hdpi |
| ic_launcher (xhdpi) | 96x96 | mipmap-xhdpi |
| ic_launcher (xxhdpi) | 144x144 | mipmap-xxhdpi |
| ic_launcher (xxxhdpi) | 192x192 | mipmap-xxxhdpi |
| splash.png | 2732x2732 | drawable |

---

## Monetization

### Google AdSense Integration

**Publisher ID:** `pub-9103683274653551`

**Ad Types:**
1. **Banner Ads** - Displayed on Home, News, Trending pages
2. **Interstitial Ads** - Full-screen ads at specific triggers

### Ad Placement Strategy

| Page | Trigger | Ad Type |
|------|---------|---------|
| Home | Every 5 reels | Interstitial |
| Home | Click "Read Full Article" | Interstitial |
| Home | Switch to "Daily Updates" | Interstitial |
| News | Every 5 reels | Interstitial |
| Jobs | Click "View Details" | Interstitial |
| Jobs | Click "Apply Now" | Interstitial |
| Trending | Click "Read Full Article" | Interstitial |
| Exam Prep | During content loading | Interstitial |

### Implementation

```typescript
// AdInterstitial component usage
<AdInterstitial 
  show={showAd} 
  onClose={() => setShowAd(false)} 
/>

// Banner ad component
<AdBanner slot="1234567890" />
```

---

## Environment Variables

| Variable | Purpose | Location |
|----------|---------|----------|
| VITE_SUPABASE_URL | Supabase project URL | .env (auto) |
| VITE_SUPABASE_PUBLISHABLE_KEY | Supabase anon key | .env (auto) |
| VITE_SUPABASE_PROJECT_ID | Project identifier | .env (auto) |
| VITE_ADSENSE_PUBLISHER_ID | AdSense publisher ID | Secrets |
| NEWS_API_KEY | NewsAPI key (backup) | Secrets |
| NEWSDATA_API_KEY | NewsData.io key | Secrets |
| FIRECRAWL_API_KEY | Firecrawl API key | Secrets |
| LOVABLE_API_KEY | AI gateway key (auto) | Secrets |

---

## Security Considerations

1. **API Keys:** All API keys stored in Supabase Secrets, never exposed to frontend
2. **Edge Functions:** All external API calls routed through Edge Functions
3. **CORS:** Properly configured for web access
4. **No Authentication (v1):** Deferred to v2 - current app is public access

---

## Future Roadmap (v2)

1. **Authentication System**
   - Phone/Email login
   - Protected routes
   - User profiles

2. **Offline Support**
   - PWA capabilities
   - Content caching
   - Offline reading

3. **Push Notifications**
   - Breaking news alerts
   - Job alerts
   - Exam reminders

4. **Personalization**
   - Bookmarks
   - Reading history
   - Personalized recommendations

---

## Troubleshooting Guide

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| News not loading | API rate limit | Check edge function logs |
| Content generation slow | AI processing | Show loading state with ad |
| Jobs empty | Scraping blocked | Check Cloudflare Worker |
| Compiler timeout | Complex code | Limit execution time |

### Debug Tools

```typescript
// Check Supabase function logs
supabase functions logs fetch-news

// View console logs in browser
// Open DevTools → Console

// Network requests
// Open DevTools → Network
```

---

## Contributing Guidelines

1. **Code Style:** Follow existing patterns
2. **Components:** Keep small and focused
3. **Styling:** Use design tokens only
4. **Testing:** Manual testing required
5. **Documentation:** Update this doc for major changes

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Maintainer:** Aura Pulse Team
