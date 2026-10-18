"use client";

import { useEffect, useState } from "react";

export default function BootLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seen = false;
    try { seen = sessionStorage.getItem("aw_booted") === "1"; } catch {}
    if (seen) return;
    setShow(true);
    try { sessionStorage.setItem("aw_booted", "1"); } catch {}
    const t1 = setTimeout(() => setLeaving(true), 1150);
    const t2 = setTimeout(() => setShow(false), 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10000] grid place-items-center bg-white"
      style={{ animation: leaving ? "boot-fade 0.55s var(--ease) forwards" : undefined }}
    >
      <div className="relative">
        {/* LED panel booting up */}
        <div
          className="led-screen relative w-56 h-32 md:w-72 md:h-40 rounded-2xl border-[5px] border-[#0f1012] overflow-hidden grid place-items-center"
          style={{ background: "linear-gradient(135deg,#1358d8,#0ba7a0)" }}
        >
          <span
            className="font-display font-bold text-white text-xl md:text-2xl tracking-wide"
            style={{ animation: "boot-flicker 1s steps(1) 1" }}
          >
            AdWheeler
          </span>
          <span className="absolute bottom-3 font-mono text-[0.55rem] tracking-[0.3em] text-white/80">
            POWERING ON…
          </span>
        </div>
        {/* loading bar */}
        <div className="mt-4 h-1 w-full rounded-full bg-[var(--bg-3)] overflow-hidden">
          <div
            className="h-full bg-[var(--amber)]"
            style={{ width: "100%", transformOrigin: "left", animation: "boot-bar 1.1s var(--ease) forwards" }}
          />
        </div>
      </div>
      <style>{`@keyframes boot-bar{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </div>
  );
}
