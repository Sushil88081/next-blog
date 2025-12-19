import Link from 'next/link'
import { Post } from '@/lib/markdown'
import { format } from 'date-fns'
import { hi } from 'date-fns/locale'

interface RelatedPostsProps {
  posts: Post[]
  currentSlug: string
}

export default function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        संबंधित पोस्ट
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
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

