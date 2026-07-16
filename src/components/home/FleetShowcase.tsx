"use client";

import { useState } from "react";
import Link from "next/link";
import { FLEET } from "@/lib/site";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const ADS = [
  { name: "Retail", from: "#1358d8", to: "#38e5df", label: "ELITE OUTFITS" },
  { name: "Food", from: "#e2b100", to: "#c81e5a", label: "SUPER DAN PIZZA" },
  { name: "Realty", from: "#0a8f83", to: "#134e8f", label: "SKYLINE HOMES" },
];

export default function FleetShowcase() {
  const [vIdx, setVIdx] = useState(0);
  const [night, setNight] = useState(true);
  const [adIdx, setAdIdx] = useState(0);
  const [lights, setLights] = useState(true);

  const vehicle = FLEET[vIdx];
  const ad = ADS[adIdx];

  return (
    <section className="section relative">
      <div className="wrap">
        <Reveal className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">The fleet</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            Engineered to be <span className="text-amber">seen.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
          {/* stage */}
          <Reveal className="card p-0 min-h-[440px]">
            <div
              className={cn(
                "relative h-full rounded-[26px] overflow-hidden transition-colors duration-700 grid place-items-center",
                night
                  ? "bg-[radial-gradient(120%_90%_at_50%_120%,rgba(255,158,27,0.10),transparent_55%),#08090d]"
                  : "bg-[linear-gradient(180deg,#243447,#3d5168)]"
              )}
            >
              {/* ground line */}
              <div className={cn("absolute bottom-16 inset-x-0 h-px", night ? "bg-[var(--line-strong)]" : "bg-white/20")} />
              {/* headlight beam */}
              {lights && night && (
                <div className="absolute bottom-[64px] right-[14%] w-40 h-24 bg-[radial-gradient(circle_at_left,rgba(255,243,214,0.35),transparent_70%)] blur-md" />
              )}
              <VehicleSVG ad={ad} lights={lights} night={night} />

              <span className="absolute top-5 left-5 chip">{vehicle.name}</span>
              <span className="absolute top-5 right-5 font-mono text-xs text-[var(--muted)]">
                {night ? "22:14 · Night mode" : "13:02 · Day mode"}
              </span>
            </div>
          </Reveal>

          {/* controls + specs */}
          <div className="flex flex-col gap-4">
            <Reveal className="card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--faint)] mb-3">Model</p>
              <div className="flex flex-wrap gap-2">
                {FLEET.map((f, i) => (
                  <button
                    key={f.slug}
                    onClick={() => setVIdx(i)}
                    className={cn(
                      "px-3.5 py-2 rounded-full text-sm border transition-colors",
                      i === vIdx
                        ? "border-[var(--amber)] text-amber bg-[rgba(255,158,27,0.08)]"
                        : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]"
                    )}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--ink-dim)]">{vehicle.tag} · best for {vehicle.best.toLowerCase()}.</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Toggle label="Environment" on={night} onLabel="Night" offLabel="Day" onClick={() => setNight((v) => !v)} />
                <Toggle label="Vehicle lights" on={lights} onLabel="On" offLabel="Off" onClick={() => setLights((v) => !v)} />
              </div>

              <p className="mt-5 font-mono text-xs uppercase tracking-wider text-[var(--faint)] mb-2">LED creative</p>
              <div className="flex gap-2">
                {ADS.map((a, i) => (
                  <button
                    key={a.name}
                    onClick={() => setAdIdx(i)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs border transition-all",
                      i === adIdx ? "border-[var(--cyan)] text-[var(--ink)]" : "border-[var(--line)] text-[var(--muted)]"
                    )}
                    style={i === adIdx ? { background: `linear-gradient(90deg, ${a.from}22, ${a.to}22)` } : undefined}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal className="card p-6" delay={80}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(vehicle.specs).slice(0, 6).map(([k, v]) => (
                  <div key={k} className="flex flex-col border-b border-[var(--line)] pb-2">
                    <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[var(--faint)]">{k}</span>
                    <span className="text-sm text-[var(--ink)]">{v}</span>
                  </div>
                ))}
              </div>
              <Link href={`/fleet`} className="btn btn-ghost w-full justify-center mt-5 text-sm">
                Full configurator
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toggle({ label, on, onLabel, offLabel, onClick }: { label: string; on: boolean; onLabel: string; offLabel: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left rounded-xl border border-[var(--line)] p-3 hover:border-[var(--line-strong)] transition-colors">
      <span className="block font-mono text-[0.6rem] uppercase tracking-wider text-[var(--faint)]">{label}</span>
      <span className="mt-1 flex items-center justify-between">
        <span className={cn("text-sm", on ? "text-amber" : "text-[var(--muted)]")}>{on ? onLabel : offLabel}</span>
        <span className={cn("w-9 h-5 rounded-full p-0.5 transition-colors", on ? "bg-[var(--amber)]" : "bg-[var(--surface-2)]")}>
          <span className={cn("block w-4 h-4 rounded-full bg-[#0a0a0a] transition-transform", on && "translate-x-4")} />
        </span>
      </span>
    </button>
  );
}

function VehicleSVG({ ad, lights, night }: { ad: (typeof ADS)[number]; lights: boolean; night: boolean }) {
  return (
    <svg viewBox="0 0 320 200" className="relative z-10 w-[80%] max-w-[460px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      <defs>
        <linearGradient id="ad-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ad.from} />
          <stop offset="100%" stopColor={ad.to} />
        </linearGradient>
        <filter id="screenglow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* body */}
      <path d="M40 150 L40 96 Q40 88 48 88 L120 88 L150 60 L250 60 Q262 60 262 74 L262 150 Z" fill="#f2b02a" stroke="#c98a12" strokeWidth="2" />
      {/* cabin window */}
      <path d="M126 88 L150 66 L206 66 L206 88 Z" fill={night ? "#0a1a2a" : "#bfe0ff"} opacity="0.9" />
      {/* LED billboard box */}
      <rect x="150" y="30" width="112" height="90" rx="6" fill="#141414" stroke="#000" strokeWidth="2" />
      {/* LED screen */}
      <rect x="158" y="38" width="96" height="74" rx="3" fill="url(#ad-grad)" filter={lights ? "url(#screenglow)" : undefined} opacity={lights ? 1 : 0.5} />
      <text x="206" y="80" textAnchor="middle" fontFamily="'Clash Display', sans-serif" fontWeight="700" fontSize="14" fill="#fff">
        {ad.label.split(" ")[0]}
      </text>
      <text x="206" y="96" textAnchor="middle" fontFamily="'Clash Display', sans-serif" fontWeight="700" fontSize="11" fill="#fff" opacity="0.85">
        {ad.label.split(" ").slice(1).join(" ")}
      </text>

      {/* wheels */}
      <circle cx="86" cy="152" r="20" fill="#0f1013" stroke="#2a2c33" strokeWidth="4" />
      <circle cx="86" cy="152" r="7" fill="#3a3d45" />
      <circle cx="224" cy="152" r="20" fill="#0f1013" stroke="#2a2c33" strokeWidth="4" />
      <circle cx="224" cy="152" r="7" fill="#3a3d45" />

      {/* headlight */}
      <circle cx="46" cy="120" r="5" fill={lights ? "#fff3d6" : "#5a4a2a"} filter={lights ? "url(#screenglow)" : undefined} />
    </svg>
  );
}
