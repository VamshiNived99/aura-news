import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Premium book sources for different subjects
const bookReferences: Record<string, { books: string[]; concepts: string[] }> = {
  // Physics
  physics: {
    books: ['HC Verma Concepts of Physics', 'Resnick Halliday Walker', 'NCERT Physics', 'DC Pandey', 'Irodov Problems'],
    concepts: ['mechanics', 'thermodynamics', 'waves', 'optics', 'electromagnetism', 'modern physics']
  },
  // Chemistry
  chemistry: {
    books: ['NCERT Chemistry', 'OP Tandon', 'Morrison Boyd Organic', 'JD Lee Inorganic', 'P Bahadur Physical Chemistry'],
    concepts: ['atomic structure', 'chemical bonding', 'organic reactions', 'coordination compounds', 'thermodynamics']
  },
  // Mathematics
  mathematics: {
    books: ['NCERT Mathematics', 'RD Sharma', 'Cengage Mathematics', 'SL Loney Trigonometry', 'IA Maron Calculus'],
    concepts: ['algebra', 'calculus', 'trigonometry', 'coordinate geometry', 'probability', 'vectors']
  },
  // Biology
  biology: {
    books: ['NCERT Biology', 'Trueman Biology', 'Pradeep Biology', 'Campbell Biology'],
    concepts: ['cell biology', 'genetics', 'ecology', 'human physiology', 'plant biology', 'evolution']
  },
  // Indian Polity
  polity: {
    books: ['M Laxmikant Indian Polity', 'DD Basu Constitution of India', 'NCERT Political Science'],
    concepts: ['fundamental rights', 'directive principles', 'parliament', 'judiciary', 'federalism', 'constitutional amendments']
  },
  // Indian Economy
  economy: {
    books: ['Ramesh Singh Indian Economy', 'Sankarganesh Karuppiah', 'NCERT Economics', 'Economic Survey'],
    concepts: ['GDP', 'fiscal policy', 'monetary policy', 'banking', 'inflation', 'economic reforms']
  },
  // History
  history: {
    books: ['Bipan Chandra Modern India', 'RS Sharma Ancient India', 'Satish Chandra Medieval India', 'Spectrum History'],
    concepts: ['ancient civilizations', 'medieval kingdoms', 'colonial period', 'freedom struggle', 'post-independence']
  },
  // Geography
  geography: {
    books: ['NCERT Geography', 'Majid Husain Geography', 'GC Leong Physical Geography', 'Oxford Atlas'],
    concepts: ['physical geography', 'human geography', 'climatology', 'oceanography', 'Indian geography']
  },
  // Reasoning
  reasoning: {
    books: ['RS Aggarwal Reasoning', 'MK Pandey Analytical Reasoning', 'Arihant Reasoning'],
    concepts: ['coding-decoding', 'blood relations', 'syllogism', 'puzzles', 'data interpretation', 'logical deduction']
  },
  // Quantitative Aptitude
  aptitude: {
    books: ['RS Aggarwal Quantitative Aptitude', 'Arun Sharma QA', 'Abhijit Guha', 'Sarvesh Kumar Verma'],
    concepts: ['number system', 'algebra', 'geometry', 'time-speed-distance', 'profit-loss', 'percentages']
  },
  // English
  english: {
    books: ['Wren Martin English Grammar', 'Norman Lewis Word Power Made Easy', 'SP Bakshi English'],
    concepts: ['grammar', 'vocabulary', 'comprehension', 'idioms', 'sentence correction', 'para jumbles']
  },
  // Computer Science
  programming: {
    books: ['Cracking the Coding Interview', 'CLRS Algorithms', 'Clean Code Robert Martin', 'Design Patterns GoF'],
    concepts: ['data structures', 'algorithms', 'OOP', 'system design', 'databases', 'networking']
  },
  // Data Structures & Algorithms
  algorithms: {
    books: ['CLRS Introduction to Algorithms', 'Algorithm Design Kleinberg Tardos', 'Competitive Programming 3'],
    concepts: ['sorting', 'searching', 'dynamic programming', 'graphs', 'trees', 'greedy algorithms']
  },
  // Machine Learning
  machinelearning: {
    books: ['Hands-On ML Aurélien Géron', 'Pattern Recognition Bishop', 'Deep Learning Goodfellow'],
    concepts: ['supervised learning', 'unsupervised learning', 'neural networks', 'optimization', 'regularization']
  },
  // General Knowledge
  gk: {
    books: ['Lucent GK', 'Arihant GK', 'Manorama Yearbook', 'India Year Book'],
    concepts: ['current affairs', 'static GK', 'awards', 'sports', 'science', 'geography']
  }
};

function getBookContext(topic: string, subject?: string, examType?: string): { books: string[]; concepts: string[] } {
  const searchTerms = [topic, subject, examType]
    .filter(Boolean)
    .map(s => s!.toLowerCase().replace(/[^a-z]/g, ''));
  
  for (const term of searchTerms) {
    for (const [key, value] of Object.entries(bookReferences)) {
      if (term.includes(key) || key.includes(term)) {
        return value;
      }
    }
  }
  
  // Default general books
  return {
    books: ['NCERT', 'Lucent GK', 'RS Aggarwal'],
    concepts: ['fundamentals', 'applications', 'problem-solving']
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, subject, unit, examType, category } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    console.log(`Generating premium content for: ${topic} - ${subject} - ${unit}`);
    
    const bookContext = getBookContext(topic, subject, examType);
    console.log('Using book references:', bookContext.books);

    const systemPrompt = `You are an elite educational content creator with DEEP expertise in Indian competitive exams and academic subjects. You create content that matches the quality of premium textbooks like ${bookContext.books.slice(0, 3).join(', ')}.

Your content must be:
1. COMPREHENSIVE - Cover every aspect thoroughly like a textbook chapter
2. VISUAL - Include flowcharts, diagrams, mind maps for concept visualization
3. PRACTICAL - Real exam questions with step-by-step solutions
4. MEMORABLE - Mnemonics, shortcuts, tricks that students actually use

CRITICAL: You MUST output ONLY valid JSON. No markdown, no extra text.

JSON SCHEMA:
{
  "title": "Topic Title",
  "introduction": "Engaging 4-5 sentence introduction explaining topic importance and exam relevance",
  "conceptMap": {
    "title": "Concept Map: Topic Name",
    "nodes": [
      {"id": "1", "label": "Main Concept", "type": "main"},
      {"id": "2", "label": "Sub Concept 1", "type": "sub", "parent": "1"},
      {"id": "3", "label": "Sub Concept 2", "type": "sub", "parent": "1"}
    ]
  },
  "sections": [
    {
      "heading": "Section Title",
      "content": "Detailed explanation (300+ words) with clear explanations like a textbook",
      "keyPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
      "diagram": {
        "type": "flowchart|process|hierarchy|comparison|cycle",
        "title": "Diagram Title",
        "steps": [
          {"id": "1", "text": "Step/Node 1", "next": ["2"]},
          {"id": "2", "text": "Step/Node 2", "next": ["3"]},
          {"id": "3", "text": "Step/Node 3", "next": []}
        ]
      },
      "examples": [
        {
          "title": "Example Title",
          "problem": "Detailed problem exactly as it appears in exams",
          "approach": "Step-by-step thinking process",
          "solution": "Complete detailed solution with all steps shown",
          "answer": "Final answer with units",
          "shortcut": "Quick trick if applicable"
        }
      ],
      "commonMistakes": ["Mistake 1 to avoid", "Mistake 2 to avoid"]
    }
  ],
  "formulas": [
    {
      "name": "Formula Name",
      "expression": "Mathematical expression",
      "description": "When and how to use",
      "derivation": "Brief derivation or proof",
      "example": "Quick application example"
    }
  ],
  "comparisonTable": {
    "title": "Comparison Table Title",
    "headers": ["Aspect", "Type A", "Type B"],
    "rows": [
      ["Feature 1", "Value A1", "Value B1"],
      ["Feature 2", "Value A2", "Value B2"]
    ]
  },
  "mnemonics": [
    {
      "topic": "What it helps remember",
      "mnemonic": "The memory trick",
      "expansion": "What each letter/word means"
    }
  ],
  "summary": "Comprehensive 5-6 sentence summary covering all key takeaways",
  "quickRevision": ["Quick point 1", "Quick point 2", "Quick point 3", "Quick point 4", "Quick point 5"],
  "practiceQuestions": [
    {
      "question": "Question text exactly as in exams",
      "options": {"A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D"},
      "correctAnswer": "A",
      "explanation": "Detailed explanation with WHY correct and WHY others wrong",
      "difficulty": "easy|medium|hard",
      "examSource": "SSC CGL 2023/IBPS PO/JEE Main etc."
    }
  ],
  "previousYearQuestions": [
    {
      "year": "2023",
      "exam": "Exam Name",
      "question": "Actual previous year question",
      "answer": "Answer with brief explanation"
    }
  ],
  "relatedTopics": ["Related Topic 1", "Related Topic 2", "Related Topic 3"],
  "studyTips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
  "examInsights": "Analysis of how this topic appears in exams, weightage, question patterns"
}`;

    const userPrompt = `Create PREMIUM, TEXTBOOK-QUALITY content for: "${topic}"
Subject: "${subject || 'General'}"
Unit: "${unit || 'Fundamentals'}"
Target Exam: "${examType || 'Competitive Exams'}"
Category: "${category || 'Academics'}"

Reference Books to match quality of: ${bookContext.books.join(', ')}
Key concepts to cover: ${bookContext.concepts.join(', ')}

MANDATORY REQUIREMENTS:
1. Create 4-5 detailed sections with 300+ words each
2. Include at least 1 flowchart/diagram per section
3. Add 15-20 practice MCQs (5 easy, 8 medium, 5 hard)
4. Include 5+ worked examples with COMPLETE step-by-step solutions
5. Add comparison tables where applicable
6. Include 3-5 mnemonics or memory tricks
7. Add previous year question analysis
8. Create a comprehensive concept map
9. Make content exam-focused and practical

The content should be thorough enough that a student can master this topic completely.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt + "\n\n" + userPrompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 16384,
            responseMimeType: "application/json"
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    console.log('Raw response length:', content.length);

    let parsedContent;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]).trim() : content.trim();
      parsedContent = JSON.parse(jsonString);
      
      // Add metadata
      parsedContent.bookReferences = bookContext.books;
      parsedContent.generatedAt = new Date().toISOString();
      
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return a structured fallback
      parsedContent = createFallbackContent(topic, subject, examType, bookContext);
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function createFallbackContent(topic: string, subject?: string, examType?: string, bookContext?: { books: string[], concepts: string[] }) {
  return {
    title: topic,
    introduction: `${topic} is a crucial concept in ${subject || 'this subject'} that frequently appears in ${examType || 'competitive exams'}. Understanding this topic thoroughly will give you a significant advantage in your preparation.`,
    conceptMap: {
      title: `Concept Map: ${topic}`,
      nodes: [
        { id: "1", label: topic, type: "main" },
        { id: "2", label: "Fundamentals", type: "sub", parent: "1" },
        { id: "3", label: "Applications", type: "sub", parent: "1" },
        { id: "4", label: "Problem Solving", type: "sub", parent: "1" }
      ]
    },
    sections: [
      {
        heading: `Introduction to ${topic}`,
        content: `${topic} is a foundational concept that forms the basis for understanding more advanced topics. It has both theoretical and practical applications that are tested in various examinations.`,
        keyPoints: [
          `Core concept in ${subject || 'this field'}`,
          "Important for competitive exams",
          "Has real-world applications",
          "Builds foundation for advanced topics",
          "Frequently asked in interviews"
        ],
        diagram: {
          type: "flowchart",
          title: "Learning Path",
          steps: [
            { id: "1", text: "Understand Basics", next: ["2"] },
            { id: "2", text: "Learn Formulas", next: ["3"] },
            { id: "3", text: "Practice Problems", next: ["4"] },
            { id: "4", text: "Master Topic", next: [] }
          ]
        },
        examples: [],
        commonMistakes: ["Skipping fundamentals", "Not practicing enough"]
      }
    ],
    formulas: [],
    summary: `${topic} is essential for success in ${examType || 'competitive exams'}. Focus on understanding the core concepts, practice regularly, and use the tricks and shortcuts provided.`,
    quickRevision: [
      "Master the basics first",
      "Practice daily",
      "Review formulas regularly",
      "Solve previous year papers",
      "Focus on weak areas"
    ],
    practiceQuestions: [],
    studyTips: [
      "Start with NCERT for conceptual clarity",
      "Practice from standard books",
      "Solve previous year questions",
      "Make concise notes",
      "Regular revision is key"
    ],
    bookReferences: bookContext?.books || ['NCERT'],
    relatedTopics: []
  };
}