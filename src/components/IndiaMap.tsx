"use client";

import { useState } from "react";
import { CITIES, type City } from "@/lib/site";

// Stylised subcontinent silhouette (abstract, not survey-accurate) in a 0–100 space.
const INDIA_PATH =
  "M42,7 L49,9 L54,14 L58,13 L63,17 L61,22 L66,26 L72,31 L69,35 L63,34 L60,39 L62,45 L57,52 L54,62 L49,74 L46,86 L43,79 L40,68 L35,58 L31,50 L25,47 L27,41 L33,38 L34,30 L38,22 L39,14 Z";

export default function IndiaMap() {
  const [active, setActive] = useState<City | null>(null);
  const hub = CITIES[0];

  return (
    <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
      {/* Map */}
      <div className="relative aspect-[10/11] max-w-[520px] mx-auto w-full">
        <div className="pointer-events-none absolute inset-0 rounded-full blur-[90px] bg-[rgba(56,229,223,0.08)]" />
        <svg viewBox="0 0 100 100" className="relative w-full h-full overflow-visible">
          <defs>
            <linearGradient id="india-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,158,27,0.10)" />
              <stop offset="100%" stopColor="rgba(56,229,223,0.06)" />
            </linearGradient>
          </defs>

          <path
            d={INDIA_PATH}
            fill="url(#india-fill)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.4"
            strokeLinejoin="round"
          />

          {/* connection lines from hub */}
          {CITIES.map((c) =>
            c === hub ? null : (
              <line
                key={`l-${c.name}`}
                x1={hub.x}
                y1={hub.y}
                x2={c.x}
                y2={c.y}
                stroke="rgba(56,229,223,0.16)"
                strokeWidth="0.25"
                strokeDasharray="1 1"
              />
            )
          )}

          {/* city nodes */}
          {CITIES.map((c) => {
            const isActive = active?.name === c.name;
            return (
              <g
                key={c.name}
                transform={`translate(${c.x} ${c.y})`}
                onMouseEnter={() => setActive(c)}
                onMouseLeave={() => setActive(null)}
                style={{ cursor: "pointer" }}
                data-cursor
              >
                <circle r="3.4" fill="transparent" />
                <circle r={isActive ? 2.4 : 1.6} fill={c.tier === 1 ? "#ff9e1b" : "#38e5df"}>
                  <animate
                    attributeName="opacity"
                    values="1;0.5;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  r="1.4"
                  fill="none"
                  stroke={c.tier === 1 ? "#ff9e1b" : "#38e5df"}
                  strokeWidth="0.3"
                  opacity="0.6"
                >
                  <animate attributeName="r" values="1.4;5;1.4" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <div className="relative">
        <p className="eyebrow mb-5">{active ? "Live coverage" : "Hover a node"}</p>
        {active ? (
          <div key={active.name} data-reveal className="is-in">
            <h3 className="display text-4xl mb-1">{active.name}</h3>
            <p className="text-[var(--muted)] mb-6">{active.state}</p>
            <div className="grid grid-cols-3 gap-4">
              <Metric k="Population" v={active.population} />
              <Metric k="Daily reach" v={active.dailyReach} />
              <Metric k="Fleet" v={String(active.fleet)} />
            </div>
          </div>
        ) : (
          <div>
            <h3 className="display text-4xl mb-3 max-w-sm">
              One network. <span className="text-gradient">Twelve cities.</span>
            </h3>
            <p className="text-[var(--ink-dim)] max-w-md">
              Hover any pulsing node to see live population, daily reach and active
              fleet. Amber nodes are Tier-1 metros; cyan are Tier-2 growth markets.
            </p>
            <div className="mt-6 flex gap-5 text-sm text-[var(--muted)]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--amber)]" /> Tier-1 metro
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--cyan)]" /> Tier-2 growth
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--faint)]">{k}</p>
      <p className="font-display text-2xl mt-1 text-amber">{v}</p>
    </div>
  );
}
