// Comprehensive Programming Content Bank - Free Offline Content

export interface ProgrammingConcept {
  name: string;
  explanation: string;
  syntax?: string;
  keyPoints: string[];
}

export interface ProgrammingExample {
  title: string;
  description: string;
  code: string;
  output: string;
  explanation?: string;
}

export interface ProgrammingProblem {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problem: string;
  hint: string;
  solution: string;
  output: string;
}

export interface ProgrammingMistake {
  mistake: string;
  correct: string;
  example?: string;
}

export interface ProgrammingTopicContent {
  title: string;
  introduction: string;
  diagram?: {
    title: string;
    imageUrl: string;
    description: string;
  };
  concepts: ProgrammingConcept[];
  codeExamples: ProgrammingExample[];
  practiceProblems: ProgrammingProblem[];
  commonMistakes: ProgrammingMistake[];
  summary: string;
  nextSteps: string[];
}

// Python Content
const pythonContent: Record<string, ProgrammingTopicContent> = {
  'Variables and Data Types': {
    title: 'Python Variables and Data Types',
    introduction: 'Variables are containers for storing data values. Python is dynamically typed, meaning you don\'t need to declare the type of a variable. Python has several built-in data types including integers, floats, strings, booleans, lists, tuples, and dictionaries.',
    diagram: {
      title: 'Python Data Types Hierarchy',
      imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
      description: 'Python data types: Numeric (int, float, complex), Sequence (str, list, tuple), Mapping (dict), Set (set, frozenset), Boolean (bool)'
    },
    concepts: [
      {
        name: 'Variables',
        explanation: 'A variable is a name that refers to a value stored in memory. In Python, you create a variable by assigning a value to it using the = operator.',
        syntax: 'variable_name = value',
        keyPoints: [
          'Variable names must start with a letter or underscore',
          'Can contain letters, numbers, and underscores',
          'Case-sensitive (age and Age are different)',
          'Cannot use Python keywords as variable names'
        ]
      },
      {
        name: 'Integers (int)',
        explanation: 'Integers are whole numbers without decimal points. Python 3 has unlimited precision for integers.',
        syntax: 'x = 10\ny = -5\nbig_num = 123456789012345678901234567890',
        keyPoints: [
          'No size limit in Python 3',
          'Can be positive, negative, or zero',
          'Supports arithmetic operations',
          'Can convert using int() function'
        ]
      },
      {
        name: 'Floats (float)',
        explanation: 'Floating-point numbers are numbers with decimal points. They can also be written in scientific notation.',
        syntax: 'pi = 3.14159\nscientific = 2.5e-3  # 0.0025',
        keyPoints: [
          'Limited precision (about 15-17 digits)',
          'Can use scientific notation (e or E)',
          'Be careful with float comparison',
          'Convert using float() function'
        ]
      },
      {
        name: 'Strings (str)',
        explanation: 'Strings are sequences of characters enclosed in quotes. They are immutable in Python.',
        syntax: 'single = \'Hello\'\ndouble = "World"\nmulti = """Line 1\nLine 2"""',
        keyPoints: [
          'Can use single, double, or triple quotes',
          'Immutable (cannot be changed after creation)',
          'Support indexing and slicing',
          'Many built-in methods available'
        ]
      },
      {
        name: 'Booleans (bool)',
        explanation: 'Boolean values represent truth values: True or False. Used in conditional statements and logic.',
        syntax: 'is_valid = True\nis_empty = False',
        keyPoints: [
          'Only two values: True and False',
          'Result of comparison operations',
          'True = 1, False = 0 in numeric context',
          'Used in if statements and loops'
        ]
      }
    ],
    codeExamples: [
      {
        title: 'Basic Variable Assignment',
        description: 'Creating and using variables of different types',
        code: `# Integer variable
age = 25
print(f"Age: {age}")

# Float variable
height = 5.9
print(f"Height: {height}")

# String variable
name = "Alice"
print(f"Name: {name}")

# Boolean variable
is_student = True
print(f"Is Student: {is_student}")`,
        output: 'Age: 25\nHeight: 5.9\nName: Alice\nIs Student: True',
        explanation: 'Variables are created by simple assignment. The f-string format allows embedding variables directly in strings.'
      },
      {
        title: 'Type Checking and Conversion',
        description: 'Checking data types and converting between types',
        code: `# Check type
x = 10
print(type(x))  # <class 'int'>

# Type conversion
num_str = "42"
num_int = int(num_str)
print(num_int + 8)  # 50

# Float to int (truncates)
pi = 3.14159
print(int(pi))  # 3

# Number to string
age = 25
age_str = str(age)
print("I am " + age_str + " years old")`,
        output: "<class 'int'>\n50\n3\nI am 25 years old",
        explanation: 'type() returns the data type. Use int(), float(), str(), bool() for type conversion.'
      },
      {
        title: 'String Operations',
        description: 'Common string operations and methods',
        code: `text = "Hello, World!"

# Length
print(len(text))  # 13

# Indexing (0-based)
print(text[0])   # H
print(text[-1])  # !

# Slicing
print(text[0:5])  # Hello
print(text[7:])   # World!

# Methods
print(text.upper())      # HELLO, WORLD!
print(text.lower())      # hello, world!
print(text.replace("World", "Python"))  # Hello, Python!`,
        output: '13\nH\n!\nHello\nWorld!\nHELLO, WORLD!\nhello, world!\nHello, Python!',
        explanation: 'Strings support indexing, slicing, and many methods for manipulation.'
      }
    ],
    practiceProblems: [
      {
        title: 'Swap Two Variables',
        difficulty: 'easy',
        problem: 'Write a program to swap the values of two variables without using a third variable.',
        hint: 'Python allows tuple unpacking for elegant swapping.',
        solution: `a = 5
b = 10
print(f"Before: a={a}, b={b}")

# Python way - tuple unpacking
a, b = b, a

print(f"After: a={a}, b={b}")`,
        output: 'Before: a=5, b=10\nAfter: a=10, b=5'
      },
      {
        title: 'Type Conversion Calculator',
        difficulty: 'easy',
        problem: 'Take two numbers as input strings, convert to integers, perform addition, and display the result.',
        hint: 'Use int() to convert strings to integers.',
        solution: `num1_str = "15"
num2_str = "27"

num1 = int(num1_str)
num2 = int(num2_str)

result = num1 + num2
print(f"{num1} + {num2} = {result}")`,
        output: '15 + 27 = 42'
      },
      {
        title: 'String Reversal',
        difficulty: 'easy',
        problem: 'Reverse a string using slicing.',
        hint: 'Use slice with step -1.',
        solution: `text = "Python Programming"

# Reverse using slicing
reversed_text = text[::-1]

print(f"Original: {text}")
print(f"Reversed: {reversed_text}")`,
        output: 'Original: Python Programming\nReversed: gnimmargorP nohtyP'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using = instead of == for comparison',
        correct: 'Use = for assignment, == for comparison',
        example: `# Wrong: if x = 5:
# Correct: if x == 5:`
      },
      {
        mistake: 'Concatenating string with number directly',
        correct: 'Convert number to string first using str()',
        example: `# Wrong: "Age: " + 25
# Correct: "Age: " + str(25) or f"Age: {25}"`
      },
      {
        mistake: 'Integer division confusion',
        correct: 'Use / for float division, // for integer division',
        example: `# 7 / 2 = 3.5 (float division)
# 7 // 2 = 3 (integer division)`
      }
    ],
    summary: 'Variables in Python are created by assignment. Python has dynamic typing with common types: int, float, str, bool. Type conversion is done using built-in functions. Strings are immutable and support powerful operations.',
    nextSteps: [
      'Learn about operators and expressions',
      'Explore control flow (if-else statements)',
      'Study loops (for and while)',
      'Understand functions and modules'
    ]
  },
  'Loops and Iteration': {
    title: 'Python Loops and Iteration',
    introduction: 'Loops allow you to execute a block of code repeatedly. Python provides two main types of loops: for loops for iterating over sequences and while loops for condition-based repetition.',
    diagram: {
      title: 'Loop Types in Python',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      description: 'For Loop: Iterates over sequence. While Loop: Continues while condition is True. Both support break, continue, and else.'
    },
    concepts: [
      {
        name: 'For Loop',
        explanation: 'The for loop iterates over a sequence (list, tuple, string, range) and executes the code block for each item.',
        syntax: 'for item in sequence:\n    # code block',
        keyPoints: [
          'Iterates over any iterable object',
          'Use range() for numeric sequences',
          'Can iterate with index using enumerate()',
          'Supports nested loops'
        ]
      },
      {
        name: 'While Loop',
        explanation: 'The while loop continues executing as long as the condition remains True.',
        syntax: 'while condition:\n    # code block',
        keyPoints: [
          'Condition checked before each iteration',
          'Must update condition to avoid infinite loop',
          'Use when number of iterations is unknown',
          'Can become infinite if not careful'
        ]
      },
      {
        name: 'Range Function',
        explanation: 'range() generates a sequence of numbers commonly used with for loops.',
        syntax: 'range(stop)\nrange(start, stop)\nrange(start, stop, step)',
        keyPoints: [
          'range(5) gives 0,1,2,3,4',
          'range(1,6) gives 1,2,3,4,5',
          'range(0,10,2) gives 0,2,4,6,8',
          'range(10,0,-1) counts backwards'
        ]
      },
      {
        name: 'Break and Continue',
        explanation: 'break exits the loop entirely. continue skips to the next iteration.',
        syntax: 'break   # exit loop\ncontinue # skip to next iteration',
        keyPoints: [
          'break terminates the loop',
          'continue skips remaining code in iteration',
          'Only affects the innermost loop',
          'Use sparingly for clarity'
        ]
      }
    ],
    codeExamples: [
      {
        title: 'Basic For Loop',
        description: 'Iterating over different sequences',
        code: `# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

print("---")

# Loop through a string
for char in "Python":
    print(char, end=" ")

print("\\n---")

# Loop through range
for i in range(5):
    print(i, end=" ")`,
        output: 'apple\nbanana\ncherry\n---\nP y t h o n \n---\n0 1 2 3 4',
        explanation: 'For loops work with any iterable: lists, strings, ranges, etc.'
      },
      {
        title: 'While Loop with Condition',
        description: 'Using while loop for condition-based iteration',
        code: `# Count down
count = 5
while count > 0:
    print(count)
    count -= 1
print("Liftoff!")

print("---")

# Finding first number divisible by 7
num = 1
while num % 7 != 0 or num == 1:
    num += 1
print(f"First number > 1 divisible by 7: {num}")`,
        output: '5\n4\n3\n2\n1\nLiftoff!\n---\nFirst number > 1 divisible by 7: 7',
        explanation: 'While loops continue until the condition becomes False.'
      },
      {
        title: 'Break and Continue',
        description: 'Controlling loop flow with break and continue',
        code: `# Break example - find first even number
numbers = [1, 3, 5, 8, 9, 10]
for num in numbers:
    if num % 2 == 0:
        print(f"First even number: {num}")
        break

print("---")

# Continue example - print only odd numbers
for i in range(10):
    if i % 2 == 0:
        continue
    print(i, end=" ")`,
        output: 'First even number: 8\n---\n1 3 5 7 9',
        explanation: 'break exits the loop. continue skips to the next iteration.'
      },
      {
        title: 'Enumerate and Nested Loops',
        description: 'Advanced loop patterns',
        code: `# Enumerate for index and value
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

print("---")

# Nested loop - multiplication table (partial)
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i*j}", end=" ")
    print()`,
        output: '0: apple\n1: banana\n2: cherry\n---\n1x1=1 1x2=2 1x3=3 \n2x1=2 2x2=4 2x3=6 \n3x1=3 3x2=6 3x3=9',
        explanation: 'enumerate() gives both index and value. Nested loops create 2D patterns.'
      }
    ],
    practiceProblems: [
      {
        title: 'Sum of Numbers',
        difficulty: 'easy',
        problem: 'Calculate the sum of all numbers from 1 to N.',
        hint: 'Use a for loop with range and accumulator variable.',
        solution: `n = 10
total = 0

for i in range(1, n + 1):
    total += i

print(f"Sum of 1 to {n} = {total}")

# Alternative using formula
formula_sum = n * (n + 1) // 2
print(f"Using formula: {formula_sum}")`,
        output: 'Sum of 1 to 10 = 55\nUsing formula: 55'
      },
      {
        title: 'Factorial',
        difficulty: 'easy',
        problem: 'Calculate the factorial of a number.',
        hint: 'Multiply all numbers from 1 to n.',
        solution: `n = 5
factorial = 1

for i in range(1, n + 1):
    factorial *= i

print(f"{n}! = {factorial}")`,
        output: '5! = 120'
      },
      {
        title: 'Prime Number Check',
        difficulty: 'medium',
        problem: 'Check if a number is prime.',
        hint: 'A prime has no divisors other than 1 and itself.',
        solution: `num = 17
is_prime = True

if num < 2:
    is_prime = False
else:
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break

if is_prime:
    print(f"{num} is prime")
else:
    print(f"{num} is not prime")`,
        output: '17 is prime'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Infinite while loop',
        correct: 'Always ensure the condition will eventually become False',
        example: `# Wrong: while True: print("forever")
# Correct: 
count = 0
while count < 5:
    print(count)
    count += 1  # Update condition`
      },
      {
        mistake: 'Off-by-one error with range',
        correct: 'Remember range(n) goes from 0 to n-1',
        example: `# For numbers 1-5:
# Wrong: range(5) gives 0,1,2,3,4
# Correct: range(1, 6) gives 1,2,3,4,5`
      },
      {
        mistake: 'Modifying list while iterating',
        correct: 'Create a copy or use list comprehension',
        example: `# Wrong: 
# for item in my_list:
#     if condition: my_list.remove(item)
# Correct: 
# my_list = [x for x in my_list if not condition]`
      }
    ],
    summary: 'Python provides for loops for sequences and while loops for conditions. Use range() for numeric iteration, break to exit loops, continue to skip iterations. Enumerate gives index with value.',
    nextSteps: [
      'Learn list comprehensions',
      'Explore itertools module',
      'Study generators and yield',
      'Practice recursion'
    ]
  }
};

// JavaScript Content
const javascriptContent: Record<string, ProgrammingTopicContent> = {
  'Variables and Data Types': {
    title: 'JavaScript Variables and Data Types',
    introduction: 'JavaScript is a dynamically typed language. Variables can be declared using var, let, or const. JavaScript has primitive types (string, number, boolean, null, undefined, symbol, bigint) and reference types (objects, arrays, functions).',
    diagram: {
      title: 'JavaScript Type System',
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      description: 'Primitives: string, number, boolean, null, undefined, symbol, bigint. Reference: Object, Array, Function'
    },
    concepts: [
      {
        name: 'Variable Declaration',
        explanation: 'JavaScript has three ways to declare variables: var (function-scoped), let (block-scoped), and const (block-scoped, immutable binding).',
        syntax: 'let name = "John";\nconst PI = 3.14;\nvar age = 25;',
        keyPoints: [
          'Use const by default',
          'Use let when reassignment is needed',
          'Avoid var in modern JavaScript',
          'const prevents reassignment, not mutation'
        ]
      },
      {
        name: 'Number Type',
        explanation: 'JavaScript has only one number type for both integers and floating-point. It also supports BigInt for large integers.',
        syntax: 'let integer = 42;\nlet float = 3.14;\nlet big = 9007199254740991n;',
        keyPoints: [
          'All numbers are 64-bit floating-point',
          'NaN represents "Not a Number"',
          'Infinity for values beyond limits',
          'BigInt for integers larger than Number.MAX_SAFE_INTEGER'
        ]
      },
      {
        name: 'String Type',
        explanation: 'Strings are sequences of characters. JavaScript supports single quotes, double quotes, and template literals.',
        syntax: "let single = 'Hello';\nlet double = \"World\";\nlet template = `Hello ${name}`;",
        keyPoints: [
          'Template literals support interpolation',
          'Strings are immutable',
          'Rich set of string methods',
          'Can use either single or double quotes'
        ]
      },
      {
        name: 'Boolean, Null, Undefined',
        explanation: 'Boolean has true/false values. Null represents intentional absence of value. Undefined means variable declared but not assigned.',
        syntax: 'let isActive = true;\nlet empty = null;\nlet notAssigned;  // undefined',
        keyPoints: [
          'Falsy values: false, 0, "", null, undefined, NaN',
          'null is assigned, undefined is default',
          'typeof null returns "object" (historical bug)',
          'Use === for strict comparison'
        ]
      }
    ],
    codeExamples: [
      {
        title: 'Variable Declaration Comparison',
        description: 'Differences between var, let, and const',
        code: `// const - cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // Error!

// let - can be reassigned
let count = 0;
count = 1;  // OK

// var - function scoped (avoid in modern JS)
var oldStyle = "legacy";

// const with objects
const person = { name: "Alice" };
person.name = "Bob";  // OK - mutation allowed
// person = {};  // Error - reassignment not allowed

console.log(PI, count, person.name);`,
        output: '3.14159 1 Bob',
        explanation: 'const prevents reassignment but allows mutation of objects. let is block-scoped and reassignable.'
      },
      {
        title: 'Type Checking and Conversion',
        description: 'Using typeof and converting between types',
        code: `// typeof operator
console.log(typeof "Hello");    // string
console.log(typeof 42);         // number
console.log(typeof true);       // boolean
console.log(typeof undefined);  // undefined
console.log(typeof null);       // object (bug)
console.log(typeof {});         // object
console.log(typeof []);         // object

// Type conversion
let str = "123";
let num = Number(str);
console.log(num + 7);  // 130

let bool = Boolean(0);
console.log(bool);  // false`,
        output: 'string\nnumber\nboolean\nundefined\nobject\nobject\nobject\n130\nfalse',
        explanation: 'typeof returns type as string. Use Number(), String(), Boolean() for conversion.'
      },
      {
        title: 'Template Literals',
        description: 'String interpolation and multi-line strings',
        code: `const name = "Alice";
const age = 25;

// Template literal interpolation
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
console.log(greeting);

// Expression in template
console.log(\`Next year: \${age + 1}\`);

// Multi-line string
const poem = \`Roses are red,
Violets are blue,
JavaScript is awesome,
And so are you!\`;
console.log(poem);`,
        output: 'Hello, Alice! You are 25 years old.\nNext year: 26\nRoses are red,\nViolets are blue,\nJavaScript is awesome,\nAnd so are you!',
        explanation: 'Template literals use backticks and ${} for interpolation. They preserve line breaks.'
      }
    ],
    practiceProblems: [
      {
        title: 'Temperature Converter',
        difficulty: 'easy',
        problem: 'Convert Celsius to Fahrenheit.',
        hint: 'Formula: F = C × 9/5 + 32',
        solution: `const celsius = 25;
const fahrenheit = celsius * 9/5 + 32;

console.log(\`\${celsius}°C = \${fahrenheit}°F\`);`,
        output: '25°C = 77°F'
      },
      {
        title: 'Type Checker',
        difficulty: 'easy',
        problem: 'Write a function to check and print the type of any value.',
        hint: 'Use typeof operator.',
        solution: `function checkType(value) {
    const type = typeof value;
    console.log(\`Value: \${value}, Type: \${type}\`);
}

checkType(42);
checkType("Hello");
checkType(true);
checkType(null);
checkType([1, 2, 3]);`,
        output: 'Value: 42, Type: number\nValue: Hello, Type: string\nValue: true, Type: boolean\nValue: null, Type: object\nValue: 1,2,3, Type: object'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using == instead of ===',
        correct: 'Always use === for strict equality (no type coercion)',
        example: `// Wrong: "5" == 5 is true (type coercion)
// Correct: "5" === 5 is false (strict)`
      },
      {
        mistake: 'Forgetting that typeof null is "object"',
        correct: 'Use value === null to check for null',
        example: `// Wrong: typeof value === "null"
// Correct: value === null`
      },
      {
        mistake: 'Variable hoisting with var',
        correct: 'Use let/const which are not hoisted the same way',
        example: `// var is hoisted, can cause bugs
// Use let or const instead`
      }
    ],
    summary: 'JavaScript uses var, let, const for variables. Prefer const, use let when needed, avoid var. Has 7 primitive types. Use === for comparison. Template literals for string interpolation.',
    nextSteps: [
      'Learn about operators and expressions',
      'Study conditionals (if-else, switch)',
      'Explore loops (for, while, for...of)',
      'Understand functions and scope'
    ]
  }
};

// Java Content
const javaContent: Record<string, ProgrammingTopicContent> = {
  'Variables and Data Types': {
    title: 'Java Variables and Data Types',
    introduction: 'Java is a statically typed language, meaning variable types must be declared. Java has 8 primitive types and reference types (objects, arrays). Understanding these is fundamental to Java programming.',
    diagram: {
      title: 'Java Type System',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
      description: 'Primitives: byte, short, int, long, float, double, char, boolean. Reference: String, arrays, objects'
    },
    concepts: [
      {
        name: 'Primitive Data Types',
        explanation: 'Java has 8 primitive types: byte (8-bit), short (16-bit), int (32-bit), long (64-bit), float (32-bit), double (64-bit), char (16-bit), boolean.',
        syntax: 'int age = 25;\ndouble price = 19.99;\nchar grade = \'A\';\nboolean isValid = true;',
        keyPoints: [
          'int is default for integers',
          'double is default for decimals',
          'long literals need L suffix',
          'float literals need f suffix'
        ]
      },
      {
        name: 'Reference Types',
        explanation: 'Reference types hold references to objects. Includes String, arrays, and all class instances.',
        syntax: 'String name = "Java";\nint[] numbers = {1, 2, 3};\nArrayList<String> list = new ArrayList<>();',
        keyPoints: [
          'Reference variables store memory addresses',
          'null is a valid value for references',
          'Strings are immutable objects',
          'Arrays have fixed size'
        ]
      },
      {
        name: 'Type Casting',
        explanation: 'Converting one type to another. Widening (implicit) is automatic. Narrowing (explicit) requires casting.',
        syntax: '// Widening\nint i = 100;\nlong l = i;\n\n// Narrowing\ndouble d = 3.14;\nint x = (int) d;',
        keyPoints: [
          'Widening: smaller to larger type (auto)',
          'Narrowing: larger to smaller (explicit cast)',
          'May lose precision in narrowing',
          'Cannot cast boolean to other types'
        ]
      }
    ],
    codeExamples: [
      {
        title: 'Primitive Types Demo',
        description: 'Declaring and using primitive types',
        code: `public class PrimitivesDemo {
    public static void main(String[] args) {
        // Integer types
        byte b = 127;           // -128 to 127
        short s = 32000;        // -32768 to 32767
        int i = 2000000000;     // ~-2 billion to 2 billion
        long l = 9000000000L;   // Note: L suffix
        
        // Floating-point types
        float f = 3.14f;        // Note: f suffix
        double d = 3.14159265359;
        
        // Character and boolean
        char c = 'A';
        boolean flag = true;
        
        System.out.println("int: " + i);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + flag);
    }
}`,
        output: 'int: 2000000000\ndouble: 3.14159265359\nchar: A\nboolean: true',
        explanation: 'Each primitive type has specific size and range. Use appropriate type for your data.'
      },
      {
        title: 'String Operations',
        description: 'Working with String class',
        code: `public class StringDemo {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = " World!";
        
        // Concatenation
        String greeting = s1 + s2;
        System.out.println(greeting);
        
        // Length
        System.out.println("Length: " + greeting.length());
        
        // Methods
        System.out.println("Upper: " + greeting.toUpperCase());
        System.out.println("Char at 0: " + greeting.charAt(0));
        System.out.println("Contains 'World': " + greeting.contains("World"));
        
        // Substring
        System.out.println("Substring(0,5): " + greeting.substring(0, 5));
    }
}`,
        output: 'Hello World!\nLength: 12\nUpper: HELLO WORLD!\nChar at 0: H\nContains \'World\': true\nSubstring(0,5): Hello',
        explanation: 'String is a reference type with many useful methods. Strings are immutable.'
      }
    ],
    practiceProblems: [
      {
        title: 'Circle Area Calculator',
        difficulty: 'easy',
        problem: 'Calculate the area of a circle given its radius.',
        hint: 'Area = π × r². Use Math.PI for pi.',
        solution: `public class CircleArea {
    public static void main(String[] args) {
        double radius = 5.0;
        double area = Math.PI * radius * radius;
        
        System.out.printf("Radius: %.2f%n", radius);
        System.out.printf("Area: %.2f%n", area);
    }
}`,
        output: 'Radius: 5.00\nArea: 78.54'
      },
      {
        title: 'Type Casting Practice',
        difficulty: 'easy',
        problem: 'Demonstrate widening and narrowing conversions.',
        hint: 'Widening is automatic, narrowing needs explicit cast.',
        solution: `public class TypeCasting {
    public static void main(String[] args) {
        // Widening (automatic)
        int intValue = 100;
        long longValue = intValue;  // int to long
        double doubleValue = longValue;  // long to double
        
        System.out.println("int: " + intValue);
        System.out.println("long: " + longValue);
        System.out.println("double: " + doubleValue);
        
        // Narrowing (explicit cast required)
        double d = 9.78;
        int i = (int) d;  // Loses decimal part
        
        System.out.println("double: " + d);
        System.out.println("int (cast): " + i);
    }
}`,
        output: 'int: 100\nlong: 100\ndouble: 100.0\ndouble: 9.78\nint (cast): 9'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting L suffix for long literals',
        correct: 'Add L to indicate long: long big = 9000000000L;',
        example: `// Wrong: long big = 9000000000; // Compile error
// Correct: long big = 9000000000L;`
      },
      {
        mistake: 'Using == to compare Strings',
        correct: 'Use .equals() method for String comparison',
        example: `// Wrong: if (s1 == s2)
// Correct: if (s1.equals(s2))`
      },
      {
        mistake: 'Integer division truncation',
        correct: 'Cast to double for decimal result',
        example: `// int / int = int: 7/2 = 3
// For decimal: (double)7 / 2 = 3.5`
      }
    ],
    summary: 'Java has 8 primitive types and reference types. Variables must be declared with types. Use widening for safe conversions, explicit casting for narrowing. Strings use .equals() for comparison.',
    nextSteps: [
      'Learn operators and expressions',
      'Study control flow statements',
      'Explore object-oriented programming',
      'Understand exception handling'
    ]
  }
};

// Get programming content
export function getProgrammingTopicContent(topic: string, language: string, category: string): ProgrammingTopicContent | null {
  const langLower = language.toLowerCase();
  
  if (langLower === 'python' && pythonContent[topic]) {
    return pythonContent[topic];
  }
  
  if ((langLower === 'javascript' || langLower === 'js') && javascriptContent[topic]) {
    return javascriptContent[topic];
  }
  
  if (langLower === 'java' && javaContent[topic]) {
    return javaContent[topic];
  }
  
  return null;
}

// Generate generic programming content
export function generateGenericProgrammingContent(topic: string, language: string, category: string): ProgrammingTopicContent {
  return {
    title: `${topic} in ${language}`,
    introduction: `${topic} is an essential concept in ${language} programming. Understanding this topic will help you write better, more efficient code.`,
    diagram: {
      title: `${topic} Overview`,
      imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
      description: `Visual representation of ${topic} concepts in ${language}`
    },
    concepts: [
      {
        name: 'Core Concept',
        explanation: `The fundamental principle of ${topic} in ${language}.`,
        keyPoints: [
          'Understand the basic syntax',
          'Learn common patterns',
          'Practice with examples',
          'Apply in real projects'
        ]
      }
    ],
    codeExamples: [
      {
        title: 'Basic Example',
        description: `A simple demonstration of ${topic}`,
        code: `// Example code for ${topic}\n// Practice implementing this concept`,
        output: 'Expected output here',
        explanation: 'This example shows the basic usage pattern.'
      }
    ],
    practiceProblems: [
      {
        title: 'Practice Problem',
        difficulty: 'easy',
        problem: `Write a program demonstrating ${topic}.`,
        hint: 'Start with the basic syntax and build up.',
        solution: '// Your solution here',
        output: 'Expected output'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Common syntax error',
        correct: 'Correct approach',
        example: '// Example of correct usage'
      }
    ],
    summary: `${topic} is a fundamental concept in ${language}. Regular practice will help you master it.`,
    nextSteps: [
      'Practice with more examples',
      'Build a small project',
      'Explore advanced concepts',
      'Read documentation'
    ]
  };
}

export const allProgrammingContent = {
  python: pythonContent,
  javascript: javascriptContent,
  java: javaContent
};
