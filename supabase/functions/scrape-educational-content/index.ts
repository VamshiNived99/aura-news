import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContentSection {
  heading: string;
  content: string;
  keyPoints: string[];
}

interface ScrapedContent {
  title: string;
  introduction: string;
  sections: ContentSection[];
  formulas?: { name: string; formula: string; explanation: string }[];
  summary: string;
  tips: string[];
  practiceQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  sources: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, subject, examType, category } = await req.json();

    if (!topic) {
      return new Response(
        JSON.stringify({ success: false, error: 'Topic is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build search query for educational content
    const searchQuery = buildSearchQuery(topic, subject, examType, category);
    console.log('Searching for:', searchQuery);

    // Search for educational content
    const searchResponse = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 5,
        scrapeOptions: {
          formats: ['markdown'],
          onlyMainContent: true,
        },
      }),
    });

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error('Firecrawl search error:', errorData);
      throw new Error(errorData.error || 'Search failed');
    }

    const searchData = await searchResponse.json();
    console.log('Search results:', searchData.data?.length || 0, 'results');

    // Process and structure the scraped content
    const processedContent = await processScrapedContent(
      searchData.data || [],
      topic,
      subject,
      examType
    );

    return new Response(
      JSON.stringify({ success: true, data: processedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error scraping content:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to scrape content' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Book sources mapping for different categories
const bookSources: Record<string, string[]> = {
  // NCERT & Board Exams
  science: ['NCERT Science', 'Lakhmir Singh', 'Pradeep Physics'],
  physics: ['HC Verma Concepts of Physics', 'NCERT Physics', 'Resnick Halliday'],
  chemistry: ['NCERT Chemistry', 'OP Tandon', 'Morrison Boyd Organic Chemistry', 'JD Lee Inorganic'],
  biology: ['NCERT Biology', 'Trueman Biology', 'Pradeep Biology'],
  mathematics: ['NCERT Mathematics', 'RD Sharma', 'RS Aggarwal', 'Cengage Mathematics'],
  
  // Government Exams
  polity: ['M Laxmikant Indian Polity', 'DD Basu Constitution', 'NCERT Political Science'],
  economy: ['Ramesh Singh Indian Economy', 'Sankarganesh Karuppiah', 'NCERT Economics'],
  history: ['Bipan Chandra', 'RS Sharma Ancient India', 'Satish Chandra Medieval India', 'Spectrum Modern History'],
  geography: ['NCERT Geography', 'Majid Husain Geography', 'GC Leong'],
  gk: ['Lucent General Knowledge', 'Arihant General Knowledge', 'Manorama Yearbook'],
  reasoning: ['RS Aggarwal Reasoning', 'MK Pandey Analytical Reasoning', 'Arihant Reasoning'],
  aptitude: ['RS Aggarwal Quantitative Aptitude', 'Arun Sharma Quantitative Aptitude', 'Abhijit Guha'],
  english: ['Wren Martin English Grammar', 'Norman Lewis Word Power', 'SP Bakshi English'],
  
  // Competitive Exams
  jee: ['HC Verma', 'Cengage', 'DC Pandey', 'Irodov', 'NCERT'],
  neet: ['NCERT Biology', 'Trueman', 'MTG', 'Pradeep'],
  gate: ['Made Easy GATE', 'ACE Academy', 'Cormen Algorithms', 'Galvin OS'],
  cat: ['Arun Sharma CAT', 'TIME Study Material', 'IMS CAT'],
  upsc: ['Laxmikant', 'Ramesh Singh', 'Bipan Chandra', 'Spectrum'],
  
  // Programming & CS
  programming: ['Cracking Coding Interview', 'CLRS Algorithms', 'Clean Code Robert Martin'],
  algorithms: ['CLRS Introduction to Algorithms', 'Algorithm Design Kleinberg', 'Competitive Programming'],
  datastructures: ['Narasimha Karumanchi', 'CLRS', 'Cormen'],
  python: ['Python Crash Course', 'Automate Boring Stuff Python', 'Fluent Python'],
  java: ['Effective Java Joshua Bloch', 'Head First Java', 'Java Complete Reference'],
  systemdesign: ['System Design Interview Alex Xu', 'Designing Data Intensive Applications'],
  
  // AI/ML
  machinelearning: ['Hands On Machine Learning Geron', 'Pattern Recognition Bishop', 'ESL Hastie'],
  deeplearning: ['Deep Learning Goodfellow', 'Deep Learning with Python Chollet'],
  datascience: ['Data Science from Scratch Joel Grus', 'Python for Data Analysis'],
};

function getRelevantBooks(topic: string, subject?: string, examType?: string, category?: string): string[] {
  const searchTerms = [topic, subject, examType, category]
    .filter(Boolean)
    .map(s => s!.toLowerCase().replace(/[^a-z]/g, ''));
  
  const relevantBooks: Set<string> = new Set();
  
  for (const term of searchTerms) {
    for (const [key, books] of Object.entries(bookSources)) {
      if (term.includes(key) || key.includes(term)) {
        books.forEach(book => relevantBooks.add(book));
      }
    }
  }
  
  // Add general books if no specific match
  if (relevantBooks.size === 0) {
    ['NCERT', 'RS Aggarwal', 'Lucent'].forEach(book => relevantBooks.add(book));
  }
  
  return Array.from(relevantBooks).slice(0, 5);
}

function buildSearchQuery(topic: string, subject?: string, examType?: string, category?: string): string {
  const parts = [topic];
  
  if (subject) parts.push(subject);
  if (examType) parts.push(examType);
  if (category) parts.push(category);
  
  // Get relevant book sources for this topic
  const books = getRelevantBooks(topic, subject, examType, category);
  const bookQuery = books.length > 0 ? ` (${books.slice(0, 3).join(' OR ')})` : '';
  
  // Add educational context
  parts.push('complete explanation examples solved problems');
  
  // Target quality educational sites + book-specific content
  const qualitySites = [
    'geeksforgeeks.org',
    'tutorialspoint.com',
    'javatpoint.com',
    'programiz.com',
    'khanacademy.org',
    'brilliant.org',
    'mathsisfun.com',
    'byjus.com',
    'vedantu.com',
    'toppr.com',
    'unacademy.com',
    'embibe.com',
    'studyiq.com',
    'indiabix.com',
    'gradeup.co',
    'testbook.com'
  ];
  
  const siteQuery = qualitySites.map(s => `site:${s}`).join(' OR ');
  const query = parts.join(' ') + bookQuery + ' ' + siteQuery;
  
  console.log('Relevant books for query:', books);
  return query;
}

async function processScrapedContent(
  results: any[],
  topic: string,
  subject?: string,
  examType?: string
): Promise<ScrapedContent> {
  const sources: string[] = [];
  let combinedMarkdown = '';

  // Combine content from all sources
  for (const result of results) {
    if (result.markdown) {
      combinedMarkdown += '\n\n' + result.markdown;
      if (result.url) {
        sources.push(result.url);
      }
    }
  }

  // If no content found, return structured placeholder
  if (!combinedMarkdown.trim()) {
    return generateFallbackContent(topic, subject, examType);
  }

  // Parse and structure the content
  const structured = parseMarkdownToStructured(combinedMarkdown, topic, subject);
  structured.sources = sources;

  return structured;
}

function parseMarkdownToStructured(markdown: string, topic: string, subject?: string): ScrapedContent {
  const lines = markdown.split('\n').filter(line => line.trim());
  
  // Extract sections based on headers
  const sections: ContentSection[] = [];
  let currentSection: ContentSection | null = null;
  let introduction = '';
  let foundFirstHeader = false;

  for (const line of lines) {
    // Check for headers
    const headerMatch = line.match(/^#{1,3}\s+(.+)/);
    
    if (headerMatch) {
      if (currentSection) {
        sections.push(currentSection);
      }
      foundFirstHeader = true;
      currentSection = {
        heading: headerMatch[1].trim(),
        content: '',
        keyPoints: [],
      };
    } else if (!foundFirstHeader) {
      // Content before first header is introduction
      if (line.trim() && !line.startsWith('!') && !line.startsWith('[')) {
        introduction += line.trim() + ' ';
      }
    } else if (currentSection) {
      // Add content to current section
      if (line.startsWith('- ') || line.startsWith('* ')) {
        currentSection.keyPoints.push(line.substring(2).trim());
      } else if (line.trim() && !line.startsWith('!') && !line.startsWith('[')) {
        currentSection.content += line.trim() + ' ';
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  // Clean up and limit sections
  const cleanedSections = sections
    .filter(s => s.content.length > 50 || s.keyPoints.length > 0)
    .slice(0, 5)
    .map(s => ({
      ...s,
      content: s.content.trim().substring(0, 1000),
      keyPoints: s.keyPoints.slice(0, 5),
    }));

  // Extract formulas if present
  const formulas = extractFormulas(markdown);

  // Generate practice questions from content
  const practiceQuestions = generateQuestionsFromContent(cleanedSections, topic);

  // Generate summary
  const summary = generateSummary(introduction, cleanedSections, topic);

  // Generate tips
  const tips = generateTips(cleanedSections, topic, subject);

  return {
    title: topic,
    introduction: introduction.trim().substring(0, 500) || `Learn about ${topic}${subject ? ` in ${subject}` : ''}.`,
    sections: cleanedSections.length > 0 ? cleanedSections : [{
      heading: 'Overview',
      content: `${topic} is an important concept${subject ? ` in ${subject}` : ''}. Understanding this topic will help you build a strong foundation.`,
      keyPoints: [`Key concept in ${subject || 'this field'}`, 'Important for exams and practical applications'],
    }],
    formulas,
    summary,
    tips,
    practiceQuestions,
    sources: [],
  };
}

function extractFormulas(markdown: string): { name: string; formula: string; explanation: string }[] {
  const formulas: { name: string; formula: string; explanation: string }[] = [];
  
  // Match LaTeX-style formulas or code blocks with formulas
  const formulaPatterns = [
    /\$\$([^$]+)\$\$/g,
    /\$([^$]+)\$/g,
    /```math\n([^`]+)\n```/g,
  ];

  for (const pattern of formulaPatterns) {
    let match;
    while ((match = pattern.exec(markdown)) !== null) {
      if (match[1] && match[1].length < 200) {
        formulas.push({
          name: `Formula ${formulas.length + 1}`,
          formula: match[1].trim(),
          explanation: 'Key formula for this topic',
        });
      }
    }
  }

  return formulas.slice(0, 5);
}

function generateQuestionsFromContent(
  sections: ContentSection[],
  topic: string
): { question: string; options: string[]; correctAnswer: number; explanation: string }[] {
  const questions: { question: string; options: string[]; correctAnswer: number; explanation: string }[] = [];

  // Generate questions based on key points
  for (const section of sections.slice(0, 3)) {
    if (section.keyPoints.length >= 2) {
      questions.push({
        question: `Which of the following is related to ${section.heading}?`,
        options: [
          section.keyPoints[0],
          'None of the above',
          'Both A and B',
          section.keyPoints[1] || 'All of the above',
        ],
        correctAnswer: 0,
        explanation: `${section.keyPoints[0]} is a key aspect of ${section.heading}.`,
      });
    }
  }

  // Add topic-based question
  questions.push({
    question: `What is the primary focus of ${topic}?`,
    options: [
      `Understanding core concepts of ${topic}`,
      'Unrelated topic A',
      'Unrelated topic B',
      'None of the above',
    ],
    correctAnswer: 0,
    explanation: `${topic} focuses on understanding its core concepts and applications.`,
  });

  return questions.slice(0, 5);
}

function generateSummary(introduction: string, sections: ContentSection[], topic: string): string {
  const keyPoints = sections.flatMap(s => s.keyPoints).slice(0, 3);
  
  if (keyPoints.length > 0) {
    return `${topic} covers important concepts including: ${keyPoints.join(', ')}. Understanding these fundamentals will help in both theoretical and practical applications.`;
  }
  
  return introduction.substring(0, 300) || `${topic} is an essential topic that provides foundational knowledge for advanced concepts.`;
}

function generateTips(sections: ContentSection[], topic: string, subject?: string): string[] {
  return [
    `Focus on understanding the fundamentals of ${topic} before moving to advanced topics`,
    `Practice solving problems related to ${topic} regularly`,
    `Create summary notes with key formulas and concepts`,
    subject ? `Relate ${topic} concepts to other topics in ${subject}` : `Connect ${topic} with real-world applications`,
    `Review past exam questions on ${topic} for better preparation`,
  ];
}

function generateFallbackContent(topic: string, subject?: string, examType?: string): ScrapedContent {
  return {
    title: topic,
    introduction: `${topic} is a fundamental concept${subject ? ` in ${subject}` : ''}${examType ? ` for ${examType} preparation` : ''}. This topic covers essential principles and applications.`,
    sections: [
      {
        heading: 'Introduction',
        content: `${topic} forms the foundation for understanding more advanced concepts. It is widely used in both theoretical and practical applications.`,
        keyPoints: [
          `Core concept in ${subject || 'this field'}`,
          'Important for competitive exams',
          'Has practical real-world applications',
        ],
      },
      {
        heading: 'Key Concepts',
        content: `Understanding ${topic} requires grasping its fundamental principles and how they interconnect with other topics.`,
        keyPoints: [
          'Master the basic definitions first',
          'Understand the underlying theory',
          'Practice with varied examples',
        ],
      },
    ],
    formulas: [],
    summary: `${topic} is essential for building a strong foundation. Focus on understanding concepts thoroughly and practicing regularly.`,
    tips: [
      `Start with basics and gradually move to complex problems`,
      `Create flashcards for quick revision`,
      `Solve previous year questions`,
      `Join study groups for discussion`,
      `Review and revise regularly`,
    ],
    practiceQuestions: [
      {
        question: `What is the fundamental principle of ${topic}?`,
        options: [
          'Understanding core concepts',
          'Memorizing formulas only',
          'Skipping basics',
          'None of the above',
        ],
        correctAnswer: 0,
        explanation: `Understanding core concepts is fundamental to mastering ${topic}.`,
      },
    ],
    sources: [],
  };
}
