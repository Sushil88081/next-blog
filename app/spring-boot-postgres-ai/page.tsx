import Image from "next/image";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";
import { getCategoryPosts } from "@/lib/markdown";
import type { Post } from "@/lib/markdown";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

const SERIES_ID = "spring-boot-postgres-ai";

const CATEGORY_LABEL = "Spring Boot + PostgreSQL + AI series";

function sortSeriesPosts(posts: Post[]): Post[] {
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
  title: "Spring Boot, PostgreSQL & AI Agent — Blog Series",
  description:
    "28-part hands-on path: Spring Boot basics, JPA, REST CRUD, validation, error handling, pagination, Postman, build & profiles, an AI chat API, PostgreSQL chat history, Docker, and deployment.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/spring-boot-postgres-ai`,
    siteName: "Programming Blog",
    title: "Spring Boot + PostgreSQL + AI Agent (Series)",
    description: "Build a REST API with Spring Boot, PostgreSQL, and an LLM-powered chat end to end.",
    images: [{ url: `${siteUrl}/assets/java/java.png`, width: 1200, height: 630, alt: "Spring Boot series" }],
  },
  alternates: {
    canonical: `${siteUrl}/spring-boot-postgres-ai`,
  },
};

export default async function SpringBootPostgresAiPage() {
  const raw = await getCategoryPosts("spring-boot-postgres-ai");
  const sorted = sortSeriesPosts(raw);
  const listPosts = sorted.map((p) => ({
    title: p.title,
    description: p.description,
    image: p.image || "/assets/images/java.png",
    date: p.date,
    slug: p.slug,
  }));

  const count = listPosts.length;
  const countLabel = count === 1 ? "1 part" : `${count} parts`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/java/java.png"
          alt="Spring Boot, PostgreSQL and AI"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Spring Boot + PostgreSQL + AI
          </h1>
          <p className="text-lg text-white/90">REST APIs, JPA, and a chat agent — {countLabel}</p>
        </div>
      </div>

      <div className="not-prose max-w-none mb-10">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
          Follow the chapters in order, or open any topic you need. Each part includes runnable Java examples and
          production-minded notes. Topics run from project setup and configuration to CRUD, validation, global
          exception handling, pagination, testing, AI integration, persisting chat history, Docker, and deploy
          basics.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <a
            href="/java"
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            Go to the main Java section
          </a>{" "}
          for the broader core-to-advanced learning guide.
        </p>
      </div>

      <CategorySearch
        posts={listPosts}
        category={CATEGORY_LABEL}
        basePath="/spring-boot-postgres-ai"
      />
    </div>
  );
}
