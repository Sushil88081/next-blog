import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard() {
  const categories = [
    {
      name: "React",
      description:
        "React is a JavaScript library for building user interfaces.",
      image: "/assets/images/react.jpg",
      link: "/react",
    },
    {
      name: "Go Lang",
      description:
        "Go Lang is a programming language developed by Google for building efficient and scalable applications.",
      image: "/assets/images/golang.jpg",
      link: "/go/golang",
    },
  ];

  return (
    <div className="mb-12">
      <div className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
        Most Popular Languages in 2026
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            href={category.link}
            key={category.name}
            className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                {category.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
