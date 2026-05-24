import { getStaticContent } from "@/data/staticContent";
import { supabase } from "@/integrations/supabase/client";

// Content structure interfaces
export interface DiagramStep {
  id: string;
  text: string;
  next?: string[];
}

export interface Diagram {
  type: "flowchart" | "process" | "hierarchy" | "comparison" | "cycle";
  title: string;
  steps: DiagramStep[];
}

export interface ConceptNode {
  id: string;
  label: string;
  type: "main" | "sub" | "detail";
  parent?: string;
}

export interface ConceptMapData {
  title: string;
  nodes: ConceptNode[];
}

export interface Example {
  title: string;
  problem: string;
  approach?: string;
  solution: string;
  answer?: string;
  shortcut?: string;
}

export interface Formula {
  name: string;
  expression: string;
  description?: string;
  derivation?: string;
  example?: string;
}

export interface Mnemonic {
  topic: string;
  mnemonic: string;
  expansion: string;
}

export interface PracticeQuestion {
  question: string;
  options: Record<string, string> | string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty?: string;
  examSource?: string;
}

export interface PreviousYearQuestion {
  year: string;
  exam: string;
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  content: string;
  keyPoints?: string[];
  diagram?: Diagram;
  examples?: Example[];
  commonMistakes?: string[];
}

export interface TopicContent {
  title: string;
  introduction: string;
  conceptMap?: ConceptMapData;
  sections: ContentSection[];
  formulas?: Formula[];
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  mnemonics?: Mnemonic[];
  summary: string;
  quickRevision?: string[];
  practiceQuestions: PracticeQuestion[];
  previousYearQuestions?: PreviousYearQuestion[];
  studyTips?: string[];
  examInsights?: string;
  relatedTopics?: string[];
  bookReferences?: string[];
  sources?: string[];
}

interface FetchContentParams {
  topic: string;
  subject?: string;
  unit?: string;
  examType?: string;
  category?: string;
}

// Normalize AI-generated content to match our interface
function normalizeContent(raw: any): TopicContent {
  return {
    title: raw.title || "Study Material",
    introduction: raw.introduction || "",
    conceptMap: raw.conceptMap || undefined,
    sections: (raw.sections || []).map((s: any) => ({
      heading: s.heading || "",
      content: s.content || "",
      keyPoints: s.keyPoints || [],
      diagram: s.diagram || undefined,
      examples: (s.examples || []).map((e: any) => ({
        title: e.title || "",
        problem: e.problem || "",
        approach: e.approach || undefined,
        solution: e.solution || "",
        answer: e.answer || undefined,
        shortcut: e.shortcut || undefined,
      })),
      commonMistakes: s.commonMistakes || [],
    })),
    formulas: (raw.formulas || []).map((f: any) => ({
      name: f.name || "",
      expression: f.expression || "",
      description: f.description || undefined,
      example: f.example || undefined,
    })),
    comparisonTable: raw.comparisonTable || undefined,
    mnemonics: (raw.mnemonics || []).map((m: any) => ({
      topic: m.topic || "",
      mnemonic: m.mnemonic || "",
      expansion: m.expansion || "",
    })),
    summary: raw.summary || "",
    quickRevision: raw.quickRevision || [],
    practiceQuestions: (raw.practiceQuestions || []).map((q: any) => ({
      question: q.question || "",
      options: q.options || {},
      correctAnswer: q.correctAnswer || "A",
      explanation: q.explanation || "",
      difficulty: q.difficulty || "medium",
      examSource: q.examSource || q.examPattern || undefined,
    })),
    previousYearQuestions: (raw.previousYearQuestions || []).map((q: any) => ({
      year: q.year || "",
      exam: q.exam || "",
      question: q.question || "",
      answer: q.answer || "",
    })),
    studyTips: raw.studyTips || raw.tips || [],
    examInsights: raw.examInsights || raw.previousYearInsights || undefined,
    relatedTopics: raw.relatedTopics || [],
    bookReferences: raw.bookReferences || [],
  };
}

// Fetch content - uses static content first, then AI generation
export async function fetchEducationalContent(params: FetchContentParams): Promise<TopicContent> {
  const { topic, subject, unit, examType, category } = params;

  // Try to get static curated content first
  const staticContent = getStaticContent(topic, subject, category);
  if (staticContent) {
    return staticContent;
  }

  // Generate content using AI (free Lovable AI - no API key needed)
  try {
    const { data, error } = await supabase.functions.invoke('generate-topic-content', {
      body: { topic, subject, unit, examType, category },
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to generate content');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return normalizeContent(data);
  } catch (err) {
    console.error('Content generation failed, using fallback:', err);
    // Return fallback content if AI generation fails
    return generateFallbackContent(topic, subject, examType);
  }
}

function generateFallbackContent(topic: string, subject?: string, examType?: string): TopicContent {
  return {
    title: topic,
    introduction: `${topic} is a fundamental concept${subject ? ` in ${subject}` : ''}${examType ? ` for ${examType} preparation` : ''}. This topic covers essential principles and their applications. Content generation is temporarily unavailable - please try again in a moment.`,
    conceptMap: {
      title: `Concept Map: ${topic}`,
      nodes: [
        { id: "1", label: topic, type: "main" },
        { id: "2", label: "Fundamentals", type: "sub", parent: "1" },
        { id: "3", label: "Applications", type: "sub", parent: "1" },
        { id: "4", label: "Problem Solving", type: "sub", parent: "1" },
      ]
    },
    sections: [
      {
        heading: 'Introduction to ' + topic,
        content: `${topic} forms the foundation for understanding more advanced concepts. Content is being loaded - please tap the refresh button to try generating detailed content again.`,
        keyPoints: [
          `Core concept in ${subject || 'this field'}`,
          'Important for competitive exams',
          'Has practical real-world applications',
        ],
      },
    ],
    formulas: [],
    mnemonics: [],
    summary: `${topic} is essential for ${subject || 'this subject'}. Please refresh to load comprehensive AI-generated content.`,
    quickRevision: [
      'Tap refresh button for detailed content',
    ],
    practiceQuestions: [],
    studyTips: [
      'Tap the refresh button above to generate comprehensive study material',
    ],
    bookReferences: [],
    relatedTopics: [],
  };
}
