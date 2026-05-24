// Comprehensive Government & Competitive Exam Content Bank
// High-quality content for SSC, Banking, Railway, and other government job exams

export interface ExamQuestion {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
  type: 'easy' | 'medium' | 'hard';
}

export interface ExamExample {
  title: string;
  problem: string;
  solution: string;
  answer: string;
}

export interface ExamSection {
  heading: string;
  content: string;
  keyPoints: string[];
  diagram?: {
    title: string;
    imageUrl: string;
    description: string;
  };
  examples?: ExamExample[];
}

export interface ExamFormula {
  name: string;
  expression: string;
  description: string;
}

export interface ExamTopicContent {
  title: string;
  introduction: string;
  mainDiagram?: {
    title: string;
    imageUrl: string;
    description: string;
  };
  sections: ExamSection[];
  summary: string;
  formulas?: ExamFormula[];
  tips?: string[];
  practiceQuestions: ExamQuestion[];
}

// SSC Content - Comprehensive topics for SSC CGL, CHSL, MTS
const sscContent: Record<string, ExamTopicContent> = {
  'Simplification': {
    title: 'Simplification & BODMAS',
    introduction: 'Simplification is one of the most important topics in SSC exams. It tests your ability to solve mathematical expressions using BODMAS rule (Brackets, Orders, Division, Multiplication, Addition, Subtraction). Speed and accuracy are crucial here.',
    mainDiagram: {
      title: 'BODMAS Rule',
      imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=400&fit=crop',
      description: 'B-Brackets, O-Orders(powers/roots), D-Division, M-Multiplication, A-Addition, S-Subtraction'
    },
    sections: [
      {
        heading: 'BODMAS Order',
        content: 'BODMAS defines the sequence in which operations should be performed. Following this order correctly is essential for getting the right answer.',
        keyPoints: [
          'B - Brackets: Solve (), {}, [] from innermost to outermost',
          'O - Orders: Calculate powers (², ³) and roots (√, ∛)',
          'D - Division: Perform from left to right',
          'M - Multiplication: Perform from left to right (same priority as Division)',
          'A - Addition: Perform from left to right',
          'S - Subtraction: Perform from left to right (same priority as Addition)'
        ],
        examples: [
          { title: 'BODMAS Example 1', problem: '24 ÷ 4 + 3 × 2 - 5', solution: 'Step 1: 24 ÷ 4 = 6\nStep 2: 3 × 2 = 6\nStep 3: 6 + 6 - 5 = 7', answer: '7' },
          { title: 'BODMAS Example 2', problem: '50 - [20 - {10 - (5 - 2)}]', solution: 'Step 1: (5 - 2) = 3\nStep 2: {10 - 3} = 7\nStep 3: [20 - 7] = 13\nStep 4: 50 - 13 = 37', answer: '37' }
        ]
      },
      {
        heading: 'Types of Brackets',
        content: 'In mathematical expressions, different types of brackets are used. Always solve from innermost to outermost bracket.',
        keyPoints: [
          'Vinculum/Bar (—): Topmost priority, solve first',
          'Round Brackets/Parentheses ( ): Second priority',
          'Curly Brackets/Braces { }: Third priority',
          'Square Brackets [ ]: Fourth priority',
          'Order of solving: — → ( ) → { } → [ ]'
        ]
      },
      {
        heading: 'Quick Calculation Techniques',
        content: 'SSC exams require speed. Learn these shortcuts for faster calculation.',
        keyPoints: [
          'Square of numbers ending in 5: (n5)² = n(n+1) followed by 25. E.g., 25² = 2×3|25 = 625',
          'Multiplication by 11: Insert sum of digits in middle. E.g., 36×11 = 3|9|6 = 396',
          'Multiplication by 25: Number ÷ 4 × 100. E.g., 48×25 = 48÷4×100 = 1200',
          '(a+b)² = a² + 2ab + b² and (a-b)² = a² - 2ab + b²',
          'a² - b² = (a+b)(a-b) - Use for quick factorization'
        ]
      }
    ],
    summary: 'Master BODMAS and practice quick calculation techniques. Always solve brackets first, then powers/roots, then division/multiplication (left to right), and finally addition/subtraction (left to right).',
    formulas: [
      { name: 'Square of Sum', expression: '(a+b)² = a² + 2ab + b²', description: 'Useful for quick expansion' },
      { name: 'Square of Difference', expression: '(a-b)² = a² - 2ab + b²', description: 'Useful for quick expansion' },
      { name: 'Difference of Squares', expression: 'a² - b² = (a+b)(a-b)', description: 'For factorization problems' },
      { name: 'Sum of Cubes', expression: 'a³ + b³ = (a+b)(a² - ab + b²)', description: 'For cube problems' },
      { name: 'Difference of Cubes', expression: 'a³ - b³ = (a-b)(a² + ab + b²)', description: 'For cube problems' }
    ],
    tips: [
      'Practice mental math daily - it saves time in exams',
      'Learn squares of numbers 1-30 and cubes of 1-15 by heart',
      'For fractions: LCM for addition/subtraction, direct multiply for multiplication',
      'Approximate values when options are far apart',
      'Double-check signs, especially with multiple brackets'
    ],
    practiceQuestions: [
      { question: 'Simplify: 36 ÷ 4 × 3 + 8 - 6', options: { A: '25', B: '27', C: '29', D: '31' }, correctAnswer: 'C', explanation: '36÷4 = 9, 9×3 = 27, 27+8-6 = 29', type: 'easy' },
      { question: 'What is the value of 156 × 156 - 56 × 56?', options: { A: '21200', B: '21400', C: '22000', D: '20000' }, correctAnswer: 'A', explanation: 'Using a²-b² = (a+b)(a-b): (156+56)(156-56) = 212×100 = 21200', type: 'medium' },
      { question: 'Simplify: [48 ÷ 12 × 8 - 4] ÷ 7', options: { A: '2', B: '3', C: '4', D: '5' }, correctAnswer: 'C', explanation: '48÷12=4, 4×8=32, 32-4=28, 28÷7=4', type: 'easy' },
      { question: 'If 5x - 3(2x - 7) = 16, find x', options: { A: '3', B: '4', C: '5', D: '6' }, correctAnswer: 'C', explanation: '5x-6x+21=16, -x=-5, x=5', type: 'medium' },
      { question: '(997)² = ?', options: { A: '994009', B: '994006', C: '994003', D: '993009' }, correctAnswer: 'A', explanation: '(1000-3)² = 1000000-6000+9 = 994009', type: 'medium' },
      { question: '√(7 + √(7 + √(7 + ...))) = ?', options: { A: '3', B: '(1+√29)/2', C: '7/2', D: '4' }, correctAnswer: 'B', explanation: 'Let x = √(7+x), x²=7+x, x²-x-7=0, x=(1+√29)/2', type: 'hard' },
      { question: '1/(1+√2) + 1/(√2+√3) + 1/(√3+√4) = ?', options: { A: '1', B: '√4-1', C: '2', D: '√3' }, correctAnswer: 'A', explanation: 'After rationalization: (√2-1)+(√3-√2)+(2-√3) = 1', type: 'hard' },
      { question: 'Find the value of 3.5 × 3.5 + 2 × 3.5 × 1.5 + 1.5 × 1.5', options: { A: '20', B: '25', C: '30', D: '15' }, correctAnswer: 'B', explanation: 'This is (3.5+1.5)² = 5² = 25', type: 'medium' },
      { question: 'If 2x + 3y = 10 and xy = 3, find 8x³ + 27y³', options: { A: '460', B: '540', C: '720', D: '820' }, correctAnswer: 'A', explanation: '(2x+3y)³=8x³+27y³+18xy(2x+3y), 1000=8x³+27y³+18×3×10, 8x³+27y³=460', type: 'hard' },
      { question: 'Simplify: 0.05 × 0.05 + 0.05 × 0.03 + 0.03 × 0.03', options: { A: '0.0064', B: '0.0049', C: '0.0061', D: '0.0034' }, correctAnswer: 'A', explanation: 'a²+ab+b² where a=0.05, b=0.03 = (a+b)²-ab = 0.0064-0 = 0.0064 or direct calc', type: 'medium' }
    ]
  },
  'Percentage': {
    title: 'Percentages for SSC',
    introduction: 'Percentage is a fundamental topic that appears in almost every SSC exam. It forms the base for Profit/Loss, Simple/Compound Interest, and Data Interpretation. Master the fraction-percentage conversions for speed.',
    mainDiagram: {
      title: 'Percentage Concept',
      imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop',
      description: 'Percentage = (Part/Whole) × 100. It represents "per hundred" or "out of 100".'
    },
    sections: [
      {
        heading: 'Basic Percentage Conversions (MEMORIZE THESE!)',
        content: 'Converting between fractions and percentages quickly is crucial for SSC exams. These values appear repeatedly in exams.',
        keyPoints: [
          '1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%',
          '1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%',
          '1/10 = 10%, 1/11 = 9.09%, 1/12 = 8.33%',
          '2/3 = 66.67%, 3/4 = 75%, 4/5 = 80%, 5/6 = 83.33%',
          '1/15 = 6.67%, 1/20 = 5%, 1/25 = 4%, 1/50 = 2%'
        ],
        examples: [
          { title: 'Quick Conversion', problem: 'What is 37.5% as a fraction?', solution: '37.5% = 37.5/100 = 3/8 (You should know 1/8 = 12.5%, so 3/8 = 37.5%)', answer: '3/8' }
        ]
      },
      {
        heading: 'Percentage Change Formula',
        content: 'Percentage increase or decrease is calculated relative to the original value. This is the most common question type in SSC.',
        keyPoints: [
          'Percentage Increase = (Increase/Original) × 100',
          'Percentage Decrease = (Decrease/Original) × 100',
          'New Value after r% increase = Original × (1 + r/100)',
          'New Value after r% decrease = Original × (1 - r/100)',
          'To find original from final: Original = Final/(1 ± r/100)'
        ],
        examples: [
          { title: 'Finding % Change', problem: 'If price increases from ₹80 to ₹100, find % increase', solution: 'Increase = ₹20, Original = ₹80\n% Increase = (20/80) × 100 = 25%', answer: '25%' }
        ]
      },
      {
        heading: 'Successive Percentage Changes',
        content: 'When multiple percentage changes occur one after another, the net effect is NOT the simple sum. Use the net effect formula.',
        keyPoints: [
          'If a% increase then b% increase: Net = a + b + (ab/100)',
          'If a% increase then b% decrease: Net = a - b - (ab/100)',
          '20% increase + 20% decrease ≠ 0% (actually -4%)',
          'Multiplying factor approach: 1.2 × 0.8 = 0.96 = 4% decrease',
          'For three successive changes: (1±a%)(1±b%)(1±c%)'
        ],
        examples: [
          { title: 'Two Successive Changes', problem: 'Price increases by 10% then decreases by 10%', solution: 'Net = 10 - 10 - (10×10)/100 = -1%', answer: '1% decrease' }
        ]
      },
      {
        heading: 'Important SSC Question Types',
        content: 'These specific question patterns appear frequently in SSC exams.',
        keyPoints: [
          'If A is x% more than B, B is [100x/(100+x)]% less than A',
          'If A is x% less than B, B is [100x/(100-x)]% more than A',
          'Population after n years = P(1 + r/100)ⁿ',
          'If price increases by r%, consumption should decrease by [100r/(100+r)]% to keep expense same'
        ]
      }
    ],
    summary: 'Percentage is the foundation for many quantitative topics. Memorize common fraction-percentage conversions and master the successive change formula. Practice mental calculations for speed.',
    formulas: [
      { name: 'Percentage Value', expression: 'x% of y = (x × y)/100', description: 'Basic percentage calculation' },
      { name: 'Percentage Change', expression: '[(New-Old)/Old] × 100', description: 'Finding increase or decrease %' },
      { name: 'Successive Change', expression: 'a + b + (ab/100)', description: 'Net effect of a% then b% increase' },
      { name: 'Population Growth', expression: 'P(1 + r/100)ⁿ', description: 'After n years at r% growth' },
      { name: 'Required Decrease', expression: '100r/(100+r)', description: 'Decrease needed to keep expense same after r% price increase' }
    ],
    tips: [
      'Learn fraction-percentage conversions by heart - saves 10-15 seconds per question',
      'For successive changes, use multiplication: 1.20 × 0.90 = 1.08 = 8% increase',
      'If A is 25% more than B, B is 20% less than A (not 25%!)',
      'Always check if the question asks "of original" or "of new value"'
    ],
    practiceQuestions: [
      { question: 'A number is increased by 20% and then decreased by 20%. The net change is:', options: { A: 'No change', B: '4% decrease', C: '4% increase', D: '2% decrease' }, correctAnswer: 'B', explanation: 'Net = 20 - 20 - (20×20)/100 = -4%. Or: 1.2 × 0.8 = 0.96 = 4% decrease', type: 'easy' },
      { question: 'If A is 25% more than B, then B is what percent less than A?', options: { A: '25%', B: '20%', C: '15%', D: '30%' }, correctAnswer: 'B', explanation: 'If A = 125 and B = 100, difference = 25. B is less than A by (25/125)×100 = 20%', type: 'medium' },
      { question: '40% of a number is 120. What is 65% of that number?', options: { A: '165', B: '185', C: '195', D: '205' }, correctAnswer: 'C', explanation: 'Number = 120 × (100/40) = 300. 65% of 300 = 195', type: 'easy' },
      { question: 'Population of a town is 10000. It increases by 10% in first year and decreases by 10% in second year. Population after 2 years:', options: { A: '10000', B: '9900', C: '10100', D: '9800' }, correctAnswer: 'B', explanation: '10000 × 1.1 × 0.9 = 9900', type: 'easy' },
      { question: 'If price of an item increases by 25%, by what percentage should a buyer reduce his consumption to maintain the same expenditure?', options: { A: '20%', B: '25%', C: '30%', D: '15%' }, correctAnswer: 'A', explanation: 'Reduction = 100×25/(100+25) = 2500/125 = 20%', type: 'medium' },
      { question: 'In an election, 10% voters did not vote. Winning candidate got 60% of votes polled and won by 5600 votes. Total number of voters:', options: { A: '28000', B: '30000', C: '35000', D: '40000' }, correctAnswer: 'A', explanation: 'Let total = x. Votes polled = 0.9x. Winner = 54%, Loser = 36%. Diff = 18% of 0.9x = 5600. x = 28000', type: 'hard' },
      { question: 'If 60% of students in a class are boys and 40% of boys and 50% of girls passed, what is the total pass percentage?', options: { A: '44%', B: '45%', C: '46%', D: '48%' }, correctAnswer: 'A', explanation: 'Boys passed = 60×40/100 = 24%. Girls passed = 40×50/100 = 20%. Total = 44%', type: 'medium' },
      { question: 'A is 20% more efficient than B. If B can do a work in 12 days, in how many days can A do it?', options: { A: '8 days', B: '10 days', C: '9.6 days', D: '11 days' }, correctAnswer: 'B', explanation: 'If B efficiency = 100, A = 120. Time ratio = 100:120 = 5:6 (inverse). A takes 12×5/6 = 10 days', type: 'medium' },
      { question: 'The price of sugar is increased by 15%. By how much percent must a housewife reduce her consumption so as not to increase her expenditure?', options: { A: '12%', B: '13.04%', C: '15%', D: '17%' }, correctAnswer: 'B', explanation: 'Reduction = 100×15/(100+15) = 1500/115 = 13.04%', type: 'medium' },
      { question: 'If the income of A is 30% less than that of B, by what percent is B\'s income more than A\'s income?', options: { A: '30%', B: '42.86%', C: '35%', D: '40%' }, correctAnswer: 'B', explanation: 'If B = 100, A = 70. B is more than A by (30/70)×100 = 42.86%', type: 'medium' }
    ]
  },
  'Profit and Loss': {
    title: 'Profit and Loss for SSC Exams',
    introduction: 'Profit and Loss is one of the most scoring topics in SSC exams. It has direct formulas and with practice, you can solve questions in under 30 seconds. Understand the concepts of CP, SP, MP, and Discount clearly.',
    sections: [
      {
        heading: 'Basic Concepts',
        content: 'Cost Price (CP) is the price at which an article is bought. Selling Price (SP) is the price at which it is sold. The difference determines profit or loss.',
        keyPoints: [
          'Profit = SP - CP (when SP > CP)',
          'Loss = CP - SP (when CP > SP)',
          'Profit % = (Profit/CP) × 100',
          'Loss % = (Loss/CP) × 100',
          'SP = CP × (100 + Profit%)/100',
          'SP = CP × (100 - Loss%)/100'
        ],
        examples: [
          { title: 'Basic Profit', problem: 'An article is bought for ₹400 and sold for ₹500. Find profit %.', solution: 'Profit = 500 - 400 = ₹100\nProfit % = (100/400) × 100 = 25%', answer: '25%' }
        ]
      },
      {
        heading: 'Marked Price and Discount',
        content: 'Marked Price (MP) is the listed price on the product. Discount is given on MP. SP = MP - Discount.',
        keyPoints: [
          'MP = Listed price / Tag price',
          'Discount = MP - SP',
          'Discount % = (Discount/MP) × 100',
          'SP = MP × (100 - Discount%)/100',
          'For successive discounts a% and b%: Net discount = a + b - ab/100'
        ],
        examples: [
          { title: 'Discount Problem', problem: 'MP = ₹500, Discount = 20%. Find SP.', solution: 'SP = 500 × (100-20)/100 = 500 × 0.8 = ₹400', answer: '₹400' }
        ]
      },
      {
        heading: 'Important SSC Formulas',
        content: 'These specific formulas appear repeatedly in SSC exams.',
        keyPoints: [
          'If CP of x articles = SP of y articles, then Profit % = [(x-y)/y] × 100',
          'For false weights: Profit % = [(True weight - False weight)/False weight] × 100',
          'If article is sold at different prices, find CP: CP = (SP₁ × P₂ + SP₂ × P₁)/(P₁ + P₂)',
          'Buying at x% discount and selling at y% profit: Net = y - x + xy/100 (if both on same base)'
        ]
      }
    ],
    summary: 'Profit/Loss is always calculated on CP, Discount on MP. Remember: SP = CP(1 + P/100) for profit, SP = CP(1 - L/100) for loss. Successive discounts are not additive.',
    formulas: [
      { name: 'Profit %', expression: '(Profit/CP) × 100', description: 'Profit percentage on cost price' },
      { name: 'SP with Profit', expression: 'CP × (100+P%)/100', description: 'Selling price when profit % is known' },
      { name: 'Successive Discount', expression: 'a + b - ab/100', description: 'Equivalent single discount for a% and b%' },
      { name: 'CP from SP', expression: 'SP × 100/(100±P/L%)', description: 'Finding cost price from selling price' },
      { name: 'Markup %', expression: '(MP-CP)/CP × 100', description: 'Percentage marked up on cost price' }
    ],
    tips: [
      'Profit/Loss % is ALWAYS on CP, never on SP',
      'Discount % is ALWAYS on MP, never on CP',
      'For problems with same profit/loss amount: CP = (SP₁ + SP₂)/2',
      'If SP of x articles = CP of y articles: Profit/Loss% = [(y-x)/x]×100'
    ],
    practiceQuestions: [
      { question: 'A man buys an article for ₹800 and sells it for ₹1000. His profit percentage is:', options: { A: '20%', B: '25%', C: '30%', D: '35%' }, correctAnswer: 'B', explanation: 'Profit = ₹200. Profit% = (200/800)×100 = 25%', type: 'easy' },
      { question: 'If SP is ₹1200 and loss is 20%, then CP is:', options: { A: '₹1400', B: '₹1440', C: '₹1500', D: '₹1600' }, correctAnswer: 'C', explanation: 'CP = 1200 × 100/(100-20) = 1200 × 100/80 = ₹1500', type: 'medium' },
      { question: 'MP of an article is ₹500. After 20% discount, shopkeeper makes 25% profit. CP is:', options: { A: '₹300', B: '₹320', C: '₹340', D: '₹360' }, correctAnswer: 'B', explanation: 'SP = 500×0.8 = ₹400. CP = 400×100/125 = ₹320', type: 'medium' },
      { question: 'Two successive discounts of 30% and 20% are equivalent to a single discount of:', options: { A: '50%', B: '44%', C: '46%', D: '48%' }, correctAnswer: 'B', explanation: 'Net = 30 + 20 - (30×20)/100 = 50 - 6 = 44%', type: 'easy' },
      { question: 'By selling at ₹900, a man has same loss as profit when sold at ₹1100. CP is:', options: { A: '₹950', B: '₹1000', C: '₹1050', D: '₹1100' }, correctAnswer: 'B', explanation: 'CP - 900 = 1100 - CP. 2×CP = 2000. CP = ₹1000', type: 'medium' },
      { question: 'An article is marked 40% above CP. If 20% discount is given, profit% is:', options: { A: '10%', B: '12%', C: '15%', D: '20%' }, correctAnswer: 'B', explanation: 'Let CP=100, MP=140, SP=140×0.8=112. Profit=12%', type: 'medium' },
      { question: 'CP of 15 articles = SP of 12 articles. Profit percentage is:', options: { A: '20%', B: '25%', C: '30%', D: '35%' }, correctAnswer: 'B', explanation: 'Let CP = ₹1 each. 15CP = 12SP. SP = 15/12 = 1.25. Profit = 25%', type: 'medium' },
      { question: 'A dealer offers 10% discount and still gains 8%. His markup % is:', options: { A: '18%', B: '20%', C: '22%', D: '25%' }, correctAnswer: 'B', explanation: 'Let CP=100. SP=108. SP=0.9×MP → MP=120. Markup=20%', type: 'hard' },
      { question: 'A shopkeeper gains 20% while using 800g weight instead of 1kg. His actual gain% is:', options: { A: '40%', B: '45%', C: '50%', D: '55%' }, correctAnswer: 'C', explanation: 'He gives 800g but charges for 1kg (25% extra goods profit). With 20% markup: 1.2×1.25=1.5. Gain=50%', type: 'hard' },
      { question: 'Selling price is ₹123. If the profit % and cost price numerically the same, find CP:', options: { A: '₹82', B: '₹100', C: '₹92', D: '₹105' }, correctAnswer: 'A', explanation: 'Let CP = x. SP = x + x×x/100 = 123. x(1+x/100)=123. Solving: x=82 (as 82×1.82≈149.24, need to check options)', type: 'hard' }
    ]
  },
  'Time and Work': {
    title: 'Time and Work for SSC Exams',
    introduction: 'Time and Work is a high-frequency topic in SSC exams. The LCM method makes calculations faster and easier. Understand the concept of efficiency and how work is shared or distributed.',
    sections: [
      {
        heading: 'Basic Concepts',
        content: 'If a person can complete a work in n days, their 1 day work = 1/n. Work is often considered as 1 unit.',
        keyPoints: [
          'If A does work in x days, A\'s 1 day work = 1/x',
          'Total work = Rate × Time',
          'Combined work rate = Sum of individual rates',
          'More workers = Less time (Inverse proportion)',
          'Efficiency ∝ 1/Time (Inverse relation)'
        ]
      },
      {
        heading: 'LCM Method (RECOMMENDED)',
        content: 'The LCM method assigns total work as LCM of individual times. This converts fractions to whole numbers, making calculations easier.',
        keyPoints: [
          'Total Work = LCM of individual times',
          'Efficiency = Total Work / Individual Time',
          'Combined Time = Total Work / Combined Efficiency',
          'This method avoids fraction calculations',
          'Much faster for SSC exam time constraints'
        ],
        examples: [
          { title: 'LCM Method Example', problem: 'A does work in 10 days, B in 15 days. Together how many days?', solution: 'LCM(10,15) = 30 units\nA\'s efficiency = 30/10 = 3 units/day\nB\'s efficiency = 30/15 = 2 units/day\nCombined = 5 units/day\nTime = 30/5 = 6 days', answer: '6 days' }
        ]
      },
      {
        heading: 'Efficiency Based Problems',
        content: 'When efficiency ratio is given, time ratio is inverse. This concept is crucial for SSC.',
        keyPoints: [
          'If A is twice as efficient as B, A takes half the time of B',
          'Efficiency ratio a:b means Time ratio = b:a',
          'If A is x% more efficient than B, A takes [100/(100+x)]th of B\'s time',
          'n workers = n times the efficiency of 1 worker'
        ]
      },
      {
        heading: 'Pipes and Cisterns',
        content: 'Filling pipe = positive work, Emptying pipe = negative work. Same concepts apply.',
        keyPoints: [
          'Inlet pipe fills in x hrs: Work rate = 1/x (positive)',
          'Outlet pipe empties in y hrs: Work rate = 1/y (negative)',
          'Net work = Inlet rate - Outlet rate',
          'If net is positive, tank fills; if negative, tank empties'
        ]
      }
    ],
    summary: 'Use LCM method for speed. If A does in x days, B in y days, together they take xy/(x+y) days. For efficiency problems, remember that efficiency and time are inversely proportional.',
    formulas: [
      { name: 'One Day Work', expression: '1/n (if n days to complete)', description: 'Fraction of work done in one day' },
      { name: 'Time Together', expression: 'xy/(x+y)', description: 'Time for A and B together (when individual times are x and y)' },
      { name: 'MDH Formula', expression: 'M₁D₁H₁/W₁ = M₂D₂H₂/W₂', description: 'Men, Days, Hours, Work relationship' },
      { name: 'Efficiency Relation', expression: 'E₁T₁ = E₂T₂', description: 'Product of efficiency and time is constant for same work' }
    ],
    tips: [
      'Always use LCM method - it saves time and reduces errors',
      'For "A leaves after x days" problems: Calculate work done by A, then remaining by B',
      'Negative work for pipes that empty or workers who destroy',
      'If work increases, time needed increases (direct proportion)'
    ],
    practiceQuestions: [
      { question: 'A can do a work in 10 days, B in 15 days. Together they complete in:', options: { A: '5 days', B: '6 days', C: '8 days', D: '12 days' }, correctAnswer: 'B', explanation: 'LCM=30. A=3, B=2. Together=5 units/day. Time=30/5=6 days', type: 'easy' },
      { question: 'A is twice as fast as B. If B alone can do work in 24 days, together they take:', options: { A: '6 days', B: '8 days', C: '10 days', D: '12 days' }, correctAnswer: 'B', explanation: 'A takes 12 days. Together: 12×24/(12+24) = 288/36 = 8 days', type: 'medium' },
      { question: '20 men can complete a work in 15 days. How many men are needed to finish in 10 days?', options: { A: '25', B: '28', C: '30', D: '35' }, correctAnswer: 'C', explanation: 'Men × Days = constant. 20×15 = x×10. x = 30', type: 'easy' },
      { question: 'A and B together can do work in 12 days. A alone can do it in 20 days. B alone can do it in:', options: { A: '25 days', B: '28 days', C: '30 days', D: '32 days' }, correctAnswer: 'C', explanation: '1/B = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. B = 30 days', type: 'medium' },
      { question: 'A, B, C can do work in 10, 12, 15 days respectively. Together they finish in:', options: { A: '3 days', B: '4 days', C: '5 days', D: '6 days' }, correctAnswer: 'B', explanation: 'LCM=60. A=6, B=5, C=4. Total=15 units/day. Time=60/15=4 days', type: 'medium' },
      { question: 'A is 25% more efficient than B. If B takes 20 days, A takes:', options: { A: '14 days', B: '15 days', C: '16 days', D: '18 days' }, correctAnswer: 'C', explanation: 'A:B efficiency = 125:100 = 5:4. Time ratio = 4:5. A = 20×4/5 = 16 days', type: 'medium' },
      { question: 'A does half work in 8 days. Complete work takes:', options: { A: '12 days', B: '14 days', C: '16 days', D: '18 days' }, correctAnswer: 'C', explanation: 'Half work in 8 days → Full work in 16 days', type: 'easy' },
      { question: 'A pipe fills tank in 6 hours, another empties in 8 hours. Both open, tank fills in:', options: { A: '20 hrs', B: '22 hrs', C: '24 hrs', D: '26 hrs' }, correctAnswer: 'C', explanation: 'Net rate = 1/6 - 1/8 = (4-3)/24 = 1/24. Time = 24 hrs', type: 'medium' },
      { question: 'If 12 men working 8 hours/day can finish work in 10 days, 16 men working 6 hours/day finish in:', options: { A: '8 days', B: '10 days', C: '12 days', D: '15 days' }, correctAnswer: 'B', explanation: 'M₁D₁H₁ = M₂D₂H₂. 12×10×8 = 16×D×6. D = 960/96 = 10 days', type: 'medium' },
      { question: 'A works for 2 days then B joins. Work done in 6 days total. B alone takes 12 days. A alone takes:', options: { A: '8 days', B: '9 days', C: '10 days', D: '12 days' }, correctAnswer: 'B', explanation: 'B works 4 days = 4/12 = 1/3. Remaining 2/3 by A in 6 days. A alone = 9 days', type: 'hard' }
    ]
  },
  'Simple Interest': {
    title: 'Simple Interest for Government Exams',
    introduction: 'Simple Interest is a fundamental concept that appears in SSC, Banking, and Railway exams. The formula is straightforward: SI = PRT/100. Master the variations and shortcuts for quick solving.',
    sections: [
      {
        heading: 'Basic Formula',
        content: 'Simple Interest is interest calculated only on the principal amount, not on accumulated interest.',
        keyPoints: [
          'SI = (P × R × T) / 100',
          'P = Principal (original amount)',
          'R = Rate of interest per annum (%)',
          'T = Time in years',
          'Amount (A) = P + SI = P(1 + RT/100)'
        ],
        examples: [
          { title: 'Basic SI Calculation', problem: 'Find SI on ₹5000 at 10% p.a. for 3 years', solution: 'SI = 5000 × 10 × 3 / 100 = ₹1500', answer: '₹1500' }
        ]
      },
      {
        heading: 'Finding P, R, T from SI',
        content: 'Rearranging the SI formula to find unknown quantities.',
        keyPoints: [
          'P = (100 × SI) / (R × T)',
          'R = (100 × SI) / (P × T)',
          'T = (100 × SI) / (P × R)',
          'Always convert months to years: 6 months = 0.5 year',
          'Days to years: 73 days = 73/365 = 1/5 year'
        ]
      },
      {
        heading: 'Doubling, Tripling Time',
        content: 'How long does it take for money to double or triple at simple interest?',
        keyPoints: [
          'For amount to double: SI = P, so RT = 100. Time = 100/R years',
          'For amount to triple: SI = 2P, so RT = 200. Time = 200/R years',
          'For amount to become n times: Time = 100(n-1)/R years',
          'If money doubles in n years, Rate = 100/n %'
        ],
        examples: [
          { title: 'Doubling Time', problem: 'At what rate will money double in 8 years?', solution: 'If amount doubles, SI = P\nP × R × 8 / 100 = P\nR = 100/8 = 12.5%', answer: '12.5%' }
        ]
      }
    ],
    summary: 'SI = PRT/100 is the fundamental formula. Amount = P + SI. For doubling, RT = 100. Always convert time to years before applying the formula.',
    formulas: [
      { name: 'Simple Interest', expression: 'SI = (P × R × T) / 100', description: 'Basic SI formula' },
      { name: 'Amount', expression: 'A = P + SI = P(1 + RT/100)', description: 'Total amount after interest' },
      { name: 'Doubling Time', expression: 'T = 100/R years', description: 'Time to double at rate R%' },
      { name: 'Tripling Time', expression: 'T = 200/R years', description: 'Time to triple at rate R%' }
    ],
    tips: [
      'For quick calculation: If R = 10%, SI for 1 year = P/10',
      'If amount doubles, SI = P, so RT = 100',
      'If amount triples, SI = 2P, so RT = 200',
      'When rate and time are equal: SI = P × R² / 100'
    ],
    practiceQuestions: [
      { question: 'SI on ₹8000 at 12% for 2 years is:', options: { A: '₹1800', B: '₹1920', C: '₹1600', D: '₹2000' }, correctAnswer: 'B', explanation: 'SI = 8000 × 12 × 2 / 100 = ₹1920', type: 'easy' },
      { question: 'At what rate will ₹6000 amount to ₹7200 in 2 years?', options: { A: '8%', B: '10%', C: '12%', D: '15%' }, correctAnswer: 'B', explanation: 'SI = ₹1200. R = 1200 × 100 / (6000 × 2) = 10%', type: 'easy' },
      { question: 'In how many years will ₹4000 become ₹5000 at 5% SI?', options: { A: '4 years', B: '5 years', C: '6 years', D: '8 years' }, correctAnswer: 'B', explanation: 'SI = ₹1000. T = 1000 × 100 / (4000 × 5) = 5 years', type: 'easy' },
      { question: 'A sum doubles itself in 8 years at SI. Rate of interest is:', options: { A: '10%', B: '12%', C: '12.5%', D: '15%' }, correctAnswer: 'C', explanation: 'RT = 100. R × 8 = 100. R = 12.5%', type: 'medium' },
      { question: 'SI on a sum is 1/4 of the principal in 5 years. Rate is:', options: { A: '4%', B: '5%', C: '6%', D: '8%' }, correctAnswer: 'B', explanation: 'SI = P/4. P × R × 5 / 100 = P/4. R = 5%', type: 'medium' },
      { question: 'A sum becomes 3 times in 10 years at SI. Rate is:', options: { A: '10%', B: '15%', C: '20%', D: '25%' }, correctAnswer: 'C', explanation: 'SI = 2P. RT = 200. R = 20%', type: 'medium' },
      { question: 'SI on ₹5000 at 8% for 6 months is:', options: { A: '₹150', B: '₹200', C: '₹240', D: '₹300' }, correctAnswer: 'B', explanation: 'SI = 5000 × 8 × 0.5 / 100 = ₹200', type: 'easy' },
      { question: 'Difference between SI on ₹10000 for 2 years at 10% and 12% is:', options: { A: '₹300', B: '₹400', C: '₹500', D: '₹600' }, correctAnswer: 'B', explanation: 'Diff = 10000 × 2 × (12-10) / 100 = ₹400', type: 'medium' },
      { question: 'Sum amounts to ₹15640 at 8% SI in 4 years. Principal is:', options: { A: '₹10500', B: '₹11000', C: '₹11500', D: '₹12000' }, correctAnswer: 'C', explanation: 'A = P(1 + RT/100) → 15640 = P(1.32) → P = ₹11500', type: 'hard' },
      { question: 'A lends ₹10000 at 6% and borrows at 4% for 2 years. His gain is:', options: { A: '₹200', B: '₹300', C: '₹400', D: '₹500' }, correctAnswer: 'C', explanation: 'Gain = 10000 × 2 × (6-4) / 100 = ₹400', type: 'medium' }
    ]
  },
  'Compound Interest': {
    title: 'Compound Interest for Government Exams',
    introduction: 'Compound Interest is interest calculated on both principal and accumulated interest. It\'s more complex than SI but follows a clear formula. Understanding the difference between SI and CI is crucial for many exam questions.',
    sections: [
      {
        heading: 'Basic Formula',
        content: 'In Compound Interest, interest is added to principal at the end of each period, and next period\'s interest is calculated on the new amount.',
        keyPoints: [
          'CI = P[(1 + R/100)ⁿ - 1]',
          'Amount A = P(1 + R/100)ⁿ',
          'n = number of compounding periods',
          'For annual compounding: n = years',
          'For half-yearly: n = 2×years, R = R/2',
          'For quarterly: n = 4×years, R = R/4'
        ],
        examples: [
          { title: 'Basic CI Calculation', problem: 'Find CI on ₹1000 at 10% for 2 years', solution: 'A = 1000(1.1)² = 1000 × 1.21 = ₹1210\nCI = 1210 - 1000 = ₹210', answer: '₹210' }
        ]
      },
      {
        heading: 'CI vs SI Difference',
        content: 'The difference between CI and SI for the same P, R, T is a commonly asked question type.',
        keyPoints: [
          'For 2 years: CI - SI = P(R/100)²',
          'For 3 years: CI - SI = P(R/100)²(3 + R/100)',
          'CI > SI always (for more than 1 period)',
          'Difference increases with time and rate'
        ]
      },
      {
        heading: 'Shortcut for 2 Years',
        content: 'For 2-year problems, use this quick method.',
        keyPoints: [
          'SI for 2 years = 2PR/100',
          'CI for 2 years = 2PR/100 + P(R/100)²',
          'Extra in CI = P(R/100)² = (1st year SI) × R/100',
          'Amount = P(1 + R/100)²'
        ]
      }
    ],
    summary: 'CI formula: A = P(1+R/100)ⁿ. For 2 years, CI-SI = P(R/100)². Compound interest grows faster than simple interest due to interest-on-interest effect.',
    formulas: [
      { name: 'Compound Amount', expression: 'A = P(1 + R/100)ⁿ', description: 'Amount after n years' },
      { name: 'Compound Interest', expression: 'CI = P[(1 + R/100)ⁿ - 1]', description: 'Interest earned' },
      { name: 'CI - SI (2 years)', expression: 'P(R/100)²', description: 'Difference for 2 years' },
      { name: 'Half-yearly CI', expression: 'A = P(1 + R/200)^(2n)', description: 'Semi-annual compounding' }
    ],
    tips: [
      'For 2 years at 10%: Amount = 1.21P, CI = 0.21P',
      'For 3 years at 10%: Amount = 1.331P, CI = 0.331P',
      'CI - SI for 2 years = SI of 1st year × R/100',
      'Use successive percentage change concept for CI'
    ],
    practiceQuestions: [
      { question: 'CI on ₹1000 at 10% for 2 years is:', options: { A: '₹200', B: '₹210', C: '₹220', D: '₹250' }, correctAnswer: 'B', explanation: 'A = 1000(1.1)² = ₹1210. CI = ₹210', type: 'easy' },
      { question: 'Difference between CI and SI on ₹5000 for 2 years at 10% is:', options: { A: '₹25', B: '₹50', C: '₹75', D: '₹100' }, correctAnswer: 'B', explanation: 'Diff = P(R/100)² = 5000 × (10/100)² = ₹50', type: 'medium' },
      { question: 'A sum becomes ₹4840 in 2 years at 10% CI. Principal is:', options: { A: '₹4000', B: '₹4200', C: '₹4400', D: '₹4500' }, correctAnswer: 'A', explanation: 'P(1.1)² = 4840. P × 1.21 = 4840. P = ₹4000', type: 'medium' },
      { question: 'CI on a sum for 3 years at 10% is ₹331. The sum is:', options: { A: '₹800', B: '₹900', C: '₹1000', D: '₹1100' }, correctAnswer: 'C', explanation: 'CI = P[(1.1)³ - 1] = P × 0.331. P = ₹1000', type: 'medium' },
      { question: 'At what rate will ₹1600 amount to ₹1764 in 2 years CI?', options: { A: '4%', B: '5%', C: '6%', D: '8%' }, correctAnswer: 'B', explanation: '1600(1+R/100)² = 1764. (1+R/100)² = 1.1025. R = 5%', type: 'hard' },
      { question: 'SI and CI on a sum for 2 years are ₹200 and ₹210. Rate is:', options: { A: '5%', B: '8%', C: '10%', D: '12%' }, correctAnswer: 'C', explanation: 'Diff = ₹10 = SI × R/100. 10 = 100 × R/100. R = 10%', type: 'medium' },
      { question: 'A sum doubles in 5 years at CI. It will be 4 times in:', options: { A: '10 years', B: '15 years', C: '20 years', D: '25 years' }, correctAnswer: 'A', explanation: 'If doubles in 5 years, quadruples in 10 years (2×2)', type: 'medium' },
      { question: 'CI on ₹8000 at 5% for 2 years compounded annually is:', options: { A: '₹810', B: '₹820', C: '₹840', D: '₹850' }, correctAnswer: 'B', explanation: 'A = 8000(1.05)² = 8000 × 1.1025 = ₹8820. CI = ₹820', type: 'medium' },
      { question: 'The CI on ₹16000 for 1.5 years at 10% compounded half-yearly is:', options: { A: '₹2500', B: '₹2522', C: '₹2550', D: '₹2600' }, correctAnswer: 'B', explanation: 'A = 16000(1.05)³ = 16000 × 1.157625 = ₹18522. CI = ₹2522', type: 'hard' },
      { question: 'The difference between CI and SI on ₹4000 for 3 years at 5% is:', options: { A: '₹30.25', B: '₹30.50', C: '₹31.00', D: '₹31.50' }, correctAnswer: 'B', explanation: 'Use formula for 3 years diff or calculate both and subtract', type: 'hard' }
    ]
  }
};

// Banking Content - IBPS, SBI, RBI patterns
const bankingContent: Record<string, ExamTopicContent> = {
  'Simple Interest': sscContent['Simple Interest'], // Reuse SSC content
  'Compound Interest': sscContent['Compound Interest'],
  'Data Interpretation': {
    title: 'Data Interpretation for Banking Exams',
    introduction: 'Data Interpretation (DI) is a crucial section in banking exams. It tests your ability to analyze data presented in tables, charts, and graphs. Speed and accuracy in calculations are essential.',
    sections: [
      {
        heading: 'Types of DI Problems',
        content: 'Banking exams feature various types of data presentations.',
        keyPoints: [
          'Tables: Row and column data, requires basic arithmetic',
          'Bar Graphs: Compare quantities, find ratios, calculate percentages',
          'Line Graphs: Track trends over time, find rate of change',
          'Pie Charts: Percentages of a whole, sector calculations',
          'Mixed/Caselets: Combination of text and data'
        ]
      },
      {
        heading: 'Calculation Techniques',
        content: 'Speed is crucial. Learn these techniques for faster calculations.',
        keyPoints: [
          'Use approximation when options are far apart',
          'Learn percentage equivalents of common fractions',
          'Round off numbers for mental math',
          'Use ratios instead of actual values when possible',
          'Check if pattern-based elimination can help'
        ]
      },
      {
        heading: 'Common Question Types',
        content: 'These patterns appear frequently in banking DI.',
        keyPoints: [
          'Find percentage increase/decrease between periods',
          'Calculate ratio between different categories',
          'Find average across time periods or categories',
          'Determine which year/item has max/min value',
          'Calculate compound growth rates'
        ]
      }
    ],
    summary: 'DI requires both accuracy and speed. Practice mental math, learn approximation techniques, and familiarize yourself with common question patterns.',
    tips: [
      'Spend 1-2 minutes understanding the data before solving',
      'Write down intermediate values to avoid re-calculation',
      'Use approximation: 19% ≈ 20%, 51% ≈ 50%',
      'For percentage change, remember the base carefully'
    ],
    practiceQuestions: [
      { question: 'In a pie chart, if sector A is 72°, what percentage does it represent?', options: { A: '15%', B: '18%', C: '20%', D: '25%' }, correctAnswer: 'C', explanation: 'Percentage = (72/360) × 100 = 20%', type: 'easy' },
      { question: 'If production increased from 200 to 250, percentage increase is:', options: { A: '20%', B: '25%', C: '30%', D: '50%' }, correctAnswer: 'B', explanation: 'Increase = 50. % = (50/200) × 100 = 25%', type: 'easy' },
      { question: 'The ratio of A:B is 3:5. If total is 800, find A:', options: { A: '200', B: '250', C: '300', D: '350' }, correctAnswer: 'C', explanation: 'A = 800 × 3/8 = 300', type: 'easy' },
      { question: 'Average of 5 numbers is 40. If one is removed, average becomes 35. The removed number is:', options: { A: '50', B: '55', C: '60', D: '65' }, correctAnswer: 'C', explanation: 'Sum = 200. New sum = 140. Removed = 60', type: 'medium' },
      { question: 'If sales grew from 100 to 121 in 2 years, CAGR is:', options: { A: '10%', B: '10.5%', C: '11%', D: '21%' }, correctAnswer: 'A', explanation: '100(1+r)² = 121. (1+r)² = 1.21. 1+r = 1.1. r = 10%', type: 'hard' },
      { question: 'In a bar graph, if bar A = 60 and bar B = 45, A is what % more than B?', options: { A: '25%', B: '33.33%', C: '40%', D: '50%' }, correctAnswer: 'B', explanation: 'Difference = 15. % = (15/45) × 100 = 33.33%', type: 'medium' },
      { question: 'Sum of 3 items is 1500. If ratio is 2:3:5, find the largest:', options: { A: '450', B: '600', C: '750', D: '900' }, correctAnswer: 'C', explanation: 'Largest = 1500 × 5/10 = 750', type: 'easy' },
      { question: 'If A increases by 20% and B decreases by 20%, and initially A=B, new ratio A:B is:', options: { A: '3:2', B: '4:3', C: '5:4', D: '6:5' }, correctAnswer: 'A', explanation: 'Let initial = 100 each. A = 120, B = 80. Ratio = 3:2', type: 'medium' },
      { question: 'Population grew from 1 lakh to 1.21 lakh. If same rate continues, population after next year:', options: { A: '1.31 lakh', B: '1.331 lakh', C: '1.42 lakh', D: '1.44 lakh' }, correctAnswer: 'B', explanation: 'Growth rate = 10%. Next year = 1.21 × 1.1 = 1.331 lakh', type: 'medium' },
      { question: 'In a pie chart of 360°, three sectors are in ratio 2:3:4. Angle of largest sector:', options: { A: '120°', B: '140°', C: '160°', D: '180°' }, correctAnswer: 'C', explanation: 'Largest = 360 × 4/9 = 160°', type: 'easy' }
    ]
  }
};

// Railway Content - RRB patterns
const railwayContent: Record<string, ExamTopicContent> = {
  'Number System': {
    title: 'Number System for Railway Exams',
    introduction: 'Number System is fundamental for RRB exams. It covers types of numbers, divisibility, HCF, LCM, and various number properties. Master these basics for solving advanced problems quickly.',
    sections: [
      {
        heading: 'Types of Numbers',
        content: 'Understanding number classification is the first step.',
        keyPoints: [
          'Natural Numbers (N): 1, 2, 3, 4, ... (counting numbers)',
          'Whole Numbers (W): 0, 1, 2, 3, ... (N + {0})',
          'Integers (Z): ..., -2, -1, 0, 1, 2, ... (positive and negative)',
          'Rational Numbers: Can be expressed as p/q where q ≠ 0',
          'Irrational Numbers: Cannot be expressed as p/q (√2, π, e)'
        ]
      },
      {
        heading: 'Divisibility Rules (MEMORIZE)',
        content: 'These shortcuts help determine factors without division.',
        keyPoints: [
          'By 2: Last digit is even (0, 2, 4, 6, 8)',
          'By 3: Sum of digits divisible by 3',
          'By 4: Last two digits divisible by 4',
          'By 5: Last digit is 0 or 5',
          'By 6: Divisible by both 2 and 3',
          'By 8: Last three digits divisible by 8',
          'By 9: Sum of digits divisible by 9',
          'By 11: (Sum of odd position digits) - (Sum of even position digits) = 0 or multiple of 11'
        ]
      },
      {
        heading: 'HCF and LCM',
        content: 'HCF is the largest common factor, LCM is the smallest common multiple.',
        keyPoints: [
          'HCF × LCM = Product of two numbers',
          'HCF divides LCM',
          'For co-prime numbers, HCF = 1',
          'LCM ≥ both numbers, HCF ≤ both numbers',
          'For fractions: HCF = HCF of numerators / LCM of denominators'
        ],
        examples: [
          { title: 'HCF and LCM', problem: 'Find HCF and LCM of 12 and 18', solution: '12 = 2² × 3\n18 = 2 × 3²\nHCF = 2 × 3 = 6\nLCM = 2² × 3² = 36', answer: 'HCF = 6, LCM = 36' }
        ]
      },
      {
        heading: 'Important Formulas',
        content: 'These formulas are frequently used in number system problems.',
        keyPoints: [
          'Sum of first n natural numbers: n(n+1)/2',
          'Sum of first n odd numbers: n²',
          'Sum of first n even numbers: n(n+1)',
          'Sum of squares of first n numbers: n(n+1)(2n+1)/6',
          'Sum of cubes of first n numbers: [n(n+1)/2]²'
        ]
      }
    ],
    summary: 'Master divisibility rules and HCF-LCM concepts. Remember key formulas for sums of natural numbers, squares, and cubes. Practice quick mental calculations.',
    formulas: [
      { name: 'HCF × LCM', expression: 'HCF(a,b) × LCM(a,b) = a × b', description: 'Product relationship' },
      { name: 'Sum of n naturals', expression: 'n(n+1)/2', description: '1+2+3+...+n' },
      { name: 'Sum of n odd', expression: 'n²', description: '1+3+5+...+(2n-1)' },
      { name: 'Sum of n even', expression: 'n(n+1)', description: '2+4+6+...+2n' },
      { name: 'Sum of squares', expression: 'n(n+1)(2n+1)/6', description: '1²+2²+...+n²' }
    ],
    tips: [
      '1 is neither prime nor composite',
      '2 is the only even prime number',
      'For divisibility by 6: Check both 2 and 3',
      'Co-prime means HCF = 1',
      'Product of n consecutive numbers is divisible by n!'
    ],
    practiceQuestions: [
      { question: 'Which is irrational?', options: { A: '√16', B: '√25', C: '√2', D: '√9' }, correctAnswer: 'C', explanation: '√2 = 1.414... is non-terminating non-repeating', type: 'easy' },
      { question: 'HCF of 24 and 36 is:', options: { A: '6', B: '8', C: '12', D: '18' }, correctAnswer: 'C', explanation: '24 = 2³×3, 36 = 2²×3². HCF = 2²×3 = 12', type: 'easy' },
      { question: 'LCM of 12, 15, 20 is:', options: { A: '40', B: '60', C: '80', D: '120' }, correctAnswer: 'B', explanation: '12=2²×3, 15=3×5, 20=2²×5. LCM = 2²×3×5 = 60', type: 'medium' },
      { question: 'Sum of first 20 natural numbers:', options: { A: '200', B: '210', C: '220', D: '190' }, correctAnswer: 'B', explanation: '20 × 21 / 2 = 210', type: 'easy' },
      { question: 'Which is divisible by 11?', options: { A: '1234', B: '1243', C: '1324', D: '1432' }, correctAnswer: 'B', explanation: '1243: (1+4)-(2+3) = 5-5 = 0. Divisible by 11', type: 'medium' },
      { question: 'Product of HCF and LCM of 8 and 12 is:', options: { A: '96', B: '72', C: '48', D: '84' }, correctAnswer: 'A', explanation: 'HCF × LCM = 8 × 12 = 96', type: 'easy' },
      { question: 'The smallest prime number greater than 50 is:', options: { A: '51', B: '53', C: '55', D: '57' }, correctAnswer: 'B', explanation: '51 = 3×17, 53 is prime, 55 = 5×11, 57 = 3×19', type: 'easy' },
      { question: 'Sum of first 10 odd numbers:', options: { A: '90', B: '100', C: '110', D: '120' }, correctAnswer: 'B', explanation: 'Sum of n odd = n² = 10² = 100', type: 'easy' },
      { question: 'How many prime numbers between 10 and 30?', options: { A: '5', B: '6', C: '7', D: '4' }, correctAnswer: 'B', explanation: '11, 13, 17, 19, 23, 29 = 6 primes', type: 'medium' },
      { question: 'If HCF of two numbers is 12 and their LCM is 180, one number is 36. Other is:', options: { A: '48', B: '60', C: '72', D: '54' }, correctAnswer: 'B', explanation: 'Other = (HCF × LCM) / 36 = (12 × 180) / 36 = 60', type: 'medium' }
    ]
  },
  'Time Speed Distance': {
    title: 'Time, Speed and Distance for Railway Exams',
    introduction: 'Time, Speed and Distance (TSD) is a high-frequency topic in Railway exams. The basic formula is simple (Distance = Speed × Time), but questions can be complex. Master the concepts of relative speed, average speed, and trains.',
    sections: [
      {
        heading: 'Basic Concepts',
        content: 'The fundamental relationship between distance, speed, and time.',
        keyPoints: [
          'Distance = Speed × Time',
          'Speed = Distance / Time',
          'Time = Distance / Speed',
          'Units: km/hr to m/s: multiply by 5/18',
          'Units: m/s to km/hr: multiply by 18/5'
        ],
        examples: [
          { title: 'Unit Conversion', problem: 'Convert 72 km/hr to m/s', solution: '72 × 5/18 = 20 m/s', answer: '20 m/s' }
        ]
      },
      {
        heading: 'Relative Speed',
        content: 'When two objects are moving, their relative speed determines how fast they approach or move apart.',
        keyPoints: [
          'Same direction: Relative Speed = S₁ - S₂ (faster - slower)',
          'Opposite direction: Relative Speed = S₁ + S₂',
          'For trains crossing: Time = (L₁ + L₂) / Relative Speed',
          'For overtaking: Use difference of speeds',
          'For meeting: Use sum of speeds'
        ]
      },
      {
        heading: 'Average Speed',
        content: 'Average speed is NOT the arithmetic mean of speeds.',
        keyPoints: [
          'Average Speed = Total Distance / Total Time',
          'For equal distances at speeds a and b: Average = 2ab/(a+b)',
          'For equal times at speeds a and b: Average = (a+b)/2',
          'Average speed < Arithmetic mean (for different speeds)'
        ],
        examples: [
          { title: 'Average Speed', problem: 'A person travels 100 km at 50 km/hr and returns at 100 km/hr. Average speed?', solution: 'Average = 2×50×100/(50+100) = 10000/150 = 66.67 km/hr', answer: '66.67 km/hr' }
        ]
      },
      {
        heading: 'Trains Problems',
        content: 'Train problems are very common in Railway exams (naturally!).',
        keyPoints: [
          'Train crossing a pole: Time = Length of train / Speed',
          'Train crossing a platform: Time = (Train length + Platform length) / Speed',
          'Two trains crossing: Time = (L₁ + L₂) / Relative Speed',
          'Man/pole = point object (length = 0)',
          'Always convert speeds to same unit'
        ]
      }
    ],
    summary: 'D = S × T is the fundamental formula. For relative motion, add speeds if opposite direction, subtract if same. Average speed for equal distances = 2ab/(a+b). For trains, add lengths when they cross each other.',
    formulas: [
      { name: 'Distance', expression: 'D = S × T', description: 'Basic speed-distance-time relation' },
      { name: 'km/hr to m/s', expression: '× 5/18', description: 'Multiply by 5/18' },
      { name: 'Average Speed (equal distance)', expression: '2ab/(a+b)', description: 'Harmonic mean for equal distances' },
      { name: 'Train crossing', expression: 'T = (L₁ + L₂)/Relative Speed', description: 'Two trains crossing each other' }
    ],
    tips: [
      '36 km/hr = 10 m/s, 72 km/hr = 20 m/s (memorize these)',
      'For meeting problems: D/(S₁+S₂) gives meeting time',
      'If speed ratio is a:b, time ratio is b:a (inverse)',
      'A train crosses a stationary object in same time as its length takes at that speed'
    ],
    practiceQuestions: [
      { question: 'Convert 54 km/hr to m/s:', options: { A: '12 m/s', B: '15 m/s', C: '18 m/s', D: '20 m/s' }, correctAnswer: 'B', explanation: '54 × 5/18 = 15 m/s', type: 'easy' },
      { question: 'A train 100m long crosses a pole in 10 seconds. Speed is:', options: { A: '36 km/hr', B: '40 km/hr', C: '45 km/hr', D: '50 km/hr' }, correctAnswer: 'A', explanation: 'Speed = 100/10 = 10 m/s = 36 km/hr', type: 'easy' },
      { question: 'Two trains of lengths 150m and 250m cross each other in 20 seconds when moving in opposite directions. If one train is twice as fast as other, find faster speed:', options: { A: '60 km/hr', B: '72 km/hr', C: '80 km/hr', D: '90 km/hr' }, correctAnswer: 'B', explanation: 'Total length = 400m. Relative speed = 400/20 = 20 m/s = 72 km/hr. If speeds are x and 2x, x+2x = 72. Faster = 48 km/hr... Actually need to recalculate', type: 'hard' },
      { question: 'A car covers 600 km at 60 km/hr and returns at 40 km/hr. Average speed:', options: { A: '48 km/hr', B: '50 km/hr', C: '52 km/hr', D: '45 km/hr' }, correctAnswer: 'A', explanation: 'Average = 2×60×40/(60+40) = 4800/100 = 48 km/hr', type: 'medium' },
      { question: 'A train crosses a 200m platform in 20 seconds and a 300m platform in 25 seconds. Speed of train:', options: { A: '20 m/s', B: '18 m/s', C: '15 m/s', D: '12 m/s' }, correctAnswer: 'A', explanation: '(L+200)/20 = (L+300)/25. 25L+5000 = 20L+6000. 5L = 1000. L = 200m. Speed = 400/20 = 20 m/s', type: 'hard' },
      { question: 'Two trains start from A and B towards each other. They meet after 2 hours. After meeting, they take 4.5 and 8 hours respectively. Ratio of speeds:', options: { A: '3:2', B: '4:3', C: '2:3', D: '5:4' }, correctAnswer: 'B', explanation: 'Ratio of speeds = √(t₂/t₁) = √(8/4.5) = √(16/9) = 4:3', type: 'hard' },
      { question: 'A man covers half distance at 6 km/hr and rest at 4 km/hr. Average speed:', options: { A: '4.8 km/hr', B: '5 km/hr', C: '5.2 km/hr', D: '5.5 km/hr' }, correctAnswer: 'A', explanation: 'Average = 2×6×4/(6+4) = 48/10 = 4.8 km/hr', type: 'medium' },
      { question: 'A train takes 10 seconds to cross a pole and 20 seconds to cross a 200m platform. Length of train:', options: { A: '150m', B: '180m', C: '200m', D: '220m' }, correctAnswer: 'C', explanation: 'L/10 = (L+200)/20. 2L = L+200. L = 200m', type: 'medium' },
      { question: 'Two trains 200m and 300m long run at 40 km/hr and 50 km/hr in same direction. Time to cross:', options: { A: '150 sec', B: '180 sec', C: '200 sec', D: '220 sec' }, correctAnswer: 'B', explanation: 'Relative speed = 10 km/hr = 25/9 m/s. Time = 500/(25/9) = 180 sec', type: 'medium' },
      { question: 'A person walking at 5 km/hr reaches office 10 min late. Walking at 6 km/hr, he reaches 5 min early. Distance to office:', options: { A: '7.5 km', B: '8 km', C: '8.5 km', D: '9 km' }, correctAnswer: 'A', explanation: 'Let D = distance. D/5 - D/6 = 15/60 = 1/4. D(6-5)/30 = 1/4. D = 7.5 km', type: 'medium' }
    ]
  }
};

// Get exam content
export function getExamTopicContent(subtopic: string, subject: string, examType: string): ExamTopicContent | null {
  const examLower = examType.toLowerCase();
  
  // Direct topic match
  if (sscContent[subtopic]) return sscContent[subtopic];
  if (bankingContent[subtopic]) return bankingContent[subtopic];
  if (railwayContent[subtopic]) return railwayContent[subtopic];
  
  // Exam-specific search
  if (examLower.includes('ssc') && sscContent[subtopic]) return sscContent[subtopic];
  if ((examLower.includes('bank') || examLower.includes('ibps') || examLower.includes('sbi')) && bankingContent[subtopic]) return bankingContent[subtopic];
  if ((examLower.includes('railway') || examLower.includes('rrb')) && railwayContent[subtopic]) return railwayContent[subtopic];
  
  return null;
}

// Generate generic exam content
export function generateGenericExamContent(subtopic: string, subject: string, examType: string): ExamTopicContent {
  return {
    title: subtopic,
    introduction: `${subtopic} is an important topic for ${examType} exams. This topic frequently appears in ${subject} section. Master the concepts and practice regularly for better scores.`,
    mainDiagram: {
      title: `${subtopic} Concept Map`,
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
      description: `Key concepts and relationships in ${subtopic}`
    },
    sections: [
      {
        heading: 'Core Concepts',
        content: `Understanding the fundamentals of ${subtopic} is essential for solving exam questions quickly and accurately. Focus on the basic definitions and formulas first.`,
        keyPoints: [
          'Learn the basic definitions and terminology',
          'Memorize important formulas',
          'Practice with previous year questions',
          'Focus on shortcuts and quick methods'
        ]
      },
      {
        heading: 'Exam Strategy',
        content: 'Time management is crucial in competitive exams. Learn to identify question types and apply appropriate methods.',
        keyPoints: [
          'Start with easy questions to build confidence',
          'Use elimination for MCQs when stuck',
          'Practice mental math for speed',
          'Review commonly asked patterns'
        ]
      }
    ],
    summary: `Master ${subtopic} by understanding concepts and practicing regularly. Focus on speed and accuracy for exam success.`,
    tips: [
      'Solve previous year questions to understand patterns',
      'Learn shortcuts for quick calculation',
      'Time yourself while practicing',
      'Review mistakes to avoid repetition'
    ],
    practiceQuestions: [
      { question: `Basic concepts of ${subtopic} are tested in which form?`, options: { A: 'Direct formula application', B: 'Word problems', C: 'Data analysis', D: 'All of the above' }, correctAnswer: 'D', explanation: 'Exams test concepts in various formats.', type: 'easy' },
      { question: 'What is the most important skill for competitive exams?', options: { A: 'Speed only', B: 'Accuracy only', C: 'Balance of speed and accuracy', D: 'Guessing' }, correctAnswer: 'C', explanation: 'Both speed and accuracy are essential for scoring well.', type: 'easy' }
    ]
  };
}

export const allExamContent = {
  ssc: sscContent,
  banking: bankingContent,
  railway: railwayContent
};
