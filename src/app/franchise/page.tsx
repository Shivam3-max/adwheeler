import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import IndiaMap from "@/components/IndiaMap";
import FranchiseForm from "@/components/FranchiseForm";

export const metadata: Metadata = {
  title: "Franchise",
  description: "Bring AD Wheeler to your city — turnkey electric LED fleet, a proven booking model and full support.",
};

const HIGHLIGHTS = [
  { k: "Exclusive", l: "City territory", d: "A protected zone and first-mover advantage in your market." },
  { k: "Turnkey", l: "Fleet & setup", d: "Vehicles, screens and tracking — delivered road-ready." },
  { k: "₹9K / ₹5K", l: "Proven pricing", d: "The simple full-day and slot model, ready to sell." },
  { k: "Full", l: "Training & support", d: "Sales playbook, creative help and central operations." },
];

const SUPPORT = [
  { t: "Turnkey fleet", d: "Electric LED vehicles delivered, wrapped and connected." },
  { t: "Live tracking", d: "The GPS platform to run, monitor and prove every campaign." },
  { t: "Sales playbook", d: "Pricing, pitch and proven ad-sales training from day one." },
  { t: "Central ops", d: "Creative handling, maintenance guidance and ongoing support." },
  { t: "Brand power", d: "The AD Wheeler name, marketing assets and shared leads." },
  { t: "Simple model", d: "Just two products to sell — full-day and slots. Easy to run." },
];

const FAQ = [
  { q: "Do I need advertising experience?", a: "No. Our training and playbook cover sales, operations and creative from day one." },
  { q: "How does the money work?", a: "You sell the two simple products — full-day bookings at ₹9,000 and slots at ₹5,000 — across your city's evening runs." },
  { q: "Who handles the technology?", a: "We do. You get the tracking platform fully managed; you focus on local sales and running the fleet." },
  { q: "How are territories allocated?", a: "Exclusive city zones, first come, first served — Panchkula & Tricity are already ours, the rest of India is open." },
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Franchise"
        title={<>Bring AD Wheeler <span className="text-gradient">to your city.</span></>}
        sub="We've proven the model in Panchkula and the Tricity. Now we're handing the keys to partners across India — turnkey fleet, simple pricing, full support."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#apply" className="btn btn-primary">Apply now</a>
          <a href="#territories" className="btn btn-ghost">See open territories</a>
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

      {/* territories */}
      <section id="territories" className="section">
        <div className="wrap">
          <Reveal className="max-w-xl mb-12">
            <p className="eyebrow mb-4">Open territories</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)]">Claim your city before someone else does.</h2>
          </Reveal>
          <Reveal><IndiaMap /></Reveal>
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
