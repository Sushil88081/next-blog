import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug } from "@/lib/markdown";
import { format } from "date-fns";
import CodeBlockInjector from "@/components/CodeBlockInjector";
import CommentSection from "@/components/CommentSection";
import type { Metadata } from "next";

interface PageProps {
  params: {
    react: string;
  };
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.react, "react");

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${siteUrl}/react/${post.slug}`;
  const postImage = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/assets/images/react.jpg`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author || "Programming Blog Team" }],
    creator: post.author || "Programming Blog Team",
    publisher: "Programming Blog",
    openGraph: {
      type: "article",
      locale: "en_US",
      url: postUrl,
      siteName: "Programming Blog",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || "Programming Blog Team"],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [postImage],
      creator: "@programmingblog",
      site: "@programmingblog",
    },
    alternates: {
      canonical: postUrl,
    },
    other: {
      "article:published_time": post.date,
      "article:modified_time": post.date,
      "article:author": post.author || "Programming Blog Team",
      "article:section": post.category,
    },
  };
}

export default async function ReactPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.react, "react");

  if (!post) {
    notFound();
  }

  const postUrl = `${siteUrl}/react/${post.slug}`;
  const postImage = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/assets/images/react.jpg`;

  // Article structured data for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: postImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Programming Blog Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Programming Blog",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/images/react.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "React",
        item: `${siteUrl}/react`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {format(new Date(post.date), "MMMM dd, yyyy")}
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
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />
        <CodeBlockInjector />

        {/* Comment Section */}
        <CommentSection postSlug={post.slug} postCategory="react" />
      </div>
    </div>
  );
}
