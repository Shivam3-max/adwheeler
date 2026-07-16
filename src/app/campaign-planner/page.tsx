"use client";

import { useMemo, useState } from "react";
import { CITIES, SOLUTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const GOALS = ["Awareness", "Footfall", "Launch", "Leads", "Saturation"];
const DURATIONS = [
  { label: "1 week", weeks: 1 },
  { label: "2 weeks", weeks: 2 },
  { label: "4 weeks", weeks: 4 },
  { label: "8 weeks", weeks: 8 },
];

const STEPS = ["City", "Industry", "Goal", "Fleet & duration", "Estimate"];

function inr(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
}

export default function CampaignPlanner() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState(4);
  const [weeks, setWeeks] = useState(2);
  const [sent, setSent] = useState(false);

  const estimate = useMemo(() => {
    const perVehicleWeek = 22000;
    const gross = vehicles * perVehicleWeek * weeks;
    const impressions = vehicles * 55000 * (weeks * 6); // per week ~6 operating "days-equiv"
    const cpm = (gross / impressions) * 1000;
    return { gross, impressions, cpm };
  }, [vehicles, weeks]);

  const canNext =
    (step === 0 && city) ||
    (step === 1 && industry) ||
    (step === 2 && goal) ||
    step === 3 ||
    step === 4;

  return (
    <>
      <section className="relative pt-40 pb-10 md:pt-48 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="wrap relative">
          <p className="eyebrow mb-6">Campaign planner</p>
          <h1 className="display text-[clamp(2.4rem,6.5vw,5rem)] max-w-3xl">
            Build your campaign <span className="text-gradient">in a minute.</span>
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap max-w-3xl">
          {/* progress */}
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={cn("h-1 rounded-full transition-colors duration-500", i <= step ? "bg-[var(--amber)]" : "bg-[var(--surface-2)]")} />
                <p className={cn("mt-2 text-xs font-mono hidden sm:block", i === step ? "text-amber" : "text-[var(--faint)]")}>{s}</p>
              </div>
            ))}
          </div>

          <div className="card p-7 md:p-10 min-h-[360px]">
            {step === 0 && (
              <Step title="Where should your brand move?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {CITIES.map((c) => (
                    <Choice key={c.name} active={city === c.name} onClick={() => setCity(c.name)} label={c.name} sub={c.state} />
                  ))}
                </div>
              </Step>
            )}

            {step === 1 && (
              <Step title="What's your industry?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {SOLUTIONS.map((s) => (
                    <Choice key={s.slug} active={industry === s.title} onClick={() => setIndustry(s.title)} label={s.title} />
                  ))}
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step title="What's the goal?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {GOALS.map((g) => (
                    <Choice key={g} active={goal === g} onClick={() => setGoal(g)} label={g} />
                  ))}
                </div>
              </Step>
            )}

            {step === 3 && (
              <Step title="Fleet size & duration">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">Vehicles</span>
                    <span className="text-amber font-medium">{vehicles}</span>
                  </div>
                  <input type="range" min={1} max={30} value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} className="w-full accent-[var(--amber)]" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)] block mb-3">Duration</span>
                  <div className="grid grid-cols-4 gap-2">
                    {DURATIONS.map((d) => (
                      <Choice key={d.label} active={weeks === d.weeks} onClick={() => setWeeks(d.weeks)} label={d.label} />
                    ))}
                  </div>
                </div>
              </Step>
            )}

            {step === 4 && !sent && (
              <Step title="Your indicative estimate">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <Big k="Investment" v={inr(estimate.gross)} accent />
                  <Big k="Est. impressions" v={`${(estimate.impressions / 100000).toFixed(1)} L`} />
                  <Big k="CPM" v={`₹${estimate.cpm.toFixed(0)}`} />
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-5 mb-6 text-sm text-[var(--muted)] space-y-1">
                  <p><span className="text-[var(--faint)]">City:</span> {city} &nbsp;·&nbsp; <span className="text-[var(--faint)]">Industry:</span> {industry}</p>
                  <p><span className="text-[var(--faint)]">Goal:</span> {goal} &nbsp;·&nbsp; <span className="text-[var(--faint)]">Fleet:</span> {vehicles} vehicles for {weeks} week(s)</p>
                </div>
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  <input required placeholder="Your name" className="input" />
                  <input required type="tel" placeholder="Phone" className="input" />
                  <input required type="email" placeholder="Email" className="input sm:col-span-2" />
                  <button className="btn btn-primary sm:col-span-2 justify-center">Get my proposal</button>
                </form>
              </Step>
            )}

            {step === 4 && sent && (
              <div className="h-full grid place-items-center text-center py-10">
                <div>
                  <div className="mx-auto w-16 h-16 rounded-full grid place-items-center bg-[rgba(56,229,223,0.12)] border border-[var(--cyan)]/40 mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="display text-3xl mb-2">Proposal on its way.</h3>
                  <p className="text-[var(--muted)] max-w-sm mx-auto">Our team will call you within one business day with a routed, costed plan.</p>
                </div>
              </div>
            )}
          </div>

          {/* nav */}
          {!(step === 4 && sent) && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={cn("btn btn-ghost", step === 0 && "opacity-0 pointer-events-none")}
              >
                Back
              </button>
              {step < 4 && (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                  className={cn("btn btn-primary", !canNext && "opacity-40 pointer-events-none")}
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <style>{`.input{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:0.85rem 1rem;color:var(--ink);font-family:var(--font-body);outline:none;transition:border-color .3s}.input:focus{border-color:var(--amber)}.input::placeholder{color:var(--faint)}`}</style>
    </>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="display text-2xl md:text-3xl mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Choice({ active, onClick, label, sub }: { active: boolean; onClick: () => void; label: string; sub?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-left px-4 py-3 rounded-xl border transition-all",
        active ? "border-[var(--amber)] bg-[rgba(255,158,27,0.08)] text-[var(--ink)]" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
      )}
    >
      <span className="block text-sm">{label}</span>
      {sub && <span className="block text-xs text-[var(--faint)]">{sub}</span>}
    </button>
  );
}

function Big({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-5 text-center">
      <p className="font-mono text-[0.58rem] uppercase tracking-wider text-[var(--faint)]">{k}</p>
      <p className={cn("font-display text-2xl mt-1", accent ? "text-amber" : "text-[var(--ink)]")}>{v}</p>
    </div>
  );
}
