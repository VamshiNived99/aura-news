export interface ProgrammingTopic {
  id: string;
  name: string;
  subtopics: string[];
}

export interface ProgrammingLanguageData {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  paradigm: string[];
  useCases: string[];
  topics: ProgrammingTopic[];
  helloWorld: string;
  syntax: {
    name: string;
    example: string;
    explanation: string;
  }[];
}

export const programmingLanguages: ProgrammingLanguageData[] = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: 'from-yellow-400 to-blue-500',
    description: 'A versatile, beginner-friendly language popular for AI, ML, web development, and automation.',
    difficulty: 'beginner',
    paradigm: ['Object-Oriented', 'Functional', 'Procedural'],
    useCases: ['AI/ML', 'Web Development', 'Data Science', 'Automation', 'Scripting'],
    helloWorld: 'print("Hello, World!")',
    topics: [
      {
        id: 'python-basics',
        name: 'Python Basics',
        subtopics: ['Variables and Data Types', 'Operators', 'Input/Output', 'Comments', 'Type Conversion', 'String Operations']
      },
      {
        id: 'python-control',
        name: 'Control Flow',
        subtopics: ['If-Else Statements', 'For Loops', 'While Loops', 'Break and Continue', 'Pass Statement', 'Nested Loops']
      },
      {
        id: 'python-functions',
        name: 'Functions',
        subtopics: ['Defining Functions', 'Parameters and Arguments', 'Return Values', 'Default Arguments', 'Lambda Functions', 'Recursion', 'Scope']
      },
      {
        id: 'python-ds',
        name: 'Data Structures',
        subtopics: ['Lists', 'Tuples', 'Dictionaries', 'Sets', 'List Comprehension', 'Dictionary Comprehension']
      },
      {
        id: 'python-oop',
        name: 'Object-Oriented Programming',
        subtopics: ['Classes and Objects', 'Constructors', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstract Classes', 'Magic Methods']
      },
      {
        id: 'python-file',
        name: 'File Handling',
        subtopics: ['Reading Files', 'Writing Files', 'File Modes', 'With Statement', 'CSV Files', 'JSON Files']
      },
      {
        id: 'python-exception',
        name: 'Exception Handling',
        subtopics: ['Try-Except', 'Multiple Exceptions', 'Finally Block', 'Raise Exception', 'Custom Exceptions']
      },
      {
        id: 'python-modules',
        name: 'Modules and Packages',
        subtopics: ['Importing Modules', 'Creating Modules', 'Standard Library', 'pip and Packages', 'Virtual Environments']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'x = 10', explanation: 'Assign value 10 to variable x' },
      { name: 'List', example: 'my_list = [1, 2, 3]', explanation: 'Create a list with elements' },
      { name: 'Function', example: 'def greet(name):\n    return f"Hello, {name}"', explanation: 'Define a function with parameter' }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: 'from-red-500 to-orange-500',
    description: 'A robust, platform-independent language widely used for enterprise applications and Android development.',
    difficulty: 'intermediate',
    paradigm: ['Object-Oriented'],
    useCases: ['Enterprise Applications', 'Android Development', 'Web Applications', 'Big Data'],
    helloWorld: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    topics: [
      {
        id: 'java-basics',
        name: 'Java Basics',
        subtopics: ['Variables and Data Types', 'Operators', 'Input/Output', 'Comments', 'Type Casting', 'Strings']
      },
      {
        id: 'java-control',
        name: 'Control Flow',
        subtopics: ['If-Else', 'Switch Case', 'For Loop', 'While Loop', 'Do-While', 'Break Continue']
      },
      {
        id: 'java-arrays',
        name: 'Arrays',
        subtopics: ['Single Dimensional', 'Multi-Dimensional', 'Array Methods', 'ArrayList', 'Array vs ArrayList']
      },
      {
        id: 'java-oop',
        name: 'Object-Oriented Programming',
        subtopics: ['Classes and Objects', 'Constructors', 'Inheritance', 'Polymorphism', 'Abstraction', 'Encapsulation', 'Interfaces']
      },
      {
        id: 'java-exception',
        name: 'Exception Handling',
        subtopics: ['Try-Catch', 'Multiple Catch', 'Finally', 'Throw and Throws', 'Custom Exceptions', 'Checked vs Unchecked']
      },
      {
        id: 'java-collections',
        name: 'Collections Framework',
        subtopics: ['List', 'Set', 'Map', 'Queue', 'Iterator', 'Comparator', 'Comparable']
      },
      {
        id: 'java-multithreading',
        name: 'Multithreading',
        subtopics: ['Thread Class', 'Runnable Interface', 'Synchronization', 'Inter-thread Communication', 'Thread Pool']
      },
      {
        id: 'java-io',
        name: 'File I/O',
        subtopics: ['File Class', 'FileReader/FileWriter', 'BufferedReader/BufferedWriter', 'Serialization']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'int x = 10;', explanation: 'Declare integer variable with value' },
      { name: 'Array', example: 'int[] arr = {1, 2, 3};', explanation: 'Create an integer array' },
      { name: 'Method', example: 'public int add(int a, int b) {\n    return a + b;\n}', explanation: 'Define a method with return type' }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚡',
    color: 'from-blue-600 to-blue-800',
    description: 'A powerful language for system programming, game development, and competitive programming.',
    difficulty: 'intermediate',
    paradigm: ['Object-Oriented', 'Procedural', 'Generic'],
    useCases: ['System Programming', 'Game Development', 'Competitive Programming', 'Embedded Systems'],
    helloWorld: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    topics: [
      {
        id: 'cpp-basics',
        name: 'C++ Basics',
        subtopics: ['Variables and Data Types', 'Operators', 'Input/Output', 'Comments', 'Type Casting', 'Constants']
      },
      {
        id: 'cpp-control',
        name: 'Control Flow',
        subtopics: ['If-Else', 'Switch', 'For Loop', 'While Loop', 'Do-While', 'Goto']
      },
      {
        id: 'cpp-functions',
        name: 'Functions',
        subtopics: ['Function Declaration', 'Parameters', 'Return Types', 'Function Overloading', 'Inline Functions', 'Recursion']
      },
      {
        id: 'cpp-pointers',
        name: 'Pointers and References',
        subtopics: ['Pointer Basics', 'Pointer Arithmetic', 'Pointers and Arrays', 'References', 'Dynamic Memory', 'Smart Pointers']
      },
      {
        id: 'cpp-oop',
        name: 'Object-Oriented Programming',
        subtopics: ['Classes and Objects', 'Constructors', 'Destructors', 'Inheritance', 'Polymorphism', 'Virtual Functions', 'Abstract Classes']
      },
      {
        id: 'cpp-stl',
        name: 'Standard Template Library',
        subtopics: ['Vectors', 'Lists', 'Maps', 'Sets', 'Stacks', 'Queues', 'Algorithms', 'Iterators']
      },
      {
        id: 'cpp-templates',
        name: 'Templates',
        subtopics: ['Function Templates', 'Class Templates', 'Template Specialization']
      },
      {
        id: 'cpp-exception',
        name: 'Exception Handling',
        subtopics: ['Try-Catch', 'Throw', 'Multiple Catch', 'Standard Exceptions']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'int x = 10;', explanation: 'Declare integer variable' },
      { name: 'Pointer', example: 'int* ptr = &x;', explanation: 'Pointer storing address of x' },
      { name: 'Vector', example: 'vector<int> v = {1, 2, 3};', explanation: 'STL vector container' }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    color: 'from-yellow-400 to-yellow-600',
    description: 'The language of the web, used for frontend, backend, and full-stack development.',
    difficulty: 'beginner',
    paradigm: ['Object-Oriented', 'Functional', 'Event-Driven'],
    useCases: ['Web Development', 'Mobile Apps', 'Server-Side', 'Desktop Apps'],
    helloWorld: 'console.log("Hello, World!");',
    topics: [
      {
        id: 'js-basics',
        name: 'JavaScript Basics',
        subtopics: ['Variables (var, let, const)', 'Data Types', 'Operators', 'Type Coercion', 'Template Literals']
      },
      {
        id: 'js-control',
        name: 'Control Flow',
        subtopics: ['If-Else', 'Switch', 'For Loop', 'While Loop', 'For-Of', 'For-In']
      },
      {
        id: 'js-functions',
        name: 'Functions',
        subtopics: ['Function Declaration', 'Function Expression', 'Arrow Functions', 'Callbacks', 'Closures', 'IIFE']
      },
      {
        id: 'js-arrays',
        name: 'Arrays and Objects',
        subtopics: ['Array Methods', 'Object Properties', 'Destructuring', 'Spread Operator', 'Rest Parameters']
      },
      {
        id: 'js-dom',
        name: 'DOM Manipulation',
        subtopics: ['Selecting Elements', 'Modifying Elements', 'Event Handling', 'Event Bubbling', 'Creating Elements']
      },
      {
        id: 'js-async',
        name: 'Asynchronous JavaScript',
        subtopics: ['Callbacks', 'Promises', 'Async/Await', 'Fetch API', 'Error Handling']
      },
      {
        id: 'js-oop',
        name: 'Object-Oriented Programming',
        subtopics: ['Classes', 'Constructors', 'Inheritance', 'Prototypes', 'Static Methods']
      },
      {
        id: 'js-es6',
        name: 'ES6+ Features',
        subtopics: ['Let and Const', 'Arrow Functions', 'Classes', 'Modules', 'Promises', 'Generators', 'Symbols']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'let x = 10;', explanation: 'Declare variable with let' },
      { name: 'Array', example: 'const arr = [1, 2, 3];', explanation: 'Create a constant array' },
      { name: 'Arrow Function', example: 'const add = (a, b) => a + b;', explanation: 'Arrow function syntax' }
    ]
  },
  {
    id: 'c',
    name: 'C',
    icon: '🔧',
    color: 'from-gray-600 to-gray-800',
    description: 'The foundational programming language for system programming and embedded systems.',
    difficulty: 'intermediate',
    paradigm: ['Procedural'],
    useCases: ['System Programming', 'Embedded Systems', 'Operating Systems', 'Compilers'],
    helloWorld: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    topics: [
      {
        id: 'c-basics',
        name: 'C Basics',
        subtopics: ['Variables and Data Types', 'Operators', 'Input/Output', 'Format Specifiers', 'Comments', 'Constants']
      },
      {
        id: 'c-control',
        name: 'Control Flow',
        subtopics: ['If-Else', 'Switch', 'For Loop', 'While Loop', 'Do-While', 'Break Continue']
      },
      {
        id: 'c-functions',
        name: 'Functions',
        subtopics: ['Function Declaration', 'Parameters', 'Return Types', 'Call by Value', 'Call by Reference', 'Recursion']
      },
      {
        id: 'c-arrays',
        name: 'Arrays and Strings',
        subtopics: ['1D Arrays', '2D Arrays', 'String Functions', 'Character Arrays', 'Array of Strings']
      },
      {
        id: 'c-pointers',
        name: 'Pointers',
        subtopics: ['Pointer Basics', 'Pointer Arithmetic', 'Pointers and Arrays', 'Pointer to Pointer', 'Function Pointers', 'Dynamic Memory']
      },
      {
        id: 'c-structures',
        name: 'Structures and Unions',
        subtopics: ['Structure Basics', 'Nested Structures', 'Arrays of Structures', 'Pointers to Structures', 'Unions', 'Enums']
      },
      {
        id: 'c-file',
        name: 'File Handling',
        subtopics: ['File Operations', 'Reading Files', 'Writing Files', 'File Modes', 'Binary Files']
      },
      {
        id: 'c-preprocessor',
        name: 'Preprocessor',
        subtopics: ['Macros', 'Include', 'Conditional Compilation', 'Predefined Macros']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'int x = 10;', explanation: 'Declare integer variable' },
      { name: 'Pointer', example: 'int *ptr = &x;', explanation: 'Pointer to integer x' },
      { name: 'Struct', example: 'struct Student {\n    char name[50];\n    int age;\n};', explanation: 'Define a structure' }
    ]
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: '🗃️',
    color: 'from-orange-500 to-red-500',
    description: 'Standard language for managing and manipulating relational databases.',
    difficulty: 'beginner',
    paradigm: ['Declarative'],
    useCases: ['Database Management', 'Data Analysis', 'Backend Development', 'Reporting'],
    helloWorld: 'SELECT "Hello, World!";',
    topics: [
      {
        id: 'sql-basics',
        name: 'SQL Basics',
        subtopics: ['Introduction to Databases', 'SQL Syntax', 'Data Types', 'Creating Databases', 'Comments']
      },
      {
        id: 'sql-queries',
        name: 'Basic Queries',
        subtopics: ['SELECT Statement', 'WHERE Clause', 'ORDER BY', 'DISTINCT', 'LIMIT', 'LIKE and Wildcards']
      },
      {
        id: 'sql-crud',
        name: 'CRUD Operations',
        subtopics: ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'UPSERT']
      },
      {
        id: 'sql-joins',
        name: 'Joins',
        subtopics: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'SELF JOIN']
      },
      {
        id: 'sql-aggregation',
        name: 'Aggregation',
        subtopics: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'GROUP BY', 'HAVING']
      },
      {
        id: 'sql-subqueries',
        name: 'Subqueries',
        subtopics: ['Scalar Subqueries', 'Column Subqueries', 'Row Subqueries', 'Correlated Subqueries', 'EXISTS']
      },
      {
        id: 'sql-ddl',
        name: 'Data Definition',
        subtopics: ['CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'Constraints', 'Indexes', 'Views']
      },
      {
        id: 'sql-advanced',
        name: 'Advanced SQL',
        subtopics: ['Window Functions', 'CTEs', 'Stored Procedures', 'Triggers', 'Transactions']
      }
    ],
    syntax: [
      { name: 'Select', example: 'SELECT * FROM users;', explanation: 'Select all columns from users table' },
      { name: 'Insert', example: "INSERT INTO users (name, age) VALUES ('John', 25);", explanation: 'Insert a new record' },
      { name: 'Join', example: 'SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;', explanation: 'Join two tables' }
    ]
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    icon: '🌐',
    color: 'from-orange-500 to-blue-500',
    description: 'The building blocks of web pages - HTML for structure and CSS for styling.',
    difficulty: 'beginner',
    paradigm: ['Markup', 'Styling'],
    useCases: ['Web Development', 'Email Templates', 'Landing Pages', 'UI Design'],
    helloWorld: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>',
    topics: [
      {
        id: 'html-basics',
        name: 'HTML Basics',
        subtopics: ['HTML Structure', 'Tags and Elements', 'Attributes', 'Headings', 'Paragraphs', 'Links', 'Images']
      },
      {
        id: 'html-forms',
        name: 'HTML Forms',
        subtopics: ['Form Element', 'Input Types', 'Labels', 'Buttons', 'Select and Options', 'Textarea', 'Form Validation']
      },
      {
        id: 'html-semantic',
        name: 'Semantic HTML',
        subtopics: ['Header and Footer', 'Nav', 'Main and Section', 'Article', 'Aside', 'Figure and Figcaption']
      },
      {
        id: 'html-tables',
        name: 'Tables and Lists',
        subtopics: ['Table Structure', 'Table Styling', 'Ordered Lists', 'Unordered Lists', 'Definition Lists']
      },
      {
        id: 'css-basics',
        name: 'CSS Basics',
        subtopics: ['Selectors', 'Properties', 'Values', 'Colors', 'Units', 'Specificity', 'Inheritance']
      },
      {
        id: 'css-box',
        name: 'Box Model',
        subtopics: ['Margin', 'Padding', 'Border', 'Width and Height', 'Box-Sizing']
      },
      {
        id: 'css-layout',
        name: 'CSS Layout',
        subtopics: ['Display', 'Position', 'Float', 'Flexbox', 'CSS Grid', 'Multi-column']
      },
      {
        id: 'css-responsive',
        name: 'Responsive Design',
        subtopics: ['Media Queries', 'Viewport', 'Mobile First', 'Breakpoints', 'Fluid Typography']
      }
    ],
    syntax: [
      { name: 'HTML Element', example: '<p class="intro">Hello</p>', explanation: 'Paragraph with class attribute' },
      { name: 'CSS Rule', example: '.intro {\n    color: blue;\n    font-size: 16px;\n}', explanation: 'Style the intro class' },
      { name: 'Flexbox', example: '.container {\n    display: flex;\n    justify-content: center;\n}', explanation: 'Flexbox container' }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '💙',
    color: 'from-blue-500 to-blue-700',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript.',
    difficulty: 'intermediate',
    paradigm: ['Object-Oriented', 'Functional'],
    useCases: ['Web Development', 'Large-scale Applications', 'React/Angular', 'Node.js'],
    helloWorld: 'const message: string = "Hello, World!";\nconsole.log(message);',
    topics: [
      {
        id: 'ts-basics',
        name: 'TypeScript Basics',
        subtopics: ['Type Annotations', 'Basic Types', 'Type Inference', 'Any and Unknown', 'Void and Never']
      },
      {
        id: 'ts-interfaces',
        name: 'Interfaces',
        subtopics: ['Defining Interfaces', 'Optional Properties', 'Readonly', 'Extending Interfaces', 'Function Types']
      },
      {
        id: 'ts-types',
        name: 'Advanced Types',
        subtopics: ['Union Types', 'Intersection Types', 'Type Guards', 'Type Aliases', 'Literal Types']
      },
      {
        id: 'ts-classes',
        name: 'Classes',
        subtopics: ['Class Basics', 'Access Modifiers', 'Inheritance', 'Abstract Classes', 'Static Members']
      },
      {
        id: 'ts-generics',
        name: 'Generics',
        subtopics: ['Generic Functions', 'Generic Interfaces', 'Generic Classes', 'Constraints', 'Utility Types']
      },
      {
        id: 'ts-modules',
        name: 'Modules',
        subtopics: ['Import/Export', 'Default Exports', 'Namespaces', 'Module Resolution']
      }
    ],
    syntax: [
      { name: 'Type', example: 'let name: string = "John";', explanation: 'String type annotation' },
      { name: 'Interface', example: 'interface User {\n    name: string;\n    age: number;\n}', explanation: 'Define an interface' },
      { name: 'Generic', example: 'function identity<T>(arg: T): T {\n    return arg;\n}', explanation: 'Generic function' }
    ]
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    icon: '🐹',
    color: 'from-cyan-400 to-cyan-600',
    description: 'A fast, efficient language designed by Google for concurrent programming.',
    difficulty: 'intermediate',
    paradigm: ['Procedural', 'Concurrent'],
    useCases: ['Cloud Services', 'DevOps', 'Web Services', 'Command-line Tools'],
    helloWorld: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    topics: [
      {
        id: 'go-basics',
        name: 'Go Basics',
        subtopics: ['Variables', 'Data Types', 'Constants', 'Operators', 'Packages', 'Imports']
      },
      {
        id: 'go-control',
        name: 'Control Flow',
        subtopics: ['If-Else', 'Switch', 'For Loop', 'Range', 'Defer', 'Panic and Recover']
      },
      {
        id: 'go-functions',
        name: 'Functions',
        subtopics: ['Function Basics', 'Multiple Returns', 'Named Returns', 'Variadic Functions', 'Closures']
      },
      {
        id: 'go-ds',
        name: 'Data Structures',
        subtopics: ['Arrays', 'Slices', 'Maps', 'Structs', 'Pointers']
      },
      {
        id: 'go-interfaces',
        name: 'Interfaces',
        subtopics: ['Interface Basics', 'Type Assertions', 'Type Switches', 'Empty Interface']
      },
      {
        id: 'go-concurrency',
        name: 'Concurrency',
        subtopics: ['Goroutines', 'Channels', 'Select', 'Buffered Channels', 'Sync Package']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'x := 10', explanation: 'Short variable declaration' },
      { name: 'Function', example: 'func add(a, b int) int {\n    return a + b\n}', explanation: 'Function with return type' },
      { name: 'Goroutine', example: 'go myFunction()', explanation: 'Start a goroutine' }
    ]
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    color: 'from-orange-600 to-red-700',
    description: 'A systems language focused on safety, speed, and concurrency.',
    difficulty: 'advanced',
    paradigm: ['Functional', 'Concurrent', 'Imperative'],
    useCases: ['Systems Programming', 'WebAssembly', 'CLI Tools', 'Embedded Systems'],
    helloWorld: 'fn main() {\n    println!("Hello, World!");\n}',
    topics: [
      {
        id: 'rust-basics',
        name: 'Rust Basics',
        subtopics: ['Variables and Mutability', 'Data Types', 'Functions', 'Comments', 'Control Flow']
      },
      {
        id: 'rust-ownership',
        name: 'Ownership',
        subtopics: ['Ownership Rules', 'References', 'Borrowing', 'Slices', 'Lifetimes']
      },
      {
        id: 'rust-structs',
        name: 'Structs and Enums',
        subtopics: ['Defining Structs', 'Methods', 'Enums', 'Match', 'Option', 'Result']
      },
      {
        id: 'rust-collections',
        name: 'Collections',
        subtopics: ['Vectors', 'Strings', 'HashMaps', 'Iterators']
      },
      {
        id: 'rust-error',
        name: 'Error Handling',
        subtopics: ['Panic', 'Result Type', '? Operator', 'Custom Errors']
      },
      {
        id: 'rust-generics',
        name: 'Generics and Traits',
        subtopics: ['Generic Types', 'Trait Definitions', 'Trait Bounds', 'Associated Types']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'let mut x = 5;', explanation: 'Mutable variable declaration' },
      { name: 'Match', example: 'match value {\n    1 => "one",\n    _ => "other",\n}', explanation: 'Pattern matching' },
      { name: 'Struct', example: 'struct User {\n    name: String,\n    age: u32,\n}', explanation: 'Define a struct' }
    ]
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    icon: '🟣',
    color: 'from-purple-500 to-purple-700',
    description: 'A modern language for Android development and JVM applications.',
    difficulty: 'intermediate',
    paradigm: ['Object-Oriented', 'Functional'],
    useCases: ['Android Development', 'Backend Development', 'Multiplatform'],
    helloWorld: 'fun main() {\n    println("Hello, World!")\n}',
    topics: [
      {
        id: 'kotlin-basics',
        name: 'Kotlin Basics',
        subtopics: ['Variables', 'Data Types', 'Null Safety', 'Operators', 'String Templates']
      },
      {
        id: 'kotlin-control',
        name: 'Control Flow',
        subtopics: ['If Expression', 'When Expression', 'For Loop', 'While Loop', 'Ranges']
      },
      {
        id: 'kotlin-functions',
        name: 'Functions',
        subtopics: ['Function Basics', 'Default Arguments', 'Named Arguments', 'Lambda Expressions', 'Higher-order Functions']
      },
      {
        id: 'kotlin-oop',
        name: 'Object-Oriented Programming',
        subtopics: ['Classes', 'Properties', 'Inheritance', 'Interfaces', 'Data Classes', 'Sealed Classes', 'Object Declarations']
      },
      {
        id: 'kotlin-collections',
        name: 'Collections',
        subtopics: ['Lists', 'Sets', 'Maps', 'Collection Operations', 'Sequences']
      },
      {
        id: 'kotlin-coroutines',
        name: 'Coroutines',
        subtopics: ['Suspend Functions', 'Coroutine Builders', 'Coroutine Context', 'Flow']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'val name = "John"', explanation: 'Immutable variable' },
      { name: 'Null Safe', example: 'val length = name?.length', explanation: 'Safe call operator' },
      { name: 'Lambda', example: 'val sum = { a: Int, b: Int -> a + b }', explanation: 'Lambda expression' }
    ]
  },
  {
    id: 'swift',
    name: 'Swift',
    icon: '🍎',
    color: 'from-orange-400 to-red-500',
    description: 'Apple\'s modern language for iOS, macOS, and other Apple platforms.',
    difficulty: 'intermediate',
    paradigm: ['Object-Oriented', 'Functional', 'Protocol-Oriented'],
    useCases: ['iOS Development', 'macOS Apps', 'Server-side Swift'],
    helloWorld: 'print("Hello, World!")',
    topics: [
      {
        id: 'swift-basics',
        name: 'Swift Basics',
        subtopics: ['Variables and Constants', 'Data Types', 'Optionals', 'Operators', 'Strings', 'Type Inference']
      },
      {
        id: 'swift-control',
        name: 'Control Flow',
        subtopics: ['If-Else', 'Switch', 'For-In', 'While', 'Guard', 'Early Exit']
      },
      {
        id: 'swift-functions',
        name: 'Functions',
        subtopics: ['Function Syntax', 'Parameters', 'Return Values', 'Closures', 'Higher-order Functions']
      },
      {
        id: 'swift-oop',
        name: 'Object-Oriented Programming',
        subtopics: ['Classes', 'Structs', 'Enums', 'Inheritance', 'Initialization', 'Deinitialization']
      },
      {
        id: 'swift-protocols',
        name: 'Protocols',
        subtopics: ['Protocol Syntax', 'Protocol Conformance', 'Protocol Extensions', 'Protocol-Oriented Design']
      },
      {
        id: 'swift-error',
        name: 'Error Handling',
        subtopics: ['Throwing Functions', 'Do-Try-Catch', 'Optional Try', 'Custom Errors']
      }
    ],
    syntax: [
      { name: 'Variable', example: 'var name = "John"', explanation: 'Mutable variable' },
      { name: 'Optional', example: 'var age: Int? = nil', explanation: 'Optional integer' },
      { name: 'Closure', example: 'let add = { (a: Int, b: Int) -> Int in\n    return a + b\n}', explanation: 'Closure expression' }
    ]
  }
];
