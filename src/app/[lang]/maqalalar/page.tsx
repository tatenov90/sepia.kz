import type { SanityImageSource } from "@sanity/image-url";
import Link from "next/link";

import { getDictionary } from "lib/dictionary";
import type { Locale } from "lib/dictionary";
import ArticleCard from "@/components/ArticleCard";
import { client } from "@/sanity/client";
import { MAQALALAR_PAGE_QUERY } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/image";

// ── ISR: revalidate every 60 seconds ─────────────────────────────────────────
export const revalidate = 60;

// ── Types ─────────────────────────────────────────────────────────────────────
interface MaqalalarPost {
  _id: string;
  title: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  mainImage: (SanityImageSource & { alt?: string }) | null;
  category: { title: string } | null;
  slug: { current: string } | null;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function MaqalalarPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  await getDictionary(lang);

  const posts: MaqalalarPost[] = await client.fetch(MAQALALAR_PAGE_QUERY) ?? [];

  return (
    <main className="pt-24 md:pt-32 pb-8 px-4 md:px-8 max-w-7xl mx-auto">
      {/* ── Articles List ── */}
      <div className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
        {posts.map((post) => {
          const imageUrl = post?.mainImage
            ? urlForImage(post.mainImage).width(800).height(600).url()
            : "";

          // Skip cards without an image to avoid Next.js Image crashes
          if (!imageUrl) return null;

          const date = post?.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("ru-RU")
            : "";

          return (
            <Link
              key={post._id}
              href={`/${lang}/post/${post?.slug?.current || ""}`}
            >
              <ArticleCard
                title={post?.title ?? ""}
                excerpt={post?.excerpt ?? ""}
                category={post?.category?.title ?? "Без рубрики"}
                date={date}
                imageUrl={imageUrl}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
