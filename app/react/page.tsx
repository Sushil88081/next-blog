import Image from "next/image";
import PostCard from "@/components/PostCard";
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
  const reactPosts = [
    {
      title: "React Introduction",
      description:
        "Discover what React.js is and why it is worth learning. Explore React basics, features, and its advantages in frontend development.",
      image: "/assets/images/react.jpg",
      date: "2025-12-20",
      slug: "react-introduction",
    },
    {
      title: "JSX in React",
      description:
        "JSX is a syntax extension for JavaScript that allows to write HTML-like code in your JavaScript files.",
      image: "/assets/images/react.jpg",
      date: "2025-12-21",
      slug: "jsx-in-react",
    },
    {
      title: "Components in React",
      description: "Learn how to create and use React components. Understand component-based architecture and reusable UI elements.",
      image: "/assets/images/react.jpg",
      date: "2025-12-22",
      slug: "react-components",
    },
    {
      title: "Conditional Rendering in React",
      description: "Master conditional rendering in React. Learn different ways to show or hide elements based on conditions.",
      image: "/assets/images/react.jpg",
      date: "2025-12-23",
      slug: "react-conditional-rendering",
    },
    {
      title: "What is Props in React",
      description: "How to use props in React, complete guide with examples. Learn how to pass data between components.",
      image: "/assets/images/react.jpg",
      date: "2025-01-30",
      slug: "react-props",
    },
    {
      title: "What is State in React",
      description: "How to use state in React, complete guide with examples. Understand React state management.",
      image: "/assets/images/react.jpg",
      date: "2025-12-20",
      slug: "react-state",
    },
    {
      title: "useState Hook - The Beginner's Guide",
      description: "Learn useState hook step by step. Perfect guide for beginners to understand React state management with simple examples.",
      image: "/assets/images/react.jpg",
      date: "2025-01-19",
      slug: "react-usestate-basics",
    },
    {
      title: "useEffect Hook Explained Simply",
      description: "Learn useEffect hook in React with simple examples. Understand how to use useEffect for side effects like API calls and data fetching.",
      image: "/assets/images/react.jpg",
      date: "2025-01-18",
      slug: "react-useeffect-explained",
    },
    {
      title: "React Hooks - Complete Guide",
      description: "What are React Hooks? Detailed information about useState, useEffect, useContext and other hooks.",
      image: "/assets/images/react.jpg",
      date: "2025-01-25",
      slug: "react-hooks",
    },
    {
      title: "Creating Custom Hooks in React",
      description: "Learn how to create your own custom React hooks. Reuse logic across components with simple examples and best practices.",
      image: "/assets/images/react.jpg",
      date: "2025-01-21",
      slug: "react-custom-hooks",
    },
    {
      title: "State vs Props",
      description: "Understand the difference between state and props in React. Learn when to use each one.",
      image: "/assets/images/react.jpg",
      date: "2025-12-20",
      slug: "react-state-props",
    },
    {
      title: "React Events - Event Handling",
      description: "Learn how to handle events in React. Complete guide with examples for click, change, and other events.",
      image: "/assets/images/react.jpg",
      date: "2025-01-15",
      slug: "react-events",
    },
    {
      title: "React Forms - Form Handling",
      description: "Learn how to handle forms in React. Understand controlled components, form validation, and form submission.",
      image: "/assets/images/react.jpg",
      date: "2025-01-16",
      slug: "react-forms",
    },
    {
      title: "React Context API",
      description: "Learn React Context API for sharing data across components without prop drilling. Simple examples included.",
      image: "/assets/images/react.jpg",
      date: "2025-01-17",
      slug: "react-context-api",
    },
    {
      title: "Lists and Keys in React",
      description: "Learn how to render lists in React and why keys are important. Complete guide with examples.",
      image: "/assets/images/react.jpg",
      date: "2025-01-14",
      slug: "react-lists-keys",
    },
    {
      title: "React Router - Navigation Made Easy",
      description: "Learn React Router to add navigation to your React app. Step by step guide with examples for routing between pages.",
      image: "/assets/images/react.jpg",
      date: "2025-01-20",
      slug: "react-router-basics",
    },
    {
      title: "React Performance Tips for Beginners",
      description: "Learn simple ways to make your React app faster. Easy performance optimization tips for React beginners.",
      image: "/assets/images/react.jpg",
      date: "2025-01-22",
      slug: "react-performance-tips",
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

      {/* React Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reactPosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            image={post.image}
            date={post.date}
            slug={post.slug}
            basePath="/react"
          />
        ))}
      </div>
    </div>
  );
}
