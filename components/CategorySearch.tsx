"use client";

import { useState, useMemo } from "react";
import PostCard from "@/components/PostCard";

interface Post {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
}

interface CategorySearchProps {
  posts: Post[];
  category: string;
  basePath: string;
}

export default function CategorySearch({ posts, category, basePath }: CategorySearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts by title (case-insensitive)
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase().trim();
    return posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  return (
    <div className="mb-8">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${category} posts by title...`}
            className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Search Results Count */}
        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
            {filteredPosts.length === 0 ? (
              <span>No posts found for &quot;{searchQuery}&quot;</span>
            ) : (
              <span>
                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} matching &quot;{searchQuery}&quot;
              </span>
            )}
          </div>
        )}
      </div>

      {/* Filtered Posts Grid */}
      {filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              description={post.description}
              image={post.image}
              date={post.date}
              slug={post.slug}
              basePath={basePath}
            />
          ))}
        </div>
      )}

      {/* No Results Message */}
      {searchQuery && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            No posts found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Try a different search term
          </p>
        </div>
      )}
    </div>
  );
}

