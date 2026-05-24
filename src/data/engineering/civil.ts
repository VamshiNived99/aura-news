import { YearData } from "./cse-aiml";

export const civilData: YearData[] = [
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
              { unitNumber: 1, unitName: 'Water Technology', chapters: ['Water Treatment', 'Hardness', 'Softening Methods'] },
              { unitNumber: 2, unitName: 'Corrosion', chapters: ['Types of Corrosion', 'Factors Affecting Corrosion', 'Prevention Methods'] },
              { unitNumber: 3, unitName: 'Engineering Materials', chapters: ['Cement', 'Concrete', 'Aggregates'] },
              { unitNumber: 4, unitName: 'Polymers', chapters: ['Types of Polymers', 'Polymerization', 'Applications'] },
              { unitNumber: 5, unitName: 'Environmental Chemistry', chapters: ['Pollution', 'Water Quality', 'Treatment'] }
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
            code: 'CE204',
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
            code: 'CE301',
            name: 'Strength of Materials I',
            units: [
              { unitNumber: 1, unitName: 'Simple Stresses', chapters: ['Stress & Strain', 'Elastic Constants', 'Composite Bars'] },
              { unitNumber: 2, unitName: 'Shear Force & Bending Moment', chapters: ['SF Diagrams', 'BM Diagrams', 'Relations'] },
              { unitNumber: 3, unitName: 'Bending Stresses', chapters: ['Theory of Bending', 'Flexural Formula', 'Section Modulus'] },
              { unitNumber: 4, unitName: 'Shear Stresses', chapters: ['Shear Stress Distribution', 'Beams of Various Sections'] },
              { unitNumber: 5, unitName: 'Deflection of Beams', chapters: ['Double Integration', 'Macaulay\'s Method', 'Moment Area'] }
            ]
          },
          {
            code: 'CE302',
            name: 'Fluid Mechanics I',
            units: [
              { unitNumber: 1, unitName: 'Fluid Properties', chapters: ['Density', 'Viscosity', 'Surface Tension'] },
              { unitNumber: 2, unitName: 'Fluid Statics', chapters: ['Pressure', 'Manometry', 'Buoyancy'] },
              { unitNumber: 3, unitName: 'Fluid Kinematics', chapters: ['Flow Types', 'Stream Function', 'Velocity Potential'] },
              { unitNumber: 4, unitName: 'Fluid Dynamics', chapters: ['Bernoulli\'s Equation', 'Energy Equation', 'Momentum'] },
              { unitNumber: 5, unitName: 'Flow Measurement', chapters: ['Venturimeter', 'Orifice', 'Notches'] }
            ]
          },
          {
            code: 'CE303',
            name: 'Surveying I',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Types of Surveys', 'Principles', 'Errors'] },
              { unitNumber: 2, unitName: 'Chain Surveying', chapters: ['Equipment', 'Ranging', 'Obstacles'] },
              { unitNumber: 3, unitName: 'Compass Surveying', chapters: ['Prismatic Compass', 'Bearings', 'Local Attraction'] },
              { unitNumber: 4, unitName: 'Levelling', chapters: ['Levelling Instruments', 'Methods', 'Contouring'] },
              { unitNumber: 5, unitName: 'Theodolite Surveying', chapters: ['Theodolite', 'Measurements', 'Traversing'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'CE304',
            name: 'Strength of Materials II',
            units: [
              { unitNumber: 1, unitName: 'Torsion', chapters: ['Torsion of Shafts', 'Power Transmission', 'Hollow Shafts'] },
              { unitNumber: 2, unitName: 'Columns and Struts', chapters: ['Euler\'s Theory', 'Rankine\'s Formula', 'Secant Formula'] },
              { unitNumber: 3, unitName: 'Thin Cylinders', chapters: ['Hoop Stress', 'Longitudinal Stress', 'Spherical Shells'] },
              { unitNumber: 4, unitName: 'Thick Cylinders', chapters: ['Lame\'s Theory', 'Compound Cylinders', 'Shrink Fit'] },
              { unitNumber: 5, unitName: 'Springs', chapters: ['Helical Springs', 'Leaf Springs', 'Spring Combinations'] }
            ]
          },
          {
            code: 'CE305',
            name: 'Building Materials & Construction',
            units: [
              { unitNumber: 1, unitName: 'Building Stones', chapters: ['Classification', 'Properties', 'Quarrying'] },
              { unitNumber: 2, unitName: 'Bricks & Tiles', chapters: ['Manufacturing', 'Testing', 'Classification'] },
              { unitNumber: 3, unitName: 'Cement & Concrete', chapters: ['Types', 'Properties', 'Mix Design'] },
              { unitNumber: 4, unitName: 'Timber', chapters: ['Properties', 'Defects', 'Preservation'] },
              { unitNumber: 5, unitName: 'Construction', chapters: ['Foundations', 'Walls', 'Roofs', 'Floors'] }
            ]
          },
          {
            code: 'CE306',
            name: 'Fluid Mechanics II',
            units: [
              { unitNumber: 1, unitName: 'Dimensional Analysis', chapters: ['Buckingham Pi', 'Model Studies', 'Similitude'] },
              { unitNumber: 2, unitName: 'Pipe Flow', chapters: ['Laminar Flow', 'Turbulent Flow', 'Pipe Networks'] },
              { unitNumber: 3, unitName: 'Open Channel Flow', chapters: ['Specific Energy', 'Hydraulic Jump', 'Gradually Varied Flow'] },
              { unitNumber: 4, unitName: 'Turbines', chapters: ['Pelton', 'Francis', 'Kaplan'] },
              { unitNumber: 5, unitName: 'Pumps', chapters: ['Centrifugal', 'Reciprocating', 'Characteristics'] }
            ]
          },
          {
            code: 'CE307',
            name: 'Surveying II',
            units: [
              { unitNumber: 1, unitName: 'Tacheometry', chapters: ['Stadia Method', 'Tangential Method', 'Applications'] },
              { unitNumber: 2, unitName: 'Triangulation', chapters: ['Triangulation Systems', 'Baseline', 'Adjustments'] },
              { unitNumber: 3, unitName: 'Curves', chapters: ['Simple Curves', 'Compound Curves', 'Transition Curves'] },
              { unitNumber: 4, unitName: 'Total Station', chapters: ['Components', 'Measurements', 'Applications'] },
              { unitNumber: 5, unitName: 'GPS Surveying', chapters: ['GPS Basics', 'DGPS', 'Applications'] }
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
            code: 'CE401',
            name: 'Structural Analysis I',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Structural Forms', 'Loads', 'Idealization'] },
              { unitNumber: 2, unitName: 'Analysis of Trusses', chapters: ['Method of Joints', 'Method of Sections', 'Graphical Method'] },
              { unitNumber: 3, unitName: 'Influence Lines', chapters: ['Beams', 'Trusses', 'Moving Loads'] },
              { unitNumber: 4, unitName: 'Arches', chapters: ['Three-Hinged', 'Two-Hinged', 'Fixed'] },
              { unitNumber: 5, unitName: 'Cables', chapters: ['Parabolic Cables', 'Catenary', 'Suspension Bridges'] }
            ]
          },
          {
            code: 'CE402',
            name: 'Geotechnical Engineering I',
            units: [
              { unitNumber: 1, unitName: 'Soil Formation', chapters: ['Origin', 'Classification', 'Index Properties'] },
              { unitNumber: 2, unitName: 'Soil Water', chapters: ['Permeability', 'Seepage', 'Flow Nets'] },
              { unitNumber: 3, unitName: 'Compaction', chapters: ['Compaction Theory', 'Field Compaction', 'Control'] },
              { unitNumber: 4, unitName: 'Consolidation', chapters: ['Theory', 'Settlement', 'Time Rate'] },
              { unitNumber: 5, unitName: 'Shear Strength', chapters: ['Mohr-Coulomb', 'Tests', 'Pore Pressure'] }
            ]
          },
          {
            code: 'CE403',
            name: 'Environmental Engineering I',
            units: [
              { unitNumber: 1, unitName: 'Water Sources', chapters: ['Surface Water', 'Ground Water', 'Demand'] },
              { unitNumber: 2, unitName: 'Water Quality', chapters: ['Physical', 'Chemical', 'Biological Parameters'] },
              { unitNumber: 3, unitName: 'Water Treatment', chapters: ['Sedimentation', 'Filtration', 'Disinfection'] },
              { unitNumber: 4, unitName: 'Water Distribution', chapters: ['Pipe Networks', 'Storage', 'Pumping'] },
              { unitNumber: 5, unitName: 'Rural Water Supply', chapters: ['Hand Pumps', 'Rain Water Harvesting'] }
            ]
          },
          {
            code: 'CE404',
            name: 'Highway Engineering',
            units: [
              { unitNumber: 1, unitName: 'Planning', chapters: ['Highway Classification', 'Surveys', 'Traffic Studies'] },
              { unitNumber: 2, unitName: 'Geometric Design', chapters: ['Cross Section', 'Sight Distance', 'Curves'] },
              { unitNumber: 3, unitName: 'Pavement Design', chapters: ['Flexible', 'Rigid', 'Overlay'] },
              { unitNumber: 4, unitName: 'Construction', chapters: ['Sub-grade', 'Base', 'Surface Course'] },
              { unitNumber: 5, unitName: 'Maintenance', chapters: ['Types of Distress', 'Repairs', 'Evaluation'] }
            ]
          }
        ]
      },
      {
        semester: 2,
        subjects: [
          {
            code: 'CE405',
            name: 'Structural Analysis II',
            units: [
              { unitNumber: 1, unitName: 'Slope Deflection', chapters: ['Continuous Beams', 'Portal Frames', 'Sway'] },
              { unitNumber: 2, unitName: 'Moment Distribution', chapters: ['Beams', 'Frames', 'No-Sway Frames'] },
              { unitNumber: 3, unitName: 'Matrix Methods', chapters: ['Stiffness Method', 'Flexibility Method'] },
              { unitNumber: 4, unitName: 'Plastic Analysis', chapters: ['Plastic Moment', 'Collapse Load', 'Mechanisms'] },
              { unitNumber: 5, unitName: 'Approximate Methods', chapters: ['Portal Method', 'Cantilever Method'] }
            ]
          },
          {
            code: 'CE406',
            name: 'Geotechnical Engineering II',
            units: [
              { unitNumber: 1, unitName: 'Earth Pressure', chapters: ['Rankine', 'Coulomb', 'Sheet Piles'] },
              { unitNumber: 2, unitName: 'Stability of Slopes', chapters: ['Infinite Slopes', 'Finite Slopes', 'Methods'] },
              { unitNumber: 3, unitName: 'Bearing Capacity', chapters: ['Terzaghi', 'Meyerhof', 'IS Code'] },
              { unitNumber: 4, unitName: 'Shallow Foundations', chapters: ['Types', 'Settlement', 'Design'] },
              { unitNumber: 5, unitName: 'Deep Foundations', chapters: ['Pile Types', 'Capacity', 'Group Action'] }
            ]
          },
          {
            code: 'CE407',
            name: 'Environmental Engineering II',
            units: [
              { unitNumber: 1, unitName: 'Sewerage Systems', chapters: ['Types', 'Design', 'Materials'] },
              { unitNumber: 2, unitName: 'Sewage Characteristics', chapters: ['Physical', 'Chemical', 'Biological'] },
              { unitNumber: 3, unitName: 'Sewage Treatment', chapters: ['Primary', 'Secondary', 'Tertiary'] },
              { unitNumber: 4, unitName: 'Sludge Treatment', chapters: ['Digestion', 'Disposal', 'Utilization'] },
              { unitNumber: 5, unitName: 'Solid Waste', chapters: ['Collection', 'Processing', 'Disposal'] }
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
            code: 'CE501',
            name: 'Design of RCC Structures',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Working Stress', 'Limit State', 'IS Code'] },
              { unitNumber: 2, unitName: 'Beams', chapters: ['Singly Reinforced', 'Doubly Reinforced', 'T-Beams'] },
              { unitNumber: 3, unitName: 'Slabs', chapters: ['One-Way', 'Two-Way', 'Flat Slabs'] },
              { unitNumber: 4, unitName: 'Columns', chapters: ['Short', 'Long', 'Biaxial Bending'] },
              { unitNumber: 5, unitName: 'Footings', chapters: ['Isolated', 'Combined', 'Raft'] }
            ]
          },
          {
            code: 'CE502',
            name: 'Design of Steel Structures',
            units: [
              { unitNumber: 1, unitName: 'Introduction', chapters: ['Steel Properties', 'IS Code', 'Connections'] },
              { unitNumber: 2, unitName: 'Tension Members', chapters: ['Net Area', 'Design', 'Splices'] },
              { unitNumber: 3, unitName: 'Compression Members', chapters: ['Buckling', 'Design', 'Built-up Sections'] },
              { unitNumber: 4, unitName: 'Beams', chapters: ['Laterally Supported', 'Laterally Unsupported', 'Plate Girders'] },
              { unitNumber: 5, unitName: 'Roof Trusses', chapters: ['Types', 'Analysis', 'Design'] }
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
