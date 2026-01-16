import Image from "next/image";

// Go Lang Coming Soon Page
// This page displays a "Coming Soon" message for Go Lang content
export default function GoPage() {
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
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Go Lang
          </h1>
          <p className="text-lg text-white/90">Coming Soon</p>
        </div>
      </div>

      {/* Coming Soon Message Section */}
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-primary-500 dark:text-primary-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Coming Soon!
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          We're working hard to bring you amazing Go Lang tutorials and guides.
          Check back soon for exciting content about Go programming!
        </p>
        {/* Navigation buttons */}
        <div className="flex justify-center gap-4">
          {/* Home button */}
          <a
            href="/"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Go to Home
          </a>
          {/* React posts button */}
          <a
            href="/react"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors duration-200"
          >
            Explore React Posts
          </a>
        </div>
      </div>
    </div>
  );
}
