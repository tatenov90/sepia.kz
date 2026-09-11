import { getDictionary } from "lib/dictionary";
import type { Locale } from "lib/dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  await getDictionary(lang);

  const smallCards = [
    {
      title: "Short Topic of the News",
      description:
        "Short Preview adopted for SEO. Short Preview adopted for SEO. Short Preview adopted for SEO.",
    },
    {
      title: "Short Topic of the News",
      description:
        "Short Preview adopted for SEO. Short Preview adopted for SEO. Short Preview adopted for SEO.",
    },
    {
      title: "Short Topic of the News",
      description:
        "Short Preview adopted for SEO. Short Preview adopted for SEO. Short Preview adopted for SEO.",
    },
  ];

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 w-[95%] mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left Column: Giant Feature Card (spans 2 cols) ── */}
          <article className="lg:col-span-7 flex flex-col gap-4 group cursor-pointer">
            {/* Image Placeholder */}
            <div className="aspect-video w-full rounded-md overflow-hidden bg-[#8B1A1A]" />

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold font-sans tracking-tight leading-tight">
              Long Topic of the News
            </h2>

            {/* SEO Description */}
            <p className="text-muted-foreground mt-2 line-clamp-2">
              Short Preview adopted for SEO. Short Preview adopted for SEO.
              Short Preview adopted for SEO. Short Preview adopted for SEO.
            </p>
          </article>

          {/* ── Right Column: Three Small Preview Cards ── */}
          <aside className="lg:col-span-5 flex flex-col gap-8">
            {smallCards.map((card, index) => (
              <div
                key={index}
                className="flex flex-row gap-4 group cursor-pointer"
              >
                {/* Small Image Placeholder */}
                <div className="w-2/5 shrink-0 aspect-[4/3] rounded-md overflow-hidden bg-[#8B1A1A]" />

                {/* Text Content */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold font-sans leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </aside>

        </div>
      </section>

      {/* ── Stage 3: Sub-Hero Horizontal Carousel ── */}
      <section className="max-w-7xl mx-auto w-[95%] mt-16">
        <div className="flex flex-row gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pr-8 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[0, 1, 2, 3].map((i) => (
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
          <article className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#8B1A1A] group cursor-pointer">
            <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">MARKETING</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">Long Topic of the News</h3>
            </div>
          </article>

          {/* ── Right Card ── */}
          <article className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#8B1A1A] group cursor-pointer">
            <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">MARKETING</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">Long Topic of the News</h3>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}
