import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/markdown'
import { format } from 'date-fns'
import { hi } from 'date-fns/locale'
import SocialShare from '@/components/SocialShare'
import TableOfContents from '@/components/TableOfContents'
import RelatedPosts from '@/components/RelatedPosts'
import AdSenseSlot from '@/components/AdSenseSlot'
import AffiliateLink from '@/components/AffiliateLink'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | React हिंदी`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  const allPosts = await getAllPosts()

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {format(new Date(post.date), 'dd MMMM yyyy', { locale: hi })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {post.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              लेखक: <span className="font-semibold">{post.author}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Table of Contents */}
        <TableOfContents />

        {/* AdSense Slot - Middle */}
        <div className="my-8">
          <AdSenseSlot 
            slotId="middle-ad"
            style={{ display: 'block', textAlign: 'center' }}
            format="auto"
          />
        </div>

        {/* Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />

        {/* Social Share */}
        <SocialShare
          url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/posts/${post.slug}`}
          title={post.title}
          description={post.description}
        />

        {/* Related Posts */}
        <RelatedPosts posts={allPosts} currentSlug={post.slug} />
      </div>

      {/* Sidebar with AdSense */}
      <aside className="hidden lg:block fixed right-8 top-24 w-64">
        <div className="sticky top-24">
          <AdSenseSlot 
            slotId="sidebar-ad"
            style={{ display: 'block' }}
            format="vertical"
          />
        </div>
      </aside>
    </div>
  )
}

