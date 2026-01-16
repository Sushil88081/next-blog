import Image from "next/image";
import PostCard from "@/components/PostCard";

export default function GoPage() {
  // Sample Go posts - you can replace this with your actual data
  const goPosts = [
    {
      title: "Go Language Beginner's Guide",
      description:
        "Go programming language what is it and why should you learn it? Go basics, benefits and how to use it.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-20",
      slug: "go-introduction",
    },
    {
      title: "Go में Variables और Data Types",
      description:
        "Go में variables कैसे declare करें और different data types का उपयोग कैसे करें। Complete guide with examples।",
      image: "/assets/images/golang.jpg",
      date: "2025-02-12",
      slug: "go-variables",
    },
    {
      title: "Go में Functions - Complete Guide",
      description:
        "Go में functions कैसे बनाएं, multiple return values, variadic functions, और function types के बारे में जानें।",
      image: "/assets/images/golang.jpg",
      date: "2025-02-15",
      slug: "go-functions",
    },
    {
      title: "Go में Goroutines और Concurrency",
      description:
        "Go में goroutines क्या हैं और concurrency कैसे achieve करें? Channels, select statement, और concurrent programming patterns सीखें।",
      image: "/assets/images/golang.jpg",
      date: "2025-02-18",
      slug: "go-goroutines",
    },
    {
      title: "Go में Structs और Interfaces",
      description:
        "Structs और interfaces के बारे में सीखें, object-oriented programming concepts Go में कैसे implement करें।",
      image: "/assets/images/golang.jpg",
      date: "2025-02-20",
      slug: "go-structs",
    },
    {
      title: "Go में Error Handling",
      description:
        "Go में errors कैसे handle करें, error types और best practices के बारे में जानें।",
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
