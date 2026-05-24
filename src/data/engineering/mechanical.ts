import { YearData } from "./cse-aiml";

export const mechanicalData: YearData[] = [
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
              { unitNumber: 3, unitName: 'Thermodynamics', chapters: ['Laws of Thermodynamics', 'Heat Transfer', 'Entropy'] },
              { unitNumber: 4, unitName: 'Modern Physics', chapters: ['Quantum Mechanics', 'Atomic Structure'] },
              { unitNumber: 5, unitName: 'Material Science', chapters: ['Crystal Structure', 'Mechanical Properties', 'Failure'] }
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
              { unitNumber: 2, unitName: 'Higher Order ODEs', chapters: ['Homogeneous Equations', 'Non-homogeneous Equations'] },
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
              { unitNumber: 4, unitName: 'Fuels & Lubricants', chapters: ['Combustion', 'Calorific Value', 'Lubricants'] },
              { unitNumber: 5, unitName: 'Engineering Materials', chapters: ['Cement', 'Refractories', 'Composites'] }
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
            code: 'ME204',
            name: 'Engineering Mechanics',
            units: [
              { unitNumber: 1, unitName: 'Force Systems', chapters: ['Concurrent Forces', 'Parallel Forces', 'Couples'] },
              { unitNumber: 2, unitName: 'Equilibrium', chapters: ['Free Body Diagrams', 'Equilibrium Conditions', 'Supports'] },
              { unitNumber: 3, unitName: 'Friction', chapters: ['Laws of Friction', 'Wedge Friction', 'Belt Friction'] },
              { unitNumber: 4, unitName: 'Centroid & Moment of Inertia', chapters: ['Centroid', 'MOI of Areas', 'Radius of Gyration'] },
              { unitNumber: 5, unitName: 'Kinematics & Kinetics', chapters: ['Rectilinear Motion', 'Projectile Motion', 'Newton\'s Laws'] }
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
            code: 'ME301',
            name: 'Strength of Materials',
            units: [
              { unitNumber: 1, unitName: 'Simple Stresses', chapters: ['Stress & Strain', 'Elastic Constants', 'Composite Bars'] },
              { unitNumber: 2, unitName: 'Shear Force & Bending Moment', chapters: ['SF Diagrams', 'BM Diagrams', 'Relations'] },
              { unitNumber: 3, unitName: 'Bending & Shear Stresses', chapters: ['Theory of Bending', 'Shear Stress Distribution'] },
              { unitNumber: 4, unitName: 'Deflection of Beams', chapters: ['Double Integration', 'Macaulay\'s Method', 'Moment Area'] },
              { unitNumber: 5, unitName: 'Torsion & Columns', chapters: ['Torsion of Shafts', 'Euler\'s Theory', 'Rankine\'s Formula'] }
            ]
          },
          {
            code: 'ME302',
            name: 'Thermodynamics',
            units: [
              { unitNumber: 1, unitName: 'Basic Concepts', chapters: ['Systems', 'Properties', 'Processes'] },
              { unitNumber: 2, unitName: 'First Law', chapters: ['Energy Balance', 'Control Volume', 'Applications'] },
              { unitNumber: 3, unitName: 'Second Law', chapters: ['Heat Engines', 'Refrigerators', 'Entropy'] },
              { unitNumber: 4, unitName: 'Properties of Substances', chapters: ['Pure Substances', 'Steam Tables', 'Ideal Gas'] },
              { unitNumber: 5, unitName: 'Power Cycles', chapters: ['Carnot', 'Rankine', 'Otto', 'Diesel'] }
            ]
          },
          {
            code: 'ME303',
            name: 'Manufacturing Processes',
            units: [
              { unitNumber: 1, unitName: 'Casting', chapters: ['Pattern Making', 'Moulding', 'Casting Defects'] },
              { unitNumber: 2, unitName: 'Metal Forming', chapters: ['Rolling', 'Forging', 'Extrusion', 'Drawing'] },
              { unitNumber: 3, unitName: 'Welding', chapters: ['Arc Welding', 'Gas Welding', 'Resistance Welding'] },
              { unitNumber: 4, unitName: 'Machining', chapters: ['Turning', 'Milling', 'Drilling', 'Grinding'] },
              { unitNumber: 5, unitName: 'Modern Methods', chapters: ['EDM', 'ECM', 'Laser Machining', 'Plasma Cutting'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'ME304',
            name: 'Fluid Mechanics',
            units: [
              { unitNumber: 1, unitName: 'Fluid Properties', chapters: ['Density', 'Viscosity', 'Surface Tension'] },
              { unitNumber: 2, unitName: 'Fluid Statics', chapters: ['Pressure', 'Manometry', 'Buoyancy'] },
              { unitNumber: 3, unitName: 'Fluid Dynamics', chapters: ['Bernoulli\'s Equation', 'Energy Equation', 'Momentum'] },
              { unitNumber: 4, unitName: 'Flow Measurement', chapters: ['Venturimeter', 'Orifice', 'Pitot Tube'] },
              { unitNumber: 5, unitName: 'Pipe Flow', chapters: ['Laminar Flow', 'Turbulent Flow', 'Pipe Networks'] }
            ]
          },
          {
            code: 'ME305',
            name: 'Kinematics of Machinery',
            units: [
              { unitNumber: 1, unitName: 'Mechanisms', chapters: ['Kinematic Pairs', 'Kinematic Chains', 'Inversions'] },
              { unitNumber: 2, unitName: 'Velocity Analysis', chapters: ['Instantaneous Center', 'Relative Velocity', 'Kennedy\'s Theorem'] },
              { unitNumber: 3, unitName: 'Acceleration Analysis', chapters: ['Coriolis Component', 'Klein\'s Construction'] },
              { unitNumber: 4, unitName: 'Cams', chapters: ['Cam Profiles', 'Follower Motions', 'Cam Dynamics'] },
              { unitNumber: 5, unitName: 'Gears', chapters: ['Gear Trains', 'Epicyclic Gears', 'Gear Tooth Profiles'] }
            ]
          },
          {
            code: 'ME306',
            name: 'Material Science',
            units: [
              { unitNumber: 1, unitName: 'Crystal Structure', chapters: ['Unit Cell', 'Crystal Systems', 'Miller Indices'] },
              { unitNumber: 2, unitName: 'Imperfections', chapters: ['Point Defects', 'Line Defects', 'Surface Defects'] },
              { unitNumber: 3, unitName: 'Mechanical Properties', chapters: ['Tensile Test', 'Hardness', 'Impact'] },
              { unitNumber: 4, unitName: 'Phase Diagrams', chapters: ['Iron-Carbon', 'TTT Diagrams', 'Heat Treatment'] },
              { unitNumber: 5, unitName: 'Engineering Materials', chapters: ['Steels', 'Cast Iron', 'Non-ferrous', 'Composites'] }
            ]
          },
          {
            code: 'EE307',
            name: 'Electrical Machines',
            units: [
              { unitNumber: 1, unitName: 'DC Machines', chapters: ['Construction', 'EMF Equation', 'Characteristics'] },
              { unitNumber: 2, unitName: 'Transformers', chapters: ['Construction', 'Testing', 'Three-Phase'] },
              { unitNumber: 3, unitName: 'Induction Motors', chapters: ['Principle', 'Torque-Slip', 'Starting Methods'] },
              { unitNumber: 4, unitName: 'Synchronous Machines', chapters: ['Alternators', 'Synchronous Motors'] },
              { unitNumber: 5, unitName: 'Special Machines', chapters: ['Stepper Motors', 'Servo Motors', 'BLDC'] }
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
            code: 'ME401',
            name: 'Heat Transfer',
            units: [
              { unitNumber: 1, unitName: 'Conduction', chapters: ['Fourier\'s Law', 'Steady State', 'Fins'] },
              { unitNumber: 2, unitName: 'Transient Conduction', chapters: ['Lumped System', 'Semi-infinite Solid', 'Heisler Charts'] },
              { unitNumber: 3, unitName: 'Convection', chapters: ['Forced Convection', 'Free Convection', 'Correlations'] },
              { unitNumber: 4, unitName: 'Heat Exchangers', chapters: ['Types', 'LMTD', 'NTU Method'] },
              { unitNumber: 5, unitName: 'Radiation', chapters: ['Stefan-Boltzmann', 'View Factors', 'Radiation Networks'] }
            ]
          },
          {
            code: 'ME402',
            name: 'Dynamics of Machinery',
            units: [
              { unitNumber: 1, unitName: 'Force Analysis', chapters: ['Static Force Analysis', 'Dynamic Force Analysis'] },
              { unitNumber: 2, unitName: 'Balancing', chapters: ['Rotating Masses', 'Reciprocating Masses', 'Multi-cylinder'] },
              { unitNumber: 3, unitName: 'Vibrations', chapters: ['Free Vibration', 'Forced Vibration', 'Damping'] },
              { unitNumber: 4, unitName: 'Critical Speed', chapters: ['Whirling of Shafts', 'Torsional Vibration'] },
              { unitNumber: 5, unitName: 'Governors & Gyroscope', chapters: ['Governor Types', 'Gyroscopic Effects'] }
            ]
          },
          {
            code: 'ME403',
            name: 'Machine Design I',
            units: [
              { unitNumber: 1, unitName: 'Design Principles', chapters: ['Design Process', 'Stress Analysis', 'Factor of Safety'] },
              { unitNumber: 2, unitName: 'Shafts and Keys', chapters: ['Shaft Design', 'Key Design', 'Couplings'] },
              { unitNumber: 3, unitName: 'Bearings', chapters: ['Journal Bearings', 'Rolling Bearings', 'Selection'] },
              { unitNumber: 4, unitName: 'Gears', chapters: ['Spur Gears', 'Helical Gears', 'Bevel Gears'] },
              { unitNumber: 5, unitName: 'Springs', chapters: ['Helical Springs', 'Leaf Springs', 'Design'] }
            ]
          },
          {
            code: 'ME404',
            name: 'IC Engines',
            units: [
              { unitNumber: 1, unitName: 'Engine Fundamentals', chapters: ['Engine Types', 'Cycles', 'Performance Parameters'] },
              { unitNumber: 2, unitName: 'Fuel Systems', chapters: ['Carburetor', 'Fuel Injection', 'MPFI'] },
              { unitNumber: 3, unitName: 'Combustion', chapters: ['SI Combustion', 'CI Combustion', 'Knock'] },
              { unitNumber: 4, unitName: 'Engine Systems', chapters: ['Cooling', 'Lubrication', 'Ignition'] },
              { unitNumber: 5, unitName: 'Emissions & Testing', chapters: ['Emission Control', 'Engine Testing', 'Supercharging'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'ME405',
            name: 'Machine Design II',
            units: [
              { unitNumber: 1, unitName: 'Welded Joints', chapters: ['Welding Types', 'Design of Welded Joints'] },
              { unitNumber: 2, unitName: 'Bolted Joints', chapters: ['Bolt Design', 'Preload', 'Fatigue'] },
              { unitNumber: 3, unitName: 'Power Screws', chapters: ['Types', 'Efficiency', 'Design'] },
              { unitNumber: 4, unitName: 'Clutches & Brakes', chapters: ['Friction Clutches', 'Brakes', 'Design'] },
              { unitNumber: 5, unitName: 'Belt & Chain Drives', chapters: ['Belt Drives', 'Chain Drives', 'Selection'] }
            ]
          },
          {
            code: 'ME406',
            name: 'Refrigeration & Air Conditioning',
            units: [
              { unitNumber: 1, unitName: 'Refrigeration Cycles', chapters: ['Vapor Compression', 'Vapor Absorption', 'COP'] },
              { unitNumber: 2, unitName: 'Refrigerants', chapters: ['Properties', 'Selection', 'Environmental Impact'] },
              { unitNumber: 3, unitName: 'Components', chapters: ['Compressors', 'Condensers', 'Evaporators', 'Expansion Devices'] },
              { unitNumber: 4, unitName: 'Psychrometry', chapters: ['Properties', 'Processes', 'Psychrometric Chart'] },
              { unitNumber: 5, unitName: 'Air Conditioning', chapters: ['Cooling Load', 'System Design', 'Duct Design'] }
            ]
          },
          {
            code: 'ME407',
            name: 'CAD/CAM',
            units: [
              { unitNumber: 1, unitName: 'CAD Basics', chapters: ['Graphics Systems', 'Geometric Modeling', 'Transformations'] },
              { unitNumber: 2, unitName: 'Curves and Surfaces', chapters: ['Bezier', 'B-Spline', 'NURBS'] },
              { unitNumber: 3, unitName: 'CAM', chapters: ['NC Programming', 'CNC Machines', 'G-Codes'] },
              { unitNumber: 4, unitName: 'FEA', chapters: ['Introduction', 'Element Types', 'Applications'] },
              { unitNumber: 5, unitName: 'CIM', chapters: ['Group Technology', 'Flexible Manufacturing', 'Robotics'] }
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
            code: 'ME501',
            name: 'Automobile Engineering',
            units: [
              { unitNumber: 1, unitName: 'Vehicle Structure', chapters: ['Chassis', 'Frame', 'Body'] },
              { unitNumber: 2, unitName: 'Transmission', chapters: ['Clutch', 'Gearbox', 'Differential'] },
              { unitNumber: 3, unitName: 'Suspension', chapters: ['Types', 'Springs', 'Shock Absorbers'] },
              { unitNumber: 4, unitName: 'Steering & Brakes', chapters: ['Steering Systems', 'Brake Systems', 'ABS'] },
              { unitNumber: 5, unitName: 'Modern Vehicles', chapters: ['Hybrid', 'Electric', 'Autonomous'] }
            ]
          },
          {
            code: 'ME502',
            name: 'Power Plant Engineering',
            units: [
              { unitNumber: 1, unitName: 'Thermal Power', chapters: ['Steam Power Plant', 'Rankine Cycle', 'Boilers'] },
              { unitNumber: 2, unitName: 'Gas Turbines', chapters: ['Brayton Cycle', 'Components', 'Combined Cycle'] },
              { unitNumber: 3, unitName: 'Hydro Power', chapters: ['Turbines', 'Plant Layout', 'Economics'] },
              { unitNumber: 4, unitName: 'Nuclear Power', chapters: ['Reactors', 'Safety', 'Waste Management'] },
              { unitNumber: 5, unitName: 'Renewable Energy', chapters: ['Solar', 'Wind', 'Biomass', 'Geothermal'] }
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
