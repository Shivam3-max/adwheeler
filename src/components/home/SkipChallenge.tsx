"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SkipChallenge() {
  const stage = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // % within stage
  const [dodges, setDodges] = useState(0);
  const caught = dodges >= 6;

  const flee = () => {
    if (caught) return;
    setDodges((d) => d + 1);
    setPos({ x: 12 + Math.random() * 76, y: 16 + Math.random() * 68 });
  };

  const onMove = (e: React.MouseEvent) => {
    const el = stage.current;
    if (!el || caught) return;
    const r = el.getBoundingClientRect();
    const bx = r.left + (pos.x / 100) * r.width;
    const by = r.top + (pos.y / 100) * r.height;
    const d = Math.hypot(e.clientX - bx, e.clientY - by);
    if (d < 90) flee();
  };

  return (
    <section className="section relative">
      <div className="wrap">
        <div className="max-w-2xl mb-10">
          <p className="eyebrow mb-4">Go on, try</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            Think you can <span className="text-amber">skip this ad?</span>
          </h2>
          <p className="mt-5 text-[var(--ink-dim)]">
            {caught
              ? "Exactly. You couldn't skip it — and out on the street, neither can your audience."
              : "Try clicking the skip button. We'll wait. (You won't catch it.)"}
          </p>
        </div>

        <div
          ref={stage}
          onMouseMove={onMove}
          className="relative h-72 md:h-80 rounded-[26px] border border-[var(--line)] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,rgba(247,134,26,0.06),transparent_60%),var(--bg-2)]"
        >
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="absolute inset-0 grid place-items-center text-center px-6 pointer-events-none">
            {!caught ? (
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--faint)]">
                Dodges: {dodges} / 6
              </span>
            ) : (
              <div className="pointer-events-auto">
                <p className="font-display text-3xl md:text-4xl mb-4">Told you. <span className="text-gradient">Unignorable.</span></p>
                <Link href="/campaign-planner" className="btn btn-primary">Put your brand on the road</Link>
              </div>
            )}
          </div>

          {!caught && (
            <button
              onMouseEnter={flee}
              onClick={flee}
              onTouchStart={(e) => { e.preventDefault(); flee(); }}
              className={cn(
                "absolute z-10 inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-sm shadow-[var(--shadow-md)] transition-all duration-300 ease-out"
              )}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5l10 7-10 7V5zm11 0h3v14h-3z" /></svg>
              Skip ad ✕
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
