"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0); // 0 none, 1 hoardings, 2 ads, 3 punchline
  const [skipCount, setSkipCount] = useState(3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        if (reduce) { setBeat(3); setSkipCount(0); return; }
        timers.push(setTimeout(() => setBeat(1), 200));
        timers.push(setTimeout(() => setBeat(2), 1500));
        // fake skip countdown 3→0
        [1, 2, 3].forEach((n) => timers.push(setTimeout(() => setSkipCount(3 - n), 1700 + n * 450)));
        timers.push(setTimeout(() => setBeat(3), 3400));
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div ref={ref} className="wrap relative max-w-4xl mx-auto text-center">
        <p className="eyebrow justify-center mb-10">Why a moving billboard</p>

        {/* Beat 1 — hoardings ignored */}
        <Line active={beat >= 1} dim={beat >= 3}>
          Hoardings?{" "}
          <span className={cn("strike text-[var(--muted)]", beat >= 1 && "go")}>Ignored.</span>
        </Line>

        {/* Beat 2 — ads skipped */}
        <Line active={beat >= 2} dim={beat >= 3}>
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            Online ads?
            <span className={cn("strike text-[var(--muted)]", beat >= 2 && skipCount === 0 && "go")}>Skipped.</span>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-md border border-[var(--line-strong)] bg-[var(--bg-2)] px-3 py-1 text-base md:text-lg font-body transition-all duration-300",
                beat >= 2 ? "opacity-100" : "opacity-0",
                skipCount === 0 && "border-[var(--amber)]/50 text-amber"
              )}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5l10 7-10 7V5zm11 0h3v14h-3z" /></svg>
              {skipCount > 0 ? `Skip in ${skipCount}` : "Skipped"}
            </span>
          </span>
        </Line>

        {/* Beat 3 — punchline */}
        <div
          className={cn(
            "transition-all duration-700",
            beat >= 3 ? "opacity-100 translate-y-0 mt-4" : "opacity-0 translate-y-6 mt-4 pointer-events-none h-0 overflow-hidden"
          )}
        >
          <h2 className="display text-[clamp(2.2rem,6.5vw,5rem)]">
            A moving LED billboard?
            <br />
            <span className="text-gradient">Impossible to ignore.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--ink-dim)]">
            It doesn&apos;t wait on a wall. It drives into the crowd, lights up, and
            follows the traffic — no skip button, no scroll-past.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/campaign-planner" className="btn btn-primary text-base">
              Make yours unignorable
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ active, dim, children }: { active: boolean; dim: boolean; children: React.ReactNode }) {
  return (
    <h2
      className={cn(
        "display text-[clamp(1.8rem,5.5vw,4rem)] leading-[1.1] mb-5 transition-all duration-700",
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        dim && "opacity-35 scale-[0.97]"
      )}
    >
      {children}
    </h2>
  );
}
