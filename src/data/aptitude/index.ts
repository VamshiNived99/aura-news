export interface AptitudeTopic {
  id: string;
  name: string;
  description: string;
  subtopics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface AptitudeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  topics: AptitudeTopic[];
}

export const aptitudeData: AptitudeCategory[] = [
  {
    id: 'quantitative',
    name: 'Quantitative Aptitude',
    description: 'Master numerical and mathematical problem-solving skills',
    icon: '🔢',
    gradient: 'from-blue-500 to-cyan-500',
    topics: [
      {
        id: 'number-system',
        name: 'Number System',
        description: 'Basics of numbers, divisibility, remainders, and number properties',
        difficulty: 'easy',
        icon: '1️⃣',
        subtopics: [
          'Types of Numbers (Natural, Whole, Integers, Rational, Irrational)',
          'Divisibility Rules',
          'Remainder Theorem',
          'HCF and LCM',
          'Factors and Multiples',
          'Unit Digit Calculation',
          'Number of Zeros in Factorial',
          'Prime Numbers and Factorization'
        ]
      },
      {
        id: 'percentages',
        name: 'Percentages',
        description: 'Percentage calculations, conversions, and applications',
        difficulty: 'easy',
        icon: '%',
        subtopics: [
          'Basic Percentage Concepts',
          'Percentage Increase and Decrease',
          'Successive Percentage Changes',
          'Percentage to Fraction Conversion',
          'Finding Original Value',
          'Population Growth Problems',
          'Price Changes and Discounts'
        ]
      },
      {
        id: 'profit-loss',
        name: 'Profit and Loss',
        description: 'Cost price, selling price, profit, loss, and discounts',
        difficulty: 'easy',
        icon: '💰',
        subtopics: [
          'Basic Profit and Loss Concepts',
          'Cost Price and Selling Price',
          'Marked Price and Discount',
          'Successive Discounts',
          'Profit/Loss Percentage',
          'Dishonest Dealings',
          'Partnership Problems'
        ]
      },
      {
        id: 'ratio-proportion',
        name: 'Ratio and Proportion',
        description: 'Ratios, proportions, and their applications',
        difficulty: 'medium',
        icon: '⚖️',
        subtopics: [
          'Basic Ratio Concepts',
          'Comparing Ratios',
          'Direct and Inverse Proportion',
          'Compound Ratio',
          'Dividing in Given Ratio',
          'Mixture and Alligation',
          'Partnership with Ratio'
        ]
      },
      {
        id: 'average',
        name: 'Average',
        description: 'Mean, weighted average, and related problems',
        difficulty: 'easy',
        icon: '📊',
        subtopics: [
          'Basic Average Formula',
          'Average of Consecutive Numbers',
          'Weighted Average',
          'Average Speed',
          'Adding/Removing Elements',
          'Age-based Averages',
          'Cricket/Batting Average'
        ]
      },
      {
        id: 'time-work',
        name: 'Time and Work',
        description: 'Work efficiency, pipes and cisterns, and work allocation',
        difficulty: 'medium',
        icon: '⏰',
        subtopics: [
          'Basic Time and Work Concepts',
          'Work Efficiency',
          'LCM Method',
          'Pipes and Cisterns',
          'Work with Wages',
          'Alternate Days Work',
          'Men-Days Concept'
        ]
      },
      {
        id: 'time-distance',
        name: 'Time, Speed and Distance',
        description: 'Speed calculations, relative motion, and travel problems',
        difficulty: 'medium',
        icon: '🚗',
        subtopics: [
          'Basic Speed-Time-Distance',
          'Average Speed',
          'Relative Speed',
          'Trains Problems',
          'Boats and Streams',
          'Races and Games',
          'Circular Track Problems'
        ]
      },
      {
        id: 'simple-interest',
        name: 'Simple Interest',
        description: 'SI calculations and applications',
        difficulty: 'easy',
        icon: '🏦',
        subtopics: [
          'Basic SI Formula',
          'Finding Principal/Rate/Time',
          'Equal Installments',
          'SI vs Amount',
          'Mixed Problems'
        ]
      },
      {
        id: 'compound-interest',
        name: 'Compound Interest',
        description: 'CI calculations, compounding periods, and comparisons',
        difficulty: 'medium',
        icon: '📈',
        subtopics: [
          'Basic CI Formula',
          'Half-Yearly/Quarterly Compounding',
          'Difference between CI and SI',
          'Population Growth',
          'Depreciation',
          'Finding Rate/Time'
        ]
      },
      {
        id: 'algebra',
        name: 'Algebra',
        description: 'Equations, inequalities, and algebraic expressions',
        difficulty: 'hard',
        icon: 'x²',
        subtopics: [
          'Linear Equations',
          'Quadratic Equations',
          'Inequalities',
          'Surds and Indices',
          'Logarithms',
          'Polynomials',
          'Sequence and Series'
        ]
      },
      {
        id: 'geometry',
        name: 'Geometry',
        description: 'Lines, angles, triangles, circles, and coordinate geometry',
        difficulty: 'hard',
        icon: '📐',
        subtopics: [
          'Lines and Angles',
          'Triangles and Properties',
          'Circles and Theorems',
          'Quadrilaterals',
          'Polygons',
          'Coordinate Geometry',
          'Trigonometry Basics'
        ]
      },
      {
        id: 'mensuration',
        name: 'Mensuration',
        description: 'Area, perimeter, volume, and surface area calculations',
        difficulty: 'medium',
        icon: '📏',
        subtopics: [
          'Area of 2D Shapes',
          'Perimeter Calculations',
          'Volume of 3D Solids',
          'Surface Area',
          'Combination of Figures',
          'Path and Borders'
        ]
      },
      {
        id: 'permutation-combination',
        name: 'Permutation & Combination',
        description: 'Arrangements, selections, and probability',
        difficulty: 'hard',
        icon: '🎲',
        subtopics: [
          'Factorial Notation',
          'Permutation Basics',
          'Combination Basics',
          'Circular Arrangements',
          'Selection with Conditions',
          'Basic Probability',
          'Expected Value'
        ]
      },
      {
        id: 'data-interpretation',
        name: 'Data Interpretation',
        description: 'Tables, charts, graphs, and data analysis',
        difficulty: 'medium',
        icon: '📉',
        subtopics: [
          'Tables and Data Sets',
          'Bar Graphs',
          'Line Graphs',
          'Pie Charts',
          'Mixed Graphs',
          'Caselets',
          'Missing Data Problems'
        ]
      }
    ]
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    description: 'Develop analytical and logical thinking abilities',
    icon: '🧠',
    gradient: 'from-purple-500 to-pink-500',
    topics: [
      {
        id: 'coding-decoding',
        name: 'Coding and Decoding',
        description: 'Letter coding, number coding, and pattern recognition',
        difficulty: 'easy',
        icon: '🔐',
        subtopics: [
          'Letter Coding',
          'Number Coding',
          'Mixed Coding',
          'Substitution Coding',
          'Conditional Coding',
          'Symbol Coding',
          'Message Decoding'
        ]
      },
      {
        id: 'blood-relations',
        name: 'Blood Relations',
        description: 'Family tree problems and relationship puzzles',
        difficulty: 'medium',
        icon: '👨‍👩‍👧‍👦',
        subtopics: [
          'Basic Relationships',
          'Single Person Blood Relations',
          'Mixed Blood Relations',
          'Coded Blood Relations',
          'Family Tree Problems',
          'Pointing to a Person',
          'Generation-based Problems'
        ]
      },
      {
        id: 'directions',
        name: 'Direction Sense',
        description: 'Direction-based movement and navigation problems',
        difficulty: 'easy',
        icon: '🧭',
        subtopics: [
          'Basic Directions',
          'Shadow-based Problems',
          'Distance and Direction',
          'Turns and Movements',
          'Complex Path Tracing',
          'Position-based Questions'
        ]
      },
      {
        id: 'seating-arrangement',
        name: 'Seating Arrangement',
        description: 'Linear and circular arrangement problems',
        difficulty: 'hard',
        icon: '🪑',
        subtopics: [
          'Linear Arrangement (Single Row)',
          'Linear Arrangement (Double Row)',
          'Circular Arrangement',
          'Rectangular Arrangement',
          'Floor-based Puzzles',
          'Complex Arrangements'
        ]
      },
      {
        id: 'syllogism',
        name: 'Syllogism',
        description: 'Logical statements and conclusions',
        difficulty: 'medium',
        icon: '🔀',
        subtopics: [
          'Basic Syllogism Rules',
          'All/Some/No/Some Not',
          'Possibility Cases',
          'Either-Or Cases',
          'Complementary Pairs',
          'Coded Syllogism',
          'Reverse Syllogism'
        ]
      },
      {
        id: 'puzzles',
        name: 'Puzzles',
        description: 'Complex logical puzzles and scheduling',
        difficulty: 'hard',
        icon: '🧩',
        subtopics: [
          'Comparison-based Puzzles',
          'Scheduling Puzzles',
          'Box-based Puzzles',
          'Floor-based Puzzles',
          'Month/Day-based Puzzles',
          'Multi-variable Puzzles'
        ]
      },
      {
        id: 'series',
        name: 'Number and Letter Series',
        description: 'Pattern recognition in sequences',
        difficulty: 'easy',
        icon: '🔢',
        subtopics: [
          'Number Series',
          'Alphabet Series',
          'Alpha-Numeric Series',
          'Wrong Number in Series',
          'Missing Number Series',
          'Pattern-based Series'
        ]
      },
      {
        id: 'analogy',
        name: 'Analogy',
        description: 'Finding relationships between pairs',
        difficulty: 'easy',
        icon: '🔗',
        subtopics: [
          'Word Analogy',
          'Number Analogy',
          'Letter Analogy',
          'Mixed Analogy',
          'Meaningful Order'
        ]
      },
      {
        id: 'classification',
        name: 'Classification',
        description: 'Odd one out and grouping problems',
        difficulty: 'easy',
        icon: '📂',
        subtopics: [
          'Word Classification',
          'Number Classification',
          'Letter Classification',
          'Meaningful Classification',
          'Figure Classification'
        ]
      },
      {
        id: 'ranking-order',
        name: 'Ranking and Order',
        description: 'Position-based ranking problems',
        difficulty: 'easy',
        icon: '🏆',
        subtopics: [
          'Linear Ranking',
          'Comparison-based Ranking',
          'Alphabetical Ordering',
          'Dictionary Order',
          'Position from Both Ends'
        ]
      },
      {
        id: 'input-output',
        name: 'Input-Output',
        description: 'Machine input and output pattern problems',
        difficulty: 'hard',
        icon: '⚙️',
        subtopics: [
          'Word Rearrangement',
          'Number Rearrangement',
          'Mixed Rearrangement',
          'Step-wise Operations',
          'Reverse Input-Output'
        ]
      },
      {
        id: 'statement-assumptions',
        name: 'Statement and Assumptions',
        description: 'Identifying implicit assumptions',
        difficulty: 'medium',
        icon: '💭',
        subtopics: [
          'Basic Assumptions',
          'Implicit vs Explicit',
          'Valid Assumptions',
          'Multiple Statements'
        ]
      },
      {
        id: 'statement-conclusions',
        name: 'Statement and Conclusions',
        description: 'Drawing valid conclusions from statements',
        difficulty: 'medium',
        icon: '✅',
        subtopics: [
          'Basic Conclusions',
          'Definite Conclusions',
          'Course of Action',
          'Cause and Effect'
        ]
      },
      {
        id: 'inequality',
        name: 'Inequality',
        description: 'Coded and direct inequality problems',
        difficulty: 'medium',
        icon: '><',
        subtopics: [
          'Direct Inequality',
          'Coded Inequality',
          'Either-Or in Inequality',
          'Mixed Inequality',
          'Quantity Comparison'
        ]
      }
    ]
  },
  {
    id: 'verbal',
    name: 'Verbal Ability',
    description: 'Enhance English language and communication skills',
    icon: '📝',
    gradient: 'from-orange-500 to-red-500',
    topics: [
      {
        id: 'reading-comprehension',
        name: 'Reading Comprehension',
        description: 'Passage-based questions and critical reading',
        difficulty: 'medium',
        icon: '📖',
        subtopics: [
          'Main Idea and Theme',
          'Inference Questions',
          'Vocabulary in Context',
          'Author\'s Tone and Purpose',
          'Title-based Questions',
          'True/False Statements',
          'Critical Reasoning Passages'
        ]
      },
      {
        id: 'para-jumbles',
        name: 'Para Jumbles',
        description: 'Sentence rearrangement and paragraph formation',
        difficulty: 'medium',
        icon: '🔀',
        subtopics: [
          'Sentence Rearrangement',
          'Opening and Closing Sentences',
          'Logical Connectors',
          'Chronological Order',
          'Fixed Position Questions'
        ]
      },
      {
        id: 'fill-in-blanks',
        name: 'Fill in the Blanks',
        description: 'Single and double fill ups with vocabulary',
        difficulty: 'easy',
        icon: '___',
        subtopics: [
          'Single Blank',
          'Double Blank',
          'Cloze Test',
          'Grammar-based Blanks',
          'Vocabulary-based Blanks',
          'Phrasal Verbs'
        ]
      },
      {
        id: 'sentence-correction',
        name: 'Sentence Correction',
        description: 'Grammar, syntax, and sentence improvement',
        difficulty: 'medium',
        icon: '✏️',
        subtopics: [
          'Subject-Verb Agreement',
          'Tense Errors',
          'Pronoun Errors',
          'Modifier Errors',
          'Parallelism',
          'Redundancy',
          'Idiomatic Expressions'
        ]
      },
      {
        id: 'error-spotting',
        name: 'Error Spotting',
        description: 'Identifying grammatical errors in sentences',
        difficulty: 'easy',
        icon: '🔍',
        subtopics: [
          'Grammar Errors',
          'Spelling Errors',
          'Punctuation Errors',
          'Word Usage Errors',
          'No Error Questions'
        ]
      },
      {
        id: 'synonyms-antonyms',
        name: 'Synonyms and Antonyms',
        description: 'Word meanings and opposites',
        difficulty: 'easy',
        icon: '🔤',
        subtopics: [
          'Direct Synonyms',
          'Contextual Synonyms',
          'Direct Antonyms',
          'Contextual Antonyms',
          'Word Groups'
        ]
      },
      {
        id: 'vocabulary',
        name: 'Vocabulary',
        description: 'Word meanings, idioms, and phrases',
        difficulty: 'medium',
        icon: '📚',
        subtopics: [
          'One Word Substitution',
          'Idioms and Phrases',
          'Phrasal Verbs',
          'Foreign Words',
          'Word Roots',
          'Commonly Confused Words'
        ]
      },
      {
        id: 'sentence-completion',
        name: 'Sentence Completion',
        description: 'Completing sentences with appropriate words',
        difficulty: 'easy',
        icon: '📝',
        subtopics: [
          'Contextual Completion',
          'Grammar-based Completion',
          'Logical Completion',
          'Connectors'
        ]
      },
      {
        id: 'active-passive',
        name: 'Active and Passive Voice',
        description: 'Voice transformation and rules',
        difficulty: 'easy',
        icon: '🔄',
        subtopics: [
          'Basic Rules',
          'Tense-wise Conversion',
          'Imperative Sentences',
          'Interrogative Sentences',
          'Complex Sentences'
        ]
      },
      {
        id: 'direct-indirect',
        name: 'Direct and Indirect Speech',
        description: 'Reported speech transformation',
        difficulty: 'medium',
        icon: '💬',
        subtopics: [
          'Basic Rules',
          'Statements Conversion',
          'Questions Conversion',
          'Commands and Requests',
          'Exclamatory Sentences'
        ]
      },
      {
        id: 'cloze-test',
        name: 'Cloze Test',
        description: 'Passage-based fill in the blanks',
        difficulty: 'medium',
        icon: '📄',
        subtopics: [
          'Grammar-based Cloze',
          'Vocabulary-based Cloze',
          'New Pattern Cloze',
          'Theme-based Cloze'
        ]
      },
      {
        id: 'sentence-improvement',
        name: 'Sentence Improvement',
        description: 'Improving sentence structure and clarity',
        difficulty: 'medium',
        icon: '⬆️',
        subtopics: [
          'Word Replacement',
          'Phrase Replacement',
          'Sentence Reconstruction',
          'No Improvement Cases'
        ]
      }
    ]
  }
];
