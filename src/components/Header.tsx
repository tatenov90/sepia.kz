import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Header({ lang }: { lang: string }) {
  const navLinks = [
    { label: "Maqalalar", href: `/${lang}` },
    { label: "Keister", href: `/${lang}` },
    { label: "Biz Turaly", href: `/${lang}` },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl bg-background/70 backdrop-blur-md border border-border rounded-full shadow-sm">
      <nav className="grid grid-cols-3 items-center w-full px-8 py-4">

        {/* ── Left Column: Navigation links ── */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Center Column: Graphic logo, pinned to screen center ── */}
        <Link href={`/${lang}`} className="justify-self-center">
          <Image src="/logo.svg" alt="Sepia" width={120} height={60} priority />
        </Link>

        {/* ── Right Column: Search icon + CTA button ── */}
        <div className="justify-self-end flex items-center gap-4">
          <Search
            size={20}
            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Іздеу"
          />
          <Link href={`/${lang}/agency`} tabIndex={-1}>
            <Button size="sm" variant="outline">
              Seriktestik
            </Button>
          </Link>
          {/* <LanguageSwitcher /> — hidden for MVP Phase 1 */}
        </div>

      </nav>
    </header>
  );
}
