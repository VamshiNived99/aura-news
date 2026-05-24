import { YearData } from "./cse-aiml";

export const eeeData: YearData[] = [
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
              { unitNumber: 2, unitName: 'Differential Calculus', chapters: ['Limits and Continuity', 'Differentiation', 'Applications'] },
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
            code: 'EE203',
            name: 'Basic Electrical Engineering',
            units: [
              { unitNumber: 1, unitName: 'DC Circuits', chapters: ['Kirchhoff\'s Laws', 'Network Theorems', 'Mesh Analysis'] },
              { unitNumber: 2, unitName: 'AC Circuits', chapters: ['Phasors', 'Impedance', 'Power Factor'] },
              { unitNumber: 3, unitName: 'Transformers', chapters: ['Construction', 'Working Principle', 'Losses'] },
              { unitNumber: 4, unitName: 'Electrical Machines', chapters: ['DC Motors', 'AC Motors', 'Generators'] },
              { unitNumber: 5, unitName: 'Measuring Instruments', chapters: ['Ammeter', 'Voltmeter', 'Wattmeter'] }
            ]
          },
          {
            code: 'ME204',
            name: 'Engineering Graphics',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Drawing Instruments', 'Lines', 'Lettering'] },
              { unitNumber: 2, unitName: 'Projections of Points & Lines', chapters: ['First Angle Projection', 'Third Angle Projection'] },
              { unitNumber: 3, unitName: 'Projections of Planes', chapters: ['Plane Figures', 'Traces'] },
              { unitNumber: 4, unitName: 'Projections of Solids', chapters: ['Prisms', 'Pyramids', 'Cylinders', 'Cones'] },
              { unitNumber: 5, unitName: 'Isometric Projections', chapters: ['Isometric Scale', 'Isometric Views'] }
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
            name: 'Transforms & Partial DE',
            units: [
              { unitNumber: 1, unitName: 'Laplace Transforms', chapters: ['Definition', 'Properties', 'Inverse Transform'] },
              { unitNumber: 2, unitName: 'Fourier Series', chapters: ['Fourier Coefficients', 'Half Range Series', 'Parseval\'s Theorem'] },
              { unitNumber: 3, unitName: 'Fourier Transforms', chapters: ['Definition', 'Properties', 'Applications'] },
              { unitNumber: 4, unitName: 'Z-Transforms', chapters: ['Definition', 'Properties', 'Inverse Z-Transform'] },
              { unitNumber: 5, unitName: 'Partial DE', chapters: ['Classification', 'Wave Equation', 'Heat Equation'] }
            ]
          },
          {
            code: 'EE301',
            name: 'Electrical Circuit Analysis',
            units: [
              { unitNumber: 1, unitName: 'Network Topology', chapters: ['Graph Theory', 'Incidence Matrix', 'Loop Analysis'] },
              { unitNumber: 2, unitName: 'Network Theorems', chapters: ['Superposition', 'Thevenin', 'Norton', 'Maximum Power'] },
              { unitNumber: 3, unitName: 'Transient Analysis', chapters: ['RL Circuits', 'RC Circuits', 'RLC Circuits'] },
              { unitNumber: 4, unitName: 'Two-Port Networks', chapters: ['Z Parameters', 'Y Parameters', 'ABCD Parameters'] },
              { unitNumber: 5, unitName: 'Filters', chapters: ['Low Pass', 'High Pass', 'Band Pass', 'Band Stop'] }
            ]
          },
          {
            code: 'EE302',
            name: 'Electronic Devices & Circuits',
            units: [
              { unitNumber: 1, unitName: 'Semiconductor Physics', chapters: ['Energy Bands', 'Carrier Concentration', 'Drift & Diffusion'] },
              { unitNumber: 2, unitName: 'Diodes', chapters: ['PN Junction', 'Zener Diode', 'Rectifiers'] },
              { unitNumber: 3, unitName: 'Transistors', chapters: ['BJT', 'FET', 'MOSFET'] },
              { unitNumber: 4, unitName: 'Amplifiers', chapters: ['CE Amplifier', 'CB Amplifier', 'CC Amplifier'] },
              { unitNumber: 5, unitName: 'Op-Amps', chapters: ['Ideal Op-Amp', 'Applications', 'Active Filters'] }
            ]
          },
          {
            code: 'EE303',
            name: 'Electrical Machines I',
            units: [
              { unitNumber: 1, unitName: 'Magnetic Circuits', chapters: ['Magnetic Materials', 'Hysteresis', 'Eddy Currents'] },
              { unitNumber: 2, unitName: 'Transformers', chapters: ['Construction', 'EMF Equation', 'Testing'] },
              { unitNumber: 3, unitName: 'Three-Phase Transformers', chapters: ['Connections', 'Parallel Operation'] },
              { unitNumber: 4, unitName: 'DC Generators', chapters: ['Construction', 'EMF Equation', 'Characteristics'] },
              { unitNumber: 5, unitName: 'DC Motors', chapters: ['Types', 'Characteristics', 'Speed Control'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'EE304',
            name: 'Electromagnetic Fields',
            units: [
              { unitNumber: 1, unitName: 'Electrostatics', chapters: ['Coulomb\'s Law', 'Gauss\'s Law', 'Potential'] },
              { unitNumber: 2, unitName: 'Conductors & Dielectrics', chapters: ['Boundary Conditions', 'Capacitance', 'Energy'] },
              { unitNumber: 3, unitName: 'Magnetostatics', chapters: ['Biot-Savart Law', 'Ampere\'s Law', 'Magnetic Materials'] },
              { unitNumber: 4, unitName: 'Maxwell\'s Equations', chapters: ['Time-Varying Fields', 'Differential Form', 'Integral Form'] },
              { unitNumber: 5, unitName: 'EM Waves', chapters: ['Wave Equation', 'Propagation', 'Transmission Lines'] }
            ]
          },
          {
            code: 'EE305',
            name: 'Electrical Machines II',
            units: [
              { unitNumber: 1, unitName: 'Synchronous Generators', chapters: ['Construction', 'EMF Equation', 'Voltage Regulation'] },
              { unitNumber: 2, unitName: 'Synchronous Motors', chapters: ['Starting Methods', 'V-Curves', 'Hunting'] },
              { unitNumber: 3, unitName: 'Induction Motors', chapters: ['Construction', 'Torque-Slip', 'Starting Methods'] },
              { unitNumber: 4, unitName: 'Single Phase Motors', chapters: ['Types', 'Starting Methods', 'Applications'] },
              { unitNumber: 5, unitName: 'Special Machines', chapters: ['Stepper Motors', 'BLDC', 'Servo Motors'] }
            ]
          },
          {
            code: 'EE306',
            name: 'Signals & Systems',
            units: [
              { unitNumber: 1, unitName: 'Signal Classification', chapters: ['Continuous', 'Discrete', 'Properties'] },
              { unitNumber: 2, unitName: 'System Classification', chapters: ['LTI Systems', 'Convolution', 'Stability'] },
              { unitNumber: 3, unitName: 'Fourier Analysis', chapters: ['Fourier Series', 'Fourier Transform', 'Properties'] },
              { unitNumber: 4, unitName: 'Laplace Transform', chapters: ['ROC', 'Transfer Function', 'Applications'] },
              { unitNumber: 5, unitName: 'Z-Transform', chapters: ['Properties', 'ROC', 'Discrete Systems'] }
            ]
          },
          {
            code: 'EE307',
            name: 'Control Systems',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Open Loop', 'Closed Loop', 'Transfer Function'] },
              { unitNumber: 2, unitName: 'Time Domain Analysis', chapters: ['Transient Response', 'Steady State Error', 'Stability'] },
              { unitNumber: 3, unitName: 'Root Locus', chapters: ['Rules', 'Stability Analysis', 'Compensation'] },
              { unitNumber: 4, unitName: 'Frequency Response', chapters: ['Bode Plot', 'Nyquist Plot', 'Gain Margin'] },
              { unitNumber: 5, unitName: 'State Space', chapters: ['State Variables', 'Controllability', 'Observability'] }
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
            code: 'EE401',
            name: 'Power Systems I',
            units: [
              { unitNumber: 1, unitName: 'Power Generation', chapters: ['Thermal', 'Hydro', 'Nuclear', 'Renewable'] },
              { unitNumber: 2, unitName: 'Transmission Lines', chapters: ['Parameters', 'Performance', 'ABCD Constants'] },
              { unitNumber: 3, unitName: 'Underground Cables', chapters: ['Construction', 'Capacitance', 'Insulation'] },
              { unitNumber: 4, unitName: 'Power System Components', chapters: ['Insulators', 'Corona', 'Sag'] },
              { unitNumber: 5, unitName: 'Distribution Systems', chapters: ['Types', 'Voltage Drop', 'Compensation'] }
            ]
          },
          {
            code: 'EE402',
            name: 'Power Electronics',
            units: [
              { unitNumber: 1, unitName: 'Power Devices', chapters: ['SCR', 'TRIAC', 'IGBT', 'MOSFET'] },
              { unitNumber: 2, unitName: 'Rectifiers', chapters: ['Uncontrolled', 'Controlled', 'Three-Phase'] },
              { unitNumber: 3, unitName: 'DC-DC Converters', chapters: ['Buck', 'Boost', 'Buck-Boost'] },
              { unitNumber: 4, unitName: 'Inverters', chapters: ['Single Phase', 'Three Phase', 'PWM Techniques'] },
              { unitNumber: 5, unitName: 'AC Voltage Controllers', chapters: ['Single Phase', 'Three Phase', 'Cycloconverters'] }
            ]
          },
          {
            code: 'EE403',
            name: 'Digital Electronics',
            units: [
              { unitNumber: 1, unitName: 'Number Systems', chapters: ['Binary', 'Octal', 'Hexadecimal', 'Conversions'] },
              { unitNumber: 2, unitName: 'Boolean Algebra', chapters: ['Laws', 'Simplification', 'K-Maps'] },
              { unitNumber: 3, unitName: 'Combinational Circuits', chapters: ['Multiplexers', 'Decoders', 'Adders'] },
              { unitNumber: 4, unitName: 'Sequential Circuits', chapters: ['Flip-Flops', 'Counters', 'Registers'] },
              { unitNumber: 5, unitName: 'Memory and PLDs', chapters: ['ROM', 'RAM', 'PLA', 'FPGA'] }
            ]
          },
          {
            code: 'EE404',
            name: 'Microprocessors & Microcontrollers',
            units: [
              { unitNumber: 1, unitName: '8086 Architecture', chapters: ['Registers', 'Bus Interface', 'Memory Segmentation'] },
              { unitNumber: 2, unitName: '8086 Programming', chapters: ['Addressing Modes', 'Instruction Set', 'Interrupts'] },
              { unitNumber: 3, unitName: '8051 Microcontroller', chapters: ['Architecture', 'I/O Ports', 'Timers'] },
              { unitNumber: 4, unitName: '8051 Programming', chapters: ['Assembly Language', 'C Programming', 'Serial Communication'] },
              { unitNumber: 5, unitName: 'Interfacing', chapters: ['ADC', 'DAC', 'LCD', 'Keyboard'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'EE405',
            name: 'Power Systems II',
            units: [
              { unitNumber: 1, unitName: 'Load Flow Analysis', chapters: ['Gauss-Seidel', 'Newton-Raphson', 'Fast Decoupled'] },
              { unitNumber: 2, unitName: 'Economic Operation', chapters: ['Economic Dispatch', 'Unit Commitment', 'Optimal Power Flow'] },
              { unitNumber: 3, unitName: 'Symmetrical Faults', chapters: ['Fault Analysis', 'Short Circuit Calculations'] },
              { unitNumber: 4, unitName: 'Unsymmetrical Faults', chapters: ['Symmetrical Components', 'Sequence Networks'] },
              { unitNumber: 5, unitName: 'Power System Stability', chapters: ['Steady State', 'Transient', 'Dynamic Stability'] }
            ]
          },
          {
            code: 'EE406',
            name: 'Electrical Measurements',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Measurement Systems', 'Errors', 'Standards'] },
              { unitNumber: 2, unitName: 'Analog Instruments', chapters: ['PMMC', 'Moving Iron', 'Electrodynamometer'] },
              { unitNumber: 3, unitName: 'Bridge Circuits', chapters: ['Wheatstone', 'Kelvin', 'AC Bridges'] },
              { unitNumber: 4, unitName: 'Digital Instruments', chapters: ['Digital Voltmeter', 'Digital Multimeter', 'CRO'] },
              { unitNumber: 5, unitName: 'Transducers', chapters: ['Resistive', 'Inductive', 'Capacitive', 'Piezoelectric'] }
            ]
          },
          {
            code: 'EE407',
            name: 'Electrical Machine Design',
            units: [
              { unitNumber: 1, unitName: 'Design Principles', chapters: ['Output Equation', 'Specific Loadings', 'Materials'] },
              { unitNumber: 2, unitName: 'Transformer Design', chapters: ['Core Design', 'Winding Design', 'Cooling'] },
              { unitNumber: 3, unitName: 'DC Machine Design', chapters: ['Armature Design', 'Field Design', 'Commutator'] },
              { unitNumber: 4, unitName: 'Induction Motor Design', chapters: ['Stator Design', 'Rotor Design', 'Ventilation'] },
              { unitNumber: 5, unitName: 'Synchronous Machine Design', chapters: ['Salient Pole', 'Cylindrical Rotor', 'Cooling'] }
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
            code: 'EE501',
            name: 'Power System Protection',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Protection Principles', 'Relaying', 'CT & PT'] },
              { unitNumber: 2, unitName: 'Overcurrent Protection', chapters: ['Inverse Time', 'Directional', 'Distance'] },
              { unitNumber: 3, unitName: 'Differential Protection', chapters: ['Transformer', 'Generator', 'Bus'] },
              { unitNumber: 4, unitName: 'Distance Protection', chapters: ['Impedance', 'MHO', 'Reactance'] },
              { unitNumber: 5, unitName: 'Circuit Breakers', chapters: ['Types', 'Arc Extinction', 'Rating'] }
            ]
          },
          {
            code: 'EE502',
            name: 'Electric Drives',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Drive Components', 'Load Types', 'Dynamics'] },
              { unitNumber: 2, unitName: 'DC Drives', chapters: ['Converter Fed', 'Chopper Fed', 'Four Quadrant'] },
              { unitNumber: 3, unitName: 'Induction Motor Drives', chapters: ['V/F Control', 'Vector Control', 'DTC'] },
              { unitNumber: 4, unitName: 'Synchronous Motor Drives', chapters: ['Load Commutated', 'Self-Controlled', 'PMSM'] },
              { unitNumber: 5, unitName: 'Special Drives', chapters: ['Stepper Motor', 'SRM', 'BLDC'] }
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
