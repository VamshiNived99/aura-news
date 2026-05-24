// Comprehensive NCERT Content Bank - Free Offline Content

export interface ContentQuestion {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ContentSection {
  heading: string;
  content: string;
  keyPoints: string[];
  examples?: { title: string; problem: string; solution: string; answer: string }[];
}

export interface TopicContent {
  title: string;
  introduction: string;
  sections: ContentSection[];
  summary: string;
  formulas?: { name: string; expression: string; description: string }[];
  tips: string[];
  practiceQuestions: ContentQuestion[];
}

// Mathematics Content
const mathContent: Record<string, TopicContent> = {
  'Number Systems': {
    title: 'Number Systems',
    introduction: 'Number systems form the foundation of mathematics. This chapter covers natural numbers, whole numbers, integers, rational numbers, irrational numbers, and real numbers.',
    sections: [
      {
        heading: 'Types of Numbers',
        content: 'Numbers are classified into different categories based on their properties. Natural numbers (N) are counting numbers starting from 1. Whole numbers (W) include 0 along with natural numbers. Integers (Z) include negative numbers along with whole numbers.',
        keyPoints: [
          'Natural Numbers: 1, 2, 3, 4, 5... (counting numbers)',
          'Whole Numbers: 0, 1, 2, 3, 4... (natural numbers + 0)',
          'Integers: ...-3, -2, -1, 0, 1, 2, 3... (positive and negative whole numbers)',
          'Rational Numbers: Numbers that can be expressed as p/q where q ≠ 0',
          'Irrational Numbers: Numbers that cannot be expressed as p/q (like √2, π)'
        ],
        examples: [
          { title: 'Identifying Number Types', problem: 'Classify the number -5', solution: '-5 is a negative whole number, so it is an integer. It can also be written as -5/1, making it rational.', answer: '-5 is an Integer and a Rational Number' },
          { title: 'Rational vs Irrational', problem: 'Is √4 rational or irrational?', solution: '√4 = 2, which can be written as 2/1. Since it can be expressed as p/q, it is rational.', answer: '√4 is Rational (equals 2)' }
        ]
      },
      {
        heading: 'Real Numbers',
        content: 'Real numbers include all rational and irrational numbers. They can be represented on a number line. The set of real numbers is denoted by R.',
        keyPoints: [
          'Real Numbers = Rational + Irrational Numbers',
          'Every point on number line represents a real number',
          'Between any two real numbers, there are infinitely many real numbers',
          'Decimal expansion of rational numbers is either terminating or recurring',
          'Decimal expansion of irrational numbers is non-terminating non-recurring'
        ],
        examples: [
          { title: 'Decimal Expansion', problem: 'Find decimal expansion of 1/3', solution: '1 ÷ 3 = 0.333... The digit 3 keeps repeating.', answer: '0.333... (recurring decimal)' }
        ]
      }
    ],
    summary: 'Number systems classify numbers into natural, whole, integers, rational, irrational, and real numbers. Understanding these classifications helps in performing mathematical operations correctly.',
    formulas: [
      { name: 'HCF × LCM', expression: 'HCF(a,b) × LCM(a,b) = a × b', description: 'Product of HCF and LCM of two numbers equals product of the numbers' }
    ],
    tips: [
      'Remember: All natural numbers are whole numbers, all whole numbers are integers',
      'To check if a number is rational, try to express it as a fraction',
      'π and e are famous irrational numbers',
      'Use factor tree method to find HCF and LCM quickly'
    ],
    practiceQuestions: [
      { question: 'Which of the following is an irrational number?', options: { A: '√9', B: '√2', C: '0.5', D: '-7' }, correctAnswer: 'B', explanation: '√2 = 1.414... is non-terminating non-recurring, hence irrational. √9 = 3 is rational.', difficulty: 'easy' },
      { question: 'The decimal expansion of 17/8 is:', options: { A: 'Non-terminating recurring', B: 'Terminating', C: 'Non-terminating non-recurring', D: 'None of these' }, correctAnswer: 'B', explanation: '17/8 = 2.125, which terminates. Denominators with only 2 and 5 as factors give terminating decimals.', difficulty: 'medium' },
      { question: 'Between 0 and 1, how many irrational numbers exist?', options: { A: '10', B: '100', C: '0', D: 'Infinitely many' }, correctAnswer: 'D', explanation: 'Between any two real numbers, there are infinitely many irrational numbers.', difficulty: 'easy' },
      { question: 'If HCF(306, 657) = 9, find LCM(306, 657)', options: { A: '22338', B: '22328', C: '22318', D: '22308' }, correctAnswer: 'A', explanation: 'LCM = (306 × 657)/HCF = 201042/9 = 22338', difficulty: 'hard' },
      { question: 'Which statement is TRUE?', options: { A: 'Every integer is a natural number', B: 'Every rational number is an integer', C: 'Every real number is rational', D: 'Every integer is a rational number' }, correctAnswer: 'D', explanation: 'Every integer n can be written as n/1, making it rational.', difficulty: 'medium' },
      { question: 'The product of a non-zero rational and an irrational number is:', options: { A: 'Always rational', B: 'Always irrational', C: 'Can be either', D: 'Always zero' }, correctAnswer: 'B', explanation: 'Product of non-zero rational and irrational is always irrational.', difficulty: 'medium' },
      { question: '√12 × √3 equals:', options: { A: '√36', B: '6', C: '√15', D: 'Both A and B' }, correctAnswer: 'D', explanation: '√12 × √3 = √(12×3) = √36 = 6', difficulty: 'easy' },
      { question: 'Rationalize 1/(√5 - √3):', options: { A: '(√5 + √3)/2', B: '(√5 - √3)/2', C: '(√5 + √3)/8', D: '√5 + √3' }, correctAnswer: 'A', explanation: 'Multiply by (√5+√3)/(√5+√3) = (√5+√3)/(5-3) = (√5+√3)/2', difficulty: 'hard' },
      { question: 'The sum of two irrational numbers is:', options: { A: 'Always irrational', B: 'Always rational', C: 'Can be rational or irrational', D: 'Never defined' }, correctAnswer: 'C', explanation: '√2 + (-√2) = 0 (rational), but √2 + √3 is irrational.', difficulty: 'hard' },
      { question: 'Which is the smallest prime number?', options: { A: '1', B: '2', C: '3', D: '0' }, correctAnswer: 'B', explanation: '2 is the smallest and only even prime number. 1 is not prime.', difficulty: 'easy' }
    ]
  },
  'Polynomials': {
    title: 'Polynomials',
    introduction: 'A polynomial is an algebraic expression consisting of variables and coefficients, involving operations of addition, subtraction, multiplication, and non-negative integer exponents.',
    sections: [
      {
        heading: 'Basics of Polynomials',
        content: 'A polynomial in one variable x is an expression of the form p(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀, where a₀, a₁, ... aₙ are constants and n is a non-negative integer.',
        keyPoints: [
          'Degree: Highest power of the variable in a polynomial',
          'Constant Polynomial: Degree 0 (e.g., 5)',
          'Linear Polynomial: Degree 1 (e.g., 3x + 2)',
          'Quadratic Polynomial: Degree 2 (e.g., x² + 5x + 6)',
          'Cubic Polynomial: Degree 3 (e.g., x³ - 2x² + x - 1)'
        ],
        examples: [
          { title: 'Finding Degree', problem: 'Find the degree of 4x³ - 2x² + 7x - 5', solution: 'The highest power of x is 3 (in the term 4x³).', answer: 'Degree = 3 (Cubic Polynomial)' }
        ]
      },
      {
        heading: 'Zeros of a Polynomial',
        content: 'A zero of polynomial p(x) is a value of x for which p(x) = 0. For a polynomial of degree n, there can be at most n zeros.',
        keyPoints: [
          'Zero/Root: Value of x where p(x) = 0',
          'A linear polynomial has exactly 1 zero',
          'A quadratic polynomial has at most 2 zeros',
          'Geometrically, zeros are x-coordinates where graph crosses x-axis',
          'Sum of zeros of ax² + bx + c = -b/a',
          'Product of zeros of ax² + bx + c = c/a'
        ],
        examples: [
          { title: 'Finding Zeros', problem: 'Find zeros of p(x) = x² - 5x + 6', solution: 'x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 or x = 3', answer: 'Zeros are 2 and 3' }
        ]
      }
    ],
    summary: 'Polynomials are classified by their degree. Understanding zeros and their relationship with coefficients is crucial for solving polynomial equations.',
    formulas: [
      { name: 'Sum of Zeros (Quadratic)', expression: 'α + β = -b/a', description: 'For ax² + bx + c, sum of zeros equals -b/a' },
      { name: 'Product of Zeros (Quadratic)', expression: 'αβ = c/a', description: 'For ax² + bx + c, product of zeros equals c/a' },
      { name: 'Sum of Zeros (Cubic)', expression: 'α + β + γ = -b/a', description: 'For ax³ + bx² + cx + d' },
      { name: 'Product of Zeros (Cubic)', expression: 'αβγ = -d/a', description: 'For ax³ + bx² + cx + d' }
    ],
    tips: [
      'Factor theorem: (x-a) is a factor of p(x) if p(a) = 0',
      'For quadratics, use factorization or quadratic formula',
      'Graph of linear polynomial is a straight line',
      'Graph of quadratic polynomial is a parabola'
    ],
    practiceQuestions: [
      { question: 'Degree of polynomial 5x³ - 4x² + 7 is:', options: { A: '2', B: '3', C: '5', D: '7' }, correctAnswer: 'B', explanation: 'Highest power of x is 3, so degree is 3.', difficulty: 'easy' },
      { question: 'If α and β are zeros of x² - 5x + 6, find α + β:', options: { A: '5', B: '-5', C: '6', D: '-6' }, correctAnswer: 'A', explanation: 'Sum of zeros = -b/a = -(-5)/1 = 5', difficulty: 'medium' },
      { question: 'A polynomial of degree 4 can have at most how many zeros?', options: { A: '3', B: '4', C: '5', D: 'Infinite' }, correctAnswer: 'B', explanation: 'A polynomial of degree n has at most n zeros.', difficulty: 'easy' },
      { question: 'If one zero of 2x² - 8x + k is 3, find k:', options: { A: '6', B: '8', C: '10', D: '12' }, correctAnswer: 'A', explanation: 'p(3) = 0: 2(9) - 8(3) + k = 0 → 18 - 24 + k = 0 → k = 6', difficulty: 'hard' },
      { question: 'Product of zeros of 3x² + 5x - 2 is:', options: { A: '5/3', B: '-5/3', C: '-2/3', D: '2/3' }, correctAnswer: 'C', explanation: 'Product = c/a = -2/3', difficulty: 'medium' },
      { question: 'Which is NOT a polynomial?', options: { A: 'x² + 2x', B: '5', C: 'x + 1/x', D: '√2x + 1' }, correctAnswer: 'C', explanation: 'x + 1/x = x + x⁻¹ has negative exponent, not a polynomial.', difficulty: 'medium' },
      { question: 'Zero of p(x) = 2x - 6 is:', options: { A: '2', B: '3', C: '6', D: '-3' }, correctAnswer: 'B', explanation: '2x - 6 = 0 → x = 3', difficulty: 'easy' },
      { question: 'If zeros of x² - px + 12 are 3 and 4, find p:', options: { A: '7', B: '-7', C: '12', D: '1' }, correctAnswer: 'A', explanation: 'Sum of zeros = p, so 3 + 4 = 7 = p', difficulty: 'medium' },
      { question: 'Graph of a cubic polynomial crosses x-axis at most:', options: { A: '1 time', B: '2 times', C: '3 times', D: '4 times' }, correctAnswer: 'C', explanation: 'Cubic has at most 3 zeros, so crosses x-axis at most 3 times.', difficulty: 'easy' },
      { question: 'If α, β, γ are zeros of x³ - 6x² + 11x - 6, find αβγ:', options: { A: '6', B: '-6', C: '11', D: '-11' }, correctAnswer: 'A', explanation: 'Product of zeros = -d/a = -(-6)/1 = 6', difficulty: 'hard' }
    ]
  },
  'Linear Equations': {
    title: 'Linear Equations in Two Variables',
    introduction: 'A linear equation in two variables is of the form ax + by + c = 0, where a, b, c are real numbers and a, b are not both zero. Its graph is always a straight line.',
    sections: [
      {
        heading: 'Understanding Linear Equations',
        content: 'Linear equations in two variables have infinitely many solutions. Each solution is an ordered pair (x, y) that satisfies the equation. The graph of all solutions forms a straight line.',
        keyPoints: [
          'Standard form: ax + by + c = 0 (a and b not both zero)',
          'Each linear equation has infinitely many solutions',
          'Every solution (x, y) is a point on the line',
          'Two points are sufficient to draw the line',
          'x-intercept: point where line crosses x-axis (y = 0)',
          'y-intercept: point where line crosses y-axis (x = 0)'
        ],
        examples: [
          { title: 'Finding Solutions', problem: 'Find two solutions of 2x + 3y = 12', solution: 'Put x = 0: 3y = 12 → y = 4, so (0, 4). Put y = 0: 2x = 12 → x = 6, so (6, 0).', answer: 'Solutions: (0, 4) and (6, 0)' }
        ]
      },
      {
        heading: 'Solving Pair of Linear Equations',
        content: 'A pair of linear equations can be solved graphically or algebraically. Methods include substitution, elimination, and cross-multiplication.',
        keyPoints: [
          'Consistent: Has at least one solution (lines intersect or coincide)',
          'Inconsistent: Has no solution (parallel lines)',
          'Unique solution: Lines intersect at one point',
          'Infinite solutions: Lines coincide (same line)',
          'For a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0:',
          'Unique solution if a₁/a₂ ≠ b₁/b₂',
          'No solution if a₁/a₂ = b₁/b₂ ≠ c₁/c₂',
          'Infinite solutions if a₁/a₂ = b₁/b₂ = c₁/c₂'
        ]
      }
    ],
    summary: 'Linear equations in two variables represent straight lines. Pairs of linear equations can have unique, no, or infinitely many solutions depending on whether lines intersect, are parallel, or coincide.',
    formulas: [
      { name: 'Slope-Intercept Form', expression: 'y = mx + c', description: 'm is slope, c is y-intercept' },
      { name: 'Slope from Two Points', expression: 'm = (y₂ - y₁)/(x₂ - x₁)', description: 'Calculate slope using two points' }
    ],
    tips: [
      'For graphical method, find at least 3 points for accuracy',
      'Substitution is best when one variable has coefficient 1',
      'Elimination is best when coefficients are easy to match',
      'Always verify solution by substituting in both equations'
    ],
    practiceQuestions: [
      { question: 'The graph of y = 5 is:', options: { A: 'Line parallel to x-axis', B: 'Line parallel to y-axis', C: 'Passes through origin', D: 'None' }, correctAnswer: 'A', explanation: 'y = 5 means y is always 5 regardless of x, a horizontal line.', difficulty: 'easy' },
      { question: 'Solution of x + y = 5 and x - y = 1 is:', options: { A: '(3, 2)', B: '(2, 3)', C: '(4, 1)', D: '(1, 4)' }, correctAnswer: 'A', explanation: 'Adding: 2x = 6 → x = 3. Then y = 5 - 3 = 2.', difficulty: 'medium' },
      { question: 'Lines 2x + 3y = 6 and 4x + 6y = 12 are:', options: { A: 'Parallel', B: 'Intersecting', C: 'Coincident', D: 'Perpendicular' }, correctAnswer: 'C', explanation: '4x + 6y = 12 is same as 2(2x + 3y = 6). Ratios are equal: 2/4 = 3/6 = 6/12', difficulty: 'medium' },
      { question: 'For what value of k will 2x + ky = 6 and 6x + 9y = 18 have infinite solutions?', options: { A: '2', B: '3', C: '6', D: '9' }, correctAnswer: 'B', explanation: 'For infinite solutions: 2/6 = k/9 = 6/18 → k = 3', difficulty: 'hard' },
      { question: 'x-intercept of 3x + 4y = 12 is:', options: { A: '3', B: '4', C: '12', D: '0' }, correctAnswer: 'B', explanation: 'Put y = 0: 3x = 12 → x = 4. So x-intercept is 4.', difficulty: 'easy' },
      { question: 'The lines x = 2 and y = -3 intersect at:', options: { A: '(2, 3)', B: '(-3, 2)', C: '(2, -3)', D: '(-2, 3)' }, correctAnswer: 'C', explanation: 'x = 2 is vertical line at x = 2, y = -3 is horizontal at y = -3.', difficulty: 'easy' },
      { question: 'Number of solutions of 3x - 4y = 7 and 6x - 8y = 10:', options: { A: 'One', B: 'Two', C: 'Infinite', D: 'None' }, correctAnswer: 'D', explanation: '3/6 = 4/8 ≠ 7/10, so lines are parallel (no solution).', difficulty: 'medium' },
      { question: 'If (2, k) is a solution of 3x - y = 5, find k:', options: { A: '1', B: '-1', C: '5', D: '6' }, correctAnswer: 'A', explanation: '3(2) - k = 5 → 6 - k = 5 → k = 1', difficulty: 'easy' },
      { question: 'The father is 3 times as old as his son. After 12 years, he will be twice as old. Present age of son is:', options: { A: '10', B: '12', C: '14', D: '16' }, correctAnswer: 'B', explanation: 'Let son = x. Father = 3x. After 12: 3x + 12 = 2(x + 12) → x = 12', difficulty: 'hard' },
      { question: 'Graphically, the pair x + 2y = 4 and 2x + 4y = 12 represents:', options: { A: 'Intersecting lines', B: 'Parallel lines', C: 'Coincident lines', D: 'None' }, correctAnswer: 'B', explanation: '1/2 = 2/4 ≠ 4/12. Equal first two ratios but different third = parallel.', difficulty: 'medium' }
    ]
  },
  'Quadratic Equations': {
    title: 'Quadratic Equations',
    introduction: 'A quadratic equation is a polynomial equation of degree 2. The standard form is ax² + bx + c = 0, where a ≠ 0. Quadratic equations arise in many real-world problems.',
    sections: [
      {
        heading: 'Solving Quadratic Equations',
        content: 'Quadratic equations can be solved by factorization, completing the square, or using the quadratic formula. The nature of roots depends on the discriminant.',
        keyPoints: [
          'Standard form: ax² + bx + c = 0 (a ≠ 0)',
          'Factorization: Express as product of linear factors',
          'Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a',
          'Discriminant D = b² - 4ac determines nature of roots',
          'D > 0: Two distinct real roots',
          'D = 0: Two equal real roots (one repeated root)',
          'D < 0: No real roots (complex roots)'
        ],
        examples: [
          { title: 'Using Quadratic Formula', problem: 'Solve x² - 5x + 6 = 0', solution: 'a=1, b=-5, c=6. D = 25 - 24 = 1. x = (5 ± 1)/2', answer: 'x = 3 or x = 2' },
          { title: 'Factorization', problem: 'Solve x² - 7x + 12 = 0', solution: 'Find factors of 12 that add to 7: 3 and 4. (x-3)(x-4) = 0', answer: 'x = 3 or x = 4' }
        ]
      },
      {
        heading: 'Nature of Roots',
        content: 'The discriminant (D = b² - 4ac) tells us about the nature of roots without actually solving the equation.',
        keyPoints: [
          'D > 0 and perfect square: Rational roots',
          'D > 0 but not perfect square: Irrational roots',
          'D = 0: Equal roots, each = -b/2a',
          'D < 0: No real roots exist',
          'Sum of roots = -b/a',
          'Product of roots = c/a'
        ]
      }
    ],
    summary: 'Quadratic equations have at most two roots. The discriminant determines whether roots are real, equal, or complex. Various methods exist to find these roots.',
    formulas: [
      { name: 'Quadratic Formula', expression: 'x = (-b ± √(b² - 4ac)) / 2a', description: 'Universal formula to find roots' },
      { name: 'Discriminant', expression: 'D = b² - 4ac', description: 'Determines nature of roots' },
      { name: 'Sum of Roots', expression: 'α + β = -b/a', description: 'Sum of both roots' },
      { name: 'Product of Roots', expression: 'αβ = c/a', description: 'Product of both roots' }
    ],
    tips: [
      'Try factorization first for simple equations',
      'Quadratic formula works for all quadratic equations',
      'Check discriminant to know nature of roots before solving',
      'Always verify roots by substituting back'
    ],
    practiceQuestions: [
      { question: 'Roots of x² - 5x + 6 = 0 are:', options: { A: '2, 3', B: '-2, -3', C: '1, 6', D: '-1, -6' }, correctAnswer: 'A', explanation: 'Factors of 6 that add to 5 are 2 and 3.', difficulty: 'easy' },
      { question: 'Discriminant of 2x² + 4x + 2 = 0 is:', options: { A: '0', B: '8', C: '16', D: '-8' }, correctAnswer: 'A', explanation: 'D = 16 - 4(2)(2) = 16 - 16 = 0', difficulty: 'medium' },
      { question: 'If D < 0, the equation has:', options: { A: 'Two real roots', B: 'One real root', C: 'No real roots', D: 'Infinite roots' }, correctAnswer: 'C', explanation: 'Negative discriminant means no real roots exist.', difficulty: 'easy' },
      { question: 'Sum of roots of 3x² - 7x + 2 = 0 is:', options: { A: '7/3', B: '-7/3', C: '2/3', D: '3/7' }, correctAnswer: 'A', explanation: 'Sum = -b/a = -(-7)/3 = 7/3', difficulty: 'medium' },
      { question: 'For equal roots of x² + kx + 9 = 0, k equals:', options: { A: '±3', B: '±6', C: '±9', D: '±12' }, correctAnswer: 'B', explanation: 'For equal roots, D = 0: k² - 36 = 0 → k = ±6', difficulty: 'hard' },
      { question: 'Which equation has roots 4 and -3?', options: { A: 'x² - x - 12 = 0', B: 'x² + x - 12 = 0', C: 'x² - 7x + 12 = 0', D: 'x² + 7x + 12 = 0' }, correctAnswer: 'A', explanation: 'Sum = 4 + (-3) = 1, Product = -12. So x² - x - 12 = 0', difficulty: 'medium' },
      { question: 'Nature of roots of x² + 4x + 5 = 0:', options: { A: 'Real and equal', B: 'Real and distinct', C: 'No real roots', D: 'Rational' }, correctAnswer: 'C', explanation: 'D = 16 - 20 = -4 < 0, so no real roots.', difficulty: 'easy' },
      { question: 'If one root of x² - 9x + k = 0 is 5, find k:', options: { A: '20', B: '25', C: '45', D: '14' }, correctAnswer: 'A', explanation: 'Other root = 9 - 5 = 4. Product = 5 × 4 = 20 = k', difficulty: 'hard' },
      { question: 'Completing the square: x² + 6x + ___ = (x + 3)²', options: { A: '3', B: '6', C: '9', D: '36' }, correctAnswer: 'C', explanation: '(x + 3)² = x² + 6x + 9', difficulty: 'easy' },
      { question: 'Product of roots of 5x² - 3x - 2 = 0 is:', options: { A: '2/5', B: '-2/5', C: '3/5', D: '-3/5' }, correctAnswer: 'B', explanation: 'Product = c/a = -2/5', difficulty: 'medium' }
    ]
  }
};

// Science Content
const scienceContent: Record<string, TopicContent> = {
  'Chemical Reactions': {
    title: 'Chemical Reactions and Equations',
    introduction: 'A chemical reaction is a process where substances (reactants) are transformed into new substances (products) with different properties. Chemical equations represent these reactions using symbols and formulas.',
    sections: [
      {
        heading: 'Writing Chemical Equations',
        content: 'A chemical equation shows the reactants on the left side and products on the right side, separated by an arrow. Equations must be balanced to follow the law of conservation of mass.',
        keyPoints: [
          'Reactants → Products',
          'Law of Conservation of Mass: Total mass of reactants = Total mass of products',
          'Balanced equation has equal atoms of each element on both sides',
          'State symbols: (s) solid, (l) liquid, (g) gas, (aq) aqueous',
          'Coefficients are used to balance, not subscripts'
        ],
        examples: [
          { title: 'Balancing Equation', problem: 'Balance: H₂ + O₂ → H₂O', solution: 'Count atoms: Left: 2H, 2O. Right: 2H, 1O. Need 2H₂O for 2O. Then need 2H₂ for 4H.', answer: '2H₂ + O₂ → 2H₂O' }
        ]
      },
      {
        heading: 'Types of Chemical Reactions',
        content: 'Chemical reactions are classified based on how atoms rearrange. The main types are combination, decomposition, displacement, double displacement, and redox reactions.',
        keyPoints: [
          'Combination: A + B → AB (Two or more reactants form one product)',
          'Decomposition: AB → A + B (One reactant breaks into two or more products)',
          'Displacement: A + BC → AC + B (More reactive element replaces less reactive)',
          'Double Displacement: AB + CD → AD + CB (Exchange of ions)',
          'Oxidation: Loss of electrons / Gain of oxygen / Loss of hydrogen',
          'Reduction: Gain of electrons / Loss of oxygen / Gain of hydrogen'
        ],
        examples: [
          { title: 'Combination', problem: '2Mg + O₂ → 2MgO', solution: 'Two elements combine to form one compound.', answer: 'Combination Reaction' },
          { title: 'Decomposition', problem: '2H₂O → 2H₂ + O₂ (electrolysis)', solution: 'One compound breaks into elements.', answer: 'Decomposition Reaction' }
        ]
      }
    ],
    summary: 'Chemical reactions involve rearrangement of atoms. Equations must be balanced. Different types include combination, decomposition, displacement, double displacement, and redox reactions.',
    tips: [
      'Always balance equations by adjusting coefficients, never subscripts',
      'Remember reactivity series for displacement reactions',
      'Oxidation and reduction always occur together (redox)',
      'Look for precipitate, gas, or color change as evidence of reaction'
    ],
    practiceQuestions: [
      { question: 'In the reaction 2Mg + O₂ → 2MgO, what is reduced?', options: { A: 'Mg', B: 'O₂', C: 'MgO', D: 'None' }, correctAnswer: 'B', explanation: 'Oxygen gains electrons (from Mg), so it is reduced.', difficulty: 'medium' },
      { question: 'CaCO₃ → CaO + CO₂ is an example of:', options: { A: 'Combination', B: 'Decomposition', C: 'Displacement', D: 'Double displacement' }, correctAnswer: 'B', explanation: 'One compound breaks into two products - decomposition.', difficulty: 'easy' },
      { question: 'What type is: Fe + CuSO₄ → FeSO₄ + Cu?', options: { A: 'Combination', B: 'Decomposition', C: 'Displacement', D: 'Double displacement' }, correctAnswer: 'C', explanation: 'Fe displaces Cu from CuSO₄ (Fe is more reactive than Cu).', difficulty: 'easy' },
      { question: 'Balanced equation: _N₂ + _H₂ → _NH₃', options: { A: '1, 3, 2', B: '1, 2, 3', C: '2, 3, 2', D: '1, 1, 1' }, correctAnswer: 'A', explanation: 'N₂ + 3H₂ → 2NH₃ (2N = 2N, 6H = 6H)', difficulty: 'medium' },
      { question: 'Rusting of iron is:', options: { A: 'Physical change', B: 'Oxidation', C: 'Reduction', D: 'Decomposition' }, correctAnswer: 'B', explanation: 'Iron gains oxygen to form iron oxide - oxidation.', difficulty: 'easy' },
      { question: 'Which is NOT a sign of chemical reaction?', options: { A: 'Color change', B: 'Gas evolution', C: 'Change in state', D: 'Precipitate formation' }, correctAnswer: 'C', explanation: 'Change in state (like melting) is physical change.', difficulty: 'easy' },
      { question: 'AgNO₃ + NaCl → AgCl + NaNO₃ is:', options: { A: 'Combination', B: 'Decomposition', C: 'Displacement', D: 'Double displacement' }, correctAnswer: 'D', explanation: 'Exchange of ions between two compounds.', difficulty: 'medium' },
      { question: 'Electrolysis of water produces:', options: { A: 'H₂ only', B: 'O₂ only', C: 'H₂ and O₂', D: 'H₂O₂' }, correctAnswer: 'C', explanation: '2H₂O → 2H₂ + O₂ (decomposition)', difficulty: 'easy' },
      { question: 'Which metal can displace copper from CuSO₄?', options: { A: 'Silver', B: 'Gold', C: 'Zinc', D: 'Platinum' }, correctAnswer: 'C', explanation: 'Zinc is more reactive than copper in the reactivity series.', difficulty: 'medium' },
      { question: 'In photosynthesis, CO₂ is:', options: { A: 'Oxidized', B: 'Reduced', C: 'Neither', D: 'Both' }, correctAnswer: 'B', explanation: 'CO₂ gains hydrogen to form glucose - reduction.', difficulty: 'hard' }
    ]
  },
  'Acids, Bases and Salts': {
    title: 'Acids, Bases and Salts',
    introduction: 'Acids are substances that release H⁺ ions in water, bases release OH⁻ ions. Salts are formed by the neutralization reaction between acids and bases.',
    sections: [
      {
        heading: 'Properties of Acids and Bases',
        content: 'Acids have sour taste, turn blue litmus red, and have pH less than 7. Bases have bitter taste, feel soapy, turn red litmus blue, and have pH greater than 7.',
        keyPoints: [
          'Acids release H⁺ (or H₃O⁺) ions in water',
          'Bases release OH⁻ ions in water',
          'pH scale: 0-14 (acidic < 7 < basic)',
          'pH 7 is neutral (pure water)',
          'Strong acids/bases ionize completely',
          'Weak acids/bases ionize partially'
        ]
      },
      {
        heading: 'Neutralization and Salts',
        content: 'When an acid reacts with a base, salt and water are formed. This is called neutralization. Different combinations of acids and bases form different types of salts.',
        keyPoints: [
          'Acid + Base → Salt + Water',
          'Acidic salt: Strong acid + Weak base',
          'Basic salt: Weak acid + Strong base',
          'Neutral salt: Strong acid + Strong base',
          'Common salt (NaCl) from HCl + NaOH'
        ]
      }
    ],
    summary: 'Acids donate H⁺, bases accept H⁺ (or donate OH⁻). pH measures acidity/basicity. Neutralization produces salts. Understanding acid-base chemistry is essential for many industrial and biological processes.',
    formulas: [
      { name: 'pH Definition', expression: 'pH = -log[H⁺]', description: 'Negative log of hydrogen ion concentration' }
    ],
    tips: [
      'Strong acids: HCl, H₂SO₄, HNO₃',
      'Strong bases: NaOH, KOH',
      'Antacids neutralize excess stomach acid',
      'Baking soda (NaHCO₃) is a mild base'
    ],
    practiceQuestions: [
      { question: 'pH of pure water is:', options: { A: '0', B: '7', C: '14', D: '1' }, correctAnswer: 'B', explanation: 'Pure water is neutral with pH 7.', difficulty: 'easy' },
      { question: 'Which turns blue litmus red?', options: { A: 'NaOH', B: 'HCl', C: 'NaCl', D: 'Water' }, correctAnswer: 'B', explanation: 'Acids turn blue litmus red. HCl is an acid.', difficulty: 'easy' },
      { question: 'Reaction of acid with base is called:', options: { A: 'Oxidation', B: 'Reduction', C: 'Neutralization', D: 'Decomposition' }, correctAnswer: 'C', explanation: 'Acid + Base → Salt + Water is neutralization.', difficulty: 'easy' },
      { question: 'Which is a strong acid?', options: { A: 'Acetic acid', B: 'Citric acid', C: 'Sulfuric acid', D: 'Carbonic acid' }, correctAnswer: 'C', explanation: 'H₂SO₄ is a strong acid that ionizes completely.', difficulty: 'medium' },
      { question: 'Milk of magnesia is used as:', options: { A: 'Fertilizer', B: 'Antacid', C: 'Fuel', D: 'Preservative' }, correctAnswer: 'B', explanation: 'Mg(OH)₂ is a base that neutralizes stomach acid.', difficulty: 'easy' },
      { question: 'pH of lemon juice is approximately:', options: { A: '2-3', B: '7', C: '10-11', D: '14' }, correctAnswer: 'A', explanation: 'Lemon juice contains citric acid, pH around 2-3.', difficulty: 'medium' },
      { question: 'NaOH + HCl → NaCl + H₂O. NaCl is a:', options: { A: 'Acidic salt', B: 'Basic salt', C: 'Neutral salt', D: 'Not a salt' }, correctAnswer: 'C', explanation: 'Strong acid + Strong base = Neutral salt.', difficulty: 'medium' },
      { question: 'Universal indicator shows _____ color at pH 7:', options: { A: 'Red', B: 'Green', C: 'Blue', D: 'Yellow' }, correctAnswer: 'B', explanation: 'Green color indicates neutral pH 7.', difficulty: 'easy' },
      { question: 'Baking soda is chemically:', options: { A: 'NaCl', B: 'NaHCO₃', C: 'Na₂CO₃', D: 'NaOH' }, correctAnswer: 'B', explanation: 'Sodium bicarbonate (NaHCO₃) is baking soda.', difficulty: 'easy' },
      { question: 'Which solution has highest [H⁺]?', options: { A: 'pH 2', B: 'pH 5', C: 'pH 7', D: 'pH 10' }, correctAnswer: 'A', explanation: 'Lower pH means higher H⁺ concentration.', difficulty: 'medium' }
    ]
  }
};

// Function to get content by topic
export const getTopicContent = (topic: string, subject?: string): TopicContent | null => {
  // Check math content
  if (mathContent[topic]) return mathContent[topic];
  
  // Check science content
  if (scienceContent[topic]) return scienceContent[topic];
  
  // Try partial matching
  const allContent = { ...mathContent, ...scienceContent };
  for (const key of Object.keys(allContent)) {
    if (topic.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(topic.toLowerCase())) {
      return allContent[key];
    }
  }
  
  return null;
};

// Function to generate generic content for any topic
export const generateGenericContent = (topic: string, subject: string): TopicContent => {
  return {
    title: topic,
    introduction: `${topic} is an important topic in ${subject}. This section provides a comprehensive overview of key concepts, principles, and applications.`,
    sections: [
      {
        heading: 'Introduction to ' + topic,
        content: `Understanding ${topic} is fundamental to mastering ${subject}. This chapter covers the essential concepts, definitions, and their practical applications.`,
        keyPoints: [
          `Learn the basic definitions related to ${topic}`,
          'Understand key concepts and their relationships',
          'Apply knowledge to solve problems',
          'Connect theory with real-world examples',
          'Practice with various types of questions'
        ]
      },
      {
        heading: 'Key Concepts',
        content: 'The following concepts form the foundation of this topic. Make sure to understand each one thoroughly before moving to applications.',
        keyPoints: [
          'Master fundamental definitions',
          'Learn important formulas and their derivations',
          'Understand the logical flow of concepts',
          'Practice step-by-step problem solving'
        ]
      },
      {
        heading: 'Applications and Problem Solving',
        content: 'Apply the concepts learned to solve practical problems. Focus on understanding the approach rather than memorizing solutions.',
        keyPoints: [
          'Identify the type of problem',
          'Apply relevant concepts and formulas',
          'Solve step by step, showing all work',
          'Verify your answer makes sense'
        ]
      }
    ],
    summary: `${topic} covers essential concepts in ${subject}. Focus on understanding principles, practice regularly, and apply knowledge to various problem types.`,
    tips: [
      'Read the textbook chapter thoroughly first',
      'Make concise notes for quick revision',
      'Solve NCERT examples and exercises',
      'Practice previous year questions',
      'Discuss doubts with teachers or peers',
      'Review mistakes to avoid repeating them'
    ],
    practiceQuestions: [
      { question: `What is the most important aspect of learning ${topic}?`, options: { A: 'Memorization only', B: 'Understanding concepts', C: 'Skipping difficult parts', D: 'Reading once' }, correctAnswer: 'B', explanation: 'Understanding concepts thoroughly helps in applying knowledge to various problems.', difficulty: 'easy' },
      { question: 'How should you approach problem solving?', options: { A: 'Guess the answer', B: 'Skip steps', C: 'Solve step by step', D: 'Copy solutions' }, correctAnswer: 'C', explanation: 'Step-by-step solving helps identify errors and ensures understanding.', difficulty: 'easy' },
      { question: 'What is the best study strategy?', options: { A: 'Study day before exam', B: 'Regular practice', C: 'Only read notes', D: 'Avoid difficult topics' }, correctAnswer: 'B', explanation: 'Regular practice reinforces learning and builds confidence.', difficulty: 'easy' },
      { question: 'Why are previous year questions important?', options: { A: 'They might repeat', B: 'Understand exam pattern', C: 'Practice application', D: 'All of above' }, correctAnswer: 'D', explanation: 'Previous year questions help understand patterns and practice application.', difficulty: 'medium' },
      { question: 'What should you do when stuck on a problem?', options: { A: 'Give up', B: 'Seek help or review concepts', C: 'Skip it forever', D: 'Guess' }, correctAnswer: 'B', explanation: 'Seeking help or reviewing related concepts helps overcome difficulties.', difficulty: 'easy' },
      { question: 'How often should you revise this topic?', options: { A: 'Never', B: 'Once before exam', C: 'Regularly', D: 'Only if time permits' }, correctAnswer: 'C', explanation: 'Regular revision helps in long-term retention of concepts.', difficulty: 'easy' },
      { question: 'What makes a good study environment?', options: { A: 'Noisy place', B: 'Quiet with minimal distractions', C: 'In front of TV', D: 'With loud music' }, correctAnswer: 'B', explanation: 'A quiet environment helps focus and concentrate better.', difficulty: 'easy' },
      { question: 'How should you use this offline content?', options: { A: 'Just read', B: 'Read, practice, and revise', C: 'Skip to quiz only', D: 'Ignore it' }, correctAnswer: 'B', explanation: 'Complete utilization involves reading, practicing, and regular revision.', difficulty: 'easy' },
      { question: 'What is key to exam success?', options: { A: 'Luck', B: 'Last-minute cramming', C: 'Consistent effort', D: 'Copying' }, correctAnswer: 'C', explanation: 'Consistent effort throughout leads to better understanding and results.', difficulty: 'easy' },
      { question: 'After solving problems, you should:', options: { A: 'Forget them', B: 'Review mistakes', C: 'Never look back', D: 'Celebrate only' }, correctAnswer: 'B', explanation: 'Reviewing mistakes helps avoid repeating them and reinforces learning.', difficulty: 'easy' }
    ]
  };
};

export { mathContent, scienceContent };
