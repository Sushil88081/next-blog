import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        पेज नहीं मिला
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        क्षमा करें, आप जिस पेज को खोज रहे हैं वह मौजूद नहीं है।
      </p>
      <Link
        href="/"
        className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        होम पर वापस जाएं
      </Link>
    </div>
  )
}

