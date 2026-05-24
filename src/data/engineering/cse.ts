import { YearData } from "./cse-aiml";

export const cseData: YearData[] = [
  {
    year: '1st Year',
    semesters: [
      {
        semester: 1,
        subjects: [
          {
            code: 'MA101',
            name: 'Matrices & Calculus',
            units: [
              { unitNumber: 1, unitName: 'Matrices', chapters: ['Rank of Matrix', 'Solution of Linear Systems', 'Eigenvalues and Eigenvectors'] },
              { unitNumber: 2, unitName: 'Differential Calculus', chapters: ['Limits and Continuity', 'Differentiation', 'Applications of Derivatives'] },
              { unitNumber: 3, unitName: 'Integral Calculus', chapters: ['Integration Techniques', 'Definite Integrals', 'Applications'] },
              { unitNumber: 4, unitName: 'Multivariable Calculus', chapters: ['Partial Derivatives', 'Multiple Integrals'] },
              { unitNumber: 5, unitName: 'Differential Equations', chapters: ['First Order DE', 'Second Order DE'] }
            ]
          },
          {
            code: 'PH102',
            name: 'Applied Physics',
            units: [
              { unitNumber: 1, unitName: 'Mechanics', chapters: ['Newton\'s Laws', 'Work and Energy', 'Rotational Motion'] },
              { unitNumber: 2, unitName: 'Waves and Optics', chapters: ['Wave Motion', 'Interference', 'Diffraction'] },
              { unitNumber: 3, unitName: 'Electromagnetism', chapters: ['Electric Field', 'Magnetic Field', 'Electromagnetic Induction'] },
              { unitNumber: 4, unitName: 'Modern Physics', chapters: ['Quantum Mechanics', 'Atomic Structure'] },
              { unitNumber: 5, unitName: 'Semiconductors', chapters: ['Band Theory', 'PN Junction', 'Transistors'] }
            ]
          },
          {
            code: 'CS103',
            name: 'Programming for Problem Solving',
            units: [
              { unitNumber: 1, unitName: 'Introduction to Programming', chapters: ['Algorithms', 'Flowcharts', 'C Basics'] },
              { unitNumber: 2, unitName: 'Control Structures', chapters: ['Decision Making', 'Loops', 'Functions'] },
              { unitNumber: 3, unitName: 'Arrays and Strings', chapters: ['One-dimensional Arrays', 'Multi-dimensional Arrays', 'String Operations'] },
              { unitNumber: 4, unitName: 'Pointers', chapters: ['Pointer Basics', 'Pointer Arithmetic', 'Dynamic Memory'] },
              { unitNumber: 5, unitName: 'Structures and Files', chapters: ['Structures', 'File Handling'] }
            ]
          },
          {
            code: 'EN104',
            name: 'English for Skill Enhancement',
            units: [
              { unitNumber: 1, unitName: 'Vocabulary Building', chapters: ['Word Formation', 'Synonyms & Antonyms', 'Contextual Usage'] },
              { unitNumber: 2, unitName: 'Grammar', chapters: ['Tenses', 'Voice', 'Articles & Prepositions'] },
              { unitNumber: 3, unitName: 'Reading Comprehension', chapters: ['Skimming', 'Scanning', 'Critical Reading'] },
              { unitNumber: 4, unitName: 'Writing Skills', chapters: ['Paragraph Writing', 'Essay Writing', 'Report Writing'] },
              { unitNumber: 5, unitName: 'Communication Skills', chapters: ['Presentation Skills', 'Group Discussion', 'Interview Skills'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'MA201',
            name: 'ODE & Vector Calculus',
            units: [
              { unitNumber: 1, unitName: 'First Order ODEs', chapters: ['Linear Equations', 'Exact Equations', 'Integrating Factors'] },
              { unitNumber: 2, unitName: 'Higher Order ODEs', chapters: ['Homogeneous Equations', 'Non-homogeneous Equations', 'Method of Variation'] },
              { unitNumber: 3, unitName: 'Vector Differentiation', chapters: ['Gradient', 'Divergence', 'Curl'] },
              { unitNumber: 4, unitName: 'Vector Integration', chapters: ['Line Integrals', 'Surface Integrals', 'Volume Integrals'] },
              { unitNumber: 5, unitName: 'Integral Theorems', chapters: ['Green\'s Theorem', 'Stokes Theorem', 'Gauss Divergence Theorem'] }
            ]
          },
          {
            code: 'CH202',
            name: 'Engineering Chemistry',
            units: [
              { unitNumber: 1, unitName: 'Electrochemistry', chapters: ['Electrochemical Cells', 'EMF', 'Batteries'] },
              { unitNumber: 2, unitName: 'Corrosion', chapters: ['Types of Corrosion', 'Factors Affecting Corrosion', 'Prevention Methods'] },
              { unitNumber: 3, unitName: 'Polymers', chapters: ['Types of Polymers', 'Polymerization', 'Applications'] },
              { unitNumber: 4, unitName: 'Water Technology', chapters: ['Water Treatment', 'Hardness', 'Softening Methods'] },
              { unitNumber: 5, unitName: 'Engineering Materials', chapters: ['Cement', 'Lubricants', 'Fuels'] }
            ]
          },
          {
            code: 'ME203',
            name: 'Engineering Graphics',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Drawing Instruments', 'Lines', 'Lettering'] },
              { unitNumber: 2, unitName: 'Projections of Points & Lines', chapters: ['First Angle Projection', 'Third Angle Projection'] },
              { unitNumber: 3, unitName: 'Projections of Planes', chapters: ['Plane Figures', 'Traces'] },
              { unitNumber: 4, unitName: 'Projections of Solids', chapters: ['Prisms', 'Pyramids', 'Cylinders', 'Cones'] },
              { unitNumber: 5, unitName: 'Isometric Projections', chapters: ['Isometric Scale', 'Isometric Views'] }
            ]
          },
          {
            code: 'EE204',
            name: 'Basic Electrical Engineering',
            units: [
              { unitNumber: 1, unitName: 'DC Circuits', chapters: ['Kirchhoff\'s Laws', 'Network Theorems', 'Mesh Analysis'] },
              { unitNumber: 2, unitName: 'AC Circuits', chapters: ['Phasors', 'Impedance', 'Power Factor'] },
              { unitNumber: 3, unitName: 'Transformers', chapters: ['Construction', 'Working Principle', 'Losses'] },
              { unitNumber: 4, unitName: 'Electrical Machines', chapters: ['DC Motors', 'AC Motors', 'Generators'] },
              { unitNumber: 5, unitName: 'Measuring Instruments', chapters: ['Ammeter', 'Voltmeter', 'Wattmeter'] }
            ]
          }
        ]
      }
    ]
  },
  {
    year: '2nd Year',
    semesters: [
      {
        semester: 1,
        subjects: [
          {
            code: 'MA301',
            name: 'Probability & Statistics',
            units: [
              { unitNumber: 1, unitName: 'Probability', chapters: ['Random Variables', 'Probability Distributions', 'Conditional Probability'] },
              { unitNumber: 2, unitName: 'Statistics', chapters: ['Measures of Central Tendency', 'Dispersion', 'Correlation'] },
              { unitNumber: 3, unitName: 'Hypothesis Testing', chapters: ['t-Test', 'Chi-Square Test', 'ANOVA'] },
              { unitNumber: 4, unitName: 'Regression', chapters: ['Linear Regression', 'Multiple Regression'] },
              { unitNumber: 5, unitName: 'Sampling Theory', chapters: ['Sampling Methods', 'Estimation'] }
            ]
          },
          {
            code: 'CS301',
            name: 'Data Structures',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Abstract Data Types', 'Time Complexity', 'Space Complexity'] },
              { unitNumber: 2, unitName: 'Linear Data Structures', chapters: ['Arrays', 'Linked Lists', 'Stacks', 'Queues'] },
              { unitNumber: 3, unitName: 'Trees', chapters: ['Binary Trees', 'Binary Search Trees', 'AVL Trees', 'Heaps'] },
              { unitNumber: 4, unitName: 'Graphs', chapters: ['Graph Representation', 'Graph Traversal', 'Shortest Path'] },
              { unitNumber: 5, unitName: 'Hashing and Sorting', chapters: ['Hash Tables', 'Sorting Algorithms'] }
            ]
          },
          {
            code: 'CS302',
            name: 'Digital Logic Design',
            units: [
              { unitNumber: 1, unitName: 'Number Systems', chapters: ['Binary', 'Octal', 'Hexadecimal', 'Conversions'] },
              { unitNumber: 2, unitName: 'Boolean Algebra', chapters: ['Laws', 'Simplification', 'K-Maps'] },
              { unitNumber: 3, unitName: 'Combinational Circuits', chapters: ['Multiplexers', 'Decoders', 'Adders'] },
              { unitNumber: 4, unitName: 'Sequential Circuits', chapters: ['Flip-Flops', 'Counters', 'Registers'] },
              { unitNumber: 5, unitName: 'Memory and PLDs', chapters: ['ROM', 'RAM', 'PLA', 'PAL'] }
            ]
          },
          {
            code: 'CS303',
            name: 'Discrete Mathematics',
            units: [
              { unitNumber: 1, unitName: 'Mathematical Logic', chapters: ['Propositional Logic', 'Predicate Logic', 'Inference'] },
              { unitNumber: 2, unitName: 'Set Theory', chapters: ['Sets', 'Relations', 'Functions'] },
              { unitNumber: 3, unitName: 'Combinatorics', chapters: ['Permutations', 'Combinations', 'Pigeonhole Principle'] },
              { unitNumber: 4, unitName: 'Graph Theory', chapters: ['Graph Types', 'Paths & Circuits', 'Trees'] },
              { unitNumber: 5, unitName: 'Algebraic Structures', chapters: ['Groups', 'Rings', 'Fields'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'CS304',
            name: 'Computer Organization',
            units: [
              { unitNumber: 1, unitName: 'Basic Concepts', chapters: ['Digital Logic', 'Number Systems', 'Boolean Algebra'] },
              { unitNumber: 2, unitName: 'Processor Organization', chapters: ['CPU Design', 'Instruction Set', 'Addressing Modes'] },
              { unitNumber: 3, unitName: 'Memory Organization', chapters: ['Cache Memory', 'Virtual Memory', 'Memory Hierarchy'] },
              { unitNumber: 4, unitName: 'I/O Organization', chapters: ['I/O Interface', 'DMA', 'Interrupts'] },
              { unitNumber: 5, unitName: 'Pipelining', chapters: ['Instruction Pipeline', 'Hazards', 'Performance'] }
            ]
          },
          {
            code: 'CS305',
            name: 'Object Oriented Programming',
            units: [
              { unitNumber: 1, unitName: 'Introduction to OOP', chapters: ['Classes & Objects', 'Encapsulation', 'Data Hiding'] },
              { unitNumber: 2, unitName: 'Inheritance', chapters: ['Single Inheritance', 'Multiple Inheritance', 'Hierarchical'] },
              { unitNumber: 3, unitName: 'Polymorphism', chapters: ['Method Overloading', 'Method Overriding', 'Virtual Functions'] },
              { unitNumber: 4, unitName: 'Exception Handling', chapters: ['Try-Catch', 'Throw', 'Custom Exceptions'] },
              { unitNumber: 5, unitName: 'Templates & STL', chapters: ['Function Templates', 'Class Templates', 'STL Containers'] }
            ]
          },
          {
            code: 'CS306',
            name: 'Database Management Systems',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Database Concepts', 'Data Models', 'Architecture'] },
              { unitNumber: 2, unitName: 'Relational Model', chapters: ['Relational Algebra', 'Relational Calculus', 'SQL'] },
              { unitNumber: 3, unitName: 'Database Design', chapters: ['ER Model', 'Normalization', 'Functional Dependencies'] },
              { unitNumber: 4, unitName: 'Transaction Management', chapters: ['ACID Properties', 'Concurrency Control', 'Recovery'] },
              { unitNumber: 5, unitName: 'Advanced Topics', chapters: ['Indexing', 'Query Processing', 'NoSQL'] }
            ]
          },
          {
            code: 'CS307',
            name: 'Operating Systems',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['OS Types', 'System Calls', 'OS Structure'] },
              { unitNumber: 2, unitName: 'Process Management', chapters: ['Processes', 'Threads', 'CPU Scheduling'] },
              { unitNumber: 3, unitName: 'Synchronization', chapters: ['Critical Section', 'Semaphores', 'Deadlocks'] },
              { unitNumber: 4, unitName: 'Memory Management', chapters: ['Paging', 'Segmentation', 'Virtual Memory'] },
              { unitNumber: 5, unitName: 'File Systems', chapters: ['File Organization', 'Directory Structure', 'Disk Scheduling'] }
            ]
          }
        ]
      }
    ]
  },
  {
    year: '3rd Year',
    semesters: [
      {
        semester: 1,
        subjects: [
          {
            code: 'CS401',
            name: 'Design and Analysis of Algorithms',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Algorithm Analysis', 'Asymptotic Notations', 'Recurrence Relations'] },
              { unitNumber: 2, unitName: 'Divide and Conquer', chapters: ['Merge Sort', 'Quick Sort', 'Binary Search'] },
              { unitNumber: 3, unitName: 'Greedy Method', chapters: ['Fractional Knapsack', 'Huffman Coding', 'MST'] },
              { unitNumber: 4, unitName: 'Dynamic Programming', chapters: ['0/1 Knapsack', 'Matrix Chain Multiplication', 'LCS'] },
              { unitNumber: 5, unitName: 'Backtracking and Branch & Bound', chapters: ['N-Queens', 'Graph Coloring', 'TSP'] }
            ]
          },
          {
            code: 'CS402',
            name: 'Computer Networks',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Network Types', 'OSI Model', 'TCP/IP Model'] },
              { unitNumber: 2, unitName: 'Physical Layer', chapters: ['Transmission Media', 'Multiplexing', 'Switching'] },
              { unitNumber: 3, unitName: 'Data Link Layer', chapters: ['Error Detection', 'Flow Control', 'MAC Protocols'] },
              { unitNumber: 4, unitName: 'Network Layer', chapters: ['IP Addressing', 'Routing Algorithms', 'IPv6'] },
              { unitNumber: 5, unitName: 'Transport & Application Layer', chapters: ['TCP', 'UDP', 'HTTP', 'DNS'] }
            ]
          },
          {
            code: 'CS403',
            name: 'Software Engineering',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Software Process', 'Life Cycle Models', 'Agile Methods'] },
              { unitNumber: 2, unitName: 'Requirements Engineering', chapters: ['Requirements Elicitation', 'Analysis', 'Specification'] },
              { unitNumber: 3, unitName: 'Design', chapters: ['Architectural Design', 'Component Design', 'UML'] },
              { unitNumber: 4, unitName: 'Testing', chapters: ['Unit Testing', 'Integration Testing', 'System Testing'] },
              { unitNumber: 5, unitName: 'Project Management', chapters: ['Planning', 'Risk Management', 'Quality Management'] }
            ]
          },
          {
            code: 'CS404',
            name: 'Theory of Computation',
            units: [
              { unitNumber: 1, unitName: 'Finite Automata', chapters: ['DFA', 'NFA', 'Regular Expressions'] },
              { unitNumber: 2, unitName: 'Context-Free Languages', chapters: ['CFG', 'PDA', 'Parsing'] },
              { unitNumber: 3, unitName: 'Turing Machines', chapters: ['TM Basics', 'Variants', 'Undecidability'] },
              { unitNumber: 4, unitName: 'Decidability', chapters: ['Decidable Languages', 'Halting Problem', 'Reducibility'] },
              { unitNumber: 5, unitName: 'Complexity', chapters: ['P vs NP', 'NP-Completeness', 'Space Complexity'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'CS405',
            name: 'Compiler Design',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Compiler Phases', 'Bootstrapping', 'Cross Compilation'] },
              { unitNumber: 2, unitName: 'Lexical Analysis', chapters: ['Tokens', 'Scanner', 'LEX'] },
              { unitNumber: 3, unitName: 'Syntax Analysis', chapters: ['Top-Down Parsing', 'Bottom-Up Parsing', 'YACC'] },
              { unitNumber: 4, unitName: 'Semantic Analysis', chapters: ['Type Checking', 'Symbol Tables', 'Intermediate Code'] },
              { unitNumber: 5, unitName: 'Code Generation', chapters: ['Code Optimization', 'Register Allocation', 'Target Code'] }
            ]
          },
          {
            code: 'CS406',
            name: 'Web Technologies',
            units: [
              { unitNumber: 1, unitName: 'HTML & CSS', chapters: ['HTML5', 'CSS3', 'Responsive Design'] },
              { unitNumber: 2, unitName: 'JavaScript', chapters: ['DOM', 'Events', 'AJAX'] },
              { unitNumber: 3, unitName: 'Server-Side', chapters: ['PHP', 'Node.js', 'REST APIs'] },
              { unitNumber: 4, unitName: 'Frameworks', chapters: ['React', 'Angular', 'Vue'] },
              { unitNumber: 5, unitName: 'Database Integration', chapters: ['MySQL', 'MongoDB', 'ORM'] }
            ]
          },
          {
            code: 'CS407',
            name: 'Information Security',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Security Goals', 'Threats', 'Attacks'] },
              { unitNumber: 2, unitName: 'Cryptography', chapters: ['Symmetric Key', 'Public Key', 'Hash Functions'] },
              { unitNumber: 3, unitName: 'Network Security', chapters: ['Firewalls', 'IDS', 'VPN'] },
              { unitNumber: 4, unitName: 'Web Security', chapters: ['SQL Injection', 'XSS', 'CSRF'] },
              { unitNumber: 5, unitName: 'Security Management', chapters: ['Risk Analysis', 'Security Policies', 'Audit'] }
            ]
          },
          {
            code: 'HS401',
            name: 'Management & Economics',
            units: [
              { unitNumber: 1, unitName: 'Demand Analysis', chapters: ['Demand Theory', 'Elasticity', 'Forecasting'] },
              { unitNumber: 2, unitName: 'Production & Cost', chapters: ['Production Functions', 'Cost Analysis', 'Break-even'] },
              { unitNumber: 3, unitName: 'Market Structures', chapters: ['Perfect Competition', 'Monopoly', 'Oligopoly'] },
              { unitNumber: 4, unitName: 'Financial Accounting', chapters: ['Balance Sheet', 'Income Statement', 'Ratio Analysis'] },
              { unitNumber: 5, unitName: 'Capital Budgeting', chapters: ['NPV', 'IRR', 'Payback Period'] }
            ]
          }
        ]
      }
    ]
  },
  {
    year: '4th Year',
    semesters: [
      {
        semester: 1,
        subjects: [
          {
            code: 'CS501',
            name: 'Machine Learning',
            units: [
              { unitNumber: 1, unitName: 'Introduction to ML', chapters: ['Types of Learning', 'Supervised vs Unsupervised', 'Model Evaluation'] },
              { unitNumber: 2, unitName: 'Regression', chapters: ['Linear Regression', 'Polynomial Regression', 'Regularization'] },
              { unitNumber: 3, unitName: 'Classification', chapters: ['Logistic Regression', 'Decision Trees', 'SVM', 'KNN'] },
              { unitNumber: 4, unitName: 'Clustering', chapters: ['K-Means', 'Hierarchical Clustering', 'DBSCAN'] },
              { unitNumber: 5, unitName: 'Neural Networks', chapters: ['Perceptron', 'Backpropagation', 'Deep Learning Basics'] }
            ]
          },
          {
            code: 'CS502',
            name: 'Cloud Computing',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Cloud Models', 'Service Models', 'Deployment Models'] },
              { unitNumber: 2, unitName: 'Virtualization', chapters: ['Types', 'Hypervisors', 'Containers'] },
              { unitNumber: 3, unitName: 'Cloud Platforms', chapters: ['AWS', 'Azure', 'GCP'] },
              { unitNumber: 4, unitName: 'Cloud Storage', chapters: ['Object Storage', 'Block Storage', 'CDN'] },
              { unitNumber: 5, unitName: 'Cloud Security', chapters: ['IAM', 'Encryption', 'Compliance'] }
            ]
          },
          {
            code: 'PE301',
            name: 'Professional Elective III',
            units: [
              { unitNumber: 1, unitName: 'Elective Topic 1', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 2, unitName: 'Elective Topic 2', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 3, unitName: 'Elective Topic 3', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 4, unitName: 'Elective Topic 4', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 5, unitName: 'Elective Topic 5', chapters: ['Chapter 1', 'Chapter 2'] }
            ]
          },
          {
            code: 'PE401',
            name: 'Professional Elective IV',
            units: [
              { unitNumber: 1, unitName: 'Elective Topic 1', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 2, unitName: 'Elective Topic 2', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 3, unitName: 'Elective Topic 3', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 4, unitName: 'Elective Topic 4', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 5, unitName: 'Elective Topic 5', chapters: ['Chapter 1', 'Chapter 2'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'PE501',
            name: 'Professional Elective V',
            units: [
              { unitNumber: 1, unitName: 'Elective Topic 1', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 2, unitName: 'Elective Topic 2', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 3, unitName: 'Elective Topic 3', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 4, unitName: 'Elective Topic 4', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 5, unitName: 'Elective Topic 5', chapters: ['Chapter 1', 'Chapter 2'] }
            ]
          },
          {
            code: 'PE601',
            name: 'Professional Elective VI',
            units: [
              { unitNumber: 1, unitName: 'Elective Topic 1', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 2, unitName: 'Elective Topic 2', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 3, unitName: 'Elective Topic 3', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 4, unitName: 'Elective Topic 4', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 5, unitName: 'Elective Topic 5', chapters: ['Chapter 1', 'Chapter 2'] }
            ]
          },
          {
            code: 'OE201',
            name: 'Open Elective II',
            units: [
              { unitNumber: 1, unitName: 'Elective Topic 1', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 2, unitName: 'Elective Topic 2', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 3, unitName: 'Elective Topic 3', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 4, unitName: 'Elective Topic 4', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 5, unitName: 'Elective Topic 5', chapters: ['Chapter 1', 'Chapter 2'] }
            ]
          },
          {
            code: 'OE301',
            name: 'Open Elective III',
            units: [
              { unitNumber: 1, unitName: 'Elective Topic 1', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 2, unitName: 'Elective Topic 2', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 3, unitName: 'Elective Topic 3', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 4, unitName: 'Elective Topic 4', chapters: ['Chapter 1', 'Chapter 2'] },
              { unitNumber: 5, unitName: 'Elective Topic 5', chapters: ['Chapter 1', 'Chapter 2'] }
            ]
          }
        ]
      }
    ]
  }
];
