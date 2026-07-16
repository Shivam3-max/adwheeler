import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RoiCalculator from "@/components/RoiCalculator";
import { GlobeCanvas } from "@/components/three/Lazy";
import FranchiseForm from "@/components/FranchiseForm";

export const metadata: Metadata = {
  title: "Franchise",
  description: "Own an AD Wheeler territory — turnkey fleet, technology and playbook.",
};

const HIGHLIGHTS = [
  { k: "From ₹18 L", l: "Entry investment", d: "Starter territory with a small fleet." },
  { k: "12–16 mo", l: "Typical payback", d: "Indicative, varies by city & contracts." },
  { k: "45–55%", l: "Operating margin", d: "After fleet, power and ops costs." },
  { k: "Exclusive", l: "Territory rights", d: "Protected zones, first-mover advantage." },
];

const SUPPORT = [
  { t: "Turnkey fleet", d: "Vehicles delivered, wrapped, road-ready and connected." },
  { t: "The platform", d: "Full access to tracking, analytics and reporting tools." },
  { t: "Sales playbook", d: "Pitch decks, pricing models and proven ad-sales training." },
  { t: "Central ops", d: "Creative validation, maintenance network and 24/7 support." },
  { t: "Brand power", d: "National brand, marketing assets and lead sharing." },
  { t: "Ongoing R&D", d: "Hardware and software upgrades pushed to your fleet." },
];

const FAQ = [
  { q: "How much space do I need?", a: "A modest depot for charging and parking — roughly 1,500 sq ft for a starter fleet." },
  { q: "Do I need advertising experience?", a: "No. Our training and playbook cover sales, ops and creative from day one." },
  { q: "Who handles the technology?", a: "We do. You get the platform fully managed; you focus on local sales and ops." },
  { q: "How are territories allocated?", a: "Exclusive, population-weighted zones — first come, first served within each city." },
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Franchise"
        title={<>Own a slice of the <span className="text-gradient">moving grid.</span></>}
        sub="Bring India's smartest advertising network to your city — with a turnkey fleet, a proven platform and a playbook that works."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#apply" className="btn btn-primary">Apply now</a>
          <a href="#roi" className="btn btn-ghost">Run the numbers</a>
        </div>
      </PageHero>

      {/* highlights */}
      <section className="section pt-4">
        <div className="wrap grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.l} delay={i * 70} className="card p-7">
              <p className="font-display text-3xl md:text-4xl text-amber">{h.k}</p>
              <p className="text-sm text-[var(--ink)] mt-2">{h.l}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{h.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ROI + globe */}
      <section id="roi" className="section">
        <div className="wrap grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">The economics</p>
              <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)] mb-5">Model your return.</h2>
              <p className="text-[var(--ink-dim)] max-w-md mb-8">
                Drag the sliders to see how fleet size, day rate and utilisation shape
                your revenue and payback. Territories light up worldwide — India first.
              </p>
            </Reveal>
            <Reveal delay={120} className="relative h-64 md:h-80">
              <GlobeCanvas />
            </Reveal>
          </div>
          <Reveal delay={80}><RoiCalculator /></Reveal>
        </div>
      </section>

      {/* support */}
      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="max-w-xl mb-12">
            <p className="eyebrow mb-4">What you get</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)]">A business in a box.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPPORT.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 80} className="card p-7">
                <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg mt-3 mb-1">{s.t}</h3>
                <p className="text-sm text-[var(--muted)]">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* apply + FAQ */}
      <section id="apply" className="section pt-0">
        <div className="wrap grid lg:grid-cols-[1fr_1fr] gap-10">
          <Reveal>
            <p className="eyebrow mb-4">Apply</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)] mb-6">Start your territory.</h2>
            <FranchiseForm />
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)] mb-6">Good questions.</h2>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="card p-6 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-lg pr-4">{f.q}</span>
                    <span className="text-amber text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-sm text-[var(--muted)] mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
