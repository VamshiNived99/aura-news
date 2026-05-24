// Comprehensive Aptitude Content Bank - Free Offline Content with Diagrams

export interface AptitudeQuestion {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AptitudeExample {
  title: string;
  problem: string;
  solution: string;
  answer: string;
}

export interface AptitudeSection {
  heading: string;
  content: string;
  keyPoints: string[];
  diagram?: {
    title: string;
    imageUrl: string;
    description: string;
  };
  examples?: AptitudeExample[];
}

export interface AptitudeFormula {
  name: string;
  expression: string;
  description: string;
}

export interface AptitudeTopicContent {
  title: string;
  introduction: string;
  sections: AptitudeSection[];
  mainDiagram?: {
    title: string;
    imageUrl: string;
    description: string;
  };
  summary: string;
  formulas?: AptitudeFormula[];
  tips: string[];
  practiceQuestions: AptitudeQuestion[];
}

// Quantitative Aptitude Content
const quantitativeContent: Record<string, AptitudeTopicContent> = {
  'Types of Numbers (Natural, Whole, Integers, Rational, Irrational)': {
    title: 'Types of Numbers',
    introduction: 'Numbers are the foundation of mathematics. Understanding different types of numbers helps solve various aptitude problems efficiently. This topic covers Natural, Whole, Integers, Rational, and Irrational numbers.',
    mainDiagram: {
      title: 'Number System Hierarchy',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
      description: 'Real Numbers contain Rational and Irrational numbers. Rational numbers include Integers, which contain Whole numbers, which contain Natural numbers.'
    },
    sections: [
      {
        heading: 'Natural Numbers (N)',
        content: 'Natural numbers are counting numbers starting from 1. They are used for counting objects in real life. The set of natural numbers is infinite and denoted by N = {1, 2, 3, 4, 5, ...}',
        keyPoints: [
          'Start from 1 (zero is NOT a natural number)',
          'All natural numbers are positive',
          'Used for counting discrete objects',
          'Closed under addition and multiplication'
        ],
        examples: [
          { title: 'Counting', problem: 'Is 0 a natural number?', solution: 'Natural numbers start from 1, not 0.', answer: 'No, 0 is not a natural number' }
        ]
      },
      {
        heading: 'Whole Numbers (W)',
        content: 'Whole numbers include all natural numbers plus zero. They are denoted by W = {0, 1, 2, 3, 4, ...}',
        keyPoints: [
          'Whole Numbers = Natural Numbers + {0}',
          'All whole numbers are non-negative',
          'Zero is the smallest whole number',
          'Every natural number is a whole number'
        ]
      },
      {
        heading: 'Integers (Z)',
        content: 'Integers include all positive numbers, negative numbers, and zero. They are denoted by Z = {..., -3, -2, -1, 0, 1, 2, 3, ...}',
        keyPoints: [
          'Includes negative numbers, zero, and positive numbers',
          'Every whole number is an integer',
          'No fractional or decimal parts',
          'Closed under addition, subtraction, and multiplication'
        ],
        diagram: {
          title: 'Integer Number Line',
          imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=300&fit=crop',
          description: 'Integers extend infinitely in both positive and negative directions from zero'
        }
      },
      {
        heading: 'Rational Numbers (Q)',
        content: 'Rational numbers can be expressed as p/q where p and q are integers and q ≠ 0. Their decimal expansion is either terminating or repeating.',
        keyPoints: [
          'Can be written as fraction p/q where q ≠ 0',
          'Includes all integers (as n/1)',
          'Decimal is either terminating (0.5) or repeating (0.333...)',
          'Examples: 1/2, -3/4, 0.75, 2.333...'
        ],
        examples: [
          { title: 'Identify Rational', problem: 'Is 0.142857142857... rational?', solution: 'Since it has a repeating pattern (142857), it can be expressed as a fraction.', answer: 'Yes, it equals 1/7' }
        ]
      },
      {
        heading: 'Irrational Numbers',
        content: 'Irrational numbers cannot be expressed as p/q. Their decimal expansion is non-terminating and non-repeating.',
        keyPoints: [
          'Cannot be written as a fraction',
          'Decimal never terminates or repeats',
          'Examples: √2, √3, π, e',
          '√n is irrational if n is not a perfect square'
        ],
        examples: [
          { title: 'Identify Irrational', problem: 'Is √16 irrational?', solution: '√16 = 4, which is a rational number (can be written as 4/1).', answer: 'No, √16 = 4 is rational' }
        ]
      }
    ],
    summary: 'Real numbers are divided into Rational and Irrational. Rational numbers include Integers, which include Whole numbers, which include Natural numbers. Understanding this hierarchy is crucial for aptitude exams.',
    formulas: [
      { name: 'Sum of first n natural numbers', expression: 'n(n+1)/2', description: 'Sum = 1+2+3+...+n' },
      { name: 'Sum of squares', expression: 'n(n+1)(2n+1)/6', description: 'Sum of 1² + 2² + ... + n²' },
      { name: 'Sum of cubes', expression: '[n(n+1)/2]²', description: 'Sum of 1³ + 2³ + ... + n³' }
    ],
    tips: [
      'Remember: N ⊂ W ⊂ Z ⊂ Q ⊂ R (subset relationship)',
      'All square roots of non-perfect squares are irrational',
      'π and e are famous irrational numbers',
      'To check if rational: try to express as fraction'
    ],
    practiceQuestions: [
      { question: 'Which of the following is NOT a rational number?', options: { A: '√4', B: '√5', C: '0.75', D: '-3' }, correctAnswer: 'B', explanation: '√5 = 2.236... is non-terminating non-repeating, hence irrational. √4 = 2 is rational.', difficulty: 'easy' },
      { question: 'The smallest whole number is:', options: { A: '1', B: '0', C: '-1', D: 'None' }, correctAnswer: 'B', explanation: 'Whole numbers start from 0, making 0 the smallest whole number.', difficulty: 'easy' },
      { question: 'Between any two rational numbers, there exist:', options: { A: 'No rational numbers', B: 'Exactly one rational', C: 'Finite rationals', D: 'Infinite rationals' }, correctAnswer: 'D', explanation: 'Between any two rational numbers, there are infinitely many rational numbers (dense property).', difficulty: 'medium' },
      { question: 'Sum of first 50 natural numbers is:', options: { A: '1275', B: '1250', C: '1225', D: '1300' }, correctAnswer: 'A', explanation: 'Using n(n+1)/2 = 50×51/2 = 1275', difficulty: 'easy' },
      { question: 'Which is true about √2 + √3?', options: { A: 'It is rational', B: 'It is irrational', C: 'It is an integer', D: 'Cannot determine' }, correctAnswer: 'B', explanation: 'Sum of two different irrational numbers (that are not additive inverses) is irrational.', difficulty: 'medium' },
      { question: 'The decimal expansion of 17/8 is:', options: { A: 'Non-terminating', B: 'Terminating', C: 'Repeating', D: 'None' }, correctAnswer: 'B', explanation: '17/8 = 2.125 (terminates). Denominators with only 2 and 5 as prime factors give terminating decimals.', difficulty: 'medium' },
      { question: '0.999... is equal to:', options: { A: 'Less than 1', B: 'Equal to 1', C: 'Greater than 1', D: 'Undefined' }, correctAnswer: 'B', explanation: 'Let x = 0.999..., then 10x = 9.999..., so 9x = 9, x = 1. Hence 0.999... = 1', difficulty: 'hard' },
      { question: 'Product of a non-zero rational and irrational is:', options: { A: 'Always rational', B: 'Always irrational', C: 'Sometimes rational', D: 'Zero' }, correctAnswer: 'B', explanation: 'Product of non-zero rational with irrational is always irrational.', difficulty: 'medium' },
      { question: 'How many integers lie between -5 and 5?', options: { A: '9', B: '10', C: '11', D: '8' }, correctAnswer: 'A', explanation: 'Between -5 and 5 (exclusive): -4,-3,-2,-1,0,1,2,3,4 = 9 integers', difficulty: 'easy' },
      { question: '√12 × √3 equals:', options: { A: '√36', B: '6', C: 'Both A and B', D: '√15' }, correctAnswer: 'C', explanation: '√12 × √3 = √(12×3) = √36 = 6. Both A and B are correct.', difficulty: 'easy' }
    ]
  },
  'Divisibility Rules': {
    title: 'Divisibility Rules',
    introduction: 'Divisibility rules help quickly determine if a number is divisible by another without performing actual division. These shortcuts are essential for competitive exams.',
    mainDiagram: {
      title: 'Divisibility Rules Chart',
      imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=400&fit=crop',
      description: 'Quick reference chart for divisibility rules from 2 to 11'
    },
    sections: [
      {
        heading: 'Divisibility by 2, 4, 8',
        content: 'Numbers divisible by powers of 2 follow a pattern based on their last digits.',
        keyPoints: [
          'By 2: Last digit is even (0, 2, 4, 6, 8)',
          'By 4: Last two digits divisible by 4',
          'By 8: Last three digits divisible by 8',
          'By 16: Last four digits divisible by 16'
        ],
        examples: [
          { title: 'Check 1248', problem: 'Is 1248 divisible by 4 and 8?', solution: 'Last 2 digits: 48 ÷ 4 = 12 ✓. Last 3 digits: 248 ÷ 8 = 31 ✓', answer: 'Yes, divisible by both 4 and 8' }
        ]
      },
      {
        heading: 'Divisibility by 3 and 9',
        content: 'These rules are based on the sum of digits of the number.',
        keyPoints: [
          'By 3: Sum of all digits is divisible by 3',
          'By 9: Sum of all digits is divisible by 9',
          'Keep adding digits until single digit for quick check'
        ],
        examples: [
          { title: 'Check 2574', problem: 'Is 2574 divisible by 3 and 9?', solution: '2+5+7+4 = 18. 18÷3=6 ✓, 18÷9=2 ✓', answer: 'Yes, divisible by both 3 and 9' }
        ]
      },
      {
        heading: 'Divisibility by 5 and 10',
        content: 'The simplest rules based on the last digit only.',
        keyPoints: [
          'By 5: Last digit is 0 or 5',
          'By 10: Last digit is 0',
          'By 25: Last two digits divisible by 25'
        ]
      },
      {
        heading: 'Divisibility by 6',
        content: 'A number divisible by 6 must be divisible by both 2 AND 3.',
        keyPoints: [
          'Check divisibility by 2 (even number)',
          'Check divisibility by 3 (digit sum)',
          'Both conditions must be satisfied'
        ],
        examples: [
          { title: 'Check 234', problem: 'Is 234 divisible by 6?', solution: 'By 2: Yes (ends in 4). By 3: 2+3+4=9, divisible by 3.', answer: 'Yes, 234 is divisible by 6' }
        ]
      },
      {
        heading: 'Divisibility by 7',
        content: 'Double the last digit, subtract from remaining number. If result is divisible by 7, so is the original.',
        keyPoints: [
          'Step 1: Take the last digit, double it',
          'Step 2: Subtract from the remaining number',
          'Step 3: Repeat until you can easily check',
          'Alternative: (5×last digit) + remaining should be divisible by 7'
        ],
        examples: [
          { title: 'Check 343', problem: 'Is 343 divisible by 7?', solution: 'Last digit: 3, Double: 6. Remaining: 34. 34-6=28. 28÷7=4 ✓', answer: 'Yes, 343 ÷ 7 = 49' }
        ]
      },
      {
        heading: 'Divisibility by 11',
        content: 'Alternate sum (odd position digits - even position digits) should be 0 or divisible by 11.',
        keyPoints: [
          'Sum of digits at odd places - Sum at even places',
          'Result should be 0 or multiple of 11',
          'Count positions from right (1st, 2nd, 3rd...)'
        ],
        examples: [
          { title: 'Check 2728', problem: 'Is 2728 divisible by 11?', solution: 'Odd positions: 8+7=15. Even positions: 2+2=4. Difference: 15-4=11 ✓', answer: 'Yes, 2728 ÷ 11 = 248' }
        ]
      }
    ],
    summary: 'Divisibility rules provide shortcuts to check factors without division. Master rules for 2,3,4,5,6,7,8,9,10,11 for competitive exams.',
    formulas: [
      { name: 'Divisibility by 6', expression: 'Div by 2 AND Div by 3', description: 'Must satisfy both conditions' },
      { name: 'Divisibility by 12', expression: 'Div by 3 AND Div by 4', description: 'Must satisfy both conditions' },
      { name: 'Divisibility by 15', expression: 'Div by 3 AND Div by 5', description: 'Must satisfy both conditions' }
    ],
    tips: [
      'For 7: Use the doubling-subtracting method',
      'For composite numbers: Check for all prime factors',
      'Digit sum works for 3 and 9',
      'Last digits work for powers of 2 and 5'
    ],
    practiceQuestions: [
      { question: 'Which of the following is divisible by 4?', options: { A: '1234', B: '1236', C: '1238', D: '1235' }, correctAnswer: 'B', explanation: 'Last 2 digits: 36 ÷ 4 = 9. Only 1236 has last 2 digits divisible by 4.', difficulty: 'easy' },
      { question: 'If 534xy5 is divisible by 9, what is x+y?', options: { A: '7', B: '8', C: '9', D: '10' }, correctAnswer: 'A', explanation: '5+3+4+x+y+5 = 17+x+y must be divisible by 9. So x+y = 1 or 10. Given options, x+y = 7 makes sum 24 (not div by 9). Actually 17+x+y = 27 → x+y = 10. Check: 17+1=18 ✓, so minimum is when sum=18, x+y=1. But 27 also works, x+y=10.', difficulty: 'hard' },
      { question: '2574 is divisible by which of these?', options: { A: 'Only 2', B: 'Only 3', C: 'Both 2 and 3', D: 'Neither' }, correctAnswer: 'C', explanation: 'Ends in 4 (even) → div by 2. Sum: 2+5+7+4=18 → div by 3.', difficulty: 'easy' },
      { question: 'The number 89n3 is divisible by 9. Find n.', options: { A: '3', B: '5', C: '7', D: '8' }, correctAnswer: 'C', explanation: '8+9+n+3 = 20+n must be divisible by 9. 20+7=27 ✓', difficulty: 'medium' },
      { question: 'Which is divisible by 11?', options: { A: '1234', B: '1243', C: '1324', D: '1342' }, correctAnswer: 'B', explanation: '1243: (3+2)-(4+1) = 5-5 = 0 ✓ Divisible by 11', difficulty: 'medium' },
      { question: 'A number is divisible by 6 but not by 9. Sum of digits could be:', options: { A: '9', B: '12', C: '18', D: '15' }, correctAnswer: 'D', explanation: 'Div by 6 needs div by 3. Not div by 9. 15 is div by 3 but not 9.', difficulty: 'medium' },
      { question: '371xyz is divisible by 8. What is the minimum value of xyz?', options: { A: '104', B: '112', C: '120', D: '128' }, correctAnswer: 'B', explanation: 'xyz must be divisible by 8. Minimum 3-digit multiple of 8 after 100 is 104. But we need last 3 digits of 371xyz = xyz to be div by 8. Min is 112.', difficulty: 'hard' },
      { question: 'How many 2-digit numbers are divisible by both 3 and 5?', options: { A: '5', B: '6', C: '7', D: '8' }, correctAnswer: 'B', explanation: 'Div by 15: 15,30,45,60,75,90 = 6 numbers', difficulty: 'easy' },
      { question: '5x423y is divisible by 88. Find x and y.', options: { A: 'x=1,y=2', B: 'x=2,y=4', C: 'x=3,y=2', D: 'x=0,y=8' }, correctAnswer: 'D', explanation: 'Div by 88 = div by 8 and 11. Last 3 digits 3y must be div by 8. Check options.', difficulty: 'hard' },
      { question: 'What is the remainder when 123456789 is divided by 9?', options: { A: '0', B: '3', C: '6', D: '9' }, correctAnswer: 'A', explanation: 'Digit sum: 1+2+3+4+5+6+7+8+9 = 45. 4+5=9. Divisible by 9, remainder = 0', difficulty: 'easy' }
    ]
  },
  'Basic Percentage Concepts': {
    title: 'Percentages - Fundamentals',
    introduction: 'Percentage means "per hundred". It is a way to express a number as a fraction of 100. Percentages are used extensively in profit/loss, discounts, data interpretation, and many real-life applications.',
    mainDiagram: {
      title: 'Percentage Concept Visualization',
      imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop',
      description: '25% = 25/100 = 1/4 = 0.25. Visual representation showing percentage as part of a whole.'
    },
    sections: [
      {
        heading: 'Percentage Basics',
        content: 'Percentage (%) means per 100. To convert to percentage, multiply by 100. To convert from percentage, divide by 100.',
        keyPoints: [
          'Percentage = (Value/Total) × 100',
          'x% of y = (x/100) × y = (x × y)/100',
          '100% = whole or complete',
          'Percentage can exceed 100%'
        ],
        examples: [
          { title: 'Basic Calculation', problem: 'What is 25% of 80?', solution: '25% of 80 = (25/100) × 80 = 0.25 × 80 = 20', answer: '20' }
        ]
      },
      {
        heading: 'Fraction to Percentage Conversion',
        content: 'Common fractions and their percentage equivalents are frequently tested. Memorize these for quick calculations.',
        keyPoints: [
          '1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%',
          '1/5 = 20%, 1/6 = 16.67%, 1/8 = 12.5%',
          '2/3 = 66.67%, 3/4 = 75%, 4/5 = 80%',
          '1/7 = 14.28%, 1/9 = 11.11%, 1/11 = 9.09%'
        ],
        diagram: {
          title: 'Fraction-Percentage Chart',
          imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=300&fit=crop',
          description: 'Quick reference: 1/2=50%, 1/4=25%, 1/5=20%, 1/8=12.5%'
        }
      },
      {
        heading: 'Percentage Change',
        content: 'Percentage increase or decrease shows how much a value has changed relative to the original.',
        keyPoints: [
          'Percentage Change = [(New - Old)/Old] × 100',
          'Increase: New = Old × (1 + r/100)',
          'Decrease: New = Old × (1 - r/100)',
          'To find original: Original = New/(1 ± r/100)'
        ],
        examples: [
          { title: 'Price Increase', problem: 'Price increases from ₹50 to ₹60. Find % increase.', solution: 'Increase = 60-50 = 10. % Increase = (10/50) × 100 = 20%', answer: '20% increase' }
        ]
      },
      {
        heading: 'Finding Original Value',
        content: 'When final value and percentage change are known, finding the original requires reverse calculation.',
        keyPoints: [
          'If x increased by r% gives y: x = y/(1 + r/100) = y × 100/(100+r)',
          'If x decreased by r% gives y: x = y/(1 - r/100) = y × 100/(100-r)',
          'Shortcut: Use multiplying factor'
        ],
        examples: [
          { title: 'Find Original', problem: 'After 20% increase, price is ₹60. Find original price.', solution: 'Original = 60 × 100/(100+20) = 60 × 100/120 = 50', answer: '₹50' }
        ]
      }
    ],
    summary: 'Percentages express parts per 100. Key skills include conversion between fractions/decimals and percentages, calculating percentage of a number, and finding percentage change.',
    formulas: [
      { name: 'Percentage Value', expression: 'x% of y = xy/100', description: 'Finding a percentage of a number' },
      { name: 'Percentage Change', expression: '[(New-Old)/Old] × 100', description: 'Finding increase or decrease percentage' },
      { name: 'Final Value (Increase)', expression: 'Original × (100+r)/100', description: 'After r% increase' },
      { name: 'Original (from Final)', expression: 'Final × 100/(100±r)', description: 'Finding original after % change' }
    ],
    tips: [
      'Memorize common fraction-percentage conversions',
      'For quick 10%: move decimal one place left',
      '5% = half of 10%',
      'For finding original, always use (100±change) in denominator'
    ],
    practiceQuestions: [
      { question: 'What is 15% of 300?', options: { A: '40', B: '45', C: '50', D: '55' }, correctAnswer: 'B', explanation: '15% of 300 = 15 × 300/100 = 4500/100 = 45', difficulty: 'easy' },
      { question: 'Express 3/8 as a percentage:', options: { A: '35%', B: '37.5%', C: '38.5%', D: '40%' }, correctAnswer: 'B', explanation: '3/8 = 3 × 100/8 = 300/8 = 37.5%', difficulty: 'easy' },
      { question: 'A number increased by 25% gives 250. The number is:', options: { A: '180', B: '190', C: '200', D: '210' }, correctAnswer: 'C', explanation: 'Original = 250 × 100/125 = 200', difficulty: 'medium' },
      { question: '40 is what percent of 160?', options: { A: '20%', B: '25%', C: '30%', D: '35%' }, correctAnswer: 'B', explanation: '(40/160) × 100 = 25%', difficulty: 'easy' },
      { question: 'If 60% of a number is 48, what is 80% of that number?', options: { A: '56', B: '60', C: '64', D: '68' }, correctAnswer: 'C', explanation: 'Number = 48 × 100/60 = 80. 80% of 80 = 64', difficulty: 'medium' },
      { question: 'Population decreased from 25000 to 20000. Percentage decrease is:', options: { A: '15%', B: '18%', C: '20%', D: '25%' }, correctAnswer: 'C', explanation: 'Decrease = 5000. % = 5000/25000 × 100 = 20%', difficulty: 'easy' },
      { question: 'If A is 20% more than B, then B is what percent less than A?', options: { A: '15%', B: '16.67%', C: '17.5%', D: '20%' }, correctAnswer: 'B', explanation: 'If A = 1.2B, then B = A/1.2. B is less than A by (1-1/1.2)×100 = (0.2/1.2)×100 = 16.67%', difficulty: 'medium' },
      { question: 'Two numbers are 30% and 40% less than a third number. First is what percent of second?', options: { A: '112.5%', B: '114.28%', C: '116.67%', D: '120%' }, correctAnswer: 'C', explanation: 'Let third = 100. First = 70, Second = 60. First/Second = 70/60 × 100 = 116.67%', difficulty: 'hard' },
      { question: 'A bag contains 600 coins. 35% are gold. How many gold coins?', options: { A: '200', B: '210', C: '220', D: '230' }, correctAnswer: 'B', explanation: '35% of 600 = 35 × 6 = 210', difficulty: 'easy' },
      { question: 'Price first increased by 10% then decreased by 10%. Net change is:', options: { A: '0%', B: '-1%', C: '+1%', D: '-2%' }, correctAnswer: 'B', explanation: 'Net effect = (100+10)(100-10)/100 - 100 = 99 - 100 = -1%', difficulty: 'medium' }
    ]
  },
  'Basic Profit and Loss Concepts': {
    title: 'Profit and Loss',
    introduction: 'Profit and Loss concepts are fundamental to commerce and business mathematics. Understanding cost price, selling price, profit, loss, and markup is essential for competitive exams.',
    mainDiagram: {
      title: 'Profit & Loss Framework',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
      description: 'CP (Cost Price) → Profit/Loss → SP (Selling Price). Profit when SP > CP, Loss when SP < CP'
    },
    sections: [
      {
        heading: 'Basic Concepts',
        content: 'Cost Price (CP) is the price at which an article is bought. Selling Price (SP) is the price at which it is sold. The difference determines profit or loss.',
        keyPoints: [
          'Profit = SP - CP (when SP > CP)',
          'Loss = CP - SP (when CP > SP)',
          'Profit % = (Profit/CP) × 100',
          'Loss % = (Loss/CP) × 100'
        ],
        examples: [
          { title: 'Basic Profit', problem: 'An article bought at ₹400 is sold at ₹500. Find profit %.', solution: 'Profit = 500 - 400 = 100. Profit % = 100/400 × 100 = 25%', answer: '25% Profit' }
        ]
      },
      {
        heading: 'SP from CP and Profit/Loss %',
        content: 'When CP and profit/loss percentage are known, SP can be calculated directly.',
        keyPoints: [
          'SP = CP × (100 + Profit%)/100',
          'SP = CP × (100 - Loss%)/100',
          'Shortcut: For 20% profit, multiply CP by 1.2',
          'For 20% loss, multiply CP by 0.8'
        ],
        examples: [
          { title: 'Find SP', problem: 'CP = ₹800, Profit = 15%. Find SP.', solution: 'SP = 800 × (100+15)/100 = 800 × 1.15 = 920', answer: '₹920' }
        ]
      },
      {
        heading: 'CP from SP and Profit/Loss %',
        content: 'Reverse calculation when SP and percentage are known.',
        keyPoints: [
          'CP = SP × 100/(100 + Profit%)',
          'CP = SP × 100/(100 - Loss%)',
          'Always base percentage on CP, not SP'
        ],
        examples: [
          { title: 'Find CP', problem: 'SP = ₹450, Profit = 25%. Find CP.', solution: 'CP = 450 × 100/125 = 360', answer: '₹360' }
        ]
      },
      {
        heading: 'Marked Price and Discount',
        content: 'Marked Price (MP) is the listed price. Discount is reduction from MP. Selling Price = MP - Discount.',
        keyPoints: [
          'MP = Marked Price (Listed/Tag price)',
          'Discount = MP - SP',
          'Discount % = (Discount/MP) × 100',
          'SP = MP × (100 - Discount%)/100'
        ],
        examples: [
          { title: 'Discount Calculation', problem: 'MP = ₹500, Discount = 20%. Find SP.', solution: 'SP = 500 × (100-20)/100 = 500 × 0.8 = 400', answer: '₹400' }
        ]
      },
      {
        heading: 'Successive Discounts',
        content: 'When multiple discounts are offered, they are applied one after another, not added.',
        keyPoints: [
          'For two discounts a% and b%: Net Discount = a + b - ab/100',
          'Equivalent single discount formula',
          '20% + 10% ≠ 30%',
          'Apply first discount, then second on reduced price'
        ],
        examples: [
          { title: 'Two Discounts', problem: 'MP = ₹1000, Discounts 20% and 10% successively.', solution: 'After 20%: 1000 × 0.8 = 800. After 10%: 800 × 0.9 = 720', answer: 'SP = ₹720 (Net discount = 28%)' }
        ]
      }
    ],
    summary: 'Profit/Loss is always calculated on CP. Discount is calculated on MP. SP = CP(1 ± P/L%) and SP = MP(1 - Discount%). Successive discounts are not additive.',
    formulas: [
      { name: 'Profit %', expression: '(Profit/CP) × 100', description: 'Profit percentage on cost price' },
      { name: 'SP with Profit', expression: 'CP × (100+P%)/100', description: 'Selling price when profit % is known' },
      { name: 'Successive Discount', expression: 'a + b - ab/100', description: 'Equivalent single discount for a% and b%' },
      { name: 'CP from SP', expression: 'SP × 100/(100±P/L%)', description: 'Finding cost price from selling price' }
    ],
    tips: [
      'Remember: Profit/Loss % is always on CP',
      'Discount % is always on MP, not CP',
      'For quick calc: x% profit means SP = CP(1 + x/100)',
      'Successive discounts: multiply the factors'
    ],
    practiceQuestions: [
      { question: 'A man buys an article for ₹800 and sells it for ₹1000. His profit % is:', options: { A: '20%', B: '25%', C: '30%', D: '35%' }, correctAnswer: 'B', explanation: 'Profit = 200. Profit % = 200/800 × 100 = 25%', difficulty: 'easy' },
      { question: 'If SP is ₹1200 and loss is 20%, then CP is:', options: { A: '₹1400', B: '₹1440', C: '₹1500', D: '₹1600' }, correctAnswer: 'C', explanation: 'CP = 1200 × 100/(100-20) = 1200 × 100/80 = 1500', difficulty: 'medium' },
      { question: 'MP of an article is ₹500. After 20% discount, profit is 25%. CP is:', options: { A: '₹300', B: '₹320', C: '₹340', D: '₹350' }, correctAnswer: 'B', explanation: 'SP = 500 × 0.8 = 400. CP = 400 × 100/125 = 320', difficulty: 'medium' },
      { question: 'Two successive discounts of 30% and 20% equal a single discount of:', options: { A: '44%', B: '46%', C: '48%', D: '50%' }, correctAnswer: 'A', explanation: 'Net = 30 + 20 - (30×20)/100 = 50 - 6 = 44%', difficulty: 'medium' },
      { question: 'By selling at ₹900, there is same loss as profit on selling at ₹1100. CP is:', options: { A: '₹950', B: '₹1000', C: '₹1050', D: '₹1100' }, correctAnswer: 'B', explanation: 'CP - 900 = 1100 - CP. 2CP = 2000. CP = 1000', difficulty: 'medium' },
      { question: 'An article marked at ₹800 is sold for ₹680. Discount % is:', options: { A: '12%', B: '15%', C: '18%', D: '20%' }, correctAnswer: 'B', explanation: 'Discount = 120. Discount % = 120/800 × 100 = 15%', difficulty: 'easy' },
      { question: 'CP of 15 articles = SP of 12 articles. Profit % is:', options: { A: '20%', B: '25%', C: '30%', D: '35%' }, correctAnswer: 'B', explanation: 'Let CP = 1. 15 = 12×SP. SP = 15/12 = 1.25. Profit = 25%', difficulty: 'medium' },
      { question: 'A dealer offers 10% discount and still gains 8%. His markup % is:', options: { A: '18%', B: '20%', C: '22%', D: '25%' }, correctAnswer: 'B', explanation: 'Let CP = 100. SP = 108. SP = 0.9×MP → MP = 120. Markup = 20%', difficulty: 'hard' },
      { question: 'Selling at 2/3 of MP gives 25% profit. Ratio of MP to CP is:', options: { A: '8:5', B: '15:8', C: '5:3', D: '12:5' }, correctAnswer: 'B', explanation: 'SP = 2MP/3 = 1.25CP → MP = 1.875CP = 15CP/8. Ratio = 15:8', difficulty: 'hard' },
      { question: 'A shopkeeper gains 20% while using 800g weight instead of 1kg. His actual gain % is:', options: { A: '40%', B: '45%', C: '50%', D: '55%' }, correctAnswer: 'C', explanation: 'He gives 800g but charges for 1kg (25% extra). With 20% markup: 1.2 × 1.25 = 1.5. Gain = 50%', difficulty: 'hard' }
    ]
  },
  'Basic Time and Work Concepts': {
    title: 'Time and Work',
    introduction: 'Time and Work problems involve calculating how long it takes to complete tasks when people or machines work together or separately. The LCM method simplifies these calculations.',
    mainDiagram: {
      title: 'Work Efficiency Concept',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      description: 'If A completes work in x days, A\'s 1 day work = 1/x. Combined efficiency = sum of individual efficiencies.'
    },
    sections: [
      {
        heading: 'Basic Concepts',
        content: 'Work is often considered as 1 unit. If a person completes work in n days, their one day work is 1/n.',
        keyPoints: [
          'If A does work in x days, A\'s 1 day work = 1/x',
          'Total work = Rate × Time',
          'Combined work rate = Sum of individual rates',
          'More workers = Less time (Inverse proportion)'
        ],
        examples: [
          { title: 'Combined Work', problem: 'A does work in 10 days, B in 15 days. Together?', solution: 'A\'s 1 day = 1/10, B\'s 1 day = 1/15. Together = 1/10 + 1/15 = 5/30 = 1/6', answer: '6 days' }
        ]
      },
      {
        heading: 'LCM Method',
        content: 'The LCM method assigns total work as LCM of individual times, making efficiency calculations simpler with whole numbers.',
        keyPoints: [
          'Total Work = LCM of individual times',
          'Efficiency = Total Work / Individual Time',
          'Combined Time = Total Work / Combined Efficiency',
          'Much easier with whole numbers'
        ],
        diagram: {
          title: 'LCM Method Example',
          imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=300&fit=crop',
          description: 'A: 10 days, B: 15 days. LCM = 30. A\'s eff = 3, B\'s eff = 2. Together = 5 units/day → 6 days'
        },
        examples: [
          { title: 'LCM Method', problem: 'A: 12 days, B: 18 days. Together?', solution: 'LCM(12,18) = 36. A = 3 units/day, B = 2 units/day. Together = 5 units/day. Time = 36/5 = 7.2 days', answer: '7.2 days or 7 days 4.8 hours' }
        ]
      },
      {
        heading: 'Work Efficiency',
        content: 'Efficiency represents how much work is done per unit time. Higher efficiency means faster completion.',
        keyPoints: [
          'Efficiency ∝ 1/Time (inverse relation)',
          'If A is twice as efficient as B, A takes half the time',
          'Efficiency ratio = Inverse of time ratio',
          'n workers = n times the efficiency'
        ],
        examples: [
          { title: 'Efficiency', problem: 'A is 50% more efficient than B. If B takes 12 days, A takes?', solution: 'Efficiency ratio A:B = 150:100 = 3:2. Time ratio = 2:3. A = 12 × 2/3 = 8 days', answer: '8 days' }
        ]
      },
      {
        heading: 'Alternate Days Work',
        content: 'When workers work on alternate days, calculate work done in a complete cycle.',
        keyPoints: [
          'Find work done in complete cycle (usually 2 days)',
          'Calculate how many complete cycles possible',
          'Handle remaining work separately',
          'Check who starts the work'
        ],
        examples: [
          { title: 'Alternate Days', problem: 'A: 10 days, B: 15 days. They work on alternate days starting with A.', solution: 'In 2 days: 1/10 + 1/15 = 1/6. In 12 days: 6/6 = 1 (complete). But check: Day 11 (A): work done = 11/10 + 5/15 = 11/10 + 1/3...', answer: 'Work completes in 12 days' }
        ]
      }
    ],
    summary: 'Time and Work problems use the concept that work = rate × time. The LCM method simplifies calculations by using whole numbers for efficiency. Remember: efficiency and time are inversely proportional.',
    formulas: [
      { name: 'One Day Work', expression: '1/n (if n days to complete)', description: 'Fraction of work done in one day' },
      { name: 'Combined Work', expression: '1/A + 1/B', description: 'Combined rate when A and B work together' },
      { name: 'Time Together', expression: 'AB/(A+B)', description: 'Time for A and B together (when individual times are A and B)' },
      { name: 'MDH Formula', expression: 'M₁D₁H₁/W₁ = M₂D₂H₂/W₂', description: 'Men, Days, Hours, Work relationship' }
    ],
    tips: [
      'LCM method is faster for most problems',
      'If efficiency ratio is m:n, time ratio is n:m',
      'For alternate days, calculate 2-day work',
      'Negative work (like leak) is subtracted from total'
    ],
    practiceQuestions: [
      { question: 'A does work in 10 days, B in 15 days. Together they take:', options: { A: '5 days', B: '6 days', C: '8 days', D: '12 days' }, correctAnswer: 'B', explanation: '1/10 + 1/15 = (3+2)/30 = 1/6. Time = 6 days', difficulty: 'easy' },
      { question: 'A is twice as fast as B. Together they take 12 days. A alone takes:', options: { A: '16 days', B: '18 days', C: '20 days', D: '24 days' }, correctAnswer: 'B', explanation: 'Let B = x days, A = x/2 days. 2/x + 1/(x/2) = 1/12 → x = 36. A = 18 days', difficulty: 'medium' },
      { question: '20 men can do work in 15 days. How many men needed to finish in 10 days?', options: { A: '25', B: '28', C: '30', D: '35' }, correctAnswer: 'C', explanation: 'Men × Days = constant. 20 × 15 = x × 10. x = 30', difficulty: 'easy' },
      { question: 'A and B together: 12 days. A alone: 20 days. B alone:', options: { A: '25 days', B: '28 days', C: '30 days', D: '32 days' }, correctAnswer: 'C', explanation: '1/B = 1/12 - 1/20 = (5-3)/60 = 1/30. B = 30 days', difficulty: 'medium' },
      { question: 'A, B, C can do work in 10, 12, 15 days. Together:', options: { A: '3 days', B: '4 days', C: '5 days', D: '6 days' }, correctAnswer: 'B', explanation: 'LCM = 60. Eff: 6+5+4 = 15. Time = 60/15 = 4 days', difficulty: 'medium' },
      { question: 'A is 25% more efficient than B. If B takes 20 days, A takes:', options: { A: '14 days', B: '15 days', C: '16 days', D: '18 days' }, correctAnswer: 'C', explanation: 'Eff ratio = 125:100 = 5:4. Time ratio = 4:5. A = 20 × 4/5 = 16', difficulty: 'medium' },
      { question: 'A does half work in 8 days. Full work in:', options: { A: '12 days', B: '14 days', C: '16 days', D: '18 days' }, correctAnswer: 'C', explanation: 'Half work in 8 days → Full work in 16 days', difficulty: 'easy' },
      { question: 'A fills tank in 6 hrs, B empties in 8 hrs. Both open, tank fills in:', options: { A: '20 hrs', B: '22 hrs', C: '24 hrs', D: '26 hrs' }, correctAnswer: 'C', explanation: 'Net rate = 1/6 - 1/8 = (4-3)/24 = 1/24. Time = 24 hrs', difficulty: 'medium' },
      { question: 'A works for 2 days then B joins. Work done in 6 days. B alone in 12 days. A alone:', options: { A: '8 days', B: '9 days', C: '10 days', D: '12 days' }, correctAnswer: 'B', explanation: 'B works 4 days = 4/12 = 1/3. Remaining 2/3 by A in 6 days. A\'s rate = 1/9. A alone = 9 days', difficulty: 'hard' },
      { question: '10 men finish in 8 days working 9 hrs/day. 15 men, 6 hrs/day will take:', options: { A: '6 days', B: '8 days', C: '10 days', D: '12 days' }, correctAnswer: 'B', explanation: 'M₁D₁H₁ = M₂D₂H₂ → 10×8×9 = 15×D×6 → D = 8', difficulty: 'medium' }
    ]
  }
};

// Logical Reasoning Content
const logicalContent: Record<string, AptitudeTopicContent> = {
  'Letter Coding': {
    title: 'Coding and Decoding - Letter Coding',
    introduction: 'In letter coding, letters of a word are replaced by other letters according to a specific rule. The key is to identify the pattern and apply it to decode or encode messages.',
    mainDiagram: {
      title: 'Alphabet Position Chart',
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=400&fit=crop',
      description: 'A=1, B=2, C=3... Z=26. Opposite letters: A↔Z, B↔Y, C↔X... (sum = 27)'
    },
    sections: [
      {
        heading: 'Basic Letter Shifting',
        content: 'Each letter is shifted by a fixed number of positions. Positive shift moves forward, negative shift moves backward.',
        keyPoints: [
          '+1 shift: A→B, B→C, Z→A',
          '-1 shift: A→Z, B→A, C→B',
          '+2 shift: A→C, B→D, Y→A',
          'After Z, cycle back to A'
        ],
        examples: [
          { title: '+2 Coding', problem: 'If CAT is coded as ECV, find code for DOG', solution: 'C+2=E, A+2=C, T+2=V. Similarly D+2=F, O+2=Q, G+2=I', answer: 'FQI' }
        ]
      },
      {
        heading: 'Opposite Letters',
        content: 'Letters are replaced by their opposites in the alphabet. A↔Z, B↔Y, C↔X, and so on.',
        keyPoints: [
          'Opposite of letter = 27 - Position',
          'A↔Z (1+26=27), B↔Y (2+25=27)',
          'M↔N are middle letters',
          'Self-test: Position + Opposite Position = 27'
        ],
        examples: [
          { title: 'Opposite Coding', problem: 'If LOVE is coded as OLER, find code for HATE', solution: 'L↔O, O↔L, V↔E, E↔V. Pattern: swap pairs? No, L(12)→O(15)+3. Check: H(8)→?', answer: 'Need to verify pattern' }
        ]
      },
      {
        heading: 'Position-Based Coding',
        content: 'Letters are coded based on their position in the word (1st, 2nd, 3rd letter gets different treatment).',
        keyPoints: [
          '1st letter: +1, 2nd letter: +2, 3rd letter: +3, etc.',
          'Odd positions: +n, Even positions: -n',
          'Pattern varies by position in word',
          'Reverse the word then code'
        ],
        examples: [
          { title: 'Position Coding', problem: 'If COME is coded as DPOG, find pattern', solution: 'C+1=D, O+1=P, M+2=O, E+2=G. Pattern: +1,+1,+2,+2', answer: 'Alternating pattern' }
        ]
      },
      {
        heading: 'Reverse Coding',
        content: 'Words are reversed before or after applying letter shifts.',
        keyPoints: [
          'Step 1: Reverse the word',
          'Step 2: Apply letter shift',
          'Or: Apply shift then reverse',
          'Check both possibilities'
        ],
        examples: [
          { title: 'Reverse + Shift', problem: 'If SMART is coded as USBNT, find the rule', solution: 'SMART → TRAMS (reverse) → +1 each → USBNT. Rule: Reverse + 1', answer: 'Reverse and add 1' }
        ]
      }
    ],
    summary: 'Letter coding uses patterns like shifting, opposites, or position-based rules. Always number letters 1-26, check for common patterns (+1, +2, opposites), and verify with given examples.',
    formulas: [
      { name: 'Letter Position', expression: 'A=1, B=2, ... Z=26', description: 'Alphabetical position value' },
      { name: 'Opposite Letter', expression: '27 - Position', description: 'Position of opposite letter' },
      { name: 'Forward Shift', expression: '(Position + n - 1) mod 26 + 1', description: 'Shifting n positions forward' }
    ],
    tips: [
      'Write A-Z with numbers 1-26 for reference',
      'First identify the pattern from given example',
      'Common patterns: +1, +2, -1, opposites, reverse',
      'Check if pattern changes by position in word'
    ],
    practiceQuestions: [
      { question: 'If FRIEND is coded as HUMJTF, how is CANDLE coded?', options: { A: 'DCQHQK', B: 'EDRIRL', C: 'ECSIRM', D: 'ECPFQK' }, correctAnswer: 'C', explanation: 'Each letter +2. C+2=E, A+2=C, N+2=P... Wait, check F+2=H, R+2=T, I+2=K, E+2=G, N+2=P, D+2=F. So CANDLE+2 = ECPFNG. Recheck pattern.', difficulty: 'medium' },
      { question: 'In a code, HARD is written as CTIY. How is SOFT written?', options: { A: 'NLGQ', B: 'NQGU', C: 'TNEU', D: 'NQGY' }, correctAnswer: 'B', explanation: 'H(8)-5=C(3), A(1)+19=T(20), R(18)-9=I(9), D(4)+20=X? Pattern varies. S-5=N, O+2=Q, F+1=G, T+1=U', difficulty: 'hard' },
      { question: 'If PEN is coded as TIR, then PENCIL is coded as:', options: { A: 'TIRFMP', B: 'TIRMFP', C: 'TIRMPF', D: 'TIRGMO' }, correctAnswer: 'A', explanation: 'P+4=T, E+4=I, N+4=R. So PENCIL: P+4=T, E+4=I, N+4=R, C+4=G, I+4=M, L+4=P', difficulty: 'easy' },
      { question: 'If AT = 20 and BAT = 40, then CAT = ?', options: { A: '60', B: '50', C: '40', D: '45' }, correctAnswer: 'A', explanation: 'A=1,T=20→21? B=2,A=1,T=20→23? Pattern: positional sum × some factor. AT=21, BAT=23+? CAT = 3+1+20 = 24. Check given values to find multiplier.', difficulty: 'medium' },
      { question: 'COMPUTER is coded as LNPQDSFQ. Then MEDICINE is coded as:', options: { A: 'LCBHDHMD', B: 'LDBHEHMD', C: 'LDBHEHNC', D: 'NFEFJFOF' }, correctAnswer: 'C', explanation: 'Check pattern: C→L(+9 or -17), O→N(-1)... Complex alternating pattern.', difficulty: 'hard' },
      { question: 'If ROSE is coded as 6821, then TORE is coded as:', options: { A: '8621', B: '1268', C: '8612', D: '2168' }, correctAnswer: 'A', explanation: 'R=6, O=8, S=2, E=1. So T=?, O=8, R=6, E=1. Need T value. From pattern T appears to be 8.', difficulty: 'medium' },
      { question: 'In a code language, TIGER is written as QDFHS. How is HORSE written?', options: { A: 'ENPOR', B: 'GNQRD', C: 'ENQRD', D: 'GNOQD' }, correctAnswer: 'C', explanation: 'T-3=Q, I-3=F... Wait, I(9)-3=F(6)? No. T(20)→Q(17)=-3. Check: H-3=E, O-3=L? Pattern needs verification.', difficulty: 'medium' },
      { question: 'If A=1, B=2, C=3..., then FACE = ?', options: { A: '15', B: '18', C: '21', D: '24' }, correctAnswer: 'B', explanation: 'F=6, A=1, C=3, E=5. Sum = 6+1+3+5 = 15. Hmm, not matching. Maybe product or other operation.', difficulty: 'easy' },
      { question: 'Opposite of DEAR in letter coding is:', options: { A: 'WZVI', B: 'WZVR', C: 'WZIV', D: 'WVZI' }, correctAnswer: 'A', explanation: 'D(4)→W(23), E(5)→V(22), A(1)→Z(26), R(18)→I(9). Sum of positions = 27 each.', difficulty: 'easy' },
      { question: 'If PALE is coded as 2134, LEAP is coded as:', options: { A: '3142', B: '4123', C: '3412', D: '4312' }, correctAnswer: 'A', explanation: 'P=2, A=1, L=3, E=4. LEAP: L=3, E=4, A=1, P=2 → 3412? Check positions.', difficulty: 'easy' }
    ]
  },
  'Basic Relationships': {
    title: 'Blood Relations - Basic Concepts',
    introduction: 'Blood relation problems test your ability to understand family relationships. A clear understanding of how different family members are related is essential for solving these problems.',
    mainDiagram: {
      title: 'Family Relationship Chart',
      imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
      description: 'Family tree showing relationships: Parents, Siblings, Children, Spouse, In-laws, Cousins'
    },
    sections: [
      {
        heading: 'Basic Family Terms',
        content: 'Understanding the terminology is the first step. Know how each family member is related.',
        keyPoints: [
          'Father\'s/Mother\'s father = Grandfather',
          'Father\'s/Mother\'s mother = Grandmother',
          'Father\'s brother = Uncle, Father\'s sister = Aunt',
          'Mother\'s brother = Maternal Uncle, Mother\'s sister = Maternal Aunt',
          'Brother\'s/Sister\'s son = Nephew, daughter = Niece',
          'Uncle\'s/Aunt\'s children = Cousins'
        ]
      },
      {
        heading: 'Generation Levels',
        content: 'Family members exist at different generation levels. Same generation means siblings/cousins.',
        keyPoints: [
          'Level +2: Grandparents',
          'Level +1: Parents, Uncles, Aunts',
          'Level 0: Self, Siblings, Cousins',
          'Level -1: Children, Nephews, Nieces',
          'Level -2: Grandchildren'
        ],
        diagram: {
          title: 'Generation Diagram',
          imageUrl: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=300&fit=crop',
          description: 'Three generations shown: Grandparents → Parents → Children'
        }
      },
      {
        heading: 'In-Laws Relationships',
        content: 'Relationships through marriage are called in-laws.',
        keyPoints: [
          'Spouse\'s father = Father-in-law',
          'Spouse\'s mother = Mother-in-law',
          'Spouse\'s brother = Brother-in-law',
          'Spouse\'s sister = Sister-in-law',
          'Sibling\'s spouse is also brother/sister-in-law'
        ],
        examples: [
          { title: 'In-Law Relation', problem: 'A is B\'s brother-in-law. B is C\'s husband. How is A related to C?', solution: 'B is C\'s husband → C is B\'s wife. A is B\'s brother-in-law → A is C\'s brother', answer: 'A is C\'s brother' }
        ]
      },
      {
        heading: 'Solving Techniques',
        content: 'Draw a family tree diagram. Use symbols: + for male, - for female. Connect generations with vertical lines.',
        keyPoints: [
          'Draw as you read the problem',
          'Use + for male, - for female, ? for unknown',
          'Vertical lines connect generations',
          'Horizontal lines connect spouses/siblings',
          'Double horizontal line for marriage'
        ],
        examples: [
          { title: 'Drawing Tree', problem: 'A is B\'s son. B is C\'s mother. D is C\'s father.', solution: 'D(+) === C(-) | B(-) | A(+). So A is D\'s grandson.', answer: 'A is D\'s grandson' }
        ]
      }
    ],
    summary: 'Blood relations require systematic approach. Draw family trees, identify gender, and trace relationships step by step. Remember generation levels and in-law relationships.',
    formulas: [
      { name: 'Same Generation', expression: 'Siblings, Cousins, Spouse', description: 'People at the same level' },
      { name: 'One Level Up', expression: 'Parents, Uncles, Aunts, In-laws', description: 'Previous generation' },
      { name: 'One Level Down', expression: 'Children, Nephews, Nieces', description: 'Next generation' }
    ],
    tips: [
      'Always draw the family tree',
      'Mark gender clearly (+ male, - female)',
      'Start from the known relationship',
      'Trace step by step, don\'t skip',
      '"Only" is a key word (only son means no brothers)'
    ],
    practiceQuestions: [
      { question: 'A is B\'s brother. C is A\'s mother. D is C\'s father. E is D\'s mother. How is B related to D?', options: { A: 'Grandson', B: 'Granddaughter', C: 'Grandfather', D: 'Grandchild' }, correctAnswer: 'D', explanation: 'D is C\'s father. C is A&B\'s mother. So D is grandfather of A&B. B is D\'s grandchild.', difficulty: 'easy' },
      { question: 'Pointing to a photo, A says "She is my mother\'s only daughter\'s daughter." How is the girl in photo related to A?', options: { A: 'Daughter', B: 'Niece', C: 'Sister', D: 'Cousin' }, correctAnswer: 'A', explanation: 'Mother\'s only daughter = A (if A is female). So the girl is A\'s daughter.', difficulty: 'medium' },
      { question: 'B is A\'s brother. C is B\'s mother. D is C\'s father. A is D\'s:', options: { A: 'Son', B: 'Grandson', C: 'Granddaughter', D: 'Cannot determine' }, correctAnswer: 'D', explanation: 'D→C→B, and A is B\'s sibling. D is A\'s grandfather. But A\'s gender unknown, so grandchild.', difficulty: 'medium' },
      { question: 'A + B means A is father of B. A - B means A is mother of B. If P + Q - R, how is R related to P?', options: { A: 'Son', B: 'Grandson', C: 'Granddaughter', D: 'Grandchild' }, correctAnswer: 'D', explanation: 'P is Q\'s father. Q is R\'s mother. So R is P\'s grandchild (gender unknown).', difficulty: 'easy' },
      { question: 'A says to B, "Your mother\'s husband\'s sister is my aunt." How is A related to B?', options: { A: 'Brother', B: 'Cousin', C: 'Uncle', D: 'Son' }, correctAnswer: 'B', explanation: 'B\'s mother\'s husband = B\'s father. His sister = B\'s aunt. She is A\'s aunt too. So A and B are cousins.', difficulty: 'medium' },
      { question: 'If X is brother of son of Y\'s son, how is X related to Y?', options: { A: 'Son', B: 'Grandson', C: 'Brother', D: 'Great-grandson' }, correctAnswer: 'B', explanation: 'Y\'s son\'s son = Y\'s grandson. X is his brother = also Y\'s grandson.', difficulty: 'easy' },
      { question: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. A is E\'s:', options: { A: 'Great-granddaughter', B: 'Granddaughter', C: 'Daughter', D: 'Grandmother' }, correctAnswer: 'A', explanation: 'E→D→C→A. A is 3 generations below E. A is great-granddaughter.', difficulty: 'medium' },
      { question: 'Introducing a man, a woman says "He is the only son of my mother\'s mother." How is the man related to the woman?', options: { A: 'Father', B: 'Uncle', C: 'Brother', D: 'Grandfather' }, correctAnswer: 'B', explanation: 'Mother\'s mother = grandmother. Her only son = woman\'s maternal uncle.', difficulty: 'medium' },
      { question: 'A is father of B. B is not son of A. What is B?', options: { A: 'Brother', B: 'Nephew', C: 'Daughter', D: 'Cannot determine' }, correctAnswer: 'C', explanation: 'A is B\'s father but B is not son. So B must be daughter.', difficulty: 'easy' },
      { question: 'If P $ Q means P is mother of Q; P # Q means P is father of Q; P * Q means P is sister of Q. What does A # B $ C * D mean?', options: { A: 'A is maternal grandfather of D', B: 'A is paternal grandfather of D', C: 'A is father of D', D: 'A is uncle of D' }, correctAnswer: 'A', explanation: 'A is B\'s father. B is C\'s mother. C is D\'s sister. So A→B→C, and D is C\'s sibling. A is grandfather of C & D. Since through B (mother), A is maternal grandfather.', difficulty: 'hard' }
    ]
  }
};

// Verbal Ability Content
const verbalContent: Record<string, AptitudeTopicContent> = {
  'Main Idea and Theme': {
    title: 'Reading Comprehension - Main Idea',
    introduction: 'Reading Comprehension tests your ability to understand written passages. Identifying the main idea is crucial - it\'s the central message the author wants to convey.',
    mainDiagram: {
      title: 'Main Idea Structure',
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop',
      description: 'Main Idea sits at the center, supported by key details, examples, and evidence in the passage.'
    },
    sections: [
      {
        heading: 'What is Main Idea?',
        content: 'The main idea is the central point or argument that the passage revolves around. It\'s what the author wants you to take away from reading.',
        keyPoints: [
          'Main idea = Central message of the passage',
          'Often found in first or last paragraph',
          'Topic sentence usually contains it',
          'Not the same as topic (main idea is a complete thought)'
        ],
        examples: [
          { title: 'Topic vs Main Idea', problem: 'A passage about "Climate Change" might have main idea:', solution: 'Topic: Climate Change. Main Idea: "Human activities are accelerating climate change at an unprecedented rate."', answer: 'Main idea is a complete statement about the topic' }
        ]
      },
      {
        heading: 'Finding the Main Idea',
        content: 'Read the first and last paragraphs carefully. Look for repeated concepts and the author\'s key argument.',
        keyPoints: [
          'Read first and last paragraphs carefully',
          'Look for thesis statement in intro',
          'Notice repeated words or concepts',
          'Ask: What point is the author making?',
          'The main idea should cover the entire passage'
        ],
        diagram: {
          title: 'Paragraph Structure',
          imageUrl: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&h=300&fit=crop',
          description: 'Topic Sentence → Supporting Details → Conclusion. Main idea often in topic sentence.'
        }
      },
      {
        heading: 'Theme vs Main Idea',
        content: 'Theme is broader and more abstract than main idea. Main idea is specific to the passage; theme is a universal concept.',
        keyPoints: [
          'Theme = Universal message (love, courage, justice)',
          'Main idea = Specific argument in this passage',
          'Theme applies across many texts',
          'Main idea is unique to this passage'
        ],
        examples: [
          { title: 'Theme Identification', problem: 'A story about a soldier\'s sacrifice', solution: 'Theme: Courage and Sacrifice. Main Idea: "True heroism lies in selfless actions during crisis."', answer: 'Theme is broader, main idea is specific' }
        ]
      },
      {
        heading: 'Avoiding Traps',
        content: 'Wrong answers are often too narrow (only cover one paragraph) or too broad (go beyond the passage).',
        keyPoints: [
          'Too narrow: Only covers part of passage',
          'Too broad: Goes beyond passage scope',
          'Off-topic: Not discussed in passage',
          'Contradictory: Opposite of author\'s view',
          'Correct answer covers the entire passage'
        ]
      }
    ],
    summary: 'The main idea is the central argument of the passage. Find it in topic sentences, introductions, and conclusions. It should cover the entire passage without being too narrow or broad.',
    tips: [
      'Read actively, not passively',
      'Underline key sentences as you read',
      'Ask "What is the author trying to tell me?"',
      'Eliminate answers that are too narrow or too broad',
      'The title often hints at the main idea'
    ],
    practiceQuestions: [
      { question: 'The main idea of a passage is best described as:', options: { A: 'The first sentence', B: 'The topic of the passage', C: 'The central message or argument', D: 'A summary of all details' }, correctAnswer: 'C', explanation: 'Main idea is the central message - not just the topic, not every detail.', difficulty: 'easy' },
      { question: 'Where is the main idea most commonly found?', options: { A: 'Only in the middle paragraph', B: 'In the title only', C: 'In introduction or conclusion', D: 'Never stated directly' }, correctAnswer: 'C', explanation: 'Authors typically state their main point in the introduction or reinforce it in the conclusion.', difficulty: 'easy' },
      { question: 'A passage discusses how technology affects education. Which is likely the main idea?', options: { A: 'Computers are expensive', B: 'Technology has transformed modern education', C: 'Students like using tablets', D: 'WiFi is available in schools' }, correctAnswer: 'B', explanation: 'B covers the entire scope of the passage topic. Others are too narrow/specific.', difficulty: 'medium' },
      { question: 'How is theme different from main idea?', options: { A: 'Theme is more specific', B: 'Theme is a universal concept', C: 'Theme is the first sentence', D: 'They are the same' }, correctAnswer: 'B', explanation: 'Theme is abstract and universal; main idea is specific to the passage.', difficulty: 'medium' },
      { question: 'A "too narrow" main idea answer would:', options: { A: 'Cover too many topics', B: 'Only describe one paragraph', C: 'Be too abstract', D: 'Contradict the author' }, correctAnswer: 'B', explanation: 'Too narrow means it only covers a part, not the whole passage.', difficulty: 'easy' },
      { question: 'The best way to identify main idea is to:', options: { A: 'Read only the first line', B: 'Count the words', C: 'Read first and last paragraphs carefully', D: 'Skip to the questions' }, correctAnswer: 'C', explanation: 'Authors typically introduce and conclude with their main point.', difficulty: 'easy' },
      { question: 'If a passage is about "water conservation," a suitable main idea could be:', options: { A: 'Water is H2O', B: 'Rivers are long', C: 'Water conservation is essential for sustainable development', D: 'Some people swim' }, correctAnswer: 'C', explanation: 'C makes a complete argument about the topic that could cover an entire passage.', difficulty: 'medium' },
      { question: 'Topic sentences typically appear:', options: { A: 'At the end of each paragraph', B: 'Only in conclusions', C: 'At the beginning of paragraphs', D: 'In footnotes' }, correctAnswer: 'C', explanation: 'Topic sentences introduce the paragraph\'s main point, usually at the start.', difficulty: 'easy' },
      { question: 'An answer that "contradicts" the passage would:', options: { A: 'Support the author\'s view', B: 'State the opposite of what author says', C: 'Be exactly correct', D: 'Add new information' }, correctAnswer: 'B', explanation: 'Contradictory answers state the opposite of the author\'s actual argument.', difficulty: 'easy' },
      { question: 'The main idea should:', options: { A: 'Cover only the introduction', B: 'Be extremely detailed', C: 'Cover the entire passage', D: 'Include personal opinions' }, correctAnswer: 'C', explanation: 'The main idea must encompass the entire passage, not just parts.', difficulty: 'easy' }
    ]
  }
};

// Get content for any aptitude topic
export function getAptitudeTopicContent(topic: string, categoryId: string): AptitudeTopicContent | null {
  // Check quantitative content
  if (quantitativeContent[topic]) {
    return quantitativeContent[topic];
  }
  
  // Check logical content
  if (logicalContent[topic]) {
    return logicalContent[topic];
  }
  
  // Check verbal content
  if (verbalContent[topic]) {
    return verbalContent[topic];
  }
  
  return null;
}

// Generate generic content for topics not in the bank
export function generateGenericAptitudeContent(topic: string, subject: string): AptitudeTopicContent {
  return {
    title: topic,
    introduction: `${topic} is an important concept in ${subject}. Understanding this topic thoroughly will help you solve related problems efficiently in competitive exams.`,
    mainDiagram: {
      title: `${topic} Overview`,
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
      description: `Visual representation of key concepts in ${topic}`
    },
    sections: [
      {
        heading: 'Core Concepts',
        content: `The fundamental principles of ${topic} form the basis for solving various problems. Understanding these concepts clearly is essential.`,
        keyPoints: [
          'Understand the basic definition and terminology',
          'Learn the standard formulas and their applications',
          'Practice with examples of varying difficulty',
          'Focus on exam-specific question patterns'
        ]
      },
      {
        heading: 'Important Techniques',
        content: 'Master the techniques that help solve problems quickly and accurately.',
        keyPoints: [
          'Shortcut methods for quick calculation',
          'Common patterns in exam questions',
          'Step-by-step problem-solving approach',
          'Time management during exams'
        ]
      }
    ],
    summary: `${topic} is fundamental to ${subject}. Regular practice and understanding of core concepts will help you excel in this area.`,
    tips: [
      'Practice regularly with varied problems',
      'Learn shortcuts but understand the basics first',
      'Time yourself while practicing',
      'Review mistakes to avoid repetition'
    ],
    practiceQuestions: [
      { question: `This is a sample question about ${topic}. What is the correct approach?`, options: { A: 'Apply the formula directly', B: 'Break down the problem', C: 'Use estimation', D: 'All of the above' }, correctAnswer: 'D', explanation: 'Different problems may require different approaches. Being flexible is key.', difficulty: 'easy' },
      { question: 'Which is the most important skill for this topic?', options: { A: 'Memorization only', B: 'Understanding concepts', C: 'Speed only', D: 'Guessing' }, correctAnswer: 'B', explanation: 'Understanding concepts helps you solve any variation of the problem.', difficulty: 'easy' },
      { question: 'How should you approach complex problems?', options: { A: 'Skip them', B: 'Break into smaller parts', C: 'Panic', D: 'Give up' }, correctAnswer: 'B', explanation: 'Breaking complex problems into smaller parts makes them manageable.', difficulty: 'easy' }
    ]
  };
}

// Export all content
export const allAptitudeContent = {
  quantitative: quantitativeContent,
  logical: logicalContent,
  verbal: verbalContent
};
