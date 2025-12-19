import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/markdown'

export default async function CategoriesPage() {
  const categories = await getAllCategories()
  const allPosts = await getAllPosts()

  const categoriesWithCount = categories.map(category => ({
    name: category,
    count: allPosts.filter(post => post.category === category).length,
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        सभी श्रेणियाँ
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCount.map((category) => (
          <Link
            key={category.name}
            href={`/categories/${encodeURIComponent(category.name)}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {category.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {category.count} पोस्ट
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

