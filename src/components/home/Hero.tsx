"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";

const ROTATE = ["brand", "message", "offer", "launch", "store"];

const ADS = [
  { l1: "YOUR AD", l2: "HERE", from: "#1358d8", to: "#0ba7a0" },
  { l1: "ELITE", l2: "OUTFITS", from: "#c81e5a", to: "#f7861a" },
  { l1: "SUPER DAN", l2: "PIZZA", from: "#f7861a", to: "#c81e5a" },
  { l1: "GRAND", l2: "OPENING", from: "#0ba7a0", to: "#1358d8" },
];

export default function Hero() {
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((i) => (i + 1) % ROTATE.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* soft blurred washes */}
      <div className="pointer-events-none absolute -top-24 right-[6%] h-80 w-80 rounded-full blur-[120px] bg-[rgba(247,134,26,0.18)]" />
      <div className="pointer-events-none absolute top-24 left-[2%] h-72 w-72 rounded-full blur-[120px] bg-[rgba(11,167,160,0.14)]" />

      {/* ---- Typography block ---- */}
      <div className="relative flex-1 flex items-center">
        <div className="wrap w-full text-center pt-28 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-4 py-1.5 shadow-[var(--shadow-sm)] backdrop-blur mb-8">
            <span className="dot" />
            <span className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-[var(--muted)]">
              Chandigarh · Tricity &nbsp;→&nbsp; Pan-India
            </span>
          </div>

          <h1 className="display text-[clamp(2.2rem,8vw,7rem)]">
            <span className="block">Move your</span>
            <span className="block leading-[1.05]" aria-live="polite">
              <span
                key={ROTATE[wi]}
                className="inline-block text-amber will-change-transform"
                style={{ animation: "word-rise 0.55s var(--ease)" }}
              >
                {ROTATE[wi]}
              </span>
            </span>
            <span className="block">through the city.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg md:text-xl text-[var(--ink-dim)]">
            GPS-tracked LED vehicles that turn every street into your billboard —
            running your ad live, <span className="text-[var(--ink)] font-medium">4&nbsp;PM to 10&nbsp;PM</span>, every evening.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Magnetic strength={0.25}>
              <Link href="/campaign-planner" className="btn btn-primary text-base">
                Book your ad
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </Magnetic>
            <Link href="#booking" className="btn btn-ghost text-base">How it works</Link>
          </div>
        </div>
      </div>

      {/* ---- Animated road ---- */}
      <div className="relative h-[240px] md:h-[280px] w-full">
        {/* city silhouette */}
        <div className="absolute bottom-[86px] md:bottom-[96px] inset-x-0 h-24 opacity-[0.5]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <g fill="rgba(16,22,34,0.06)">
              {Array.from({ length: 26 }).map((_, i) => {
                const w = 30 + ((i * 37) % 34);
                const h = 30 + ((i * 53) % 78);
                return <rect key={i} x={i * 47} y={120 - h} width={w} height={h} rx="2" />;
              })}
            </g>
          </svg>
        </div>

        {/* road surface */}
        <div className="absolute bottom-0 inset-x-0 h-[86px] md:h-[96px] bg-[linear-gradient(180deg,#eceef2,#e2e5ea)] border-t border-[var(--line)]">
          {/* dashed center line (transform-animated for smoothness) */}
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[4px] overflow-hidden">
            <div
              className="h-full w-[200%]"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, var(--amber) 0 60px, transparent 60px 120px)",
                backgroundSize: "220px 4px",
                animation: "dash-move 1.4s linear infinite",
                opacity: 0.6,
                willChange: "transform",
              }}
            />
          </div>
        </div>

        {/* the LED vehicles (two, staggered, so the road is never empty) */}
        {[0, -6.5].map((delay, i) => (
          <div
            key={i}
            className="absolute bottom-[64px] md:bottom-[72px] left-0"
            style={{
              animation: `car-drive 13s linear ${delay}s infinite`,
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <div style={{ animation: "car-bob 1.2s ease-in-out infinite" }}>
              <Vehicle />
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--line)]" />
    </section>
  );
}

function Vehicle() {
  return (
    <div className="relative">
      <div className="relative">
        {/* Polished side-profile: LED billboard on the rear, cab + headlight up front
            (right) so the vehicle reads as driving forward, left → right. */}
        <svg viewBox="0 0 240 152" className="w-[156px] md:w-[192px] drop-shadow-[0_16px_20px_rgba(16,22,34,0.20)]">
          <defs>
            <linearGradient id="v-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffbe50" />
              <stop offset="1" stopColor="#ef8c12" />
            </linearGradient>
            <linearGradient id="v-cab" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffcd6e" />
              <stop offset="1" stopColor="#f19a1e" />
            </linearGradient>
            <linearGradient id="v-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d6ecff" />
              <stop offset="1" stopColor="#8ec0e8" />
            </linearGradient>
            <radialGradient id="v-head" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fff6d8" />
              <stop offset="1" stopColor="#ffd34d" />
            </radialGradient>
          </defs>

          {/* ground shadow */}
          <ellipse cx="120" cy="143" rx="101" ry="6.5" fill="rgba(16,22,34,0.12)" />

          {/* base skirt */}
          <rect x="22" y="108" width="190" height="12" rx="4" fill="url(#v-body)" />

          {/* LED billboard housing (rear / left) */}
          <rect x="16" y="20" width="110" height="95" rx="11" fill="#17181d" />
          <rect x="22" y="13" width="98" height="9" rx="4" fill="#0e0f12" />
          {/* screen well (covered by the HTML ad overlay) */}
          <rect x="25" y="30" width="92" height="74" rx="6" fill="#0a0c12" />
          <rect x="25" y="30" width="92" height="74" rx="6" fill="none" stroke="rgba(255,255,255,0.10)" />

          {/* cab (front / right) */}
          <path d="M123 110 L123 66 Q123 57 132 55 L151 51 L187 51 Q199 51 203 66 L209 110 Z" fill="url(#v-cab)" stroke="#cf6f08" strokeWidth="1.5" strokeLinejoin="round" />
          {/* roof highlight */}
          <path d="M136 56 L185 53 Q195 53 198 63 L136 63 Z" fill="rgba(255,255,255,0.22)" />
          {/* windshield */}
          <path d="M153 60 L184 60 Q191 60 194 69 L198 87 L153 87 Z" fill="url(#v-glass)" />
          <path d="M153 60 L160 60 L156 87 L153 87 Z" fill="rgba(255,255,255,0.28)" />
          {/* door seam */}
          <line x1="153" y1="61" x2="153" y2="108" stroke="#cf6f08" strokeWidth="1.5" />
          {/* door handle */}
          <rect x="162" y="95" width="12" height="3" rx="1.5" fill="#cf6f08" />
          {/* bumper + headlight */}
          <rect x="203" y="102" width="9" height="10" rx="3" fill="#2a2d34" />
          <ellipse cx="206" cy="94" rx="4.5" ry="6.5" fill="url(#v-head)" />

          {/* wheels (spokes spin via .wheel) */}
          {[66, 172].map((cx) => (
            <g className="wheel" key={cx}>
              <circle cx={cx} cy={122} r="16" fill="#15171c" />
              <circle cx={cx} cy={122} r="9" fill="#3b404a" />
              <g stroke="#5a606b" strokeWidth="2">
                <line x1={cx} y1={109} x2={cx} y2={135} />
                <line x1={cx - 13} y1={122} x2={cx + 13} y2={122} />
                <line x1={cx - 9} y1={113} x2={cx + 9} y2={131} />
                <line x1={cx + 9} y1={113} x2={cx - 9} y2={131} />
              </g>
              <circle cx={cx} cy={122} r="3" fill="#1c1f25" />
            </g>
          ))}
        </svg>

        {/* ad banners overlaid on the LED screen well (x25 y30 w92 h74 of 240×152) */}
        <div className="absolute" style={{ left: "10.4%", top: "19.7%", width: "38.3%", height: "48.7%" }}>
          <div className="led-screen relative w-full h-full rounded-[5px] overflow-hidden">
            {ADS.map((ad, i) => (
              <div
                key={i}
                className="absolute inset-0 grid place-content-center text-center leading-none"
                style={{
                  background: `linear-gradient(135deg, ${ad.from}, ${ad.to})`,
                  animation: `ad-cycle 8s ${i * 2}s infinite`,
                  opacity: 0,
                }}
              >
                <span className="font-display font-bold text-white text-[9px] md:text-[11px]">{ad.l1}</span>
                <span className="font-display font-bold text-white/90 text-[8px] md:text-[10px]">{ad.l2}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
