import Link from "next/link";
import { SOLUTIONS } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export default function Solutions() {
  return (
    <section className="section relative">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">Built for every brand</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
              One fleet, <span className="text-amber">nine playbooks.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/solutions" className="btn btn-ghost">All solutions</Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <Link href="/solutions" className="card card-glow group block p-7 h-full">
                <div className="card-glow" />
                <div className="flex items-center justify-between mb-8">
                  <span className="grid place-items-center w-12 h-12 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-amber group-hover:border-[var(--amber)]/40 transition-colors">
                    <Icon name={s.icon} />
                  </span>
                  <span className="font-mono text-xs text-[var(--faint)] opacity-0 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-xl mb-2 group-hover:text-amber transition-colors">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
