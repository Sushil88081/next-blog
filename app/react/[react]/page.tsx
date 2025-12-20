import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPostBySlug } from '@/lib/markdown'
import { format } from 'date-fns'
import CodeBlockInjector from '@/components/CodeBlockInjector'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    react: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.react)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Programming Blog`,
    description: post.description,
    keywords: post.tags,
  }
}

export default async function ReactPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.react)

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
              {format(new Date(post.date), 'MMMM dd, yyyy')}
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
              Author: <span className="font-semibold">{post.author}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
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
        {/* {post.image && (
          <div className="mb-8 relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              priority
            />
          </div>
        )} */}

        {/* Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />
        <CodeBlockInjector />
      </div>
    </div>
  )
}
