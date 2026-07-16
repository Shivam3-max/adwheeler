import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import IndiaMap from "@/components/IndiaMap";
import CTABand from "@/components/CTABand";
import { CITIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cities",
  description: "Where the AD Wheeler network moves — live fleet across India's key cities.",
};

export default function CitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cities"
        title={<>The network, <span className="text-gradient">city by city.</span></>}
        sub="Hover the map to explore live coverage, then dive into fleet and reach for each city."
      />

      <section className="section pt-4">
        <div className="wrap">
          <Reveal><IndiaMap /></Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="mb-10">
            <p className="eyebrow mb-3">All markets</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">Twelve cities and counting.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CITIES.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 70} className="card p-6 group">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl group-hover:text-amber transition-colors">{c.name}</h3>
                    <p className="text-xs text-[var(--muted)]">{c.state}</p>
                  </div>
                  <span className={`chip ${c.tier === 1 ? "!text-amber !border-[var(--amber)]/40" : "!text-cyan !border-[var(--cyan)]/40"}`}>
                    Tier {c.tier}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Stat k="Pop." v={c.population} />
                  <Stat k="Reach" v={c.dailyReach} />
                  <Stat k="Fleet" v={String(c.fleet)} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Don't see your city?" sub="We're expanding fast — and franchise partners lead the way." primary={{ label: "Request your city", href: "/contact" }} secondary={{ label: "Become a partner", href: "/franchise" }} />
    </>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--bg)] p-3 text-center">
      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-[var(--faint)]">{k}</p>
      <p className="text-sm mt-0.5 text-[var(--ink)]">{v}</p>
    </div>
  );
}
