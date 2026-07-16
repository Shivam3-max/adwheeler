import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission and infrastructure behind India's first smart mobile advertising network.",
};

const TIMELINE = [
  { year: "2021", title: "The idea", desc: "A single LED e-rickshaw looped Chandigarh's Sector 17. Brands noticed." },
  { year: "2022", title: "First fleet", desc: "12 vehicles, one city, and the first GPS-tracked campaigns." },
  { year: "2023", title: "The platform", desc: "Live tracking, heatmaps and proof-of-performance went online." },
  { year: "2024", title: "Multi-city", desc: "Expansion across the Tricity, Delhi NCR and Jaipur." },
  { year: "2026", title: "AD Wheeler 2.0", desc: "AI routing, franchise network and 240+ smart vehicles nationwide." },
];

const VALUES = [
  { t: "Attention, engineered", d: "We don't sell metal. We sell the seconds a brand lives in someone's mind." },
  { t: "Proof over promises", d: "Every impression is geo-tagged and time-stamped. No faith required." },
  { t: "Clean by design", d: "Electric fleet, silent routes, zero-emission visibility." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>We turned the street <span className="text-gradient">into a screen.</span></>}
        sub="AD Wheeler is building the infrastructure for India's mobile, measurable, out-of-home advertising — one electric vehicle at a time."
      />

      {/* Story */}
      <section className="section">
        <div className="wrap grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <p className="eyebrow mb-5">The story</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)] mb-6">
              Billboards stand still. Cities don&apos;t.
            </h2>
            <div className="space-y-4 text-[var(--ink-dim)]">
              <p>
                Traditional outdoor advertising asks a brand to wait — for the right
                person to walk past the right wall. We flipped it. Our fleet takes the
                message to where the crowds actually are, hour by hour.
              </p>
              <p>
                What started as one glowing rickshaw is now a GPS-orchestrated network
                of electric LED vehicles, backed by a platform that proves every rupee
                of reach. That&apos;s AD Wheeler 2.0.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            {[
              { n: 240, s: "+", l: "Smart vehicles" },
              { n: 18, s: "+", l: "Cities live" },
              { n: 380, s: "+", l: "Brands served" },
              { n: 42, s: "L", l: "Daily eyeballs" },
            ].map((k) => (
              <div key={k.l} className="card p-6">
                <p className="font-display text-4xl text-amber"><Counter to={k.n} suffix={k.s} /></p>
                <p className="text-sm text-[var(--muted)] mt-2">{k.l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section">
        <div className="wrap grid md:grid-cols-2 gap-4">
          {[
            { tag: "Mission", h: "Make outdoor advertising measurable, mobile and clean.", d: "Give every brand — from a corner store to a national launch — a fair shot at the streets, with data to prove it worked." },
            { tag: "Vision", h: "A living advertising grid across every Indian city.", d: "Thousands of electric screens moving intelligently through traffic, orchestrated by software and owned by local partners." },
          ].map((c) => (
            <Reveal key={c.tag} className="card card-glow p-9">
              <div className="card-glow" />
              <p className="eyebrow mb-4">{c.tag}</p>
              <h3 className="text-2xl mb-3">{c.h}</h3>
              <p className="text-[var(--muted)]">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="wrap">
          <Reveal className="max-w-xl mb-12">
            <p className="eyebrow mb-4">What we believe</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)]">Three principles, no compromise.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 90} className="card p-8">
                <span className="font-display text-5xl text-[var(--faint)]">0{i + 1}</span>
                <h3 className="text-xl mt-6 mb-2">{v.t}</h3>
                <p className="text-sm text-[var(--muted)]">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="wrap">
          <Reveal className="max-w-xl mb-14">
            <p className="eyebrow mb-4">Timeline</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)]">From one rickshaw to a network.</h2>
          </Reveal>
          <div className="relative border-l border-[var(--line)] ml-3">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 60} className="relative pl-10 pb-12 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--amber)] shadow-[0_0_16px_var(--amber-glow)]" />
                <span className="font-mono text-sm text-amber">{t.year}</span>
                <h3 className="text-2xl mt-1 mb-2">{t.title}</h3>
                <p className="text-[var(--muted)] max-w-lg">{t.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Want to build the streets with us?" secondary={{ label: "See careers", href: "/contact" }} />
    </>
  );
}
