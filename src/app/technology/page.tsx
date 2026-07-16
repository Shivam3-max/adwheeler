import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";
import Dashboard from "@/components/home/Dashboard";
import { TECH_FEATURES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technology",
  description: "The platform behind the fleet — live GPS, heatmaps, proof-of-performance and AI routing.",
};

const ICONS = ["route", "chart", "eye", "bolt", "building", "chart"];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title={<>The platform behind <span className="text-gradient">every impression.</span></>}
        sub="Hardware you can see, software you can trust. Every route, every second, every screen — measured."
      />

      {/* dashboard preview reused */}
      <Dashboard />

      {/* feature grid */}
      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="max-w-xl mb-12">
            <p className="eyebrow mb-4">The stack</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)]">Six systems, one dashboard.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80} className="card card-glow p-8">
                <div className="card-glow" />
                <div className="flex items-center justify-between mb-8">
                  <span className="grid place-items-center w-12 h-12 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-cyan">
                    <Icon name={ICONS[i]} />
                  </span>
                  <span className="chip !text-[0.6rem]">{f.tag}</span>
                </div>
                <h3 className="text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--muted)]">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="max-w-xl mb-12">
            <p className="eyebrow mb-4">Data flow</p>
            <h2 className="display text-[clamp(1.8rem,4.5vw,3.2rem)]">Vehicle to boardroom.</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { t: "Capture", d: "GPS, IMU and cameras log position and proof photos on-route." },
              { t: "Stream", d: "4G pushes telemetry to the cloud at 10Hz, live." },
              { t: "Model", d: "AI weights dwell, density and time into true impressions." },
              { t: "Report", d: "Dashboards and board-ready PDFs, updated continuously." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 80} className="card p-7">
                <span className="font-display text-5xl text-[var(--faint)]">{i + 1}</span>
                <h3 className="text-lg mt-5 mb-1">{s.t}</h3>
                <p className="text-sm text-[var(--muted)]">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="See the platform in action." primary={{ label: "Book a demo", href: "/contact" }} secondary={{ label: "Plan a campaign", href: "/campaign-planner" }} />
    </>
  );
}
