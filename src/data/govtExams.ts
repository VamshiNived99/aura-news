export interface ExamTopic {
  id: string;
  name: string;
  subtopics: string[];
}

export interface ExamSubject {
  subject: string;
  topics: ExamTopic[];
}

export interface MockQuestion {
  id: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GovtExamData {
  id: string;
  name: string;
  category: string;
  icon: string;
  overview: string;
  eligibility: string;
  ageLimit: string;
  selectionProcess: string[];
  importantDates: { event: string; date: string }[];
  syllabus: ExamSubject[];
  previousPapers: { year: string; pdfUrl: string }[];
  mockTests: {
    id: string;
    title: string;
    questions: MockQuestion[];
    duration: number;
  }[];
}

export const govtExams: GovtExamData[] = [
  {
    id: 'upsc-civil',
    name: 'UPSC Civil Services',
    category: 'Central Government',
    icon: '🏛️',
    overview: 'The Union Public Service Commission (UPSC) Civil Services Examination (CSE) is a nationwide competitive examination in India conducted by UPSC for recruitment to various Civil Services of the Government of India including IAS, IPS, IFS, etc.',
    eligibility: "Bachelor's degree from a recognized university in any discipline",
    ageLimit: '21-32 years (OBC: 35, SC/ST: 37, PWD: 42)',
    selectionProcess: [
      'Preliminary Examination (Objective Type) - 400 marks',
      'Main Examination (Written) - 1750 marks',
      'Personality Test (Interview) - 275 marks'
    ],
    importantDates: [
      { event: 'Notification', date: 'February' },
      { event: 'Prelims Exam', date: 'May-June' },
      { event: 'Mains Exam', date: 'September-October' },
      { event: 'Interview', date: 'February-March' }
    ],
    syllabus: [
      {
        subject: 'General Studies Paper I (Prelims)',
        topics: [
          {
            id: 'gs1-history',
            name: 'History of India',
            subtopics: ['Ancient India', 'Medieval India', 'Modern India', 'Indian National Movement', 'Art and Culture', 'World History']
          },
          {
            id: 'gs1-geography',
            name: 'Geography',
            subtopics: ['Physical Geography', 'Indian Geography', 'World Geography', 'Environment and Ecology', 'Climate Change', 'Biodiversity']
          },
          {
            id: 'gs1-polity',
            name: 'Indian Polity',
            subtopics: ['Constitution of India', 'Parliament', 'Judiciary', 'State Governments', 'Local Governance', 'Constitutional Bodies']
          },
          {
            id: 'gs1-economy',
            name: 'Indian Economy',
            subtopics: ['Economic Development', 'Planning', 'Poverty and Unemployment', 'Banking and Finance', 'International Trade', 'Budget and Taxation']
          },
          {
            id: 'gs1-science',
            name: 'General Science',
            subtopics: ['Physics Concepts', 'Chemistry Basics', 'Biology', 'Space Technology', 'Nuclear Technology', 'IT and Computers']
          },
          {
            id: 'gs1-current',
            name: 'Current Affairs',
            subtopics: ['National Events', 'International Events', 'Sports', 'Awards', 'Appointments', 'Government Schemes']
          }
        ]
      },
      {
        subject: 'CSAT (Paper II)',
        topics: [
          {
            id: 'csat-comprehension',
            name: 'Comprehension',
            subtopics: ['Reading Passages', 'Inference', 'Vocabulary in Context', 'Critical Analysis']
          },
          {
            id: 'csat-reasoning',
            name: 'Logical Reasoning',
            subtopics: ['Analytical Reasoning', 'Syllogism', 'Statement and Conclusions', 'Puzzles']
          },
          {
            id: 'csat-math',
            name: 'Basic Numeracy',
            subtopics: ['Number System', 'Percentages', 'Ratio and Proportion', 'Time and Work', 'Profit and Loss', 'Data Interpretation']
          },
          {
            id: 'csat-decision',
            name: 'Decision Making',
            subtopics: ['Problem Solving', 'Data Sufficiency', 'Situational Analysis']
          }
        ]
      }
    ],
    previousPapers: [],
    mockTests: [
      {
        id: 'upsc-mock-1',
        title: 'UPSC Prelims Mock Test 1',
        duration: 120,
        questions: [
          {
            id: 'q1',
            question: 'Which of the following is NOT a fundamental right under the Indian Constitution?',
            options: { A: 'Right to Equality', B: 'Right to Property', C: 'Right to Freedom', D: 'Right against Exploitation' },
            correctAnswer: 'B',
            explanation: 'Right to Property was removed from fundamental rights by the 44th Amendment Act, 1978.',
            difficulty: 'easy'
          },
          {
            id: 'q2',
            question: 'The first Indian satellite was launched in:',
            options: { A: '1969', B: '1972', C: '1975', D: '1980' },
            correctAnswer: 'C',
            explanation: 'Aryabhata, India\'s first satellite, was launched on April 19, 1975.',
            difficulty: 'easy'
          },
          {
            id: 'q3',
            question: 'Which Article of the Constitution deals with the procedure for amendment?',
            options: { A: 'Article 356', B: 'Article 368', C: 'Article 370', D: 'Article 352' },
            correctAnswer: 'B',
            explanation: 'Article 368 provides the procedure for amendment of the Constitution.',
            difficulty: 'medium'
          }
        ]
      }
    ]
  },
  {
    id: 'ssc-cgl',
    name: 'SSC CGL',
    category: 'Central Government',
    icon: '📋',
    overview: 'Staff Selection Commission Combined Graduate Level Examination (SSC CGL) is conducted for recruitment to various Group B and Group C posts in Ministries, Departments and Organizations of the Government of India.',
    eligibility: "Bachelor's degree from a recognized university",
    ageLimit: '18-32 years (varies for different posts)',
    selectionProcess: [
      'Tier I - Computer Based Examination (200 marks)',
      'Tier II - Computer Based Examination (390 marks)',
      'Document Verification'
    ],
    importantDates: [
      { event: 'Notification', date: 'April' },
      { event: 'Tier I Exam', date: 'July-August' },
      { event: 'Tier II Exam', date: 'October-November' }
    ],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: [
          {
            id: 'ssc-quant-arithmetic',
            name: 'Arithmetic',
            subtopics: ['Number System', 'HCF and LCM', 'Ratio and Proportion', 'Percentages', 'Average', 'Profit and Loss', 'Simple Interest', 'Compound Interest', 'Time and Work', 'Time Speed Distance', 'Mixture and Alligation']
          },
          {
            id: 'ssc-quant-algebra',
            name: 'Algebra',
            subtopics: ['Basic Algebra', 'Linear Equations', 'Quadratic Equations', 'Surds and Indices']
          },
          {
            id: 'ssc-quant-geometry',
            name: 'Geometry',
            subtopics: ['Lines and Angles', 'Triangles', 'Circles', 'Quadrilaterals', 'Polygons']
          },
          {
            id: 'ssc-quant-mensuration',
            name: 'Mensuration',
            subtopics: ['2D Figures', '3D Figures', 'Surface Area', 'Volume']
          },
          {
            id: 'ssc-quant-trig',
            name: 'Trigonometry',
            subtopics: ['Trigonometric Ratios', 'Heights and Distances', 'Identities']
          },
          {
            id: 'ssc-quant-di',
            name: 'Data Interpretation',
            subtopics: ['Tables', 'Bar Graphs', 'Line Graphs', 'Pie Charts', 'Mixed Graphs']
          }
        ]
      },
      {
        subject: 'Reasoning',
        topics: [
          {
            id: 'ssc-reasoning-verbal',
            name: 'Verbal Reasoning',
            subtopics: ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Ranking']
          },
          {
            id: 'ssc-reasoning-nonverbal',
            name: 'Non-Verbal Reasoning',
            subtopics: ['Figure Series', 'Pattern Completion', 'Mirror Image', 'Paper Folding', 'Embedded Figures']
          },
          {
            id: 'ssc-reasoning-logical',
            name: 'Logical Reasoning',
            subtopics: ['Syllogism', 'Statement Conclusions', 'Venn Diagrams', 'Inequalities']
          }
        ]
      },
      {
        subject: 'English',
        topics: [
          {
            id: 'ssc-english-vocab',
            name: 'Vocabulary',
            subtopics: ['Synonyms', 'Antonyms', 'One Word Substitution', 'Idioms and Phrases', 'Spelling Errors']
          },
          {
            id: 'ssc-english-grammar',
            name: 'Grammar',
            subtopics: ['Tenses', 'Voice', 'Narration', 'Subject-Verb Agreement', 'Articles', 'Prepositions', 'Error Detection']
          },
          {
            id: 'ssc-english-comprehension',
            name: 'Comprehension',
            subtopics: ['Reading Passages', 'Cloze Test', 'Para Jumbles', 'Fill in the Blanks']
          }
        ]
      },
      {
        subject: 'General Awareness',
        topics: [
          {
            id: 'ssc-ga-static',
            name: 'Static GK',
            subtopics: ['History', 'Geography', 'Polity', 'Economy', 'Science', 'Art and Culture']
          },
          {
            id: 'ssc-ga-current',
            name: 'Current Affairs',
            subtopics: ['National', 'International', 'Sports', 'Awards', 'Appointments']
          }
        ]
      }
    ],
    previousPapers: [],
    mockTests: []
  },
  {
    id: 'ibps-po',
    name: 'IBPS PO',
    category: 'Banking',
    icon: '🏦',
    overview: 'IBPS PO (Probationary Officer) is conducted by IBPS for recruitment of Probationary Officers in participating public sector banks.',
    eligibility: "Bachelor's degree in any discipline from a recognized university",
    ageLimit: '20-30 years',
    selectionProcess: [
      'Preliminary Examination (100 marks)',
      'Main Examination (200 marks)',
      'Interview'
    ],
    importantDates: [
      { event: 'Notification', date: 'August' },
      { event: 'Prelims', date: 'October' },
      { event: 'Mains', date: 'November' }
    ],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: [
          {
            id: 'ibps-quant-simplification',
            name: 'Simplification',
            subtopics: ['BODMAS', 'Approximation', 'Number Series', 'Quadratic Equations']
          },
          {
            id: 'ibps-quant-arithmetic',
            name: 'Arithmetic',
            subtopics: ['Percentage', 'Ratio and Proportion', 'Average', 'Profit and Loss', 'Simple and Compound Interest', 'Time and Work', 'Time Speed Distance', 'Partnership', 'Mixtures']
          },
          {
            id: 'ibps-quant-di',
            name: 'Data Interpretation',
            subtopics: ['Tables', 'Bar Graphs', 'Line Graphs', 'Pie Charts', 'Radar Graphs', 'Caselets']
          },
          {
            id: 'ibps-quant-da',
            name: 'Data Analysis',
            subtopics: ['Data Sufficiency', 'Probability', 'Permutation Combination']
          }
        ]
      },
      {
        subject: 'Reasoning Ability',
        topics: [
          {
            id: 'ibps-reasoning-puzzles',
            name: 'Puzzles',
            subtopics: ['Linear Arrangement', 'Circular Arrangement', 'Floor Based', 'Scheduling', 'Box Based', 'Multi-Variable']
          },
          {
            id: 'ibps-reasoning-syllogism',
            name: 'Syllogism',
            subtopics: ['Basic Syllogism', 'Possibility', 'Coded Syllogism', 'Reverse Syllogism']
          },
          {
            id: 'ibps-reasoning-inequality',
            name: 'Inequality',
            subtopics: ['Direct Inequality', 'Coded Inequality', 'Quantity Comparison']
          },
          {
            id: 'ibps-reasoning-coding',
            name: 'Coding-Decoding',
            subtopics: ['Letter Coding', 'Number Coding', 'Sentence Coding', 'Symbol Coding']
          },
          {
            id: 'ibps-reasoning-blood',
            name: 'Blood Relations',
            subtopics: ['Direct Questions', 'Coded Blood Relations', 'Family Tree']
          },
          {
            id: 'ibps-reasoning-direction',
            name: 'Direction Sense',
            subtopics: ['Direction Problems', 'Shadow Based', 'Distance Calculation']
          },
          {
            id: 'ibps-reasoning-io',
            name: 'Input-Output',
            subtopics: ['Word Rearrangement', 'Number Rearrangement', 'Mixed I/O']
          }
        ]
      },
      {
        subject: 'English Language',
        topics: [
          {
            id: 'ibps-english-rc',
            name: 'Reading Comprehension',
            subtopics: ['Passages', 'Inference', 'Vocabulary in Context', 'Theme Detection']
          },
          {
            id: 'ibps-english-cloze',
            name: 'Cloze Test',
            subtopics: ['Grammar Based', 'Vocabulary Based', 'New Pattern Cloze']
          },
          {
            id: 'ibps-english-error',
            name: 'Error Detection',
            subtopics: ['Grammatical Errors', 'Phrase Replacement', 'Sentence Correction']
          },
          {
            id: 'ibps-english-jumbles',
            name: 'Para Jumbles',
            subtopics: ['Sentence Rearrangement', 'New Pattern PJ']
          }
        ]
      }
    ],
    previousPapers: [],
    mockTests: []
  },
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC',
    category: 'Railways',
    icon: '🚂',
    overview: 'RRB NTPC (Non-Technical Popular Categories) is conducted by Railway Recruitment Boards for various non-technical posts in Indian Railways.',
    eligibility: 'Graduate or 12th pass depending on the post',
    ageLimit: '18-33 years',
    selectionProcess: [
      'CBT Stage 1 (100 marks)',
      'CBT Stage 2 (120 marks)',
      'Typing/Skill Test',
      'Document Verification'
    ],
    importantDates: [
      { event: 'Notification', date: 'Varies' },
      { event: 'CBT 1', date: 'As per notification' },
      { event: 'CBT 2', date: '2-3 months after CBT 1' }
    ],
    syllabus: [
      {
        subject: 'General Awareness',
        topics: [
          {
            id: 'rrb-ga-history',
            name: 'History',
            subtopics: ['Ancient India', 'Medieval India', 'Modern India', 'Freedom Movement', 'World History']
          },
          {
            id: 'rrb-ga-geography',
            name: 'Geography',
            subtopics: ['Physical Geography', 'Indian Geography', 'World Geography', 'Environment']
          },
          {
            id: 'rrb-ga-polity',
            name: 'Polity',
            subtopics: ['Constitution', 'Government Structure', 'Elections', 'Local Bodies']
          },
          {
            id: 'rrb-ga-economy',
            name: 'Economy',
            subtopics: ['Indian Economy', 'Banking', 'Budget', 'International Organizations']
          },
          {
            id: 'rrb-ga-science',
            name: 'Science',
            subtopics: ['Physics', 'Chemistry', 'Biology', 'Space Science', 'Inventions']
          },
          {
            id: 'rrb-ga-current',
            name: 'Current Affairs',
            subtopics: ['National', 'International', 'Sports', 'Awards', 'Books and Authors']
          }
        ]
      },
      {
        subject: 'Mathematics',
        topics: [
          {
            id: 'rrb-math-number',
            name: 'Number System',
            subtopics: ['Types of Numbers', 'Divisibility', 'HCF LCM', 'Factors', 'Remainders']
          },
          {
            id: 'rrb-math-arithmetic',
            name: 'Arithmetic',
            subtopics: ['Percentage', 'Ratio Proportion', 'Average', 'Profit Loss', 'Interest', 'Time and Work', 'Speed Distance']
          },
          {
            id: 'rrb-math-algebra',
            name: 'Algebra',
            subtopics: ['Equations', 'Inequalities', 'Surds', 'Indices']
          },
          {
            id: 'rrb-math-geometry',
            name: 'Geometry',
            subtopics: ['Lines Angles', 'Triangles', 'Circles', 'Quadrilaterals']
          },
          {
            id: 'rrb-math-mensuration',
            name: 'Mensuration',
            subtopics: ['Area', 'Perimeter', 'Volume', 'Surface Area']
          }
        ]
      },
      {
        subject: 'Reasoning',
        topics: [
          {
            id: 'rrb-reasoning-analogy',
            name: 'Analogy',
            subtopics: ['Word Analogy', 'Number Analogy', 'Letter Analogy']
          },
          {
            id: 'rrb-reasoning-series',
            name: 'Series',
            subtopics: ['Number Series', 'Letter Series', 'Mixed Series']
          },
          {
            id: 'rrb-reasoning-coding',
            name: 'Coding-Decoding',
            subtopics: ['Letter Coding', 'Number Coding', 'Symbol Coding']
          },
          {
            id: 'rrb-reasoning-puzzles',
            name: 'Puzzles',
            subtopics: ['Arrangement', 'Scheduling', 'Comparison']
          },
          {
            id: 'rrb-reasoning-blood',
            name: 'Blood Relations',
            subtopics: ['Direct', 'Coded', 'Family Tree']
          },
          {
            id: 'rrb-reasoning-direction',
            name: 'Direction Sense',
            subtopics: ['Direction', 'Shadow', 'Distance']
          }
        ]
      }
    ],
    previousPapers: [],
    mockTests: []
  },
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL',
    category: 'Central Government',
    icon: '📝',
    overview: 'SSC CHSL (Combined Higher Secondary Level) is for 12th pass candidates for LDC, DEO, PA/SA posts in various central government offices.',
    eligibility: '12th pass from a recognized board',
    ageLimit: '18-27 years',
    selectionProcess: [
      'Tier I - Computer Based (200 marks)',
      'Tier II - Descriptive Paper (100 marks)',
      'Tier III - Skill Test/Typing Test'
    ],
    importantDates: [
      { event: 'Notification', date: 'December-January' },
      { event: 'Tier I', date: 'March-April' },
      { event: 'Tier II', date: 'As per result' }
    ],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: [
          {
            id: 'chsl-quant-arithmetic',
            name: 'Arithmetic',
            subtopics: ['Number System', 'Ratio Proportion', 'Percentage', 'Average', 'Profit Loss', 'Interest', 'Time Work', 'Time Speed Distance']
          },
          {
            id: 'chsl-quant-algebra',
            name: 'Algebra',
            subtopics: ['Basic Algebra', 'Linear Equations', 'Quadratic Equations']
          },
          {
            id: 'chsl-quant-geometry',
            name: 'Geometry',
            subtopics: ['Lines Angles', 'Triangles', 'Circles', 'Quadrilaterals']
          },
          {
            id: 'chsl-quant-mensuration',
            name: 'Mensuration',
            subtopics: ['2D Areas', '3D Volumes']
          },
          {
            id: 'chsl-quant-trig',
            name: 'Trigonometry',
            subtopics: ['Ratios', 'Heights Distances', 'Identities']
          }
        ]
      },
      {
        subject: 'Reasoning',
        topics: [
          {
            id: 'chsl-reasoning-verbal',
            name: 'Verbal',
            subtopics: ['Analogy', 'Classification', 'Series', 'Coding', 'Blood Relations', 'Direction']
          },
          {
            id: 'chsl-reasoning-nonverbal',
            name: 'Non-Verbal',
            subtopics: ['Figure Series', 'Mirror Image', 'Paper Folding', 'Embedded Figures']
          }
        ]
      },
      {
        subject: 'English',
        topics: [
          {
            id: 'chsl-english-vocab',
            name: 'Vocabulary',
            subtopics: ['Synonyms', 'Antonyms', 'One Word', 'Idioms', 'Spelling']
          },
          {
            id: 'chsl-english-grammar',
            name: 'Grammar',
            subtopics: ['Tenses', 'Voice', 'Narration', 'Error Detection', 'Sentence Improvement']
          },
          {
            id: 'chsl-english-comprehension',
            name: 'Comprehension',
            subtopics: ['Passages', 'Cloze Test']
          }
        ]
      },
      {
        subject: 'General Awareness',
        topics: [
          {
            id: 'chsl-ga-static',
            name: 'Static GK',
            subtopics: ['History', 'Geography', 'Polity', 'Economy', 'Science']
          },
          {
            id: 'chsl-ga-current',
            name: 'Current Affairs',
            subtopics: ['National', 'International', 'Sports', 'Awards']
          }
        ]
      }
    ],
    previousPapers: [],
    mockTests: []
  },
  {
    id: 'sbi-po',
    name: 'SBI PO',
    category: 'Banking',
    icon: '🏛️',
    overview: 'SBI PO is conducted by State Bank of India for recruitment of Probationary Officers.',
    eligibility: "Bachelor's degree from a recognized university",
    ageLimit: '21-30 years',
    selectionProcess: [
      'Preliminary Exam',
      'Main Exam',
      'Group Exercise & Interview'
    ],
    importantDates: [
      { event: 'Notification', date: 'April-May' },
      { event: 'Prelims', date: 'November' },
      { event: 'Mains', date: 'December' }
    ],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: [
          {
            id: 'sbi-quant-simplification',
            name: 'Simplification',
            subtopics: ['BODMAS', 'Approximation', 'Number Series', 'Quadratic Equations', 'Wrong Number']
          },
          {
            id: 'sbi-quant-arithmetic',
            name: 'Arithmetic',
            subtopics: ['Percentage', 'Ratio', 'Profit Loss', 'Interest', 'Time Work', 'Speed Distance', 'Partnership', 'Mixtures']
          },
          {
            id: 'sbi-quant-di',
            name: 'Data Interpretation',
            subtopics: ['Tables', 'Graphs', 'Charts', 'Caselets', 'Missing DI']
          },
          {
            id: 'sbi-quant-da',
            name: 'Data Analysis',
            subtopics: ['Data Sufficiency', 'Probability', 'Permutation Combination', 'Quantity Comparison']
          }
        ]
      },
      {
        subject: 'Reasoning',
        topics: [
          {
            id: 'sbi-reasoning-puzzles',
            name: 'Puzzles',
            subtopics: ['Linear', 'Circular', 'Floor', 'Scheduling', 'Box', 'Multi-Variable']
          },
          {
            id: 'sbi-reasoning-logical',
            name: 'Logical Reasoning',
            subtopics: ['Syllogism', 'Inequality', 'Coding-Decoding', 'Blood Relations', 'Direction', 'Input-Output']
          },
          {
            id: 'sbi-reasoning-verbal',
            name: 'Verbal Reasoning',
            subtopics: ['Critical Reasoning', 'Course of Action', 'Statement Assumptions']
          },
          {
            id: 'sbi-reasoning-machine',
            name: 'Machine Input-Output',
            subtopics: ['Word Rearrangement', 'Number Operations', 'Mixed Patterns']
          }
        ]
      },
      {
        subject: 'English',
        topics: [
          {
            id: 'sbi-english-rc',
            name: 'Reading Comprehension',
            subtopics: ['Passages', 'Vocabulary Based', 'Inference', 'Theme']
          },
          {
            id: 'sbi-english-verbal',
            name: 'Verbal Ability',
            subtopics: ['Error Detection', 'Sentence Improvement', 'Fill in Blanks', 'Cloze Test']
          },
          {
            id: 'sbi-english-para',
            name: 'Para Formation',
            subtopics: ['Para Jumbles', 'Sentence Starters', 'Odd One Out']
          }
        ]
      }
    ],
    previousPapers: [],
    mockTests: []
  }
];
