import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";

interface SitemapPost {
  slug: string;
  _updatedAt: string;
  publishedAt: string | null;
}

const sitemapPostsQuery = groq`*[_type == "post"] {
  "slug": slug.current,
  _updatedAt,
  publishedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: SitemapPost[] = await client.fetch(sitemapPostsQuery);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://sepia.kz/kk",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://sepia.kz/kk/agency",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://sepia.kz/kk/post/${post.slug}`,
    lastModified: new Date(post._updatedAt ?? post.publishedAt ?? new Date()),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
