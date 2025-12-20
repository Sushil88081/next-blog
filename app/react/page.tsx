import Image from "next/image";
import PostCard from "@/components/PostCard";

export default function ReactPage() {
  // Sample React posts - you can replace this with your actual data
  const reactPosts = [
    {
      title: "React Introduction",
      description: "Reactjs is a javascript library for building user interfaces.",
      image: "/assets/images/react.jpg",
      date: "2025-12-20",
      slug: "react-introduction"
    },
    {
      title: "what is state in react",
      description: "how to use state in react, complete guide with examples",
      image: "/assets/images/react.jpg",
      date: "2025-12-20",
      slug: "react-state"
    },
    {
      title: "How to make components in react",
      description: "Functional and class components in react",
      image: "/assets/images/react.jpg",
      date: "2025-01-25",
      slug: "react-components"
    },
    {
      title: "What is props in react",
      description: "how to use props in react, complete guide with examples",
      image: "/assets/images/react.jpg",
      date: "2025-01-30",
      slug: "react-props"
    },
    {
      title: "How to handle events in react",
      description: "how to handle events in react, complete guide with examples",
      image: "/assets/images/react.jpg",
      date: "2025-02-05",
      slug: "react-events"
    },
    {
      title: "Redux in react",
      description: "There is a toll redux toolkit to manage state in react",
      image: "/assets/images/react.jpg",
      date: "2025-02-10",
      slug: "react-context"
    },
    {
      title: "React Router in react",
      description: "There is a toll react router to manage routing in react",
      image: "/assets/images/react.jpg",
      date: "2025-02-10",
      slug: "react-router"
    },
    {
      title: "React Forms in react",
      description: "There is a toll react forms to handle forms in react",
      image: "/assets/images/react.jpg",
      date: "2025-02-10",
      slug: "react-forms"
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
