import { Button } from "@/components/ui/button";

interface AgencyPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AgencyPage({ params }: AgencyPageProps) {
  await params;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Headline */}
        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          Content that builds authority.
          <br />
          Distribution that drives results.
        </h1>

        {/* Value proposition */}
        <p className="font-sans text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Sepia is a B2B content studio for companies that need more than
          articles — we produce editorial-grade media, thought leadership, and
          strategic content programs that move decision-makers. No fluff, no
          filler. Just work that earns attention.
        </p>

        {/* Supporting detail */}
        <ul className="font-sans text-base text-muted-foreground space-y-2 text-left inline-block">
          <li>→ Long-form editorial &amp; industry reports</li>
          <li>→ Brand journalism &amp; executive ghostwriting</li>
          <li>→ Content strategy &amp; distribution planning</li>
        </ul>

        {/* CTA */}
        <div className="pt-4">
          <Button
            size="lg"
            nativeButton={false}
            render={
              <a
                href="https://t.me/placeholder"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Talk to us on Telegram
          </Button>
        </div>
      </div>
    </main>
  );
}
