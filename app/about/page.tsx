export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        About Us
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          You can add information about yourself here.
        </p>
      </div>
    </div>
  )
}

