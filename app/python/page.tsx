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

      {/* Valuable Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Learn Python - The Perfect Language for Beginners
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Python is one of the most popular and versatile programming languages in the world. Known 
            for its simple, readable syntax, Python is an excellent choice for beginners and is widely 
            used in web development, data science, artificial intelligence, automation, and more.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our Python tutorials are designed to take you from complete beginner to confident Python 
            developer. You'll learn Python fundamentals, data structures, object-oriented programming, 
            and how to build real-world applications. Each tutorial includes code examples and exercises 
            to reinforce your learning.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Learn Python?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                🎯 Beginner-Friendly
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Python's simple syntax makes it easy to learn. You can focus on programming concepts 
                rather than complex syntax rules.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                💼 High Demand
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Python developers are in high demand across industries including web development, 
                data science, AI, and automation.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                🔧 Versatile
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Use Python for web apps (Django, Flask), data analysis, machine learning, automation, 
                and much more.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                📚 Rich Ecosystem
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Python has an extensive library ecosystem with packages for almost any task you can imagine.
              </p>
            </div>
          </div>
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
