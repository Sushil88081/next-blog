import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  title: string;
  description: string;
  image?: string;
  date?: string;
  slug: string;
  basePath?: string;
}

export default function PostCard({ title, description, image, date, slug, basePath = "/posts" }: PostCardProps) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
    >
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
          {description}
        </p>
        {date && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {date}
          </p>
        )}
      </div>
    </Link>
  );
}

