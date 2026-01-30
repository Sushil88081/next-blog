import Image from "next/image";
import PostCard from "@/components/PostCard";
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {typescriptPosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            image={post.image}
            date={post.date}
            slug={post.slug}
            basePath="/typescript"
          />
        ))}
      </div>
    </div>
  );
}
