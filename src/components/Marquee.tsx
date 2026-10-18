"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const PHRASES = [
  { t: "Your ad here", cta: false },
  { t: "Book your ad now", cta: true },
  { t: "Your brand, on the move", cta: false },
  { t: "This could be your ad", cta: false },
  { t: "Put your brand on AdWheeler", cta: true },
  { t: "Reach the whole city", cta: false },
  { t: "Go live tonight · 4–10 PM", cta: false },
];

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const items = [...PHRASES, ...PHRASES];

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;
    let half = el.scrollWidth / 2;
    let vel = 0; // scroll-velocity boost
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      vel = Math.min(900, Math.abs(dy) * 14);
    };
    const onResize = () => (half = el.scrollWidth / 2);

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      vel *= 0.9; // decay
      const speed = 46 + vel; // px/s
      x -= speed * dt;
      if (-x >= half) x += half;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(loop);
    };

    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden py-8 border-y border-[var(--line)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      <div ref={track} className="flex gap-12 w-max will-change-transform">
        {items.map((p, i) => (
          <Link
            key={i}
            href="/campaign-planner"
            className={`font-display text-xl md:text-2xl font-medium whitespace-nowrap flex items-center gap-3 transition-colors ${
              p.cta ? "text-amber hover:opacity-80" : "text-[var(--faint)] hover:text-[var(--ink)]"
            }`}
          >
            {p.t}
            <span className="dot opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  );
}
