import { STATS } from "@/lib/site";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/fx/TextReveal";

export default function Stats() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">By the numbers</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            <TextReveal as="span">A network already</TextReveal>{" "}
            <TextReveal as="span" className="text-amber" delay={260}>in motion.</TextReveal>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[var(--line)] rounded-3xl overflow-hidden border border-[var(--line)]">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-[var(--bg)]">
              <div className="p-7 md:p-8 h-full hover:bg-[var(--surface)] transition-colors duration-500">
                <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold text-[var(--ink)] leading-none">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-[var(--muted)]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
