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

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      if (reduce) { setBeat(3); setSkipCount(0); return; }
      timers.push(setTimeout(() => setBeat(1), 120));
      timers.push(setTimeout(() => setBeat(2), 900));
      [1, 2, 3].forEach((n) => timers.push(setTimeout(() => setSkipCount(3 - n), 1050 + n * 280)));
      timers.push(setTimeout(() => setBeat(3), 2000));
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { play(); io.disconnect(); }
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
    );
    // if the section is already in view on mount (e.g. scrolled straight to it), play now
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) play();
    else io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <section className="relative overflow-hidden flex items-center min-h-[88svh] py-20">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div ref={ref} className="wrap relative w-full max-w-4xl mx-auto text-center">
        <p className="eyebrow justify-center mb-8 md:mb-10">Why a moving billboard</p>

        {/* Problem lines */}
        <Line active={beat >= 1} dim={beat >= 3}>
          Hoardings?{" "}
          <span className={cn("strike text-[var(--muted)]", beat >= 1 && "go")}>Ignored.</span>
        </Line>

        <Line active={beat >= 2} dim={beat >= 3}>
          <span className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
            <span>Online ads?</span>
            <span className={cn("strike text-[var(--muted)]", beat >= 2 && skipCount === 0 && "go")}>Skipped.</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border border-[var(--line-strong)] bg-[var(--bg-2)] px-2.5 py-1 text-sm md:text-base font-body transition-all duration-300",
                beat >= 2 ? "opacity-100" : "opacity-0",
                skipCount === 0 && "border-[var(--amber)]/50 text-amber"
              )}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5l10 7-10 7V5zm11 0h3v14h-3z" /></svg>
              {skipCount > 0 ? `Skip in ${skipCount}` : "Skipped"}
            </span>
          </span>
        </Line>

        {/* Punchline — space reserved so it never reflows the page */}
        <div className="relative mt-6 md:mt-9 min-h-[220px] sm:min-h-[240px] md:min-h-[320px]">
          <div
            className={cn(
              "absolute inset-x-0 top-0 transition-all duration-700",
              beat >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
            )}
          >
            <h2 className="display text-[clamp(1.9rem,6.2vw,4.6rem)] leading-[1.02]">
              A moving LED billboard?
              <br />
              <span className="text-gradient">Impossible to ignore.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg text-[var(--ink-dim)]">
              It doesn&apos;t wait on a wall. It drives into the crowd, lights up, and
              follows the traffic — no skip button, no scroll-past.
            </p>
            <div className="mt-7 flex justify-center">
              <Link href="/campaign-planner" className="btn btn-primary">
                Make yours unignorable
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
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
        "display text-[clamp(1.5rem,5.4vw,3.4rem)] leading-[1.12] mb-3 md:mb-4 transition-all duration-700",
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        dim && "!opacity-40 scale-[0.97]"
      )}
    >
      {children}
    </h2>
  );
}
