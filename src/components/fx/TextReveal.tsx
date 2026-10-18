"use client";

import { createElement, useEffect, useRef, type ElementType } from "react";

/**
 * Splits plain-string children into words and reveals them with a stagger
 * when scrolled into view. Pass a string child for best results.
 */
export default function TextReveal({
  children,
  as = "span",
  className,
  stagger = 55,
  delay = 0,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = children.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>(".word-anim");
    const run = () => spans.forEach((s, i) => (s.style.animationDelay = `${delay + i * stagger}ms`, s.classList.add("go")));
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting || entries[0].boundingClientRect.top < 0) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    // if already in view on mount, reveal right away
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) run();
    else io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  return createElement(
    as,
    { ref, className },
    words.map((w, i) =>
      createElement(
        "span",
        { key: i, className: "inline-block overflow-hidden align-bottom" },
        createElement("span", { className: "word-anim" }, w),
        i < words.length - 1 ? " " : ""
      )
    )
  );
}
