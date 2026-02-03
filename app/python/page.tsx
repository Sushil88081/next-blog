import Image from "next/image";
import PostCard from "@/components/PostCard";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "Python Tutorials and Guides",
  description:
    "Learn Python programming language with comprehensive tutorials and guides. Master Python basics, data structures, functions, and more with detailed examples.",
  keywords: [
    "python",
    "python programming",
    "python tutorial",
    "learn python",
    "python basics",
    "python for beginners",
    "data science",
    "python examples",
    "programming",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/python`,
    siteName: "Programming Blog",
    title: "Python Tutorials and Guides",
    description:
      "Learn Python programming language with comprehensive tutorials and guides.",
    images: [
      {
        url: `${siteUrl}/assets/images/python.jpg`,
        width: 1200,
        height: 630,
        alt: "Python Tutorials and Guides",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Python Tutorials and Guides",
    description:
      "Learn Python programming language with comprehensive tutorials and guides.",
    images: [`${siteUrl}/assets/images/python.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/python`,
  },
};

export default function PythonPage() {
  const pythonPosts = [
    {
      title: "What is Python? - Complete Introduction for Beginners",
      description:
        "Learn what Python programming language is, why it's so popular, and what you can build with it. Perfect guide for beginners.",
      image: "/assets/images/python.jpg",
      date: "2025-01-27",
      slug: "python-introduction",
    },
    {
      title: "Python Basics - Variables, Types, and Syntax",
      description:
        "Learn Python fundamentals including variables, data types, operators, and basic syntax. Perfect for beginners starting their Python journey.",
      image: "/assets/images/python.jpg",
      date: "2025-01-30",
      slug: "python-basics",
    },
    {
      title: "How to Install Python - Step by Step Guide",
      description:
        "Complete guide on installing Python on Windows, macOS, and Linux. Learn how to set up your Python development environment and verify installation.",
      image: "/assets/images/python.jpg",
      date: "2025-02-14",
      slug: "python-installation",
    },
    {
      title: "Python Functions - Complete Guide",
      description:
        "Learn how to create and use functions in Python. Understand function syntax, parameters, return values, lambda functions, and best practices.",
      image: "/assets/images/python.jpg",
      date: "2025-02-15",
      slug: "python-functions",
    },
    {
      title: "Python Data Structures - Lists, Dictionaries, Tuples, Sets",
      description:
        "Learn about Python data structures including lists, dictionaries, tuples, and sets. Understand when to use each and how to work with them effectively.",
      image: "/assets/images/python.jpg",
      date: "2025-02-16",
      slug: "python-data-structures",
    },
    {
      title: "Python Control Flow - If Statements, Loops, and More",
      description:
        "Learn about Python control flow including if statements, for loops, while loops, break, continue, and how to control program execution.",
      image: "/assets/images/python.jpg",
      date: "2025-02-17",
      slug: "python-control-flow",
    },
    {
      title: "Python Classes and Objects - Complete Guide",
      description:
        "Learn about Python classes and object-oriented programming. Understand how to create classes, objects, methods, inheritance, and more.",
      image: "/assets/images/python.jpg",
      date: "2025-02-18",
      slug: "python-classes",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/python.jpg"
          alt="Python"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Python
          </h1>
          <p className="text-lg text-white/90">
            {pythonPosts.length} Posts Available
          </p>
        </div>
      </div>

      {/* Comprehensive Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What is Python? A Complete Introduction
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Python is a high-level, interpreted programming language created by Guido van Rossum and first released in 1991. It's designed with an emphasis on code readability, using significant whitespace and a syntax that allows programmers to express concepts in fewer lines of code than would be possible in languages like C++ or Java.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Python is one of the most popular programming languages in the world, consistently ranking in the top 3 on various programming language popularity indexes. It's used by major companies like Google, Netflix, Instagram, Spotify, and NASA. Python's versatility makes it suitable for web development, data science, artificial intelligence, machine learning, automation, game development, and much more.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            One of Python's greatest strengths is its philosophy, often summarized as "The Zen of Python": beautiful is better than ugly, simple is better than complex, readable code is better than clever code. This philosophy makes Python an excellent choice for beginners while still being powerful enough for professional development.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Learn Python? Key Benefits
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Perfect for Beginners
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Python's syntax is designed to be readable and straightforward. Unlike many programming languages, Python reads almost like English, making it easier to understand and learn. You can focus on learning programming concepts rather than struggling with complex syntax rules. This makes Python ideal as a first programming language.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                High Demand in the Job Market
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Python developers are in extremely high demand across multiple industries. According to job market data, Python consistently ranks among the top programming languages employers are looking for. Career opportunities exist in web development, data science, machine learning, automation, cybersecurity, and more. Learning Python significantly increases your employability.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Incredibly Versatile
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Python can be used for almost anything. Build web applications with Django or Flask, analyze data with Pandas and NumPy, create machine learning models with TensorFlow or PyTorch, automate tasks with scripts, develop games with Pygame, build desktop applications with Tkinter or PyQt, and much more. One language, endless possibilities.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Massive Library Ecosystem
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Python has one of the largest ecosystems of libraries and frameworks. The Python Package Index (PyPI) contains over 400,000 packages. Whether you need to work with web APIs, process images, perform scientific calculations, or interact with databases, there's likely a Python library for it. This saves you time and allows you to build complex applications quickly.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Core Python Concepts Explained
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              1. Variables and Data Types
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Python is dynamically typed, meaning you don't need to declare variable types. You simply assign a value, and Python automatically determines the type. Python supports various data types including integers, floats, strings, booleans, lists, dictionaries, tuples, and sets. Understanding these fundamental types is crucial for Python programming.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`# Python variables are simple
name = "Python Developer"
age = 25
height = 5.9
is_student = True

# Lists and dictionaries
fruits = ["apple", "banana", "orange"]
person = {"name": "John", "age": 30}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              2. Functions - Reusable Code Blocks
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Functions in Python allow you to organize code into reusable blocks. You can define functions with parameters, return values, and use default arguments. Python also supports lambda functions for simple, one-line functions. Functions help you write DRY (Don't Repeat Yourself) code and make your programs more modular and maintainable.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Usage
message = greet("Python", "Hi")
print(message)  # Output: Hi, Python!`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              3. Control Flow - Making Decisions
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Python provides if-elif-else statements for conditional execution, for loops for iterating over sequences, and while loops for repeated execution. Python's control flow is intuitive and readable, making it easy to implement complex logic. Understanding control flow is essential for writing any meaningful Python program.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`# Conditional statements
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

# Loops
for fruit in fruits:
    print(fruit)`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              4. Data Structures - Organizing Information
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Python offers powerful built-in data structures. Lists are ordered, mutable collections. Dictionaries store key-value pairs for fast lookups. Tuples are immutable sequences. Sets store unique, unordered elements. Each data structure has specific use cases and methods that make Python programming efficient and elegant.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`# Lists - ordered, mutable
numbers = [1, 2, 3, 4, 5]

# Dictionaries - key-value pairs
student = {"name": "Alice", "grade": "A"}

# Sets - unique elements
unique_numbers = {1, 2, 3, 4, 5}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              5. Object-Oriented Programming
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Python supports object-oriented programming (OOP) with classes and objects. You can create classes with attributes and methods, use inheritance to create new classes based on existing ones, and implement polymorphism. OOP helps you organize code into logical, reusable components, making large programs more manageable.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"I'm {self.name}, {self.age} years old"

person = Person("Alice", 25)
print(person.introduce())`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What Can You Build with Python?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Web Development
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Build powerful web applications using Django or Flask. Create REST APIs, handle databases, implement authentication, and deploy to production. Python web frameworks make it easy to build scalable web applications.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Django for full-featured web apps</li>
                <li>Flask for lightweight applications</li>
                <li>FastAPI for modern APIs</li>
                <li>Web scraping with BeautifulSoup</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Data Science & Analytics
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Python is the go-to language for data science. Analyze data, create visualizations, perform statistical analysis, and build predictive models. Libraries like Pandas, NumPy, and Matplotlib make data science accessible.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Data analysis with Pandas</li>
                <li>Scientific computing with NumPy</li>
                <li>Data visualization with Matplotlib</li>
                <li>Statistical analysis</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Machine Learning & AI
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Python dominates the machine learning and artificial intelligence space. Build neural networks, train models, and create intelligent applications. TensorFlow, PyTorch, and scikit-learn are industry standards.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Neural networks with TensorFlow</li>
                <li>Deep learning with PyTorch</li>
                <li>ML models with scikit-learn</li>
                <li>Natural language processing</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Automation & Scripting
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Automate repetitive tasks, interact with files and APIs, schedule jobs, and create productivity tools. Python's simplicity makes it perfect for automation scripts that save time and reduce errors.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>File and folder operations</li>
                <li>API interactions</li>
                <li>Web automation with Selenium</li>
                <li>Task scheduling</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Getting Started with Python - Learning Path
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 1: Install Python
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Download Python from python.org and install it on your system. Python works on Windows, macOS, and Linux. Make sure to add Python to your system PATH during installation. Verify the installation by running <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">python --version</code> in your terminal.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 2: Learn the Basics
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Start with Python fundamentals: variables, data types, operators, and basic syntax. Learn about strings, numbers, and how to perform basic operations. Practice writing simple programs to get comfortable with Python's syntax and way of thinking.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 3: Master Control Flow
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn about conditional statements (if/elif/else) and loops (for/while). Understand how to control program execution and make decisions in your code. These concepts are fundamental to any programming language.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 4: Work with Data Structures
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Master Python's built-in data structures: lists, dictionaries, tuples, and sets. Learn when to use each one and how to manipulate them effectively. Understanding data structures is crucial for writing efficient Python code.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 5: Functions and Modules
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn how to create functions, organize code into modules, and use Python's extensive standard library. Functions help you write reusable code, and modules help you organize larger projects effectively.
              </p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 6: Build Projects
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Apply what you've learned by building real projects. Start with simple programs like calculators or todo apps, then move to more complex projects like web scrapers, data analyzers, or web applications. Building projects is the best way to solidify your learning.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Python Best Practices and Tips
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Write Readable Code
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Python emphasizes code readability. Use meaningful variable names, add comments where necessary, and follow PEP 8 style guidelines. Readable code is easier to maintain and debug. Remember: code is read more often than it's written.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Use Python's Built-in Functions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Python provides many built-in functions that can save you time. Functions like len(), sum(), max(), min(), sorted(), and enumerate() are optimized and should be used instead of writing your own implementations when possible.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Leverage List Comprehensions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              List comprehensions are a Pythonic way to create lists. They're more concise and often faster than traditional loops. Learning to use list comprehensions makes your code more Pythonic and efficient.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Career Opportunities with Python
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Python skills open doors to numerous career paths. Python developers are needed in web development, data science, machine learning, automation, cybersecurity, and more. Companies ranging from startups to Fortune 500 companies hire Python developers. The demand for Python skills continues to grow as more industries adopt Python for their projects.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Common job titles include Python Developer, Web Developer, Data Scientist, Machine Learning Engineer, Automation Engineer, Backend Developer, and DevOps Engineer. Many of these positions offer competitive salaries and opportunities for growth. Learning Python is an investment in your future career.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our comprehensive Python tutorials are designed to take you from beginner to job-ready. We cover not just Python syntax, but also best practices, common patterns, and real-world applications. By completing our tutorials and building projects, you'll develop the skills needed to pursue a career in Python development.
          </p>
        </section>
      </div>

      {/* Search and Posts */}
      <CategorySearch
        posts={pythonPosts}
        category="Python"
        basePath="/python"
      />
    </div>
  );
}
