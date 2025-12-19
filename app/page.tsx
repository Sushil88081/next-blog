import Link from 'next/link'
import { getAllPosts } from '@/lib/markdown'
import { format } from 'date-fns'
import { hi } from 'date-fns/locale'
import AdSenseSlot from '@/components/AdSenseSlot'
import SponsoredPost from '@/components/SponsoredPost'

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          React.js हिंदी में सीखें
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          React.js के बारे में हिंदी में विस्तृत गाइड, ट्यूटोरियल और उदाहरण। State, Hooks, Components और बहुत कुछ।
        </p>
      </section>

      {/* AdSense Slot - Middle */}
      <div className="my-8">
        <AdSenseSlot 
          slotId="middle-ad"
          style={{ display: 'block', textAlign: 'center' }}
          format="auto"
        />
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            फीचर्ड पोस्ट
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
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
                <div className="p-6">
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {format(new Date(post.date), 'dd MMMM yyyy', { locale: hi })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sponsored Post Example */}
      <SponsoredPost
        title="React में Master करें - Premium Course"
        description="हमारे premium React course के साथ React.js में expert बनें। 50+ प्रोजेक्ट्स और real-world examples के साथ।"
        link="https://example.com/react-course"
        image="/images/sponsored-course.jpg"
      />

      {/* Recent Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          हाल की पोस्ट
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {format(new Date(post.date), 'dd MMM yyyy', { locale: hi })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

