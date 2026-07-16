import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";
import { SOLUTIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Purpose-built mobile advertising playbooks for every industry.",
};

const DETAIL: Record<string, { problem: string; solution: string; reach: string; roi: string }> = {
  retail: { problem: "Foot traffic is unpredictable and static ads miss the moment.", solution: "Hyperlocal loops around your store during peak shopping hours.", reach: "2–4 L / week", roi: "+30–40% walk-ins" },
  "real-estate": { problem: "Buyers rarely see your project until it's too late.", solution: "Geo-fenced routes past competitor sites and arterial roads.", reach: "4–6 L / week", roi: "300–500 site visits" },
  healthcare: { problem: "Awareness drives need dense, trusted, city-wide reach.", solution: "Saturation routing through residential and hospital corridors.", reach: "5–7 L / week", roi: "Full geo-verified cover" },
  restaurants: { problem: "Hunger is a moment — static ads can't time it.", solution: "Dayparted creatives routed to office and party hubs at meal times.", reach: "2–3 L / week", roi: "1.8–2.2× orders" },
  political: { problem: "Constituency saturation is hard to prove to stakeholders.", solution: "Ward-level routing with GPS proof-of-coverage reports.", reach: "3–5 L / week", roi: "90%+ ward coverage" },
  education: { problem: "Admission windows are short and hyper-competitive.", solution: "Campus and coaching-corridor routing during admission season.", reach: "3–4 L / week", roi: "Peak-season lift" },
  luxury: { problem: "Premium audiences ignore mass media.", solution: "Curated routes through affluent neighbourhoods and valet zones.", reach: "1–2 L / week", roi: "High-intent reach" },
  events: { problem: "Ticket sales need urgency and crowd-following.", solution: "Countdown creatives that follow the crowd to the venue.", reach: "2–4 L / week", roi: "Sell-out momentum" },
  government: { problem: "Public campaigns need auditable, honest delivery.", solution: "Geo-tagged public-service routing with full reporting.", reach: "5–8 L / week", roi: "Auditable delivery" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>One fleet. <span className="text-gradient">Nine playbooks.</span></>}
        sub="Every industry moves differently. So do our routes, creatives and reporting."
      />

      <section className="section pt-4">
        <div className="wrap space-y-4">
          {SOLUTIONS.map((s, i) => {
            const d = DETAIL[s.slug];
            return (
              <Reveal key={s.slug} delay={(i % 2) * 60}>
                <div className="card card-glow group grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center p-7 md:p-9">
                  <div className="card-glow" />
                  <div className="flex items-center gap-5">
                    <span className="grid place-items-center w-14 h-14 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-amber shrink-0">
                      <Icon name={s.icon} />
                    </span>
                    <div className="md:hidden">
                      <h3 className="text-xl">{s.title}</h3>
                    </div>
                  </div>
                  <div>
                    <h3 className="hidden md:block text-2xl mb-3 group-hover:text-amber transition-colors">{s.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <p className="text-[var(--muted)]"><span className="text-[var(--faint)] font-mono text-[0.65rem] uppercase tracking-wider block mb-0.5">Problem</span>{d.problem}</p>
                      <p className="text-[var(--ink-dim)]"><span className="text-[var(--faint)] font-mono text-[0.65rem] uppercase tracking-wider block mb-0.5">Our move</span>{d.solution}</p>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-6 md:gap-3 md:text-right shrink-0">
                    <div>
                      <p className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--faint)]">Reach</p>
                      <p className="font-display text-lg text-amber">{d.reach}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--faint)]">Typical ROI</p>
                      <p className="font-display text-lg text-cyan">{d.roi}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTABand title="Which playbook fits your brand?" primary={{ label: "Plan a campaign", href: "/campaign-planner" }} secondary={{ label: "Talk to us", href: "/contact" }} />
    </>
  );
}
