import Image from "next/image";

export interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
}

export default function ArticleCard({
  title,
  excerpt,
  category,
  date,
  imageUrl,
}: ArticleCardProps) {
  return (
    <article className="group flex flex-col md:flex-row gap-4 md:gap-8 cursor-pointer">
      {/* ── Image Container ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 shrink-0 w-full md:w-[40%] aspect-[16/9] md:aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 justify-center py-2 gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-[#23231F] transition-colors group-hover:text-[#A02020] line-clamp-2">
          {title}
        </h2>
        <p className="text-sm md:text-base text-gray-500 line-clamp-3">{excerpt}</p>

        {/* ── Meta Footer ── */}
        <div className="flex items-center flex-wrap gap-2 mt-3 md:mt-4 text-xs md:text-sm">
          <span className="font-bold uppercase tracking-wider text-[#A02020]">
            {category}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{date}</span>
        </div>
      </div>
    </article>
  );
}
