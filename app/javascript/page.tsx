import Image from "next/image";
import PostCard from "@/components/PostCard";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "JavaScript Tutorials and Guides",
  description:
    "Learn JavaScript programming language with comprehensive tutorials and guides. Master JavaScript basics, functions, arrays, DOM manipulation, and more with detailed examples.",
  keywords: [
    "javascript",
    "js",
    "javascript tutorial",
    "javascript guide",
    "learn javascript",
    "web development",
    "javascript basics",
    "javascript functions",
    "javascript arrays",
    "dom manipulation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/javascript`,
    siteName: "Programming Blog",
    title: "JavaScript Tutorials and Guides",
    description:
      "Learn JavaScript programming language with comprehensive tutorials and guides. Master JavaScript basics, functions, arrays, and more.",
    images: [
      {
        url: `${siteUrl}/assets/images/javascript.jpg`,
        width: 1200,
        height: 630,
        alt: "JavaScript Tutorials and Guides",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Tutorials and Guides",
    description:
      "Learn JavaScript programming language with comprehensive tutorials and guides.",
    images: [`${siteUrl}/assets/images/javascript.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/javascript`,
  },
};

export default function JavaScriptPage() {
  const javascriptPosts = [
    {
      title: "What is JavaScript? - Complete Introduction for Beginners",
      description:
        "Learn what JavaScript is, why it's essential for web development, and what you can build with it. Perfect guide for beginners starting their JavaScript journey.",
      image: "/assets/images/javascript.jpg",
      date: "2025-11-01",
      slug: "javascript-introduction",
    },
    {
      title: "JavaScript Basics - Variables, Types, and Syntax",
      description:
        "Learn JavaScript fundamentals including variables, data types, operators, and basic syntax. Perfect for beginners starting their JavaScript journey.",
      image: "/assets/images/javascript.jpg",
      date: "2025-11-02",
      slug: "javascript-basics",
    },
    {
      title: "JavaScript Functions - Complete Guide",
      description:
        "Learn how to create and use functions in JavaScript. Understand function syntax, parameters, return values, arrow functions, and best practices.",
      image: "/assets/images/javascript.jpg",
      date: "2025-11-03",
      slug: "javascript-functions",
    },
    {
      title: "JavaScript Arrays - Complete Guide",
      description:
        "Learn how to work with arrays in JavaScript. Understand array methods, manipulation, iteration, and best practices for working with lists of data.",
      image: "/assets/images/javascript.jpg",
      date: "2025-11-04",
      slug: "javascript-arrays",
    },
    {
      title: "JavaScript Objects - Complete Guide",
      description:
        "Learn how to work with objects in JavaScript. Understand object creation, properties, methods, and how to manipulate object data effectively.",
      image: "/assets/images/javascript.jpg",
      date: "2025-11-05",
      slug: "javascript-objects",
    },
    {
      title: "JavaScript DOM Manipulation - Complete Guide",
      description:
        "Learn how to manipulate the DOM (Document Object Model) with JavaScript. Understand how to select elements, modify content, and create interactive web pages.",
      image: "/assets/images/javascript.jpg",
      date: "2025-11-06",
      slug: "javascript-dom",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/javascript.jpg"
          alt="JavaScript"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            JavaScript
          </h1>
          <p className="text-lg text-white/90">
            {javascriptPosts.length} Posts Available
          </p>
        </div>
      </div>

      {/* Comprehensive Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What is JavaScript? The Language That Powers the Web
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            JavaScript is a high-level, interpreted programming language that was created by Brendan Eich in 1995. Initially designed to add interactivity to web pages, JavaScript has evolved into one of the most important and widely-used programming languages in the world. Today, JavaScript runs on virtually every device with a web browser, making it the universal language of the web.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Unlike many programming languages that require compilation, JavaScript is executed directly by web browsers. This means you can write JavaScript code and see it run immediately without any build process. JavaScript is also the only programming language that runs natively in browsers, making it essential for frontend web development. With Node.js, JavaScript can also run on servers, making it a full-stack language.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            JavaScript enables everything from simple form validation to complex single-page applications. It powers interactive websites, dynamic content updates, animations, games, and modern web applications. Understanding JavaScript is fundamental to becoming a web developer, as it's the foundation for popular frameworks like React, Vue, Angular, and many others.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why JavaScript is Essential for Web Development
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                The Only Browser-Native Language
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                JavaScript is the only programming language that runs directly in web browsers without plugins or additional software. Every modern browser has a JavaScript engine built-in. This universality means that if you want to create interactive web experiences, you need JavaScript. There's simply no alternative for client-side web development.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Powers Modern Web Frameworks
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All major frontend frameworks are built on JavaScript. React, Vue, Angular, Svelte, and many others are JavaScript frameworks. Learning JavaScript thoroughly makes learning these frameworks much easier. Understanding JavaScript fundamentals is essential before diving into any framework, as frameworks are essentially tools built on top of JavaScript.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Full-Stack Capabilities with Node.js
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                With Node.js, JavaScript isn't limited to browsers. You can build entire web applications using only JavaScript - both frontend and backend. This means you can use the same language, syntax, and patterns throughout your entire application. Many companies prefer this approach as it simplifies development and allows code sharing between client and server.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Massive Job Market Demand
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                JavaScript developers are consistently among the most in-demand professionals in the tech industry. According to various job market reports, JavaScript-related positions are always in the top 3 most sought-after skills. Whether you want to work as a frontend developer, full-stack developer, or specialize in a framework like React, JavaScript skills are essential.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Core JavaScript Concepts Explained
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              1. Variables and Data Types
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              JavaScript uses variables to store data. Modern JavaScript (ES6+) uses <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">let</code> and <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">const</code> for variable declarations. JavaScript is dynamically typed, meaning variables can hold different types of data. Understanding primitive types (strings, numbers, booleans) and reference types (objects, arrays) is fundamental.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
{`// Variables in JavaScript
let name = "JavaScript Developer";
const age = 25;
var city = "San Francisco"; // older syntax

// Different data types
let isActive = true;        // boolean
let count = 42;             // number
let message = "Hello";       // string
let user = { name: "John" }; // object`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              2. Functions - The Building Blocks
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Functions are reusable blocks of code that perform specific tasks. JavaScript supports multiple function syntaxes: function declarations, function expressions, arrow functions, and methods. Functions can accept parameters, return values, and be assigned to variables. Understanding functions is crucial as they're used everywhere in JavaScript.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
{`// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function (ES6+)
const greetArrow = (name) => {
  return "Hello, " + name + "!";
};

// Shorter arrow function
const add = (a, b) => a + b;`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              3. Arrays and Objects - Organizing Data
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Arrays store ordered collections of data, while objects store key-value pairs. JavaScript provides powerful methods for working with arrays (map, filter, reduce, forEach) and objects. Understanding how to manipulate these data structures is essential for building real applications. Modern JavaScript (ES6+) provides destructuring and spread operators for elegant data manipulation.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
{`// Arrays
const fruits = ["apple", "banana", "orange"];
fruits.push("grape");
const doubled = fruits.map(fruit => fruit.toUpperCase());

// Objects
const person = {
  name: "John",
  age: 30,
  city: "New York"
};

// Destructuring
const { name, age } = person;`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              4. DOM Manipulation - Interacting with Web Pages
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              The Document Object Model (DOM) represents the structure of HTML documents. JavaScript can select, modify, add, and remove HTML elements, change styles, handle events, and create dynamic content. DOM manipulation is what makes web pages interactive. Understanding how to work with the DOM is essential for frontend development.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
{`// Select elements
const button = document.querySelector('.btn');
const heading = document.getElementById('title');

// Modify content
heading.textContent = "New Title";
button.addEventListener('click', () => {
  console.log('Button clicked!');
});`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              5. Asynchronous Programming
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              JavaScript is single-threaded but handles asynchronous operations through callbacks, promises, and async/await. Understanding asynchronous programming is crucial for working with APIs, handling user input, and creating responsive applications. Modern JavaScript uses promises and async/await for cleaner asynchronous code.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
{`// Promises
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));

// Async/Await (modern approach)
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What Can You Build with JavaScript?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Interactive Websites
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Create dynamic, interactive web pages that respond to user actions. Build forms with validation, create animations, implement search functionality, and add real-time updates. JavaScript makes static HTML pages come alive.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Form validation and submission</li>
                <li>Dynamic content updates</li>
                <li>Animations and transitions</li>
                <li>Interactive UI components</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Web Applications
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Build single-page applications (SPAs) using frameworks like React, Vue, or Angular. Create complex user interfaces, manage application state, handle routing, and build production-ready web applications.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Single-page applications</li>
                <li>Progressive web apps (PWAs)</li>
                <li>Real-time applications</li>
                <li>E-commerce platforms</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Backend Services
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                With Node.js, build server-side applications, REST APIs, real-time servers, and microservices. Use Express.js or other frameworks to create robust backend services that power web and mobile applications.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>RESTful APIs</li>
                <li>Real-time servers</li>
                <li>Microservices</li>
                <li>Serverless functions</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Mobile Applications
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Use React Native or other JavaScript frameworks to build mobile applications for iOS and Android. Write JavaScript code that compiles to native mobile apps, sharing code between platforms.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Cross-platform mobile apps</li>
                <li>React Native applications</li>
                <li>Ionic apps</li>
                <li>Progressive web apps</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Modern JavaScript (ES6+) Features
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Modern JavaScript (ES6 and later) introduced many powerful features that make JavaScript development more enjoyable and efficient. Arrow functions provide concise function syntax. Template literals make string interpolation easier. Destructuring allows elegant extraction of values from arrays and objects. Spread and rest operators simplify working with arrays and function arguments.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Classes provide a cleaner syntax for object-oriented programming. Modules (import/export) enable better code organization. Promises and async/await simplify asynchronous programming. These modern features are now standard in JavaScript development, and understanding them is essential for writing modern, maintainable code.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <pre className="text-sm overflow-x-auto">
              <code className="text-gray-800 dark:text-gray-200 font-mono">
{`// ES6+ Features
// Arrow functions
const multiply = (a, b) => a * b;

// Template literals
const message = "Hello, " + name + "!";

// Destructuring
const [first, second] = array;
const {name, age} = user;

// Spread operator
const newArray = [...oldArray, newItem];

// Classes
class User {
  constructor(name) {
    this.name = name;
  }
}`}
              </code>
            </pre>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Learning Path: From Beginner to Advanced
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Beginner: JavaScript Fundamentals
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Start with the basics: variables, data types, operators, and basic syntax. Learn about functions, arrays, objects, and control flow (if/else, loops). Practice with simple programs and exercises. Focus on understanding how JavaScript works and getting comfortable with the syntax.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Intermediate: DOM and Events
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn DOM manipulation: selecting elements, modifying content, handling events, and creating interactive web pages. Build projects like todo apps, calculators, or interactive forms. Understand how JavaScript interacts with HTML and CSS to create dynamic user experiences.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Advanced: Modern JavaScript and APIs
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Master ES6+ features, asynchronous programming with promises and async/await, working with APIs, and advanced JavaScript patterns. Learn about closures, this keyword, prototypes, and design patterns. Build complex applications that interact with external services.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Expert: Frameworks and Tools
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn popular JavaScript frameworks like React, Vue, or Angular. Understand build tools, package managers, testing, and deployment. Master the JavaScript ecosystem and become proficient in building production-ready applications.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Career Opportunities with JavaScript
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            JavaScript skills open numerous career opportunities. Frontend developers use JavaScript to build user interfaces. Full-stack developers use JavaScript for both frontend and backend. JavaScript developers are needed at startups, tech companies, agencies, and enterprises. The demand for JavaScript skills continues to grow as web applications become more sophisticated.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Common job titles include Frontend Developer, Full-Stack Developer, JavaScript Developer, React Developer, Node.js Developer, and Web Developer. Many positions offer competitive salaries, remote work opportunities, and career growth potential. JavaScript is one of the most valuable skills you can learn for a career in web development.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our comprehensive JavaScript tutorials cover everything from basics to advanced topics. We provide practical examples, real-world projects, and best practices to help you become a proficient JavaScript developer. By completing our tutorials and building projects, you'll develop the skills needed to pursue a successful career in web development.
          </p>
        </section>
      </div>

      {/* Search and Posts */}
      <CategorySearch
        posts={javascriptPosts}
        category="JavaScript"
        basePath="/javascript"
      />
    </div>
  );
}
