import CategoryCard from '@/components/categoryCard'

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Learn Programming
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive guides, tutorials and examples about programming languages and technologies.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          You can add your content manually here. Add your markdown files in the content folder.
        </p>
      </div>
      <CategoryCard />
    </div>
  )
}
