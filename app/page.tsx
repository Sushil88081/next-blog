import CategoryCard from '@/components/categoryCard'

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Learn Programming
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Comprehensive guides, tutorials and examples about programming languages and technologies. 
          Start your coding journey today!
        </p>
      </div>
      <CategoryCard />
    </div>
  )
}
