"use client";

import { useState } from "react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: "Maqalalar", href: `/${lang}` },
    { label: "Keister", href: `/${lang}` },
    { label: "Biz Turaly", href: `/${lang}` },
  ];

  return (
    /* Positioning anchor — the search panel is absolute relative to this wrapper */
    <div className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl relative">

      {/* ── Main glassmorphism pill — shape is never mutated ── */}
      <header className="rounded-full bg-background/70 backdrop-blur-md border border-border shadow-sm">

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
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-full h-full sm:w-full sm:max-w-full flex flex-col justify-start pt-16 px-6 bg-background border-0 [&>button:first-of-type]:bg-black/5 [&>button:first-of-type]:backdrop-blur-sm [&>button:first-of-type]:border [&>button:first-of-type]:border-black/10 [&>button:first-of-type]:rounded-full [&>button:first-of-type]:text-foreground [&>button:first-of-type]:hover:bg-black/10 [&>button:first-of-type]:transition [&>button:first-of-type]:p-1.5"
          >
            {/* Sheet header: Logo row — compact top spacing */}
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

            </div>

            {/* Static inline search bar */}
            <div className="flex items-center gap-4 w-full mb-8 pt-2">
              <Search size={22} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Izdeu..."
                className="bg-transparent border-none outline-none w-full text-xl font-medium placeholder:text-muted-foreground focus:ring-0"
              />
            </div>

            {/* Navigation links — scrollable if content grows */}
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

        {/* Right: Search icon — lives OUTSIDE the Sheet so it never triggers the hamburger menu */}
        <button
          aria-label="Іздеу"
          className="text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            setIsSearchOpen((prev) => !prev);
          }}
        >
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
          <button
            aria-label="Іздеу"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <Search size={20} />
          </button>
          <Link href={`/${lang}/agency`} tabIndex={-1}>
            <Button size="sm" variant="outline">
              Seriktestik
            </Button>
          </Link>
          {/* <LanguageSwitcher /> — hidden for MVP Phase 1 */}
        </div>

      </nav>

      </header>

      {/* ── Detached Search Panel — floats below the pill, outside it ── */}
      <div
        className={`absolute top-[calc(100%+16px)] left-0 w-full transition-all duration-300 ${
          isSearchOpen
            ? "opacity-100 translate-y-0 visible ease-out"
            : "opacity-0 -translate-y-4 invisible ease-in"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border border-border shadow-lg rounded-full px-8 py-4 w-full flex items-center gap-4">
          {/* Search icon — decorative, left of input */}
          <Search size={28} className="text-muted-foreground shrink-0" />

          {/* Borderless, full-width search input */}
          <input
            type="text"
            placeholder="Izdeu..."
            autoFocus={isSearchOpen}
            className="flex-1 bg-transparent outline-none border-none text-2xl font-medium placeholder:text-muted-foreground/50 focus:ring-0"
          />
        </div>
      </div>

    </div>
  );
}
