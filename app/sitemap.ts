import { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

  // Get all post slugs
  const postSlugs = getPostSlugs();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/react`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/go/golang`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/python`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/typescript`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/javascript`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic post pages - handle different category paths
  const categories = [
    { name: "react", path: "/react" },
    { name: "golang", path: "/go/golang" },
    { name: "python", path: "/python" },
    { name: "typescript", path: "/typescript" },
    { name: "javascript", path: "/javascript" },
  ];

  const postPages: MetadataRoute.Sitemap = [];
  
  categories.forEach((category) => {
    const categorySlugs = getPostSlugs(category.name);
    categorySlugs.forEach((slug) => {
      postPages.push({
        url: `${baseUrl}${category.path}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    });
  });

  return [...staticPages, ...postPages];
}
