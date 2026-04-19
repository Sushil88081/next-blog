import Image from "next/image";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";
import { getCategoryPosts } from "@/lib/markdown";
import type { Post } from "@/lib/markdown";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

const SERIES_ID = "java-complete-learning-guide";

function sortJavaPosts(posts: Post[]): Post[] {
  const inSeries = posts.filter((p) => p.series === SERIES_ID);
  const other = posts.filter((p) => p.series !== SERIES_ID);
  inSeries.sort((a, b) => (a.chapter ?? 999) - (b.chapter ?? 999));
  other.sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    if (tb !== ta) return tb - ta;
    return a.slug.localeCompare(b.slug);
  });
  return [...inSeries, ...other];
}

export const metadata: Metadata = {
  title: "Java Tutorials and Guides",
  description:
    "Learn Java from core language fundamentals to Spring Boot, REST APIs, JDBC, and production best practices. Practical roadmap-style guides for backend developers.",
  keywords: [
    "java",
    "java tutorial",
    "learn java",
    "core java",
    "spring boot",
    "java roadmap",
    "backend java",
    "jdbc",
    "rest api java",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/java`,
    siteName: "Programming Blog",
    title: "Java Tutorials and Guides",
    description:
      "Learn Java from core fundamentals to APIs and Spring Boot with practical, experience-backed guides.",
    images: [
      {
        url: `${siteUrl}/assets/images/java.png`,
        width: 1200,
        height: 630,
        alt: "Java Tutorials and Guides",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Java Tutorials and Guides",
    description:
      "Learn Java from core fundamentals to APIs and Spring Boot with practical guides.",
    images: [`${siteUrl}/assets/images/java.png`],
  },
  alternates: {
    canonical: `${siteUrl}/java`,
  },
};

export default async function JavaPage() {
  const raw = await getCategoryPosts("java");
  const sorted = sortJavaPosts(raw);
  const javaPosts = sorted.map((p) => ({
    title: p.title,
    description: p.description,
    image: p.image || "/assets/images/java.png",
    date: p.date,
    slug: p.slug,
  }));

  const count = javaPosts.length;
  const countLabel = count === 1 ? "1 Post Available" : `${count} Posts Available`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/java.png"
          alt="Java"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Java</h1>
          <p className="text-lg text-white/90">{countLabel}</p>
        </div>
      </div>

      <div className="not-prose max-w-none mb-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Complete Java Learning Guide (151 chapters)
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Start with the{" "}
            <a
              href="/java/java-complete-learning-guide-index"
              className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              series index
            </a>{" "}
            for the full chapter list. The <strong>complete 151-chapter</strong> guide is published—from core Java through
            Spring Boot, advanced JVM topics, security, production practices, and a closing roadmap—so you can follow the path
            end to end or jump back to any chapter when your work needs it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Java belongs in your backend toolkit
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Java has been shipping production systems for decades. Banks, telecoms, e-commerce platforms, and
            cloud-native companies still choose it when they want mature libraries, predictable performance tuning
            on the JVM, and a hiring market that understands how to operate large services.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This section of the blog focuses on the skills that move you from syntax exercises to maintainable
            applications: object-oriented design, the collections framework, modern Java features, JDBC, HTTP APIs,
            and Spring Boot—the stack you are most likely to see in real jobs.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What you will build toward
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Strong core language skills
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Types, OOP, exceptions, collections, and modern Java features are the foundation. The roadmap post
                ties these topics to how they show up in real services—not only in exam-style snippets.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                APIs, data, and Spring Boot
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                JDBC, REST design, validation, layered architecture, and sensible error handling are what teams review
                in interviews and in code review. The guide walks those ideas with concrete examples.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Production habits
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Logging, configuration, security basics, testing, and deployment topics are easy to skip while
                learning—until they are not. The roadmap ends with what changes when code leaves your laptop.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            How to use these tutorials
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Follow the numbered chapters in order on your first pass. Keep one small project folder, type examples by
            hand, and read compiler messages slowly—they are part of the curriculum.
          </p>
        </section>
      </div>

      <CategorySearch posts={javaPosts} category="Java" basePath="/java" />
    </div>
  );
}
