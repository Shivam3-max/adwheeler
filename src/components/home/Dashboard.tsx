import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function Dashboard() {
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="wrap relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <Reveal>
            <p className="eyebrow mb-4">The platform</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
              Watch your
              <br />
              <span className="text-amber">campaign move.</span>
            </h2>
            <p className="mt-5 text-[var(--ink-dim)] max-w-md">
              Every vehicle is GPS-tracked in real time, with geo-tagged proof photos
              from the route. You always know exactly where your ad has been.
            </p>
            <ul className="mt-7 space-y-3">
              {["Live GPS vehicle tracking", "Route coverage across the city", "Geo-tagged proof-of-performance"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-[var(--ink-dim)]">
                  <span className="dot" /> {t}
                </li>
              ))}
            </ul>
            <Link href="/technology" className="btn btn-ghost mt-8">Explore the tech</Link>
          </Reveal>

          <Reveal delay={140}>
            <div className="glass rounded-[26px] p-4 md:p-5">
              {/* top bar */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-xs text-[var(--muted)]">campaign / elite-outfits</span>
                </div>
                <span className="flex items-center gap-2 text-xs text-[var(--cyan)]">
                  <span className="dot" /> LIVE
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* map */}
                <div className="col-span-2 relative rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] h-56 overflow-hidden">
                  <div className="absolute inset-0 grid-lines opacity-70" />
                  <svg viewBox="0 0 300 200" className="absolute inset-0 w-full h-full">
                    <path d="M30 160 C 80 120, 60 80, 120 70 S 220 90, 250 40" fill="none" stroke="#0ba7a0" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                    <circle r="4.5" fill="#f7861a">
                      <animateMotion dur="6s" repeatCount="indefinite" path="M30 160 C 80 120, 60 80, 120 70 S 220 90, 250 40" />
                    </circle>
                    {[[60, 130], [120, 70], [200, 80], [250, 40]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="3" fill="#0ba7a0" opacity="0.9" />
                    ))}
                  </svg>
                  <div className="absolute left-10 bottom-6 w-20 h-20 rounded-full blur-2xl bg-[rgba(247,134,26,0.28)]" />
                  <div className="absolute right-16 top-8 w-16 h-16 rounded-full blur-2xl bg-[rgba(11,167,160,0.24)]" />
                  <span className="absolute top-3 left-3 chip !text-[0.6rem]">Live route · AD Wheeler #042</span>
                </div>

                {/* stat stack */}
                <div className="flex flex-col gap-3">
                  <MiniStat label="Impressions" value="3.4L" trend="+12%" />
                  <MiniStat label="Vehicles live" value="6" trend="on route" />
                  <MiniStat label="Dwell avg" value="41s" trend="+4s" />
                </div>
              </div>

              {/* bars */}
              <div className="mt-3 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--faint)]">Impressions by hour</span>
                  <span className="text-xs text-[var(--muted)]">4–10 PM</span>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[30, 42, 55, 40, 68, 82, 60, 74, 95, 88, 70, 58].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[var(--amber)] to-[var(--amber-hi)]" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="flex-1 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-4">
      <p className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--faint)]">{label}</p>
      <p className="font-display text-2xl mt-1">{value}</p>
      <p className="text-[0.68rem] text-[var(--cyan)] mt-0.5">{trend}</p>
    </div>
  );
}
