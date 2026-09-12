import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BLOG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas on DOOH, mobile advertising, GPS attribution and the future of the street.",
};

const CATS = ["All", "Industry", "Technology", "Playbook", "Franchise"];

export default function BlogPage() {
  const featured = BLOG.find((b) => b.featured) ?? BLOG[0];
  const rest = BLOG.filter((b) => b !== featured);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Notes from <span className="text-gradient">the street.</span></>}
        sub="Playbooks, data and ideas on the future of out-of-home advertising."
      />

      <section className="section pt-4">
        <div className="wrap">
          {/* categories */}
          <Reveal className="flex flex-wrap gap-2 mb-10">
            {CATS.map((c, i) => (
              <button key={c} className={`chip ${i === 0 ? "!text-amber !border-[var(--amber)]/40" : "hover:text-[var(--ink)]"}`}>{c}</button>
            ))}
          </Reveal>

          {/* featured */}
          <Reveal>
            <Link href="/blog" className="card group grid lg:grid-cols-[1.1fr_0.9fr] overflow-hidden mb-6">
              <div className="relative min-h-[280px] bg-gradient-to-br from-[#1358d8] via-[#5b21b6] to-[#0ba7a0]">
                <div className="absolute inset-0 opacity-25 mix-blend-overlay bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.4)_3px)]" />
                <span className="absolute top-5 left-5 chip !bg-black/25 !border-white/25 !text-white">Featured</span>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--faint)] mb-4">
                  <span className="text-amber">{featured.cat}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.read}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-4 group-hover:text-amber transition-colors">{featured.title}</h2>
                <p className="text-[var(--muted)]">A deep dive into why brands are shifting budgets from static hoardings to mobile, measurable screens.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ink-dim)] group-hover:text-amber transition-colors">
                  Read article
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 70}>
                <Link href="/blog" className="card group block overflow-hidden h-full">
                  <div className="relative h-40 bg-[var(--bg-3)] overflow-hidden">
                    <div className="absolute inset-0 grid-lines opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[rgba(255,158,27,0.12)]" />
                    <span className="absolute bottom-4 left-4 font-display text-4xl text-[var(--faint)]">0{i + 1}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--faint)] mb-3">
                      <span className="text-amber">{b.cat}</span><span>·</span><span>{b.read}</span>
                    </div>
                    <h3 className="text-lg leading-snug mb-2 group-hover:text-amber transition-colors">{b.title}</h3>
                    <p className="text-xs text-[var(--muted)]">{b.date}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
