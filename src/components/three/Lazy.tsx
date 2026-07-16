"use client";

import dynamic from "next/dynamic";

function Loader({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <span className="w-8 h-8 rounded-full border-2 border-[var(--line-strong)] border-t-[var(--amber)] animate-spin" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[var(--faint)]">
          {label}
        </span>
      </div>
    </div>
  );
}

export const HeroCanvas = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <Loader label="Rendering fleet" />,
});

export const GlobeCanvas = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => <Loader label="Mapping territories" />,
});
