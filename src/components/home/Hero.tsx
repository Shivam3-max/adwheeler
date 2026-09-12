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
              Panchkula · Tricity &nbsp;→&nbsp; Pan-India
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
            <Link href="/pricing" className="btn btn-ghost text-base">See pricing</Link>
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
          {/* dashed center line */}
          <div
            className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[4px]"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, var(--amber) 0 60px, transparent 60px 120px)",
              backgroundSize: "220px 4px",
              animation: "road-dash 1.4s linear infinite",
              opacity: 0.65,
            }}
          />
        </div>

        {/* the LED vehicles (two, staggered, so the road is never empty) */}
        {[0, -6.5].map((delay, i) => (
          <div
            key={i}
            className="absolute bottom-[64px] md:bottom-[72px] left-0 will-change-transform"
            style={{ animation: `car-drive 13s linear ${delay}s infinite` }}
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
      {/* LED screen with rotating ads */}
      <div className="relative">
        <svg viewBox="0 0 220 150" className="w-[150px] md:w-[184px] drop-shadow-[0_14px_22px_rgba(16,22,34,0.18)]">
          {/* body */}
          <path d="M12 118 L12 74 Q12 66 20 66 L84 66 L104 44 L150 44 Z" fill="#f7a11c" stroke="#d97706" strokeWidth="2" />
          <path d="M92 66 L108 48 L140 48 L140 66 Z" fill="#0a1a2a" opacity="0.85" />
          {/* LED box */}
          <rect x="120" y="28" width="88" height="86" rx="6" fill="#141414" stroke="#000" strokeWidth="2" />
          <rect x="120" y="20" width="88" height="10" rx="3" fill="#0d0d0d" />
          {/* wheels */}
          <g style={{ transformOrigin: "58px 122px", animation: "wheel-spin 0.9s linear infinite" }}>
            <circle cx="58" cy="122" r="17" fill="#14161b" stroke="#2a2d34" strokeWidth="4" />
            <line x1="58" y1="108" x2="58" y2="136" stroke="#3a3d45" strokeWidth="2" />
            <line x1="44" y1="122" x2="72" y2="122" stroke="#3a3d45" strokeWidth="2" />
          </g>
          <g style={{ transformOrigin: "176px 122px", animation: "wheel-spin 0.9s linear infinite" }}>
            <circle cx="176" cy="122" r="17" fill="#14161b" stroke="#2a2d34" strokeWidth="4" />
            <line x1="176" y1="108" x2="176" y2="136" stroke="#3a3d45" strokeWidth="2" />
            <line x1="162" y1="122" x2="190" y2="122" stroke="#3a3d45" strokeWidth="2" />
          </g>
          {/* headlight */}
          <circle cx="16" cy="96" r="4" fill="#fff3d6" />
        </svg>

        {/* ad banners overlaid on the LED box */}
        <div className="absolute" style={{ left: "54.5%", top: "18.5%", width: "36%", height: "52%" }}>
          <div className="relative w-full h-full rounded-[3px] overflow-hidden">
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
