import Link from 'next/link'
import { getPostsByCategory, getAllCategories } from '@/lib/markdown'
import { format } from 'date-fns'
import { hi } from 'date-fns/locale'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const category = decodeURIComponent(params.category)
  const posts = await getPostsByCategory(category)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        श्रेणी: {category}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {posts.length} पोस्ट मिली
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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

