import Image from "next/image";
import PostCard from "@/components/PostCard";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "TypeScript Tutorials and Guides",
  description:
    "Learn TypeScript programming language with comprehensive tutorials and guides. Master TypeScript types, interfaces, and how to use it with React and other frameworks.",
  keywords: [
    "typescript",
    "typescript tutorial",
    "typescript guide",
    "learn typescript",
    "typescript types",
    "typescript with react",
    "javascript types",
    "web development",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/typescript`,
    siteName: "Programming Blog",
    title: "TypeScript Tutorials and Guides",
    description:
      "Learn TypeScript programming language with comprehensive tutorials and guides.",
    images: [
      {
        url: `${siteUrl}/assets/images/typescript.png`,
        width: 1200,
        height: 630,
        alt: "TypeScript Tutorials and Guides",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeScript Tutorials and Guides",
    description:
      "Learn TypeScript programming language with comprehensive tutorials and guides.",
    images: [`${siteUrl}/assets/images/typescript.png`],
  },
  alternates: {
    canonical: `${siteUrl}/typescript`,
  },
};

export default function TypeScriptPage() {
  const typescriptPosts = [
    {
      title: "What is TypeScript? - Complete Introduction",
      description:
        "Learn what TypeScript is, why it was created, and how it improves JavaScript development. Perfect guide for JavaScript developers.",
      image: "/assets/images/typescript.png",
      date: "2025-01-28",
      slug: "typescript-introduction",
    },
    {
      title: "TypeScript Basics - Types, Variables, and Syntax",
      description:
        "Learn TypeScript fundamentals including types, type annotations, variables, and basic syntax. Perfect for JavaScript developers learning TypeScript.",
      image: "/assets/images/typescript.png",
      date: "2025-01-31",
      slug: "typescript-basics",
    },
    {
      title: "How to Install TypeScript - Step by Step Guide",
      description:
        "Complete guide on installing TypeScript. Learn how to set up TypeScript in your project, configure it, and start writing type-safe code.",
      image: "/assets/images/typescript.png",
      date: "2025-02-19",
      slug: "typescript-installation",
    },
    {
      title: "TypeScript Interfaces - Complete Guide",
      description:
        "Learn about TypeScript interfaces, how to define them, and how to use them effectively. Understand interface inheritance, optional properties, and more.",
      image: "/assets/images/typescript.png",
      date: "2025-02-19",
      slug: "typescript-interfaces",
    },
    {
      title: "TypeScript with React - Complete Guide",
      description:
        "Learn how to use TypeScript with React. Understand how to type components, props, state, hooks, and build type-safe React applications.",
      image: "/assets/images/typescript.png",
      date: "2025-02-20",
      slug: "typescript-react",
    },
    {
      title: "TypeScript Types - Advanced Type Features",
      description:
        "Learn about advanced TypeScript types including union types, intersection types, generics, conditional types, and more advanced type features.",
      image: "/assets/images/typescript.png",
      date: "2025-02-21",
      slug: "typescript-types",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/typescript.png"
          alt="TypeScript"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            TypeScript
          </h1>
          <p className="text-lg text-white/90">
            {typescriptPosts.length} Posts Available
          </p>
        </div>
      </div>

      {/* Comprehensive Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What is TypeScript? JavaScript with Superpowers
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            TypeScript is a programming language developed by Microsoft that builds on JavaScript by adding static type definitions. It's a superset of JavaScript, meaning all valid JavaScript code is also valid TypeScript code. TypeScript compiles to plain JavaScript, so it can run anywhere JavaScript runs - in browsers, Node.js, or any JavaScript runtime.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The main difference between TypeScript and JavaScript is that TypeScript adds optional static typing. This means you can specify the types of variables, function parameters, and return values. The TypeScript compiler checks your code for type errors before it runs, catching bugs early in the development process. This makes TypeScript especially valuable for large codebases and team projects.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            TypeScript has gained massive adoption in the JavaScript ecosystem. Major frameworks like Angular use TypeScript by default, and React, Vue, and many other libraries have excellent TypeScript support. Many companies now require TypeScript knowledge for JavaScript developer positions, making it an essential skill for modern web development.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Use TypeScript? Key Advantages
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Catch Errors Before Runtime
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                TypeScript's type system catches errors during development, not when your code is running in production. If you try to pass a string to a function expecting a number, TypeScript will warn you immediately. This prevents many common bugs and saves debugging time. Studies show that TypeScript can catch 15% of common JavaScript bugs before runtime.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Enhanced IDE Experience
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                TypeScript dramatically improves your development experience. IDEs like VS Code provide intelligent autocomplete, showing you available properties and methods as you type. You get better refactoring tools, "go to definition" functionality, and inline documentation. This makes coding faster and less error-prone.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Self-Documenting Code
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Type annotations serve as inline documentation. When you see a function signature with types, you immediately understand what parameters it expects and what it returns. This makes code easier to read and maintain, especially when working in teams or returning to old code. Types document your code's intent.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Industry Standard and Career Growth
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                TypeScript is becoming the standard for large-scale JavaScript projects. Major companies like Microsoft, Google, and many startups use TypeScript. Learning TypeScript opens up more job opportunities and makes you a more valuable developer. It's one of the fastest-growing programming languages and a highly sought-after skill.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Core TypeScript Concepts Explained
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              1. Type Annotations - Adding Types to JavaScript
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              TypeScript allows you to explicitly specify types for variables, function parameters, and return values. Basic types include string, number, boolean, array, object, and more. You can also create custom types and interfaces. Type annotations help catch type-related errors and make your code self-documenting.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Type annotations
let name: string = "TypeScript";
let age: number = 5;
let isActive: boolean = true;

// Function with types
function greet(name: string): string {
  return "Hello, " + name + "!";
}

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              2. Interfaces - Defining Object Shapes
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Interfaces define the shape of objects. They specify what properties an object should have and their types. Interfaces are powerful for ensuring objects conform to expected structures. You can make properties optional, readonly, or extend other interfaces. Interfaces are compile-time only and don't exist in the compiled JavaScript.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Interface definition
interface User {
  name: string;
  age: number;
  email?: string;  // optional property
}

// Using the interface
const user: User = {
  name: "John",
  age: 30
};

// Function using interface
function createUser(user: User): User {
  return user;
}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              3. Union and Intersection Types
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Union types allow a value to be one of several types, using the pipe (|) operator. Intersection types combine multiple types into one, using the ampersand (&) operator. These advanced type features give you flexibility while maintaining type safety. They're especially useful for creating flexible APIs and handling different data shapes.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Union type
let id: string | number;
id = "123";  // OK
id = 123;    // OK

// Intersection type
interface A {
  a: string;
}
interface B {
  b: number;
}
type C = A & B;  // has both a and b`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              4. Generics - Reusable Type Components
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Generics allow you to create reusable components that work with multiple types. Instead of writing separate functions for each type, you write one function that works with any type. Generics are powerful for creating flexible, reusable code while maintaining type safety. They're used extensively in libraries and frameworks.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let output1 = identity<string>("hello");
let output2 = identity<number>(42);

// Generic interface
interface Container<T> {
  value: T;
}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              5. TypeScript with React
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              TypeScript works excellently with React. You can type component props, state, hooks, and event handlers. TypeScript helps catch prop errors, ensures correct hook usage, and provides better autocomplete for React APIs. Many React projects now use TypeScript by default for better developer experience and fewer bugs.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Typed React component
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            TypeScript vs JavaScript: When to Use Each
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Use TypeScript when building large applications, working in teams, or when you want better tooling and error detection. TypeScript is ideal for complex projects where type safety prevents bugs and makes code more maintainable. Many modern frameworks and libraries are written in TypeScript or have excellent TypeScript support.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            JavaScript is still fine for small projects, quick prototypes, or when you prefer the flexibility of dynamic typing. However, even small projects can benefit from TypeScript's improved developer experience. The good news is that you can gradually adopt TypeScript - you can add types incrementally to existing JavaScript projects.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Gradual Adoption
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              One of TypeScript's best features is that you can adopt it gradually. You can rename .js files to .ts and start adding types incrementally. TypeScript's type checking can be configured to be strict or lenient, allowing you to migrate at your own pace. This makes it easy to introduce TypeScript into existing projects.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Learning Path: From JavaScript to TypeScript
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Prerequisite: Know JavaScript
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Before learning TypeScript, you should have a solid understanding of JavaScript. TypeScript is JavaScript with types, so you need to know JavaScript fundamentals: variables, functions, objects, arrays, and ES6+ features. Once you understand JavaScript, learning TypeScript is about adding type annotations.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Start with Basic Types
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Begin by learning basic types: string, number, boolean, array, object, and any. Learn how to add type annotations to variables and function parameters. Practice writing typed functions and see how TypeScript catches type errors. This foundation is essential for everything else.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Master Interfaces and Types
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn how to define interfaces for objects, use type aliases, understand optional and readonly properties, and extend interfaces. These concepts are crucial for typing complex data structures and creating maintainable code. Practice by typing real-world data structures.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Advanced Features and Frameworks
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn advanced features like generics, union types, conditional types, and utility types. Then learn how to use TypeScript with React, Vue, or other frameworks. Understand how to type hooks, components, and framework-specific features. Build projects using TypeScript to solidify your knowledge.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Career Benefits of Learning TypeScript
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            TypeScript skills are increasingly in demand. Many companies specifically look for TypeScript experience when hiring JavaScript developers. TypeScript knowledge demonstrates that you understand modern development practices and can work on large-scale projects. It's a skill that sets you apart from other developers.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Learning TypeScript makes you a better JavaScript developer. Understanding types helps you write better JavaScript code even when not using TypeScript. The discipline of thinking about types improves your code design and helps you catch potential issues earlier. Many developers find that TypeScript makes them more productive.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our TypeScript tutorials cover everything from basic types to advanced features. We show you how to use TypeScript with React and other frameworks, provide practical examples, and help you understand when and how to use TypeScript effectively. By completing our tutorials, you'll be ready to use TypeScript in real projects and advance your career.
          </p>
        </section>
      </div>

      {/* Search and Posts */}
      <CategorySearch
        posts={typescriptPosts}
        category="TypeScript"
        basePath="/typescript"
      />
    </div>
  );
}
