"use client";

import { useEffect, useRef, useState } from "react";

const QUOTES = [
  "You just looked. That's the point.",
  "No skip button out here.",
  "Try scrolling past a screen on wheels.",
  "Your competitor is reading this too.",
  "This could be your brand, right here.",
];

export default function AttentionPops() {
  const [active, setActive] = useState<number | null>(null);
  const [leaving, setLeaving] = useState(false);
  const shown = useRef<Set<number>>(new Set());
  const hideT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const thresholds = [0.14, 0.34, 0.54, 0.72, 0.88];
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.body.scrollHeight - window.innerHeight;
        const frac = max > 0 ? window.scrollY / max : 0;
        for (let i = 0; i < thresholds.length; i++) {
          if (frac >= thresholds[i] && !shown.current.has(i) && active === null) {
            shown.current.add(i);
            setLeaving(false);
            setActive(i);
            hideT.current = setTimeout(() => setLeaving(true), 4200);
            setTimeout(() => setActive((cur) => (cur === i ? null : cur)), 4900);
            break;
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (hideT.current) clearTimeout(hideT.current); };
  }, [active]);

  const dismiss = () => { setLeaving(true); setTimeout(() => setActive(null), 600); };

  if (active === null) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[850] max-w-[18rem] hidden sm:block">
      <div className={`relative glass rounded-2xl p-4 pr-9 shadow-[var(--shadow-lg)] ${leaving ? "pop-leave" : "pop-enter"}`}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="dot" />
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-amber">AdWheeler</span>
        </div>
        <p className="font-display text-base leading-snug">{QUOTES[active]}</p>
        <button onClick={dismiss} aria-label="Dismiss" className="absolute top-2.5 right-2.5 text-[var(--faint)] hover:text-[var(--ink)] text-lg leading-none">×</button>
      </div>
    </div>
  );
}
