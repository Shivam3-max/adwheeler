"use client";

import { useState } from "react";
import indiaMap from "@svg-maps/india";
import { CITIES, type City } from "@/lib/site";

type Loc = { id: string; name: string; path: string };
const map = indiaMap as unknown as { viewBox: string; locations: Loc[] };

const HQ_STATES = new Set(["ch", "pb", "hr"]);
const HQ = CITIES.find((c) => c.hq)!;

export default function IndiaMap() {
  const [active, setActive] = useState<City | null>(null);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 items-center">
      {/* map */}
      <div className="relative mx-auto w-full max-w-[440px]">
        <div className="pointer-events-none absolute inset-0 rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(247,134,26,0.10),rgba(11,167,160,0.06),transparent_70%)]" />
        <svg viewBox={map.viewBox} className="relative w-full h-auto overflow-visible">
          {/* states */}
          {map.locations.map((loc) => {
            const isHQ = HQ_STATES.has(loc.id);
            return (
              <path
                key={loc.id}
                d={loc.path}
                fill={isHQ ? "rgba(247,134,26,0.18)" : "rgba(16,22,34,0.045)"}
                stroke={isHQ ? "rgba(247,134,26,0.5)" : "rgba(16,22,34,0.14)"}
                strokeWidth={isHQ ? 1.2 : 0.7}
              />
            );
          })}

          {/* routes from HQ */}
          {CITIES.filter((c) => !c.hq).map((c) => (
            <line
              key={`r-${c.name}`}
              x1={HQ.x}
              y1={HQ.y}
              x2={c.x}
              y2={c.y}
              stroke={c.status === "live" ? "rgba(247,134,26,0.35)" : "rgba(11,167,160,0.22)"}
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
          ))}

          {/* city markers */}
          {CITIES.map((c) => {
            const isActive = active?.name === c.name;
            const color = c.status === "live" ? "#f7861a" : "#0ba7a0";
            return (
              <g
                key={c.name}
                transform={`translate(${c.x} ${c.y})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(c)}
                onMouseLeave={() => setActive(null)}
                data-cursor
              >
                <circle r="12" fill="transparent" />
                {(c.status === "live" || c.hq) && (
                  <circle r="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7">
                    <animate attributeName="r" values="5;14;5" dur="2.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  r={c.hq ? 6 : isActive ? 5.5 : 4}
                  fill={c.status === "live" ? color : "#ffffff"}
                  stroke={color}
                  strokeWidth={c.status === "live" ? 0 : 1.6}
                />
                {c.hq && <circle r="2.4" fill="#fff" />}
              </g>
            );
          })}
        </svg>
      </div>

      {/* detail panel */}
      <div className="relative">
        <p className="eyebrow mb-5">{active ? (active.status === "live" ? "Now live" : "Coming soon") : "Our reach"}</p>
        {active ? (
          <div key={active.name}>
            <h3 className="display text-4xl mb-1">{active.name}</h3>
            <p className="text-[var(--muted)] mb-6">{active.state}</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 shadow-[var(--shadow-sm)]">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: active.status === "live" ? "#f7861a" : "#0ba7a0" }} />
              <span className="text-sm text-[var(--ink-dim)]">{active.note}</span>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="display text-4xl mb-3 max-w-sm">
              Rooted in Tricity. <span className="text-gradient">Rolling out nationwide.</span>
            </h3>
            <p className="text-[var(--ink-dim)] max-w-md">
              Our fleet runs today across Panchkula, Chandigarh, Mohali and Ludhiana —
              and the network is expanding city by city across India. Hover a marker to
              see what&apos;s live and what&apos;s next.
            </p>
            <div className="mt-6 flex gap-5 text-sm text-[var(--muted)]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--amber)]" /> Live now
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-[var(--cyan)]" /> Coming soon
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
