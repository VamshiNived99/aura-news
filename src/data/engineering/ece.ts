import { YearData } from "./cse-aiml";

export const eceData: YearData[] = [
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
            code: 'EC203',
            name: 'Basic Electronics',
            units: [
              { unitNumber: 1, unitName: 'Semiconductor Physics', chapters: ['Energy Bands', 'Carrier Concentration', 'Drift & Diffusion'] },
              { unitNumber: 2, unitName: 'Diodes', chapters: ['PN Junction', 'Zener Diode', 'Rectifiers'] },
              { unitNumber: 3, unitName: 'Transistors', chapters: ['BJT', 'FET', 'MOSFET'] },
              { unitNumber: 4, unitName: 'Amplifiers', chapters: ['CE Amplifier', 'CB Amplifier', 'CC Amplifier'] },
              { unitNumber: 5, unitName: 'Oscillators', chapters: ['RC Oscillators', 'LC Oscillators', 'Crystal Oscillators'] }
            ]
          },
          {
            code: 'EE204',
            name: 'Electrical Engineering',
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
            name: 'Transforms & Complex Analysis',
            units: [
              { unitNumber: 1, unitName: 'Laplace Transforms', chapters: ['Definition', 'Properties', 'Inverse Transform'] },
              { unitNumber: 2, unitName: 'Fourier Series', chapters: ['Fourier Coefficients', 'Half Range Series', 'Parseval\'s Theorem'] },
              { unitNumber: 3, unitName: 'Fourier Transforms', chapters: ['DFT', 'FFT', 'Applications'] },
              { unitNumber: 4, unitName: 'Z-Transforms', chapters: ['Definition', 'Properties', 'Inverse Z-Transform'] },
              { unitNumber: 5, unitName: 'Complex Analysis', chapters: ['Analytic Functions', 'Cauchy\'s Theorem', 'Residues'] }
            ]
          },
          {
            code: 'EC301',
            name: 'Electronic Devices & Circuits',
            units: [
              { unitNumber: 1, unitName: 'Semiconductor Physics', chapters: ['PN Junction', 'Diode Characteristics', 'Special Diodes'] },
              { unitNumber: 2, unitName: 'BJT', chapters: ['Configuration', 'Biasing', 'Small Signal Analysis'] },
              { unitNumber: 3, unitName: 'FET', chapters: ['JFET', 'MOSFET', 'Amplifiers'] },
              { unitNumber: 4, unitName: 'Feedback Amplifiers', chapters: ['Types', 'Stability', 'Oscillators'] },
              { unitNumber: 5, unitName: 'Power Amplifiers', chapters: ['Class A', 'Class B', 'Class AB'] }
            ]
          },
          {
            code: 'EC302',
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
            code: 'EC303',
            name: 'Network Analysis',
            units: [
              { unitNumber: 1, unitName: 'Network Topology', chapters: ['Graph Theory', 'Incidence Matrix', 'Loop Analysis'] },
              { unitNumber: 2, unitName: 'Network Theorems', chapters: ['Superposition', 'Thevenin', 'Norton'] },
              { unitNumber: 3, unitName: 'Transient Analysis', chapters: ['RL Circuits', 'RC Circuits', 'RLC Circuits'] },
              { unitNumber: 4, unitName: 'Two-Port Networks', chapters: ['Z Parameters', 'Y Parameters', 'ABCD Parameters'] },
              { unitNumber: 5, unitName: 'Filters', chapters: ['Low Pass', 'High Pass', 'Band Pass'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'EC304',
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
            code: 'EC305',
            name: 'Analog Communications',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Communication System', 'Modulation Need', 'Types'] },
              { unitNumber: 2, unitName: 'Amplitude Modulation', chapters: ['AM', 'DSB-SC', 'SSB'] },
              { unitNumber: 3, unitName: 'Angle Modulation', chapters: ['FM', 'PM', 'Comparison'] },
              { unitNumber: 4, unitName: 'Transmitters & Receivers', chapters: ['Superheterodyne', 'AGC', 'AFC'] },
              { unitNumber: 5, unitName: 'Noise', chapters: ['Types', 'SNR', 'Figure of Merit'] }
            ]
          },
          {
            code: 'EC306',
            name: 'Electromagnetic Theory',
            units: [
              { unitNumber: 1, unitName: 'Electrostatics', chapters: ['Coulomb\'s Law', 'Gauss\'s Law', 'Potential'] },
              { unitNumber: 2, unitName: 'Magnetostatics', chapters: ['Biot-Savart Law', 'Ampere\'s Law', 'Magnetic Materials'] },
              { unitNumber: 3, unitName: 'Maxwell\'s Equations', chapters: ['Differential Form', 'Integral Form', 'Applications'] },
              { unitNumber: 4, unitName: 'EM Waves', chapters: ['Wave Equation', 'Propagation', 'Polarization'] },
              { unitNumber: 5, unitName: 'Transmission Lines', chapters: ['Parameters', 'Smith Chart', 'Impedance Matching'] }
            ]
          },
          {
            code: 'EC307',
            name: 'Control Systems',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Open Loop', 'Closed Loop', 'Transfer Function'] },
              { unitNumber: 2, unitName: 'Time Domain Analysis', chapters: ['Transient Response', 'Steady State Error', 'Stability'] },
              { unitNumber: 3, unitName: 'Frequency Domain Analysis', chapters: ['Bode Plot', 'Nyquist Plot', 'Gain Margin'] },
              { unitNumber: 4, unitName: 'State Space Analysis', chapters: ['State Variables', 'State Equation', 'Controllability'] },
              { unitNumber: 5, unitName: 'Controllers', chapters: ['P', 'PI', 'PID Controllers'] }
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
            code: 'EC401',
            name: 'Digital Signal Processing',
            units: [
              { unitNumber: 1, unitName: 'Discrete Signals', chapters: ['Sampling', 'Quantization', 'DFT'] },
              { unitNumber: 2, unitName: 'FFT', chapters: ['DIT Algorithm', 'DIF Algorithm', 'Applications'] },
              { unitNumber: 3, unitName: 'FIR Filters', chapters: ['Design Methods', 'Window Functions', 'Implementation'] },
              { unitNumber: 4, unitName: 'IIR Filters', chapters: ['Butterworth', 'Chebyshev', 'Bilinear Transform'] },
              { unitNumber: 5, unitName: 'DSP Applications', chapters: ['Speech Processing', 'Image Processing', 'Audio'] }
            ]
          },
          {
            code: 'EC402',
            name: 'Digital Communications',
            units: [
              { unitNumber: 1, unitName: 'Pulse Modulation', chapters: ['PAM', 'PWM', 'PPM', 'PCM'] },
              { unitNumber: 2, unitName: 'Digital Modulation', chapters: ['ASK', 'FSK', 'PSK', 'QAM'] },
              { unitNumber: 3, unitName: 'Error Control', chapters: ['Block Codes', 'Convolutional Codes', 'Turbo Codes'] },
              { unitNumber: 4, unitName: 'Spread Spectrum', chapters: ['DS-SS', 'FH-SS', 'CDMA'] },
              { unitNumber: 5, unitName: 'Information Theory', chapters: ['Entropy', 'Channel Capacity', 'Source Coding'] }
            ]
          },
          {
            code: 'EC403',
            name: 'Microprocessors & Microcontrollers',
            units: [
              { unitNumber: 1, unitName: '8086 Architecture', chapters: ['Registers', 'Bus Interface', 'Memory Segmentation'] },
              { unitNumber: 2, unitName: '8086 Programming', chapters: ['Addressing Modes', 'Instruction Set', 'Interrupts'] },
              { unitNumber: 3, unitName: '8051 Microcontroller', chapters: ['Architecture', 'I/O Ports', 'Timers'] },
              { unitNumber: 4, unitName: '8051 Programming', chapters: ['Assembly Language', 'C Programming', 'Serial Communication'] },
              { unitNumber: 5, unitName: 'Interfacing', chapters: ['ADC', 'DAC', 'LCD', 'Keyboard'] }
            ]
          },
          {
            code: 'EC404',
            name: 'VLSI Design',
            units: [
              { unitNumber: 1, unitName: 'MOS Transistors', chapters: ['NMOS', 'PMOS', 'CMOS'] },
              { unitNumber: 2, unitName: 'CMOS Circuits', chapters: ['Inverter', 'NAND', 'NOR', 'Transmission Gates'] },
              { unitNumber: 3, unitName: 'Combinational Circuits', chapters: ['Adders', 'Multipliers', 'Comparators'] },
              { unitNumber: 4, unitName: 'Sequential Circuits', chapters: ['Latches', 'Flip-Flops', 'Counters'] },
              { unitNumber: 5, unitName: 'Memory Design', chapters: ['SRAM', 'DRAM', 'ROM', 'Flash'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'EC405',
            name: 'Antennas & Wave Propagation',
            units: [
              { unitNumber: 1, unitName: 'Antenna Fundamentals', chapters: ['Radiation Pattern', 'Directivity', 'Gain'] },
              { unitNumber: 2, unitName: 'Wire Antennas', chapters: ['Dipole', 'Monopole', 'Loop Antenna'] },
              { unitNumber: 3, unitName: 'Aperture Antennas', chapters: ['Horn', 'Parabolic', 'Slot Antenna'] },
              { unitNumber: 4, unitName: 'Antenna Arrays', chapters: ['Linear Array', 'Planar Array', 'Phased Array'] },
              { unitNumber: 5, unitName: 'Wave Propagation', chapters: ['Ground Wave', 'Sky Wave', 'Space Wave'] }
            ]
          },
          {
            code: 'EC406',
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
            code: 'EC407',
            name: 'Embedded Systems',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Embedded System Basics', 'Classification', 'Applications'] },
              { unitNumber: 2, unitName: 'ARM Architecture', chapters: ['Registers', 'Instruction Set', 'Pipeline'] },
              { unitNumber: 3, unitName: 'Interfacing', chapters: ['GPIO', 'Timers', 'Interrupts', 'DMA'] },
              { unitNumber: 4, unitName: 'RTOS', chapters: ['Task Scheduling', 'Semaphores', 'Message Queues'] },
              { unitNumber: 5, unitName: 'Design', chapters: ['Hardware-Software Co-design', 'Power Management', 'Testing'] }
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
            code: 'EC501',
            name: 'Wireless Communications',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Wireless Evolution', 'Spectrum', 'Standards'] },
              { unitNumber: 2, unitName: 'Mobile Radio Propagation', chapters: ['Path Loss', 'Fading', 'Multipath'] },
              { unitNumber: 3, unitName: 'Cellular Systems', chapters: ['Frequency Reuse', 'Handoff', 'Capacity'] },
              { unitNumber: 4, unitName: 'Multiple Access', chapters: ['FDMA', 'TDMA', 'CDMA', 'OFDMA'] },
              { unitNumber: 5, unitName: 'Wireless Standards', chapters: ['GSM', 'CDMA2000', 'LTE', '5G'] }
            ]
          },
          {
            code: 'EC502',
            name: 'Optical Communications',
            units: [
              { unitNumber: 1, unitName: 'Optical Fiber', chapters: ['Structure', 'Types', 'Propagation Modes'] },
              { unitNumber: 2, unitName: 'Signal Degradation', chapters: ['Attenuation', 'Dispersion', 'Non-linearities'] },
              { unitNumber: 3, unitName: 'Optical Sources', chapters: ['LED', 'Laser Diode', 'Characteristics'] },
              { unitNumber: 4, unitName: 'Optical Detectors', chapters: ['PIN Diode', 'APD', 'Noise'] },
              { unitNumber: 5, unitName: 'System Design', chapters: ['Link Budget', 'WDM', 'EDFA'] }
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
