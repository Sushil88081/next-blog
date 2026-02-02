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

      {/* Valuable Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Learn TypeScript - JavaScript with Type Safety
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            TypeScript is JavaScript with static type checking. Developed by Microsoft, TypeScript 
            adds type annotations to JavaScript, making your code more reliable, maintainable, and 
            easier to debug. It's becoming the standard for large-scale JavaScript projects.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our TypeScript tutorials will teach you how to add type safety to your JavaScript code. 
            You'll learn about types, interfaces, generics, and how to use TypeScript with React and 
            other frameworks. TypeScript helps catch errors before they reach production and improves 
            your development experience with better IDE support.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Benefits of TypeScript
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                🛡️ Type Safety
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Catch errors at compile time, not runtime. TypeScript helps prevent bugs before your 
                code runs, saving time and reducing production issues.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                💡 Better IDE Support
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get autocomplete, refactoring tools, and intelligent code navigation. Your IDE 
                understands your code better with TypeScript.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                📖 Self-Documenting Code
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Types serve as documentation. Other developers (and future you) can understand your 
                code more easily with type annotations.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                🏢 Industry Standard
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Many companies require TypeScript for new projects. Learning it opens up more job 
                opportunities and makes you a more valuable developer.
              </p>
            </div>
          </div>
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
