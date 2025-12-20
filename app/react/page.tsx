import Image from "next/image";
import PostCard from "@/components/PostCard";

export default function ReactPage() {
  // Sample React posts - you can replace this with your actual data
  const reactPosts = [
    {
      title: "React में State क्या होता है?",
      description: "React में State का उपयोग कैसे करें, पूरी गाइड और उदाहरण के साथ।",
      image: "/assets/images/react.jpg",
      date: "2025-01-15",
      slug: "react-state"
    },
    {
      title: "React Hooks - पूरी गाइड",
      description: "useState, useEffect, और अन्य hooks के बारे में विस्तृत जानकारी।",
      image: "/assets/images/react.jpg",
      date: "2025-01-20",
      slug: "react-hooks"
    },
    {
      title: "React Components कैसे बनाएं",
      description: "Functional और Class components के बारे में सीखें।",
      image: "/assets/images/react.jpg",
      date: "2025-01-25",
      slug: "react-components"
    },
    {
      title: "React Props क्या हैं?",
      description: "Props के माध्यम से data कैसे pass करें, complete guide।",
      image: "/assets/images/react.jpg",
      date: "2025-01-30",
      slug: "react-props"
    },
    {
      title: "React में Event Handling",
      description: "Events को handle करना सीखें, onClick, onChange और अन्य events।",
      image: "/assets/images/react.jpg",
      date: "2025-02-05",
      slug: "react-events"
    },
    {
      title: "React Context API",
      description: "Context API के साथ state management, props drilling से बचें।",
      image: "/assets/images/react.jpg",
      date: "2025-02-10",
      slug: "react-context"
    }
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
