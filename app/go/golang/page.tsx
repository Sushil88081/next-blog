import Image from "next/image";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "Go (Golang) Tutorials and Guides",
  description:
    "Learn Go programming language with comprehensive tutorials and guides. Master Go basics, functions, concurrency, and more with detailed examples and best practices.",
  keywords: [
    "golang",
    "go",
    "go programming",
    "golang tutorial",
    "go lang",
    "go language",
    "backend development",
    "concurrency",
    "go examples",
    "learn golang",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/go/golang`,
    siteName: "Programming Blog",
    title: "Go (Golang) Tutorials and Guides",
    description:
      "Learn Go programming language with comprehensive tutorials and guides. Master Go basics, functions, concurrency, and more.",
    images: [
      {
        url: `${siteUrl}/assets/images/golang.jpg`,
        width: 1200,
        height: 630,
        alt: "Go (Golang) Tutorials and Guides",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Go (Golang) Tutorials and Guides",
    description:
      "Learn Go programming language with comprehensive tutorials and guides.",
    images: [`${siteUrl}/assets/images/golang.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/go/golang`,
  },
};

export default function GoPage() {
  const goPosts = [
    {
      title: "What is Go (Golang)? - Complete Introduction",
      description:
        "Learn what Go programming language is, why it was created, and why it's worth learning. Discover Go's features, advantages, and use cases.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-01",
      slug: "golang-introduction",
    },
    {
      title: "How to Install Go (Golang) - Step by Step Guide",
      description:
        "Complete guide on installing Go programming language on Windows, macOS, and Linux. Learn how to set up your Go development environment.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-02",
      slug: "golang-installation",
    },
    {
      title: "Go Basics - Variables, Types, and Syntax",
      description:
        "Learn the fundamentals of Go programming. Understand variables, data types, constants, and basic syntax with practical examples.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-03",
      slug: "golang-basics",
    },
    {
      title: "Functions in Go - Complete Guide",
      description:
        "Learn how to create and use functions in Go. Understand function syntax, parameters, return values, and best practices.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-04",
      slug: "golang-functions",
    },
    {
      title: "Go Structs - Complete Guide",
      description:
        "Learn about Go structs, how to create and use them. Understand struct fields, methods, embedding, and best practices for working with custom types.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-05",
      slug: "golang-structs",
    },
    {
      title: "Go Interfaces - Complete Guide",
      description:
        "Learn about Go interfaces, how they work, and how to use them effectively. Understand interface implementation and polymorphism in Go.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-06",
      slug: "golang-interfaces",
    },
    {
      title: "Building REST API with Go - Complete Guide",
      description:
        "Learn how to build REST APIs in Go using the net/http package and popular frameworks. Create endpoints, handle requests, and build production-ready APIs.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-07",
      slug: "golang-rest-api",
    },
    {
      title: "Go Concurrency - Goroutines and Channels",
      description:
        "Learn about Go's powerful concurrency features. Understand goroutines, channels, and how to write concurrent programs in Go.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-08",
      slug: "golang-concurrency",
    },
    {
      title: "Go Error Handling - Complete Guide",
      description:
        "Learn how to handle errors in Go. Understand Go's error handling philosophy, error types, and best practices for writing robust Go code.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-09",
      slug: "golang-error-handling",
    },
    {
      title: "Go Packages - Organizing Your Code",
      description:
        "Learn about Go packages, how to create and use them. Understand package structure, imports, and how to organize your Go code effectively.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-10",
      slug: "golang-packages",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/golang.jpg"
          alt="Go (Golang)"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Go (Golang)
          </h1>
          <p className="text-lg text-white/90">
            {goPosts.length} Posts Available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goPosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            image={post.image}
            date={post.date}
            slug={post.slug}
            basePath="/go/golang"
          />
        ))}
      </div>
    </div>
  );
}

