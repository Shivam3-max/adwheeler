"use client";

import { useMemo, useState } from "react";
import { CITIES, BOOKING } from "@/lib/site";
import { cn } from "@/lib/utils";

const STEPS = ["Booking type", "City", "Duration", "Your estimate"];

function inr(n: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
}

export default function CampaignPlanner() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<"full-day" | "slot" | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [days, setDays] = useState(3);
  const [slotsPerDay, setSlotsPerDay] = useState(1);
  const [sent, setSent] = useState(false);

  const estimate = useMemo(() => {
    if (type === "full-day") return 9000 * days;
    if (type === "slot") return 5000 * slotsPerDay * days;
    return 0;
  }, [type, days, slotsPerDay]);

  const canNext =
    (step === 0 && type) || (step === 1 && city) || step === 2 || step === 3;

  return (
    <>
      <section className="relative pt-40 pb-10 md:pt-48 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
        <div className="wrap relative">
          <p className="eyebrow mb-6">Book your ad</p>
          <h1 className="display text-[clamp(2.4rem,6.5vw,5rem)] max-w-3xl">
            Plan it in <span className="text-gradient">under a minute.</span>
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap max-w-3xl">
          {/* progress */}
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={cn("h-1 rounded-full transition-colors duration-500", i <= step ? "bg-[var(--amber)]" : "bg-[var(--bg-3)]")} />
                <p className={cn("mt-2 text-xs font-mono hidden sm:block", i === step ? "text-amber" : "text-[var(--faint)]")}>{s}</p>
              </div>
            ))}
          </div>

          <div className="card p-7 md:p-10 min-h-[360px]">
            {step === 0 && (
              <Step title="How do you want to book?">
                <div className="grid sm:grid-cols-2 gap-3">
                  {BOOKING.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setType(b.id as "full-day" | "slot")}
                      className={cn(
                        "text-left p-6 rounded-2xl border transition-all",
                        type === b.id ? "border-[var(--amber)] bg-[rgba(247,134,26,0.06)]" : "border-[var(--line)] hover:border-[var(--line-strong)]"
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={cn("chip", b.id === "full-day" ? "!text-amber !border-[var(--amber)]/45" : "!text-cyan !border-[var(--cyan)]/40")}>{b.badge}</span>
                      </div>
                      <p className="font-display text-2xl">{b.name}</p>
                      <p className="text-sm text-[var(--muted)] mt-1 mb-4">{b.tagline}</p>
                      <p className="font-display text-3xl text-amber">{b.price}<span className="text-sm text-[var(--muted)] font-body"> {b.unit}</span></p>
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {step === 1 && (
              <Step title="Which city?">
                <div className="grid sm:grid-cols-3 gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setCity(c.name)}
                      className={cn(
                        "text-left px-4 py-3 rounded-xl border transition-all",
                        city === c.name ? "border-[var(--amber)] bg-[rgba(247,134,26,0.06)]" : "border-[var(--line)] hover:border-[var(--line-strong)]"
                      )}
                    >
                      <span className="block text-sm">{c.name}</span>
                      <span className={cn("block text-[0.68rem]", c.status === "live" ? "text-amber" : "text-[var(--faint)]")}>
                        {c.status === "live" ? "Live now" : "Coming soon"}
                      </span>
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step title="For how long?">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">Number of days</span>
                    <span className="text-amber font-medium">{days} {days === 1 ? "day" : "days"}</span>
                  </div>
                  <input type="range" min={1} max={30} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-[var(--amber)]" />
                </div>
                {type === "slot" && (
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)] block mb-3">Slots per day (max 3)</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((n) => (
                        <button key={n} onClick={() => setSlotsPerDay(n)}
                          className={cn("py-3 rounded-xl border transition-all", slotsPerDay === n ? "border-[var(--amber)] bg-[rgba(247,134,26,0.06)] text-amber" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--line-strong)]")}>
                          {n} {n === 1 ? "slot" : "slots"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5 flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">Running estimate</span>
                  <span className="font-display text-2xl text-amber">{inr(estimate)}</span>
                </div>
              </Step>
            )}

            {step === 3 && !sent && (
              <Step title="Your estimate">
                <div className="rounded-2xl border border-[var(--amber)]/40 bg-[rgba(247,134,26,0.05)] p-6 mb-6 text-center">
                  <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--faint)] mb-1">Total (indicative)</p>
                  <p className="font-display text-5xl text-amber">{inr(estimate)}</p>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5 mb-6 text-sm text-[var(--muted)] space-y-1">
                  <p><span className="text-[var(--faint)]">Type:</span> {BOOKING.find((b) => b.id === type)?.name} &nbsp;·&nbsp; <span className="text-[var(--faint)]">City:</span> {city}</p>
                  <p>
                    <span className="text-[var(--faint)]">Duration:</span> {days} day(s)
                    {type === "slot" && <> &nbsp;·&nbsp; <span className="text-[var(--faint)]">Slots/day:</span> {slotsPerDay}</>}
                    &nbsp;·&nbsp; <span className="text-[var(--faint)]">Window:</span> 4–10 PM
                  </p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid sm:grid-cols-2 gap-3">
                  <input required placeholder="Your name" className="field" />
                  <input required type="tel" placeholder="Phone" className="field" />
                  <input required type="email" placeholder="Email" className="field sm:col-span-2" />
                  <button className="btn btn-primary sm:col-span-2 justify-center">Confirm & get a call</button>
                </form>
              </Step>
            )}

            {step === 3 && sent && (
              <div className="h-full grid place-items-center text-center py-10">
                <div>
                  <div className="mx-auto w-16 h-16 rounded-full grid place-items-center bg-[rgba(247,134,26,0.12)] border border-[var(--amber)]/40 mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--amber-deep)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="display text-3xl mb-2">Booking request sent.</h3>
                  <p className="text-[var(--muted)] max-w-sm mx-auto">Our team will call you within one business day to confirm dates and get your ad on the road.</p>
                </div>
              </div>
            )}
          </div>

          {!(step === 3 && sent) && (
            <div className="flex items-center justify-between mt-6">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} className={cn("btn btn-ghost", step === 0 && "opacity-0 pointer-events-none")}>Back</button>
              {step < 3 && (
                <button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext} className={cn("btn btn-primary", !canNext && "opacity-40 pointer-events-none")}>Continue</button>
              )}
            </div>
          )}
        </div>
      </section>
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
