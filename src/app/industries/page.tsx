import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";
import { INDUSTRIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description: "The sectors already moving their brands through the city with AD Wheeler.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Built for the brands <span className="text-gradient">that move.</span></>}
        sub="From corner stores to national launches — pick your sector and see how the streets can work for you."
      />

      <section className="section pt-4">
        <div className="wrap grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80}>
              <Link href="/solutions" className="card card-glow group relative block p-8 h-full overflow-hidden">
                <div className="card-glow" />
                <div className="pointer-events-none absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl bg-[rgba(255,158,27,0.08)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="grid place-items-center w-12 h-12 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-amber mb-8">
                  <Icon name={s.icon} />
                </span>
                <h3 className="text-2xl mb-2 group-hover:text-amber transition-colors">{s.title}</h3>
                <p className="text-sm text-[var(--muted)] mb-6">{s.blurb}</p>
                <span className="inline-flex items-center gap-2 text-sm text-[var(--ink-dim)] group-hover:text-amber transition-colors">
                  Explore
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
