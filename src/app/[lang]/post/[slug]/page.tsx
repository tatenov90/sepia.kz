import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";
import { postBySlugQuery } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/image";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SanityPost {
  title: string;
  excerpt: string | null;
  publishedAt: string;
  mainImage: (SanityImageSource & { alt?: string }) | null;
  body: PortableTextBlock[] | null;
}

interface PostPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return {};
  }

  const ogImageUrl = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }),
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(630).url()
    : null;

  const altText =
    (post.mainImage as (SanityImageSource & { alt?: string }) | null)?.alt ??
    post.title;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight mb-3 font-sans">
        {post.title}
      </h1>

      {/* Published date */}
      {post.publishedAt && (
        <p className="text-sm text-muted-foreground mb-8">
          {new Date(post.publishedAt).toLocaleDateString("kk-KZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {/* Main image */}
      {imageUrl && (
        <div className="relative w-full aspect-video mb-10 overflow-hidden rounded-sm">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Body */}
      {post.body && (
        <article className="prose prose-neutral max-w-none font-sans">
          <PortableText value={post.body} />
        </article>
      )}
    </main>
  );
}
