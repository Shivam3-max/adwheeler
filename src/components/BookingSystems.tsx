import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BOOKING } from "@/lib/site";

export default function BookingSystems({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section" id="booking">
      <div className="wrap">
        {heading && (
          <Reveal className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">How to book</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
              Two simple ways to <span className="text-amber">own the screen.</span>
            </h2>
            <p className="mt-5 text-[var(--ink-dim)]">
              No packages, no configuration. Just pick the evening that fits — the whole
              thing, or a shared slot.
            </p>
          </Reveal>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {BOOKING.map((b, i) => (
            <Reveal key={b.id} delay={i * 90}>
              <div className={`relative h-full rounded-[26px] border p-8 md:p-9 overflow-hidden ${b.id === "full-day" ? "border-[var(--amber)]/45 bg-[rgba(247,134,26,0.04)]" : "border-[var(--line)] bg-white"} shadow-[var(--shadow-sm)]`}>
                {b.id === "full-day" && (
                  <div className="pointer-events-none absolute -top-16 -right-10 w-48 h-48 rounded-full blur-[80px] bg-[rgba(247,134,26,0.20)]" />
                )}
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`chip ${b.id === "full-day" ? "!text-amber !border-[var(--amber)]/45" : "!text-cyan !border-[var(--cyan)]/40"}`}>{b.badge}</span>
                    <span className="font-mono text-xs text-[var(--faint)]">0{i + 1}</span>
                  </div>

                  <h3 className="display text-3xl mb-1">{b.name}</h3>
                  <p className="text-[var(--muted)] mb-6">{b.tagline}</p>

                  <div className="flex items-end gap-2 mb-1">
                    <span className="font-display text-5xl md:text-6xl leading-none">{b.price}</span>
                    <span className="text-[var(--muted)] mb-1.5">{b.unit}</span>
                  </div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-[var(--faint)] mb-7">{b.note}</p>

                  {/* evening timeline visual */}
                  <Timeline variant={b.id} />

                  <ul className="mt-7 space-y-2.5">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--ink-dim)]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-amber"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link href="/campaign-planner" className={`btn ${b.id === "full-day" ? "btn-primary" : "btn-ghost"} w-full justify-center mt-8`}>
                    {b.id === "full-day" ? "Book the full day" : "Book a slot"}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline({ variant }: { variant: string }) {
  const labels = ["4 PM", "6 PM", "8 PM", "10 PM"];
  return (
    <div>
      <div className="flex h-9 rounded-lg overflow-hidden border border-[var(--line)]">
        {variant === "full-day" ? (
          <div className="flex-1 grid place-items-center text-[0.68rem] font-medium text-[#2a1500]" style={{ background: "linear-gradient(90deg, var(--amber-hi), var(--amber))" }}>
            YOUR BRAND — ALL EVENING
          </div>
        ) : (
          Array.from({ length: 9 }).map((_, i) => {
            const colors = ["#1358d8", "#0ba7a0", "#f7861a"];
            return (
              <div key={i} className="flex-1 grid place-items-center text-[0.6rem] font-semibold text-white border-r border-white/25 last:border-r-0" style={{ background: colors[i % 3] }}>
                {i % 3 === 0 ? "A" : i % 3 === 1 ? "B" : "C"}
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-between mt-1.5">
        {labels.map((l) => (
          <span key={l} className="font-mono text-[0.6rem] text-[var(--faint)]">{l}</span>
        ))}
      </div>
      {variant === "slot" && (
        <p className="mt-2 font-mono text-[0.6rem] text-[var(--muted)]">Brands A · B · C rotate every 2 min →</p>
      )}
    </div>
  );
}
