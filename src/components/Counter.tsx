"use client";

import { useEffect, useRef, useState } from "react";

/** Count-up with an optional LED-board "scramble" phase before it locks in. */
export default function Counter({
  to,
  suffix = "",
  duration = 1800,
  scramble = true,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  scramble?: boolean;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        if (reduce) { setVal(to); return; }

        const start = performance.now();
        const scrambleEnd = scramble ? 0.38 : 0;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          if (p < scrambleEnd) {
            // LED scramble: random number of the target's magnitude
            const mag = Math.max(1, to);
            setVal(Math.floor(Math.random() * (mag + 1)));
          } else {
            const q = (p - scrambleEnd) / (1 - scrambleEnd);
            const eased = 1 - Math.pow(1 - q, 3);
            setVal(Math.round(eased * to));
          }
          if (p < 1) requestAnimationFrame(tick);
          else setVal(to);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, scramble]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
