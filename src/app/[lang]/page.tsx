import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { getDictionary } from "lib/dictionary";
import type { Locale } from "lib/dictionary";
import { client } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/image";

// ── ISR: revalidate every 60 seconds ─────────────────────────────────────────
export const revalidate = 60;

// ── Types ─────────────────────────────────────────────────────────────────────
interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string | null;
  publishedAt: string;
  mainImage: (SanityImageSource & { alt?: string }) | null;
}

// ── Image URL helper ──────────────────────────────────────────────────────────
function getImageUrl(
  image: (SanityImageSource & { alt?: string }) | null,
  width: number,
  height: number
): string | null {
  if (!image) return null;
  return urlForImage(image).width(width).height(height).url();
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  await getDictionary(lang);

  const posts: SanityPost[] = await client.fetch(postsQuery);

  // Slot aliases – may be undefined when fewer posts exist
  const heroPost    = posts[0];
  const sidePost1   = posts[1];
  const sidePost2   = posts[2];
  const sidePost3   = posts[3];
  const carouselPosts = posts.slice(4, 8);
  const massiveLeft  = posts[8];
  const massiveRight = posts[9];

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 w-[95%] mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left Column: Giant Feature Card ── */}
          {heroPost ? (
            <Link
              href={`/${lang}/post/${heroPost?.slug?.current || ""}`}
              className="lg:col-span-7 flex flex-col gap-4 group cursor-pointer"
            >
              <div className="aspect-video w-full rounded-md overflow-hidden bg-[#8B1A1A] relative">
                {getImageUrl(heroPost.mainImage, 900, 506) && (
                  <Image
                    src={getImageUrl(heroPost.mainImage, 900, 506)!}
                    alt={heroPost.mainImage?.alt ?? heroPost.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                )}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-sans tracking-tight leading-tight">
                {heroPost.title}
              </h2>
              <p className="text-muted-foreground mt-2 line-clamp-2">
                {heroPost.excerpt}
              </p>
            </Link>
          ) : (
            <article className="lg:col-span-7 flex flex-col gap-4 group cursor-pointer">
              <div className="aspect-video w-full rounded-md overflow-hidden bg-[#8B1A1A]" />
              <h2 className="text-3xl lg:text-4xl font-bold font-sans tracking-tight leading-tight">
                Long Topic of the News
              </h2>
              <p className="text-muted-foreground mt-2 line-clamp-2">
                Short Preview adopted for SEO. Short Preview adopted for SEO.
                Short Preview adopted for SEO. Short Preview adopted for SEO.
              </p>
            </article>
          )}

          {/* ── Right Column: Three Small Preview Cards ── */}
          <aside className="lg:col-span-5 flex flex-col gap-8">
            {[sidePost1, sidePost2, sidePost3].map((post, index) =>
              post ? (
                <Link
                  key={post._id}
                  href={`/${lang}/post/${post?.slug?.current || ""}`}
                  className="flex flex-row gap-4 group cursor-pointer"
                >
                  <div className="w-2/5 shrink-0 aspect-[4/3] rounded-md overflow-hidden bg-[#8B1A1A] relative">
                    {getImageUrl(post.mainImage, 320, 240) && (
                      <Image
                        src={getImageUrl(post.mainImage, 320, 240)!}
                        alt={post.mainImage?.alt ?? post.title}
                        fill
                        className="object-cover"
                        sizes="20vw"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold font-sans leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ) : (
                <div key={`ph-side-${index}`} className="flex flex-row gap-4 group cursor-pointer">
                  <div className="w-2/5 shrink-0 aspect-[4/3] rounded-md overflow-hidden bg-[#8B1A1A]" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold font-sans leading-tight">Short Topic of the News</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Short Preview adopted for SEO. Short Preview adopted for SEO. Short Preview adopted for SEO.
                    </p>
                  </div>
                </div>
              )
            )}
          </aside>

        </div>
      </section>

      {/* ── Stage 3: Sub-Hero Horizontal Carousel ── */}
      <section className="max-w-7xl mx-auto w-[95%] mt-16">
        <div className="flex flex-row gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pr-8 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {carouselPosts.length > 0
            ? carouselPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/${lang}/post/${post?.slug?.current || ""}`}
                  className="flex flex-col gap-3 min-w-[260px] md:min-w-[300px] snap-start cursor-pointer group shrink-0"
                >
                  <div className="w-full aspect-[4/5] rounded-md overflow-hidden bg-[#8B1A1A] relative">
                    {getImageUrl(post.mainImage, 300, 375) && (
                      <Image
                        src={getImageUrl(post.mainImage, 300, 375)!}
                        alt={post.mainImage?.alt ?? post.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Category Category&apos;s name</p>
                  <h4 className="text-lg font-bold font-sans leading-tight">{post.title}</h4>
                </Link>
              ))
            : [0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-3 min-w-[260px] md:min-w-[300px] snap-start cursor-pointer group shrink-0">
                  <div className="w-full aspect-[4/5] rounded-md overflow-hidden bg-[#8B1A1A]" />
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Category Category&apos;s name</p>
                  <h4 className="text-lg font-bold font-sans leading-tight">Topic of the News</h4>
                </div>
              ))}
        </div>
      </section>

      {/* ── Stage 4: Massive Omanko Style Cards ── */}
      <section className="max-w-7xl mx-auto w-[95%] mt-16 mb-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Left Card ── */}
          {massiveLeft ? (
            <Link
              href={`/${lang}/post/${massiveLeft?.slug?.current || ""}`}
              className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#8B1A1A] group cursor-pointer block"
            >
              {getImageUrl(massiveLeft.mainImage, 800, 1000) && (
                <Image
                  src={getImageUrl(massiveLeft.mainImage, 800, 1000)!}
                  alt={massiveLeft.mainImage?.alt ?? massiveLeft.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-2">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">MARKETING</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{massiveLeft.title}</h3>
              </div>
            </Link>
          ) : (
            <article className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#8B1A1A] group cursor-pointer">
              <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-2">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">MARKETING</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">Long Topic of the News</h3>
              </div>
            </article>
          )}

          {/* ── Right Card ── */}
          {massiveRight ? (
            <Link
              href={`/${lang}/post/${massiveRight?.slug?.current || ""}`}
              className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#8B1A1A] group cursor-pointer block"
            >
              {getImageUrl(massiveRight.mainImage, 800, 1000) && (
                <Image
                  src={getImageUrl(massiveRight.mainImage, 800, 1000)!}
                  alt={massiveRight.mainImage?.alt ?? massiveRight.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-2">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">MARKETING</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{massiveRight.title}</h3>
              </div>
            </Link>
          ) : (
            <article className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#8B1A1A] group cursor-pointer">
              <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-2">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">MARKETING</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">Long Topic of the News</h3>
              </div>
            </article>
          )}

        </div>
      </section>
    </main>
  );
}
