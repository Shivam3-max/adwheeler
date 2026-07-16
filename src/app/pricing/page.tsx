import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PRICING } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, flexible plans for mobile LED advertising campaigns.",
};

const FAQ = [
  { q: "What counts as an impression?", a: "A dwell-weighted exposure, modelled from GPS, traffic density and time-of-day — not a flat pass-by." },
  { q: "Can I change creative mid-campaign?", a: "Yes, instantly across the whole fleet, at no extra cost." },
  { q: "Is there a minimum commitment?", a: "The Starter plan runs weekly. Longer commitments unlock better rates." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Plans that scale with <span className="text-gradient">your ambition.</span></>}
        sub="Placeholder pricing for demonstration. Every plan includes GPS tracking, live reporting and proof-of-performance."
      />

      <section className="section pt-4">
        <div className="wrap grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 70}>
              <div className={cn("relative h-full rounded-[26px] border p-7 flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1",
                p.featured ? "border-[var(--amber)]/50 bg-[rgba(255,158,27,0.05)]" : "border-[var(--line)] bg-[var(--surface)]")}>
                {p.featured && (
                  <>
                    <div className="pointer-events-none absolute -top-16 -right-10 w-40 h-40 rounded-full blur-3xl bg-[rgba(255,158,27,0.18)]" />
                    <span className="absolute top-5 right-5 chip !text-amber !border-[var(--amber)]/50">Popular</span>
                  </>
                )}
                <p className="font-display text-xl mb-1">{p.name}</p>
                <p className="text-sm text-[var(--muted)] mb-6 min-h-[40px]">{p.desc}</p>
                <p className="mb-6">
                  <span className="font-display text-3xl md:text-4xl">{p.price}</span>
                  <span className="text-sm text-[var(--muted)]">{p.unit}</span>
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-dim)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-amber"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/campaign-planner" className={cn("btn justify-center", p.featured ? "btn-primary" : "btn-ghost")}>{p.cta}</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap max-w-3xl">
          <Reveal className="mb-8">
            <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">Pricing questions.</h2>
          </Reveal>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <Reveal key={f.q}>
                <details className="card p-6 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-lg pr-4">{f.q}</span>
                    <span className="text-amber text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-sm text-[var(--muted)] mt-3">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
