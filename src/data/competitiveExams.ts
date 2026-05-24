export interface CompetitiveTopic {
  id: string;
  name: string;
  subtopics: string[];
}

export interface CompetitiveSubject {
  subject: string;
  topics: CompetitiveTopic[];
}

export interface CompetitiveExamData {
  id: string;
  name: string;
  category: string;
  icon: string;
  overview: string;
  eligibility: string;
  ageLimit: string;
  examPattern: {
    section: string;
    questions: number;
    marks: number;
    duration: string;
  }[];
  syllabus: CompetitiveSubject[];
  importantFormulas: { name: string; formula: string; usage: string }[];
  tips: string[];
}

export const competitiveExams: CompetitiveExamData[] = [
  {
    id: 'jee-mains',
    name: 'JEE Mains',
    category: 'Engineering Entrance',
    icon: '🎯',
    overview: 'JEE Main is the national level undergraduate engineering entrance exam for admission to NITs, IIITs, and other CFTIs. It is also the qualifying exam for JEE Advanced.',
    eligibility: '12th pass or appearing with Physics, Chemistry, and Mathematics',
    ageLimit: 'No age limit (candidates must have passed 12th in 2023, 2024, or 2025)',
    examPattern: [
      { section: 'Physics', questions: 30, marks: 100, duration: '3 hours total' },
      { section: 'Chemistry', questions: 30, marks: 100, duration: '' },
      { section: 'Mathematics', questions: 30, marks: 100, duration: '' }
    ],
    syllabus: [
      {
        subject: 'Physics',
        topics: [
          {
            id: 'jee-physics-mechanics',
            name: 'Mechanics',
            subtopics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion', 'Gravitation', 'Properties of Matter', 'Fluid Mechanics']
          },
          {
            id: 'jee-physics-thermo',
            name: 'Thermodynamics',
            subtopics: ['Heat and Temperature', 'First Law', 'Second Law', 'Kinetic Theory', 'Heat Transfer', 'Calorimetry']
          },
          {
            id: 'jee-physics-waves',
            name: 'Waves and Oscillations',
            subtopics: ['Simple Harmonic Motion', 'Wave Motion', 'Sound Waves', 'Doppler Effect', 'Superposition', 'Standing Waves']
          },
          {
            id: 'jee-physics-electrostatics',
            name: 'Electrostatics',
            subtopics: ['Electric Charges', 'Coulombs Law', 'Electric Field', 'Gauss Law', 'Electric Potential', 'Capacitors', 'Dielectrics']
          },
          {
            id: 'jee-physics-current',
            name: 'Current Electricity',
            subtopics: ['Ohms Law', 'Kirchhoffs Laws', 'Wheatstone Bridge', 'Potentiometer', 'Cells and EMF', 'Heating Effect']
          },
          {
            id: 'jee-physics-magnetism',
            name: 'Magnetism',
            subtopics: ['Magnetic Field', 'Biot-Savart Law', 'Amperes Law', 'Electromagnetic Induction', 'AC Circuits', 'Transformers']
          },
          {
            id: 'jee-physics-optics',
            name: 'Optics',
            subtopics: ['Reflection', 'Refraction', 'Lenses', 'Mirrors', 'Wave Optics', 'Interference', 'Diffraction', 'Polarization']
          },
          {
            id: 'jee-physics-modern',
            name: 'Modern Physics',
            subtopics: ['Photoelectric Effect', 'Atomic Structure', 'X-rays', 'Nuclear Physics', 'Radioactivity', 'Semiconductors']
          }
        ]
      },
      {
        subject: 'Chemistry',
        topics: [
          {
            id: 'jee-chem-structure',
            name: 'Atomic Structure',
            subtopics: ['Bohr Model', 'Quantum Numbers', 'Orbitals', 'Electronic Configuration', 'Periodic Properties']
          },
          {
            id: 'jee-chem-bonding',
            name: 'Chemical Bonding',
            subtopics: ['Ionic Bond', 'Covalent Bond', 'VSEPR Theory', 'Hybridization', 'Molecular Orbital Theory', 'Hydrogen Bonding']
          },
          {
            id: 'jee-chem-states',
            name: 'States of Matter',
            subtopics: ['Gas Laws', 'Kinetic Theory', 'Real Gases', 'Liquids', 'Solids', 'Crystal Structure']
          },
          {
            id: 'jee-chem-thermo',
            name: 'Chemical Thermodynamics',
            subtopics: ['First Law', 'Enthalpy', 'Hess Law', 'Bond Energy', 'Gibbs Energy', 'Spontaneity']
          },
          {
            id: 'jee-chem-equilibrium',
            name: 'Chemical Equilibrium',
            subtopics: ['Equilibrium Constant', 'Le Chatelier Principle', 'Ionic Equilibrium', 'pH and pOH', 'Buffer Solutions', 'Solubility Product']
          },
          {
            id: 'jee-chem-electrochem',
            name: 'Electrochemistry',
            subtopics: ['Electrolysis', 'Faraday Laws', 'EMF', 'Nernst Equation', 'Batteries', 'Corrosion']
          },
          {
            id: 'jee-chem-kinetics',
            name: 'Chemical Kinetics',
            subtopics: ['Rate of Reaction', 'Order of Reaction', 'Molecularity', 'Arrhenius Equation', 'Catalysis']
          },
          {
            id: 'jee-chem-organic',
            name: 'Organic Chemistry',
            subtopics: ['Hydrocarbons', 'Haloalkanes', 'Alcohols Phenols', 'Aldehydes Ketones', 'Carboxylic Acids', 'Amines', 'Polymers', 'Biomolecules']
          },
          {
            id: 'jee-chem-inorganic',
            name: 'Inorganic Chemistry',
            subtopics: ['s-Block Elements', 'p-Block Elements', 'd-Block Elements', 'Coordination Compounds', 'Metallurgy', 'Qualitative Analysis']
          }
        ]
      },
      {
        subject: 'Mathematics',
        topics: [
          {
            id: 'jee-math-algebra',
            name: 'Algebra',
            subtopics: ['Complex Numbers', 'Quadratic Equations', 'Sequences and Series', 'Binomial Theorem', 'Permutation Combination', 'Matrices and Determinants']
          },
          {
            id: 'jee-math-trigonometry',
            name: 'Trigonometry',
            subtopics: ['Trigonometric Ratios', 'Trigonometric Equations', 'Inverse Trigonometric Functions', 'Heights and Distances']
          },
          {
            id: 'jee-math-coordinate',
            name: 'Coordinate Geometry',
            subtopics: ['Straight Lines', 'Circles', 'Parabola', 'Ellipse', 'Hyperbola', '3D Geometry']
          },
          {
            id: 'jee-math-calculus',
            name: 'Calculus',
            subtopics: ['Limits and Continuity', 'Differentiation', 'Applications of Derivatives', 'Integration', 'Definite Integrals', 'Differential Equations', 'Area Under Curves']
          },
          {
            id: 'jee-math-vectors',
            name: 'Vectors and 3D',
            subtopics: ['Vector Algebra', 'Scalar and Vector Products', 'Lines in 3D', 'Planes', 'Distance Formulas']
          },
          {
            id: 'jee-math-probability',
            name: 'Probability and Statistics',
            subtopics: ['Probability Basics', 'Conditional Probability', 'Bayes Theorem', 'Random Variables', 'Mean Variance', 'Binomial Distribution']
          }
        ]
      }
    ],
    importantFormulas: [
      { name: 'Kinetic Energy', formula: 'KE = ½mv²', usage: 'Calculate energy of moving objects' },
      { name: 'Quadratic Formula', formula: 'x = (-b ± √(b²-4ac)) / 2a', usage: 'Solve quadratic equations' },
      { name: 'Nernst Equation', formula: 'E = E° - (RT/nF)lnQ', usage: 'Calculate electrode potential' }
    ],
    tips: [
      'Focus on NCERT thoroughly - 60% questions are NCERT based',
      'Practice previous year papers - patterns often repeat',
      'Master short tricks for numerical problems',
      'Allocate time properly during exam',
      'Attempt questions you are confident about first'
    ]
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    category: 'Engineering Entrance',
    icon: '🏆',
    overview: 'JEE Advanced is the gateway to IITs (Indian Institutes of Technology). Only top 2,50,000 JEE Main qualifiers are eligible.',
    eligibility: 'Must qualify JEE Main with top 2,50,000 rank',
    ageLimit: 'Should have passed 12th in 2024 or 2025 (maximum 2 attempts)',
    examPattern: [
      { section: 'Paper 1 - Physics', questions: 20, marks: 60, duration: '3 hours' },
      { section: 'Paper 1 - Chemistry', questions: 20, marks: 60, duration: '' },
      { section: 'Paper 1 - Mathematics', questions: 20, marks: 60, duration: '' },
      { section: 'Paper 2 - Physics', questions: 20, marks: 60, duration: '3 hours' },
      { section: 'Paper 2 - Chemistry', questions: 20, marks: 60, duration: '' },
      { section: 'Paper 2 - Mathematics', questions: 20, marks: 60, duration: '' }
    ],
    syllabus: [
      {
        subject: 'Physics',
        topics: [
          {
            id: 'adv-physics-mechanics',
            name: 'Advanced Mechanics',
            subtopics: ['Kinematics in 2D', 'Relative Motion', 'Constraints', 'Pseudo Forces', 'Rotational Dynamics', 'Angular Momentum', 'Torque', 'Rolling Motion']
          },
          {
            id: 'adv-physics-thermo',
            name: 'Advanced Thermodynamics',
            subtopics: ['Thermodynamic Processes', 'Carnot Cycle', 'Entropy', 'Free Expansion', 'Conduction Convection Radiation']
          },
          {
            id: 'adv-physics-em',
            name: 'Electromagnetism',
            subtopics: ['Electric Flux', 'Conductors', 'Dielectrics', 'Self Inductance', 'Mutual Inductance', 'LCR Circuits', 'Resonance', 'EM Waves']
          },
          {
            id: 'adv-physics-optics',
            name: 'Advanced Optics',
            subtopics: ['Optical Instruments', 'Resolution', 'Polarization by Reflection', 'Brewster Law', 'Optical Path', 'Thin Films']
          },
          {
            id: 'adv-physics-modern',
            name: 'Advanced Modern Physics',
            subtopics: ['Compton Effect', 'Matter Waves', 'Uncertainty Principle', 'Nuclear Reactions', 'Binding Energy', 'Fission Fusion']
          }
        ]
      },
      {
        subject: 'Chemistry',
        topics: [
          {
            id: 'adv-chem-organic',
            name: 'Organic Chemistry Advanced',
            subtopics: ['Named Reactions', 'Reaction Mechanisms', 'Stereochemistry', 'Optical Activity', 'Aromatic Compounds', 'Spectroscopy Basics']
          },
          {
            id: 'adv-chem-inorganic',
            name: 'Inorganic Chemistry Advanced',
            subtopics: ['Crystal Field Theory', 'Magnetic Properties', 'Organometallic Compounds', 'Catalysis', 'Extraction of Metals']
          },
          {
            id: 'adv-chem-physical',
            name: 'Physical Chemistry Advanced',
            subtopics: ['Thermodynamics Applications', 'Electrochemistry Problems', 'Kinetics Problems', 'Surface Chemistry', 'Colligative Properties']
          }
        ]
      },
      {
        subject: 'Mathematics',
        topics: [
          {
            id: 'adv-math-algebra',
            name: 'Advanced Algebra',
            subtopics: ['Complex Numbers Geometry', 'Polynomial Equations', 'Functional Equations', 'Inequalities', 'Number Theory']
          },
          {
            id: 'adv-math-calculus',
            name: 'Advanced Calculus',
            subtopics: ['Limits Special Cases', 'Continuity Differentiability', 'Mean Value Theorems', 'Integration Techniques', 'Improper Integrals']
          },
          {
            id: 'adv-math-coordinate',
            name: 'Advanced Coordinate Geometry',
            subtopics: ['Conic Sections Advanced', 'Tangent Normal', 'Chord of Contact', 'Director Circle', 'Pole Polar']
          },
          {
            id: 'adv-math-vectors',
            name: 'Advanced Vectors',
            subtopics: ['Vector Triple Product', 'Reciprocal System', 'Plane Section', 'Shortest Distance', 'Angle Between Planes']
          }
        ]
      }
    ],
    importantFormulas: [],
    tips: [
      'Master concepts deeply - Advanced tests understanding not just formulas',
      'Practice integer type and matrix match questions',
      'Time management is crucial - dont spend too much on single question',
      'Negative marking varies - be careful with guessing',
      'Revise from IIT coaching materials and previous papers'
    ]
  },
  {
    id: 'neet',
    name: 'NEET UG',
    category: 'Medical Entrance',
    icon: '⚕️',
    overview: 'NEET (National Eligibility cum Entrance Test) is the single entrance exam for MBBS, BDS, AYUSH, and other medical courses in India.',
    eligibility: '12th pass with Physics, Chemistry, and Biology',
    ageLimit: 'Minimum 17 years, No upper limit',
    examPattern: [
      { section: 'Physics', questions: 50, marks: 200, duration: '3 hours 20 minutes total' },
      { section: 'Chemistry', questions: 50, marks: 200, duration: '' },
      { section: 'Botany', questions: 50, marks: 200, duration: '' },
      { section: 'Zoology', questions: 50, marks: 200, duration: '' }
    ],
    syllabus: [
      {
        subject: 'Physics',
        topics: [
          {
            id: 'neet-physics-mechanics',
            name: 'Mechanics',
            subtopics: ['Units and Measurements', 'Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion', 'Gravitation']
          },
          {
            id: 'neet-physics-properties',
            name: 'Properties of Matter',
            subtopics: ['Mechanical Properties', 'Thermal Properties', 'Fluid Mechanics']
          },
          {
            id: 'neet-physics-thermo',
            name: 'Thermodynamics',
            subtopics: ['Heat Transfer', 'Kinetic Theory', 'Laws of Thermodynamics']
          },
          {
            id: 'neet-physics-waves',
            name: 'Oscillations and Waves',
            subtopics: ['Simple Harmonic Motion', 'Wave Motion', 'Sound']
          },
          {
            id: 'neet-physics-electricity',
            name: 'Electricity and Magnetism',
            subtopics: ['Electrostatics', 'Current Electricity', 'Magnetic Effects', 'EMI', 'AC']
          },
          {
            id: 'neet-physics-optics',
            name: 'Optics',
            subtopics: ['Ray Optics', 'Wave Optics', 'Optical Instruments']
          },
          {
            id: 'neet-physics-modern',
            name: 'Modern Physics',
            subtopics: ['Dual Nature of Matter', 'Atoms and Nuclei', 'Electronic Devices']
          }
        ]
      },
      {
        subject: 'Chemistry',
        topics: [
          {
            id: 'neet-chem-basic',
            name: 'Basic Concepts',
            subtopics: ['Mole Concept', 'Atomic Structure', 'Classification of Elements', 'Chemical Bonding']
          },
          {
            id: 'neet-chem-states',
            name: 'States of Matter',
            subtopics: ['Gaseous State', 'Liquid State', 'Solid State']
          },
          {
            id: 'neet-chem-thermo',
            name: 'Thermodynamics and Equilibrium',
            subtopics: ['Chemical Thermodynamics', 'Equilibrium', 'Ionic Equilibrium']
          },
          {
            id: 'neet-chem-solutions',
            name: 'Solutions and Electrochemistry',
            subtopics: ['Solutions', 'Electrochemistry', 'Chemical Kinetics']
          },
          {
            id: 'neet-chem-organic',
            name: 'Organic Chemistry',
            subtopics: ['Basic Principles', 'Hydrocarbons', 'Organic Compounds with Functional Groups', 'Biomolecules', 'Polymers']
          },
          {
            id: 'neet-chem-inorganic',
            name: 'Inorganic Chemistry',
            subtopics: ['s-Block Elements', 'p-Block Elements', 'd and f Block Elements', 'Coordination Compounds']
          }
        ]
      },
      {
        subject: 'Biology',
        topics: [
          {
            id: 'neet-bio-diversity',
            name: 'Diversity in Living World',
            subtopics: ['Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom']
          },
          {
            id: 'neet-bio-structural',
            name: 'Structural Organization',
            subtopics: ['Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Animal Tissues']
          },
          {
            id: 'neet-bio-cell',
            name: 'Cell Structure and Function',
            subtopics: ['Cell Biology', 'Biomolecules', 'Cell Division']
          },
          {
            id: 'neet-bio-plant',
            name: 'Plant Physiology',
            subtopics: ['Transport in Plants', 'Mineral Nutrition', 'Photosynthesis', 'Respiration', 'Plant Growth']
          },
          {
            id: 'neet-bio-human',
            name: 'Human Physiology',
            subtopics: ['Digestion', 'Breathing', 'Circulation', 'Excretion', 'Locomotion', 'Neural Control', 'Hormones']
          },
          {
            id: 'neet-bio-reproduction',
            name: 'Reproduction',
            subtopics: ['Reproduction in Organisms', 'Sexual Reproduction in Plants', 'Human Reproduction', 'Reproductive Health']
          },
          {
            id: 'neet-bio-genetics',
            name: 'Genetics and Evolution',
            subtopics: ['Heredity', 'Molecular Basis of Inheritance', 'Evolution']
          },
          {
            id: 'neet-bio-biotech',
            name: 'Biology in Human Welfare',
            subtopics: ['Human Health', 'Microbes', 'Biotechnology Principles', 'Biotechnology Applications']
          },
          {
            id: 'neet-bio-ecology',
            name: 'Ecology',
            subtopics: ['Organisms and Populations', 'Ecosystem', 'Biodiversity', 'Environmental Issues']
          }
        ]
      }
    ],
    importantFormulas: [
      { name: 'Hardy-Weinberg Equation', formula: 'p² + 2pq + q² = 1', usage: 'Population genetics' },
      { name: 'Enzyme Kinetics', formula: 'V = Vmax[S]/(Km + [S])', usage: 'Michaelis-Menten equation' }
    ],
    tips: [
      'NCERT is the Bible for NEET - read every line multiple times',
      'Biology carries maximum marks - focus heavily on it',
      'Practice diagrams - they are frequently asked',
      'Memorize exceptions and examples from NCERT',
      'Previous 10 years papers are gold - solve them multiple times'
    ]
  },
  {
    id: 'gate',
    name: 'GATE',
    category: 'Post Graduate',
    icon: '🎓',
    overview: 'GATE (Graduate Aptitude Test in Engineering) is for admission to postgraduate programs in IITs, NITs, and PSU recruitment.',
    eligibility: "Bachelor's degree in Engineering/Technology or Master's in Science",
    ageLimit: 'No age limit',
    examPattern: [
      { section: 'General Aptitude', questions: 10, marks: 15, duration: '3 hours total' },
      { section: 'Engineering Mathematics', questions: 13, marks: 15, duration: '' },
      { section: 'Subject Questions', questions: 42, marks: 70, duration: '' }
    ],
    syllabus: [
      {
        subject: 'General Aptitude',
        topics: [
          {
            id: 'gate-ga-verbal',
            name: 'Verbal Ability',
            subtopics: ['English Grammar', 'Vocabulary', 'Reading Comprehension', 'Sentence Completion']
          },
          {
            id: 'gate-ga-numerical',
            name: 'Numerical Ability',
            subtopics: ['Number Series', 'Data Interpretation', 'Ratio Proportion', 'Percentage', 'Permutation Combination']
          }
        ]
      },
      {
        subject: 'Engineering Mathematics',
        topics: [
          {
            id: 'gate-math-la',
            name: 'Linear Algebra',
            subtopics: ['Matrix Operations', 'Eigenvalues', 'Eigenvectors', 'Determinants', 'Linear Equations']
          },
          {
            id: 'gate-math-calculus',
            name: 'Calculus',
            subtopics: ['Limits', 'Continuity', 'Differentiation', 'Integration', 'Maxima Minima', 'Multiple Integrals']
          },
          {
            id: 'gate-math-de',
            name: 'Differential Equations',
            subtopics: ['First Order', 'Higher Order', 'Partial Differential Equations', 'Laplace Transform']
          },
          {
            id: 'gate-math-complex',
            name: 'Complex Analysis',
            subtopics: ['Complex Functions', 'Analytic Functions', 'Cauchy Integral', 'Residue Theorem']
          },
          {
            id: 'gate-math-prob',
            name: 'Probability and Statistics',
            subtopics: ['Probability', 'Random Variables', 'Distributions', 'Mean Variance', 'Regression']
          },
          {
            id: 'gate-math-numerical',
            name: 'Numerical Methods',
            subtopics: ['Root Finding', 'Interpolation', 'Numerical Integration', 'Numerical Differentiation']
          }
        ]
      }
    ],
    importantFormulas: [],
    tips: [
      'Virtual Calculator practice is essential',
      'Focus on Engineering Mathematics - its common across all branches',
      'Previous year papers are most important for GATE prep',
      'MSQs and NAT type questions need extra practice',
      'PSU cutoffs are usually higher than IIT cutoffs'
    ]
  },
  {
    id: 'cat',
    name: 'CAT',
    category: 'Management',
    icon: '💼',
    overview: 'CAT (Common Admission Test) is for admission to IIMs and other top B-schools in India.',
    eligibility: "Bachelor's degree with minimum 50% marks",
    ageLimit: 'No age limit',
    examPattern: [
      { section: 'VARC', questions: 24, marks: 72, duration: '40 minutes' },
      { section: 'DILR', questions: 20, marks: 60, duration: '40 minutes' },
      { section: 'Quantitative Ability', questions: 22, marks: 66, duration: '40 minutes' }
    ],
    syllabus: [
      {
        subject: 'Verbal Ability and Reading Comprehension',
        topics: [
          {
            id: 'cat-varc-rc',
            name: 'Reading Comprehension',
            subtopics: ['Passage Types', 'Inference Questions', 'Main Idea', 'Tone and Purpose', 'Vocabulary in Context']
          },
          {
            id: 'cat-varc-va',
            name: 'Verbal Ability',
            subtopics: ['Para Jumbles', 'Para Summary', 'Odd Sentence Out', 'Sentence Completion']
          }
        ]
      },
      {
        subject: 'Data Interpretation and Logical Reasoning',
        topics: [
          {
            id: 'cat-dilr-di',
            name: 'Data Interpretation',
            subtopics: ['Tables', 'Bar Graphs', 'Line Graphs', 'Pie Charts', 'Caselets', 'Games and Tournaments']
          },
          {
            id: 'cat-dilr-lr',
            name: 'Logical Reasoning',
            subtopics: ['Arrangements', 'Blood Relations', 'Coding', 'Syllogism', 'Cubes', 'Binary Logic']
          }
        ]
      },
      {
        subject: 'Quantitative Ability',
        topics: [
          {
            id: 'cat-qa-arithmetic',
            name: 'Arithmetic',
            subtopics: ['Number System', 'Percentage', 'Ratio', 'Profit Loss', 'Interest', 'Time Work', 'Time Speed Distance', 'Mixtures']
          },
          {
            id: 'cat-qa-algebra',
            name: 'Algebra',
            subtopics: ['Equations', 'Inequalities', 'Functions', 'Progressions', 'Logarithms']
          },
          {
            id: 'cat-qa-geometry',
            name: 'Geometry and Mensuration',
            subtopics: ['Lines Angles', 'Triangles', 'Circles', 'Quadrilaterals', 'Area Volume']
          },
          {
            id: 'cat-qa-modern',
            name: 'Modern Math',
            subtopics: ['Permutation Combination', 'Probability', 'Set Theory', 'Coordinate Geometry']
          }
        ]
      }
    ],
    importantFormulas: [],
    tips: [
      'RC is the most scoring section - read diverse topics daily',
      'DILR sets can make or break your score - practice extensively',
      'Time management is crucial - 2 minutes per question average',
      'Mock tests are absolutely essential - take 30+ mocks',
      'Focus on accuracy over attempts in initial mocks'
    ]
  }
];
