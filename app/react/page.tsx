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

      {/* Valuable Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Learn React - The Most Popular JavaScript Library
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            React is a powerful JavaScript library for building user interfaces, developed by Facebook.
            It's the most popular frontend framework in the world, used by companies like Facebook,
            Netflix, Airbnb, and thousands of others. React makes it easy to build interactive,
            component-based web applications.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our comprehensive React tutorials cover everything from the basics to advanced concepts.
            You'll learn about components, props, state management, hooks, routing, and much more.
            Each tutorial includes practical examples and real-world use cases to help you master React
            development.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                React Fundamentals
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Start with React basics: components, JSX, props, and state. Learn how to build your
                first React application and understand the core concepts that make React powerful.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                React Hooks
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Master modern React with hooks like useState, useEffect, useContext, and custom hooks.
                Learn how to manage state and side effects in functional components.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Advanced Concepts
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Dive into advanced topics like Context API, error boundaries, performance optimization,
                and building production-ready React applications.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Real Projects
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Build complete projects like Todo apps to apply everything you've learned. Practice
                makes perfect, and our project tutorials give you hands-on experience.
              </p>
            </div>
          </div>
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
