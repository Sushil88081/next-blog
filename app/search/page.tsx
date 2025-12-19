'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Post } from '@/lib/markdown'
import { format } from 'date-fns'
import { hi } from 'date-fns/locale'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const allPosts = await response.json()
        setPosts(allPosts)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFilteredPosts([])
      return
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredPosts(filtered)
  }, [query, posts])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600 dark:text-gray-400">लोड हो रहा है...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        खोज परिणाम
      </h1>
      {query && (
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          "{query}" के लिए {filteredPosts.length} परिणाम मिले
        </p>
      )}
      {!query && (
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          कृपया खोज करने के लिए कोई कीवर्ड दर्ज करें
        </p>
      )}
      {filteredPosts.length === 0 && query && (
        <p className="text-center text-gray-600 dark:text-gray-400 py-12">
          कोई परिणाम नहीं मिला
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {post.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {format(new Date(post.date), 'dd MMMM yyyy', { locale: hi })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

