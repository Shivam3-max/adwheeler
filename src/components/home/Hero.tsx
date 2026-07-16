"use client";

import Link from "next/link";
import { HeroCanvas } from "@/components/three/Lazy";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* 3D scene */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* vignette + gradients over canvas */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(7,7,10,0.9),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[var(--bg)] to-transparent" />

      {/* content */}
      <div className="relative h-full wrap flex flex-col justify-end pb-[10vh] md:pb-[12vh]">
        <div className="max-w-4xl">
          <p className="eyebrow mb-6 animate-[float_6s_ease-in-out_infinite]">
            India&apos;s first smart mobile ad network
          </p>
          <h1 className="display text-[clamp(2.9rem,9vw,8rem)]">
            Move your brand
            <br />
            <span className="text-gradient">through the city.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg md:text-xl text-[var(--ink-dim)]">
            GPS-powered mobile LED advertising that turns every street, every
            signal and every crowd into an opportunity.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Magnetic strength={0.25}>
              <Link href="/campaign-planner" className="btn btn-primary text-base">
                Book campaign
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
            <Link href="/fleet" className="btn btn-ghost text-base">
              Explore fleet
            </Link>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--faint)]">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--amber)] to-transparent" />
      </div>
    </section>
  );
}
