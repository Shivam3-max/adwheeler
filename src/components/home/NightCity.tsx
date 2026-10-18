"use client";

import { useRef } from "react";
import Link from "next/link";

export default function NightCity() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section ref={ref} onMouseMove={onMove} className="night relative overflow-hidden" style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}>
      {/* cursor headlight */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(260px circle at var(--mx) var(--my), rgba(255,243,214,0.14), transparent 60%)" }}
      />
      {/* skyline silhouette */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 opacity-70">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <g fill="rgba(255,255,255,0.05)">
            {Array.from({ length: 30 }).map((_, i) => {
              const w = 26 + ((i * 29) % 30);
              const h = 28 + ((i * 47) % 72);
              return <rect key={i} x={i * 41} y={120 - h} width={w} height={h} />;
            })}
          </g>
        </svg>
      </div>

      <div className="wrap relative z-[2] py-28 md:py-40 text-center">
        <p className="eyebrow justify-center mb-8" style={{ color: "var(--amber-hi)" }}>After dark</p>
        <h2 className="display text-[clamp(2.2rem,6.5vw,5.5rem)]">
          When the city lights up,
          <br />
          <span className="text-gradient">so does your brand.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-dimN">
          4 PM to 10 PM is when streets, markets and nightlife are busiest — and a glowing
          LED screen is impossible to miss.
        </p>

        {/* glowing van */}
        <div className="mt-12 flex justify-center">
          <div className="relative" style={{ filter: "drop-shadow(0 0 40px rgba(56,170,230,0.35))" }}>
            <svg viewBox="0 0 240 152" className="w-[260px] md:w-[340px]">
              <defs>
                <linearGradient id="nc-ad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38a6ff" /><stop offset="1" stopColor="#0ba7a0" /></linearGradient>
              </defs>
              <ellipse cx="120" cy="143" rx="101" ry="6.5" fill="rgba(0,0,0,0.4)" />
              <rect x="22" y="108" width="190" height="12" rx="4" fill="#e8a52a" />
              <rect x="16" y="20" width="110" height="95" rx="11" fill="#0c0d11" />
              <rect x="25" y="30" width="92" height="74" rx="6" fill="url(#nc-ad)" />
              <text x="71" y="62" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="13" fill="#fff">YOUR AD</text>
              <text x="71" y="80" textAnchor="middle" fontFamily="'Clash Display',sans-serif" fontWeight="700" fontSize="12" fill="#fff" opacity="0.9">HERE</text>
              <path d="M123 110 L123 66 Q123 57 132 55 L151 51 L187 51 Q199 51 203 66 L209 110 Z" fill="#e8a52a" />
              <path d="M153 60 L184 60 Q191 60 194 69 L198 87 L153 87 Z" fill="#14324a" />
              <ellipse cx="206" cy="94" rx="5" ry="7" fill="#fff6d8" />
              {[66, 172].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy={122} r="16" fill="#0c0d11" />
                  <circle cx={cx} cy={122} r="8" fill="#2a2d34" />
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/campaign-planner" className="btn btn-primary">Light up your brand</Link>
        </div>
      </div>
    </section>
  );
}
