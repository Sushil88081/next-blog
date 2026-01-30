import Image from "next/image";
import PostCard from "@/components/PostCard";
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pythonPosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            image={post.image}
            date={post.date}
            slug={post.slug}
            basePath="/python"
          />
        ))}
      </div>
    </div>
  );
}
