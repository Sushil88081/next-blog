"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard() {
  const categories = [
    {
      name: `React`,
      description:
        "React is a JavaScript library for building user interfaces. Learn React with comprehensive tutorials and examples.",
      image: "/assets/images/react.jpg",
      link: "/react",
      color: "from-blue-500 to-cyan-500",
      count: "26 Posts",
    },
    {
      name: "Go Lang",
      description:
        "Go is a programming language developed by Google for building efficient and scalable applications.",
      image: "/assets/images/golang.jpg",
      link: "/go/golang",
      color: "from-cyan-500 to-blue-600",
      count: "10 Posts",
    },
    {
      name: "Python",
      description:
        "Python is a versatile programming language perfect for beginners. Learn Python for web development, data science, and more.",
      image: "/assets/images/python.jpg",
      link: "/python",
      color: "from-yellow-500 to-orange-500",
      count: "7 Posts",
    },
    {
      name: "JavaScript",
      description:
        "JavaScript is the language of the web. Learn JavaScript to build interactive websites and web applications.",
      image: "/assets/images/javascript.jpg",
      link: "/javascript",
      color: "from-yellow-400 to-yellow-600",
      count: "6 Posts",
    },
    {
      name: "TypeScript",
      description:
        "TypeScript adds type safety to JavaScript. Learn TypeScript to write safer, more maintainable code.",
      image: "/assets/images/typescript.png",
      link: "/typescript",
      color: "from-blue-600 to-indigo-600",
      count: "6 Posts",
    },
    {
      name: "Java",
      description:
        "Java powers enterprise backends, Android, and cloud APIs. Follow a practical roadmap from core Java to Spring Boot and production best practices.",
      image: "/assets/images/java.png",
      link: "/java",
      color: "from-orange-500 to-red-600",
      count: "154 Posts",
    },
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Most Popular Languages
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose a language to start your programming journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link
            href={category.link}
            key={category.name}
            className="group relative block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 transform hover:-translate-y-3 hover:scale-[1.02]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-gray-100 shadow-lg">
                  {category.count}
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {category.name}
                </h3>
                <div className="w-12 h-1 bg-white rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                <span className="text-sm font-semibold">Explore tutorials</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
