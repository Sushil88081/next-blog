import Image from "next/image";
import PostCard from "@/components/PostCard";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "React Tutorials and Guides",
  description:
    "Learn React with comprehensive tutorials and guides. Master React hooks, components, state management, props, JSX, and more with detailed examples and best practices for building modern user interfaces.",
  keywords: [
    "react",
    "reactjs",
    "react tutorial",
    "react guide",
    "react hooks",
    "react components",
    "react state",
    "react props",
    "jsx",
    "reactjs tutorial",
    "learn react",
    "react examples",
    "react best practices",
    "frontend development",
    "javascript library",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/react`,
    siteName: "Programming Blog",
    title: "React Tutorials and Guides",
    description:
      "Learn React with comprehensive tutorials and guides. Master React hooks, components, state management, and more.",
    images: [
      {
        url: `${siteUrl}/assets/images/react.jpg`,
        width: 1200,
        height: 630,
        alt: "React Tutorials and Guides",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Tutorials and Guides",
    description:
      "Learn React with comprehensive tutorials and guides. Master React hooks, components, state management, and more.",
    images: [`${siteUrl}/assets/images/react.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/react`,
  },
};

export default function ReactPage() {
  // Posts arranged in logical learning sequence - from basics to advanced
  const reactPosts = [
    // === BASICS - Start Here ===
    {
      title: "React Introduction",
      description:
        "Discover what React.js is and why it is worth learning. Explore React basics, features, and its advantages in frontend development.",
      image: "/assets/images/react.jpg",
      date: "2026-01-09",
      slug: "react-introduction",
    },
    {
      title: "How to Install and Setup React - Step by Step Guide",
      description:
        "Complete guide on installing React and setting up your first React project. Learn different methods to get started with React development.",
      image: "/assets/images/react.jpg",
      date: "2026-01-10",
      slug: "react-installation-setup",
    },
    {
      title: "JSX in React",
      description:
        "JSX is a syntax extension for JavaScript that allows to write HTML-like code in your JavaScript files.",
      image: "/assets/images/react.jpg",
      date: "2026-01-11",
      slug: "jsx-in-react",
    },
    {
      title: "Components in React",
      description: "Learn how to create and use React components. Understand component-based architecture and reusable UI elements.",
      image: "/assets/images/react.jpg",
      date: "2026-01-12",
      slug: "react-components",
    },
    {
      title: "React Fragments - Clean JSX Without Extra Divs",
      description: "Learn about React Fragments to avoid unnecessary wrapper divs. Understand when and how to use fragments in your React components.",
      image: "/assets/images/react.jpg",
      date: "2026-01-13",
      slug: "react-fragments",
    },
    {
      title: "What is Props in React",
      description: "How to use props in React, complete guide with examples. Learn how to pass data between components.",
      image: "/assets/images/react.jpg",
      date: "2026-01-14",
      slug: "react-props",
    },
    {
      title: "What is State in React",
      description: "How to use state in React, complete guide with examples. Understand React state management.",
      image: "/assets/images/react.jpg",
      date: "2026-01-15",
      slug: "react-state",
    },
    {
      title: "useState Hook - The Beginner's Guide",
      description: "Learn useState hook step by step. Perfect guide for beginners to understand React state management with simple examples.",
      image: "/assets/images/react.jpg",
      date: "2026-01-16",
      slug: "react-usestate-basics",
    },
    {
      title: "State vs Props",
      description: "Understand the difference between state and props in React. Learn when to use each one.",
      image: "/assets/images/react.jpg",
      date: "2026-01-17",
      slug: "react-state-props",
    },
    // === INTERACTIVE FEATURES ===
    {
      title: "React Events - Event Handling",
      description: "Learn how to handle events in React. Complete guide with examples for click, change, and other events.",
      image: "/assets/images/react.jpg",
      date: "2026-01-18",
      slug: "react-events",
    },
    {
      title: "Conditional Rendering in React",
      description: "Master conditional rendering in React. Learn different ways to show or hide elements based on conditions.",
      image: "/assets/images/react.jpg",
      date: "2026-01-19",
      slug: "react-conditional-rendering",
    },
    {
      title: "Lists and Keys in React",
      description: "Learn how to render lists in React and why keys are important. Complete guide with examples.",
      image: "/assets/images/react.jpg",
      date: "2026-01-20",
      slug: "react-lists-keys",
    },
    {
      title: "React Forms - Form Handling",
      description: "Learn how to handle forms in React. Understand controlled components, form validation, and form submission.",
      image: "/assets/images/react.jpg",
      date: "2026-01-21",
      slug: "react-forms",
    },
    {
      title: "React Hook Form - Complete Guide with Examples",
      description: "Master React Hook Form library for building performant forms with minimal re-renders. Learn validation, error handling, and real-world examples with diagrams.",
      image: "/assets/images/react.jpg",
      date: "2026-02-02",
      slug: "react-hook-form",
    },
    {
      title: "Styling React Components - Complete Guide",
      description: "Learn different ways to style React components. Understand inline styles, CSS modules, styled-components, and Tailwind CSS.",
      image: "/assets/images/react.jpg",
      date: "2026-01-23",
      slug: "react-styling-guide",
    },
    // === ADVANCED HOOKS ===
    {
      title: "React Component Lifecycle - Understanding Component Phases",
      description: "Learn about React component lifecycle. Understand mounting, updating, and unmounting phases in functional components with hooks.",
      image: "/assets/images/react.jpg",
      date: "2026-01-24",
      slug: "react-lifecycle-explained",
    },
    {
      title: "useEffect Hook Explained Simply",
      description: "Learn useEffect hook in React with simple examples. Understand how to use useEffect for side effects like API calls and data fetching.",
      image: "/assets/images/react.jpg",
      date: "2026-01-25",
      slug: "react-useeffect-explained",
    },
    {
      title: "React Hooks - Complete Guide",
      description: "What are React Hooks? Detailed information about useState, useEffect, useContext and other hooks.",
      image: "/assets/images/react.jpg",
      date: "2026-01-26",
      slug: "react-hooks",
    },
    {
      title: "Creating Custom Hooks in React",
      description: "Learn how to create your own custom React hooks. Reuse logic across components with simple examples and best practices.",
      image: "/assets/images/react.jpg",
      date: "2026-01-27",
      slug: "react-custom-hooks",
    },
    {
      title: "React Refs - Accessing DOM Elements Directly",
      description: "Learn about React refs to access DOM elements directly. Understand useRef hook and when to use refs in React components.",
      image: "/assets/images/react.jpg",
      date: "2026-01-28",
      slug: "react-refs-explained",
    },
    // === STATE MANAGEMENT & NAVIGATION ===
    {
      title: "React Context API",
      description: "Learn React Context API for sharing data across components without prop drilling. Simple examples included.",
      image: "/assets/images/react.jpg",
      date: "2026-01-29",
      slug: "react-context-api",
    },
    {
      title: "React Router - Navigation Made Easy",
      description: "Learn React Router to add navigation to your React app. Step by step guide with examples for routing between pages.",
      image: "/assets/images/react.jpg",
      date: "2026-01-30",
      slug: "react-router-basics",
    },
    // === ADVANCED TOPICS ===
    {
      title: "Error Handling in React - Complete Guide",
      description: "Learn how to handle errors in React applications. Understand Error Boundaries, try-catch, and best practices for error handling.",
      image: "/assets/images/react.jpg",
      date: "2026-01-31",
      slug: "react-error-handling",
    },
    // === OPTIMIZATION ===
    {
      title: "React Performance Tips for Beginners",
      description: "Learn simple ways to make your React app faster. Easy performance optimization tips for React beginners.",
      image: "/assets/images/react.jpg",
      date: "2026-02-01",
      slug: "react-performance-tips",
    },
    // === PROJECTS ===
    {
      title: "Build a Todo App in React - Complete Project Tutorial",
      description: "Learn React by building a complete Todo application. This hands-on tutorial covers useState, components, props, events, and more React concepts.",
      image: "/assets/images/react.jpg",
      date: "2026-02-02",
      slug: "react-todo-project",
    },
    {
      title: "React Redux and Redux Toolkit - Complete Guide",
      description: "Learn React Redux and Redux Toolkit for state management in React applications. Complete guide with examples and best practices.",
      image: "/assets/images/react.jpg",
      date: "2026-02-03",
      slug: "react-redux-redux-toolkit",
    },

    {
      title: "React Redux and createEntityAdapter - Complete Guide",
      description: "Learn React Redux and createEntityAdapter for state management in React applications. Complete guide with examples and best practices.",
      image: "/assets/images/react.jpg",
      date: "2026-02-03",
      slug: "react-redux-entity-adapter",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* React Header with Image */}
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/react.jpg"
          alt="React"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            React
          </h1>
          <p className="text-lg text-white/90">
            {reactPosts.length} Posts Available
          </p>
        </div>
      </div>

      {/* Comprehensive Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What is React? A Complete Introduction to React.js
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            React is an open-source JavaScript library developed by Facebook (now Meta) for building user interfaces, particularly web applications. Since its release in 2013, React has become the most popular frontend framework in the world, powering millions of websites and applications including Facebook, Instagram, Netflix, Airbnb, WhatsApp Web, and many others.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            React revolutionized frontend development by introducing a component-based architecture that allows developers to build complex user interfaces from small, reusable pieces of code. Instead of manipulating the DOM directly, React uses a virtual DOM to efficiently update only the parts of the page that have changed, resulting in faster and more responsive applications.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            One of React's key features is its declarative approach to building UIs. You describe what the UI should look like, and React handles the how of rendering it efficiently. This makes code more predictable, easier to debug, and simpler to understand compared to imperative approaches.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Learn React? Key Benefits and Advantages
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                High Demand in the Job Market
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                React is one of the most in-demand skills in the web development industry. Companies of all sizes, from startups to Fortune 500 companies, are actively hiring React developers. Learning React significantly increases your job prospects and earning potential in the tech industry.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Component Reusability
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                React's component-based architecture allows you to build reusable UI components. Once you create a component, you can use it anywhere in your application or even in other projects. This saves development time and ensures consistency across your application.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Large Ecosystem and Community
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                React has a massive ecosystem with thousands of libraries, tools, and resources. Whether you need routing (React Router), state management (Redux), styling (Styled Components), or testing (Jest), there's a well-maintained library available. The large community means you'll find help, tutorials, and solutions to almost any problem.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Performance Optimization
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                React's virtual DOM and efficient diffing algorithm ensure that only the necessary parts of your UI are updated when data changes. This results in faster rendering and better user experience, especially in complex applications with frequent updates.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Core React Concepts Explained
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              1. Components - The Building Blocks
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Components are the heart of React. They are reusable pieces of code that return JSX (JavaScript XML) to describe what should appear on the screen. Think of components as custom HTML elements that can have their own logic and state.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              There are two types of components: functional components (using functions) and class components (using ES6 classes). Modern React development primarily uses functional components with hooks, which is simpler and more efficient.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="React Developer" />`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              2. JSX - JavaScript Syntax Extension
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              JSX allows you to write HTML-like code directly in your JavaScript files. It's a syntax extension that makes React code more readable and intuitive. JSX gets transpiled to regular JavaScript function calls that React understands.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              JSX looks like HTML but has some key differences: you must use className instead of class, and you can embed JavaScript expressions using curly braces. JSX also requires a single parent element or a React Fragment.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`const element = (
  <div className="container">
    <h1>Welcome to React</h1>
    <p>Today is {new Date().toLocaleDateString()}</p>
  </div>
);`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              3. Props - Passing Data to Components
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Props (short for properties) are how you pass data from parent components to child components. Props are read-only and cannot be modified by the child component. They allow components to be dynamic and reusable with different data.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              You can pass any JavaScript value as props: strings, numbers, objects, arrays, functions, and even other React components. Props make components flexible and reusable across your application.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`function UserCard({ name, age, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Usage
<UserCard name="John Doe" age={28} email="john@example.com" />`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              4. State - Managing Component Data
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              State allows components to create and manage their own data that can change over time. When state changes, React automatically re-renders the component to reflect the new data. State is what makes React components interactive and dynamic.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              In functional components, you use the useState hook to add state. The useState hook returns an array with two elements: the current state value and a function to update it. State updates trigger re-renders, which is how React keeps the UI in sync with your data.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              5. Hooks - Modern React Features
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Hooks are special functions that let you "hook into" React features from functional components. They were introduced in React 16.8 and revolutionized how developers write React code. Hooks allow you to use state, lifecycle methods, and other React features without writing class components.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Some essential hooks include useState for state management, useEffect for side effects and lifecycle operations, useContext for accessing context values, and useRef for accessing DOM elements or storing mutable values. You can also create custom hooks to share logic between components.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return <div>{data ? data.message : 'Loading...'}</div>;
}`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Getting Started with React - Step by Step Guide
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Step 1: Prerequisites
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Before learning React, you should have a solid understanding of HTML, CSS, and JavaScript (ES6+). Familiarity with concepts like arrow functions, destructuring, template literals, and modules will make learning React much easier. You should also understand how to use the command line and have Node.js installed on your computer.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Step 2: Setting Up Your First React Project
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              The easiest way to create a new React project is using Create React App, which sets up a modern development environment with all the necessary tools configured. Simply run <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">npx create-react-app my-app</code> in your terminal, and you'll have a fully functional React application ready to go.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Create React App includes webpack, Babel, ESLint, and other tools configured out of the box. It also provides hot reloading, so your changes appear instantly in the browser without manual refresh. This makes development much faster and more enjoyable.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Step 3: Understanding the Project Structure
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              A typical React project created with Create React App has a specific structure. The <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">src</code> folder contains your source code, including your React components. The <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">public</code> folder contains static assets like images and the HTML template. Understanding this structure helps you organize your code effectively.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Step 4: Building Your First Component
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Start by creating a simple component. Open the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">App.js</code> file and modify it to create your first custom component. Practice by building components like buttons, cards, or simple forms. This hands-on experience is crucial for understanding how React works.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Common React Patterns and Best Practices
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Component Composition
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Instead of creating large, monolithic components, break your UI into smaller, focused components. Each component should have a single responsibility. This makes your code more maintainable, testable, and reusable. Compose these smaller components together to build complex UIs.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Lifting State Up
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              When multiple components need to share the same data, lift the state up to their closest common ancestor. This parent component manages the shared state and passes it down as props to child components. This pattern ensures a single source of truth and makes data flow predictable.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Conditional Rendering
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              React allows you to conditionally render components or elements based on certain conditions. You can use JavaScript operators like the ternary operator or logical AND operator to show or hide content. This is essential for building dynamic, interactive user interfaces.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Lists and Keys
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              When rendering lists of items, React requires you to provide a unique key prop for each item. Keys help React identify which items have changed, been added, or removed, enabling efficient updates to the DOM. Always use stable, unique identifiers as keys, preferably IDs from your data.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What You'll Learn in Our React Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                React Fundamentals
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Start with React basics: components, JSX, props, and state. Learn how to build your first React application and understand the core concepts that make React powerful. We cover everything from installation to building your first interactive component.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Understanding React components</li>
                <li>Working with JSX syntax</li>
                <li>Props and prop types</li>
                <li>Component state management</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                React Hooks
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Master modern React with hooks like useState, useEffect, useContext, and custom hooks. Learn how to manage state and side effects in functional components. Hooks are the modern way to write React code and are essential for any React developer.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>useState for state management</li>
                <li>useEffect for side effects</li>
                <li>Custom hooks creation</li>
                <li>Hook best practices</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Advanced Concepts
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Dive into advanced topics like Context API for global state, error boundaries for error handling, performance optimization techniques, and building production-ready React applications. Learn industry best practices and patterns used by professional developers.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Context API and state management</li>
                <li>Error boundaries</li>
                <li>Performance optimization</li>
                <li>Production deployment</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Real-World Projects
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Build complete projects like Todo apps, weather applications, and more to apply everything you've learned. Practice makes perfect, and our project tutorials give you hands-on experience building real applications from scratch.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Todo application project</li>
                <li>Form handling projects</li>
                <li>API integration examples</li>
                <li>Full-stack React apps</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            React Ecosystem and Tools
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            React is just the beginning. The React ecosystem includes powerful tools and libraries that extend React's capabilities. React Router enables client-side routing, allowing you to build single-page applications with multiple views. Redux and Context API provide solutions for managing complex application state.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For styling, you can use CSS modules, styled-components, Tailwind CSS, or traditional CSS. Testing libraries like Jest and React Testing Library help ensure your components work correctly. Build tools like Webpack and Vite optimize and bundle your code for production.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Understanding these tools and when to use them is crucial for becoming a proficient React developer. Our tutorials cover the most important tools in the React ecosystem, helping you build modern, professional applications.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Learning Path: From Beginner to Advanced
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Beginner Level
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Start with React basics: understanding what React is, setting up your development environment, learning JSX syntax, creating your first components, and working with props and state. Focus on building simple, interactive components and understanding React's core concepts.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Intermediate Level
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Move on to React hooks, event handling, conditional rendering, lists and keys, form handling, and component lifecycle. Build more complex components and learn how to manage state effectively. Start working with external APIs and understanding how to structure larger applications.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Advanced Level
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Master advanced topics like Context API, custom hooks, performance optimization, error boundaries, routing, and state management with Redux. Learn best practices, testing, and how to build production-ready applications. Understand advanced patterns and architectural decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Tips for Learning React Effectively
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Practice Regularly
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The best way to learn React is by building projects. Don't just read tutorials—actually write code. Start with small projects and gradually increase complexity. Build a todo app, a weather app, a blog, or any project that interests you. Each project teaches you something new.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Understand the "Why" Behind Concepts
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Don't just memorize syntax—understand why React works the way it does. Learn about the virtual DOM, why React uses keys, why state updates are asynchronous, and how React's reconciliation algorithm works. Understanding these concepts makes you a better React developer.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Read Official Documentation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The React documentation is excellent and should be your primary reference. It's comprehensive, well-written, and includes examples. Bookmark it and refer to it regularly. The official docs are always up-to-date and reflect React best practices.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Common Mistakes to Avoid When Learning React
          </h2>
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Mutating State Directly
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Never mutate state directly. Always use the setter function provided by useState or useReducer. Mutating state directly won't trigger re-renders and can lead to bugs. Always create new objects or arrays when updating state.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Forgetting Keys in Lists
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Always provide unique keys when rendering lists. Using array indices as keys is acceptable only when the list is static and won't be reordered. For dynamic lists, use stable, unique identifiers from your data.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Not Understanding Component Lifecycle
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Understanding when components mount, update, and unmount is crucial. This helps you use useEffect correctly and avoid memory leaks. Learn about cleanup functions and dependency arrays in useEffect.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Overusing State
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Not everything needs to be in state. If a value can be computed from props or other state, compute it instead of storing it. Only use state for values that change over time and affect what's rendered.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Career Opportunities with React Skills
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Learning React opens up numerous career opportunities. React developers are in high demand across various industries. You can work as a frontend developer, full-stack developer, UI/UX developer, or even start your own freelance business. Many companies are looking for React developers, from startups to large tech companies.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            React skills are also valuable for building your own projects and startups. With React, you can build web applications, mobile apps (using React Native), desktop applications (using Electron), and even static websites. The possibilities are endless.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our comprehensive React tutorials are designed to take you from beginner to job-ready. We cover not just React itself, but also the tools, patterns, and best practices used by professional developers. By the end of our tutorials, you'll have the skills and knowledge needed to build real-world applications and pursue a career in React development.
          </p>
        </section>
      </div>

      {/* Search and Posts */}
      <CategorySearch
        posts={reactPosts}
        category="React"
        basePath="/react"
      />
    </div>
  );
}
