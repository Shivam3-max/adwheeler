"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const ROWS = [
  { k: "Format", a: "Static print", b: "Live 4K video" },
  { k: "Reach", a: "One fixed spot", b: "Wherever the crowd is" },
  { k: "Targeting", a: "Whoever passes", b: "Prime-time 4–10 PM" },
  { k: "Flexibility", a: "Weeks to change", b: "Swap in seconds" },
  { k: "Analytics", a: "Guesswork", b: "Live GPS tracking" },
  { k: "Proof", a: "A photo, maybe", b: "Geo-tagged, live" },
];

export default function Compare() {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(6, Math.min(94, p)));
  };

  return (
    <section className="section relative">
      <div className="wrap">
        <Reveal className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Static vs Smart</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            The billboard that <span className="text-amber">follows the crowd.</span>
          </h2>
          <p className="mt-5 text-[var(--ink-dim)]">
            Drag the handle. On the left, the billboard the world settled for.
            On the right, the one that moves.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            ref={ref}
            className="relative select-none rounded-[26px] overflow-hidden border border-[var(--line)] h-[440px] md:h-[520px] touch-none"
            onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
          >
            {/* Right (AD Wheeler) — base layer */}
            <Panel variant="wheeler" />
            {/* Left (Traditional) — clipped overlay */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Panel variant="static" />
            </div>

            {/* handle */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-full bg-[var(--amber)]/60" />
              <button
                aria-label="Drag to compare"
                onMouseDown={() => (dragging.current = true)}
                onTouchStart={() => (dragging.current = true)}
                className="absolute grid place-items-center w-11 h-11 rounded-full bg-[var(--amber)] text-[#1a1206] shadow-[0_0_30px_-4px_var(--amber-glow)] cursor-ew-resize"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        {/* comparison table */}
        <div className="mt-8 grid gap-px bg-[var(--line)] rounded-2xl overflow-hidden border border-[var(--line)]">
          <div className="grid grid-cols-3 bg-[var(--bg-2)] text-xs font-mono uppercase tracking-wider text-[var(--faint)]">
            <span className="p-4">Metric</span>
            <span className="p-4">Traditional</span>
            <span className="p-4 text-amber">AD Wheeler</span>
          </div>
          {ROWS.map((r) => (
            <div key={r.k} className="grid grid-cols-3 bg-[var(--bg)] text-sm">
              <span className="p-4 text-[var(--muted)]">{r.k}</span>
              <span className="p-4 text-[var(--muted)] line-through decoration-[var(--faint)]">{r.a}</span>
              <span className="p-4 text-[var(--ink)] font-medium">{r.b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ variant }: { variant: "static" | "wheeler" }) {
  if (variant === "static") {
    return (
      <div className="absolute inset-0 bg-[var(--bg-3)] flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <span className="chip">Traditional Billboard</span>
        </div>
        <div className="flex-1 grid place-items-center">
          <div className="text-center opacity-80">
            <div className="mx-auto w-40 h-28 md:w-64 md:h-40 rounded-lg border-2 border-dashed border-[var(--line-strong)] grid place-items-center bg-white/50">
              <span className="font-display text-xl text-[var(--faint)]">Static poster</span>
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              Fixed · Silent · Unmeasured
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col bg-[radial-gradient(120%_100%_at_80%_0%,rgba(247,134,26,0.16),transparent_55%),radial-gradient(100%_100%_at_10%_100%,rgba(11,167,160,0.14),transparent_55%),#ffffff]">
      <div className="p-6 flex items-center justify-between">
        <span className="chip !border-[var(--amber)]/40 !text-amber">AD Wheeler · Live</span>
        <span className="flex items-center gap-2 text-xs text-[var(--cyan)]">
          <span className="dot" /> Broadcasting
        </span>
      </div>
      <div className="flex-1 grid place-items-center">
        <div className="text-center">
          <div className="mx-auto w-44 h-28 md:w-72 md:h-44 rounded-lg overflow-hidden border border-[var(--amber)]/40 shadow-[0_20px_50px_-16px_var(--amber-glow)] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1358d8] via-[#c81e5a] to-[#f7861a] animate-[flicker_5s_infinite]" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow">YOUR AD HERE</span>
            </div>
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-amber">
            Mobile · Dynamic · GPS-tracked
          </p>
        </div>
      </div>
    </div>
  );
}
