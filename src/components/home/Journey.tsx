import { JOURNEY } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function Journey() {
  return (
    <section className="section relative overflow-hidden">
      <div className="wrap">
        <Reveal className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">The journey</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">
            From creative to <span className="text-gradient">city streets.</span>
          </h2>
          <p className="mt-5 text-[var(--ink-dim)]">
            Six simple steps — from your ad to the street in under an hour.
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-[max(28px,calc((100vw-1280px)/2+28px))] pb-6 snap-x snap-mandatory">
          {JOURNEY.map((j, i) => (
            <div
              key={j.step}
              className="snap-start shrink-0 w-[280px] card card-glow p-7 relative"
            >
              <div className="card-glow" />
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-5xl font-semibold text-[var(--faint)]">{j.step}</span>
                {i < JOURNEY.length - 1 && (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-[var(--amber)]">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl mb-2">{j.title}</h3>
              <p className="text-sm text-[var(--muted)]">{j.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
