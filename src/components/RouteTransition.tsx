"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Subtle LED-wipe that sweeps across on route change. Pointer-events-none, safe. */
export default function RouteTransition() {
  const pathname = usePathname();
  const [sweep, setSweep] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSweep(true);
    const t = setTimeout(() => setSweep(false), 650);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!sweep) return null;

  return (
    <div className="fixed inset-0 z-[9500] pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute inset-y-0 w-[140%] -left-[140%]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(247,134,26,0.12) 30%, rgba(11,167,160,0.14) 60%, transparent)",
          backgroundImage:
            "radial-gradient(rgba(16,22,34,0.06) 40%, transparent 44%), linear-gradient(90deg, transparent, rgba(247,134,26,0.16) 40%, rgba(11,167,160,0.16) 65%, transparent)",
          backgroundSize: "6px 6px, 100% 100%",
          animation: "rt-sweep 0.65s var(--ease) forwards",
        }}
      />
      <style>{`@keyframes rt-sweep{from{transform:translateX(0)}to{transform:translateX(185%)}}`}</style>
    </div>
  );
}
