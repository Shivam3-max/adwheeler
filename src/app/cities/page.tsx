import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import IndiaMap from "@/components/IndiaMap";
import CTABand from "@/components/CTABand";
import { CITIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cities",
  description: "Where AD Wheeler runs today and where it's headed next across India.",
};

export default function CitiesPage() {
  const live = CITIES.filter((c) => c.status === "live");
  const soon = CITIES.filter((c) => c.status === "soon");

  return (
    <>
      <PageHero
        eyebrow="Cities"
        title={<>Rooted in Tricity. <span className="text-gradient">Rolling out nationwide.</span></>}
        sub="Hover the map to see what's live and what's coming next as the network expands city by city."
      />

      <section className="section pt-4">
        <div className="wrap">
          <Reveal><IndiaMap /></Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="mb-8">
            <p className="eyebrow mb-3">Live now</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">On the road today.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {live.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 70} className="card p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <span className="chip !text-amber !border-[var(--amber)]/40"><span className="dot" style={{ background: "var(--amber)" }} /> Live</span>
                  {c.hq && <span className="font-mono text-[0.6rem] text-[var(--faint)]">HQ</span>}
                </div>
                <h3 className="text-xl group-hover:text-amber transition-colors">{c.name}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{c.state}</p>
                <p className="text-sm text-[var(--ink-dim)] mt-3">{c.note}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mb-8">
            <p className="eyebrow mb-3">Coming soon</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">Next on the roadmap.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {soon.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 60} className="card p-6 group">
                <span className="chip !text-cyan !border-[var(--cyan)]/40">Soon</span>
                <h3 className="text-xl mt-4 group-hover:text-cyan transition-colors">{c.name}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{c.state}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Don't see your city?" sub="Franchise partners bring AD Wheeler to new cities first." primary={{ label: "Request your city", href: "/contact" }} secondary={{ label: "Become a partner", href: "/franchise" }} />
    </>
  );
}
