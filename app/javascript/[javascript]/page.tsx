import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug } from "@/lib/markdown";
import { format } from "date-fns";
import CodeBlockInjector from "@/components/CodeBlockInjector";
import CommentSection from "@/components/CommentSection";
import type { Metadata } from "next";

interface PageProps {
  params: {
    javascript: string;
  };
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.javascript, "javascript");

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${siteUrl}/javascript/${post.slug}`;
  const postImage = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/assets/images/javascript.jpg`;

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
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [postImage],
      creator: "@programmingblog",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function JavaScriptPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.javascript, "javascript");

  if (!post) {
    notFound();
  }

  const postUrl = `${siteUrl}/javascript/${post.slug}`;
  const postImage = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/assets/images/javascript.jpg`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    image: {
      "@type": "ImageObject",
      url: postImage,
      alt: post.title,
    },
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Programming Blog",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/images/javascript.jpg`,
      },
    },
    description: post.description,
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

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
        name: "JavaScript",
        item: `${siteUrl}/javascript`,
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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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

      <article
        className="prose prose-lg dark:prose-invert max-w-none mb-8"
        itemProp="articleBody"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
      />
      <CodeBlockInjector />

      {/* Comment Section */}
      <CommentSection postSlug={post.slug} postCategory="javascript" />
    </div>
  );
}
