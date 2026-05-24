// NCERT Data for Classes 6-12 (CBSE) with verified PDF URLs

export interface NCERTChapter {
  title: string;
  pdfUrl: string;
}

export interface NCERTSubject {
  id: string;
  name: string;
  chapters: NCERTChapter[];
}

export interface NCERTClass {
  class: number;
  subjects: NCERTSubject[];
}

const BASE = 'https://ncert.nic.in/textbook/pdf/';

function ch(bookCode: string, titles: string[]): NCERTChapter[] {
  return titles.map((title, i) => ({
    title,
    pdfUrl: `${BASE}${bookCode}${String(i + 1).padStart(2, '0')}.pdf`
  }));
}

export const ncertClasses: NCERTClass[] = [
  {
    class: 6,
    subjects: [
      {
        id: 'maths', name: 'Mathematics',
        chapters: ch('fegp1', [
          'Patterns in Mathematics', 'Lines and Angles', 'Number Play',
          'Data Handling and Presentation', 'Prime Time', 'Perimeter and Area',
          'Fractions', 'Playing with Constructions', 'Symmetry', 'The Other Side of Zero'
        ])
      },
      {
        id: 'science', name: 'Science',
        chapters: ch('fecu1', [
          'The Wonderful World of Science', 'Diversity in the Living World',
          'Mindful Eating: A Path to a Healthy Body', 'Materials Around Us',
          'Measurement of Length and Motion', 'Materials and Solutions',
          'Natural Resources', 'Temperature and its Measurement',
          'Electric Current and Circuits', 'Magnets',
          'Light and Shadows', 'Beyond Earth'
        ])
      },
      {
        id: 'social', name: 'Social Science',
        chapters: ch('fees1', [
          'Locating Places on the Earth', 'Exploring Globe and Maps',
          'Landforms and Life', 'Timeline and Sources of History',
          'India, That Is Bharat', 'The Beginnings of Indian Civilisation',
          'India During 6th to 4th Century BCE', 'Unity in Diversity, or "Many in the One"',
          'Family and Neighbourhood', 'Grassroots Democracy — Part 1',
          'Grassroots Democracy — Part 2', 'Urban Livelihoods',
          'The Value of Work', 'Economic Activities Around Us'
        ])
      },
      {
        id: 'english', name: 'English',
        chapters: ch('fepr1', [
          'A Voyage of Discovery', 'Reading is Believing',
          'Going Places', 'The Wisdom of Ages', 'Being Together'
        ])
      }
    ]
  },
  {
    class: 7,
    subjects: [
      {
        id: 'maths', name: 'Mathematics',
        chapters: ch('gegp1', [
          'Integers', 'Fractions and Decimals', 'Data Handling',
          'Simple Equations', 'Lines and Angles', 'The Triangle and its Properties',
          'Comparing Quantities', 'Rational Numbers'
        ])
      },
      {
        id: 'science', name: 'Science',
        chapters: ch('gecu1', [
          'Nutrition in Plants', 'Nutrition in Animals', 'Fibre to Fabric',
          'Heat', 'Acids, Bases and Salts', 'Physical and Chemical Changes',
          'Weather, Climate and Adaptations', 'Winds, Storms and Cyclones',
          'Soil', 'Respiration in Organisms',
          'Transportation in Animals and Plants', 'Reproduction in Plants'
        ])
      },
      {
        id: 'social', name: 'Social Science',
        chapters: ch('gees1', [
          'Tracing Changes Through a Thousand Years', 'New Kings and Kingdoms',
          'The Delhi Sultans', 'The Mughal Empire',
          'Environment', 'Inside Our Earth', 'Our Changing Earth',
          'Air', 'Water', 'On Equality',
          'Role of the Government in Health', 'How the State Government Works'
        ])
      },
      {
        id: 'english', name: 'English',
        chapters: ch('gepr1', [
          'Three Questions', 'A Gift of Chappals',
          'Gopal and the Hilsa Fish', 'The Ashes That Made Trees Bloom',
          'Quality'
        ])
      }
    ]
  },
  {
    class: 8,
    subjects: [
      {
        id: 'maths', name: 'Mathematics',
        chapters: ch('hemh1', [
          'Rational Numbers', 'Linear Equations in One Variable',
          'Understanding Quadrilaterals', 'Data Handling',
          'Squares and Square Roots', 'Cubes and Cube Roots', 'Comparing Quantities',
          'Algebraic Expressions and Identities',
          'Mensuration', 'Exponents and Powers', 'Direct and Inverse Proportions',
          'Factorisation', 'Introduction to Graphs'
        ])
      },
      {
        id: 'science', name: 'Science',
        chapters: ch('hesc1', [
          'Crop Production and Management', 'Microorganisms: Friend and Foe',
          'Coal and Petroleum', 'Combustion and Flame',
          'Conservation of Plants and Animals',
          'Reproduction in Animals', 'Reaching the Age of Adolescence',
          'Force and Pressure', 'Friction', 'Sound',
          'Chemical Effects of Electric Current', 'Some Natural Phenomena', 'Light'
        ])
      },
      {
        id: 'social', name: 'Social Science',
        chapters: [
          ...ch('hess2', [
            'Resources', 'Land, Soil, Water, Natural Vegetation and Wildlife Resources',
            'Mineral and Power Resources', 'Agriculture', 'Industries', 'Human Resources'
          ]),
          ...ch('hess3', [
            'The Indian Constitution', 'Understanding Secularism',
            'Why Do We Need a Parliament?', 'Understanding Laws', 'Judiciary'
          ]),
          ...ch('hess4', [
            'How, When and Where', 'From Trade to Territory',
            'Ruling the Countryside', 'Tribals, Dikus and the Vision of a Golden Age',
            'When People Rebel'
          ])
        ]
      },
      {
        id: 'english', name: 'English',
        chapters: ch('hepr1', [
          'The Wit that Won Hearts', 'A Tale of Valour',
          'The Case of the Fifth Word', 'The Cherry Tree',
          'Feathered Friend'
        ])
      }
    ]
  },
  {
    class: 9,
    subjects: [
      {
        id: 'maths', name: 'Mathematics',
        chapters: ch('iemh1', [
          'Number Systems', 'Polynomials', 'Coordinate Geometry',
          'Linear Equations in Two Variables', "Introduction to Euclid's Geometry",
          'Lines and Angles', 'Triangles', 'Quadrilaterals',
          'Circles', "Heron's Formula", 'Surface Areas and Volumes',
          'Statistics'
        ])
      },
      {
        id: 'science', name: 'Science',
        chapters: ch('iesc1', [
          'Matter in Our Surroundings', 'Is Matter Around Us Pure',
          'Atoms and Molecules', 'Structure of the Atom',
          'The Fundamental Unit of Life', 'Tissues',
          'Motion', 'Force and Laws of Motion', 'Gravitation',
          'Work and Energy', 'Sound',
          'Improvement in Food Resources'
        ])
      },
      {
        id: 'social', name: 'Social Science',
        chapters: [
          ...ch('iess1', [
            'The French Revolution', 'Socialism in Europe and the Russian Revolution',
            'Nazism and the Rise of Hitler', 'Forest Society and Colonialism',
            'Pastoralists in the Modern World'
          ]),
          ...ch('iess2', [
            'India - Size and Location', 'Physical Features of India',
            'Drainage', 'Climate'
          ]),
          ...ch('iess3', [
            'What is Democracy? Why Democracy?', 'Constitutional Design',
            'Electoral Politics', 'Working of Institutions', 'Democratic Rights'
          ]),
          ...ch('iess4', [
            'The Story of Village Palampur', 'People as Resource',
            'Poverty as a Challenge', 'Food Security in India'
          ])
        ]
      }
    ]
  },
  {
    class: 10,
    subjects: [
      {
        id: 'maths', name: 'Mathematics',
        chapters: ch('jemh1', [
          'Real Numbers', 'Polynomials',
          'Pair of Linear Equations in Two Variables', 'Quadratic Equations',
          'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry',
          'Introduction to Trigonometry', 'Some Applications of Trigonometry',
          'Circles', 'Constructions', 'Areas Related to Circles',
          'Surface Areas and Volumes', 'Statistics'
        ])
      },
      {
        id: 'science', name: 'Science',
        chapters: ch('jesc1', [
          'Chemical Reactions and Equations', 'Acids, Bases and Salts',
          'Metals and Non-metals', 'Carbon and its Compounds',
          'Periodic Classification of Elements', 'Life Processes',
          'Control and Coordination', 'How do Organisms Reproduce?',
          'Heredity and Evolution', 'Light – Reflection and Refraction',
          'Human Eye and Colourful World', 'Electricity',
          'Magnetic Effects of Electric Current'
        ])
      },
      {
        id: 'social', name: 'Social Science',
        chapters: [
          ...ch('jess2', [
            'The Rise of Nationalism in Europe', 'Nationalism in India',
            'The Making of a Global World', 'The Age of Industrialisation',
            'Print Culture and the Modern World'
          ]),
          ...ch('jess1', [
            'Resources and Development', 'Forest and Wildlife Resources',
            'Water Resources', 'Agriculture', 'Minerals and Energy Resources',
            'Manufacturing Industries', 'Lifelines of National Economy'
          ]),
          ...ch('jess3', [
            'Power Sharing', 'Federalism', 'Democracy and Diversity',
            'Gender, Religion and Caste', 'Popular Struggles and Movements'
          ]),
          ...ch('jess4', [
            'Development', 'Sectors of the Indian Economy',
            'Money and Credit', 'Globalisation and the Indian Economy', 'Consumer Rights'
          ])
        ]
      },
      {
        id: 'english', name: 'English',
        chapters: ch('jefp1', [
          'A Letter to God', 'Nelson Mandela: Long Walk to Freedom',
          'Two Stories about Flying', 'From the Diary of Anne Frank',
          'The Hundred Dresses — I', 'The Hundred Dresses — II',
          'Glimpses of India', 'Mijbil the Otter',
          "Madam Rides the Bus"
        ])
      }
    ]
  },
  {
    class: 11,
    subjects: [
      {
        id: 'maths', name: 'Mathematics',
        chapters: ch('kemh1', [
          'Sets', 'Relations and Functions', 'Trigonometric Functions',
          'Complex Numbers and Quadratic Equations', 'Linear Inequalities',
          'Permutations and Combinations', 'Binomial Theorem',
          'Sequences and Series', 'Straight Lines', 'Conic Sections',
          'Introduction to Three Dimensional Geometry', 'Limits and Derivatives',
          'Statistics', 'Probability'
        ])
      },
      {
        id: 'physics', name: 'Physics',
        chapters: [
          ...ch('keph1', [
            'Physical World', 'Units and Measurements',
            'Motion in a Straight Line', 'Motion in a Plane',
            'Laws of Motion', 'Work, Energy and Power',
            'System of Particles and Rotational Motion'
          ]),
          ...ch('keph2', [
            'Mechanical Properties of Solids', 'Mechanical Properties of Fluids',
            'Thermal Properties of Matter', 'Thermodynamics',
            'Kinetic Theory', 'Oscillations', 'Waves'
          ])
        ]
      },
      {
        id: 'chemistry', name: 'Chemistry',
        chapters: [
          ...ch('kech1', [
            'Some Basic Concepts of Chemistry', 'Structure of Atom',
            'Classification of Elements and Periodicity', 'Chemical Bonding and Molecular Structure',
            'Thermodynamics', 'Equilibrium'
          ]),
          ...ch('kech2', [
            'The s-Block Elements', 'The p-Block Elements',
            'Organic Chemistry: Some Basic Principles'
          ])
        ]
      },
      {
        id: 'biology', name: 'Biology',
        chapters: ch('kebo1', [
          'The Living World', 'Biological Classification',
          'Plant Kingdom', 'Animal Kingdom',
          'Morphology of Flowering Plants', 'Anatomy of Flowering Plants',
          'Structural Organisation in Animals', 'Cell: The Unit of Life',
          'Biomolecules', 'Cell Cycle and Cell Division',
          'Photosynthesis in Higher Plants', 'Respiration in Plants',
          'Plant Growth and Development', 'Breathing and Exchange of Gases',
          'Body Fluids and Circulation', 'Excretory Products and their Elimination',
          'Locomotion and Movement', 'Neural Control and Coordination',
          'Chemical Coordination and Integration'
        ])
      }
    ]
  },
  {
    class: 12,
    subjects: [
      {
        id: 'maths', name: 'Mathematics',
        chapters: [
          ...ch('lemh1', [
            'Relations and Functions', 'Inverse Trigonometric Functions',
            'Matrices', 'Determinants', 'Continuity and Differentiability',
            'Application of Derivatives'
          ]),
          ...ch('lemh2', [
            'Integrals', 'Application of Integrals', 'Differential Equations',
            'Vector Algebra', 'Three Dimensional Geometry',
            'Linear Programming', 'Probability'
          ])
        ]
      },
      {
        id: 'physics', name: 'Physics',
        chapters: [
          ...ch('leph1', [
            'Electric Charges and Fields', 'Electrostatic Potential and Capacitance',
            'Current Electricity', 'Moving Charges and Magnetism',
            'Magnetism and Matter', 'Electromagnetic Induction',
            'Alternating Current', 'Electromagnetic Waves'
          ]),
          ...ch('leph2', [
            'Ray Optics and Optical Instruments', 'Wave Optics',
            'Dual Nature of Radiation and Matter', 'Atoms', 'Nuclei',
            'Semiconductor Electronics'
          ])
        ]
      },
      {
        id: 'chemistry', name: 'Chemistry',
        chapters: [
          ...ch('lech1', [
            'The Solid State', 'Solutions', 'Electrochemistry',
            'Chemical Kinetics', 'Surface Chemistry'
          ]),
          ...ch('lech2', [
            'Haloalkanes and Haloarenes', 'Alcohols, Phenols and Ethers',
            'Aldehydes, Ketones and Carboxylic Acids', 'Amines',
            'Biomolecules'
          ])
        ]
      },
      {
        id: 'biology', name: 'Biology',
        chapters: ch('lebo1', [
          'Reproduction in Organisms', 'Sexual Reproduction in Flowering Plants',
          'Human Reproduction', 'Reproductive Health',
          'Principles of Inheritance and Variation', 'Molecular Basis of Inheritance',
          'Evolution', 'Human Health and Disease',
          'Strategies for Enhancement in Food Production',
          'Microbes in Human Welfare', 'Biotechnology: Principles and Processes',
          'Biotechnology and its Applications', 'Organisms and Populations'
        ])
      }
    ]
  }
];

// Bookmark utilities
const BOOKMARKS_KEY = 'ncert_bookmarks';
const RECENT_KEY = 'ncert_recent';

export interface SavedChapter {
  classNum: number;
  subjectId: string;
  subjectName: string;
  chapterTitle: string;
  pdfUrl: string;
  timestamp: number;
}

export function getBookmarks(): SavedChapter[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
  } catch { return []; }
}

export function toggleBookmark(chapter: SavedChapter): boolean {
  const bookmarks = getBookmarks();
  const idx = bookmarks.findIndex(b => b.pdfUrl === chapter.pdfUrl);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return false;
  } else {
    bookmarks.unshift(chapter);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return true;
  }
}

export function isBookmarked(pdfUrl: string): boolean {
  return getBookmarks().some(b => b.pdfUrl === pdfUrl);
}

export function getRecentlyViewed(): SavedChapter[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch { return []; }
}

export function addRecentlyViewed(chapter: SavedChapter) {
  let recent = getRecentlyViewed().filter(r => r.pdfUrl !== chapter.pdfUrl);
  recent.unshift({ ...chapter, timestamp: Date.now() });
  recent = recent.slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}
