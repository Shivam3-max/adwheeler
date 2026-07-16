"use client";

import { useState } from "react";
import Link from "next/link";
import { FLEET } from "@/lib/site";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const ADS = [
  { name: "Retail", from: "#1358d8", to: "#38e5df", label: "ELITE OUTFITS" },
  { name: "Food", from: "#e2b100", to: "#c81e5a", label: "SUPER DAN" },
  { name: "Realty", from: "#0a8f83", to: "#134e8f", label: "SKYLINE HOMES" },
];

const PARTS = [
  { t: "LED array", d: "High-nit modular panels, hot-swappable." },
  { t: "Media player", d: "4G-connected, remote content push." },
  { t: "LiFePO₄ pack", d: "Fast-charge, 1500+ cycle life." },
  { t: "GPS + IMU", d: "10Hz positioning, tamper alerts." },
  { t: "Directional audio", d: "Focused sound, street-legal levels." },
  { t: "Motor + controller", d: "Silent electric drive, city-tuned." },
];

export default function FleetPage() {
  const [vIdx, setVIdx] = useState(1);
  const [adIdx, setAdIdx] = useState(0);
  const [night, setNight] = useState(true);
  const [angle, setAngle] = useState(0);
  const [exploded, setExploded] = useState(false);

  const vehicle = FLEET[vIdx];
  const ad = ADS[adIdx];

  return (
    <>
      {/* hero */}
      <section className="relative pt-40 pb-12 md:pt-48 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="wrap relative">
          <p className="eyebrow mb-6">The fleet</p>
          <h1 className="display text-[clamp(2.6rem,7.5vw,6rem)] max-w-4xl">
            Three machines. <span className="text-gradient">One mission.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--ink-dim)]">
            Every AD Wheeler is a purpose-built, electric, GPS-tracked billboard.
            Configure one below.
          </p>
        </div>
      </section>

      {/* configurator */}
      <section className="pb-8">
        <div className="wrap grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* stage */}
          <div className="card p-0 min-h-[460px] md:min-h-[560px]">
            <div
              className={cn(
                "relative h-full rounded-[26px] overflow-hidden grid place-items-center transition-colors duration-700",
                night
                  ? "bg-[radial-gradient(120%_90%_at_50%_120%,rgba(255,158,27,0.10),transparent_55%),#08090d]"
                  : "bg-[linear-gradient(180deg,#243447,#3d5168)]"
              )}
            >
              <div className={cn("absolute bottom-20 inset-x-0 h-px", night ? "bg-[var(--line-strong)]" : "bg-white/20")} />
              <div style={{ transform: `perspective(1200px) rotateY(${angle}deg)`, transition: "transform 0.5s var(--ease)" }}>
                <VehicleSVG ad={ad} night={night} exploded={exploded} />
              </div>

              <span className="absolute top-5 left-5 chip">{vehicle.name}</span>
              <span className="absolute top-5 right-5 font-mono text-xs text-[var(--muted)]">{night ? "Night" : "Day"} · {angle}°</span>

              {/* rotate control */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 glass rounded-full px-4 py-2">
                <button onClick={() => setAngle((a) => a - 30)} className="text-[var(--muted)] hover:text-amber" aria-label="rotate left">◀</button>
                <input type="range" min={-60} max={60} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="accent-[var(--amber)] w-32" />
                <button onClick={() => setAngle((a) => a + 30)} className="text-[var(--muted)] hover:text-amber" aria-label="rotate right">▶</button>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-col gap-4">
            <div className="card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--faint)] mb-3">Model</p>
              <div className="grid gap-2">
                {FLEET.map((f, i) => (
                  <button
                    key={f.slug}
                    onClick={() => setVIdx(i)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors",
                      i === vIdx ? "border-[var(--amber)] bg-[rgba(255,158,27,0.06)]" : "border-[var(--line)] hover:border-[var(--line-strong)]"
                    )}
                  >
                    <span>
                      <span className={cn("block", i === vIdx ? "text-amber" : "text-[var(--ink)]")}>{f.name}</span>
                      <span className="text-xs text-[var(--muted)]">{f.tag}</span>
                    </span>
                    <span className="text-xs font-mono text-[var(--faint)]">{f.screen.split("·")[0]}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Toggle label="Environment" on={night} onLabel="Night" offLabel="Day" onClick={() => setNight((v) => !v)} />
                <Toggle label="Engineering" on={exploded} onLabel="Exploded" offLabel="Assembled" onClick={() => setExploded((v) => !v)} />
              </div>

              <p className="mt-5 font-mono text-xs uppercase tracking-wider text-[var(--faint)] mb-2">LED creative</p>
              <div className="flex gap-2">
                {ADS.map((a, i) => (
                  <button key={a.name} onClick={() => setAdIdx(i)}
                    className={cn("flex-1 py-2 rounded-lg text-xs border transition-all", i === adIdx ? "border-[var(--cyan)] text-[var(--ink)]" : "border-[var(--line)] text-[var(--muted)]")}
                    style={i === adIdx ? { background: `linear-gradient(90deg, ${a.from}22, ${a.to}22)` } : undefined}>
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            <Link href="/campaign-planner" className="btn btn-primary justify-center">Book this vehicle</Link>
          </div>
        </div>
      </section>

      {/* full spec sheet */}
      <section className="section">
        <div className="wrap">
          <Reveal className="mb-10">
            <p className="eyebrow mb-3">Spec sheet</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{vehicle.name} — technical detail</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] rounded-2xl overflow-hidden border border-[var(--line)]">
            {Object.entries(vehicle.specs).map(([k, v]) => (
              <div key={k} className="bg-[var(--bg)] p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-wider text-[var(--faint)]">{k}</p>
                <p className="text-lg mt-1">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* engineering parts */}
      <section className="section pt-0">
        <div className="wrap">
          <Reveal className="mb-10 max-w-xl">
            <p className="eyebrow mb-3">Under the panels</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">Engineered end to end.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTS.map((p, i) => (
              <Reveal key={p.t} delay={(i % 3) * 80} className="card p-6">
                <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg mt-3 mb-1">{p.t}</h3>
                <p className="text-sm text-[var(--muted)]">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
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

function VehicleSVG({ ad, night, exploded }: { ad: (typeof ADS)[number]; night: boolean; exploded: boolean }) {
  const dy = exploded ? -1 : 0;
  return (
    <svg viewBox="0 0 340 220" className="w-[78vw] max-w-[520px] drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]">
      <defs>
        <linearGradient id="adg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ad.from} />
          <stop offset="100%" stopColor={ad.to} />
        </linearGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* roof cap */}
      <rect x="150" y={30 + dy * 22} width="120" height="12" rx="3" fill="#0d0d0d" style={{ transition: "y 0.5s" }} />
      {/* LED box */}
      <rect x="150" y="46" width="120" height="96" rx="6" fill="#141414" stroke="#000" strokeWidth="2" />
      {/* screen */}
      <rect x="158" y="54" width="104" height="80" rx="3" fill="url(#adg)" filter={night ? "url(#glow)" : undefined} />
      <text x="210" y="92" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="15" fill="#fff">{ad.label.split(" ")[0]}</text>
      <text x="210" y="110" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="12" fill="#fff" opacity="0.85">{ad.label.split(" ").slice(1).join(" ")}</text>

      {/* cabin (shifts left when exploded) */}
      <g style={{ transition: "transform 0.5s" }} transform={`translate(${exploded ? -26 : 0} 0)`}>
        <path d="M46 160 L46 104 Q46 96 54 96 L126 96 L150 70 L150 160 Z" fill="#f2b02a" stroke="#c98a12" strokeWidth="2" />
        <path d="M118 96 L138 74 L150 74 L150 96 Z" fill={night ? "#0a1a2a" : "#bfe0ff"} />
      </g>

      {/* battery (drops when exploded) */}
      <rect x="150" y={148 + (exploded ? 26 : 0)} width="80" height="14" rx="3" fill="#1c2a1c" stroke="#2f4f2f" strokeWidth="1.5" style={{ transition: "y 0.5s" }} />

      {/* wheels */}
      <circle cx="92" cy="164" r="21" fill="#0f1013" stroke="#2a2c33" strokeWidth="4" />
      <circle cx="92" cy="164" r="7" fill="#3a3d45" />
      <circle cx="232" cy="164" r="21" fill="#0f1013" stroke="#2a2c33" strokeWidth="4" />
      <circle cx="232" cy="164" r="7" fill="#3a3d45" />

      <circle cx="52" cy="128" r="5" fill={night ? "#fff3d6" : "#5a4a2a"} filter={night ? "url(#glow)" : undefined} />
    </svg>
  );
}
