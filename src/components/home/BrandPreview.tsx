"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const THEMES = [
  { name: "Signal", from: "#1358d8", to: "#0ba7a0" },
  { name: "Sunset", from: "#f7861a", to: "#c81e5a" },
  { name: "Neon", from: "#7b2ff7", to: "#0ba7a0" },
  { name: "Gold", from: "#d97706", to: "#ffbe4d" },
];

export default function BrandPreview() {
  const [brand, setBrand] = useState("YOUR BRAND");
  const [t, setT] = useState(0);
  const theme = THEMES[t];
  const text = (brand || "YOUR BRAND").toUpperCase().slice(0, 18);

  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute -top-10 right-[8%] h-64 w-64 rounded-full blur-[120px] bg-[rgba(247,134,26,0.12)]" />
      <div className="wrap">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow mb-4">See it first</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            Put your brand <span className="text-amber">on the van.</span>
          </h2>
          <p className="mt-5 text-[var(--ink-dim)]">Type your name, pick a look, and watch it light up the screen.</p>
        </Reveal>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
          {/* controls */}
          <Reveal className="card p-7">
            <label className="font-mono text-xs uppercase tracking-wider text-[var(--faint)] block mb-2">Your brand</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              maxLength={18}
              placeholder="Type your brand…"
              className="field mb-6"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--faint)] mb-3">Screen look</p>
            <div className="grid grid-cols-2 gap-2 mb-7">
              {THEMES.map((th, i) => (
                <button
                  key={th.name}
                  onClick={() => setT(i)}
                  className={cn("flex items-center gap-2 rounded-xl border p-2.5 transition-all", i === t ? "border-[var(--amber)]" : "border-[var(--line)] hover:border-[var(--line-strong)]")}
                >
                  <span className="w-6 h-6 rounded-md" style={{ background: `linear-gradient(135deg, ${th.from}, ${th.to})` }} />
                  <span className="text-sm">{th.name}</span>
                </button>
              ))}
            </div>
            <Link href="/campaign-planner" className="btn btn-primary w-full justify-center">Book this ad</Link>
          </Reveal>

          {/* van stage */}
          <Reveal delay={120} className="relative frame rounded-[26px] bg-[var(--bg-2)] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
            <div className="relative grid place-items-center py-14 md:py-20">
              <div className="relative w-[82%] max-w-[460px]">
                <svg viewBox="0 0 240 152" className="w-full block drop-shadow-[0_24px_44px_rgba(16,22,34,0.20)]">
                  <defs>
                    <linearGradient id="bp-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffbe50" /><stop offset="1" stopColor="#ef8c12" /></linearGradient>
                    <linearGradient id="bp-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffcd6e" /><stop offset="1" stopColor="#f19a1e" /></linearGradient>
                    <linearGradient id="bp-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d6ecff" /><stop offset="1" stopColor="#8ec0e8" /></linearGradient>
                    <radialGradient id="bp-head" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#fff6d8" /><stop offset="1" stopColor="#ffd34d" /></radialGradient>
                  </defs>
                  <ellipse cx="120" cy="143" rx="101" ry="6.5" fill="rgba(16,22,34,0.12)" />
                  <rect x="22" y="108" width="190" height="12" rx="4" fill="url(#bp-body)" />
                  <rect x="16" y="20" width="110" height="95" rx="11" fill="#17181d" />
                  <rect x="22" y="13" width="98" height="9" rx="4" fill="#0e0f12" />
                  <rect x="25" y="30" width="92" height="74" rx="6" fill="#0a0c12" />
                  <path d="M123 110 L123 66 Q123 57 132 55 L151 51 L187 51 Q199 51 203 66 L209 110 Z" fill="url(#bp-cab)" stroke="#cf6f08" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M136 56 L185 53 Q195 53 198 63 L136 63 Z" fill="rgba(255,255,255,0.22)" />
                  <path d="M153 60 L184 60 Q191 60 194 69 L198 87 L153 87 Z" fill="url(#bp-glass)" />
                  <line x1="153" y1="61" x2="153" y2="108" stroke="#cf6f08" strokeWidth="1.5" />
                  <rect x="203" y="102" width="9" height="10" rx="3" fill="#2a2d34" />
                  <ellipse cx="206" cy="94" rx="4.5" ry="6.5" fill="url(#bp-head)" />
                  {[66, 172].map((cx) => (
                    <g key={cx}>
                      <circle cx={cx} cy={122} r="16" fill="#15171c" />
                      <circle cx={cx} cy={122} r="9" fill="#3b404a" />
                      <circle cx={cx} cy={122} r="3" fill="#1c1f25" />
                    </g>
                  ))}
                </svg>

                {/* live editable LED screen */}
                <div className="absolute rounded-[5px] overflow-hidden" style={{ left: "10.4%", top: "19.7%", width: "38.3%", height: "48.7%" }}>
                  <div
                    className="led-screen w-full h-full grid place-content-center text-center px-1"
                    style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                  >
                    <span className="font-display font-bold text-white leading-[1.05] break-words" style={{ fontSize: "clamp(0.6rem, 2.2vw, 1.15rem)" }}>
                      {text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
