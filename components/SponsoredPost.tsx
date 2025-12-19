import Link from 'next/link'

interface SponsoredPostProps {
  title: string
  description: string
  link: string
  image?: string
}

export default function SponsoredPost({ title, description, link, image }: SponsoredPostProps) {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 p-6 rounded-lg border-2 border-primary-300 dark:border-primary-600 mb-6">
      <div className="flex items-center mb-2">
        <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
          प्रायोजित
        </span>
      </div>
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {description}
      </p>
      <Link
        href={link}
        className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded transition"
        rel="nofollow sponsored"
        target="_blank"
      >
        अधिक जानें →
      </Link>
    </div>
  )
}

