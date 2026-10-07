import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { getDictionary } from "lib/dictionary";
import type { Locale } from "lib/dictionary";
import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/image";

// ── ISR: revalidate every 60 seconds ─────────────────────────────────────────
export const revalidate = 60;

// ── Types ─────────────────────────────────────────────────────────────────────
interface SanityPost {
  title: string;
  slug: { current: string };
  excerpt: string | null;
  publishedAt: string | null;
  mainImage: (SanityImageSource & { alt?: string }) | null;
  category: { title: string; slug: { current: string } } | null;
}

interface HomePageData {
  heroPost: SanityPost | null;
  carouselPosts: SanityPost[] | null;
  subHeroPosts: SanityPost[] | null;
  editorialPosts?: SanityPost[];
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

  const data: HomePageData | null = await client.fetch(HOME_PAGE_QUERY);

  // ── Slot aliases from singleton – all optional-chained for safety ──────────
  const heroPost      = data?.heroPost ?? null;
  const sidePosts     = data?.subHeroPosts ?? [];
  const sidePost1     = sidePosts[0] ?? null;
  const sidePost2     = sidePosts[1] ?? null;
  const sidePost3     = sidePosts[2] ?? null;
  const carouselPosts = data?.carouselPosts ?? [];
  const massiveLeft   = data?.editorialPosts?.[0] ?? null;
  const massiveRight  = data?.editorialPosts?.[1] ?? null;

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 w-[95%] mt-6 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left Column: Giant Feature Card ── */}
          {heroPost ? (
            <Link
              href={`/${lang}/post/${heroPost?.slug?.current || ""}`}
              className="lg:col-span-7 flex flex-col gap-4 group cursor-pointer"
            >
              <div className="relative w-full aspect-video md:aspect-[16/9] overflow-hidden rounded-xl">
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
              <div className="flex flex-col gap-2 mt-3">
                <h2 className="text-xl md:text-4xl font-bold font-sans tracking-tight leading-tight">
                  {heroPost.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2">
                  {heroPost.excerpt}
                </p>
              </div>
            </Link>
          ) : (
            <article className="lg:col-span-7 flex flex-col gap-4 group cursor-pointer">
              <div className="relative w-full aspect-video md:aspect-[16/9] overflow-hidden rounded-xl bg-[#8B1A1A]" />
              <div className="flex flex-col gap-2 mt-3">
                <h2 className="text-xl md:text-4xl font-bold font-sans tracking-tight leading-tight">
                  Long Topic of the News
                </h2>
                <p className="text-muted-foreground line-clamp-2">
                  Short Preview adopted for SEO. Short Preview adopted for SEO.
                  Short Preview adopted for SEO. Short Preview adopted for SEO.
                </p>
              </div>
            </article>
          )}

          {/* ── Right Column: Three Small Preview Cards ── */}
          <aside className="lg:col-span-5 flex flex-col gap-8">
            {[sidePost1, sidePost2, sidePost3].map((post, index) =>
              post ? (
                <Link
                  key={post?.slug?.current ?? `side-${index}`}
                  href={`/${lang}/post/${post?.slug?.current || ""}`}
                  className="flex flex-row items-stretch gap-4 group cursor-pointer"
                >
                  <div className="relative shrink-0 w-28 md:w-32 aspect-[4/3] md:aspect-square overflow-hidden rounded-xl">
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
                  <div className="flex flex-col h-full gap-1">
                    <h3 className="text-base md:text-base font-bold font-sans leading-tight">
                      {post.title}
                    </h3>
                    <p className="hidden md:block md:line-clamp-4 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto text-[10px] md:text-[11px] text-muted-foreground uppercase flex flex-wrap gap-1.5 md:gap-2 items-center leading-none">
                      <span>{post?.category?.title}</span>
                      <span className="text-[8px]">•</span>
                      <span>{post?.publishedAt ? new Date(post.publishedAt).toLocaleDateString('kk-KZ') : ''}</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div key={`ph-side-${index}`} className="flex flex-row items-stretch gap-4 group cursor-pointer">
                  <div className="relative shrink-0 w-28 md:w-32 aspect-[4/3] md:aspect-square overflow-hidden rounded-xl bg-[#8B1A1A]" />
                  <div className="flex flex-col h-full gap-1">
                    <h3 className="text-base md:text-base font-bold font-sans leading-tight">Short Topic of the News</h3>
                    <p className="hidden md:block md:line-clamp-4 text-muted-foreground">
                      Short Preview adopted for SEO. Short Preview adopted for SEO. Short Preview adopted for SEO.
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5 md:gap-2 items-center leading-none">
                      <div className="h-2 w-16 rounded bg-muted" />
                      <span className="text-[8px] text-muted-foreground">•</span>
                      <div className="h-2 w-14 rounded bg-muted" />
                    </div>
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
            ? carouselPosts.map((post, index) => (
                <Link
                  key={post?.slug?.current ?? `carousel-${index}`}
                  href={`/${lang}/post/${post?.slug?.current || ""}`}
                  className="flex flex-col gap-3 w-[85vw] md:w-[300px] snap-start cursor-pointer group shrink-0"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#8B1A1A]">
                    {getImageUrl(post?.mainImage, 300, 375) && (
                      <Image
                        src={getImageUrl(post?.mainImage, 300, 375)!}
                        alt={post?.mainImage?.alt ?? post?.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase">
                    {post?.category?.title ?? ""}
                  </p>
                  <h4 className="text-lg font-bold font-sans leading-tight">{post?.title}</h4>
                </Link>
              ))
            : [0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-3 w-[85vw] md:w-[300px] snap-start cursor-pointer group shrink-0">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#8B1A1A]" />
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Category Category&apos;s name</p>
                  <h4 className="text-lg font-bold font-sans leading-tight">Topic of the News</h4>
                </div>
              ))}
        </div>
      </section>

      {/* ── Stage 4: Massive Omanko Style Cards ── */}
      <section className="max-w-7xl mx-auto w-[95%] mt-16 mb-8 md:mb-12 px-4">
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
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                  {massiveLeft?.category?.title ?? ""}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{massiveLeft?.title}</h3>
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
              {getImageUrl(massiveRight?.mainImage, 800, 1000) && (
                <Image
                  src={getImageUrl(massiveRight?.mainImage, 800, 1000)!}
                  alt={massiveRight?.mainImage?.alt ?? massiveRight?.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-2">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                  {massiveRight?.category?.title ?? ""}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{massiveRight?.title}</h3>
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
