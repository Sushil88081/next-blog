import Image from "next/image";
import Link from "next/link";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";
import { getCategoryPosts } from "@/lib/markdown";
import type { Post } from "@/lib/markdown";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

const SERIES_ID = "agentic-ai-spring-boot";

const CATEGORY_LABEL = "Agentic AI series";

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
  title: "Agentic AI — Plain-language guide for backend builders",
  description:
    "What agentic systems are, how they differ from a plain chat box, and why databases still matter—without drowning you in buzzwords.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/agentic-ai`,
    siteName: "Programming Blog",
    title: "Agentic AI — introduction & series",
    description:
      "Friendly explanations of agent loops, tools, and responsibility—with paths into Spring Boot and PostgreSQL.",
    images: [{ url: `${siteUrl}/assets/images/agentic-ai-hero.png`, width: 1200, height: 630, alt: "Agentic AI abstract illustration" }],
  },
  alternates: {
    canonical: `${siteUrl}/agentic-ai`,
  },
};

export default async function AgenticAiPage() {
  const raw = await getCategoryPosts("agentic-ai");
  const sorted = sortSeriesPosts(raw);
  const listPosts = sorted.map((p) => ({
    title: p.title,
    description: p.description,
    image: p.image || "/assets/images/java.png",
    date: p.date,
    slug: p.slug,
  }));

  const count = listPosts.length;
  const countLabel = count === 0 ? "Articles incoming" : count === 1 ? "1 article" : `${count} articles`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/agentic-ai-hero.png"
          alt="Abstract illustration of connected steps suggesting an agent loop"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Agentic AI
          </h1>
          <p className="text-lg text-white/90">
            Ideas you can explain to a teammate—then wire carefully in code · {countLabel}
          </p>
        </div>
      </div>

      <article className="not-prose max-w-none mb-12 space-y-8">
        <section className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-0">
            Start here if the phrase sounds louder than the meaning
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Most people bump into “agentic AI” right after they finally got comfortable with “the model writes text.”
            The shift is smaller than the marketing makes it sound: you are still shipping an ordinary application—routing,
            validation, permissions, storage—but you allow one corner of the system to propose a small plan before it touches
            the outside world. Want a single article-sized version of this idea first? Read{" "}
            <Link
              href="/agentic-ai/agentic-ai-01-what-is-agentic-ai"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              What is Agentic AI? A beginner-friendly guide
            </Link>
            . For what actually sits inside that loop—the agent itself—continue with{" "}
            <Link
              href="/agentic-ai/agentic-ai-02-what-is-an-ai-agent"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              What is an AI Agent?
            </Link>
            .
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Think of it like giving a careful coworker a checklist instead of a blank page. They might draft steps, call an
            internal API, look something up, or ask for clarification. Your job is not to pretend the coworker is infallible;
            your job is to draw bright lines around what they may do, log what they did, and roll back when the plan wanders.
          </p>
        </section>

        <section
          className="rounded-2xl border border-violet-200/80 dark:border-violet-900/50 bg-gradient-to-br from-violet-50/90 to-teal-50/60 dark:from-violet-950/40 dark:to-teal-950/30 p-6 md:p-8"
          aria-label="Diagram of a simple agent loop"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            A loop you can sketch on a whiteboard
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
            Nothing here requires magic—only patience. Each lap around the loop should leave a trace you would not be ashamed
            to show during an incident review.
          </p>
          <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-3 md:gap-2 text-center text-sm font-medium">
            <div className="flex-1 rounded-xl bg-white/80 dark:bg-gray-900/60 px-3 py-4 shadow-sm border border-white/60 dark:border-gray-700">
              <span className="block text-violet-700 dark:text-violet-300 mb-1">Sense</span>
              <span className="text-gray-600 dark:text-gray-400 font-normal text-xs leading-snug">
                Read the user message, ticket, or event—never trust it blindly.
              </span>
            </div>
            <div className="hidden md:flex items-center text-violet-400 dark:text-violet-600 text-xl font-light" aria-hidden>
              →
            </div>
            <div className="flex-1 rounded-xl bg-white/80 dark:bg-gray-900/60 px-3 py-4 shadow-sm border border-white/60 dark:border-gray-700">
              <span className="block text-violet-700 dark:text-violet-300 mb-1">Decide</span>
              <span className="text-gray-600 dark:text-gray-400 font-normal text-xs leading-snug">
                Pick the next safe move: answer, ask, or call a tool you allowlisted.
              </span>
            </div>
            <div className="hidden md:flex items-center text-violet-400 dark:text-violet-600 text-xl font-light" aria-hidden>
              →
            </div>
            <div className="flex-1 rounded-xl bg-white/80 dark:bg-gray-900/60 px-3 py-4 shadow-sm border border-white/60 dark:border-gray-700">
              <span className="block text-teal-700 dark:text-teal-300 mb-1">Act</span>
              <span className="text-gray-600 dark:text-gray-400 font-normal text-xs leading-snug">
                Run the tool or query with the same limits you would give a junior on call.
              </span>
            </div>
            <div className="hidden md:flex items-center text-violet-400 dark:text-violet-600 text-xl font-light" aria-hidden>
              →
            </div>
            <div className="flex-1 rounded-xl bg-white/80 dark:bg-gray-900/60 px-3 py-4 shadow-sm border border-white/60 dark:border-gray-700">
              <span className="block text-teal-700 dark:text-teal-300 mb-1">Remember</span>
              <span className="text-gray-600 dark:text-gray-400 font-normal text-xs leading-snug">
                Store outcomes and errors so the next lap does not repeat the same mistake quietly.
              </span>
            </div>
          </div>
        </section>

        <section className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            How this differs from “just a chatbot”
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            A chat-style assistant stops at helpful sentences. An agent-shaped setup may also trigger actions: opening a ticket,
            fetching a row, enqueueing work, or drafting a patch. The moment actions exist, you are back in familiar engineering
            territory—timeouts, retries, partial failures, and angry finance if numbers move without approval.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            That is why this blog keeps returning to{" "}
            <Link href="/spring-boot-postgres-ai" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Spring Boot and PostgreSQL
            </Link>
            : they are where adults store truth. Models suggest; your schema, constraints, and audit trails decide what actually
            happened.
          </p>
        </section>

        <section className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Who this track is for
          </h2>
          <ul className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed list-disc pl-6 space-y-2">
            <li>
              You ship backends and want vocabulary that matches how teams really build—not slide decks that skip the database.
            </li>
            <li>
              You are curious about tool calling and planning, but you want the discussion anchored in APIs you can test with{" "}
              <span className="whitespace-nowrap">curl</span> or Postman.
            </li>
            <li>
              You already read the hype cycle once and prefer steady explanations over breathless superlatives.
            </li>
          </ul>
        </section>

        {count === 0 ? (
          <p className="text-base text-gray-600 dark:text-gray-400 rounded-lg bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-4 py-3">
            Individual chapters will show up below as they are published—this introduction stays useful even on day one.
          </p>
        ) : null}
      </article>

      <CategorySearch posts={listPosts} category={CATEGORY_LABEL} basePath="/agentic-ai" />

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
        <Link href="/java" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
          Browse the main Java learning path
        </Link>{" "}
        for core language topics alongside this series.
      </p>
    </div>
  );
}
