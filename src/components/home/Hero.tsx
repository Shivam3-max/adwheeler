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

      {/* Animated road and LED vehicle */}
      <div className="relative h-[210px] md:h-[250px] w-full">
        <div className="absolute bottom-[72px] md:bottom-[82px] inset-x-0 h-20 md:h-24 opacity-50">
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

        <div className="absolute bottom-0 inset-x-0 h-[76px] md:h-[86px] border-y border-[var(--line)] bg-[linear-gradient(180deg,#e8eaed,#d9dde2)]">
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[3px] overflow-hidden">
            <div
              className="h-full w-[200%]"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, var(--amber) 0 60px, transparent 60px 120px)",
                backgroundSize: "220px 3px",
                animation: "dash-move 1.4s linear infinite",
                opacity: 0.55,
                willChange: "transform",
              }}
            />
          </div>
        </div>

        <div
          className="absolute bottom-[34px] md:bottom-[38px] left-0"
          style={{ animation: "car-drive 16s linear infinite", willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <div style={{ animation: "car-bob 1.6s ease-in-out infinite" }}>
            <Vehicle />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--line)]" />
    </section>
  );
}

function Vehicle() {
  return (
    <div className="relative w-[300px] md:w-[390px]" aria-label="LED advertising vehicle driving along a city road" role="img">
      <svg viewBox="0 0 420 190" className="block w-full overflow-visible drop-shadow-[0_12px_14px_rgba(16,22,34,0.22)]">
        <defs>
          <linearGradient id="truck-box" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f5f5f2" />
            <stop offset="0.55" stopColor="#d9dcdf" />
            <stop offset="1" stopColor="#aeb4ba" />
          </linearGradient>
          <linearGradient id="truck-cab" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8b735" />
            <stop offset="1" stopColor="#d78512" />
          </linearGradient>
          <linearGradient id="truck-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a8d5e9" />
            <stop offset="0.5" stopColor="#477b99" />
            <stop offset="1" stopColor="#1d3448" />
          </linearGradient>
          <linearGradient id="truck-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#182531" />
            <stop offset="1" stopColor="#070a0e" />
          </linearGradient>
          <radialGradient id="truck-lamp">
            <stop offset="0" stopColor="#fff8d8" />
            <stop offset="0.58" stopColor="#ffe09a" />
            <stop offset="1" stopColor="#e9a742" />
          </radialGradient>
          <pattern id="truck-grille" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M0 0v5" stroke="#71767b" strokeWidth="1.4" />
          </pattern>
        </defs>

        <ellipse cx="210" cy="180" rx="174" ry="6" fill="rgba(16,22,34,0.17)" />

        {/* Steel chassis and cargo body */}
        <path d="M30 139h348v17H30z" fill="#3c4146" />
        <path d="M35 145h337v5H35z" fill="#737a80" />
        <path d="M39 27q0-8 9-8h193q9 0 9 9v113H39z" fill="url(#truck-box)" stroke="#737980" strokeWidth="2" />
        <path d="M47 29h187v105H47z" fill="url(#truck-screen)" stroke="#252b31" strokeWidth="4" />
        <path d="M52 34h177v95H52z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path d="M39 135h211v7H39z" fill="#aeb4ba" />
        <path d="M244 23v116" stroke="#8c9297" strokeWidth="2" />
        <path d="M29 31h9v101h-9z" fill="#484e54" />
        <path d="M29 133h9v11h-9z" fill="#22272b" />

        {/* Cab, windshield and driver-side details */}
        <path d="M250 139V83q0-16 14-23l29-14q7-3 16-3h38q15 0 21 16l20 55v35H250z" fill="url(#truck-cab)" stroke="#9b6417" strokeWidth="2" />
        <path d="M277 64l21-11q5-2 12-2h13v37h-49V70q0-4 3-6z" fill="url(#truck-glass)" stroke="#9b6417" strokeWidth="2" />
        <path d="M328 51h18q10 0 14 12l12 36h-44z" fill="url(#truck-glass)" stroke="#9b6417" strokeWidth="2" />
        <path d="M327 51v89" stroke="#a86c13" strokeWidth="2" />
        <path d="M340 107h14" stroke="#855716" strokeWidth="3" strokeLinecap="round" />
        <path d="M262 133h29v7h-29z" fill="#c98015" />
        <path d="M298 143h49v7h-49z" fill="#888f95" />
        <rect x="362" y="118" width="19" height="18" rx="3" fill="#41464b" />
        <path d="M365 107q5-4 12 0l2 8h-15z" fill="url(#truck-lamp)" />
        <path d="M250 113h5v25h-5z" fill="#cfd3d5" />
        <path d="M55 156h253" stroke="#24292d" strokeWidth="4" />

        {/* Road tires, hubs, and restrained tread detail */}
        {[91, 326].map((cx) => (
          <g className="wheel" key={cx}>
            <circle cx={cx} cy="157" r="21" fill="#17191b" />
            <circle cx={cx} cy="157" r="14" fill="#343a3e" stroke="#090a0b" strokeWidth="2" />
            <circle cx={cx} cy="157" r="9" fill="#9da3a6" />
            <circle cx={cx} cy="157" r="5" fill="#545b5f" />
            <g stroke="#d0d3d4" strokeWidth="1.7">
              <path d={`M${cx} 149v16M${cx - 8} 157h16M${cx - 6} 151l12 12M${cx + 6} 151l-12 12`} />
            </g>
            <circle cx={cx} cy="157" r="2" fill="#e7e8e8" />
          </g>
        ))}
      </svg>

      <div className="absolute left-[11.4%] top-[17.9%] h-[50%] w-[44.3%] overflow-hidden border border-white/10 bg-[#111]">
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
            <span className="font-display font-bold text-white text-[10px] md:text-sm">{ad.l1}</span>
            <span className="font-display font-bold text-white/90 text-[9px] md:text-xs">{ad.l2}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
