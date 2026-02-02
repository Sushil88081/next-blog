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

      {/* Valuable Content Section for AdSense Compliance */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Master JavaScript - The Language of the Web
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            JavaScript is the programming language that powers the modern web. It's the only language 
            that runs natively in browsers, making it essential for frontend development. JavaScript 
            enables interactive websites, dynamic content, and modern web applications.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our JavaScript tutorials cover everything from basic syntax to advanced concepts. You'll 
            learn about variables, functions, arrays, objects, DOM manipulation, asynchronous programming, 
            and ES6+ features. Whether you're building simple interactive pages or complex web applications, 
            JavaScript is the foundation you need.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What Makes JavaScript Essential?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                🌐 Universal Language
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                JavaScript runs on every device with a web browser. Learn once, use everywhere - 
                web, mobile, desktop, and even servers with Node.js.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                ⚡ Interactive Web Pages
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                JavaScript makes websites interactive. Handle user events, update content dynamically, 
                and create engaging user experiences.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                🚀 Modern Frameworks
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                JavaScript powers popular frameworks like React, Vue, and Angular. Master JavaScript 
                first, then easily learn any framework.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                💰 Career Opportunities
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                JavaScript developers are in constant demand. It's one of the most sought-after skills 
                in the tech industry.
              </p>
            </div>
          </div>
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
