import Link from "next/link";

const PHRASES = [
  { t: "Your ad here", cta: false },
  { t: "Book your ad now", cta: true },
  { t: "Your brand, on the move", cta: false },
  { t: "This could be your ad", cta: false },
  { t: "Put your brand on AdWheeler", cta: true },
  { t: "Reach the whole city", cta: false },
  { t: "Go live tonight · 4–10 PM", cta: false },
];

export default function Marquee() {
  const items = [...PHRASES, ...PHRASES];
  return (
    <div className="relative overflow-hidden py-8 border-y border-[var(--line)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      <div className="marquee">
        {items.map((p, i) => (
          <Link
            key={i}
            href="/campaign-planner"
            className={`font-display text-xl md:text-2xl font-medium whitespace-nowrap flex items-center gap-3 transition-colors ${
              p.cta ? "text-amber hover:opacity-80" : "text-[var(--faint)] hover:text-[var(--ink)]"
            }`}
          >
            {p.t}
            <span className="dot opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  );
}
