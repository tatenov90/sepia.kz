import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";

export default function Header({ lang }: { lang: string }) {
  const navLinks = [
    { label: "Maqalalar", href: `/${lang}` },
    { label: "Keister", href: `/${lang}` },
    { label: "Biz Turaly", href: `/${lang}` },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl bg-background/70 backdrop-blur-md border border-border rounded-full shadow-sm">

      {/* ── Mobile Header (hidden on md+) ── */}
      <div className="flex md:hidden justify-between items-center w-full px-5 py-3 relative">
        {/* Left: Hamburger — opens full-screen Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Мәзір" className="text-foreground">
              <Menu size={24} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-full h-full sm:w-full sm:max-w-full flex flex-col justify-start pt-16 px-6 bg-background border-0 [&>button:first-of-type]:bg-black/5 [&>button:first-of-type]:backdrop-blur-sm [&>button:first-of-type]:border [&>button:first-of-type]:border-black/10 [&>button:first-of-type]:rounded-full [&>button:first-of-type]:text-foreground [&>button:first-of-type]:hover:bg-black/10 [&>button:first-of-type]:transition [&>button:first-of-type]:p-1.5"
          >
            {/* Sheet header: Logo + Search — mirrors the desktop controls */}
            <div className="flex items-center justify-between mb-6">
              {/* Duplicated graphic logo — explicit #A02020 fill is baked into logo.svg */}
              <Link href={`/${lang}`}>
                <Image
                  src="/logo.svg"
                  alt="Sepia"
                  width={120}
                  height={70}
                  priority
                  className=""
                />
              </Link>

              {/* Duplicated search icon — explicitly black, no red/muted classes */}
              <button aria-label="Іздеу" className="text-muted-foreground hover:text-foreground transition-colors">
                <Search size={24} />
              </button>
            </div>

            {/* Top: Navigation links */}
            <nav className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.label}>
                  <Link
                    href={link.href}
                    className="text-3xl font-bold tracking-tight text-foreground py-2"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            {/* Bottom: Partnership CTA */}
            <SheetClose asChild>
              <Link
                href={`/${lang}/agency`}
                className="w-full bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background transition-colors py-6 rounded-full text-lg font-medium text-center mt-12"
              >
                Seriktestik
              </Link>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {/* Center: SVG logo — absolutely centered so it is unaffected by icon widths */}
        <Link href={`/${lang}`} className="absolute left-1/2 -translate-x-1/2">
          <Image src="/logo.svg" alt="Sepia." width={90} height={40} priority />
        </Link>

        {/* Right: Search icon — mirrors desktop styling, no red */}
        <button aria-label="Іздеу" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <Search size={22} />
        </button>
      </div>

      {/* ── Desktop Header (hidden below md) ── */}
      <nav className="hidden md:grid grid-cols-3 items-center w-full px-8 py-4">

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
