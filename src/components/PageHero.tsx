import Link from "next/link";
import Reveal from "./Reveal";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.5]" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-[46rem] rounded-full blur-[130px] bg-[rgba(255,158,27,0.10)]" />
      <div className="wrap relative">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)] mb-6">
            <Link href="/" className="hover:text-amber transition-colors">Home</Link>
            <span className="text-[var(--faint)]">/</span>
            <span className="eyebrow !text-[var(--amber)]">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display text-[clamp(2.6rem,7.5vw,6.5rem)] max-w-5xl">{title}</h1>
        </Reveal>
        {sub && (
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg text-[var(--ink-dim)]">{sub}</p>
          </Reveal>
        )}
        {children && <Reveal delay={220}>{children}</Reveal>}
      </div>
    </section>
  );
}
