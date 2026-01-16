import Image from "next/image";
import PostCard from "@/components/PostCard";

export default function GoPage() {
  // Sample Go posts - you can replace this with your actual data
  const goPosts = [
    {
      title: "Go Language Beginner's Guide",
      description:
        "What is Go programming language and why should you learn it? Learn Go basics, benefits and how to use it.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-20",
      slug: "go-introduction",
    },
    {
      title: "Variables and Data Types in Go",
      description:
        "Learn how to declare variables in Go and use different data types. Complete guide with examples.",
      image: "/assets/images/golang.jpg",
      date: "2025-02-12",
      slug: "go-variables",
    },
    {
      title: "Functions in Go - Complete Guide",
      description:
        "Learn how to create functions in Go, multiple return values, variadic functions, and function types.",
      image: "/assets/images/golang.jpg",
      date: "2025-02-15",
      slug: "go-functions",
    },
    {
      title: "Goroutines and Concurrency in Go",
      description:
        "What are goroutines in Go and how to achieve concurrency? Learn about channels, select statement, and concurrent programming patterns.",
      image: "/assets/images/golang.jpg",
      date: "2025-02-18",
      slug: "go-goroutines",
    },
    {
      title: "Structs and Interfaces in Go",
      description:
        "Learn about structs and interfaces, and how to implement object-oriented programming concepts in Go.",
      image: "/assets/images/golang.jpg",
      date: "2025-02-20",
      slug: "go-structs",
    },
    {
      title: "Error Handling in Go",
      description:
        "Learn how to handle errors in Go, error types and best practices.",
      image: "/assets/images/golang.jpg",
      date: "2025-02-22",
      slug: "go-errors",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Go Header with Image */}
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/golang.jpg"
          alt="Go Lang"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Go Lang
          </h1>
          <p className="text-lg text-white/90">
            {goPosts.length} Posts Available
          </p>
        </div>
      </div>

      {/* Go Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goPosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            image={post.image}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
}
