"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";

const ROTATE = ["brand", "message", "offer", "launch", "store"];

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

      {/* Real campaign photography grounds the hero in an actual deployment. */}
      <div className="wrap w-full pb-8 md:pb-12">
        <div className="relative h-[230px] sm:h-[300px] md:h-[390px] overflow-hidden rounded-[28px] md:rounded-[36px] border border-black/10 bg-[#111] shadow-[0_28px_80px_rgba(16,22,34,0.2)]">
          <Image
            src="/elite-outfits.webp"
            alt="AdWheeler LED advertising vehicle outside Elite Outfits at night"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-[50%_68%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#20d69a] shadow-[0_0_12px_rgba(32,214,154,0.8)]" />
            LIVE ON THE STREETS
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--line)]" />
    </section>
  );
}
